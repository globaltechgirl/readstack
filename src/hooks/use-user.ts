import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { User } from "@/store/reducers/user.reducer";

const useUser = () => {
  const reduxUser = useSelector((state: RootState) => state.user);

  const user: User = {
    userId: reduxUser.userId,
    name: reduxUser.name,
    email: reduxUser.email,
    totalBooks: reduxUser.totalBooks,
    roles: reduxUser.roles || [],
  };

  return {
    user,
    loggedIn: reduxUser.loggedIn,
    token: reduxUser.token,
  };
};

export default useUser;
