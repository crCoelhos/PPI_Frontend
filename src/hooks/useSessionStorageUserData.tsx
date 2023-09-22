import { useState, useEffect } from "react";

const useSessionStorageUserData = () => {
  const [userData, setUserData] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null); // Novo estado para o token
  const [id, setId] = useState<string | null>(null); // Novo estado para o token

  useEffect(() => {
    const getSessionUser = () => {
      const storedUserData = localStorage.getItem("user");
      const storedUserEmail = localStorage.getItem("email");
      const storedId = localStorage.getItem("id");
      const storedToken = localStorage.getItem("token"); // Recupera o token
      setToken(storedToken);
      setId(storedId);
      return storedUserData ? JSON.parse(storedUserData) : null;
    };

    const user = getSessionUser();
    setUserData(user);
  }, []);

  return {
    userData,
    token,
    id,
  };
};

export default useSessionStorageUserData;
