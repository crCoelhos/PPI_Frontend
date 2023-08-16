import React, { FC, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TableSortLabel,
  Box,
} from "@mui/material";
import styles from "./TasksTable.module.css";
import ApiService from "../../services/api";

interface Task {
  id: number;
  name: string;
  description: string;
  contractDate: string;
  contractDocument: string | null;
  startDate: string;
  deadline: string;
  updatedDeadline: string | null;
  taskDomain: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Task;
  label: string;
  numeric: boolean;
}

interface TasksTableProps {}

const TasksTable: FC<TasksTableProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [orderBy, setOrderBy] = useState<keyof Task>("name");
  const [order, setOrder] = React.useState<Order>("asc");
  const [selected, setSelected] = useState<number[]>([]);

  const headCells: readonly HeadCell[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Nome",
    },
    {
      id: "description",
      numeric: false,
      disablePadding: false,
      label: "Descrição",
    },
    {
      id: "contractDate",
      numeric: false,
      disablePadding: false,
      label: "Data do contrato",
    },
    {
      id: "deadline",
      numeric: false,
      disablePadding: false,
      label: "Prazo Final",
    },
    {
      id: "taskDomain",
      numeric: false,
      disablePadding: false,
      label: "Dominio da atividade",
    },
    {
      id: "isActive",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
  ];

  const visuallyHidden = { visuallyHidden: { display: "none" } };

  useEffect(() => {
    console.log("Fetching tasks...");
    const fetchTasks = async () => {
      try {
        const res = await ApiService.fetchData<Task[]>("admin/tasks/");
        setTasks(res);
        setIsLoading(false);
        console.log("Tasks fetched:", res);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const createSortHandler = (property: keyof Task) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  type Order = "asc" | "desc";

  const comparator = (a: Task, b: Task) => {
    if (orderBy === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (orderBy === "description") {
      return order === "asc"
        ? a.description.localeCompare(b.description)
        : b.description.localeCompare(a.description);
    } else if (orderBy === "contractDate") {
      return order === "asc"
        ? a.contractDate.localeCompare(b.contractDate)
        : b.contractDate.localeCompare(a.contractDate);
    } else if (orderBy === "taskDomain") {
      return order === "asc"
        ? a.taskDomain.localeCompare(b.taskDomain)
        : b.taskDomain.localeCompare(a.taskDomain);
    } else if (orderBy === "isActive") {
      return order === "asc"
        ? a.taskDomain.localeCompare(b.taskDomain)
        : b.taskDomain.localeCompare(a.taskDomain);
    }
    return 0;
  };

  const sortedTasks = [...tasks].sort(comparator);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const selectedIds = sortedTasks.map((task) => task.id);
      setSelected(selectedIds);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <TableContainer>
      <Table className={styles.TasksTable}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < sortedTasks.length
                }
                checked={
                  sortedTasks.length > 0 &&
                  selected.length === sortedTasks.length
                }
                onChange={handleSelectAllClick}
              />
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "normal"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}></Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTasks.map((task) => (
            <TableRow
              key={task.id}
              hover
              role="checkbox"
              tabIndex={-1}
              selected={isSelected(task.id)}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected(task.id)}
                  onChange={(event) => handleCheckboxClick(event, task.id)}
                />
              </TableCell>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.contractDate}</TableCell>
              <TableCell>{task.deadline}</TableCell>
              <TableCell>{task.taskDomain}</TableCell>
              <TableCell>{task.isActive ? "Ativo" : "Inativo"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TasksTable;
