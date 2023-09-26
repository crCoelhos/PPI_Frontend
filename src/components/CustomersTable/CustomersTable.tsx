import React, { FC, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TableSortLabel,
  Box,
  TextField,
} from "@mui/material";
import axios from "axios";
import styles from "./CustomersTable.module.css";
import { CustomersHeadCell, CustomerData } from "../../interfaces/types";
import GenericDeleteModal from "../GenericDeleteModal/GenericDeleteModal";
import TeamEditTeamModal from "../TeamEditTeamForm/TeamEditTeamModal";

const appURL = process.env.REACT_APP_SERVER_URL;
const accessHeaderValue = process.env.REACT_APP_ACCESS_HEADER;

interface CustomersTableProps {}

const CustomersTable: FC<CustomersTableProps> = () => {
  const [orderBy, setOrderBy] = useState<keyof CustomerData>("businessName");
  const [order, setOrder] = React.useState<Order>("asc");
  // const [selected, setSelected] = useState<number[]>([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setselectedCustomer] = useState<CustomerData | null>(
    null
  ); // Use selectedUser para armazenar a tarefa selecionada
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const headCells: readonly CustomersHeadCell[] = [
    {
      id: "businessName",
      numeric: false,
      disablePadding: true,
      label: "Empresa",
    },
    {
      id: "cnpj",
      numeric: false,
      disablePadding: false,
      label: "CNPJ",
    },
    {
      id: "contactName",
      numeric: false,
      disablePadding: false,
      label: "Representante",
    },
    {
      id: "size",
      numeric: true,
      disablePadding: false,
      label: "Categoria",
    },
    {
      id: "isActive",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
  ];

  const visuallyHidden = { visuallyHidden: { display: "none" } };

  useEffect(() => {
    const fetchUsers = async () => {
      let tokenValue: string = "";
      let accessValue: string = accessHeaderValue || " ";
      try {
        const storedToken =
          localStorage.getItem("user") || localStorage.getItem("user");
        if (storedToken) {
          const tokenObject = JSON.parse(storedToken);
          tokenValue = tokenObject.token;

          const response = await axios.get<CustomerData[]>(
            `${appURL}admin/customers/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: tokenValue,
                Access: accessValue,
              },
            }
          );
          setCustomers(response.data);
        }

        // console.log("Request successful:", customers);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error:", error.response?.data);
        } else {
          console.error("Error:", error);
        }
      }
    };

    fetchUsers();
  }, []);

  const createSortHandler = (property: keyof CustomerData) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  type Order = "asc" | "desc";

  const comparator = (a: CustomerData, b: CustomerData) => {
    if (orderBy === "businessName") {
      return order === "asc"
        ? a.businessName.localeCompare(b.businessName)
        : b.businessName.localeCompare(a.businessName);
    } else if (orderBy === "contactName") {
      return order === "asc"
        ? a.contactName.localeCompare(b.contactName)
        : b.contactName.localeCompare(a.contactName);
    } else if (orderBy === "size") {
      return order === "asc"
        ? a.size.localeCompare(b.size)
        : b.size.localeCompare(a.size);
    }
    return 0;
  };

  // const sortedCustomers = [...customers].sort(comparator);

  const sortedCustomers = [...customers]
    .filter((customer) => {
      const searchTerm = searchValue.toLowerCase();
      return (
        customer.businessName.toLowerCase().includes(searchTerm) ||
        customer.cnpj.toLowerCase().includes(searchTerm) ||
        customer.contactName.toLowerCase().includes(searchTerm) ||
        customer.size.toString().toLowerCase().includes(searchTerm) ||
        (customer.isActive ? "ativo" : "inativo")
          .toLowerCase()
          .includes(searchTerm)
      );
    })
    .sort(comparator);

  // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     const selectedIds = sortedCustomers.map((customer) => customer.id);
  //     setSelected(selectedIds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleCheckboxClick = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   id: number
  // ) => {
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected: number[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  // const isSelected = (id: number) => selected.indexOf(id) !== -1;

  async function handleDelete() {
    if (selectedCustomer?.id) {
      try {
        const updatedCustomers = customers.filter(
          (customer) => customer.id !== selectedCustomer.id
        );

        atualizarClientes(updatedCustomers);

        closeDeleteModal();
      } catch (error) {
        console.error("Erro ao excluir o cliente:", error);
      }
    }
  }

  const atualizarClientes = (novaListaClientes: CustomerData[]) => {
    setCustomers(novaListaClientes);
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

  const handleDeleteClick = (customer: CustomerData) => {
    setselectedCustomer(customer);
    openDeleteModal();
  };

  const handleEditClick = (customer: CustomerData) => {
    setselectedCustomer(customer);
    openEditModal();
  };

  const actionsTemplate = (rowData: CustomerData) => {
    return (
      <>
        <GenericDeleteModal
          open={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
          isOpen={true}
          itemClass="customer"
          itemId={rowData?.id}
        />
      </>
    );
  };

  return (
    <TableContainer className={styles.CustomersTableContent}>
      {/* <TextField
        label="Pesquisar"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      /> */}
      <Table className={styles.CustomersTable}>
        <TableHead>
          <TableRow>
            <TableCell>Empresa</TableCell>
            <TableCell>CNPJ</TableCell>
            <TableCell>Representante</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCustomers.map((customer) => (
            <TableRow key={customer.id} hover>
              <TableCell>{customer.businessName}</TableCell>
              <TableCell>{customer.cnpj}</TableCell>
              <TableCell>{customer.contactName}</TableCell>
              <TableCell align="right">{customer.size}</TableCell>
              <TableCell>{!customer.isActive ? "Inativo" : "Ativo"}</TableCell>
              <TableCell>{actionsTemplate(customer)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomersTable;
