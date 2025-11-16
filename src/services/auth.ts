import { AxiosResponse } from "axios";
import { useAxiosApi } from "@/api/api";
import { ENDPOINTS } from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import {
  LoginValues,
  LoginResponse,
  RegisterValues,
  RegisterResponse,
} from "@/types/auth";
import { ApiAuthModes } from "@/types/enums";

const useAuthService = () => {
  const apiNoAuth = useAxiosApi(ApiAuthModes.NoAuth);

  const login = async (data: LoginValues): Promise<LoginResponse> => {
    const res: AxiosResponse<LoginResponse> = 
      await apiNoAuth.post(ENDPOINTS.AUTH.LOGIN, data);
    return res.data;
  };

  const register = async (data: RegisterValues): Promise<ApiResponse<RegisterResponse>> => {
    const res: AxiosResponse<ApiResponse<RegisterResponse>> =
      await apiNoAuth.post(ENDPOINTS.AUTH.REGISTER, data);
    return res.data;
  };

  return { login, register };
};

export default useAuthService;
