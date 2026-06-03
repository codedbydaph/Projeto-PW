import { Link } from "react-router-dom";

function Navbar() {
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
              <Link className="dropdown-item" to="/pets">Adicionar Pet</Link>

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
        </ul>

        <Link to="/adocoes" className="btn btn-outline-info me-2" >Quero adotar</Link>

        <Link to="/voluntario" className="btn btn-outline-warning">Seja voluntário</Link>
      </div>
    </nav>
  );
}

export default Navbar;