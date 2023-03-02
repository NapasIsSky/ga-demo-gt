import React from "react";
import Head from "next/head";

import styles from "@/styles/Home.module.css";
import CardList from "@/components/product/CardList";
import { productData } from "@/data";
import CartIcon from "@/components/icons/CartIcon";
import { ICart } from "@/interfaces";
import { AppContext } from "@/context";
import { useRouter } from "next/router";

export default function Home() {
  const appStore = React.useContext(AppContext);

  const router = useRouter();

  const onLogOut = () => {
    appStore?.setUsername("");
    appStore?.setPassword("");
    router.push("/");
  };

  const onViewCart = () => {
    const gtagItemsList: any[] = [];

    appStore?.cartList.forEach((item: ICart, index: number) => {
      gtagItemsList.push({
        item_id: item.product_detail.id,
        item_name: item.product_detail.name,
        index: index,
        price: item.product_detail.price,
        quantity: item.quantity,
      });
    });

    gtag("event", "view_cart", {
      currency: "THB",
      items: gtagItemsList,
    });

    router.push("/cart");
  };

  return (
    <React.Fragment>
      <Head>
        <title>{"HOME|SHOPPING"}</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.webTitle}>TOFUU E-MERCHANT</h1>
        <button onClick={onLogOut} className={styles.logOutBtn}>
          <h4>LOG OUT</h4>
        </button>
        <CardList productList={productData} />
        <div onClick={onViewCart} className={styles.cartBtn}>
          <CartIcon className={styles.cartIcon} />
          {appStore?.cartList.length ? (
            <div className={styles.cartBadge}>
              <h4>{appStore?.cartList.length}</h4>
            </div>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}
