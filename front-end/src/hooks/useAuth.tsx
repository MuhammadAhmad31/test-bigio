import { login } from "@/api/auth";
import { useToast } from "@/components/ui/use-toast";
import { AuthLoginForm, AuthLoginResponse } from "@/types/auth.type";
import {
  ResponseApi,
  ResponseApiError,
  ResponseApiToken,
} from "@/types/responseApi.type";
import { getDecodeToken } from "@/utils/getToken";
import { ToastAction } from "@radix-ui/react-toast";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useLogin = () => {
  const { toast } = useToast();

  const { mutate, isLoading, isSuccess } = useMutation(
    (payload: AuthLoginForm) => {
      return login(payload);
    },
    {
      onSuccess: (response) => {
        // get response data
        const { token } = response.data as ResponseApiToken<AuthLoginResponse>;

        // set cookies with name token and value data.token
        Cookies.set("token", token);

        const decodeToken = getDecodeToken(token);
        if (decodeToken) {
          window.location.href = "/story";
        }
      },
      onError: ({ response }) => {
        // get response Error
        const { message } = response.data as ResponseApiError;

        // show Notification
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
    login: mutate,
    isLoading,
    isSuccess,
  };
};
