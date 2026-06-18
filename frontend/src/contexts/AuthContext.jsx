import { createContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseConnection';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setUser({
          uid: userFirebase.uid,
          email: userFirebase.email
        });

        if (userFirebase.email === 'joaozinho@teste.com') {
          sessionStorage.setItem("userRole", "adm");
        } else {
          sessionStorage.setItem("userRole", "user");
        }
      } else {
        setUser(null);
        sessionStorage.removeItem("userRole");
      }
      setLoading(false);
    });

    return () => unsub(); 
  }, []);

  // Função de Login conectada ao Firebase
  async function login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem("userName", result.user.email);
    } catch (error) {
      console.error("Erro ao logar: ", error);
      throw error;
    }
  }

  const logout = async () => {
    sessionStorage.clear();
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao deslogar: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;