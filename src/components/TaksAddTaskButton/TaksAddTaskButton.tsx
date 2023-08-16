import React, { FC } from 'react';
import styles from './TaksAddTaskButton.module.css';

interface TaksAddTaskButtonProps {}

const TaksAddTaskButton: FC<TaksAddTaskButtonProps> = () => (
  <div className={styles.TaksAddTaskButton}>
    TaksAddTaskButton Component
  </div>
);

export default TaksAddTaskButton;
