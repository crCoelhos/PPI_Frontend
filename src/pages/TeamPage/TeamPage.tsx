import React, { FC, useEffect, useState } from "react";
import styles from "./TeamPage.module.css";
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";
import TeamMembersTable from "../../components/TeamMembersTable/TeamMembersTable";
import TeamMembersAddMemberModal from "../../components/TeamMembersAddMemberModal/TeamMembersAddMemberModal";
import { UserData } from "../../interfaces/types";
import ApiService from "../../services/api";

interface TeamPageProps {}

const TeamPage: FC<TeamPageProps> = () => {
  return (
    <div className={styles.TeamPageContent}>
      <PrimaryAppBar />
      <TeamMembersAddMemberModal />
      <div className={styles.TeamPage}>
        <React.Suspense fallback={<div>Carregando...</div>}>
          <TeamMembersTable />
        </React.Suspense>
      </div>
    </div>
  );
};
export default TeamPage;
