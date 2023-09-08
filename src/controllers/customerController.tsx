import { useState } from "react";
import api from "../services/api";

const CustomerController = () => {
  const [businessName, setBusinessName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactCpf, setContactCpf] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [size, setSize] = useState("");

  const handleSubmit = async () => {
    try {
      const businessData = {
        businessName:
          size === "1" ? `${contactName} ${contactCpf}` : businessName,
        cnpj: cnpj,
        contactName: contactName,
        contactCpf: contactCpf,
        isActive: isActive || false,
        size: size,
      };

      const response = await api.postData("/admin/customer/", businessData);

      // wipa os campos após o envio
      setBusinessName("");
      setCnpj("");
      setContactName("");
      setContactCpf("");
      setIsActive(false);
      setSize("");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return {
    businessName,
    setBusinessName,
    cnpj,
    setCnpj,
    contactName,
    setContactName,
    contactCpf,
    setContactCpf,
    isActive,
    setIsActive,
    size,
    setSize,
    handleSubmit,
  };
};

export default CustomerController;
