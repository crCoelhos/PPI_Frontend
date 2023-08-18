import React from "react";
import styles from "./TaksAddTaskForm.module.css";
import { ThemeProvider } from "@emotion/react";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import TaskController from "../../controllers/taskController";
import axios from "axios";
import { CustomerData } from "../../interfaces/types";

const appURL = process.env.REACT_APP_SERVER_URL;
const accessHeaderValue = process.env.REACT_APP_ACCESS_HEADER;

const defaultTheme = createTheme();

interface TaksAddTaskFormProps {
  onCancel: () => void;
}

// TODO corrigir o modal para refletir o adicionar de tarefas, bem como arrumar a visualização do modal

const TaksAddTaskForm: React.FC<TaksAddTaskFormProps> = ({ onCancel }) => {
  const [customers, setCustomers] = React.useState<CustomerData[]>([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState("");

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
    handleSubmit,
  } = TaskController();

  React.useEffect(() => {
    setCustomerId(0);
    setTaskDomain("0");
    setCustomerId(1);

    const fetchUsers = async () => {
      let tokenValue: string = "";
      let accessValue: string = accessHeaderValue || " ";
      try {
        const storedToken =
          localStorage.getItem("user") || sessionStorage.getItem("user");
        if (storedToken) {
          const tokenObject = JSON.parse(storedToken);
          tokenValue = tokenObject.token;
          console.log(tokenValue);

          const response = await axios.get<CustomerData[]>(
            `${appURL}admin/customers/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: tokenValue,
                Access: accessValue,
              },
            }
          );
          setCustomers(response.data);
        }

        console.log("Request successful:", customers);
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
              {/* <PersonAddIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Cadastrar atividade
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Titulo da atividade"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Data de início"
                      onChange={(newDate: Dayjs | null) => {
                        if (newDate) {
                          setStartDate(newDate.format("YYYY-MM-DD"));
                        } else {
                          setStartDate("");
                        }
                      }}
                    />
                  </LocalizationProvider>

                  <InputLabel id="domain-select-label">
                    Dominio da atividade
                  </InputLabel>
                  <Select
                    labelId="domain-select-label"
                    id="taskDomain"
                    value={taskDomain}
                    label="Domínio da tarefa"
                    onChange={(e) => setTaskDomain(e.target.value)}
                  >
                    {/* TODO arrumar expertises para fazer isso vir pra ca */}
                    <MenuItem value={0}>quebrado</MenuItem>
                    <MenuItem value={1}>por</MenuItem>
                    <MenuItem value={2}>enquanto</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Descrição"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Data limite"
                      onChange={(newDate: Dayjs | null) => {
                        if (newDate) {
                          setDeadline(newDate.format("YYYY-MM-DD"));
                        } else {
                          setDeadline("");
                        }
                      }}
                    />
                  </LocalizationProvider>

                  {/* <InputLabel id="customer-select-label">
                    Oriem da atividade
                  </InputLabel>
                  <Select
                    labelId="customer-select-label"
                    id="customerId"
                    value={customerId}
                    label="customerId"
                    // onChange={(e) => setCustomerId(e.target.value)}
                  >
                    <MenuItem></MenuItem>
                  </Select> */}
                  <InputLabel id="customer-select-label">
                    Oriem da atividade
                  </InputLabel>
                  <Select
                    labelId="customer-select-label"
                    id="customerId"
                    value={selectedCustomer}
                    label="customerId"
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                  >
                    {customers.map((customer) => (
                      <MenuItem key={customer.id} value={Number(customer.id)}>
                        {customer.businessName}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
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
                    Registrar
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

export default TaksAddTaskForm;
