import { AxiosResponse } from "axios";
import { useAxiosApi } from "@/api/api";
import { ENDPOINTS } from "@/api/endpoints";
import { ApiAuthModes } from "@/types/enums";
import { LoginValues, RegisterValues } from "@/types/auth";

const useAuthService = () => {
  const apiNoAuth = useAxiosApi(ApiAuthModes.NoAuth);

  const login = async (data: LoginValues): Promise<{ token: string }> => {
    const res: AxiosResponse<{ jwt: string }> = await apiNoAuth.post(ENDPOINTS.AUTH.LOGIN, data);
    return { token: res.data.jwt }; 
  };

  const register = async (data: RegisterValues): Promise<{ token: string }> => {
    const res: AxiosResponse<{ jwt: string }> = await apiNoAuth.post(ENDPOINTS.AUTH.REGISTER, data);
    return { token: res.data.jwt }; 
  };

  return { login, register };
};

export default useAuthService;
