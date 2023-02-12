export interface Product {
    id: number;
    user: {
      id: number;
      username: string;
      email: string;
    };
    name: string;
    description: string;
    image_url: string;
    module: string;
    category: string;
    health: number;
    damage: number;
    usage: string;
    days: number;
  }
  
  export interface Category {
    category: string;
    products: Product[];
  }
  
  export type Products = Category[];
  