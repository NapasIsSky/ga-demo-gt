import React from "react";
import styles from "@/styles/Card.module.css";
import Card from "./Card";
import { ICart, IProduct } from "@/interfaces";

interface ICardList {
  productList: IProduct[];
  cartList: ICart[];
  setCartList: any;
}

const CardList: React.FC<ICardList> = (props) => {
  const { productList, cartList, setCartList } = props;

  const addToCart = (product_id: string) => {
    const productIndex = cartList.findIndex((item: ICart) => item.product_detail.id === product_id);
    if (cartList.length > 0 && productIndex !== -1) {
      setCartList((prevState: ICart[]) =>
        prevState.map((item: ICart) => {
          if (item.product_detail.id === product_id) {
            return { ...item, quantity: item.quantity++ };
          } else {
            return item;
          }
        }),
      );
    } else {
      const productObj = productList.filter((item: IProduct) => item.id === product_id);
      setCartList((prevState: ICart[]) => [
        ...prevState,
        { product_detail: { ...productObj[0] }, quantity: 1 },
      ]);
    }
  };

  return (
    <div className={styles.cardListContainer}>
      {productList.map((product: IProduct, productIndex: number) => (
        <Card
          key={`${productIndex}-${product.id}`}
          product={product}
          onClick={() => addToCart(product.id)}
        />
      ))}
    </div>
  );
};

export default CardList;
