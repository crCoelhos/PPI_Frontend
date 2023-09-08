// import styles from './CustomersTable.module.css';
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
} from "@mui/material";
import axios from "axios";
import styles from "./CustomersTable.module.css";
import { CustomersHeadCell, CustomerData } from "../../interfaces/types";

const appURL = process.env.REACT_APP_SERVER_URL;
const accessHeaderValue = process.env.REACT_APP_ACCESS_HEADER;

interface CustomersTableProps {}

const CustomersTable: FC<CustomersTableProps> = () => {
  const [orderBy, setOrderBy] = useState<keyof CustomerData>("businessName");
  const [order, setOrder] = React.useState<Order>("asc");
  const [selected, setSelected] = useState<number[]>([]);

  const [customers, setCustomers] = useState<CustomerData[]>([]);

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
          localStorage.getItem("user") || sessionStorage.getItem("user");
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

        console.log("Request successful:", customers);
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

  const sortedCustomers = [...customers].sort(comparator);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const selectedIds = sortedCustomers.map((customer) => customer.id);
      setSelected(selectedIds);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <TableContainer>
      {customers.length > 0 ? (
        <Table className={styles.CustomersTable}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 &&
                    selected.length < sortedCustomers.length
                  }
                  checked={
                    sortedCustomers.length > 0 &&
                    selected.length === sortedCustomers.length
                  }
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                  padding={headCell.disablePadding ? "none" : "normal"}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}></Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCustomers.map((customer) => (
              <TableRow
                key={customer.id}
                hover
                role="checkbox"
                tabIndex={-1}
                selected={isSelected(customer.id)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(customer.id)}
                    onChange={(event) =>
                      handleCheckboxClick(event, customer.id)
                    }
                  />
                </TableCell>
                <TableCell>{customer.businessName}</TableCell>
                <TableCell>{customer.cnpj}</TableCell>
                <TableCell>{customer.contactName}</TableCell>
                <TableCell align="right">{customer.size}</TableCell>
                <TableCell>
                  {!customer.isActive ? "Inativo" : "Ativo"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>Loading...</p>
      )}
    </TableContainer>
  );
};

export default CustomersTable;
