import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pets from "./pages/Pets";
import Usuarios from "./pages/Usuarios";
import Relatorio from "./pages/Relatorio";
import Voluntario from "./pages/Voluntario";
import Como from "./pages/Como_Ajudar";
import Adocoes from "./pages/Adocoes";
import Concluido from "./pages/Concluido";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/adocoes" element={<Adocoes />} />
        <Route path="/relatorio" element={<Relatorio />} />
        <Route path="/voluntario" element={<Voluntario />} />
        <Route path="/como" element={<Como />} />
        <Route path="/concluido" element={<Concluido />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;