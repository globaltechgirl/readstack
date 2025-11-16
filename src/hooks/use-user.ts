import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { getErrorMessage } from "@/api/error";
import userService, { User } from "@/services/user";

const useUser = () => {
  const { getCurrentUser } = userService();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const data = await getCurrentUser();
      setUser(data);
    } catch (error) {
      notifications.show({
        title: "Error fetching user",
        message: getErrorMessage(error),
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    fetchUser, 
    setUser,
  };
};

export default useUser;
