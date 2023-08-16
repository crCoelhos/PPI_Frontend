import React, { FC } from "react";
import styles from "./TeamMembersAddMemberForm.module.css";
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

const defaultTheme = createTheme();

interface TeamMembersAddMemberFormProps {
  onCancel: () => void;
}

const TeamMembersAddMemberForm: FC<TeamMembersAddMemberFormProps> = ({
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

  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2014-08-18T21:11:54")
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
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
              <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Cadastrar colaborador
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

                  <TextField
                    margin="normal"
                    fullWidth
                    id="expertiseId"
                    label="Expertise"
                    name="expertiseId"
                    value={expertiseId}
                    onChange={(e) => setExpertiseId(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="sex"
                    label="Sexo"
                    name="sex"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                  />
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
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="hireDate"
                    label="Data de Contratação"
                    name="hireDate"
                    value={hireDate}
                    onChange={(e) => setHireDate(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="roleId"
                    label="Cargo"
                    name="roleId"
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                  />
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

export default TeamMembersAddMemberForm;
