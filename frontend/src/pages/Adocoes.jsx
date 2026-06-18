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

  // backend Node.js
  const API_URL = "http://localhost:3000/api";

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const resPets = await fetch(`${API_URL}/pets`);
      if (resPets.ok) {
        const dataPets = await resPets.json();
        setAvailablePets(dataPets);
      }

      const resAdocoes = await fetch(`${API_URL}/relatorio-join`);
      if (resAdocoes.ok) {
        const dataAdocoes = await resAdocoes.json();
        setAdocoes(dataAdocoes);
      }

      const resUsuarios = await fetch(`${API_URL}/usuarios`);
      if (resUsuarios.ok) {
        const dataUsuarios = await resUsuarios.json();
        setAvailableUsuarios(dataUsuarios);
      }

    } catch (err) {
      console.error("Erro ao conectar com o backend:", err);
      setError("Não foi possível sincronizar os dados com o servidor.");
    }
  };

  const petsDisponiveisParaAdocao = availablePets.filter((pet) => {
    // Procura se o id deste pet já está registrado em alguma adoção na tabela
    const jaAdotado = adocoes.some((adocao) => Number(adocao.petId) === Number(pet.id));
    
    // Se você estiver editando uma adoção, o pet dela precisa reaparecer na lista para você poder mexer
    if (idEdicao) {
      const adocaoAtual = adocoes.find(a => Number(a.id) === Number(idEdicao));
      if (adocaoAtual && Number(pet.id) === Number(adocaoAtual.petId)) {
        return true; 
      }
    }

    return !jaAdotado;
  });

  // POST / PUT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!petId || !usuarioId || !dataAdocao) {
      setError("Por favor, selecione o Pet, o Adotante e a Data.");
      return;
    }

    const payload = {
      petId: Number(petId),
      usuarioId: Number(usuarioId),
      dataAdocao
    };

    try {
      if (idEdicao) {
        const response = await fetch(`${API_URL}/adocoes/${idEdicao}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error();
        setIdEdicao(null);
      } else {
        const response = await fetch(`${API_URL}/adocoes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error();
      }

      setPetId("");
      setUsuarioId("");
      setDataAdocao("");
      carregarDados();

    } catch (err) {
      setError("Erro ao processar a requisição no banco de dados.");
    }
  };

  const handleEdit = (item) => {
    setIdEdicao(item.id);
    setPetId(item.petId || "");
    setUsuarioId(item.usuarioId || "");
    if (item.data) {
      setDataAdocao(item.data.split("T")[0]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente cancelar este registro de adoção?")) {
      try {
        const response = await fetch(`${API_URL}/adocoes/${id}`, {
          method: "DELETE"
        });
        if (response.ok) carregarDados();
      } catch (err) {
        setError("Erro ao deletar o registro do banco.");
      }
    }
  };

  return (
    <div className="container-fluid w-100 px-4 mt-5" style={{ minHeight: "80vh" }}>
      <div className="row d-flex flex-row justify-content-between align-items-start m-0 w-100">
        
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
                  {petsDisponiveisParaAdocao.map(pet => (
                    <option key={pet.id} value={pet.id}>
                      {pet.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3 text-start">
                <label className="form-label d-block text-muted fw-bold"> Selecionar Adotante:</label>
                <select
                  className="form-select"
                  value={usuarioId}
                  onChange={(e) => setUsuarioId(e.target.value)}
                >
                  <option value="">Escolha um adotante...</option>
                  {availableUsuarios.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.nome}
                    </option>
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
                <button type="button" className="btn btn-light w-100" onClick={() => { setIdEdicao(null); setPetId(""); setUsuarioId(""); setDataAdocao(""); }}>
                  Cancelar
                </button>
              )}
            </form>
          </div>
        </div>

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
                        <td className="fw-bold text-start">{item.nomeAdotante}</td>
                        <td className="text-start">
                          <span className="badge bg-info">{item.nomePet}</span>
                        </td>
                        <td className="text-start">
                          {item.data ? new Date(item.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : "---"}
                        </td>
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