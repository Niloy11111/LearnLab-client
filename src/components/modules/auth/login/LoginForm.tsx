"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { loginUser } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";

export default function LoginForm() {
  const dispatch = useAppDispatch();

  const credentials = {
    email: "",
    password: "",
  };

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: credentials,
  });

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging in... ");

    try {
      const res = await loginUser(data);

      if (res?.success) {
        toast.success("Logged in", { id: toastId });
        dispatch(
          setUser({ user: res?.data?.userData, token: res?.data?.accessToken })
        );
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCredential = (userType) => {
    credentials.password = "12345678";
    if (userType === "admin") {
      credentials.email = "admin@gmail.com";
      form.reset(credentials);
    } else if (userType === "user") {
      credentials.email = "user@gmail.com";
      form.reset(credentials);
    }
  };

  return (
    <div className="shadow-xl bg-white  rounded-[8px] flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4">
        <h1 className="text-5xl  font-light  border-b-4 border-r-4 border-r-secondary-500 pr-2">
          R
        </h1>
        <div>
          <h1 className="text-xl font-semibold">Login as Admin</h1>
          <p className="font-extralight text-sm text-gray-600">Welcome back!</p>
        </div>
      </div>

      <div className="">
        <h1 className="mt-5 text-xl font-bold text-secondary-600 ">
          Demo Credentials:
        </h1>
        <div className="flex justify-center gap-3 mt-3">
          <button
            onClick={() => handleCredential("user")}
            className="credentialBtn"
          >
            User
          </button>
          <button
            onClick={() => handleCredential("admin")}
            className="credentialBtn"
          >
            Admin
          </button>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-6">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    type="email"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type your password"
                    type="password"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-5 w-full  bg-secondary-500  rounded-[8px]  hover:bg-secondary-600 cursor-pointer"
          >
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have any account ?{" "}
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
}
