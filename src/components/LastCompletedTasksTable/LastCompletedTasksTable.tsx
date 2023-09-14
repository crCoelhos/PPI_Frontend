import React, { FC } from 'react';
import styles from './LastCompletedTasksTable.module.css';

interface LastCompletedTasksTableProps {}

const LastCompletedTasksTable: FC<LastCompletedTasksTableProps> = () => (
  <div className={styles.LastCompletedTasksTable}>
    LastCompletedTasksTable Component
  </div>
);

export default LastCompletedTasksTable;
