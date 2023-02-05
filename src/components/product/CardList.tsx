import React from "react";
import styles from "@/styles/Card.module.css";
import Card from "./Card";
import { ICart, IProduct } from "@/interfaces";
import { AppContext } from "@/context";

interface ICardList {
  productList: IProduct[];
  cartList: ICart[];
  setCartList: any;
}

const CardList: React.FC<ICardList> = (props) => {
  const { productList, cartList, setCartList } = props;

  const appStore = React.useContext(AppContext);

  const addToCart = (product_id: string) => {
    const productIndex = cartList.findIndex((item: ICart) => item.product_detail.id === product_id);
    if (cartList.length > 0 && productIndex !== -1) {
      gtag("event", "add_to_cart", {
        user_id: appStore?.username,
        currency: "THB",
        value: cartList[productIndex].product_detail.price,
        items: [
          {
            item_id: cartList[productIndex].product_detail.id,
            item_name: cartList[productIndex].product_detail.name,
            price: cartList[productIndex].product_detail.price,
            quantity: 1,
          },
        ],
      });
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
      gtag("event", "add_to_cart", {
        user_id: appStore?.username,
        currency: "THB",
        value: productObj[0].price,
        items: [
          {
            item_id: productObj[0].id,
            item_name: productObj[0].name,
            price: productObj[0].price,
            quantity: 1,
          },
        ],
      });
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
