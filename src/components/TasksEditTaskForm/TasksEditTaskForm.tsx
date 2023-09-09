import React, { FC } from "react";
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
  const [customers, setCustomers] = React.useState<CustomerData[]>([]);
  const [expertises, setExpertises] = React.useState<ExpertiseData[]>([]);
  const [selectedTaskDomain, setSelectedTaskDomain] = React.useState("");
  const [selectedCustomer, setSelectedCustomer] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [task, setTask] = React.useState<Task | undefined>(undefined);
  const [users, setUsers] = React.useState<UserData[]>([]);
  // const [selectedUserId, setSelectedUserId] = React.useState<number | string>(
  //   task && task.usertask.length > 0 ? task.usertask[0].userId : ""
  // );
  const [selectedUserId, setSelectedUserId] = React.useState<number | string>(
    ""
  );
  const [previousSelectedUserId, setPreviousSelectedUserId] = React.useState<
    number | string
  >("");

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

          console.log("leticia: ", taskResponse.data);
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
    let tokenValue: string = "";
    let accessValue: string = accessHeaderValue || " ";

    const storedToken =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      tokenValue = tokenObject.token;

      try {
        if (selectedUserId !== previousSelectedUserId) {
          await axios.put(
            `${appURL}admin/UserTask/${task?.id}`,
            { userId: selectedUserId },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: tokenValue,
                Access: accessValue,
              },
            }
          );
          console.log(
            "Associação da tarefa com o usuário atualizada com sucesso!"
          );
        }

        // Resto do código de atualização da tarefa
        await axios.put(`${appURL}admin/task/${task?.id}`, task, {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenValue,
            Access: accessValue,
          },
        });

        console.log("Tarefa atualizada com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar a tarefa:", error);
      }
    }
  };
  return (
    <div className={styles.TasksEditTaskForm}>
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
                    <MenuItem value="TODO">TODO</MenuItem>
                    <MenuItem value="WAITING">WAITING</MenuItem>
                    <MenuItem value="INPROGRESS">IN PROGRESS</MenuItem>
                    <MenuItem value="PAUSED">PAUSED</MenuItem>
                    <MenuItem value="CANCELED">CANCELED</MenuItem>
                    <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                    <MenuItem value="OVERDUE">OVERDUE</MenuItem>
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
