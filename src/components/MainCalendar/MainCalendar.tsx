import React, { FC } from 'react';
import styles from './MainCalendar.module.css';

interface MainCalendarProps {}

const MainCalendar: FC<MainCalendarProps> = () => (
  <div className={styles.MainCalendar}>
    MainCalendar Component
  </div>
);

export default MainCalendar;
