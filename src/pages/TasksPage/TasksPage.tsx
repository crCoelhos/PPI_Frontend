import React, { FC, useState } from "react";
import styles from "./TasksPage.module.css";
import TasksTable from "../../components/TasksTable/TasksTable";
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";
import TaksAddTaskModal from "../../components/TaksAddTaskModal/TaksAddTaskModal";
import TasksEditTaskModal from "../../components/TasksEditTaskModal/TasksEditTaskModal";
import { Task } from "../../interfaces/types";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";

interface TasksPageProps {}

const storedToken = localStorage.getItem("user");
const isStored = !!storedToken;

const TasksPage: FC<TasksPageProps> = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(isStored);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={styles.TasksPageContent}>
      <PrimaryAppBar />
      <div className={styles.TasksPage}>
        <BackButton top={66} left={32} />

        <h1>Atividades</h1>
        <div className={styles.tableArea}>
          {isStored && <TaksAddTaskModal />}

          <React.Suspense fallback={<div>Carregando...</div>}>
            <TasksTable />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
};
export default TasksPage;
