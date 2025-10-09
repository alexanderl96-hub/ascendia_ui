import React, { createContext, useContext, useMemo, useState } from "react";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const s = localStorage.getItem("ascendia.auth");
    return s ? JSON.parse(s) : { userId: null, token: null, username: null };
  });

  const login = ({ userId, token, username }) => {
    const next = { userId, token: token ?? null, username: username ?? null };
    setAuth(next);
    localStorage.setItem("ascendia.auth", JSON.stringify(next));
  };

  const logout = () => {
    setAuth({ userId: null, token: null, username: null });
    localStorage.removeItem("ascendia.auth");
  };

  const value = useMemo(() => ({ ...auth, login, logout }), [auth]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
