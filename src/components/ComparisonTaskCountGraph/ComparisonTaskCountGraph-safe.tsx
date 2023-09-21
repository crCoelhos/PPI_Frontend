import React, { FC, useEffect, useState } from "react";
import styles from "./ComparisonTaskCountGraph.module.css";

import ApiService from "../../services/api";

import { PieChart, Pie, Sector, ResponsiveContainer, Legend } from "recharts";
import {
  LastMonthTaskCountData,
  ThisMonthTaskCountData,
} from "../../interfaces/types";
import { Typography } from "@mui/material";

interface ComparisonTaskCountGraphProps {}

const currentColor = "#007f5f";
const lastColor = "#bc4749";

const ComparisonTaskCountGraph: FC<ComparisonTaskCountGraphProps> = () => {
  const [lastMonthCountData, setLastMonthCountData] =
    useState<LastMonthTaskCountData | null>(null);

  const [currentMonthCountData, setCurrentMonthCountData] =
    useState<ThisMonthTaskCountData | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(true);

  const [total, setTotal] = useState<number>(0);

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

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading)
        try {
          const response = await ApiService.fetchData<LastMonthTaskCountData>(
            "admin/tasks/metric/last"
          );
          setLastMonthCountData(response);
          setIsloading(false);
        } catch (error) {
          console.error(error);
        }
    };
    fetchData();
  }, [isLoading]);

  const totalcompleted =
    (currentMonthCountData?.completedTasksCount || 0) +
    (lastMonthCountData?.completedTasksCount || 0);

  const parsedCurrentCompletedValue = parseFloat(
    (
      ((currentMonthCountData?.completedTasksCount || 0) / totalcompleted) *
      100
    ).toFixed(2)
  );

  const parsedLastCompletedValue = parseFloat(
    (
      ((lastMonthCountData?.completedTasksCount || 0) / totalcompleted) *
      100
    ).toFixed(2)
  );

  const totalcanceled =
    (currentMonthCountData?.canceledTasksCount || 0) +
    (lastMonthCountData?.canceledTasksCount || 0);

  const parsedCurrentCanceledValue = parseFloat(
    (
      ((currentMonthCountData?.canceledTasksCount || 0) / totalcanceled) *
      100
    ).toFixed(2)
  );

  const parsedLastCanceledValue = parseFloat(
    (
      ((lastMonthCountData?.canceledTasksCount || 0) / totalcanceled) *
      100
    ).toFixed(2)
  );

  const data01 = [
    {
      name: "Mês atual",
      value: parsedCurrentCompletedValue,
      fill: currentColor,
    },
    {
      name: "Ultimo mês",
      value: parsedLastCompletedValue,
      fill: lastColor,
    },
  ];

  const data02 = [
    {
      name: "Mês atual",
      value: parsedCurrentCanceledValue,
      fill: currentColor,
    },
    {
      name: "Ultimo mês",
      value: parsedLastCanceledValue,
      fill: lastColor,
    },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className={styles.ComparisonTaskCountGraph}>
      <div>
        <Typography variant="body1">
          Grau de conclusão em relação ao mês anterior
        </Typography>
        <PieChart width={350} height={200}>
          <Pie
            data={data01}
            dataKey="value"
            cx={200}
            cy={200}
            fill="#8884d8"
            outerRadius={90}
            startAngle={180}
            endAngle={0}
            paddingAngle={2}
            labelLine={false}
            label={renderCustomizedLabel}
          />
          <Legend align="right" verticalAlign="middle" layout="vertical" />
        </PieChart>
      </div>

      <div>
        <Typography variant="body1">
          Grau de cancelamento em relação ao mês anterior
        </Typography>
        <PieChart width={350} height={200}>
          <Pie
            data={data02}
            dataKey="value"
            cx={200}
            cy={200}
            outerRadius={90}
            fill="#8884d8"
            startAngle={180}
            endAngle={0}
            paddingAngle={2}
            labelLine={false}
            label={renderCustomizedLabel}
          />
          <Legend align="right" verticalAlign="middle" layout="vertical" />
        </PieChart>
      </div>
    </div>
  );
};

export default ComparisonTaskCountGraph;
