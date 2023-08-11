import React, { FC } from 'react';
import styles from './TasksPage.module.css';

interface TasksPageProps {}

const TasksPage: FC<TasksPageProps> = () => (
  <div className={styles.TasksPage}>
    TasksPage Component
  </div>
);

export default TasksPage;
