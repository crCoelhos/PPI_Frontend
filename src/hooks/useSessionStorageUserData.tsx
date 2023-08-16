import { useState, useEffect } from "react";

const useSessionStorageUserData = () => {
  const [userData, setUserData] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null); // Novo estado para o token

  useEffect(() => {
    const getSessionUser = () => {
      const storedUserData = sessionStorage.getItem("user");
      const storedUserEmail = sessionStorage.getItem("email");
      const storedToken = sessionStorage.getItem("token"); // Recupera o token
      setToken(storedToken); // Define o token no estado
      return storedUserData ? JSON.parse(storedUserData) : null;
    };

    const user = getSessionUser();
    setUserData(user);
  }, []);

  return {
    userData,
    token,
  };
};

export default useSessionStorageUserData;
