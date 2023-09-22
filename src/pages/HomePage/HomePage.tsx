import React from "react";
import styles from "./HomePage.module.css";
import PermanentLeftDrawer from "../../components/PermanentLeftDrawer/PermanentLeftDrawer";
import useSessionStorageUserData from "../../hooks/useSessionStorageUserData"; // Importe o hook
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";
import CurrentMetricTable from "../../components/CurrentMetricTable/CurrentMetricTable";
import ComparisonBalanceGraph from "../../components/ComparisonBalanceGraph/ComparisonBalanceGraph";
import { Grid } from "@mui/material";
import ComparisonTaskCountGraph from "../../components/ComparisonTaskCountGraph/ComparisonTaskCountGraph";
import YearBalanceGraph from "../../components/YearBalanceGraph/YearBalanceGraph";
import BalanceGraphComparisonByMonths from "../../components/BalanceGraphComparisonByMonths/BalanceGraphComparisonByMonths";

interface HomePageProps {}

const currentDate = new Date();

// Obtenha o mês e o ano da data
const month = currentDate.toLocaleString("pt-BR", { month: "long" });
const year = currentDate.getFullYear();

const HomePage: React.FC<HomePageProps> = () => {
  const { userData } = useSessionStorageUserData();

  return (
    <div className={styles.HomePage}>
      <PrimaryAppBar />
      <div>
        {userData ? (
          <div>
            <h1>
              Métricas, com base no periodo de {month}/{year}
            </h1>

            <hr />

            <Grid container spacing={12}>
              <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                <h2>Métricas das tarefas no mês {} por situação</h2>
                <CurrentMetricTable />
              </Grid>
              <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                <h2>Balanço comparativo mês atual x mês anterior</h2>
                <ComparisonBalanceGraph />
              </Grid>
            </Grid>

            <hr />

            <Grid container spacing={12}>
              <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                <h2>Balanço anual</h2>

                <YearBalanceGraph />
              </Grid>
              <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                <h2>Comparativo de mes sob demanda</h2>

                <BalanceGraphComparisonByMonths />
              </Grid>
            </Grid>

            {/* <hr /> */}

            {/* <Grid container spacing={12}>
              <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                <h2>
                  Acompanhamento dos ultimos 60 dias (conclusões e
                  cancelamentos)
                </h2>

                <ComparisonTaskCountGraph />
              </Grid>
            </Grid> */}
          </div>
        ) : (
          <p>Nenhum dado de usuário encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
