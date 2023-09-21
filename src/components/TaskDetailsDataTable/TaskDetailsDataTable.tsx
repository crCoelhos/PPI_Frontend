import React, { FC, useEffect, useState } from "react";
import styles from "./TaskDetailsDataTable.module.css";
import {
  CustomerData,
  ExpertiseData,
  Task,
  UserData,
} from "../../interfaces/types";
import {
  Paper,
  CircularProgress,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";
import ApiService from "../../services/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GenericDeleteModal from "../GenericDeleteModal/GenericDeleteModal";
import TasksEditTaskModal from "../TasksEditTaskModal/TasksEditTaskModal";
import format from "date-fns/format";

interface TaskDetailsDataTableProps {}

const TaskDetailsDataTable: FC<TaskDetailsDataTableProps> = () => {
  const { id } = useParams<{ id?: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [taskData, setTaskData] = useState<Task | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [expertises, setExpertises] = useState<ExpertiseData[]>([]);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // Use selectedTask para armazenar a tarefa selecionada
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchUsers = async () => {
      if (taskData?.usertask?.[0]?.id)
        try {
          const userResponse = await ApiService.fetchData<UserData>(
            `admin/user/${taskData?.usertask?.[0]?.userId}`
          );
          setUser(userResponse);
        } catch (error) {
          console.error(error);
        }
    };

    fetchUsers();
  }, [taskData]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (taskData?.usertask?.[0]?.id)
        try {
          const expertiseResponse = await ApiService.fetchData<ExpertiseData[]>(
            `admin/expertises/`
          );
          setExpertises(expertiseResponse);
        } catch (error) {
          console.error(error);
        }
    };

    fetchUsers();
  }, [taskData]);

  console.log(taskData);
  useEffect(() => {
    const fetchCustomers = async () => {
      if (taskData?.customerId)
        try {
          const customerResponse = await ApiService.fetchData<CustomerData>(
            `admin/customer/${taskData?.customerId}`
          );
          console.log("raquel :", customerResponse);
          setCustomer(customerResponse);
        } catch (error) {
          console.error(error);
        }
    };

    fetchCustomers();
  }, [taskData]);

  async function handleDelete() {
    if (selectedTask?.id) {
      try {
        console.log("deletou");
        closeDeleteModal();
      } catch (error) {
        console.error("Erro ao excluir a tarefa:", error);
      }
    }
  }

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
    openDeleteModal();
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    openEditModal();
  };
  const paperStyle = {
    padding: "16px",
    minWidth: "320px",
    maxWidth: "320px",
    minHeight: "256px",
    maxHeight: "auto",
    verticalAlign: "middle",
    justifyContent: "center",
    alignContent: "center",
    alignItem: "center",
    textAlign: "center",
    margin: "4px 0",
    m: 4,
    pt: 12,
  };

  const activityTitleStyle = {
    fontSize: "16px",
  };
  const activityContentStyle = {
    fontWeight: "bolder",
    fontSize: "22px",
  };

  let formattedContractDate = "";
  let formattedStartDate = "";
  let formattedDeadline = "";

  if (taskData?.contractDate) {
    const date = new Date(taskData?.contractDate);
    formattedContractDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  }
  if (taskData?.deadline) {
    const date = new Date(taskData?.deadline);
    formattedDeadline = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  }

  if (taskData?.startDate) {
    const date = new Date(taskData?.startDate);
    formattedStartDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  }

  let parsedtaskStatus = "aguardando";

  if (taskData?.taskStatus) {
    const taskStatus = taskData.taskStatus;

    switch (taskStatus) {
      case "TO_ESTIMATE":
        parsedtaskStatus = "ORÇAMENTAR";
        break;
      case "WAITING":
        parsedtaskStatus = "AGUARDANDO";
        break;
      case "PAUSED":
        parsedtaskStatus = "PAUSADA";
        break;
      case "CANCELED":
        parsedtaskStatus = "CANCELADA";
        break;
      case "OVERDUE":
        parsedtaskStatus = "ATRASADA";
        break;
      case "INPROGRESS":
        parsedtaskStatus = "EM PROGRESSO";
        break;
      case "COMPLETED":
        parsedtaskStatus = "CONCLUIDA";
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.TaskDetailsDataTable}>
      <Box sx={{ flexGrow: 12, ml: 12 }}>
        <Grid container spacing={1}>
          <Paper
            variant="outlined"
            sx={paperStyle}
            style={{ background: "#D6BF71", color: "#fcfcfc" }}
          >
            {isLoading ? (
              <div style={{ textAlign: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              <div>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1" sx={activityTitleStyle}>
                      Titulo da atividade:
                    </Typography>
                    <Typography variant="body1" sx={activityContentStyle}>
                      {taskData?.name}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body1" sx={activityTitleStyle}>
                      Dominio da atividade:
                    </Typography>
                    <Typography variant="body1" sx={activityContentStyle}>
                      {taskData?.taskDomain}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            )}
          </Paper>

          <Paper
            variant="outlined"
            sx={paperStyle}
            style={{ background: "#D9D9D9", color: "#000" }}
          >
            {isLoading ? (
              <div style={{ textAlign: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              <div>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1" sx={activityTitleStyle}>
                      Status da atividade:
                    </Typography>
                    <Typography variant="body1" sx={activityContentStyle}>
                      {parsedtaskStatus}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body1" sx={activityTitleStyle}>
                      Ativa?
                    </Typography>
                    <Typography variant="body1" sx={activityContentStyle}>
                      {taskData?.isActive ? "Sim" : "Não"}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            )}
          </Paper>

          <Paper
            variant="outlined"
            sx={paperStyle}
            style={{ background: "#D9D9D9", color: "#000" }}
          >
            {isLoading ? (
              <div style={{ textAlign: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              <div>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1" sx={activityTitleStyle}>
                      Origem da atribuição:
                    </Typography>
                    <Typography variant="body1" sx={activityContentStyle}>
                      {customer?.businessName}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body1" sx={activityTitleStyle}>
                      Data de contratação:
                    </Typography>
                    <Typography variant="body1" sx={activityContentStyle}>
                      {formattedContractDate
                        ? formattedContractDate
                        : "Data não disponível"}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            )}
          </Paper>

          <Paper
            variant="outlined"
            sx={paperStyle}
            style={{ background: "#D9D9D9", color: "#000" }}
          >
            {isLoading ? (
              <div style={{ textAlign: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              <div>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1" sx={activityTitleStyle}>
                      Valor estimado da atribuição:
                    </Typography>
                    <Typography variant="body1" sx={activityContentStyle}>
                      {`R$ ${taskData?.estimateValue}` || (
                        <CircularProgress size={20} />
                      )}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body1" sx={activityTitleStyle}>
                      Respresentante
                    </Typography>
                    <Typography variant="body1" sx={activityContentStyle}>
                      {customer?.contactName || <CircularProgress size={20} />}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            )}
          </Paper>
          <Paper
            variant="outlined"
            sx={paperStyle}
            style={{ background: "#D9D9D9", color: "#000" }}
          >
            {isLoading ? (
              <div style={{ textAlign: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              <div>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1" sx={activityTitleStyle}>
                      Data de início
                    </Typography>
                    <Typography variant="body1" sx={activityContentStyle}>
                      {formattedStartDate || <CircularProgress size={20} />}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body1" sx={activityTitleStyle}>
                      Data de entrega
                    </Typography>
                    <Typography variant="body1" sx={activityContentStyle}>
                      {formattedDeadline || <CircularProgress size={20} />}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            )}
          </Paper>

          <Paper
            variant="outlined"
            sx={paperStyle}
            style={{ background: "#D66161", color: "#fcfcfc" }}
          >
            {isLoading ? (
              <div style={{ textAlign: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              <div>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1" sx={activityTitleStyle}>
                      Valor estimado da atribuição:
                    </Typography>
                    <Typography variant="body1" sx={activityContentStyle}>
                      R${" "}
                      {taskData?.estimateValue || (
                        <CircularProgress size={20} />
                      )}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body1" sx={activityTitleStyle}>
                      Responsável
                    </Typography>
                    <Typography variant="body1" sx={activityContentStyle}>
                      {user?.name || <CircularProgress size={20} />}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            )}
          </Paper>
          {isLoading ? (
            <div
              style={{
                padding: "16px",
                minWidth: "150px",
                maxWidth: "320px",
                minHeight: "256px",
                maxHeight: "auto",
                verticalAlign: "middle",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <div className={styles.ActionButtonContainer}>
              <TasksEditTaskModal
                open={isEditModalOpen}
                onClose={closeEditModal}
                isOpen={true}
                itemId={id}
              />
              <GenericDeleteModal
                open={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onDelete={handleDelete}
                isOpen={true}
                itemClass="task"
                itemId={id}
              />
            </div>
          )}
        </Grid>
      </Box>
    </div>
  );
};
export default TaskDetailsDataTable;
