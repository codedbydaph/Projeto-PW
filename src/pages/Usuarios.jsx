import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../style/global.css';

function Usuarios() {
  const navigate = useNavigate();

  // 1. Estado para os campos do formulário
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
    
    // Mapeia o id do elemento HTML para a chave correspondente do estado
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

  // 2. Função para Criar ou Atualizar (CREATE & UPDATE)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.estado === "Escolher...") {
      alert("Por favor, selecione um estado válido.");
      return;
    }

    let listaAtualizada;

    if (formData.id) {
      // UPDATE: Se já tem ID, estamos editando um existente
      listaAtualizada = adotantes.map((adotante) =>
        adotante.id === formData.id ? formData : adotante
      );
      alert("Cadastro atualizado com sucesso!");
    } else {
      // CREATE: Se não tem ID, gera um novo com base no timestamp
      const novoAdotante = { ...formData, id: Date.now() };
      listaAtualizada = [...adotantes, novoAdotante];
      alert("Cadastro realizado com sucesso!");
    }

    // Salva na lista do estado e persiste no localStorage
    setAdotantes(listaAtualizada);
    localStorage.setItem("adotantes", JSON.stringify(listaAtualizada));

    // Limpa o formulário
    limparFormulario();

    // Redireciona para a página de concluído (opcional, remova se preferir ver a lista na hora)
    navigate("/concluido");
  };

  // 3. Função para carregar os dados no formulário para Edição (READ para edição)
  const handleEdit = (adotante) => {
    setFormData(adotante);
  };

  // 4. Função para deletar um adotante (DELETE)
  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este adotante?")) {
      const listaFiltrada = adotantes.filter((adotante) => adotante.id !== id);
      setAdotantes(listaFiltrada);
      localStorage.setItem("adotantes", JSON.stringify(listaFiltrada));
      
      // Se estivesse editando o usuário excluído, limpa o formulário
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

        {/* Formulário com onSubmit controlado */}
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

          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button type="submit" style={{ width: '100%' }}>
              {formData.id ? "Salvar Alterações" : "Confirmar Cadastro"}
            </button>
            {formData.id && (
              <button type="button" onClick={limparFormulario} style={{ width: '50%', backgroundColor: '#aaa' }}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Seção visual para LISTAR os Adotantes cadastrados (READ) */}
      <section className="form-container" style={{ marginTop: '30px' }}>
        <h2>Adotantes Cadastrados</h2>
        {adotantes.length === 0 ? (
          <p>Nenhum adotante cadastrado ainda.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
            {adotantes.map((adotante) => (
              <div key={adotante.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', background: '#f9f9f9' }}>
                <p><strong>Nome:</strong> {adotante.nome} {adotante.sobrenome}</p>
                <p><strong>Cidade/Estado:</strong> {adotante.cidade} - {adotante.estado}</p>
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button 
                    type="button" 
                    onClick={() => handleEdit(adotante)} 
                    style={{ backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Editar
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleDelete(adotante.id)} 
                    style={{ backgroundColor: '#f44336', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
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