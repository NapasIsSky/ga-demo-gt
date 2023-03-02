import React from "react";
import styles from "@/styles/Card.module.css";
import Card from "./Card";
import { ICart, IProduct } from "@/interfaces";
import { AppContext } from "@/context";

interface ICardList {
  productList: IProduct[];
}

const CardList: React.FC<ICardList> = (props) => {
  const { productList } = props;

  const appStore = React.useContext(AppContext);

  const addToCart = (product_id: string) => {
    const productIndex = appStore?.cartList.findIndex(
      (item: ICart) => item.product_detail.id === product_id,
    );
    if (
      appStore !== undefined &&
      appStore !== null &&
      appStore.cartList.length > 0 &&
      productIndex !== undefined &&
      productIndex !== -1
    ) {
      gtag("event", "add_to_cart", {
        user_id: appStore?.username,
        currency: "THB",
        value: appStore.cartList[productIndex].product_detail.price,
        items: [
          {
            item_id: appStore.cartList[productIndex].product_detail.id,
            item_name: appStore.cartList[productIndex].product_detail.name,
            price: appStore.cartList[productIndex].product_detail.price,
            quantity: 1,
          },
        ],
      });
      appStore.setCartList((prevState: ICart[]) =>
        prevState.map((item: ICart) => {
          if (item.product_detail.id === product_id) {
            return { ...item, quantity: item.quantity + 1 };
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
      appStore?.setCartList((prevState: ICart[]) => [
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
