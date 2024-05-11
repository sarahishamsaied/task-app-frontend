import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserState {
  token: string | null;
  info: {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    isVerified: boolean;
  } | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  token: "",
  info: {
    firstName: "",
    lastName: "",
    email: "",
    id: "",
    isVerified: false,
  },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: any; isLoggedIn: boolean }>
    ) => {
      state.token = action.payload.token;
      state.info = action.payload.user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.info = null;
      state.isLoggedIn = false;
    },

    deactivate: (state) => {
      state.token = null;
      state.info = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
