import React, { FC, useState } from "react";
import styles from "./TeamEditTeamModal.module.css";
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
  Switch,
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import EditIcon from "@mui/icons-material/Edit";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import TaskController from "../../controllers/userController";
import axios from "axios";
import {
  CustomerData,
  ExpertiseData,
  Task,
  User,
  UserData,
} from "../../interfaces/types";
import UserController from "../../controllers/userController";
import GenericSuccessToast from "../GenericSuccessToast/GenericSuccessToast";
import GenericFailToast from "../GenericFailToast/GenericFailToast";

const appURL = process.env.REACT_APP_SERVER_URL;
const accessHeaderValue = process.env.REACT_APP_ACCESS_HEADER;

const defaultTheme = createTheme();

interface TeamEditTeamFormProps {
  onCancel: () => void;
  itemId: string | number | undefined;
}

const TeamEditTeamForm: FC<TeamEditTeamFormProps> = ({ onCancel, itemId }) => {
  const [customers, setCustomers] = React.useState<CustomerData[]>([]);
  const [expertises, setExpertises] = React.useState<ExpertiseData[]>([]);
  const [selectedExpertise, setSelectedExpertise] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [responseError, setResponseError] = useState<string | null>("");

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [roleId, setRoleId] = useState("");
  const [sex, setSex] = useState("");
  const [expertiseId, setExpertiseId] = useState("");
  const [is_active, setIsActive] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [showFailToast, setShowFailToast] = useState(false);

  const [shouldPreventDefault, setShouldPreventDefault] = useState(true);

  // const [user, setUser] = React.useState<UserData>();
  const [user, setUser] = React.useState<UserData>({
    id: 0,
    name: "",
    cpf: "",
    email: "",
    contact: "",
    birthdate: "",
    hireDate: "",
    roleId: 0,
    is_active: false,
    photo: "",
    document: "",
    sex: "",
    expertiseId: 0,
    createdAt: "",
    updatedAt: "",
    role: {
      name: "",
    },
  });

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

          const userResponse = await axios.get(
            `${appURL}admin/user/${itemId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: tokenValue,
                Access: accessValue,
              },
            }
          );
          // console.log(userResponse.data);
          setUser(userResponse.data);
          setIsActive(userResponse.data.is_active);

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
        setShowFailToast(true);
        if (axios.isAxiosError(error)) {
          setShowFailToast(true);
          console.error("Error:", error.response?.data);
        } else {
          setShowFailToast(true);
          console.error("Error:", error);
        }
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let tokenValue: string = "";
    let accessValue: string = accessHeaderValue || " ";

    const storedToken =
      localStorage.getItem("user") || localStorage.getItem("user");
    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      tokenValue = tokenObject.token;

      try {
        await axios.put(`${appURL}admin/user/${user?.id}`, user, {
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
    <div className={styles.TeamEditTeamForm}>
      <GenericFailToast
        message={`Atualização não realizada! ${responseError}`}
        show={showFailToast}
      />
      <GenericSuccessToast
        message={"Funcionário atualizado com sucesso!"}
        show={showToast}
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
              Editar colaborador
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container>
                {/* COLUNA1 */}
                {/* COLUNA1 */}
                {/* COLUNA1 */}
                {/* COLUNA1 */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nome"
                    name="name"
                    autoComplete="userTitle"
                    value={user?.name ?? ""}
                    onChange={(e) => {
                      setUser((prevUser: any) => ({
                        ...prevUser,
                        name: e.target.value,
                      }));
                    }}
                    autoFocus
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Data de contrato"
                      value={user?.hireDate ? dayjs(user.hireDate) : null}
                      onChange={(newDate: Dayjs | null) => {
                        if (newDate) {
                          const formattedDate = newDate.format("YYYY-MM-DD");
                          setUser((prevUser: any) => ({
                            ...prevUser,
                            hireDate: formattedDate,
                          }));
                          setHireDate(formattedDate);
                        } else {
                          setHireDate((prevUser: any) => ({
                            ...prevUser,
                            hireDate: null,
                          }));
                          setHireDate("");
                        }
                      }}
                    />
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Data de nascimento"
                      value={user?.birthdate ? dayjs(user.birthdate) : null}
                      onChange={(newDate: Dayjs | null) => {
                        if (newDate) {
                          const formattedDate = newDate.format("YYYY-MM-DD");
                          setUser((prevUser: any) => ({
                            ...prevUser,
                            birthdate: formattedDate,
                          }));
                          setBirthdate(formattedDate);
                        } else {
                          setUser((prevUser: any) => ({
                            ...prevUser,
                            birthdate: null,
                          }));
                          setBirthdate("");
                        }
                      }}
                    />
                  </LocalizationProvider>

                  <InputLabel id="domain-select-label">
                    Especialidade
                  </InputLabel>
                  <Select
                    className={styles.SelectOptions}
                    labelId="customer-select-label"
                    id="userDomain"
                    value={user?.expertiseId ? user.expertiseId.toString() : ""}
                    label="Dominio"
                    onChange={(e) => {
                      const selectedExpertiseId = e.target.value;
                      setUser((prevUser: any) => ({
                        ...prevUser,
                        expertiseId: selectedExpertiseId, // Atualize o expertiseId de user
                      }));
                      setExpertiseId(selectedExpertiseId); // Atualize o expertiseId separadamente, se necessário
                      // console.log(selectedExpertiseId);
                    }}
                  >
                    {expertises.map((expertise) => (
                      <MenuItem
                        key={expertise.id}
                        value={expertise.id.toString()}
                      >
                        {expertise.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                {/* /COLUNA1 */}
                {/* /COLUNA1 */}
                {/* /COLUNA1 */}
                {/* /COLUNA1 */}

                {/* COLUNA2 */}
                {/* COLUNA2 */}
                {/* COLUNA2 */}
                {/* COLUNA2 */}
                <Grid item xs={12} sm={6}>
                  {/* <TextField
                    variant="outlined"
                    multiline
                    rows={4}
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Descrição"
                    name="description"
                    value={user?.description ?? ""}
                    onChange={(e) => {
                      setUser((prevUser: any) => ({
                        ...prevUser,
                        description: e.target.value,
                      }));
                    }}
                  /> */}

                  <InputLabel id="userStatus-select-label">
                    Status do usuário
                  </InputLabel>
                  <Switch
                    checked={user.is_active}
                    onChange={() =>
                      setUser({ ...user, is_active: !user.is_active })
                    }
                    name="is_active"
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="userEmail"
                    value={user?.email ?? ""}
                    onChange={(e) => {
                      setUser((prevUser: any) => ({
                        ...prevUser,
                        email: e.target.value,
                      }));
                    }}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="contact"
                    label="Contato"
                    name="contact"
                    autoComplete="userContact"
                    value={user?.contact ?? ""}
                    onChange={(e) => {
                      setUser((prevUser: any) => ({
                        ...prevUser,
                        contact: e.target.value,
                      }));
                    }}
                    autoFocus
                  />
                </Grid>

                {/* /COLUNA2 */}
                {/* /COLUNA2 */}
                {/* /COLUNA2 */}
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
export default TeamEditTeamForm;
