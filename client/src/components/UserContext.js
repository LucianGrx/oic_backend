import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({});
  return (
    <UserContext.Provider value={{ authInfo, setAuthInfo }}>
      {children}
    </UserContext.Provider>
  );
}