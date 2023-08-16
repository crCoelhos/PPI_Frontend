import React, { FC } from "react";
import styles from "./TaksAddTaskModal.module.css";
import { Button, Modal, Box, Typography } from "@mui/material";
import TaksAddTaskForm from "../TaksAddTaskForm/TaksAddTaskForm";

interface TaksAddTaskModalProps {}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TaksAddTaskModal: FC<TaksAddTaskModalProps> = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCancel = () => {
    handleClose(); // Fechar o modal
  };

  return (
    <div className={styles.TeamMembersAddMemberModal}>
      <div>
        <Button onClick={handleOpen}>Novo colaborador</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TaksAddTaskForm onCancel={handleCancel} />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default TaksAddTaskModal;
