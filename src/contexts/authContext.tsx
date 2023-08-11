import React, { createContext, useState } from "react";
import { AuthContextType } from "../interfaces/types";

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState("");

  const contextValue: AuthContextType = {
    token,
    setToken,
    children,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
