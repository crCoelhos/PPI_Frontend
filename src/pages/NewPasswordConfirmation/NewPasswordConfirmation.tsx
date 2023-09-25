import React, { FC, useEffect, useState } from "react";
import styles from "./NewPasswordConfirmation.module.css";
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
import piwhite from "../../assets/images/ppi-new-logo-branca.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import GenericFailToast from "../../components/GenericFailToast/GenericFailToast";
import GenericSuccessToast from "../../components/GenericSuccessToast/GenericSuccessToast";
import { useLocation } from "react-router-dom";

const appURL = process.env.REACT_APP_SERVER_URL;
const accessHeaderValue = process.env.REACT_APP_ACCESS_HEADER;

interface NewPasswordConfirmationProps {}

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

const NewPasswordConfirmation: FC<NewPasswordConfirmationProps> = () => {
  const [responseError, setResponseError] = useState<string | null>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showFailToast, setShowFailToast] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<boolean>(false);

  const [passwordtoken, setPasswordtoken] = useState<string>();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const validationToken = searchParams.get("validationToken");
  console.log(validationToken);

  const navigate = useNavigate();

  const defaultTheme = createTheme();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let accessValue: string = accessHeaderValue || " ";
    const newPassword = e.target.newPassword.value;
    const newPasswordConfirmation = e.target.newPasswordConfirmation.value;
    const token = validationToken;

    const ConfirmationBody = {
      token,
      newPassword,
    };

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Access: accessValue,
      },
    };

    if (newPasswordConfirmation !== newPassword) {
      setShowFailToast(true);
    } else {
      try {
        const resetResponse = await axios.post(
          `${appURL}admin/user/confirm-new-password`,
          ConfirmationBody,
          {
            headers: {
              "Content-Type": "application/json",
              Access: accessValue,
            },
          }
        );

        setShowFailToast(false);
        setShowToast(true);

        setNewPasswordConfirmation(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
        
        console.log("Resposta do servidor:", resetResponse.data);
      } catch (error: any) {
        setShowFailToast(true);
        console.error("Erro na requisição:", error);

        if (error.response) {
          setShowFailToast(true);
          console.error("Resposta do servidor:", error.response.data);
        }
      }
    }
  };

  return (
    <>
      <GenericFailToast
        message="Senha não alterada. Por favor, tente novamente!"
        show={showFailToast}
      />
      <GenericSuccessToast
        message="Senha alterada com sucesso!"
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
                  type="password"
                  label="Nova senha"
                  name="newPassword"
                  autoFocus
                  placeholder="somente números"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  type="password"
                  name="newPasswordConfirmation"
                  label="Confirme a nova senha"
                  id="newPasswordConfirmation"
                  required
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                  type="submit"
                >
                  Criar nova senha
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

export default NewPasswordConfirmation;
