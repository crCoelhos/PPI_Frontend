import React from "react";
import styles from "./HomePage.module.css";
import PermanentLeftDrawer from "../../components/PermanentLeftDrawer/PermanentLeftDrawer";
import useSessionStorageUserData from "../../hooks/useSessionStorageUserData"; // Importe o hook
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";
import CurrentMetricTable from "../../components/CurrentMetricTable/CurrentMetricTable";
import ComparisonBalanceGraph from "../../components/ComparisonBalanceGraph/ComparisonBalanceGraph";
import { Grid } from "@mui/material";
import ComparisonTaskCountGraph from "../../components/ComparisonTaskCountGraph/ComparisonTaskCountGraph";

interface HomePageProps {}
const currentDate = Date();
const HomePage: React.FC<HomePageProps> = () => {
  const { userData } = useSessionStorageUserData();

  return (
    <div className={styles.HomePage}>
      <PrimaryAppBar />
      <div>
        {userData ? (
          <div>
            <h1>Métricas, com base na data: {currentDate}</h1>

            <Grid container spacing={2}>
              <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                <h2>Métricas das tarefas no mês {} por situação</h2>
                <CurrentMetricTable />
              </Grid>
              <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                <h2>Balanço comparativo mês atual x mês anterior</h2>
                <ComparisonBalanceGraph />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                <CurrentMetricTable />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                <ComparisonTaskCountGraph />
              </Grid>
            </Grid>
          </div>
        ) : (
          <p>Nenhum dado de usuário encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
