import React from "react";
import styles from "./HomePage.module.css";
import PermanentLeftDrawer from "../../components/PermanentLeftDrawer/PermanentLeftDrawer";
import useSessionStorageUserData from "../../hooks/useSessionStorageUserData"; // Importe o hook
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const { userData, token } = useSessionStorageUserData();
  console.log(userData);

  return (
    <div className={styles.HomePage}>
      <PrimaryAppBar />
      <div>
        {userData ? (
          <div>
            <h1>testando</h1>
            <h2>Dados do Usuário: {token}</h2>
            <p>Nome: {userData.email}</p>
          </div>
        ) : (
          <p>Nenhum dado de usuário encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
