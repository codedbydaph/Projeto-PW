import { createContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseConnection';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitora em tempo real se o usuário está logado no Firebase (Trata o F5 de forma nativa!)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setUser({
          uid: userFirebase.uid,
          email: userFirebase.email
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsub(); // Limpa o listener ao desmontar
  }, []);

  // Função de Login conectada ao Firebase
  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Erro ao logar: ", error);
      throw error;
    }
  }

  // Função de Logout conectada ao Firebase
  async function logout() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;