import React, { FC } from 'react';
import styles from './SignupContainer.module.css';

interface SignupContainerProps {}

const SignupContainer: FC<SignupContainerProps> = () => (
  <div className={styles.SignupContainer}>
    SignupContainer Component
  </div>
);

export default SignupContainer;
