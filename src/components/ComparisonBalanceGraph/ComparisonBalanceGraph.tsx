import React, { FC, useEffect, useState } from "react";
import styles from "./ComparisonBalanceGraph.module.css";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ApiService from "../../services/api";

import {
  LastMonthCanceledBalanceData,
  LastMonthCompletedBalanceData,
  MetricData,
  ThisMonthCanceledBalanceData,
  ThisMonthCompletedBalanceData,
} from "../../interfaces/types";

interface ComparisonBalanceGraphProps {}

const ComparisonBalanceGraph: FC<ComparisonBalanceGraphProps> = () => {
  const [currentCompletedBalance, setCurrentCompletedBalance] =
    useState<number>();
  const [lastCompletedBalance, setLastCompletedBalance] = useState<number>();

  const [lastCanceledBalance, setLastCanceledBalance] = useState<number>();
  const [currentCanceledBalance, setThisCanceledBalance] = useState<number>();

  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading)
        try {
          const lastCompletedResponse =
            await ApiService.fetchData<LastMonthCompletedBalanceData>(
              "admin/tasks/balance/completed/last"
            );
          setLastCompletedBalance(lastCompletedResponse.totalEstimateValue);

          const currentCompletedResponse =
            await ApiService.fetchData<ThisMonthCompletedBalanceData>(
              "admin/tasks/balance/completed/current"
            );

          setCurrentCompletedBalance(
            currentCompletedResponse.totalEstimateValue
          );

          const lastCanceledResponse =
            await ApiService.fetchData<LastMonthCanceledBalanceData>(
              "admin/tasks/balance/canceled/last"
            );
          setLastCanceledBalance(lastCanceledResponse.totalEstimateValue);

          const currentCanceledResponse =
            await ApiService.fetchData<ThisMonthCanceledBalanceData>(
              "admin/tasks/balance/canceled/current"
            );
          setThisCanceledBalance(currentCanceledResponse.totalEstimateValue);
        } catch (error) {
          console.error(error);
        }
    };

    fetchData();
  }, [isLoading]);

  console.log("rogerio: ", currentCompletedBalance, lastCompletedBalance);
  console.log("leticia: ", currentCanceledBalance, lastCanceledBalance);

  const data = [
    {
      name: "Entregues",
      atual: currentCompletedBalance,
      passado: lastCompletedBalance,
      amt: 5500,
    },
    {
      name: "Cancelados",
      atual: currentCanceledBalance,
      passado: lastCanceledBalance,
      amt: 2210,
    },
  ];
  return (
    <div className={styles.ComparisonBalanceGraph}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="atual" stackId="a" fill="#168aad" />
        <Bar dataKey="passado" stackId="a" fill="#bc4749" />
      </BarChart>
    </div>
  );
};

export default ComparisonBalanceGraph;
