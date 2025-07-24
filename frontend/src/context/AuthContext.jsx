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

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, storeLoginUser, authUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
