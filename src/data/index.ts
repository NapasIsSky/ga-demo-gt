import { IProduct, IUser } from "@/interfaces";

export const userData: IUser[] = [
  {
    id: "01",
    code: "u01",
    username: "NapDev",
    password: "1",
  },
  {
    id: "02",
    code: "u02",
    username: "ZankDev",
    password: "1",
  },
  {
    id: "03",
    code: "u03",
    username: "MhooDev",
    password: "1",
  },
];

export const productData: IProduct[] = [
  {
    id: "p1",
    picture: "/IMG_2191.png",
    name: "Product1",
    description: "This is a good product",
    price: 300,
  },
  {
    id: "p2",
    picture: "/IMG_2191.png",
    name: "Product2",
    description: "This is a good product",
    price: 600,
  },
  {
    id: "p3",
    picture: "/IMG_2191.png",
    name: "Product3",
    description: "This is a good product",
    price: 400,
  },
];
