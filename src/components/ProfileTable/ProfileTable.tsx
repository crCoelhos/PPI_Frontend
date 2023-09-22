import React, { FC, useEffect, useState } from "react";
import styles from "./ProfileTable.module.css";
import useSessionStorageUserData from "../../hooks/useSessionStorageUserData";
import { UserData } from "../../interfaces/types";
import ApiService from "../../services/api";
import axios from "axios";
import { format } from "date-fns";

import { Paper, Grid, TextField, Button } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import GenericSuccessToast from "../GenericSuccessToast/GenericSuccessToast";
import { useNavigate } from "react-router-dom";

interface ProfileTableProps {}
const appURL = process.env.REACT_APP_SERVER_URL;
const accessHeaderValue = process.env.REACT_APP_ACCESS_HEADER;

const ProfileTable: FC<ProfileTableProps> = () => {
  const [user, setUser] = useState<UserData>();

  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const { userData } = useSessionStorageUserData();
  let storageData = userData;
  // console.log("leticia", userData);

  useEffect(() => {
    if (userData?.id) {
      const fetchUsers = async () => {
        try {
          const res = await ApiService.fetchData<UserData>(
            `admin/user/${userData?.id}`
          );
          setUser(res);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUsers();
    }
  }, [userData?.id]);

  const handleUpdate = async () => {
    try {
      const tokenValue = storageData?.token;
      let accessValue: string = accessHeaderValue || " ";

      if (user) {
        await axios.put(`${appURL}admin/user/${userData?.id}`, user, {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenValue,
            Access: accessValue,
          },
        });
      }

      setShowToast(true);

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
    }
  };

  useEffect(() => {
    // console.log("sera", showToast);
  }, [showToast]);

  const birthdateTemplate = user?.birthdate
    ? format(new Date(user.birthdate), "dd/MM/yyyy")
    : "";
  const hireDateTemplate = user?.hireDate
    ? format(new Date(user.hireDate), "dd/MM/yyyy")
    : "";

  return (
    <div className={styles.ProfileTable}>
      <GenericSuccessToast message="Atualizado com sucesso" show={showToast} />
      <Paper elevation={3} style={{ padding: "20px" }}>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nome"
                variant="outlined"
                fullWidth
                value={user?.name || ""}
                onChange={(e) => {
                  const newName = e.target.value;
                  setUser((prevUser: any) => ({
                    ...prevUser,
                    name: newName,
                  }));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="CPF"
                variant="outlined"
                fullWidth
                value={user?.cpf}
                disabled
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                value={user?.email}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  const newEmail = e.target.value;
                  setUser((prevUser: any) => ({
                    ...prevUser,
                    email: newEmail,
                  }));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contato"
                variant="outlined"
                fullWidth
                value={user?.contact}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  const newContact = e.target.value;
                  setUser((prevUser: any) => ({
                    ...prevUser,
                    contact: newContact,
                  }));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Data de nascimento"
                variant="outlined"
                fullWidth
                value={birthdateTemplate}
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Data de Contratação"
                  value={user?.hireDate ? Dayjs(user.hireDate) : null}
                  onChange={(newDate: Dayjs | null) => {
                    const newHireDate = newDate
                      ? newDate.format("YYYY-MM-DD")
                      : null;
                    setUser((prevState: any) => {
                      if (prevState) {
                        return {
                          ...prevState,
                          hireDate: newHireDate,
                        };
                      }
                      return prevState;
                    });
                  }}
                />
              </LocalizationProvider>
            </Grid> */}

            <Grid item xs={12} sm={6}>
              <TextField
                label="Data de contratação"
                variant="outlined"
                fullWidth
                value={hireDateTemplate}
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Role"
                variant="outlined"
                fullWidth
                value={user?.role.name}
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Sexo"
                variant="outlined"
                fullWidth
                value={user?.sex}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  const newGender = e.target.value;
                  setUser((prevUser: any) => ({
                    ...prevUser,
                    sex: newGender,
                  }));
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
            onClick={handleUpdate}
          >
            Atualizar
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default ProfileTable;
