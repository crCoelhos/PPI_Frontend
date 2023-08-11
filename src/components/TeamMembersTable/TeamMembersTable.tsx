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
import styles from "./TeamMembersTable.module.css";
import ApiService from "../../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  contact: string;
  expertiseId: number;
  is_active: boolean;
  // se adicionar aqui tem que adicionar ali em baixo
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof User;
  label: string;
  numeric: boolean;
}

interface TeamMembersTableProps {}

const TeamMembersTable: FC<TeamMembersTableProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [orderBy, setOrderBy] = useState<keyof User>("name");
  const [order, setOrder] = React.useState<Order>("asc");
  const [selected, setSelected] = useState<number[]>([]); // Alterado para guardar IDs selecionados

  const headCells: readonly HeadCell[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "contact",
      numeric: false,
      disablePadding: false,
      label: "Contact",
    },
    {
      id: "expertiseId",
      numeric: true,
      disablePadding: false,
      label: "Expertise",
    },
    {
      id: "is_active",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
    // aqui
  ];

  const visuallyHidden = { visuallyHidden: { display: "none" } };

  useEffect(() => {
    console.log("Fetching users...");
    const fetchUsers = async () => {
      try {
        const res = await ApiService.fetchData<User[]>("admin/user/");
        setUsers(res);
        setIsLoading(false);
        console.log("Users fetched:", res);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const createSortHandler = (property: keyof User) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  type Order = "asc" | "desc";

  const comparator = (a: User, b: User) => {
    if (orderBy === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (orderBy === "email") {
      return order === "asc"
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email);
    } else if (orderBy === "contact") {
      return order === "asc"
        ? a.contact.localeCompare(b.contact)
        : b.contact.localeCompare(a.contact);
    } else if (orderBy === "expertiseId") {
      return order === "asc"
        ? a.expertiseId - b.expertiseId
        : b.expertiseId - a.expertiseId;
    } else if (orderBy === "is_active") {
      return order === "asc"
        ? a.expertiseId - b.expertiseId
        : b.expertiseId - a.expertiseId;
    }
    return 0;
  };

  const sortedUsers = [...users].sort(comparator);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const selectedIds = sortedUsers.map((user) => user.id);
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
      <Table className={styles.TeamMembersTable}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < sortedUsers.length
                }
                checked={
                  sortedUsers.length > 0 &&
                  selected.length === sortedUsers.length
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
          {sortedUsers.map((user) => (
            <TableRow
              key={user.id}
              hover
              role="checkbox"
              tabIndex={-1}
              selected={isSelected(user.id)}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected(user.id)}
                  onChange={(event) => handleCheckboxClick(event, user.id)}
                />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.contact}</TableCell>
              <TableCell align="right">{user.expertiseId}</TableCell>
              <TableCell>{!user.is_active ? "Inativo" : "Ativo"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamMembersTable;
