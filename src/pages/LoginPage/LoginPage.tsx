import React, { FC } from "react";
import styles from "./LoginPage.module.css";
import LoginBox from "../../components/LoginTest/LoginBox";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => (
  <div className={styles.LoginPage}>
    <LoginBox />
  </div>
);

export default LoginPage;
