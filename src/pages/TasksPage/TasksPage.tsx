import React, { FC } from "react";
import styles from "./TasksPage.module.css";
import TasksTable from "../../components/TasksTable/TasksTable";
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";

interface TasksPageProps {}

const TasksPage: FC<TasksPageProps> = () => (
  <div className={styles.TasksPage}>
    <PrimaryAppBar />
    <TasksTable />
  </div>
);

export default TasksPage;
