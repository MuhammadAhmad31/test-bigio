import { axiosInstance, setAuthToken } from "@/lib/axiosInstance";
import { ResponseApi } from "@/types/responseApi.type";
import { FormStory, Story, StoryFilter } from "@/types/story.type";
import { getToken } from "@/utils/getToken";
import axios, { AxiosError } from "axios";

export const getStory = async (params?: StoryFilter, token?: string) => {
  try {
    if (token) {
      setAuthToken(token);
    } else {
      setAuthToken(getToken());
    }
    const response = await axiosInstance.get<ResponseApi<Story[]>>("/story", {
      params: {
        author: params?.author || "",
        title: params?.title || "",
        status: params?.status || "",
        category: params?.category || "",
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw error;
  }
};

export const addStory = async (payload: FormStory) => {
  console.log("payload :", payload);
  try {
    setAuthToken(getToken());
    const response = await axiosInstance.post("/story", payload);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw error;
  }
};

export const getDetailStory = async (id: number, token?: string) => {
  try {
    if (token) {
      setAuthToken(token);
    } else {
      setAuthToken(getToken());
    }
    const response = await axiosInstance.get<ResponseApi<Story>>(
      `/story/${id}`
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw error;
  }
};

export const updateStory = async (
  id: number,
  payload: FormStory,
  token?: string
) => {
  try {
    if (token) {
      setAuthToken(token);
    } else {
      setAuthToken(getToken());
    }
    const response = await axiosInstance.patch(`/story/${id}`, payload);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw error;
  }
};

export const deleteStory = async (id: number, token?: string) => {
  try {
    if (token) {
      setAuthToken(token);
    } else {
      setAuthToken(getToken());
    }
    const response = await axiosInstance.delete(`/story/${id}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw error;
  }
};
