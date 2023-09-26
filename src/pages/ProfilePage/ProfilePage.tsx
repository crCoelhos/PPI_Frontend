import React, { FC, useEffect, useState } from "react";
import styles from "./ProfilePage.module.css";
import ProfileTable from "../../components/ProfileTable/ProfileTable";
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";
import { useNavigate } from "react-router-dom";
import useLoginController from "../../controllers/loginController";
import BackButton from "../../components/BackButton/BackButton";

interface ProfilePageProps {}

const storedToken = localStorage.getItem("user");
const isStored = !!storedToken;

const ProfilePage: FC<ProfilePageProps> = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(isStored);

  const { logout } = useLoginController();

  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn == null || !isLoggedIn) {
      logout();
    } else {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, logout]);

  return (
    <div className={styles.ProfilePage}>
      <PrimaryAppBar />
      <div className={styles.ProfilePageTableContent}>
        <BackButton top={66} left={32} />
        <h1>Perfil</h1>
        <div className={styles.tableArea}>
          <ProfileTable />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
