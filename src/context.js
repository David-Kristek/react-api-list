import React, { useState, useContext, useEffect } from "react";
import { writeStorage, useLocalStorage } from "@rehooks/local-storage";
import { getUserData, logOut } from "./api/authApi";
import { useHistory } from 'react-router-dom';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const history = useHistory();
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
    if (token.length > 10) {
      getUserData(token).then((data) => {
        setUser(data);
      });
    }
  };
  const logOutCtx = () => {
    if (localStorage.getItem("token") == null) {
    } else {
      logOut(token).then((data) => {
        localStorage.removeItem("token");
        setToken("");
        setUserData({});
        history.push('/login')
      });
    }
  };

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
