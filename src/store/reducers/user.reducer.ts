import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxSlices } from "@/types/enums";
import { LoginResponse, RegisterResponse } from "@/types/auth";

export interface User {
  userId: number;
  username: string;
  email: string;
  firstName: string;
}

export const mapAuthResponseToUser = (
  data: LoginResponse | RegisterResponse
): User => {
  return {
    userId: data.userId,
    username: data.username,
    email: data.email,
    firstName: data.firstName,
  };
};

export interface AuthState {
  loggedIn: boolean;
  token: string | null;
}

export const initialUserState: User & AuthState = {
  userId: 0,
  username: "",
  email: "",
  firstName: "",
  loggedIn: false,
  token: null,
};

export const userSlice = createSlice({
  name: ReduxSlices.User,
  initialState: initialUserState,
  reducers: {
    setUserFromAuthResponse: (
      _,
      action: PayloadAction<LoginResponse | RegisterResponse>
    ) => {
      const user = mapAuthResponseToUser(action.payload);
      return {
        ...user,
        loggedIn: true,
        token: action.payload.token,
      };
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload };
    },

    logoutUser: () => initialUserState,
  },
});

export const { setUserFromAuthResponse, updateUser, logoutUser } =
  userSlice.actions;

export default userSlice.reducer;
