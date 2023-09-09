import React, { useEffect, useState } from "react";
import ApiService from "../../services/api";
import { Task, User, UserData } from "../../interfaces/types";
import styles from "./TasksTable.module.css";
import TaksAddTaskModal from "../TaksAddTaskModal/TaksAddTaskModal";
import format from "date-fns/format";

import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";

import Grid from "@mui/material/Grid";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import GenericDeleteModal from "../GenericDeleteModal/GenericDeleteModal";
import TeamEditTaskModal from "../TeamEditTeamModal/TeamEditTeamModal";

function TasksTable() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [orderBy, setOrderBy] = useState<keyof UserData>("name");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    console.log("Fetching users...");
    const fetchTasks = async () => {
      try {
        const res = await ApiService.fetchData<UserData[]>("admin/users/");
        setUsers(res);
        setIsLoading(false);
        console.log("users fetched:", res);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  async function handleDelete() {
    if (selectedUser?.id) {
      try {
        const updatedUsers = users.filter(
          (users) => users.id !== selectedUser.id
        );
        setUsers(updatedUsers);

        closeDeleteModal();
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
      }
    }
  }

  const hireDateTemplate = (rowData: UserData) => {
    return format(new Date(rowData.hireDate), "dd/MM/yyyy");
  };

  const statusTemplate = (rowData: UserData) => {
    return rowData.is_active ? (
      <Tag value="Ativo" rounded />
    ) : (
      <Tag severity="danger" value="Inativo" rounded />
    );
  };

  const roleTemplate = (rowData: UserData) => {
    if (rowData.role.name === "ADMIN") {
      return <Tag severity="danger" value={rowData.role.name} rounded />;
    } else if (rowData.role.name === "TESTE") {
      return <Tag severity="success" value={rowData.role.name} rounded />;
    } else if (rowData.role.name === "FUNCIONARIO") {
      return <Tag severity="success" value={rowData.role.name} rounded />;
    }
  };

  const expertiseTemplate = (rowData: { expertiseId: number }) => {
    const expertiseMap: { [key: number]: { name: string; color: string } } = {
      1: { name: "Design", color: "#FF6600" },
      2: { name: "Filmagem", color: "#00CC66" },
      3: { name: "Fotografia", color: "#9900CC" },
      4: { name: "Edição", color: "#FF3399" },
      5: { name: "Desenvolvimento", color: "#3366FF" },
      6: { name: "Roteiro", color: "#FF9933" },
      7: { name: "Consultoria", color: "#996633" },
    };

    if (rowData.expertiseId in expertiseMap) {
      const expertiseName = expertiseMap[rowData.expertiseId];
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
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} sm={6}>
          <GenericDeleteModal
            open={isDeleteModalOpen}
            onClose={closeDeleteModal}
            onDelete={handleDelete}
            isOpen={true}
            itemClass="user"
            itemId={selectedUser?.id}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <TeamEditTaskModal
            open={isDeleteModalOpen}
            onClose={closeDeleteModal}
            isOpen={true}
            itemId={selectedUser?.id}
          />
        </Grid>
      </Grid>

      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-search" />
        </span>
        <InputText
          type="text"
          placeholder="Buscar"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      <DataTable
        value={users}
        globalFilter={globalFilter}
        emptyMessage="Nenhum funcionário encontrado"
        selectionMode="single"
        selection={selectedUser}
        onSelectionChange={(e) => setSelectedUser(e.value as UserData | null)}
      >
        <Column field="name" header="Nome" sortable />
        <Column field="contact" header="Contato" sortable />
        <Column field="email" header="Email" sortable />
        <Column
          field="hireDate"
          header="Data de contratação"
          body={hireDateTemplate}
          sortable
        />
        <Column
          field="taskDomain"
          header="Domínio da atividade"
          body={expertiseTemplate}
          sortable
        />
        <Column
          field="isActive"
          header="Status"
          body={statusTemplate}
          sortable
        />
        <Column field="role.name" header="Papel" body={roleTemplate} sortable />
      </DataTable>
    </div>
  );
}

export default TasksTable;
// NOME EMAIL CONTATO EXPERTISE STATUS
