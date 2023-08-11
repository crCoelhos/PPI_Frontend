import React, { FC } from 'react';
import styles from './UserDataContainer.module.css';

interface UserDataContainerProps {}

const UserDataContainer: FC<UserDataContainerProps> = () => (
  <div className={styles.UserDataContainer}>
    UserDataContainer Component
  </div>
);

export default UserDataContainer;
