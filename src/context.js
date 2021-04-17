import React, { useState, useContext, useEffect } from "react";
import { writeStorage, useLocalStorage } from "@rehooks/local-storage";
import { getUserData, logOut } from "./api/authApi";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const confStorage = (key, func) => {
    if (localStorage.getItem(key) == null) {
      return false;
    } else {
      func(localStorage.getItem(key));
      return true;
    }
  };
  const setUserData = () => {
    if (token.length > 5) {
      getUserData(token).then((data) => {
        setUser(data);
      });
    }
  };
  const logOutCtx = () => {
    console.log("removing");
    if (localStorage.getItem("token") == null) {
    }
    else{
      logOut(token).then((data) => {
        localStorage.removeItem("token");
        setToken("");
        setUserData({});
      }); 
    }
  }

  useEffect(() => {
    if (confStorage("token", setToken)) {
      setUserData();
    }
  }, []);
  useEffect(() => {
    if (token !== "") {
      localStorage.setItem("token", token);
      setUserData();
    }
  }, [token]);
  //dodelat chyby napr. chybne prihlaseni
  return (
    <AppContext.Provider
      value={{ title, setTitle, token, setToken, user, setUser, logOutCtx }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
