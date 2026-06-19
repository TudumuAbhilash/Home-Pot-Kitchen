import { createContext, useContext, useState, useEffect } from "react";
import { loginAdmin } from "../api/strapi";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // 🔐 Restore session on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
      setUser({ token: savedToken });
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginAdmin(email, password);

    if (!data?.jwt) {
      throw new Error("Invalid login");
    }

    setUser(data.user);
    setToken(data.jwt);

    localStorage.setItem("token", data.jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");

    // force redirect safety
    window.location.href = "/admin/login";
  };

  return (
    <AdminAuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);