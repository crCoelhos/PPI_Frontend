import React, { FC } from 'react';
import styles from './UserImageContainer.module.css';

interface UserImageContainerProps {}

const UserImageContainer: FC<UserImageContainerProps> = () => (
  <div className={styles.UserImageContainer}>
    UserImageContainer Component
  </div>
);

export default UserImageContainer;
