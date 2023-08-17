import React, { FC } from "react";
import styles from "./CustomersAddCustomerModal.module.css";
import { Button, Modal, Box, Typography } from "@mui/material";
import TeamMembersAddMemberForm from "../TeamMembersAddMemberForm/TeamMembersAddMemberForm";

interface CustomersAddCustomerModalProps {}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  p: 2,
};

const CustomersAddCustomerModal: FC<CustomersAddCustomerModalProps> = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCancel = () => {
    handleClose(); // Fechar o modal
  };

  return (
    <div className={styles.CustomersAddCustomerModal}>
      <div>
        <Button onClick={handleOpen}>Novo colaborador</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TeamMembersAddMemberForm onCancel={handleCancel} />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default CustomersAddCustomerModal;
