import React, { FC, useEffect, useState } from "react";
import styles from "./ProfileTable.module.css";
import useSessionStorageUserData from "../../hooks/useSessionStorageUserData";
import { UserData } from "../../interfaces/types";
import ApiService from "../../services/api";
import axios from "axios";
import { format } from "date-fns";

import { Paper, Grid, TextField, Button } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface ProfileTableProps {}

const appURL = process.env.REACT_APP_SERVER_URL;
const accessHeaderValue = process.env.REACT_APP_ACCESS_HEADER;

const ProfileTable: FC<ProfileTableProps> = () => {
  const [user, setUser] = useState<UserData | null>(null);

  const { userData } = useSessionStorageUserData();
  let storageData = userData;

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

        // console.log("Dados atualizados com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
    }
  };

  const birthdateTemplate = user?.birthdate
    ? format(new Date(user.birthdate), "dd/MM/yyyy")
    : "";

  return (
    <div className={styles.ProfileTable}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Data de contratação"
                variant="outlined"
                fullWidth
                value={user?.hireDate || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  const newHireDate = e.target.value;
                  setUser((prevUser: UserData | null) => {
                    if (prevUser) {
                      return {
                        ...prevUser,
                        hireDate: newHireDate,
                      };
                    }
                    return prevUser;
                  });
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
