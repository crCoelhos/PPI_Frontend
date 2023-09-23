import React, { FC, useState } from "react";
import styles from "./PasswordRecoveryContainer.module.css";
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
import { Link } from "react-router-dom";
import GenericFailToast from "../GenericFailToast/GenericFailToast";
import GenericSuccessToast from "../GenericSuccessToast/GenericSuccessToast";
import piwhite from "../../assets/images/ppi-new-logo-branca.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface PasswordRecoveryContainerProps {}

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

const PasswordRecoveryContainer: FC<PasswordRecoveryContainerProps> = () => {
  const [responseError, setResponseError] = useState<string | null>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showFailToast, setShowFailToast] = useState<boolean>(false);

  const defaultTheme = createTheme();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };
  const handleUsernameChange = async (e: any) => {
    e.preventDefault();
  };
  const handlePasswordChange = async (e: any) => {
    e.preventDefault();
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
                  id="login"
                  label="CPF"
                  name="login"
                  autoComplete="login"
                  // value={username}
                  onChange={handleUsernameChange}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email"
                  id="email"
                  autoComplete="current-email"
                  // value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Criar nova senha
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/password-recovery">Recuperar senha</Link>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
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

export default PasswordRecoveryContainer;
