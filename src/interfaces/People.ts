interface People {
    id: number;
    user: {
      id: number;
      username: string;
      email: string;
    };
    assistant: {
        id: number;
        username: string;
        email: string;
      };
    status: string;
  }
  type PeopleList = People[];
  export default PeopleList;