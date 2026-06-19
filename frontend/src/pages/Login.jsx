import React from "react";
import '../style/global.css';
import { useState, useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import { auth } from "../services/firebaseConnection";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // SUA FUNÇÃO ATUAL (Mantida intacta)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await login(email, password);
      navigate('/catalogo');
    } catch (err) {
      console.error(err);
      if (
        err.code === 'auth/invalid-credential' || 
        err.code === 'auth/wrong-password' || 
        err.code === 'auth/user-not-found'
      ) {
        setError('E-mail ou senha incorretos.');
      } else if (err.code === 'auth/invalid-email') {
        setError('O formato do e-mail digitado é inválido.');
      } else {
        setError('Falha ao conectar com o serviço de autenticação. Verifica a tua rede.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      // Abre o pop-up nativo do Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Guarda os dados cruciais da sessão para usar no "Quero Adotar" do Catálogo
      sessionStorage.setItem("userEmail", user.email);
      sessionStorage.setItem("userName", user.displayName);

      // Redireciona para o catálogo igual ao login tradicional
      navigate('/catalogo');
    } catch (err) {
      console.error(err);
      setError('Falha ao autenticar com o Google. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <h2>Acesso ao Cafofo dos Peludos</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
        
        <div className="form-group">
          <label>E-mail:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="exemplo@teste.com"
          />
        </div>

        <div className="form-group">
          <label>Senha:</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </div>

        <button type="submit">Entrar</button>

        {/* 🌟 DIVISOR MODERNO ESTILO FACEBOOK/GOOGLE */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          margin: '25px 0',
          color: '#8a8d91' // Cinza suave do Facebook
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#ced0d4' }}></div>
          <span style={{ padding: '0 15px', fontSize: '14px', fontWeight: '500' }}>ou</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#ced0d4' }}></div>
        </div>
        
        {/* 🌟 BOTÃO DO GOOGLE TOTALMENTE ATUALIZADO */}
        <button 
          type="button" 
          onClick={handleGoogleLogin}
          style={{
            backgroundColor: '#ffffff',
            color: '#1c1e21', // Cor de texto escura padrão de acessibilidade
            border: '1px solid #ced0d4', // Borda sutil padrão Meta/Facebook Design
            borderRadius: '6px', // Cantos levemente arredondados modernos
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            cursor: 'pointer',
            width: '100%',
            height: '44px', // Altura padrão de botões mobile e web modernos
            fontSize: '15px',
            fontWeight: '600',
            transition: 'background-color 0.2s, box-shadow 0.2s',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f6f7';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
          }}
        >
          <img 
            src="/img/google.png" 
            alt="Google" 
            style={{ width: "20px", height: "20px" }} 
          />
          Entrar com o Google
        </button>
      </form>
    </div>
  );
}

export default Login;