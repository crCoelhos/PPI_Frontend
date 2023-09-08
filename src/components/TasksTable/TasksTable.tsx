import React, { useEffect, useState } from "react";
import ApiService from "../../services/api";
import { Task } from "../../interfaces/types";
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
        console.log("Tasks fetched:", res);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchTasks();
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

  const dateTemplate = (rowData: Task) => {
    return format(new Date(rowData.contractDate), "dd/MM/yyyy");
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
        // Você pode adicionar um tratamento adicional aqui para outros status não especificados.
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
        <Column field="description" header="Descrição" sortable />
        <Column
          field="contractDate"
          header="Data do contrato"
          body={dateTemplate}
          sortable
        />
        <Column
          field="deadline"
          header="Prazo Final"
          body={dateTemplate}
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

        <Column
          field="isActive"
          header="Status"
          body={statusTemplate}
          sortable
        />
      </DataTable>
    </div>
  );
}

export default TasksTable;
