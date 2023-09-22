import React, { FC, useEffect } from "react";
import styles from "./GenericFailToast.module.css";
import { Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface GenericFailToastProps {
  message: string;
  show: boolean;
  // onClose: () => void;
}

const GenericFailToast: FC<GenericFailToastProps> = ({ message, show }) => {
  const [open, setOpen] = React.useState(show);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <div className={styles.GenericFailToast}>
      <Collapse in={open}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  );
};

export default GenericFailToast;
