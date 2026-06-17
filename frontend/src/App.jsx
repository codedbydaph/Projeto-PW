import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pets from "./pages/Pets";
import Usuarios from "./pages/Usuarios";
import Voluntario from "./pages/Voluntario";
import Como from "./pages/Como_Ajudar";
import Catalogo from "./pages/Catalogo";

import CRUD3 from "./pages/Adocoes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/como" element={<Como />} />

          <Route element={<PrivateRoute />}>
            <Route path="/voluntario" element={<Voluntario />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/crud3" element={<CRUD3 />} />
          </Route>

        </Routes>
      </AuthProvider>
      
    </BrowserRouter>
  );
}

export default App;