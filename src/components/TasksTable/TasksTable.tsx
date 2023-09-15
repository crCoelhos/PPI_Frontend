import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TasksTable.module.css";
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
import PreviewIcon from "@mui/icons-material/Preview";
import ClearIcon from "@mui/icons-material/Clear";
import GenericDeleteModal from "../GenericDeleteModal/GenericDeleteModal";
import TasksEditTaskModal from "../TasksEditTaskModal/TasksEditTaskModal";
import { UserData, Task } from "../../interfaces/types";

import ApiService from "../../services/api";
import { Tag } from "primereact/tag";
import { useNavigate } from "react-router-dom";

function TasksTable() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [orderBy, setOrderBy] = useState<keyof Task>("name");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // Use selectedTask para armazenar a tarefa selecionada
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching tasks...");
    const fetchTasks = async () => {
      try {
        const res = await ApiService.fetchData<Task[]>("admin/tasks/");
        setTasks(res);
        setFilteredTasks(res);
        setIsLoading(false);
        console.log("tasks fetched:", res);
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.name.toLowerCase().includes(globalFilter.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [globalFilter, tasks]);

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

  const estimativeTemplate = (rowData: Task) => {
    if (rowData.estimateValue && rowData.estimateValue > 0) {
      return <Tag value={`R$ ${rowData.estimateValue}`} rounded />;
    } else {
      return <Tag severity="warning" value="AGUARDANDO" rounded />;
    }
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
      case "TO_ESTIMATE":
        statusColor = "info";
        statusText = "ORÇAMENTAR";
        break;
      case "WAITING":
        statusColor = "warning";
        statusText = "AGUARDANDO";
        break;
      case "PAUSED":
        statusColor = "warning";
        statusText = "PAUSADA";
        break;
      case "CANCELED":
        statusColor = "danger";
        statusText = "CANCELADA";
        break;
      case "OVERDUE":
        statusColor = "danger";
        statusText = "ATRASADA";
        break;
      case "INPROGRESS":
        statusColor = "info";
        statusText = "EM PROGRESSO";
        break;
      case "COMPLETED":
        statusColor = "success";
        statusText = "CONCLUIDA";
        break;
      default:
        break;
    }

    return <Tag severity={statusColor} value={statusText} rounded />;
  };

  const expertiseTemplate = (rowData: Task) => {
    const taskDomain = parseInt(rowData.taskDomain); // Converta para número

    const expertiseMap: { [key: number]: { name: string; color: string } } = {
      1: { name: "Design", color: "#FF6600" },
      2: { name: "Filmagem", color: "#00CC66" },
      3: { name: "Fotografia", color: "#9900CC" },
      4: { name: "Edição", color: "#FF3399" },
      5: { name: "Desenvolvimento", color: "#3366FF" },
      6: { name: "Roteiro", color: "#FF9933" },
      7: { name: "Consultoria", color: "#996633" },
    };

    if (!isNaN(taskDomain) && taskDomain in expertiseMap) {
      const expertiseName = expertiseMap[taskDomain];
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

  const buttonStyle = {
    p: 1,
    width: "112px",
  };

  const handleViewTaskClick = (taskId: number) => {
    navigate(`/tasks/${taskId}`);
    console.log(taskId);
  };

  const actionsTemplate = (rowData: Task) => {
    return (
      <>
        <div>
          <GenericDeleteModal
            open={isDeleteModalOpen}
            onClose={closeDeleteModal}
            onDelete={handleDelete}
            isOpen={true}
            itemClass="task"
            itemId={rowData?.id}
          />

          <TasksEditTaskModal
            open={isEditModalOpen}
            onClose={closeEditModal}
            isOpen={true}
            itemId={rowData?.id}
          />

          <Button
            onClick={() => handleViewTaskClick(rowData.id)} // Passar o ID diretamente
            variant="contained"
            color="inherit"
            startIcon={<PreviewIcon />}
            sx={buttonStyle}
          >
            Ver
          </Button>
        </div>
      </>
    );
  };

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

  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
    openDeleteModal();
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    openEditModal();
  };

  return (
    <TableContainer>
      <TextField
        label="Buscar tarefas"
        value={globalFilter}
        onChange={(e) => {
          setGlobalFilter(e.target.value);
          console.log(e.target.value); // Adicione este console.log para verificar o valor
        }}
      />

      <Table className={styles.TasksTable}>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Data do contrato</TableCell>
            <TableCell>Prazo Final</TableCell>
            <TableCell>Domínio da atividade</TableCell>
            <TableCell>Orçamento</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ação</TableCell>
            <TableCell>Designado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{contractDateTemplate(task)}</TableCell>
              <TableCell>{deadlineTemplate(task)}</TableCell>
              <TableCell>{expertiseTemplate(task)}</TableCell>
              <TableCell>{estimativeTemplate(task)}</TableCell>
              <TableCell>{taskStatusTemplate(task)}</TableCell>
              <TableCell>{actionsTemplate(task)}</TableCell>
              <TableCell>{userAssigneesTemplate(task)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TasksTable;
