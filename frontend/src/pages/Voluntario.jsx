import React, { useState } from "react";
import "../style/global.css";

function Voluntario() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    disponibilidade: "",
    mensagem: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Cadastro enviado com sucesso! Entraremos em contato em breve.");

    setFormData({
      nome: "",
      email: "",
      telefone: "",
      disponibilidade: "",
      mensagem: "",
    });
  };

  return (
    <main className="voluntario-page">
      <section className="voluntario-hero">
        <div>
          <h1>Seja voluntário</h1>
          <p>
            Ajude o Cafofo dos Peludos a cuidar, proteger e encontrar novos lares
            para animais que precisam de amor.
          </p>
        </div>
      </section>

      <section className="voluntario-container">
        <div className="voluntario-info">
          <h2>Como você pode ajudar?</h2>

          <p>
            Você pode contribuir com apoio em eventos, divulgação dos animais,
            transporte, cuidados temporários, arrecadações e outras ações da ONG.
          </p>

          <ul>
            <li>Participar de campanhas de adoção</li>
            <li>Ajudar na divulgação dos pets</li>
            <li>Apoiar eventos e arrecadações</li>
            <li>Oferecer lar temporário</li>
          </ul>
        </div>

        <form className="voluntario-form" onSubmit={handleSubmit}>
          <h2>Cadastro de voluntário</h2>

          <label htmlFor="nome">Nome completo</label>
          <input
            id="nome"
            name="nome"
            type="text"
            placeholder="Digite seu nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            placeholder="Digite seu telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />

          <label htmlFor="disponibilidade">Disponibilidade</label>
          <select
            id="disponibilidade"
            name="disponibilidade"
            value={formData.disponibilidade}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma opção</option>
            <option value="semana">Durante a semana</option>
            <option value="fim-de-semana">Fins de semana</option>
            <option value="eventos">Apenas em eventos</option>
            <option value="online">Ajuda online/divulgação</option>
          </select>

          <label htmlFor="mensagem">Como gostaria de ajudar?</label>
          <textarea
            id="mensagem"
            name="mensagem"
            placeholder="Conte um pouco sobre como você quer contribuir"
            value={formData.mensagem}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>

          <button type="submit">Enviar cadastro</button>
        </form>
      </section>
    </main>
  );
}

export default Voluntario;