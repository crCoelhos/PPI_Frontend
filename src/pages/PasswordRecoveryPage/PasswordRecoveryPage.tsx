import React, { FC } from "react";
import styles from "./PasswordRecoveryPage.module.css";
import PasswordRecoveryContainer from "../../components/PasswordRecoveryContainer/PasswordRecoveryContainer";

interface PasswordRecoveryPageProps {}

const PasswordRecoveryPage: FC<PasswordRecoveryPageProps> = () => (
  <div className={styles.PasswordRecoveryPage}>
    <PasswordRecoveryContainer />
  </div>
);

export default PasswordRecoveryPage;
