import React, { FC } from "react";
import styles from "./TasksEditTaskModal.module.css";
import { Button, Modal, Box, Typography } from "@mui/material";
import TaksAddTaskForm from "../TaksAddTaskForm/TaksAddTaskForm";
import EditIcon from "@mui/icons-material/Edit";
import TasksEditTaskForm from "../TasksEditTaskForm/TasksEditTaskForm";

interface TasksEditTaskModalProps {
  open: boolean;
  onClose: () => void;
  itemId: string | number | undefined;
  isOpen: boolean;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 2,
};

const buttonStyle = {
  p: 1,
  width: "112px"
};

const TasksEditTaskModal: FC<TasksEditTaskModalProps> = ({
  onClose,
  itemId,
  isOpen,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCancel = () => {
    handleClose();
  };

  return (
    <div className={styles.TeamMembersAddMemberModal}>
      <div>
        <Button
          onClick={handleOpen}
          sx={buttonStyle}
          variant="contained"
          color="secondary"
          startIcon={<EditIcon />}
        >
          Editar
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TasksEditTaskForm onCancel={handleCancel} itemId={itemId} />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default TasksEditTaskModal;
