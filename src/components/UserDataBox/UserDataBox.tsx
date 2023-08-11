import React, { FC } from 'react';
import styles from './UserDataBox.module.css';

interface UserDataBoxProps {}

const UserDataBox: FC<UserDataBoxProps> = () => (
  <div className={styles.UserDataBox}>
    UserDataBox Component
  </div>
);

export default UserDataBox;
