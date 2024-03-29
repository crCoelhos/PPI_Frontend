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
import TaskDetails from "./components/TaskDetails/TaskDetails";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage/PasswordRecoveryPage";
import NewPasswordConfirmation from "./pages/NewPasswordConfirmation/NewPasswordConfirmation";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/login" element={<SigninPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
          <Route
            path="/new-password-confirmation"
            element={<NewPasswordConfirmation />}
          />

          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/customers" element={<CustomersPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
// TODO ajustar o botão de edit task, AJUSTAR A DATA NÃO TA FUNCIONANDO
// TODO ajustar o user asignment pra caso não haja nenhum asignment
// TODO considerar colocar divs com link para as atividades
// TODO arrumar o filtro, search não funcionando

export default App;
