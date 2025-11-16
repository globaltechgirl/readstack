import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuthService from "@/services/auth";
import useUser from "@/hooks/use-user";
import { getErrorMessage } from "@/api/error";
import { loginUser } from "@/store/reducers/auth.reducer";
import { setUserFromAuthResponse } from "@/store/reducers/user.reducer";
import { LoginValues, LoginResponse } from "@/types/auth";
import { ROUTES } from "@/utils/constants";
import { useState } from "react";

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuthService();
  const { fetchUser } = useUser(); // get fetchUser

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (values: LoginValues): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const res: LoginResponse = await login(values);

      if (!res.token) {
        setError("Invalid email or password");
        return false;
      }

      dispatch(loginUser(res.token));
      dispatch(setUserFromAuthResponse(res));

      await fetchUser();

      navigate(ROUTES.OVERVIEW);
      return true;
    } catch (err: any) {
      setError(getErrorMessage(err) || "Login failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleFormSubmit, loading, error };
};

export default useLogin;
