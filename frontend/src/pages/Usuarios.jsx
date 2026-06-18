import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../style/global.css';

function Usuarios() {
  const navigate = useNavigate();

  // 🌟 Captura o cargo do usuário logado
  const userRole = sessionStorage.getItem("userRole");

  // Estado para os campos do formulário
  const [formData, setFormData] = useState({
    id: null,
    nome: "",
    sobrenome: "",
    endereco: "",
    endereco2: "",
    cidade: "",
    estado: "Escolher...",
    cep: ""
  });

  // Estado para armazenar a lista de adotantes salvos
  const [adotantes, setAdotantes] = useState([]);

  // CONEXÃO COM O BACKEND: Carrega os dados reais do Banco de Dados ao iniciar a página
  useEffect(() => {
    fetch("http://localhost:3000/api/usuarios")
      .then((res) => res.json())
      .then((data) => setAdotantes(data))
      .catch((err) => console.error("Erro ao buscar adotantes:", err));
  }, []);

  // Função para capturar as mudanças nos inputs
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    
    const fieldMap = {
      inputNome: "nome",
      inputSobrenome: "sobrenome",
      inputAddress: "endereco",
      inputAddress2: "endereco2",
      inputCity: "cidade",
      inputEstado: "estado",
      inputCEP: "cep"
    };

    setFormData({
      ...formData,
      [fieldMap[id]]: value
    });
  };

  // Função para Criar ou Atualizar conectando ao Backend (POST & PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nome.trim() ||
      !formData.sobrenome.trim() ||
      !formData.endereco.trim() ||
      !formData.cidade.trim() ||
      !formData.cep.trim()
    ) {
      alert("Por favor, preencha os campos corretamente.");
      return;
    }

    if (formData.estado === "Escolher...") {
      alert("Por favor, selecione um estado válido.");
      return;
    }

    try {
      if (formData.id) {
        // UPDATE (PUT) - Atualiza no banco de dados
        const response = await fetch(`http://localhost:3000/api/usuarios/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setAdotantes(adotantes.map((adotante) =>
            adotante.id === formData.id ? formData : adotante
          ));
          alert("Cadastro atualizado com sucesso!");
        }
      } else {
        // CREATE (POST) - Envia para o banco de dados
        const response = await fetch("http://localhost:3000/api/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const novoAdotanteCriado = await response.json();
          setAdotantes([...adotantes, novoAdotanteCriado]);
          alert("Cadastro realizado com sucesso!");
        }
      }

      limparFormulario();
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  // Função para carregar os dados no formulário para Edição
  const handleEdit = (adotante) => {
    setFormData(adotante);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  // Função para deletar um adotante no Backend (DELETE)
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este adotante?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setAdotantes(adotantes.filter((adotante) => adotante.id !== id));
          alert("Adotante removido com sucesso.");
          
          if (formData.id === id) {
            limparFormulario();
          }
        }
      } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Erro ao excluir o registro.");
      }
    }
  };

  const limparFormulario = () => {
    setFormData({
      id: null,
      nome: "",
      sobrenome: "",
      endereco: "",
      endereco2: "",
      cidade: "",
      estado: "Escolher...",
      cep: ""
    });
  };

  return (
    <>
      <header>
        <h1>Cadastro do Adotante</h1>
      </header>

      {/* O Formulário de cadastro permanece visível para TODOS */}
      <section className="form-container">
        <h2>{formData.id ? "Editando suas informações" : "Queremos saber mais sobre você"}</h2>

        <form className="pet-form" onSubmit={handleSubmit}>
          
          <label htmlFor="inputNome">Nome:</label>
          <input 
            type="text" 
            id="inputNome" 
            placeholder="Digite seu nome" 
            required 
            value={formData.nome || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="inputSobrenome">Sobrenome:</label>
          <input 
            type="text" 
            id="inputSobrenome" 
            placeholder="Digite seu sobrenome" 
            required 
            value={formData.sobrenome || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="inputAddress">Endereço:</label>
          <input 
            type="text" 
            id="inputAddress" 
            placeholder="Rua dos Bobos, nº 0" 
            required 
            value={formData.endereco || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="inputAddress2">Endereço 2 (Opcional):</label>
          <input 
            type="text" 
            id="inputAddress2" 
            placeholder="Apartamento, hotel, casa, etc." 
            value={formData.endereco2 || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="inputCity">Cidade:</label>
          <input 
            type="text" 
            id="inputCity" 
            placeholder="Sua cidade" 
            required 
            value={formData.cidade || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="inputEstado">Estado:</label>
          <select 
            id="inputEstado" 
            required 
            value={formData.estado || "Escolher..."}
            onChange={handleInputChange}
          >
            <option value="Escolher..." disabled>Escolher...</option>
            <option value="DF">Distrito Federal</option>
            <option value="GO">Goiás</option>
            <option value="SP">São Paulo</option>
            <option value="RJ">Rio de Janeiro</option>
          </select>

          <label htmlFor="inputCEP">CEP:</label>
          <input 
            type="text" 
            id="inputCEP" 
            placeholder="00000-000" 
            required 
            value={formData.cep || ""}
            onChange={handleInputChange}
          />

          <div className="form-buttons-group">
            <button type="submit" className="btn-submit">
              {formData.id ? "Salvar Alterações" : "Confirmar Cadastro"}
            </button>
            {formData.id && (
              <button type="button" className="btn-cancel" onClick={limparFormulario}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      {/* 👑 PRIVATIZAÇÃO: A seção inteira com os cards cadastrados (READ/UPDATE/DELETE) só renderiza para o ADM */}
      {userRole === "adm" && (
        <section className="form-container list-container">
          <h2>Adotantes Cadastrados</h2>
          {adotantes.length === 0 ? (
            <p className="no-data">Nenhum adotante cadastrado ainda.</p>
          ) : (
            <div className="cards-grid">
              {adotantes.map((adotante) => (
                <div key={adotante.id} className="adotante-card">
                  <p><strong>Nome:</strong> {adotante.nome} {adotante.sobrenome}</p>
                  <p><strong>Cidade/Estado:</strong> {adotante.cidade} - {adotante.estado}</p>
                  <p><strong>CEP:</strong> {adotante.cep}</p>
                  
                  <div className="card-actions">
                    <button 
                      type="button" 
                      className="btn-edit"
                      onClick={() => handleEdit(adotante)} 
                    >
                      Editar
                    </button>
                    <button 
                      type="button" 
                      className="btn-delete"
                      onClick={() => handleDelete(adotante.id)} 
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <footer>
        <p>Entre em contato: <a href="mailto:CafofoDosPeludos@gmail.com">CafofoDosPeludos@gmail.com</a></p>
      </footer>
    </>
  );
}

export default Usuarios;