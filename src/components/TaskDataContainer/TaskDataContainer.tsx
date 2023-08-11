import React, { FC } from 'react';
import styles from './TaskDataContainer.module.css';

interface TaskDataContainerProps {}

const TaskDataContainer: FC<TaskDataContainerProps> = () => (
  <div className={styles.TaskDataContainer}>
    TaskDataContainer Component
  </div>
);

export default TaskDataContainer;
