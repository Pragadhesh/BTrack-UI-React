interface Alert {
    id: number,
    name: string;
    description: string;
    image_url: string;
    damage: number;
    module: string;
    category: string;
    health: number;
    usage: string;
    days: number;
    }
    type AlertList = Alert[];
    
export default AlertList;