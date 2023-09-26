import React, { FC, useEffect, useState } from "react";
import styles from "./ProfilePage.module.css";
import useSessionStorageUserData from "../../hooks/useSessionStorageUserData";
import { UserData } from "../../interfaces/types";
import ApiService from "../../services/api";
import ProfileTable from "../../components/ProfileTable/ProfileTable";
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = () => {
  return (
    <div className={styles.ProfilePage}>
      <PrimaryAppBar />
      <div className={styles.ProfilePageTableContent}>
        <h1>Perfil</h1>
        <ProfileTable />
      </div>
    </div>
  );
};

export default ProfilePage;
