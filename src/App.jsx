import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";

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
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/voluntario" element={<Voluntario />} />
          <Route path="/como" element={<Como />} />

          <Route element={<PrivateRoute />}>
            <Route path="/pets" element={<Pets />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/adocoes" element={<Adocoes />} />
            <Route path="/relatorio" element={<Relatorio />} />
            <Route path="/concluido" element={<Concluido />} />
          </Route>

        </Routes>
      </AuthProvider>
      
    </BrowserRouter>
  );
}

export default App;