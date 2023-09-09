import React, { useEffect, useState } from "react";
import ApiService from "../../services/api";
import { Task, UserData } from "../../interfaces/types";
import styles from "./TasksTable.module.css";
import TaksAddTaskModal from "../TaksAddTaskModal/TaksAddTaskModal";
import format from "date-fns/format";

import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import Grid from "@mui/material/Grid";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import GenericDeleteModal from "../GenericDeleteModal/GenericDeleteModal";
import { Tag } from "primereact/tag";
import TasksEditTaskModal from "../TasksEditTaskModal/TasksEditTaskModal";

function TasksTable() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [orderBy, setOrderBy] = useState<keyof Task>("name");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // Use selectedTask para armazenar a tarefa selecionada
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    console.log("Fetching tasks...");
    const fetchTasks = async () => {
      try {
        const res = await ApiService.fetchData<Task[]>("admin/tasks/");
        setTasks(res);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    console.log("Fetching users...");
    const fetchUsers = async () => {
      try {
        const userResponse = await ApiService.fetchData<UserData[]>(
          "admin/users/"
        );
        setUsers(userResponse);
        console.log("users fetched:", userResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  async function handleDelete() {
    if (selectedTask?.id) {
      try {
        const updatedTasks = tasks.filter(
          (task) => task.id !== selectedTask.id
        );
        setTasks(updatedTasks);

        closeDeleteModal();
      } catch (error) {
        console.error("Erro ao excluir a tarefa:", error);
      }
    }
  }

  const contractDateTemplate = (rowData: Task) => {
    const contractDate = rowData.contractDate
      ? new Date(rowData.contractDate)
      : null;
    return contractDate ? format(contractDate, "dd/MM/yyyy") : "";
  };

  const deadlineTemplate = (rowData: Task) => {
    const deadline = rowData.deadline ? new Date(rowData.deadline) : null;
    return deadline ? format(deadline, "dd/MM/yyyy") : "";
  };

  const statusTemplate = (rowData: Task) => {
    return rowData.isActive ? (
      <Tag value="Ativo" rounded />
    ) : (
      <Tag severity="danger" value="Inativo" rounded />
    );
  };

  const taskStatusTemplate = (rowData: Task) => {
    let statusColor:
      | "success"
      | "info"
      | "warning"
      | "danger"
      | null
      | undefined = null;
    let statusText = "";

    switch (rowData.taskStatus) {
      case "TODO":
        statusColor = "success";
        statusText = rowData.taskStatus;
        break;
      case "WAITING":
      case "PAUSED":
        statusColor = "warning";
        statusText = rowData.taskStatus;
        break;
      case "CANCELED":
      case "OVERDUE":
        statusColor = "danger";
        statusText = rowData.taskStatus;
        break;
      case "INPROGRESS":
        statusColor = "info";
        statusText = rowData.taskStatus;
        break;
      case "COMPLETED":
        statusColor = "success";
        statusText = rowData.taskStatus;
        break;
      default:
        break;
    }

    return <Tag severity={statusColor} value={statusText} rounded />;
  };

  const expertiseTemplate = (rowData: { taskDomain: number }) => {
    const expertiseMap: { [key: number]: { name: string; color: string } } = {
      1: { name: "Design", color: "#FF6600" },
      2: { name: "Filmagem", color: "#00CC66" },
      3: { name: "Fotografia", color: "#9900CC" },
      4: { name: "Edição", color: "#FF3399" },
      5: { name: "Desenvolvimento", color: "#3366FF" },
      6: { name: "Roteiro", color: "#FF9933" },
      7: { name: "Consultoria", color: "#996633" },
    };

    if (rowData.taskDomain in expertiseMap) {
      const expertiseName = expertiseMap[rowData.taskDomain];
      return (
        <Tag
          severity="success"
          value={expertiseName.name}
          rounded
          style={{ background: `${expertiseName.color}` }}
        />
      );
    } else {
      return "Desconhecido";
    }
  };

  const mapUserIdsToNames = (userIds: number[]): string[] => {
    return userIds.map((userId) => {
      const user = users.find((user) => user.id === userId);
      return user ? user.name : "Desconhecido";
    });
  };

  const userAssigneesTemplate = (rowData: Task) => {
    const userTask = rowData.usertask;
    if (userTask && userTask.length > 0) {
      const userAssignees = userTask.map((userTask) => userTask.userId);
      const userNames = mapUserIdsToNames(userAssignees);
      return userNames.join(", ");
    } else {
      return "Nenhum usuário designado";
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <GenericDeleteModal
            open={isDeleteModalOpen}
            onClose={closeDeleteModal}
            onDelete={handleDelete}
            isOpen={true}
            itemClass="task"
            itemId={selectedTask?.id}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TasksEditTaskModal
            open={isDeleteModalOpen}
            onClose={closeDeleteModal}
            isOpen={true}
            itemId={selectedTask?.id}
          />
        </Grid>
      </Grid>

      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-search" />
        </span>
        <InputText
          type="text"
          placeholder="Buscar tarefas"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      <DataTable
        value={tasks}
        globalFilter={globalFilter}
        emptyMessage="Nenhuma tarefa encontrada"
        selectionMode="single"
        selection={selectedTask}
        onSelectionChange={(e) => setSelectedTask(e.value as Task | null)}
      >
        <Column field="name" header="Nome" sortable />
        <Column
          field="description"
          header="Descrição"
          sortable
          style={{ width: "175px" }}
        />
        <Column
          field="contractDate"
          header="Data do contrato"
          body={contractDateTemplate}
          sortable
        />
        <Column
          field="deadline"
          header="Prazo Final"
          body={deadlineTemplate}
          sortable
        />

        <Column
          field="taskDomain"
          header="Domínio da atividade"
          body={expertiseTemplate}
          sortable
        />

        <Column
          field="taskStatus"
          header="taskStatus"
          body={taskStatusTemplate}
          sortable
        />

        {/* <Column
          field="isActive"
          header="Status"
          body={statusTemplate}
          sortable
        /> */}
        <Column header="Designado" body={userAssigneesTemplate} sortable />
      </DataTable>
    </div>
  );
}

export default TasksTable;
