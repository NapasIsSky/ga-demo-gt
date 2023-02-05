import React from "react";
import Head from "next/head";

import styles from "@/styles/Home.module.css";
import CardList from "@/components/product/CardList";
import { productData, userData } from "@/data";
import CartIcon from "@/components/icons/CartIcon";
import { ICart, IUser } from "@/interfaces";
import CloseIcon from "@/components/icons/CloseIcon";
import { AppContext } from "@/context";
import CreditCardIcon from "@/components/icons/CreditCardIcon";
import CashIcon from "@/components/icons/CashIcon";

export default function Home() {
  const appStore = React.useContext(AppContext);

  const [title, setTitle] = React.useState<string>("LOGIN");
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);
  const [username, setUsername] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [cartList, setCartList] = React.useState<ICart[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [paymentMethod, setPaymentMethod] = React.useState<"card" | "cash">("card");

  const onLogin = () => {
    const userIndex = userData.findIndex((user: IUser) => user.username === username);

    if (userIndex !== -1 && password === userData[userIndex].password) {
      appStore?.setUsername(username);
      appStore?.setPassword(password);
      gtag("set", "user_id", username);
      setTitle("HOME");
      setStep(2);
    } else {
      alert("Please check 'username' and 'password' are correct");
    }
  };

  const onLogOut = () => {
    setUsername("");
    setPassword("");
    appStore?.setUsername("");
    appStore?.setPassword("");
    setStep(1);
  };

  const onViewCart = () => {
    const gtagItemsList: any[] = [];

    cartList.forEach((item: ICart, index: number) => {
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

    setTitle("CHECKOUT");
    setStep(3);
  };

  const onAddQuantity = (orderIndex: number) => {
    setCartList((prevState: ICart[]) =>
      prevState.map((item: ICart, index: number) => {
        if (index === orderIndex) {
          gtag("event", "add_to_cart", {
            currency: "THB",
            value: item.product_detail.price,
            items: [
              {
                item_id: item.product_detail.id,
                item_name: item.product_detail.name,
                price: item.product_detail.price,
                quantity: 1,
              },
            ],
          });
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      }),
    );
  };

  const onRemoveQuantity = (orderIndex: number) => {
    setCartList((prevState: ICart[]) =>
      prevState.map((item: ICart, index: number) => {
        if (index === orderIndex && item.quantity > 1) {
          gtag("event", "remove_from_cart", {
            currency: "THB",
            value: item.product_detail.price,
            items: [
              {
                item_id: item.product_detail.id,
                item_name: item.product_detail.name,
                price: item.product_detail.price,
                quantity: 1,
              },
            ],
          });
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      }),
    );
  };

  const onPurchase = () => {
    const value: number = cartList.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.product_detail.price * currentValue.quantity,
      0,
    );

    const gtagItemsList: any[] = [];

    cartList.forEach((item: ICart, index: number) => {
      gtagItemsList.push({
        item_id: item.product_detail.id,
        item_name: item.product_detail.name,
        index: index,
        price: item.product_detail.price,
        quantity: item.quantity,
      });
    });

    gtag("event", "purchase", {
      currency: "THB",
      transaction_id: `T_${Math.floor(Math.random() * 100)}`,
      value: value,
      tax: (value * 7) / 100,
      items: gtagItemsList,
    });

    setTitle("HOME");
    setStep(2);
    setCartList([]);
  };

  React.useEffect(() => {
    let result: number = 0;
    cartList.forEach(
      (item: ICart) => (result = result + item.quantity * item.product_detail.price),
    );
    setTotal(result);
  }, [cartList]);

  React.useEffect(() => {
    if (username !== "" && password !== "") {
      setStep(2);
    } else {
      setStep(1);
    }
  }, []);

  const renderLogin = () => {
    return (
      <div className={styles.loginContainer}>
        <h1 className={styles.bigTitle}>Demo Google Tag (gtag)</h1>
        <div className={styles.loginBox}>
          <div>
            <h6 className={styles.loginText}>username: </h6>
            <input
              type={"text"}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.loginInput}
            />
          </div>
          <div>
            <h6 className={styles.loginText}>password: </h6>
            <input
              type={"text"}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.loginInput}
            />
          </div>
          <button onClick={onLogin} className={styles.loginBtn}>
            LOGIN
          </button>
        </div>
      </div>
    );
  };

  const renderHome = () => {
    return (
      <div className={styles.container}>
        <h1 className={styles.webTitle}>TOFUU E-MERCHANT</h1>
        <button onClick={onLogOut} className={styles.logOutBtn}>
          <h4>LOG OUT</h4>
        </button>
        <CardList productList={productData} cartList={cartList} setCartList={setCartList} />
        <div onClick={onViewCart} className={styles.cartBtn}>
          <CartIcon className={styles.cartIcon} />
          {cartList.length ? (
            <div className={styles.cartBadge}>
              <h4>{cartList.length}</h4>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const renderCheckout = () => {
    return (
      <div className={styles.checkOutContainer}>
        <h1 className={styles.cartTitle}>MY CART</h1>
        <div
          onClick={() => {
            setStep(2);
          }}
          className={styles.closeBtn}
        >
          <CloseIcon className={styles.cartCloseIcon} />
        </div>

        <div className={styles.ordersContainer}>
          {cartList.map((item: ICart, index: number) => (
            <div key={index}>
              <div className={styles.orderContainer}>
                <div className={styles.orderStartPart}>
                  <img src={item.product_detail.picture} className={styles.orderPicture} />
                  <h4 className={styles.orderName}>{item.product_detail.name}</h4>
                </div>
                <div className={styles.orderEndPart}>
                  <div onClick={() => onRemoveQuantity(index)} className={styles.removeQty}>
                    -
                  </div>
                  <input type="text" value={item.quantity} readOnly className={styles.showQty} />
                  <div onClick={() => onAddQuantity(index)} className={styles.addQty}>
                    +
                  </div>
                </div>
              </div>
              {index !== cartList.length - 1 ? <div className={styles.divider} /> : null}
            </div>
          ))}
        </div>
        <h3 className={styles.total}>{`Total: ฿${total}`}</h3>
        <button
          onClick={() => {
            setTitle("PAYMENT");
            setStep(4);
          }}
          className={styles.checkOutBtn}
        >
          <h3>CHECK OUT</h3>
        </button>
      </div>
    );
  };

  const renderPayment = () => {
    const tax: number = total + (total * 7) / 100;

    return (
      <div className={styles.paymentContainer}>
        <h1 className={styles.cartTitle}>PAYMENT</h1>
        <div
          onClick={() => {
            setStep(3);
          }}
          className={styles.closeBtn}
        >
          <CloseIcon className={styles.cartCloseIcon} />
        </div>

        <div className={styles.paymentSumContainer}>
          <div className={styles.paymentSumWrap}>
            <h3 className={styles.paymentNomalText}>Subtotal</h3>
            <h3 className={styles.paymentNomalText}>{`฿${total}`}</h3>
          </div>
          <div className={styles.paymentSumWrap}>
            <h3 className={styles.paymentNomalText}>Tax</h3>
            <h3 className={styles.paymentNomalText}>{`฿${tax}`}</h3>
          </div>
          <div className={styles.paymentSumWrap}>
            <h2 className={styles.totalPrice}>Total Price</h2>
            <h2 className={styles.totalPrice}>{`฿${total + tax}`}</h2>
          </div>
        </div>

        <div className={styles.paymentMethodContainer}>
          <h3 className={styles.paymentNomalText}>Choose Payment method: </h3>
          <div
            onClick={() => setPaymentMethod("card")}
            className={
              paymentMethod === "card" ? styles.activePaymentMethodBtn : styles.paymentMethodBtn
            }
          >
            <CreditCardIcon className={styles.creditCardIcon} />
          </div>
          <div
            onClick={() => setPaymentMethod("cash")}
            className={
              paymentMethod === "cash" ? styles.activePaymentMethodBtn : styles.paymentMethodBtn
            }
          >
            <CashIcon className={styles.cashIcon} />
          </div>
        </div>

        <button onClick={onPurchase} className={styles.payBtn}>
          <h3>PURCHESE</h3>
        </button>
      </div>
    );
  };

  const renderPage = () => {
    if (step === 1) {
      return renderLogin();
    } else if (step === 2) {
      return renderHome();
    } else if (step === 3) {
      return renderCheckout();
    } else {
      return renderPayment();
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      {renderPage()}
    </React.Fragment>
  );
}
