import axios, { Axios, AxiosError } from "axios";
import { axiosInstance } from "../lib/axiosInstance";
import { AuthLoginForm } from "@/types/auth.type";

export const login = async (payload: AuthLoginForm) => {
  try {
    const response = await axiosInstance.post("/auth/login", payload);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw error;
  }
};