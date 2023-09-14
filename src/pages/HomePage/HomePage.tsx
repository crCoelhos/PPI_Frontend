import React from "react";
import styles from "./HomePage.module.css";
import PermanentLeftDrawer from "../../components/PermanentLeftDrawer/PermanentLeftDrawer";
import useSessionStorageUserData from "../../hooks/useSessionStorageUserData"; // Importe o hook
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";
import CurrentMetricTable from "../../components/CurrentMetricTable/CurrentMetricTable";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const { userData } = useSessionStorageUserData();

  return (
    <div className={styles.HomePage}>
      <PrimaryAppBar />
      <div>
        {userData ? (
          <div>
            <p>Autenticado como: {userData.name}</p>
            <CurrentMetricTable />
          </div>
        ) : (
          <p>Nenhum dado de usuário encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
