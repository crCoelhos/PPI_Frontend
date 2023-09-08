import React, { FC } from "react";
import styles from "./TasksPage.module.css";
import TasksTable from "../../components/TasksTable/TasksTable";
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";
import TaksAddTaskModal from "../../components/TaksAddTaskModal/TaksAddTaskModal";

interface TasksPageProps {}

const LazyTasksTable = React.lazy(
  () => import("../../components/TasksTable/TasksTable")
);

const TasksPage: FC<TasksPageProps> = () => (
  <div className={styles.TasksPageContent}>
    <PrimaryAppBar />
    <TaksAddTaskModal />
    <div className={styles.TasksPage}>
      <React.Suspense fallback={<div>Carregando...</div>}>
        <TasksTable />
      </React.Suspense>
      <div className={styles.tableArea}></div>
    </div>
  </div>
);

export default TasksPage;
