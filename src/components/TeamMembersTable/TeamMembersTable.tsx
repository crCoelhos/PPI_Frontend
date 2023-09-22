import React, { useEffect, useState } from "react";
import { UserData } from "../../interfaces/types";
// import TaksAddUserModal from "../TaksAddUserModal/TaksAddUserModal";

import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import TeamEditTeamModal from "../TeamEditTeamModal/TeamEditTeamModal";
import axios from "axios";
import styles from "./TeamMembersTable.module.css";
import format from "date-fns/format";

import {
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import GenericDeleteModal from "../GenericDeleteModal/GenericDeleteModal";
// import UsersEditUserModal from "../UsersEditUserModal/UsersEditUserModal";

import ApiService from "../../services/api";
import { Tag } from "primereact/tag";

function UsersTable() {
  const [users, setUsers] = useState<UserData[]>([]);
  // const [users, setUsers] = useState<User[]>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [orderBy, setOrderBy] = useState<keyof UserData>("name");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setselectedUser] = useState<UserData | null>(null); // Use selectedUser para armazenar a tarefa selecionada
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // console.log("Fetching users...");
    const fetchUsers = async () => {
      try {
        const res = await ApiService.fetchData<UserData[]>("admin/users/");
        // console.log(res);
        setIsLoading(false);
        // console.log("users fetched:", res);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // console.log("Fetching users...");
    const fetchUsers = async () => {
      try {
        const userResponse = await ApiService.fetchData<UserData[]>(
          "admin/users/"
        );
        setUsers(userResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  async function handleDelete() {
    if (selectedUser?.id) {
      try {
        const updatedUsers = users.filter(
          (user) => user.id !== selectedUser.id
        );
        setUsers(updatedUsers);
        closeDeleteModal();
      } catch (error) {
        console.error("Erro ao excluir a tarefa:", error);
      }
    }
  }

  const birthDateTemplate = (rowData: UserData) => {
    const birthdate = rowData.birthdate ? new Date(rowData.birthdate) : null;
    return birthdate ? format(birthdate, "dd/MM/yyyy") : "";
  };

  const hireDateTemplate = (rowData: UserData) => {
    const hireDate = rowData.hireDate ? new Date(rowData.hireDate) : null;
    return hireDate ? format(hireDate, "dd/MM/yyyy") : "";
  };

  const statusTemplate = (rowData: UserData) => {
    return rowData.is_active ? (
      <Tag value="Ativo" rounded />
    ) : (
      <Tag severity="danger" value="Inativo" rounded />
    );
  };

  const expertiseTemplate = (rowData: UserData) => {
    const userDomain = rowData.expertiseId;

    const expertiseMap: { [key: number]: { name: string; color: string } } = {
      1: { name: "Design", color: "#FF6600" },
      2: { name: "Filmagem", color: "#00CC66" },
      3: { name: "Fotografia", color: "#9900CC" },
      4: { name: "Edição", color: "#FF3399" },
      5: { name: "Desenvolvimento", color: "#3366FF" },
      6: { name: "Roteiro", color: "#FF9933" },
      7: { name: "Consultoria", color: "#996633" },
    };

    if (!isNaN(userDomain) && userDomain in expertiseMap) {
      const expertiseName = expertiseMap[userDomain];
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

  const actionsTemplate = (rowData: UserData) => {
    return (
      <>
        <GenericDeleteModal
          open={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
          isOpen={true}
          itemClass="user"
          itemId={rowData?.id}
        />

        <TeamEditTeamModal
          open={isDeleteModalOpen}
          onClose={closeDeleteModal}
          isOpen={true}
          itemId={rowData?.id}
        />
      </>
    );
  };

  // aaaaaaaaaaaaaaaaaaaaa
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = (user: UserData) => {
    setselectedUser(user);
    openDeleteModal();
  };

  const handleEditClick = (user: UserData) => {
    setselectedUser(user);
    openEditModal();
  };

  return (
    <TableContainer className={styles.TeamMembersTable}>
      {/* <TextField
        label="Buscar funcionário"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      /> */}
      <Table className={styles.UsersTable}>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Nascimento</TableCell>
            <TableCell>Data do contratação</TableCell>
            <TableCell>Domínio da atividade</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{birthDateTemplate(user)}</TableCell>
              <TableCell>{hireDateTemplate(user)}</TableCell>
              <TableCell>{expertiseTemplate(user)}</TableCell>
              <TableCell>{statusTemplate(user)}</TableCell>
              <TableCell>{actionsTemplate(user)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersTable;
