import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxSlices } from "@/types/enums";
import { LoginResponse, RegisterResponse } from "@/types/auth";

export interface UserRole {
  authority: string;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  totalBooks: number;
  roles: UserRole[];
}

export interface AuthState {
  loggedIn: boolean;
  token: string | null;
}

export type UserState = User & AuthState;

export const initialUserState: UserState = {
  userId: "",
  name: "",
  email: "",
  totalBooks: 0,
  roles: [],
  loggedIn: false,
  token: null,
};

export const mapAuthResponseToUser = (
  data: LoginResponse | RegisterResponse
): Partial<UserState> => ({
  userId: String(data.userId),
  name: data.fullName || "Guest User",
  email: data.email || "superadmin@example.com",
});

export const userSlice = createSlice({
  name: ReduxSlices.User,
  initialState: initialUserState,
  reducers: {
    setUserFromAuthResponse: (_, action: PayloadAction<LoginResponse | RegisterResponse>) => {
      const user = mapAuthResponseToUser(action.payload);
      return {
        ...initialUserState,
        ...user,
        loggedIn: true,
        token: action.payload.token,
      };
    },

    setUserFromApi: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload, loggedIn: true };
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload };
    },

    logoutUser: () => initialUserState,
  },
});

export const { setUserFromAuthResponse, setUserFromApi, updateUser, logoutUser } =
  userSlice.actions;

export default userSlice.reducer;
