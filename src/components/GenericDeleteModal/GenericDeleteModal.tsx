import React from "react";
import styles from "./GenericDeleteModal.module.css";
import { Button, Modal, Box, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Task } from "../../interfaces/types";

interface GenericDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  itemClass: string;
  itemId: string | number | undefined;
  isOpen: boolean;
}

const accessHeaderValue = process.env.REACT_APP_ACCESS_HEADER;
const appURL = process.env.REACT_APP_SERVER_URL;

var tokenValue = "";
const storedToken =
  localStorage.getItem("user") || sessionStorage.getItem("user");
if (storedToken) {
  const tokenObject = JSON.parse(storedToken);
  tokenValue = tokenObject.token;
  // console.log(tokenValue);
}
const style = {
  position: "absolute" as "absolute",
  top: "35%",
  left: "35%",
  width: "450px",
  bgcolor: "background.paper",
  p: 2,
};
const buttonStyle = {
  p: 1,
  width: "112px",
};

const GenericDeleteModal: React.FC<GenericDeleteModalProps> = ({
  onClose,
  onDelete,
  itemClass,
  itemId,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);

  const handleDelete = () => {
    setIsOpen(true);
  };

  const handleDeleteConfirmation = () => {
    const deleteUrl = `${appURL}admin/${itemClass}/${itemId}`;

    const headers: { Authorization?: string; Access?: string } = {};

    if (tokenValue) {
      headers.Authorization = tokenValue;
      headers.Access = accessHeaderValue;
    }

    axios
      .delete(deleteUrl, { headers })
      .then((response) => {
        if (response.status === 200) {
          onDelete();
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir o item:", error);
      });

    setIsOpen(false);
  };

  return (
    <div className={styles.GenericDeleteModalContainer}>
      <div>
        <Button
          onClick={handleDelete}
          sx={buttonStyle}
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Excluir
        </Button>

        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className={styles.ModalContainer}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <h2>Confirmar Exclusão</h2>
              <p>Deseja realmente excluir este item?</p>
              <Button
                onClick={handleDeleteConfirmation}
                variant="outlined"
                color="error"
              >
                Excluir
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                variant="contained"
                color="primary"
              >
                Cancelar
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default GenericDeleteModal;
