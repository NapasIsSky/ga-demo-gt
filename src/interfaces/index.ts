export interface IApp {
  username: string;
  password: string;
  cartList: ICart[];
  setUsername: (user: string) => void;
  setPassword: (pass: string) => void;
  setCartList: any;
}

export interface IUser {
  id: string;
  code: string;
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
