import { createContext, useState, useEffect } from 'react';

// Certifique-se de que a palavra "export" está exatamente aqui antes do const!
export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storagedUser = localStorage.getItem('@CafofoPeludos:user');
    if (storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
    setLoading(false);
  }, []);

  function login(email, password) {
    const mockUser = { email, name: 'Admin Peludos' };
    setUser(mockUser);
    localStorage.setItem('@CafofoPeludos:user', JSON.stringify(mockUser));
  }

  function logout() {
    localStorage.removeItem('@CafofoPeludos:user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}