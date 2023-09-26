import React, { FC } from "react";
import styles from "./SchedulePage.module.css";
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";
import TaksAddTaskModal from "../../components/TaksAddTaskModal/TaksAddTaskModal";
import MainCalendar from "../../components/MainCalendar/MainCalendar";
import BackButton from "../../components/BackButton/BackButton";

interface SchedulePageProps {}

const SchedulePage: FC<SchedulePageProps> = () => (
  <div className={styles.SchedulePageContent}>
    <PrimaryAppBar />
    <div className={styles.SchedulePage}>
      <BackButton top={66} left={32} />

      <h1>Agenda </h1>

      <div className={styles.tableArea}>
        <TaksAddTaskModal />
        <MainCalendar />
      </div>
    </div>
  </div>
);

export default SchedulePage;
