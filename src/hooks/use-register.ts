import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useAuthService from "@/services/auth";
import { getErrorMessage } from "@/api/error";
import { loginUser } from "@/store/reducers/auth.reducer";
import { setUserFromAuthResponse } from "@/store/reducers/user.reducer";
import { RegisterValues, RegisterResponse } from "@/types/auth";
import { ROUTES } from "@/utils/constants";

const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register } = useAuthService();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (values: RegisterValues) => {
    setLoading(true);
    setError(null);

    try {
      const res = await register(values); 
      handlePostRegister(res.data);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePostRegister = (data: RegisterResponse) => {
    dispatch(loginUser(data.token));
    dispatch(setUserFromAuthResponse(data));
    navigate(ROUTES.OVERVIEW);
  };

  return { handleFormSubmit, loading, error };
};

export default useRegister;
