import React, { FC } from "react";
import styles from "./TeamPage.module.css";
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";
import useSessionStorageUserData from "../../hooks/useSessionStorageUserData";
import TeamMembersTable from "../../components/TeamMembersTable/TeamMembersTable";

interface TeamPageProps {}

const TeamPage: FC<TeamPageProps> = () => {
  const userData = useSessionStorageUserData();

  return (
    <div className={styles.TeamPage}>
      <PrimaryAppBar />
      <TeamMembersTable />
    </div>
  );
};
export default TeamPage;
