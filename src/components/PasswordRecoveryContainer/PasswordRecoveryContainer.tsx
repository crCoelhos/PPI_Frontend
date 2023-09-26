import React, { FC, useState } from "react";
import styles from "./NewPasswordConfirmationContainer.module.css";
import { ThemeProvider } from "@emotion/react";
import {
  Grid,
  CssBaseline,
  Paper,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  createTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import GenericFailToast from "../GenericFailToast/GenericFailToast";
import GenericSuccessToast from "../GenericSuccessToast/GenericSuccessToast";
import piwhite from "../../assets/images/ppi-new-logo-branca.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import HomeIcon from "@mui/icons-material/Home";

const appURL = process.env.REACT_APP_SERVER_URL;
const accessHeaderValue = process.env.REACT_APP_ACCESS_HEADER;

interface NewPasswordConfirmationContainerProps {}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="https://2pistudio.com.br" target="_blank">
        2Pi Studio
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const NewPasswordConfirmationContainer: FC<
  NewPasswordConfirmationContainerProps
> = () => {
  const [responseError, setResponseError] = useState<string | null>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showFailToast, setShowFailToast] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [passwordtoken, setPasswordtoken] = useState<Date | null>(null);

  const defaultTheme = createTheme();

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let accessValue: string = accessHeaderValue || " ";
    const cpf = e.target.cpf.value;
    const email = e.target.email.value;
    const birthdate = selectedDate
      ? dayjs(selectedDate).format("YYYY-MM-DD")
      : null;

    const RecBody = {
      cpf,
      email,
      birthdate,
    };

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Access: accessValue,
      },
    };

    try {
      const resetResponse = await axios.post(
        `${appURL}admin/user/request-password`,
        RecBody,
        {
          headers: {
            "Content-Type": "application/json",
            Access: accessValue,
          },
        }
      );

      setShowToast(true);
      setShowFailToast(false);

      setPasswordtoken(resetResponse.data.resetToken);

      console.log("Resposta do servidor:", resetResponse.data);
    } catch (error: any) {
      setShowFailToast(true);
      console.error("Erro na requisição:", error);

      if (error.response) {
        setShowFailToast(true);
        console.error("Resposta do servidor:", error.response.data);
      }
    }
  };

  return (
    <>
      <GenericFailToast
        message="USUÁRIO ou SENHA incorreto!"
        show={showFailToast}
      />
      <GenericSuccessToast
        message="Autênticado com sucesso!"
        show={showToast}
      />
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Recuperar senha
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="CPF"
                  name="cpf"
                  autoComplete="cpf"
                  autoFocus
                  placeholder="somente números"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email"
                  id="email"
                  autoComplete="current-email"
                  required
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Data de Nascimento"
                    format="DD-MM-YYYY"
                    onChange={(newDate: Dayjs | null) => {
                      if (newDate) {
                        setSelectedDate(newDate.toDate());
                      } else {
                        setSelectedDate(null);
                      }
                    }}
                  />
                </LocalizationProvider>

                <TextField
                  margin="normal"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  name="token"
                  label="Token de validação"
                  id="token"
                  value={passwordtoken}
                  required
                  disabled
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Validar dados
                </Button>

                {passwordtoken && (
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {
                      setTimeout(() => {
                        navigate(
                          `/new-password-confirmation?validationToken=${passwordtoken}`
                        );
                      }, 0);
                    }}
                  >
                    Criar nova senha
                  </Button>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    setTimeout(() => {
                      navigate(`/signin`);
                    }, 0);
                  }}
                >
                  Voltar e fazer login <HomeIcon />
                </Button>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${piwhite})`,
              backgroundColor: "black",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          />
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default NewPasswordConfirmationContainer;
