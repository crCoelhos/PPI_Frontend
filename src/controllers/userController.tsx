import { useState } from "react";
import api from "../services/api"; // Importe o seu ApiService aqui

const UserController = () => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [roleId, setRoleId] = useState("");
  const [sex, setSex] = useState("");
  const [is_active, setStatus] = useState(true);
  const [password, setPassword] = useState("");
  const [expertiseId, setExpertiseId] = useState("");

  const handleSubmit = async () => {
    const userData = {
      name: name || "Nome Padrão",
      cpf: cpf || "CPF Padrão",
      email: email || "Email Padrão",
      contact,
      birthdate,
      hireDate,
      roleId: roleId || 3,
      sex,
      expertiseId,
      is_active: is_active || false,
      password: "pass",
    };

    try {
      const response = await api.postData("/admin/user/", userData);
      console.log("Dados enviados com sucesso:", response);

      setName("");
      setCpf("");
      setEmail("");
      setContact("");
      setBirthdate("");
      setHireDate("");
      setRoleId("");
      setSex("");
      setExpertiseId("");
      setStatus(false);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      
    }
  };

  return {
    name,
    setName,
    cpf,
    setCpf,
    email,
    setEmail,
    contact,
    setContact,
    birthdate,
    setBirthdate,
    hireDate,
    setHireDate,
    roleId,
    setRoleId,
    sex,
    setSex,
    expertiseId,
    setExpertiseId,
    is_active,
    setStatus,
    password,
    handleSubmit,
  };
};

export default UserController;
