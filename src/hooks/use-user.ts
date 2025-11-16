import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { getErrorMessage } from "@/api/error";
import userService, { User } from "@/services/user";

const useUser = () => {
  const { getCurrentUser } = userService();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    const token = localStorage.getItem("token"); 
    if (!token) return; 
    
    setLoading(true);
    try {
      const data = await getCurrentUser();
      setUser(data);
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        setUser(null);
        return;
      }
      notifications.show({
        title: "Error fetching user",
        message: getErrorMessage(error),
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    loading,
    fetchUser,
    setUser,
  };
};

export default useUser;
