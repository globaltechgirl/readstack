import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useAuthService from "@/services/auth";
import { getErrorMessage } from "@/api/error";
import { loginUser } from "@/store/reducers/auth.reducer";
import { RegisterValues } from "@/types/auth";
import { ROUTES } from "@/utils/constants";

interface ApiResponse<T> {
  data: T;
}

interface RegisterResponse {
  token: string;
}

const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register } = useAuthService();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (values: RegisterValues): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const res: ApiResponse<RegisterResponse> = await register(values);

      if (!res.data?.token) {
        setError("Registration failed. Please try again.");
        return false;
      }

      dispatch(loginUser(res.data.token));

      navigate(ROUTES.AUTH.LOGIN);

      return true;
    } catch (err: any) {
      setError(getErrorMessage(err) || "Registration failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleFormSubmit, loading, error };
};

export default useRegister;
