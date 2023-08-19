import React, { FC } from "react";
import styles from "./TasksPage.module.css";
import TasksTable from "../../components/TasksTable/TasksTable";
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";
import TaksAddTaskModal from "../../components/TaksAddTaskModal/TaksAddTaskModal";

interface TasksPageProps {}

const TasksPage: FC<TasksPageProps> = () => (
  <div className={styles.TasksPageContent}>
    <PrimaryAppBar />
    <div className={styles.TasksPage}>
      <div className={styles.tableArea}>
        <TasksTable />
      </div>
    </div>
    <TaksAddTaskModal />
  </div>
);

export default TasksPage;
