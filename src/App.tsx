import React from "react";
import { AuthProvider } from "./contexts/authContext";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import TeamPage from "./pages/TeamPage/TeamPage";
import TasksPage from "./pages/TasksPage/TasksPage";
import SigninPage from "./pages/SigninPage/SigninPage";
import CustomersPage from "./pages/CustomersPage/CustomersPage";
import SchedulePage from "./pages/SchedulePage/SchedulePage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/login" element={<SigninPage />} />
          <Route path="/signin" element={<SigninPage />} />

          <Route path="/home" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/customers" element={<CustomersPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// TODO replicar o modal de edição do tasks para todos os outros
// TODO ajustar o botão de edit ^


export default App;
