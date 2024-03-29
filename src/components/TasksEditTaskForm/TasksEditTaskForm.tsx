import React, { FC, useEffect, useState } from "react";
import styles from "./TasksEditTaskForm.module.css";
import { ThemeProvider } from "@emotion/react";
import ApiService from "../../services/api";
import {
  Grid,
  Box,
  Avatar,
  createTheme,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import EditIcon from "@mui/icons-material/Edit";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import TaskController from "../../controllers/taskController";
import axios from "axios";
import {
  CustomerData,
  ExpertiseData,
  Task,
  UserData,
} from "../../interfaces/types";
import GenericFailToast from "../GenericFailToast/GenericFailToast";
import GenericSuccessToast from "../GenericSuccessToast/GenericSuccessToast";

const appURL = process.env.REACT_APP_SERVER_URL;
const accessHeaderValue = process.env.REACT_APP_ACCESS_HEADER;

const defaultTheme = createTheme();

interface TasksEditTaskFormProps {
  onCancel: () => void;
  itemId: string | number | undefined;
}

const TasksEditTaskForm: FC<TasksEditTaskFormProps> = ({
  onCancel,
  itemId,
}) => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [expertises, setExpertises] = useState<ExpertiseData[]>([]);
  const [selectedTaskDomain, setSelectedTaskDomain] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [users, setUsers] = useState<UserData[]>([]);
  const [newAssignment, setNewAssignment] = useState<boolean>(false);

  const [selectedUserId, setSelectedUserId] = useState<number | string>("");
  const [previousSelectedUserId, setPreviousSelectedUserId] = useState<
    number | string
  >("");

  const [responseError, setResponseError] = useState<string | null>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showFailToast, setShowFailToast] = useState<boolean>(false);

  const {
    name,
    setName,
    description,
    setDescription,
    contractDate,
    setContractDate,
    contractDocument,
    setContractDocument,
    startDate,
    setStartDate,
    deadline,
    setDeadline,
    updatedDeadline,
    setUpdatedDeadline,
    taskDomain,
    setTaskDomain,
    isActive,
    setIsActive,
    customerId,
    setCustomerId,
  } = TaskController();

  React.useEffect(() => {
    const fetchUsers = async () => {
      let tokenValue: string = "";
      let accessValue: string = accessHeaderValue || " ";
      try {
        const storedToken =
          localStorage.getItem("user") || sessionStorage.getItem("user");
        if (storedToken) {
          const tokenObject = JSON.parse(storedToken);
          tokenValue = tokenObject.token;

          const taskResponse = await axios.get(
            `${appURL}admin/task/${itemId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: tokenValue,
                Access: accessValue,
              },
            }
          );

          setTask(taskResponse.data);

          if (taskResponse.data.usertask.length > 0) {
            setSelectedUserId(taskResponse.data.usertask[0].userId.toString());
          }

          const usersResponse = await axios.get(`${appURL}admin/users`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: tokenValue,
              Access: accessValue,
            },
          });

          setUsers(usersResponse.data);

          const customerResponse = await axios.get<CustomerData[]>(
            `${appURL}admin/customers/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: tokenValue,
                Access: accessValue,
              },
            }
          );
          setCustomers(customerResponse.data);

          const expertiseResponse = await axios.get<ExpertiseData[]>(
            `${appURL}admin/expertises/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: tokenValue,
                Access: accessValue,
              },
            }
          );
          setExpertises(expertiseResponse.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error:", error.response?.data);
        } else {
          console.error("Error:", error);
        }
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const assignmentDate = new Date();
    // console.log(newAssignment);

    let tokenValue: string = "";
    let accessValue: string = accessHeaderValue || " ";

    const storedToken =
      localStorage.getItem("user") || localStorage.getItem("user");
    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      tokenValue = tokenObject.token;

      try {
        if (task?.usertask?.length === 0) {
          var newAssignmentBody = {
            assignmentDate: assignmentDate.toISOString(),
            userId: selectedUserId,
            taskId: task?.id,
            is_active: true,
            status: "TO_ESTIMATE",
          };

          await axios.post(`${appURL}admin/UserTask`, newAssignmentBody, {
            headers: {
              "Content-Type": "application/json",
              Authorization: tokenValue,
              Access: accessValue,
            },
          });
          // console.log(
          //   "Associação da tarefa com o usuário atualizada com sucesso!"
          // );
        } else if (selectedUserId !== previousSelectedUserId) {
          // console.log("entramos aqui");
          const userTaskId = task?.usertask?.[0]?.id;

          await axios.put(
            `${appURL}admin/UserTask/${userTaskId}`,
            { userId: selectedUserId },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: tokenValue,
                Access: accessValue,
              },
            }
          );

          setShowToast(true);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }

        await axios.put(`${appURL}admin/task/${task?.id}`, task, {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenValue,
            Access: accessValue,
          },
        });

        setShowToast(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        if (error instanceof Error) {
          setResponseError(error.message || null);
          console.error("Erro ao atualizar o colaborador:", error);
        } else {
          setResponseError("Erro desconhecido");
          console.error("Erro desconhecido ao atualizar o colaborador:", error);
        }
      }
    }
  };

  return (
    <div className={styles.TasksEditTaskForm}>
      <GenericSuccessToast
        message={"Tarefa atualizada com sucesso!"}
        show={showToast}
      />

      <GenericFailToast
        message={`Atualização não realizada! ${responseError}`}
        show={showFailToast}
      />

      <ThemeProvider theme={defaultTheme}>
        <Grid item sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <EditIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Editar atividade
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container>
                {/* COLUNA1 */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Titulo da atividade"
                    name="name"
                    autoComplete="taskTitle"
                    value={task?.name ?? ""}
                    onChange={(e) => {
                      setTask((prevTask: any) => ({
                        ...prevTask,
                        name: e.target.value,
                      }));
                    }}
                    autoFocus
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Data de início"
                      format="DD-MM-YYYY"
                      value={task?.startDate ? dayjs(task.startDate) : null}
                      onChange={(newDate: Dayjs | null) => {
                        if (newDate) {
                          const formattedDate = newDate.format("YYYY-MM-DD");
                          setTask((prevTask: any) => ({
                            ...prevTask,
                            startDate: formattedDate,
                          }));
                          setStartDate(formattedDate);
                        } else {
                          setTask((prevTask: any) => ({
                            ...prevTask,
                            startDate: null,
                          }));
                          setStartDate("");
                        }
                      }}
                    />
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Prazo final"
                      format="DD-MM-YYYY"
                      value={task?.deadline ? dayjs(task.deadline) : null}
                      onChange={(newDate: Dayjs | null) => {
                        if (newDate) {
                          const formattedDate = newDate.format("YYYY-MM-DD");
                          setTask((prevTask: any) => ({
                            ...prevTask,
                            deadline: formattedDate,
                          }));
                          setDeadline(formattedDate);
                        } else {
                          setTask((prevTask: any) => ({
                            ...prevTask,
                            deadline: null,
                          }));
                          setDeadline("");
                        }
                      }}
                    />
                  </LocalizationProvider>

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="number"
                    id="estimateValue"
                    label="Orçamento"
                    name="estimateValue"
                    autoComplete="taskTitle"
                    value={task?.estimateValue ?? ""}
                    onChange={(e) => {
                      setTask((prevTask: any) => ({
                        ...prevTask,
                        estimateValue: e.target.value,
                      }));
                    }}
                    autoFocus
                  />
                </Grid>
                {/* /COLUNA1 */}

                {/* COLUNA2 */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    multiline
                    rows={4}
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Descrição"
                    name="description"
                    value={task?.description ?? ""}
                    onChange={(e) => {
                      setTask((prevTask: any) => ({
                        ...prevTask,
                        description: e.target.value,
                      }));
                    }}
                  />

                  <InputLabel id="taskStatus-select-label">
                    Status da Tarefa
                  </InputLabel>
                  <Select
                    labelId="taskStatus-select-label"
                    id="taskStatus"
                    value={task?.taskStatus ?? ""}
                    onChange={(e) => {
                      setTask((prevTask: any) => ({
                        ...prevTask,
                        taskStatus: e.target.value,
                      }));
                    }}
                  >
                    <MenuItem value="TO_ESTIMATE">ORÇAMENTAR</MenuItem>
                    <MenuItem value="WAITING">AGUARDANDO</MenuItem>
                    <MenuItem value="INPROGRESS">EM PROGRESSO</MenuItem>
                    <MenuItem value="PAUSED">PAUSADA</MenuItem>
                    <MenuItem value="CANCELED">CANCELADA</MenuItem>
                    <MenuItem value="COMPLETED">CONCLUIDA</MenuItem>
                    <MenuItem value="OVERDUE">ATRASADA</MenuItem>
                  </Select>

                  <InputLabel id="taskStatus-select-label">
                    Funcionário designado
                  </InputLabel>
                  <Select
                    labelId="assignedUser-select-label"
                    id="assignedUser"
                    value={selectedUserId}
                    onChange={(e) => {
                      const userId = e.target.value;
                      setSelectedUserId(userId);
                    }}
                  >
                    <MenuItem value="">Selecione um usuário</MenuItem>
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                {/* /COLUNA2 */}
              </Grid>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    mt: 4,
                    mb: 4,
                  }}
                >
                  <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    onClick={onCancel}
                  >
                    Cancelar
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    mt: 4,
                    mb: 4,
                  }}
                >
                  <Button type="submit" fullWidth variant="contained">
                    Atualizar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </ThemeProvider>
    </div>
  );
};
export default TasksEditTaskForm;
