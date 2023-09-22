import ApiService from "../../services/api";
import React, { FC, useEffect, useState } from "react";
import styles from "./YearBalanceGraph.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  LastMonthTaskCountData,
  MonthlyBalance,
  ThisMonthTaskCountData,
} from "../../interfaces/types";
interface YearBalanceGraphProps {}

const YearBalanceGraph: FC<YearBalanceGraphProps> = () => {
  const [allYearBalance, setAllYearBalance] = useState<MonthlyBalance[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading) {
        try {
          const response = await ApiService.fetchData<MonthlyBalance[]>(
            "admin/tasks/balance/all"
          );
          setAllYearBalance(response);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [isLoading]);

  // console.log(allYearBalance);

  const data = allYearBalance
    ?.filter((item) => item.balance !== null)
    .map((item) => ({
      name: `Mês ${item.month}`,
      Balanço: item.balance as number,
    }));

  // console.log(data);

  return (
    <div className={styles.YearBalanceGraph}>
      <LineChart
        width={600}
        height={375}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          connectNulls
          type="monotone"
          dataKey="Balanço"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Legend/>
      </LineChart>
    </div>
  );
};

export default YearBalanceGraph;
