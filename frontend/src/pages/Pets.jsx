import React, { useState, useEffect } from "react";
import '../style/global.css';

function Pets() {
  const [formData, setFormData] = useState({
    id: null,
    nome: "",
    tipo: "Cachorro",
    idade: "",
    descricao: ""
  });

  const [pets, setPets] = useState([]);
  
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("pets");

    if (dadosSalvos) {
      setPets(JSON.parse(dadosSalvos));
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    const fieldMap = {
      inputNome: "nome",
      inputTipo: "tipo",
      inputIdade: "idade",
      inputDescricao: "descricao"
    };

    setFormData({
      ...formData,
      [fieldMap[id]]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.nome.trim() === "" ||
      formData.idade.trim() === "" ||
      formData.descricao.trim() === ""
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    let listaAtualizada;

    if (formData.id) {
      // updatar pet ja adicionado
      listaAtualizada = pets.map((pet) =>
        pet.id === formData.id ? formData : pet
      );

      alert("Pet atualizado com sucesso!");
    } else {
      // "criar" nosso petzinho
      const novoPet = {
        ...formData,
        id: Date.now()
      };

      listaAtualizada = [...pets, novoPet];

      alert("Pet cadastrado com sucesso!");
    }

    setPets(listaAtualizada);

    localStorage.setItem(
      "pets",
      JSON.stringify(listaAtualizada)
    );

    limparFormulario();
  };

  return (
    <>
      <header>
        <h1>Adicione um Pet para Adoção</h1>
      </header>

      <section className="form-container">
        <h2>Preencha os detalhes abaixo para adicionar um pet à nossa lista de adoção.</h2>

        <form action="/submit-pet" method="POST" className="pet-form">
          <label htmlFor="nome">Nome do Pet:</label>
          <input type="text" id="nome" name="nome" placeholder="Nome do pet" required />

          <label htmlFor="tipo">Tipo de Animal:</label>
          <select id="tipo" name="tipo" required>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
            <option value="Outro">Outro</option>
          </select>

          <label htmlFor="idade">Idade do Pet:</label>
          <input type="text" id="idade" name="idade" placeholder="Idade do pet" required />

          <label htmlFor="descricao">Descrição:</label>
          <textarea id="descricao" name="descricao" placeholder="Descreva as características do pet" rows="4" required></textarea>

          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">Adicionar foto de pet</label>
            <input type="file" className="form-control-file" id="exampleFormControlFile1" />
          </div>

          <button type="submit">Adicionar Pet</button>
        </form>
      </section>

      <footer>
        <p>Entre em contato: <a href="mailto:CafofoDosPeludos@gmail.com">CafofoDosPeludos@gmail.com</a></p>
      </footer>
    </>
  );
}

export default Pets;
