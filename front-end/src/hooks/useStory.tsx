import {
  addStory,
  deleteStory,
  getDetailStory,
  getStory,
  updateStory,
} from "@/api/data";
import { toast, useToast } from "@/components/ui/use-toast";
import { ResponseApi, ResponseApiError } from "@/types/responseApi.type";
import { DeleteStory, FormStory, StoryFilter } from "@/types/story.type";
import { ToastAction } from "@radix-ui/react-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useGetStory = (params?: StoryFilter) => {
  const { data, isLoading, isError, error } = useQuery(
    ["stories", params],
    () => {
      return getStory(params);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const err = error as AxiosError<ResponseApiError>;
  const res = data?.data;
  const message = err?.response?.data?.message;

  const notif = () => {
    toast({
      variant: "destructive",
      title: "Gagal mengambil data",
      description: `${message || "Terjadi Error"}`,
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  };

  useEffect(() => {
    if (isError) {
      notif();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return {
    data: {
      stories: res?.data,
      message: res?.message,
    },
    isLoading,
    error,
  };
};

export const useAddStory = () => {
  const route = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation(
    (payload: FormStory) => {
      return addStory(payload);
    },
    {
      onSuccess: (response) => {
        const result = response.data as ResponseApi<FormStory>;

        toast({
          variant: "success",
          title: "Berhasil",
          description: `${result.message}`,
        });

        // Invalidate the products
        queryClient.invalidateQueries(["news"]);

        // redirect to products page
        route.push("/story");
      },
      onError: ({ response }) => {
        const { message } = response.data as ResponseApiError;

        toast({
          variant: "destructive",
          title: "Gagal",
          description: `${message}`,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      },
    }
  );
  return {
    addStory: mutate,
    isLoading,
    isSuccess,
  };
};

export const useGetDetailStory = (id: number) => {
  const { toast } = useToast();

  const { data, isLoading, isError, error } = useQuery(
    ["story", id],
    () => {
      return getDetailStory(id!);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );

  const err = error as AxiosError<ResponseApiError>;
  const res = data?.data;
  const message = err?.response?.data?.message;

  const notif = () => {
    toast({
      variant: "destructive",
      title: "Gagal mengambil data",
      description: `${message || "Terjadi Error"}`,
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  };

  useEffect(() => {
    if (isError) {
      notif();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return {
    data: {
      detailStory: res?.data,
      message: res?.message,
    },
    isLoading,
    error,
  };
};

export const useEditStory = () => {
  const route = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation(
    (
      payload: FormStory & {
        id: number;
      }
    ) => {
      return updateStory(payload.id, payload);
    },
    {
      onSuccess: (response) => {
        const result = response.data as ResponseApi<FormStory>;

        toast({
          variant: "success",
          title: "Berhasil",
          description: `${result.message}`,
        });

        queryClient.invalidateQueries(["story"]);

        route.push("/story");
      },
      onError: ({ response }) => {
        const { message } = response.data as ResponseApiError;

        toast({
          variant: "destructive",
          title: "Gagal",
          description: `${message}`,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      },
    }
  );
  return {
    editStory: mutate,
    isLoading,
    isSuccess,
  };
};

export const useDeleteStory = () => {
  const route = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation(
    (payload: number) => {
      return deleteStory(payload);
    },
    {
      onSuccess: (response) => {
        const result = response.data as ResponseApi<DeleteStory>;

        toast({
          variant: "success",
          title: "Berhasil",
          description: `${result.message}`,
        });

        setTimeout(() => {
          queryClient.invalidateQueries(["story"]);
          route.reload();
        }, 800);
      },
      onError: ({ response }) => {
        const { message } = response.data as ResponseApiError;

        toast({
          variant: "destructive",
          title: "Gagal",
          description: `${message}`,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      },
    }
  );
  return {
    deleteStory: mutate,
    isLoading,
    isSuccess,
  };
};
