import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/global.css";

function Catalogo() {
  const API_URL = "http://localhost:3000/api/pets";

  const [pets, setPets] = useState([]);

  useEffect(() => {
    carregarPets();
  }, []);

  async function carregarPets() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      const petsDisponiveis = data.filter(
        (pet) => pet.status === "Disponível"
      );

      setPets(petsDisponiveis);
    } catch (error) {
      console.error("Erro ao carregar pets:", error);
    }
  }

  const petsPorLinha = [];

  for (let i = 0; i < pets.length; i += 4) {
    petsPorLinha.push(pets.slice(i, i + 4));
  }

  return (
    <>
      <div className="banner-adocao">
        <h1 className="h1c">Campanha de adoção</h1>

        <p>
          No Cafofo dos Peludos, acreditamos que cada animal merece uma
          chance de ser amado. Somos um abrigo dedicado a acolher aqueles
          que não tiveram um começo fácil, mas que, com o apoio de pessoas
          como você, podem encontrar um novo lar e um futuro cheio de carinho.
        </p>

        <p>
          Nosso objetivo é criar um mundo onde todos os animais tenham um lar
          seguro e cheio de amor. Junte-se a nós nessa missão!
        </p>
      </div>

      <h3>Pets disponíveis</h3>

      {pets.length === 0 ? (
        <div className="container">
          <p>Nenhum pet disponível para adoção.</p>
        </div>
      ) : (
        petsPorLinha.map((grupo, index) => (
          <div key={index} className="container">
            {grupo.map((pet) => (
              <div key={pet.id} className="card">
                <img
                  className="card-img-top"
                  src={
                    pet.especie === "Cachorro"
                      ? "/img/cachorro.png"
                      : "/img/gato.png"
                  }
                  alt={pet.nome}
                />

                <div className="card-body">
                  <img
                    className="card-img-top"
                    src={pet.imagem}
                    alt={pet.nome}
                  />

                  <h5 className="card-title">
                    {pet.nome}
                  </h5>

                  <p className="card-text">
                    {pet.idade}
                    <br />
                    Espécie: {pet.especie}  <br />
                    {pet.descricao}
                  </p>

                  <Link
                    className="btn btn-info"
                    to="/usuarios"
                  >
                    Quero Adotar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </>
  );
}

export default Catalogo;

//       <h3>Pets disponíveis</h3>
//         {/* cards dos pets */}
//       <div className="container">
//         <div className="card">
//           <img className="card-img-top" src="img/alex.png" alt="Imagem de capa do card" />
//           <div className="card-body">
//             <h5 className="card-title">Alex</h5>
//             <p className="card-text"> 6 meses, Brasília DF,<br />
//              Alex é o explorador do grupo!  </p>
//              <Link className= "btn btn-info" to="/usuarios" > Quero Adotar </Link>
//           </div>
//         </div>

//         <div className="card">
//           <img className="className-img-top" src="img/sicha.png" alt="Imagem de capa do card" />
//           <div className="card-body">
//             <h5 className="card-title">Sicha</h5>
//             <p className="card-text">3 meses, Brasília DF, <br />
//                 Sicha é pura fofura! Meiga e carinhosa, ela adora um carinho!
//             </p>
//             <Link className= "btn btn-info" to="/usuarios" > Quero Adotar </Link>
//           </div>
//         </div>

//         <div className="card">
//           <img className="card-img-top" src="img/Mel.png" alt="Imagem de capa do card" />
//           <div className="card-body">
//             <h5 className="card-title">Mel</h5>
//             <p className="card-text">8 Meses, Brasília DF, <br />
//                 Mel é um encanto! Alegre e delicada.
//             </p>
//             <Link className= "btn btn-info" to="/usuarios" > Quero Adotar </Link>
//           </div>
//         </div>

//         <div className="card">
//           <img className="card-img-top" src="img/Rosa.png" alt="Imagem de capa do card" />
//           <div className="card-body">
//             <h5 className="card-title">Rosa</h5>
//             <p className="card-text">1 ano, Brasília DF, <br />
//                 Rosa é um amor!
//             </p>
//             <Link className= "btn btn-info" to="/usuarios" > Quero Adotar </Link>
//           </div>
//         </div>
//       </div>

//       <div className="container"> 
//         <div className="card">
//           <img className="card-img-top" src="img/bob.png" alt="Imagem de capa do card" />
//           <div className="card-body">
//             <h5 className="card-title">Bob</h5>
//             <p className="card-text"> 10 meses, Brasília DF,<br />
//              Bob é muito animado, tem muita energia pra gastar!  </p>
//             <Link className= "btn btn-info" to="/usuarios" > Quero Adotar </Link>
//           </div>
//         </div>

//         <div className="card">
//           <img className="card-img-top" src="img/Will.png" alt="Imagem de capa do card" />
//           <div className="card-body">
//             <h5 className="card-title">Will</h5>
//             <p className="card-text"> 2 anos, Brasília DF,<br />
//              will é o introverdido do grupo!  </p>
//             <Link className= "btn btn-info" to="/usuarios" > Quero Adotar </Link>
//           </div>
//         </div>

//         <div className="card">
//           <img className="card-img-top" src="img/chavosa.png" alt="Imagem de capa do card" />
//           <div className="card-body">
//             <h5 className="card-title">Chavosa</h5>
//             <p className="card-text"> 3 anos, Brasília DF,<br />
//              Chavosa é extremamente fofa e estilosa!  </p>
//             <Link className= "btn btn-info" to="/usuarios" > Quero Adotar </Link>
//           </div>
//         </div>

//         <div className="card">
//           <img className="card-img-top" src="img/Leo.png" alt="Imagem de capa do card" />
//           <div className="card-body">
//             <h5 className="card-title">Leo</h5>
//             <p className="card-text"> 6 meses, Brasília DF,<br />
//              Leo adora brincar com os outros gatos, super extrovertido!  </p>
//             <Link className= "btn btn-info" to="/usuarios" > Quero Adotar </Link>
//           </div>
//         </div>
//       </div>

//       <div className="container"> 
//         <div className="card">
//           <img className="card-img-top" src="img/Joao.png" alt="Imagem de capa do card" />
//           <div className="card-body">
//             <h5 className="card-title">João</h5>
//             <p className="card-text"> 10 meses, Brasília DF,<br />
//              João é muito animado, tem muita energia pra gastar!  </p>
//             <Link className= "btn btn-info" to="/usuarios" > Quero Adotar </Link>
//           </div>
//         </div>

//         <div className="card">
//           <img className="card-img-top" src="img/marias.png" alt="Imagem de capa do card" />
//           <div className="card-body">
//             <h5 className="card-title">3 Marias</h5>
//             <p className="card-text"> 1 anos, Brasília DF,<br />
//              As Marias são irmãs que cresceram juntas e não podem se separar!   </p>
//             <Link className= "btn btn-info" to="/usuarios" > Quero Adotar </Link>
//           </div>
//         </div>

//         <div className="card">
//           <img className="card-img-top" src="img/melo.png" alt="Imagem de capa do card" />
//           <div className="card-body">
//             <h5 className="card-title">Melo</h5>
//             <p className="card-text"> 3 anos, Brasília DF,<br />
//              Caramelo mais divertido de todos!  </p>
//             <Link className= "btn btn-info" to="/usuarios" > Quero Adotar </Link>
//           </div>
//         </div>

//         <div className="card">
//           <img className="card-img-top" src="img/let.png" alt="Imagem de capa do card" />
//           <div className="card-body">
//             <h5 className="card-title">Let</h5>
//             <p className="card-text"> 6 meses, Brasília DF,<br />
//              Let adora brincar com os outros gatos, super extrovertido!  </p>
//             <Link className= "btn btn-info" to="/usuarios" > Quero Adotar </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }