import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError, setMessage } from "../slices/userSlice";
import { apiRequest } from "@/services/api";

interface RegsiterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "user/register",
  async (data: RegsiterPayload, { dispatch, rejectWithValue }) => {
    dispatch(setMessage(""))
    dispatch(setError(""))
    try {
      const response = await apiRequest.post("users/register/customer", data);
      dispatch(setMessage("Registration successful!"));
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);


interface LoginPayload {
  email: string,
  password: string,
}
export const loginUser = createAsyncThunk(
  "user/login",
  async(data: LoginPayload, {dispatch, rejectWithValue}) => {
    dispatch(setMessage(""))
    dispatch(setError(""))
    try{
      const response = await apiRequest.post("users/login", data);
      dispatch(setMessage(response.data.message));
      return response.data.user;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
)

// export const logoutUser = createAsyncThunk("user/logout", async({dispatch, rejectWithValue})) => {

// }
