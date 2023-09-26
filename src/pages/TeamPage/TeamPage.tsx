import React, { FC, useEffect, useState } from "react";
import styles from "./TeamPage.module.css";
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";
import TeamMembersTable from "../../components/TeamMembersTable/TeamMembersTable";
import TeamMembersAddMemberModal from "../../components/TeamMembersAddMemberModal/TeamMembersAddMemberModal";
import { UserData } from "../../interfaces/types";
import ApiService from "../../services/api";
import { useNavigate } from "react-router-dom";
import useLoginController from "../../controllers/loginController";
import BackButton from "../../components/BackButton/BackButton";

interface TeamPageProps {}

const storedToken = localStorage.getItem("user");
const isStored = !!storedToken;

const TeamPage: FC<TeamPageProps> = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(isStored);

  return (
    <div className={styles.TeamPageContent}>
      <PrimaryAppBar />
      <div className={styles.TeamPage}>
        <BackButton top={66} left={32} />

        <h1>Colaboradores</h1>

        {isStored && <TeamMembersAddMemberModal />}
        <div className={styles.tableArea}>
          <React.Suspense fallback={<div>Carregando...</div>}>
            <TeamMembersTable />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
};
export default TeamPage;
