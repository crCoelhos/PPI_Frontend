import React, { FC, useEffect, useState } from "react";
import styles from "./CustomersPage.module.css";
import CustomersTable from "../../components/CustomersTable/CustomersTable";
import PrimaryAppBar from "../../components/PrimaryAppBar/PrimaryAppBar";
import { UserData } from "../../interfaces/types";
import ApiService from "../../services/api";
import CustomersAddCustomerModal from "../../components/CustomersAddCustomerModal/CustomersAddCustomerModal";

interface CustomersPageProps {}

const CustomersPage: FC<CustomersPageProps> = () => {
  return (
    <div className={styles.CustomersPageContent}>
      <PrimaryAppBar />
      <div className={styles.CustomersPage}>
        <h1>Clientes </h1>

        <div className={styles.tableArea}>
          <CustomersAddCustomerModal />
          <CustomersTable />
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
