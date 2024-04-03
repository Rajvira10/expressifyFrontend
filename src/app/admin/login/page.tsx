"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Routes from "@/lib/routes";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormFields = z.infer<typeof schema>;

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async (data: FormFields) => {
      const response = await axios.post(Routes.ADMIN_LOGIN, data);

      document.cookie = `adminToken=${response.data.token}; path=/`;
      document.cookie = `name=${response.data.name}; path=/`;

      return response.data;
    },
    onError: (err) => {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "There was an error.",
            description: "Email or password is incorrect.",
            variant: "destructive",
          });
        }
      }
      return toast({
        title: "There was an error.",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "You have successfully logged in.",
        description: "Welcome back!",
      });
      router.push("/admin");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  return (
    <div className="flex flex-col w-full justify-center items-center min-h-screen">
      <h2 className="font-bold text-4xl">Expressify</h2>
      <Card className="w-full max-w-sm mt-5">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit((e) => loginMutation(e))}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
