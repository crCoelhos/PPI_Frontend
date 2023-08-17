// import React, { FC } from 'react';
// import styles from './CustomersAddCustomerForm.module.css';
import React, { FC } from "react";
import styles from "./CustomersAddCustomerForm.module.css";
import { ThemeProvider } from "@emotion/react";
import {
  Grid,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  createTheme,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UserController from "../../controllers/userController";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const defaultTheme = createTheme();

interface CustomersAddCustomerFormProps {
  onCancel: () => void;
}

const CustomersAddCustomerForm: FC<CustomersAddCustomerFormProps> = ({
  onCancel,
}) => {
  const {
    name,
    cpf,
    email,
    contact,
    birthdate,
    hireDate,
    roleId,
    sex,
    expertiseId,
    setName,
    setCpf,
    setEmail,
    setSex,
    setContact,
    setBirthdate,
    setHireDate,
    setRoleId,
    setExpertiseId,
    handleSubmit,
  } = UserController();

  React.useEffect(() => {
    setSex("H");
    setExpertiseId("1");
    setRoleId("2"); //  Funcionário
  }, []);

  return (
    <div className={styles.CustomersAddCustomerForm}>
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
              <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Cadastrar cliente
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
                    id="login"
                    label="Nome"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* TODO arrumar isso tudo eim */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Data de Nascimento"
                      onChange={(newDate: Dayjs | null) => {
                        if (newDate) {
                          setBirthdate(newDate.format("YYYY-MM-DD"));
                        } else {
                          setBirthdate("");
                        }
                      }}
                    />
                  </LocalizationProvider>

                  <InputLabel id="expertise-sex-select-label">
                    Habilidades
                  </InputLabel>
                  <Select
                    labelId="expertise-sex-select-label"
                    id="expertiseId"
                    value={expertiseId}
                    label="Expertise"
                    onChange={(e) => setExpertiseId(e.target.value)}
                  >
                    <MenuItem value={1}>Design</MenuItem>
                    <MenuItem value={2}>Filmagem</MenuItem>
                    <MenuItem value={3}>Fotografia</MenuItem>
                    <MenuItem value={4}>Edição</MenuItem>
                    <MenuItem value={5}>Desenvolvimento</MenuItem>
                    <MenuItem value={6}>Roteiro</MenuItem>
                    <MenuItem value={7}>Consultoria</MenuItem>
                  </Select>

                  <InputLabel id="genre-sex-select-label">Gênero</InputLabel>
                  <Select
                    labelId="genre-sex-select-label"
                    id="sex"
                    value={sex}
                    label="Gênero"
                    onChange={(e) => setSex(e.target.value)}
                  >
                    <MenuItem value={"H"}>Homem</MenuItem>
                    <MenuItem value={"M"}>Mulher</MenuItem>
                    <MenuItem value={"O"}>Outros</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="cpf"
                    label="CPF"
                    name="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="contact"
                    label="Contato"
                    name="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Data de Contratação"
                      onChange={(newDate: Dayjs | null) => {
                        if (newDate) {
                          setHireDate(newDate.format("YYYY-MM-DD"));
                        } else {
                          setHireDate("");
                        }
                      }}
                    />
                  </LocalizationProvider>

                  <InputLabel id="demo-simple-select-label">Cargo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="roleId"
                    value={roleId}
                    label="Cargo"
                    defaultValue="Funcionário"
                    onChange={(e) => setRoleId(e.target.value)}
                  >
                    <MenuItem value={"1"}>Administrador</MenuItem>
                    <MenuItem value={"2"}>Funcionário</MenuItem>
                    <MenuItem value={"3"}>Teste</MenuItem>
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

export default CustomersAddCustomerForm;
