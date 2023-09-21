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
  LastMonthBalanceData,
  LastMonthTaskCountData,
  MetricData,
  ThisMonthBalanceData,
  ThisMonthTaskCountData,
} from "../../interfaces/types";

interface ComparisonBalanceGraphProps {}

const ComparisonBalanceGraph: FC<ComparisonBalanceGraphProps> = () => {
  const [isLoading, setIsloading] = useState<boolean>(true);

  const [lastMonthBalanceData, setLastMonthBalanceData] =
    useState<LastMonthBalanceData | null>(null);

  const [currentMonthBalanceData, setCurrentMonthBalanceData] =
    useState<ThisMonthBalanceData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading)
        try {
          const response = await ApiService.fetchData<LastMonthBalanceData>(
            "admin/tasks/balance/last"
          );
          setLastMonthBalanceData(response);
          setIsloading(false);
        } catch (error) {
          console.error(error);
        }
    };

    fetchData();
  }, [isLoading]);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading)
        try {
          const response = await ApiService.fetchData<ThisMonthBalanceData>(
            "admin/tasks/balance/current"
          );
          setCurrentMonthBalanceData(response);
          setIsloading(false);
        } catch (error) {
          console.error(error);
        }
    };
    fetchData();
  }, [isLoading]);



  const data = [
    {
      name: "Entregues",
      atual: currentMonthBalanceData?.completedTasksBalance,
      passado: lastMonthBalanceData?.completedTasksBalance,
      amt: 5500,
    },
    {
      name: "Cancelados",
      atual: currentMonthBalanceData?.canceledTasksBalance,
      passado: lastMonthBalanceData?.canceledTasksBalance,
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
