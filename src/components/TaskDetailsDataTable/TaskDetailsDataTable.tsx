import React, { FC, useEffect, useState } from "react";
import styles from "./TaskDetailsDataTable.module.css";
import { Task } from "../../interfaces/types";
import { Paper, CircularProgress, Typography } from "@mui/material";
import ApiService from "../../services/api";
import { useParams } from "react-router-dom";

interface TaskDetailsDataTableProps {}

const TaskDetailsDataTable: FC<TaskDetailsDataTableProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [taskData, setTaskData] = useState<Task | null>(null);
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await ApiService.fetchData<Task>(`admin/task/${id}`);
        setTaskData(res);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className={styles.TaskDetailsDataTable}>
      <Paper
        elevation={3}
        style={{ padding: "16px", maxWidth: "400px", margin: "0 auto" }}
      >
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <div>
            <Typography variant="h5" gutterBottom>
              Detalhes da Tarefa
            </Typography>
            <Typography variant="body1">
              <strong>Título:</strong> {taskData?.name}
            </Typography>
            <Typography variant="body1">
              <strong>Descrição:</strong> {taskData?.description}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {taskData?.taskStatus}
            </Typography>
            <Typography variant="body1">
              <strong>Data de contratação:</strong> {taskData?.contractDate}
            </Typography>
            <Typography variant="body1">
              <strong>Entrega:</strong> {taskData?.deadline}
            </Typography>
            <Typography variant="body1">
              <strong>Dominio da tarefa:</strong> {taskData?.taskDomain}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {taskData?.taskStatus}
            </Typography>
            <Typography variant="body1">
              <strong>Demandado por: </strong> {taskData?.customerId}
            </Typography>
            <Typography variant="body1">
              {/* Funcionário responsavel: {taskData?.usertask[0]?.id} */}
            </Typography>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default TaskDetailsDataTable;
