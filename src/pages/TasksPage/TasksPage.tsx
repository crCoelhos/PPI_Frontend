import React, { FC, useState } from "react";
import styles from "./TasksPage.module.css";
import TasksTable from "../../components/TasksTable/TasksTable";
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";
import TaksAddTaskModal from "../../components/TaksAddTaskModal/TaksAddTaskModal";
import TasksEditTaskModal from "../../components/TasksEditTaskModal/TasksEditTaskModal";
import { Task } from "../../interfaces/types";

interface TasksPageProps {}

const TasksPage: FC<TasksPageProps> = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  


  return (
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
};
export default TasksPage;
