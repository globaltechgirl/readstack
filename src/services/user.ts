import { AxiosResponse } from "axios";
import { useAxiosApi } from "@/api/api";
import { ENDPOINTS } from "@/api/endpoints";
import { ApiAuthModes } from "@/types/enums";

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  bio?: string | null;
  profileImageUrl?: string | null;
  createdAt: string;
}

const userService = () => {
  const authApi = useAxiosApi(ApiAuthModes.BearerToken);

  const getCurrentUser = async (): Promise<User> => {
    const res: AxiosResponse<User> = await authApi.get(ENDPOINTS.AUTH.ME);
    return res.data;
  };

  return {
    getCurrentUser,
  };
};

export default userService;
