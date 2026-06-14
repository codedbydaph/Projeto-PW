import React, { useState, useEffect } from "react";

function Adocoes() {
  const [adocoes, setAdocoes] = useState([]);
  const [petId, setPetId] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [dataAdocao, setDataAdocao] = useState("");
  const [idEdicao, setIdEdicao] = useState(null);
  const [error, setError] = useState("");

  const [availablePets, setAvailablePets] = useState([]);
  const [availableUsuarios, setAvailableUsuarios] = useState([]);

  useEffect(() => {
    const adocoesSalvas = localStorage.getItem("@CafofoPeludos:adocoes");
    if (adocoesSalvas) setAdocoes(JSON.parse(adocoesSalvas));

    const petsSalvos = localStorage.getItem("@CafofoPeludos:pets");
    if (petsSalvos) {
      setAvailablePets(JSON.parse(petsSalvos));
    } else {
      const mockPets = [
        { id: "p1", nome: "Alex", especie: "Gato/Cachorro", idade: "6 meses" },
        { id: "p2", nome: "Sicha", especie: "Gato/Cachorro", idade: "3 meses" },
        { id: "p3", nome: "Mel", especie: "Gato/Cachorro", idade: "8 meses" },
        { id: "p4", nome: "Rosa", especie: "Gato/Cachorro", idade: "1 ano" },
        { id: "p5", nome: "Bob", especie: "Gato/Cachorro", idade: "10 meses" },
        { id: "p6", nome: "Will", especie: "Gato/Cachorro", idade: "2 anos" },
        { id: "p7", nome: "Chavosa", especie: "Gato/Cachorro", idade: "3 anos" },
        { id: "p8", nome: "Leo", especie: "Gato/Cachorro", idade: "6 meses" },
        { id: "p9", nome: "João", especie: "Gato/Cachorro", idade: "10 meses" },
        { id: "p10", nome: "3 Marias", especie: "Gato/Cachorro", idade: "1 ano" },
        { id: "p11", nome: "Melo", especie: "Gato/Cachorro", idade: "3 anos" },
        { id: "p12", nome: "Let", especie: "Gato/Cachorro", idade: "6 meses" }
      ];
      setAvailablePets(mockPets);
    }

    const usuariosSalvos = localStorage.getItem("@CafofoPeludos:usuarios");
    if (usuariosSalvos) {
      setAvailableUsuarios(JSON.parse(usuariosSalvos));
    } else {
      const mockUsuarios = [
        { id: "u1", nome: "Maria (Teste)" },
        { id: "u2", nome: "João (Teste)" }
      ];
      setAvailableUsuarios(mockUsuarios);
    }
  }, []);

  const getPetName = (id) => availablePets.find(p => p.id === id)?.nome || "Pet não encontrado";
  const getUsuarioName = (id) => availableUsuarios.find(u => u.id === id)?.nome || "Adotante não encontrado";

  const petsDisponiveisParaAdocao = availablePets.filter((pet) => {
    const jaAdotado = adocoes.some((adocao) => adocao.petId === pet.id);
    if (idEdicao) {
      const petEmEdicao = adocoes.find(a => a.id === idEdicao)?.petId;
      if (pet.id === petEmEdicao) return true;
    }
    return !jaAdotado;
  });

  const salvarLocalStorage = (listaAtualizada) => {
    setAdocoes(listaAtualizada);
    localStorage.setItem("@CafofoPeludos:adocoes", JSON.stringify(listaAtualizada));
  };

  const limparFormulario = () => {
    setPetId("");
    setUsuarioId("");
    setDataAdocao("");
    setIdEdicao(null);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!petId || !usuarioId || !dataAdocao) {
      setError("Por favor, selecione o Pet, o Adotante e a Data.");
      return;
    }

    if (idEdicao) {
      const listaEditada = adocoes.map((item) =>
        item.id === idEdicao ? { ...item, petId, usuarioId, dataAdocao } : item
      );
      salvarLocalStorage(listaEditada);
    } else {
      const novaAdocao = {
        id: Date.now().toString(),
        petId,
        usuarioId,
        dataAdocao
      };
      salvarLocalStorage([...adocoes, novaAdocao]);
    }

    limparFormulario();
  };

  const handleEdit = (item) => {
    setIdEdicao(item.id);
    setPetId(item.petId);
    setUsuarioId(item.usuarioId);
    setDataAdocao(item.dataAdocao);
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente cancelar este registro de adoção?")) {
      const listaFiltrada = adocoes.filter((item) => item.id !== id);
      salvarLocalStorage(listaFiltrada);
    }
  };

  return (
    <div className="container-fluid w-100 px-4 mt-5" style={{ minHeight: "80vh" }}>
      <div className="row d-flex flex-row justify-content-between align-items-start m-0 w-100">
        
        {/* COLUNA DO FORMULÁRIO */}
        <div className="col-12 col-md-4 mb-4" style={{ minWidth: "300px" }}>
          <div className="card p-4 shadow-sm" style={{ width: "100%", display: "block" }}>
            <h4 className="card-title text-center mb-4" style={{ whiteSpace: "nowrap" }}>
              {idEdicao ? "✏️ Editar Adoção" : "🤝 Vincular Adoção"}
            </h4>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-start">
                <label className="form-label d-block text-muted fw-bold">Selecione o Peludo</label>
                <select
                  className="form-select w-100"
                  value={petId}
                  onChange={(e) => setPetId(e.target.value)}
                >
                  <option value="">Escolha um pet...</option>
                  {/* Usa a lista filtrada aqui */}
                  {petsDisponiveisParaAdocao.map(pet => (
                    <option key={pet.id} value={pet.id}>{pet.nome}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3 text-start">
                <label className="form-label d-block text-muted fw-bold">Selecione o Adotante</label>
                <select
                  className="form-select w-100"
                  value={usuarioId}
                  onChange={(e) => setUsuarioId(e.target.value)}
                >
                  <option value="">Escolha um adotante...</option>
                  {availableUsuarios.map(user => (
                    <option key={user.id} value={user.id}>{user.nome}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3 text-start">
                <label className="form-label d-block text-muted fw-bold">Data da Adoção</label>
                <input
                  type="date"
                  className="form-control w-100"
                  value={dataAdocao}
                  onChange={(e) => setDataAdocao(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-info w-100 fw-bold mb-2 text-white">
                {idEdicao ? "Atualizar Vínculo" : "Confirmar Adoção 🐾"}
              </button>

              {idEdicao && (
                <button type="button" className="btn btn-light w-100" onClick={limparFormulario}>
                  Cancelar
                </button>
              )}
            </form>
          </div>
        </div>

        {/* COLUNA DA LISTAGEM DAS ADOÇÕES */}
        <div className="col-12 col-md-8 mb-4 flex-grow-1 ps-md-4">
          <div className="card p-4 shadow-sm w-100" style={{ display: "block" }}>
            <h4 className="mb-4 text-start">📋 Histórico de Adoções Diretas</h4>
            
            {adocoes.length === 0 ? (
              <div className="text-muted text-center my-5 py-4">
                <span style={{ fontSize: "2rem" }}>🐾</span>
                <p className="mt-2">Nenhuma adoção registrada ainda.</p>
              </div>
            ) : (
              <div className="table-responsive w-100">
                <table className="table table-hover align-middle w-100">
                  <thead className="table-light">
                    <tr>
                      <th style={{ minWidth: "150px" }}>Quem Adotou</th>
                      <th style={{ minWidth: "150px" }}>Peludo Escolhido</th>
                      <th style={{ minWidth: "100px" }}>Data</th>
                      <th className="text-end" style={{ minWidth: "140px" }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adocoes.map((item) => (
                      <tr key={item.id}>
                        <td className="fw-bold text-start">{getUsuarioName(item.usuarioId)}</td>
                        <td className="text-start"><span className="badge bg-info">{getPetName(item.petId)}</span></td>
                        <td className="text-start">{item.dataAdocao.split('-').reverse().join('/')}</td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(item)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Adocoes;