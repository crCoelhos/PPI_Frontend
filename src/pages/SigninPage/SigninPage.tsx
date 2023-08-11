import React, { FC } from "react";
import styles from "./SigninPage.module.css";
import SigninContainer from "../../components/SigninContainer/SigninContainer";

interface SignupPageProps {}

const SigninPage: FC<SignupPageProps> = () => (
  <div className={styles.SignupPage}>
    <SigninContainer />
  </div>
);

export default SigninPage;
