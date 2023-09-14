import { useState } from "react";
import api from "../services/api"; // Importe o seu ApiService aqui

const TaskController = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState<string>("");
  const [contractDate, setContractDate] = useState<string>("");
  const [contractDocument, setContractDocument] = useState<string | null>("");
  const [startDate, setStartDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [updatedDeadline, setUpdatedDeadline] = useState<string | null>("");
  const [taskDomain, setTaskDomain] = useState<number | string>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [customerId, setCustomerId] = useState<number | string>(0);

  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    
    const taskData = {
      name: name,
      description: description,
      contractDate: contractDate,
      contractDocument: contractDocument,
      startDate: startDate,
      deadline: deadline,
      updatedDeadline: updatedDeadline || null,
      taskDomain: taskDomain,
      isActive: isActive || false,
      customerId: customerId,
    };

    try {
      const response = await api.postData("/admin/task/", taskData);
      console.log("Dados enviados com sucesso:");

      setName("");
      setDescription("");
      setContractDate("");
      setContractDocument(null);
      setStartDate("");
      setDeadline("");
      setTaskDomain("");
      setIsActive(false);
      setCustomerId("");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return {
    name,
    setName,
    description,
    setDescription,
    contractDate,
    setContractDate,
    contractDocument,
    setContractDocument,
    startDate,
    setStartDate,
    deadline,
    setDeadline,
    updatedDeadline,
    setUpdatedDeadline,
    taskDomain,
    setTaskDomain,
    isActive,
    setIsActive,
    customerId,
    setCustomerId,
    handleSubmit,
  };
};

export default TaskController;
