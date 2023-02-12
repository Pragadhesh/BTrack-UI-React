import { MenuItem, Select, Slider } from "@mui/material";
import { useEffect, useState } from "react";

function Routine({
  category: initialCategory,
  health: initialHealth,
  days: initialDays,
  setUpdatedCategories,
}: any) {
  const [category, setCategory] = useState(initialCategory);
  const [selectedWeekly, setSelectedWeekly] = useState(
    initialCategory === "weekly" ? initialDays : 1
  );
  const [selectedMonthly, setSelectedMonthly] = useState(
    initialCategory === "monthly" ? initialDays : 1
  );
  const [health, setHealth] = useState(initialHealth);

  const handleUsageChange = (event: any) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    setUpdatedCategories(
      category,
      health,
      category === "weekly"
        ? selectedWeekly
        : category === "monthly"
        ? selectedMonthly
        : 0
    );
  }, [category, health, selectedWeekly, selectedMonthly]);

  return (
    <div className="grid grid-flow-row gap-2 w-full">
      <div className="flex text-2xl font-optimaroman font-semibold">Usage</div>
      <Select value={category} onChange={handleUsageChange}>
        <MenuItem value="none">No usage</MenuItem>
        <MenuItem value="daily">Daily</MenuItem>
        <MenuItem value="weekly">Weekly</MenuItem>
        <MenuItem value="monthly">Monthly</MenuItem>
      </Select>
      {category === "weekly" && (
        <Select
          value={selectedWeekly}
          onChange={(event) => setSelectedWeekly(Number(event.target.value))}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <MenuItem value={i + 1}>{i + 1}</MenuItem>
          ))}
        </Select>
      )}
      {category === "monthly" && (
        <Select
          value={selectedMonthly}
          onChange={(event) => setSelectedMonthly(Number(event.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <MenuItem value={i + 1}>{i + 1}</MenuItem>
          ))}
        </Select>
      )}
      <div className="flex text-2xl font-optimaroman font-semibold">Health</div>
      <Slider
        value={health}
        onChange={(_, value) => setHealth(Number(value))}
        valueLabelDisplay="auto"
      />
    </div>
  );
}

export default Routine;
