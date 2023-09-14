import React, { FC } from 'react';
import styles from './LastOverdueTasksTable.module.css';

interface LastOverdueTasksTableProps {}

const LastOverdueTasksTable: FC<LastOverdueTasksTableProps> = () => (
  <div className={styles.LastOverdueTasksTable}>
    LastOverdueTasksTable Component
  </div>
);

export default LastOverdueTasksTable;
