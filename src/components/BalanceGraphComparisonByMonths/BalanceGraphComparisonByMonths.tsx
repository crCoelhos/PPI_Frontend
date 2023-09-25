import ApiService from "../../services/api";
import React, { FC, useEffect, useState } from "react";
import styles from "./BalanceGraphComparisonByMonths.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  BalanceData,
  MetricData,
  MonthlyBalance,
} from "../../interfaces/types";
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  SelectChangeEvent,
  useTheme,
  Theme,
  Button,
} from "@mui/material";

interface BalanceGraphComparisonByMonthsProps {}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function mapMonthToNumber(monthName: string): number {
  return months.indexOf(monthName) + 1;
}

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const BalanceGraphComparisonByMonths: FC<
  BalanceGraphComparisonByMonthsProps
> = () => {
  const [firstMonthBalanceData, setFirstMonthBalanceData] =
    useState<BalanceData | null>(null);

  const [secondMonthBalanceData, setSecondMonthBalanceData] =
    useState<BalanceData | null>(null);

  const [firstMonthName, setFirstMonthName] = useState<string>("");
  const [secondMonthName, setSecondMonthName] = useState<string>("");
  const [forceRerender, setForceRerender] = useState(false);
  const [rerenderKey, setRerenderKey] = useState(0);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const sendSelectedMonthsToBackend = async (
    firstMonthName: string,
    secondMonthName: string
  ) => {
    try {
      const firstMonthResponse = await ApiService.fetchData<BalanceData>(
        `admin/tasks/balance/2023/${mapMonthToNumber(firstMonthName)}`
      );

      setFirstMonthBalanceData(firstMonthResponse);
      const secondMonthResponse = await ApiService.fetchData<BalanceData>(
        `admin/tasks/balance/2023/${mapMonthToNumber(secondMonthName)}`
      );
      setSecondMonthBalanceData(secondMonthResponse);


      setRerenderKey((prev) => prev + 1);
    } catch (error) {
      console.error("Erro ao buscar dados do backend:", error);
    }
  };

  const buttonStyle = {
    p: 1,
    mt: "8px",
    height: "53px",
  };
  const data = [
    {
      name: "Canceladas",
      mesA: firstMonthBalanceData?.canceledTasksBalance || 0,
      mesB: secondMonthBalanceData?.canceledTasksBalance || 0,
    },
    {
      name: "Concluidas",
      mesA: firstMonthBalanceData?.completedTasksBalance || 0,
      mesB: secondMonthBalanceData?.completedTasksBalance || 0,
    },
    {
      name: "Em progresso",
      mesA: firstMonthBalanceData?.doingTasksBalance || 0,
      mesB: secondMonthBalanceData?.doingTasksBalance || 0,
    },
    {
      name: "Atrasadas",
      mesA: firstMonthBalanceData?.overdueTasksBalance || 0,
      mesB: secondMonthBalanceData?.overdueTasksBalance || 0,
    },
    {
      name: "Pausadas",
      mesA: firstMonthBalanceData?.pausedTasksBalance || 0,
      mesB: secondMonthBalanceData?.pausedTasksBalance || 0,
    },
  ];

  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  return (
    <div className={styles.BalanceGraphComparisonByMonths}>
      <FormControl sx={{ m: 1, width: 248 }}>
        <InputLabel id="firstMonth-label">Mês A</InputLabel>
        <Select
          labelId="firstMonth"
          id="firstMonth"
          value={firstMonthName}
          onChange={(event) => {
            const selectedValue = event.target.value as string;
            // console.log("Mês A selecionado:", selectedValue);
            setFirstMonthName(selectedValue);
          }}
          input={<OutlinedInput label="firstMonth" />}
          MenuProps={MenuProps}
        >
          {months.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 248 }}>
        <InputLabel id="secondMonth-label">Mês B</InputLabel>
        <Select
          labelId="secondMonth"
          id="secondMonth"
          value={secondMonthName}
          onChange={(event) => {
            const selectedValue = event.target.value as string;
            // console.log("Mês B selecionado:", selectedValue);
            setSecondMonthName(selectedValue);
          }}
          input={<OutlinedInput label="secondMonth" />}
          MenuProps={MenuProps}
        >
          {months.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        sx={buttonStyle}
        type="button"
        variant="outlined"
        onClick={() =>
          sendSelectedMonthsToBackend(firstMonthName, secondMonthName)
        }
      >
        Gerar
      </Button>

      <BarChart
        key={rerenderKey}
        width={600}
        height={375}
        data={data}
        margin={{
          top: 5,
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
        <Bar dataKey="mesA" fill="#82ca9d" />
        <Bar dataKey="mesB" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default BalanceGraphComparisonByMonths;
