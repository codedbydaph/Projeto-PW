import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  const { signed, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const userName = sessionStorage.getItem("userName");
  const userRole = sessionStorage.getItem("userRole");

  const handleLogout = () => {
    logout();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img src="/img/logo1.png" className="logo" alt="Logo" />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#conteudoNavbarSuportado"
        aria-controls="conteudoNavbarSuportado"
        aria-expanded="false"
        aria-label="Alterna navegação">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="conteudoNavbarSuportado">
        <ul className="navbar-nav me-auto">

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Institucional</a>

            <div className="dropdown-menu">
              <a className="dropdown-item" href="https://observatorio3setor.org.br/lista-conheca-7-ongs-brasileiras-que-atuam-na-protecao-de-animais/" target="_blank" rel="noreferrer"> Projetos Sociais</a>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="https://love.doghero.com.br/dicas/ong-de-animais/" target="_blank" rel="noreferrer" > ONGs Parceiras </a>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">FAQ</a>

            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/como"> Como ajudar </Link>
            </div>
          </li>

          {signed && (
            <>
                  {userRole === "adm" && (
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Cadastros</a>

                    <div className="dropdown-menu">
                      {/* Links públicos para qualquer usuário logado ver */}
                    <Link className="dropdown-item" to="/pets">Adicionar Pet (CRUD1)</Link>
                    <Link className="dropdown-item" to="/usuarios">Adicionar Adotante (CRUD2)</Link>
                  
                    <Link className="dropdown-item" to="/crud3">Controle de Adoção (CRUD3 + JOIN)</Link>

                    </div>
                  </li>
                  )}
                
            </>
          )}
        </ul>

        <Link to="/catalogo" className="btn btn-outline-info me-2" >Animais</Link>
        <Link to="/voluntario" className="btn btn-outline-warning me-2">Voluntariado</Link>

        {signed ? (
          <div className="nav-item dropdown d-flex align-items-center" style={{ listStyle: 'none' }}>
            {/* O texto "Olá, Fulano" vira o botão gatilho do dropdown */}
            <a 
              className="nav-link dropdown-toggle fw-bold text-dark px-2" 
              href="#" 
              role="button" 
              data-bs-toggle="dropdown"
              style={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              Olá, {userName ? userName.split(" ")[0] : "Usuário"}!
            </a>
            
            {/* Caixinha suspensa contendo a opção de logout */}
            <div className="dropdown-menu dropdown-menu-end shadow-sm mt-2" style={{ right: 0, left: 'auto' }}>
              <button 
                onClick={handleLogout} 
                className="dropdown-item text-danger fw-bold d-flex align-items-center gap-2"
                style={{ cursor: 'pointer' }}
              >
                🚪 Sair da Conta
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Entrar
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;