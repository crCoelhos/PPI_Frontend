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
    <div className={styles.TeamPage}>
      <PrimaryAppBar />
      <TeamMembersTable />
      <TeamMembersAddMemberModal />
    </div>
  );
};
export default TeamPage;


