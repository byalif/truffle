import React, { createContext, useContext, useState, useRef } from "react";
import { getTheUser } from "./services/services.js";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [theBill, setTheBill] = useState({ id: -1 });
  const [userBills, setUserBills] = useState([]);
  const [theUser, setTheUser] = useState({ username: "" });

  return (
    <AppContext.Provider
      value={{
        userBills,
        setUserBills,
        setTheUser,
        theBill,
        setTheBill,
        loggedIn,
        theUser,
        setLoggedIn,
        toggle,
        setToggle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
