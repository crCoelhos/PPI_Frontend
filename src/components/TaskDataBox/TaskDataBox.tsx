import React, { FC } from 'react';
import styles from './TaskDataBox.module.css';

interface TaskDataBoxProps {}

const TaskDataBox: FC<TaskDataBoxProps> = () => (
  <div className={styles.TaskDataBox}>
    TaskDataBox Component
  </div>
);

export default TaskDataBox;
