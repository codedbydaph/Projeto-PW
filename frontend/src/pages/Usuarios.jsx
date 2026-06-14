import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../style/global.css';

function Usuarios() {
  const navigate = useNavigate();

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

  // Carrega os dados salvos no localStorage ao iniciar a página
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("adotantes");
    if (dadosSalvos) {
      setAdotantes(JSON.parse(dadosSalvos));
    }
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

  // Função para Criar ou Atualizar (CREATE & UPDATE)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.estado === "Escolher...") {
      alert("Por favor, selecione um estado válido.");
      return;
    }

    let listaAtualizada;

    if (formData.id) {
      // UPDATE
      listaAtualizada = adotantes.map((adotante) =>
        adotante.id === formData.id ? formData : adotante
      );
      alert("Cadastro atualizado com sucesso!");
    } else {
      // CREATE
      const novoAdotante = { ...formData, id: Date.now() };
      listaAtualizada = [...adotantes, novoAdotante];
      alert("Cadastro realizado com sucesso!");
    }

    setAdotantes(listaAtualizada);
    localStorage.setItem("adotantes", JSON.stringify(listaAtualizada));
    limparFormulario();
    navigate("/concluido");
  };

  // Função para carregar os dados no formulário para Edição
  const handleEdit = (adotante) => {
    setFormData(adotante);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Sobe a página suavemente para o formulário
  };

  // Função para deletar um adotante (DELETE)
  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este adotante?")) {
      const listaFiltrada = adotantes.filter((adotante) => adotante.id !== id);
      setAdotantes(listaFiltrada);
      localStorage.setItem("adotantes", JSON.stringify(listaFiltrada));
      
      if (formData.id === id) {
        limparFormulario();
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

      <section className="form-container">
        <h2>{formData.id ? "Editando suas informações" : "Queremos saber mais sobre você"}</h2>

        <form className="pet-form" onSubmit={handleSubmit}>
          
          <label htmlFor="inputNome">Nome:</label>
          <input 
            type="text" 
            id="inputNome" 
            placeholder="Digite seu nome" 
            required 
            value={formData.nome}
            onChange={handleInputChange}
          />

          <label htmlFor="inputSobrenome">Sobrenome:</label>
          <input 
            type="text" 
            id="inputSobrenome" 
            placeholder="Digite seu sobrenome" 
            required 
            value={formData.sobrenome}
            onChange={handleInputChange}
          />

          <label htmlFor="inputAddress">Endereço:</label>
          <input 
            type="text" 
            id="inputAddress" 
            placeholder="Rua dos Bobos, nº 0" 
            required 
            value={formData.endereco}
            onChange={handleInputChange}
          />

          <label htmlFor="inputAddress2">Endereço 2 (Opcional):</label>
          <input 
            type="text" 
            id="inputAddress2" 
            placeholder="Apartamento, hotel, casa, etc." 
            value={formData.endereco2}
            onChange={handleInputChange}
          />

          <label htmlFor="inputCity">Cidade:</label>
          <input 
            type="text" 
            id="inputCity" 
            placeholder="Sua cidade" 
            required 
            value={formData.cidade}
            onChange={handleInputChange}
          />

          <label htmlFor="inputEstado">Estado:</label>
          <select 
            id="inputEstado" 
            required 
            value={formData.estado}
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
            value={formData.cep}
            onChange={handleInputChange}
          />

          {/* Grupo de botões do formulário */}
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

      {/* Nova seção para LISTAR os Adotantes cadastrados (READ) */}
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

      <footer>
        <p>Entre em contato: <a href="mailto:CafofoDosPeludos@gmail.com">CafofoDosPeludos@gmail.com</a></p>
      </footer>
    </>
  );
}

export default Usuarios;