import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const loadAuthData = () => {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("role");

      console.log("Stored token:", token);
      console.log("Stored role:", userRole);

      setIsAuthenticated(!!token);
      setRole(userRole || null);
    };

    loadAuthData();
    window.addEventListener("storage", loadAuthData);
    return () => window.removeEventListener("storage", loadAuthData);
  }, []);

  const login = (token, userRole) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
