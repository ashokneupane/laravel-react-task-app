import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = { email: "", name: "" };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState(initialState);

  const storeLoginUser = (userData) => {
    const user = { email: userData.email, name: userData.name };
    setIsAuthenticated(true);
    setAuthUser(user);
    localStorage.setItem("authUser", JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthUser(initialState);
    localStorage.removeItem("authUser");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setIsAuthenticated(true);
      setAuthUser(JSON.parse(storedUser));
    }
  }, []);

  // const checkAuth = async () => {
  //   try {
  //     // await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
  //     await axios.get("http://localhost:8000/task", { withCredentials: true });
  //     setIsAuthenticated(true);
  //   } catch (error) {
  //     setIsAuthenticated(false);
  //   }
  // };

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, storeLoginUser, authUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
