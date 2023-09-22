import React, { FC, useCallback, useEffect, useState } from "react";
import styles from "./ComparisonTaskCountGraph.module.css";

import ApiService from "../../services/api";

import { PieChart, Pie, Sector, ResponsiveContainer, Legend } from "recharts";
import {
  LastMonthTaskCountData,
  ThisMonthTaskCountData,
} from "../../interfaces/types";
import { Grid, Typography } from "@mui/material";

interface ComparisonTaskCountGraphProps {}

const currentColor = "#007f5f";
const lastColor = "#bc4749";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Total: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
const renderActiveShape2 = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Total: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const ComparisonTaskCountGraph: FC<ComparisonTaskCountGraphProps> = () => {
  const [lastMonthCountData, setLastMonthCountData] =
    useState<LastMonthTaskCountData | null>(null);

  const [currentMonthCountData, setCurrentMonthCountData] =
    useState<ThisMonthTaskCountData | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(true);

  const [total, setTotal] = useState<number>(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex2, setActiveIndex2] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: any) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const onPieEnter2 = useCallback(
    (_: any, index: any) => {
      setActiveIndex2(index);
    },
    [setActiveIndex2]
  );

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
      value: currentMonthCountData?.completedTasksCount,
      fill: currentColor,
    },
    {
      name: "Ultimo mês",
      value: lastMonthCountData?.completedTasksCount,
      fill: lastColor,
    },
  ];

  const data02 = [
    {
      name: "Mês atual",
      value: currentMonthCountData?.canceledTasksCount,
      fill: currentColor,
    },
    {
      name: "Ultimo mês",
      value: lastMonthCountData?.canceledTasksCount,
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
      <Grid container spacing={2}>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12} p={10}>

          <PieChart width={550} height={450}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              data={data01}
              dataKey="value"
              cx={100}
              cy={200}
              outerRadius={120}
              startAngle={180}
              endAngle={0}
              labelLine={false}
              label={renderCustomizedLabel}
              legendType="circle"
            />
            <Legend align="left" verticalAlign="middle" layout="vertical" />
          </PieChart>
        </Grid>

        <Grid item xl={6} lg={6} md={12} sm={12} xs={12} p={10}>
          <PieChart width={550} height={450}>
            <Pie
              activeIndex={activeIndex2}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter2}
              data={data02}
              dataKey="value"
              cx={350}
              cy={200}
              outerRadius={120}
              startAngle={180}
              endAngle={0}
              labelLine={false}
              label={renderCustomizedLabel}
              legendType="circle"
            />
            <Legend align="right" verticalAlign="middle" layout="vertical" />
          </PieChart>
        </Grid>
      </Grid>
    </div>
  );
};

export default ComparisonTaskCountGraph;
