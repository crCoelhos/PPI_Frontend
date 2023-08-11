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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
