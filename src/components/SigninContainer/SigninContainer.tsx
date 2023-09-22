import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import piwhite from "../../assets/images/ppi-new-logo-branca.png";
import useLoginController from "../../controllers/loginController";
import { useLocation, useNavigate } from "react-router-dom";
import GenericFailToast from "../GenericFailToast/GenericFailToast";
import GenericSuccessToast from "../GenericSuccessToast/GenericSuccessToast";
import { useState } from "react";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://2pistudio.com.br" target="_blank">
        2Pi Studio
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();
interface SigninBoxProps {}

const SigninBox: React.FC<SigninBoxProps> = () => {
  const [responseError, setResponseError] = useState<string | null>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showFailToast, setShowFailToast] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const LoginBox = () => {
    const {
      username,
      password,
      handleUsernameChange,
      handlePasswordChange,
      handleSubmit,
      loginError,
      loggedIn,
      loginErrorPasswordOrUser,
    } = useLoginController();

    const location = useLocation();
    const navigate = useNavigate();
    if (loggedIn) {
      if (location.state) {
        navigate(location.state.url, { state: location.state });
        setShowFailToast(true);
      } else {
        setShowToast(true);
        setTimeout(() => {
          navigate("/home");
        }, 2500);
      }
    }

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
                  Login
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
                    value={username}
                    onChange={handleUsernameChange}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Lembrar"
                /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Entrar
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      {/* <Link href="#" variant="body2">
                      Recuperar senha
                    </Link> */}
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </>
    );
  };

  return <LoginBox />;
};

export default SigninBox;
