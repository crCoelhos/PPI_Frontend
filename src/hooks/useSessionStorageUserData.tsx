import { useState, useEffect } from "react";

const useSessionStorageUserData = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const getSessionUser = () => {
      const storedUserData = sessionStorage.getItem("user");
      return storedUserData ? JSON.parse(storedUserData) : null;
    };

    const user = getSessionUser();
    setUserData(user);
  }, []);

  return userData;
};

export default useSessionStorageUserData;
