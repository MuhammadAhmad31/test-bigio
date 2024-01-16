import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Login() {
  // use react query
  const { login, isLoading, isSuccess } = useLogin();

  const FormSchema = z.object({
    email: z.string().nonempty(),
    password: z.string().nonempty(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await login(data);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen mx-auto bg-primary-color-teal">
        <Card className="rounded-sm md:w-1/4">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-button-color-teal">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel className="sr-only">Username</FormLabel>
                        <FormControl>
                          <Input
                            className="text-center border-button-color-teal"
                            placeholder="Masukan Username"
                            type="email"
                            {...field}
                            // onChange={(val) => {
                            //   console.log(val);

                            // }}
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel className="sr-only">Password</FormLabel>
                        <FormControl>
                          <Input
                            className="text-center border-button-color-teal"
                            placeholder="Masukan Password"
                            type="password"
                            {...field}
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <div className="flex items-center justify-center">
                  <Button className="w-2/4 bg-zinc-950">Masuk</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
