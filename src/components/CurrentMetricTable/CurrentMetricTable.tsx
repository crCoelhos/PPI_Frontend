import React, { FC, useEffect, useState } from "react";
import styles from "./CurrentMetricTable.module.css";
import axios from "axios";
import ApiService from "../../services/api";
import { LastMonthTaskCountData, MetricData, ThisMonthTaskCountData } from "../../interfaces/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { CircularProgress } from "@mui/material";

interface CurrentMetricTableProps {}

const CurrentMetricTable: FC<CurrentMetricTableProps> = () => {
  const [lastMonthCountData, setLastMonthCountData] =
    useState<LastMonthTaskCountData | null>(null);

  const [currentMonthCountData, setCurrentMonthCountData] =
    useState<ThisMonthTaskCountData | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (isLoading)
  //       try {
  //         const response = await ApiService.fetchData<ThisMonthTaskCountData>(
  //           "admin/tasks/metric/last"
  //         );
  //         setCurrentMonthCountData(response);
  //         setIsloading(false);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //   };
  //   fetchData();
  // }, [isLoading]);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading)
        try {
          const response = await ApiService.fetchData<ThisMonthTaskCountData>(
            "admin/tasks/metric/current"
          );
          setCurrentMonthCountData(response);
          setIsloading(false);
        } catch (error) {
          console.error(error);
        }
    };
    fetchData();
  }, [isLoading]);


  const customColors = ["#007f5f", "#FFF689", "#2E294E", "#7A0200", "#bc4749"];

  const data = [
    {
      name: "Concluídas",
      value: currentMonthCountData?.completedTasksCount,
      fill: customColors[0],
    },
    {
      name: "Pausadas",
      value: currentMonthCountData?.pausedTasksCount,
      fill: customColors[1],
    },
    {
      name: "Andamento",
      value: currentMonthCountData?.doingTasksCount,
      fill: customColors[2],
    },
    {
      name: "Canceladas",
      value: currentMonthCountData?.canceledTasksCount,
      fill: customColors[3],
    },
    {
      name: "Atrasadas",
      value: currentMonthCountData?.overdueTasksCount,
      fill: customColors[4],
    },
  ];

  return (
    <div className={styles.CurrentMetricTable}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <BarChart width={600} height={400} data={data}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="value" />
        </BarChart>
      )}
    </div>
  );
};

export default CurrentMetricTable;
