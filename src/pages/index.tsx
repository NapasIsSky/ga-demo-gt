import React from "react";
import Head from "next/head";

import styles from "@/styles/Home.module.css";
import { userData } from "@/data";
import { IUser } from "@/interfaces";
import { AppContext } from "@/context";
import { useRouter } from "next/router";

export default function Home() {
  const appStore = React.useContext(AppContext);

  const router = useRouter();

  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const onLogin = () => {
    const userIndex = userData.findIndex((user: IUser) => user.username === username);

    if (userIndex !== -1 && password === userData[userIndex].password) {
      appStore?.setUsername(username);
      appStore?.setPassword(password);
      gtag("set", "user_id", username);
      router.push("/home");
    } else {
      alert("Please check 'username' and 'password' are correct");
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>{"LOGIN|SHOPPING"}</title>
      </Head>
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
    </React.Fragment>
  );
}
