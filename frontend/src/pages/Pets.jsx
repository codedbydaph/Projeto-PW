import React, { useState, useEffect } from "react";
import "../style/global.css";

function Pets() {
  const API_URL = "http://localhost:3000/api/pets";

  const [pets, setPets] = useState([]);

  const [formData, setFormData] = useState({
      id: null,
      imagem: "",
      nome: "",
      especie: "Cachorro",
      idade: "",
      descricao: "",
      status: "Disponível"
  });

  useEffect(() => {
    carregarPets();
  }, []);

  async function carregarPets() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error("Erro ao carregar pets:", error);
    }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    const fieldMap = {
      inputImagem: "imagem",
      inputNome: "nome",
      inputEspecie: "especie",
      inputDescricao: "descricao",
      inputIdade: "idade",
      inputStatus: "status"
    };

    setFormData({
      ...formData,
      [fieldMap[id]]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.id) {
        await fetch(`${API_URL}/${formData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        alert("Pet atualizado com sucesso!");
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        alert("Pet cadastrado com sucesso!");
      }

      limparFormulario();
      carregarPets();

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar pet.");
    }
  };

  const handleEdit = (pet) => {
    setFormData(pet);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja excluir este pet?")) {
      return;
    }

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      carregarPets();

    } catch (error) {
      console.error(error);
      alert("Erro ao excluir pet.");
    }
  };

  const limparFormulario = () => {
    setFormData({
      id: null,
      imagem: "",
      nome: "",
      especie: "Cachorro",
      idade: "",
      descricao: "",
      status: "Disponível"
    });
  };

  return (
    <>
      <header>
        <h1>Cadastro de Pets</h1>
      </header>

      <section className="form-container">
        <h2>
          {formData.id
            ? "Editar Pet"
            : "Adicionar Pet para Adoção"}
        </h2>

        <form className="pet-form" onSubmit={handleSubmit}>
        
          <label htmlFor="inputImagem">
            URL da Imagem:
          </label>

          <input
            type="text"
            id="inputImagem"
            value={formData.imagem}
            onChange={handleInputChange}
            placeholder="https://site.com/imagem.jpg"
/>
          <label htmlFor="inputNome">
            Nome do Pet:
          </label>

          <input
            type="text"
            id="inputNome"
            required
            value={formData.nome}
            onChange={handleInputChange}
            placeholder="Nome do pet"
          />

          <label htmlFor="inputEspecie">
            Espécie:
          </label>

          <select
            id="inputEspecie"
            value={formData.especie}
            onChange={handleInputChange}
          >
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
          </select>

          <label htmlFor="inputIdade">
            Idade:
          </label>

          <input
            type="text"
            id="inputIdade"
            required
            value={formData.idade}
            onChange={handleInputChange}
            placeholder="Ex: 2 anos"
          />

          <label htmlFor="inputDescricao">
            Descrição:
          </label>

          <input 
          type="text"
          id="inputDescricao"
          required
          value={formData.descricao}
          onChange={handleInputChange}
          placeholder="Filhote em busca de um Lar" 
          />

          <label htmlFor="inputStatus">
            Status:
          </label>

          <select
            id="inputStatus"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="Disponível">
              Disponível
            </option>

            <option value="Adotado">
              Adotado
            </option>
          </select>

          <div className="form-buttons-group">

            <button
              type="submit"
              className="btn-submit"
            >
              {formData.id
                ? "Salvar Alterações"
                : "Adicionar Pet"}
            </button>

            {formData.id && (
              <button
                type="button"
                className="btn-cancel"
                onClick={limparFormulario}
              >
                Cancelar
              </button>
            )}

          </div>

        </form>
      </section>

      <section className="form-container list-container">
        <h2>Pets Cadastrados</h2>

        {pets.length === 0 ? (
          <p className="no-data">
            Nenhum pet cadastrado.
          </p>
        ) : (
          <div className="cards-grid">

            {pets.map((pet) => (
              <div
                key={pet.id}
                className="adotante-card"
              >
                <p>
                  <strong>Nome:</strong> {pet.nome}
                </p>

                <p>
                  <strong>Espécie:</strong> {pet.especie}
                </p>

                <p>
                  <strong>Idade:</strong> {pet.idade}
                </p>

                <p>
                  <strong>Descrição:</strong> {pet.descricao}
                </p>

                <p>
                  <strong>Status:</strong> {pet.status}
                </p>

                <div className="card-actions">

                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => handleEdit(pet)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => handleDelete(pet.id)}
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
        <p>
          Entre em contato:
          {" "}
          <a href="mailto:CafofoDosPeludos@gmail.com">
            CafofoDosPeludos@gmail.com
          </a>
        </p>
      </footer>
    </>
  );
}

export default Pets;