import React, { FC } from 'react';
import styles from './TaskDescriptionContainer.module.css';

interface TaskDescriptionContainerProps {}

const TaskDescriptionContainer: FC<TaskDescriptionContainerProps> = () => (
  <div className={styles.TaskDescriptionContainer}>
    TaskDescriptionContainer Component
  </div>
);

export default TaskDescriptionContainer;
