import React, { FC } from "react";
import styles from "./TeamPage.module.css";
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";
import TeamMembersTable from "../../components/TeamMembersTable/TeamMembersTable";
import TeamMembersAddMemberModal from "../../components/TeamMembersAddMemberModal/TeamMembersAddMemberModal";

interface TeamPageProps {}

const TeamPage: FC<TeamPageProps> = () => {
  const storedErrors = JSON.parse(localStorage.getItem("storedErrors") || "[]");

  return (
    <div className={styles.TeamPage}>
      <PrimaryAppBar />
      <TeamMembersTable />
      <TeamMembersAddMemberModal />
    </div>
  );
};
export default TeamPage;
