import { useState } from "react";
import api from "../services/api"; // Importe o seu ApiService aqui

const UserController = () => {
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [hireDate, setHireDate] = useState<string>("");
  const [roleId, setRoleId] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [is_active, setStatus] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [expertiseId, setExpertiseId] = useState<number | string>("");

  const handleSubmit = async () => {
    const userData = {
      name: name,
      cpf: cpf,
      email: email,
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
      console.log("Dados enviados com sucesso:");

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
