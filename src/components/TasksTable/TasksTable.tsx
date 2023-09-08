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

function TasksTable() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [orderBy, setOrderBy] = useState<keyof Task>("name");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // Use selectedTask para armazenar a tarefa selecionada
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Função para abrir o modal
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  // Função para fechar o modal
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

  function handleDelete() {
    console.log(selectedTask?.id);
  }

  const dateTemplate = (rowData: Task) => {
    return format(new Date(rowData.contractDate), "dd/MM/yyyy");
  };

  const statusTemplate = (rowData: Task) => {
    return rowData.isActive ? "Ativo" : "Inativo";
  };

  const buttonStyle = {
    p: 2,
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} sm={6}>
          <GenericDeleteModal
            open={isDeleteModalOpen}
            onClose={closeDeleteModal}
            onDelete={handleDelete}
            isOpen={true}
            itemClass="task"
            itemId={selectedTask?.id}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <TaksAddTaskModal />
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
        <Column field="taskDomain" header="Domínio da atividade" sortable />
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
