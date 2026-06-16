import {
  createContext,
  useContext,
  useState,
} from "react";

const AdminAuthContext =
  createContext();

export function AdminAuthProvider({
  children,
}) {
  const [admin, setAdmin] =
    useState(
      localStorage.getItem("admin")
    );

  const login = (email) => {
    localStorage.setItem(
      "admin",
      email
    );

    setAdmin(email);
  };

  const logout = () => {
    localStorage.removeItem(
      "admin"
    );

    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () =>
  useContext(AdminAuthContext);