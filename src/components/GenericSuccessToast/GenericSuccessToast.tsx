import React, { FC, useEffect } from "react";
import styles from "./GenericSuccessToast.module.css";
import { Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface GenericSuccessToastProps {
  message: string;
  show: boolean;
  // onClose: () => void;
}

const GenericSuccessToast: FC<GenericSuccessToastProps> = ({
  message,
  show,
}) => {
  const [open, setOpen] = React.useState(show);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <div className={styles.GenericSuccessToast}>
      <Collapse in={open}>
        <Alert
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

export default GenericSuccessToast;
