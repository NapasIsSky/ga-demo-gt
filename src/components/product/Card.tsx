import React from "react";
import styles from "@/styles/Card.module.css";
import { IProduct } from "@/interfaces";
import AddToCardIcon from "../icons/AddToCartIcon";

interface ICard {
  product: IProduct;
  onClick: () => void;
}

const Card: React.FC<ICard> = (props) => {
  const { product, onClick } = props;

  return (
    <div className={styles.cardField}>
      <div id={product.id} className={styles.cardContainer}>
        <img src={product.picture} className={styles.cardPicture} />
        <div className={styles.cardContent}>
          <h2 className={styles.cardName}>{product.name}</h2>
          <p className={styles.cardDescription}>{product.description}</p>
          <h1 className={styles.cardPrice}>{`฿${product.price}`}</h1>
        </div>
      </div>
      <div onClick={onClick} className={styles.addToCartBtn}>
        <AddToCardIcon className={styles.addToCartIcon} />
      </div>
    </div>
  );
};

export default Card;
