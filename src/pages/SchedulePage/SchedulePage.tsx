import React, { FC } from 'react';
import styles from './SchedulePage.module.css';

interface SchedulePageProps {}

const SchedulePage: FC<SchedulePageProps> = () => (
  <div className={styles.SchedulePage}>
    SchedulePage Component
  </div>
);

export default SchedulePage;
