import React, { FC } from 'react';
import styles from './TaskAttributionContainer.module.css';

interface TaskAttributionContainerProps {}

const TaskAttributionContainer: FC<TaskAttributionContainerProps> = () => (
  <div className={styles.TaskAttributionContainer}>
    TaskAttributionContainer Component
  </div>
);

export default TaskAttributionContainer;
