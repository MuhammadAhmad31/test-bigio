import { ToastAction } from "../toast";
import { useToast } from "../use-toast";

interface AddNotifProps {
  type?: "default" | "destructive" | null | undefined;
  title?: string;
  message?: string;
}

export const AddNotif = ({
  type = "default",
  title = "Whoops !",
  message,
}: AddNotifProps) => {
  const { toast } = useToast();

  toast({
    variant: type,
    title: `${title}`,
    description: `${message}`,
    action: <ToastAction altText="Close">Close</ToastAction>,
  });
};
