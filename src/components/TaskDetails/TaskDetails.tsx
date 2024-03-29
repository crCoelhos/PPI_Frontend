import React, { FC, useEffect, useState } from "react";
import styles from "./TaskDetails.module.css";
import { Task } from "../../interfaces/types";
import { Typography, Paper, CircularProgress } from "@mui/material";
import TaskDetailsDataTable from "../TaskDetailsDataTable/TaskDetailsDataTable";
import PrimaryAppBar from "../PrimaryAppBar/PrimaryAppBar";
import BackButton from "../BackButton/BackButton";

interface TaskDetailsProps {}

const TaskDetails: FC<TaskDetailsProps> = () => {
  return (
    <div className={styles.TaskDetails}>
      <PrimaryAppBar />
      <BackButton top={66} left={32} />
      <TaskDetailsDataTable />
    </div>
  );
};

export default TaskDetails;
