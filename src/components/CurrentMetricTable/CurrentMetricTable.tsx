import React, { FC, useEffect, useState } from "react";
import styles from "./CurrentMetricTable.module.css";
import axios from "axios";
import ApiService from "../../services/api";
import { MetricData } from "../../interfaces/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface CurrentMetricTableProps {}

const CurrentMetricTable: FC<CurrentMetricTableProps> = () => {
  const [completedTasksCount, setCompletedTasksCount] = useState<number>(0);
  const [canceledTasksCount, setCanceledTasksCount] = useState<number>(0);
  const [pausedTasksCount, setPausedTasksCount] = useState<number>(0);
  const [doingTasksCount, setDoingTasksCount] = useState<number>(0);
  const [overdueTasksCount, setOverdueTasksCount] = useState<number>(0);

  useEffect(() => {
    console.log("Fetching data...");
    const fetchData = async () => {
      try {
        const metricResponse = await ApiService.fetchData<MetricData>(
          "admin/tasks/metric/2023/9"
        );
        setCanceledTasksCount(metricResponse.canceledTasksCount);
        setCompletedTasksCount(metricResponse.completedTasksCount);
        setPausedTasksCount(metricResponse.pausedTasksCount);
        setDoingTasksCount(metricResponse.doingTasksCount);
        setOverdueTasksCount(metricResponse.overdueTasksCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const customColors = ["#659157", "#FFF689", "#2E294E", "#7A0200", "#F4442E"];

  const data = [
    {
      name: "Concluídas",
      value: completedTasksCount,
      fill: customColors[0],
    },
    {
      name: "Pausadas",
      value: pausedTasksCount,
      fill: customColors[1],
    },
    {
      name: "Andamento",
      value: doingTasksCount,
      fill: customColors[2],
    },
    {
      name: "Canceladas",
      value: canceledTasksCount,
      fill: customColors[3],
    },
    {
      name: "Atrasadas",
      value: overdueTasksCount,
      fill: customColors[4],
    },
  ];

  return (
    <div className={styles.CurrentMetricTable}>
      <BarChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" />
      </BarChart>
    </div>
  );
};

export default CurrentMetricTable;
