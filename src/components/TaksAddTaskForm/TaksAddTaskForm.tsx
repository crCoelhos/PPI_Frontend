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
import AssignmentIcon from "@mui/icons-material/Assignment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import TaskController from "../../controllers/taskController";
import axios from "axios";
import { CustomerData, ExpertiseData } from "../../interfaces/types";

const appURL = process.env.REACT_APP_SERVER_URL;
const accessHeaderValue = process.env.REACT_APP_ACCESS_HEADER;

const defaultTheme = createTheme();

interface TaksAddTaskFormProps {
  onCancel: () => void;
}

const TaksAddTaskForm: React.FC<TaksAddTaskFormProps> = ({ onCancel }) => {
  const [customers, setCustomers] = React.useState<CustomerData[]>([]);
  const [expertises, setExpertises] = React.useState<ExpertiseData[]>([]);
  const [selectedTaskDomain, setSelectedTaskDomain] = React.useState("");
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
    const fetchUsers = async () => {
      let tokenValue: string = "";
      let accessValue: string = accessHeaderValue || " ";
      try {
        const storedToken =
          localStorage.getItem("user") || localStorage.getItem("user");
        if (storedToken) {
          const tokenObject = JSON.parse(storedToken);
          tokenValue = tokenObject.token;

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

        // console.log("Request successful");
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
              <AssignmentIcon />
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Data de início"
                      format="DD-MM-YYYY"
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
                  </Select>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      format="DD-MM-YYYY"
                      label="Data do contrato"
                      onChange={(newDate: Dayjs | null) => {
                        if (newDate) {
                          setContractDate(newDate.format("YYYY-MM-DD"));
                        } else {
                          setContractDate("");
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Data limite"
                      format="DD-MM-YYYY"
                      onChange={(newDate: Dayjs | null) => {
                        if (newDate) {
                          setDeadline(newDate.format("YYYY-MM-DD"));
                        } else {
                          setDeadline("");
                        }
                      }}
                    />
                  </LocalizationProvider>

                  <InputLabel id="customer-select-label">
                    Origem da atividade
                  </InputLabel>
                  <Select
                    className={styles.SelectOptions}
                    labelId="customer-select-label"
                    id="customerId"
                    value={selectedCustomer}
                    label="customerId"
                    onChange={(e) => {
                      setSelectedCustomer(e.target.value);
                      setCustomerId(e.target.value);
                    }}
                  >
                    {customers.map((customer) => (
                      <MenuItem key={customer.id} value={Number(customer.id)}>
                        {customer.businessName}
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
