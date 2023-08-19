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
import CustomerController from "../../controllers/customerController";
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
    businessName,
    setBusinessName,
    cnpj,
    setCnpj,
    contactName,
    setContactName,
    contactCpf,
    setContactCpf,
    isActive,
    setIsActive,
    size,
    setSize,
    handleSubmit,
  } = CustomerController();

  React.useEffect(() => {
    setIsActive(false); //  Funcionário
    setSize("2");
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
                  <InputLabel id="size-select-label">Categoria</InputLabel>
                  <Select
                    className={styles.SelectOptions}
                    labelId="size-select-label"
                    id="size"
                    value={size}
                    label="size"
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <MenuItem value={"1"}>
                      Microempreendedor Individual
                    </MenuItem>
                    <MenuItem value={"2"}>Pequena Empresa</MenuItem>
                    <MenuItem value={"3"}>Média Empresa</MenuItem>
                    <MenuItem value={"4"}>Grande Empresa</MenuItem>
                  </Select>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="contactName"
                    label="Nome do representante"
                    name="contactName"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    autoFocus
                  />
                  {size.valueOf() !== "1" && (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="businessName"
                      label="Nome da Empresa"
                      name="businessName"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      autoFocus
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="contactCpf"
                    label="CPF do Representante"
                    name="contactCpf"
                    value={contactCpf}
                    onChange={(e) => setContactCpf(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="cnpj"
                    label="CNPJ da empresa"
                    name="cnpj"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
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

export default CustomersAddCustomerForm;
