import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useAuthService from "@/services/auth";
import { getErrorMessage } from "@/api/error";
import { loginUser } from "@/store/reducers/auth.reducer";
import { setUserFromAuthResponse } from "@/store/reducers/user.reducer";
import { LoginValues, LoginResponse } from "@/types/auth";
import { ROUTES } from "@/utils/constants";

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuthService();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (values: LoginValues) => {
    setLoading(true);
    setError(null);

    try {
      const res = await login(values);
      handlePostLogin(res.data);
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePostLogin = (data: LoginResponse) => {
    dispatch(loginUser(data.token));
    dispatch(setUserFromAuthResponse(data));
    navigate(ROUTES.OVERVIEW);
  };

  return { handleFormSubmit, loading, error };
};

export default useLogin;
