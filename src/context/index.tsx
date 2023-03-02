import React from "react";
import { useRouter } from "next/router";

import { IApp, ICart } from "@/interfaces";

export const AppContext = React.createContext<IApp | null>(null);

interface IAppProvider {
  children: React.ReactNode;
}

const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  const router = useRouter();

  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [cartList, setCartList] = React.useState<ICart[]>([]);

  React.useEffect(() => {
    if (!username || !password) {
      router.push("/");
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ username, setUsername, password, setPassword, cartList, setCartList }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
