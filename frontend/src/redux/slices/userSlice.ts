import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../thunks/userThunks";

// Define a type for the slice state
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface UserState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
  message: string;
  user: User;
}

// Define the initial state using that type
const initialState: UserState = {
  isAuthenticated: false,
  loading: false,
  error: "",
  message: "",
  user: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  },
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    // --- register
    .addCase(registerUser.pending, (state) => {
      state.loading = true
    })
    .addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(registerUser.rejected, (state) => {
      state.loading = false;
    })
    // --- login
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase(loginUser.rejected, (state) => {
      state.loading = false;
    })
  }
});

export const { setError, setMessage } = userSlice.actions;
export default userSlice.reducer;
