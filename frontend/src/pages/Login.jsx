import React from "react";
import '../style/global.css';
import { useState, useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // função assíncrona para esperar a resposta do Firebase
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
            placeholder="Introduz a tua senha"
          />
        </div>

        <button type="submit" className="btn-login">Entrar</button>
      </form>
    </div>
  );
}

export default Login;