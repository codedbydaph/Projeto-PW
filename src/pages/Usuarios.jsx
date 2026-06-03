import React from "react";
import { Link } from "react-router-dom";
import '../style/global.css';

function Usuarios() {
  return (
    <>
      <header>
        <h1>Cadastro do Adotante</h1>
      </header>

      <section className="form-container">
        <h2>Queremos saber mais sobre você</h2>

        <form className="pet-form">
          
          <label htmlFor="inputNome">Nome:</label>
          <input type="text" id="inputNome" placeholder="Digite seu nome" required />

          <label htmlFor="inputSobrenome">Sobrenome:</label>
          <input type="text" id="inputSobrenome" placeholder="Digite seu sobrenome" required />

          <label htmlFor="inputAddress">Endereço:</label>
          <input type="text" id="inputAddress" placeholder="Rua dos Bobos, nº 0" required />

          <label htmlFor="inputAddress2">Endereço 2 (Opcional):</label>
          <input type="text" id="inputAddress2" placeholder="Apartamento, hotel, casa, etc." />

          <label htmlFor="inputCity">Cidade:</label>
          <input type="text" id="inputCity" placeholder="Sua cidade" required />

          <label htmlFor="inputEstado">Estado:</label>
          <select id="inputEstado" required defaultValue="Escolher...">
            <option value="Escolher..." disabled>Escolher...</option>
            <option value="DF">Distrito Federal</option>
            <option value="GO">Goiás</option>
            <option value="SP">São Paulo</option>
            <option value="RJ">Rio de Janeiro</option>
          </select>

          <label htmlFor="inputCEP">CEP:</label>
          <input type="text" id="inputCEP" placeholder="00000-000" required />

          <Link to="/concluido" className="text-center" style={{ textDecoration: 'none' }}>
            <button type="button" style={{ width: '100%' }}>Confirmar Cadastro</button>
          </Link>
        </form>
      </section>

      <footer>
        <p>Entre em contato: <a href="mailto:CafofoDosPeludos@gmail.com">CafofoDosPeludos@gmail.com</a></p>
      </footer>
    </>
  );
}

export default Usuarios;