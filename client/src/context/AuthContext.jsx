import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin] = useState({ id: 1, username: 'admin', fullname: 'Administrator', email: 'admin@example.com' });

  const logout = () => {};

  return (
    <AuthContext.Provider value={{ admin, logout, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
