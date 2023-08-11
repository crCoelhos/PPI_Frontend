import React from "react";
import { AuthProvider } from "./contexts/authContext";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TeamPage from "./pages/TeamPage/TeamPage";
import TasksPage from "./pages/TasksPage/TasksPage";
import SigninPage from "./pages/SigninPage/SigninPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/signin" element={<SigninPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// TODO MELHORAR VISUALIZAÇÃO DAS TABELAS
// TODO CRIAR COMPONENTE DE CRUD NAS PAGINAS DE EXIBIÇÃO
// TODO CRIAR COMPONENTE EM MODAL PARA INSERÇÃO DE NOVOS USUARIOS, TAREFAS E CLIENTES
// TODO CRIAR COMPONENTE E TABELA DE CLIENTES

export default App;
