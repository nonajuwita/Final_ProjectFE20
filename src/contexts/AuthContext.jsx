import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useLocalStorage("token", "");
  const [userRole, setUserRole] = useLocalStorage("role", "");

  useEffect(() => {
    

    // console.log("Stored token:", token);
    // console.log("Stored role:", userRole);
    console.log({userRole})  

    if (token && userRole) {
      setIsAuthenticated(true);
      setRole(userRole);
    } else {
      setIsAuthenticated(false);
      setRole(null);
    }

    setLoading(false);
  }, [token, userRole]);

  const login = (token, userRole) => {
    setToken(token);
    setUserRole(userRole);

    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
    localStorage.clear();
  };

  

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
