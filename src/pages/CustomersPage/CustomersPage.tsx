import React, { FC, useEffect, useState } from "react";
import styles from "./CustomersPage.module.css";
import CustomersTable from "../../components/CustomersTable/CustomersTable";
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";
import { UserData } from "../../interfaces/types";
import ApiService from "../../services/api";
import CustomersAddCustomerModal from "../../components/CustomersAddCustomerModal/CustomersAddCustomerModal";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";

interface CustomersPageProps {}

const storedToken = localStorage.getItem("user");
const isStored = !!storedToken;

const CustomersPage: FC<CustomersPageProps> = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(isStored);

  return (
    <div className={styles.CustomersPageContent}>
      <PrimaryAppBar />
      <div className={styles.CustomersPage}>
        <BackButton top={66} left={32} />

        <h1>Clientes </h1>

        <div className={styles.tableArea}>
          {isStored && <CustomersAddCustomerModal />}

          <CustomersTable />
        </div>
      </div>
    </div>
  );
};
export default CustomersPage;
