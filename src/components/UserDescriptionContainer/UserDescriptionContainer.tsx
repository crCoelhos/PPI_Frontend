import React, { FC } from 'react';
import styles from './UserDescriptionContainer.module.css';

interface UserDescriptionContainerProps {}

const UserDescriptionContainer: FC<UserDescriptionContainerProps> = () => (
  <div className={styles.UserDescriptionContainer}>
    UserDescriptionContainer Component
  </div>
);

export default UserDescriptionContainer;
