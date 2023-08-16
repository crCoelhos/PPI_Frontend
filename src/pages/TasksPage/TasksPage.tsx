import React, { FC } from "react";
import styles from "./TasksPage.module.css";
import TasksTable from "../../components/TasksTable/TasksTable";
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";
import TaksAddTaskModal from "../../components/TaksAddTaskModal/TaksAddTaskModal";

interface TasksPageProps {}


const TasksPage: FC<TasksPageProps> = () => (
  <div className={styles.TasksPage}>
    <PrimaryAppBar />
    <TasksTable />
    <TaksAddTaskModal />  
  </div>
);

export default TasksPage;
