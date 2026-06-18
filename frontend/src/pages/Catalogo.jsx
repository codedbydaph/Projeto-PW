import React, { useState, useEffect, useNavigate } from "react";
import { Link } from "react-router-dom";
import "../style/global.css";

function Catalogo() {
  const API_URL = "http://localhost:3000/api/pets";

  const [pets, setPets] = useState([]);

  useEffect(() => {
    carregarPets();
  }, []);

  async function carregarPets() {
    try {
      // 1. Busca todos os pets do banco
      const responsePets = await fetch("http://localhost:3000/api/pets");
      const todosOsPets = await responsePets.json();

      // 2. Busca as adoções reais direto do seu JOIN
      const responseAdocoes = await fetch("http://localhost:3000/api/relatorio-join");
      const adocoesReais = await responseAdocoes.json();

      // 3. REGRA DE NEGÓCIO: O pet só aparece se o status for "Disponível" 
      // E se o ID dele NÃO estiver em nenhuma adoção ativa no banco!
      const petsDisponiveis = todosOsPets.filter((pet) => {
        const jaAdotado = adocoesReais.some((adocao) => Number(adocao.petId) === Number(pet.id));
        return pet.status === "Disponível" && !jaAdotado;
      });

      setPets(petsDisponiveis);
    } catch (error) {
      console.error("Erro ao carregar pets no catálogo:", error);
    }
  }

  const petsPorLinha = [];

  for (let i = 0; i < pets.length; i += 4) {
    petsPorLinha.push(pets.slice(i, i + 4));
  }

  async function handleSolicitarAdocao(petId) {
  const userEmail = sessionStorage.getItem("userEmail");
  const userName = sessionStorage.getItem("userName");

  // bloqueia a ação se não tiver login nenhum ativo
  if (!userEmail) {
    alert("Você precisa estar logado para solicitar uma adoção!");
    return;
  }

  if (!window.confirm("Deseja enviar uma solicitação de adoção para este pet?")) {
    return;
  }

  try {
    // garante o vínculo do usuário do Gmail no MySQL (CRUD 2)
    const resUsuario = await fetch("http://localhost:3000/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: userName, email: userEmail, telefone: "(00) 00000-0000" })
    });

    const dadosUsuario = await resUsuario.json();
    const usuarioId = resUsuario.ok ? dadosUsuario.id : dadosUsuario.idIdExistente;

    // envia a solicitação para a tabela de adocoes (CRUD 3)
    const hoje = new Date().toISOString().split('T')[0];
    const resAdocao = await fetch("http://localhost:3000/api/adocoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ petId: Number(petId), usuarioId: Number(usuarioId), dataAdocao: hoje })
    });

    if (resAdocao.ok) {
      alert("✨ Solicitação enviada com sucesso! Ela foi encaminhada para a aprovação do Administrador.");
      carregarPets(); 
    }
  } catch (error) {
    console.error(error);
  }
}

  return (
    <>
      <div className="banner-adocao">
        <h1 className="h1c">Campanha de adoção</h1>

        <p>
          No Cafofo dos Peludos, acreditamos que cada animal merece uma
          chance de ser amado. Somos um abrigo dedicado a acolher aqueles
          que não tiveram um começo fácil, mas que, com o apoio de pessoas
          como você, podem encontrar um novo lar e um futuro cheio de carinho.
        </p>

        <p>
          Nosso objetivo é criar um mundo onde todos os animais tenham um lar
          seguro e cheio de amor. Junte-se a nós nessa missão!
        </p>
      </div>

      <h3>Pets disponíveis</h3>

      {pets.length === 0 ? (
        <div className="container">
          <p>Nenhum pet disponível para adoção.</p>
        </div>
      ) : (
        petsPorLinha.map((grupo, index) => (
          <div key={index} className="container">
            {grupo.map((pet) => (
              <div key={pet.id} className="card">

                <div className="card-body">
                  <img
                    className="card-img-top"
                    src={pet.imagem}
                    alt={pet.nome}
                  />

                  <h5 className="card-title">
                    {pet.nome}
                  </h5>

                  <p className="card-text">
                    {pet.idade}
                    <br />
                    Espécie: {pet.especie}  <br />
                    {pet.descricao}
                  </p>

                  <button className="btn btn-info w-100 fw-bold text-white mt-2" onClick={() => handleSolicitarAdocao(pet.id)}>
                      Quero Adotar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </>
  );
}

export default Catalogo;