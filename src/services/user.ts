import { AxiosResponse } from "axios";
import { useAxiosApi } from "@/api/api";
import { ENDPOINTS } from "@/api/endpoints";
import { ApiAuthModes } from "@/types/enums";

export interface UserResponse {
  userId: string;
  name: string;
  email: string;
  totalBooks: number;
  roles: { authority: string }[];
}

const userService = () => {
  const authApi = useAxiosApi(ApiAuthModes.BearerToken);

  const getUserDetails = async (): Promise<UserResponse> => {
    const res: AxiosResponse<UserResponse> = await authApi.get(ENDPOINTS.AUTH.ME);
    return res.data;
  };

  return { getUserDetails };
};

export default userService;
