import { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('admin');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !admin) {
      getMe()
        .then((res) => setAdmin(res.data))
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('admin');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, adminData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('admin', JSON.stringify(adminData));
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, setAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
