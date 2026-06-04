import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  // Puxa o estado de login e a função de logout do contexto global
  const { signed, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Limpa o localStorage e remove o estado do usuário 
    navigate("/login"); // Redireciona para o login na hora
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
              {signed && (
                <Link className="dropdown-item" to="/pets">Adicionar Pet</Link>
              )}

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
              <li className="nav-item">
                <Link className="nav-link" to="/relatorio">Relatórios</Link>
              </li>
            </>
          )}
        </ul>

        {/* Botões do lado direito da Navbar */}
        <Link to="/adocoes" className="btn btn-outline-info me-2" >Quero adotar</Link>

        <Link to="/voluntario" className="btn btn-outline-warning me-2">Seja voluntário</Link>

        {/* CONTROLE DINÂMICO DE LOGIN/LOGOUT */}
        {signed ? (
          // Se estiver logado, renderiza o botão de LOGOUT funcional 
          <button 
            onClick={handleLogout} 
            className="btn btn-danger"
          >
            Sair
          </button>
        ) : (
          // Se não estiver logado, exibe a opção de entrar no sistema
          <Link to="/login" className="btn btn-primary">
            Entrar
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;