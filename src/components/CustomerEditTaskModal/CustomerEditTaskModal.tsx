import React, { FC } from 'react';
import styles from './CustomerEditTaskModal.module.css';

interface CustomerEditTaskModalProps {}

const CustomerEditTaskModal: FC<CustomerEditTaskModalProps> = () => (
  <div className={styles.CustomerEditTaskModal}>
    CustomerEditTaskModal Component
  </div>
);

export default CustomerEditTaskModal;
