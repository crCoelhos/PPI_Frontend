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
import { CustomerData, ExpertiseData, Task } from "../../interfaces/types";

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
  const [task, setTask] = React.useState<Task>();
  const [selectedTaskDomain, setSelectedTaskDomain] = React.useState("");
  const [selectedCustomer, setSelectedCustomer] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

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

          setTask(taskResponse.data.task);

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

  const handleSubmit = async () => {
    let tokenValue: string = "";
    let accessValue: string = accessHeaderValue || " ";

    const storedToken =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      tokenValue = tokenObject.token;

      try {
        await axios.put(`${appURL}admin/task/${task?.id}`, task, {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenValue,
            Access: accessValue,
          },
        });

        console.log("Tarefa atualizada com sucesso!");
      } catch (error) {
        // Lide com erros aqui
        console.error("Erro ao atualizar a tarefa:", error);
      }
    }
  };

  return (
    <div className={styles.TeamMembersAddMemberForm}>
      <ThemeProvider theme={defaultTheme}>
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 4,
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
              <Grid container spacing={2}>
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
                  {/* <InputLabel id="domain-select-label">
                    Dominio da atividade
                  </InputLabel>
                  <Select
                    className={styles.SelectOptions}
                    labelId="customer-select-label"
                    id="taskDomain"
                    value={selectedTaskDomain}
                    label="Dominio"
                    onChange={(e) => {
                      setSelectedTaskDomain(e.target.value);
                      setTaskDomain(e.target.value);
                    }}
                  >
                    {expertises.map((expertise) => (
                      <MenuItem key={expertise.id} value={Number(expertise.id)}>
                        {expertise.name}
                      </MenuItem>
                    ))}
                  </Select> */}
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
