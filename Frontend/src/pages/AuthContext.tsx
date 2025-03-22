import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface AuthContextType {
  user: boolean;
  loading: boolean;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      
      const response = await axios.get("http://localhost:3000/api/v1/auth/check", { withCredentials: true });

      console.log("This is the response:", response);
console.log("Response data:", response.data);

      if (response.data.authenticated) {
        setUser(true);
      } else {
        setUser(false);
      }
      console.log(setUser)
    } catch (error) {
      setUser(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
