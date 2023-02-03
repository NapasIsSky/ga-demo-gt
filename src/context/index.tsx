import { IApp } from "@/interfaces";
import React from "react";

export const AppContext = React.createContext<IApp | null>(null);

interface IAppProvider {
  children: React.ReactNode;
}

const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  return (
    <AppContext.Provider value={{ username, setUsername, password, setPassword }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
