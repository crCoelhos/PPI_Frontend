import React, { FC } from "react";
import styles from "./TaksAddTaskModal.module.css";
import { Button, Modal, Box, Typography } from "@mui/material";
import TaksAddTaskForm from "../TaksAddTaskForm/TaksAddTaskForm";
import AddIcon from "@mui/icons-material/Add";

interface TaksAddTaskModalProps {}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  p: 2,
};

const buttonStyle = {
  p: 2,
  marginTop: "12px",
  marginLeft: "78vw",
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
        <Button
          onClick={handleOpen}
          sx={buttonStyle}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Nova demanda
        </Button>
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
