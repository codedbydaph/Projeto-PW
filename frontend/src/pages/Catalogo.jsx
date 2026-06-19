import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/global.css";

function Catalogo() {
  const API_URL = "http://localhost:3000/api/pets";

  const [pets, setPets] = useState([]);

  const [modalAberto, setModalAberto] = useState(false);
  const [petSelecionado, setPetSelecionado] = useState(null);
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  useEffect(() => {
    carregarPets();
  }, []);

  async function carregarPets() {
    try {
      const responsePets = await fetch("http://localhost:3000/api/pets");
      const todosOsPets = await responsePets.json();

      const responseAdocoes = await fetch("http://localhost:3000/api/relatorio-join");
      const adocoesReais = await responseAdocoes.json();

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

  function iniciarSolicitacao(pet) {
    const userEmail = sessionStorage.getItem("userEmail");
    if (!userEmail) {
      alert("Você precisa estar logado para solicitar uma adoção!");
      return;
    }
    // Abre o modal visual passando o pet escolhido
    setPetSelecionado(pet);
    setModalAberto(true);
  }

  async function confirmarAdocao() {
    const userEmail = sessionStorage.getItem("userEmail"); 
    const userName = sessionStorage.getItem("userName") || "Usuário";

    if (!userEmail) {
      alert("Erro: E-mail do usuário não encontrado na sessão. Faça login novamente.");
      return;
    }

    try {
      const resUsuario = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          nome: userName, 
          email: userEmail, 
          sobrenome: "",
          telefone: "(00) 00000-0000",
          endereco: "Não informado",
          cidade: "Não informado",
          estado: "DF",
          cep: "00000-000"
        })
      });

      if (!resUsuario.ok) {
        throw new Error("Falha ao registrar ou buscar usuário no servidor.");
      }

      const dadosUsuario = await resUsuario.json();
      const usuarioId = dadosUsuario.id;

      if (!usuarioId) {
        console.error("Não foi possível obter o ID do usuário.");
        alert("Erro ao processar sua identidade de adotante. Tente novamente.");
        return;
      }

      const hoje = new Date().toISOString().split('T')[0];
      const resAdocao = await fetch("http://localhost:3000/api/adocoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          petId: Number(petSelecionado.id), 
          usuarioId: Number(usuarioId), 
          dataAdocao: hoje 
        })
      });

      if (resAdocao.ok) {
        setModalAberto(false);
        setMensagemSucesso(`✨ Solicitação enviada com sucesso! O ${petSelecionado.nome} foi encaminhado para aprovação.`);
        setTimeout(() => setMensagemSucesso(""), 4000);
        carregarPets(); 
      } else {
        throw new Error("Falha ao registrar a adoção no servidor.");
      }
    } catch (error) {
      console.error("Erro no fluxo de adoção:", error);
      alert("Houve um erro ao processar sua adoção. Verifique o console do servidor.");
    }
  }

  return (
    <>
      <div className="banner-adocao">
        <h1 className="h1c">Campanha de adoção</h1>
        <p>
          No Cafofo dos Peludos, acreditamos que cada animal merece uma
          chance de ser amado...
        </p>
      </div>
      {mensagemSucesso && (
        <div style={{
          backgroundColor: "#d4edda",
          color: "#155724",
          padding: "15px",
          borderRadius: "8px",
          margin: "20px auto",
          maxWidth: "800px",
          textAlign: "center",
          fontWeight: "bold",
          border: "1px solid #c3e6cb",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
        }}>
          {mensagemSucesso}
        </div>
      )}

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
                  <img className="card-img-top" src={pet.imagem} alt={pet.nome} />
                  <h5 className="card-title">{pet.nome}</h5>
                  <p className="card-text">
                    {pet.idade}<br />
                    Espécie: {pet.especie}<br />
                    {pet.descricao}
                  </p>
                  <button className="btn btn-info w-100 fw-bold text-white mt-2" onClick={() => iniciarSolicitacao(pet)}>
                      Quero Adotar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}

      {modalAberto && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "12px",
            maxWidth: "450px",
            width: "90%",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
          }}>
            <span style={{ fontSize: "50px" }}>🐾</span>
            <h4 style={{ margin: "15px 0 10px 0", color: "#2c3e50" }}>Confirmar Solicitação</h4>
            <p style={{ color: "#7f8c8d", fontSize: "15px" }}>
              Você tem certeza que deseja enviar uma solicitação de adoção para o peludo <strong>{petSelecionado?.nome}</strong>?
            </p>
            
            <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
              <button 
                onClick={() => setModalAberto(false)}
                style={{
                  flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc",
                  backgroundColor: "#fff", color: "#333", fontWeight: "bold", cursor: "pointer"
                }}
              >
                Cancelar
              </button>
              <button 
                onClick={confirmarAdocao}
                style={{
                  flex: 1, padding: "10px", borderRadius: "6px", border: "none",
                  backgroundColor: "#17a2b8", color: "#fff", fontWeight: "bold", cursor: "pointer"
                }}
              >
                Sim, Quero Adotar!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Catalogo;