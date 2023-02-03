export interface IApp {
  username: string;
  password: string;
  setUsername: (user: string) => void;
  setPassword: (pass: string) => void;
}

export interface IUser {
  id: string;
  username: string;
  password: string;
}

export interface IProduct {
  id: string;
  picture: string;
  name: string;
  description: string;
  price: number;
}

export interface ICart {
  product_detail: IProduct;
  quantity: number;
}
