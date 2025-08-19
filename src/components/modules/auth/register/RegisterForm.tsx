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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { roles } from "@/constants/roles";
import { useUser } from "@/context/UserContext";
import { setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { registerUser } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { registrationSchema } from "./registerValidation";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");
  const router = useRouter();

  const { setIsLoading } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Registering... ");

    const modifiedData = { ...data, role: data?.role.toLowerCase() };

    try {
      const res = await registerUser(modifiedData);
      setIsLoading(true);
      if (res?.success) {
        toast.success("Registered", { id: toastId });
        dispatch(
          setUser({ user: res?.data?.userData, token: res?.data?.accessToken })
        );
        router.push("/");
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      toast.error(`Something went wrong ${err}`, { id: toastId });
    }
    // console.log("here", modifiedData);
  };

  // const handleClick = () => {
  //   router.push("/");
  // };

  return (
    <div className="bg-white shadow-xl rounded-[8px] flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 ">
        <h1 className="text-5xl  font-light  border-b-4 border-r-4 border-r-secondary-500 pr-2">
          L
        </h1>

        <div>
          <h1 className="text-xl font-semibold">Register</h1>
          <p className="font-extralight text-sm text-gray-600">
            Welcome! Please sign up to continue
          </p>
        </div>
      </div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-8">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Create an username"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Email</FormLabel>
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type your phone number"
                    type="phoneNumber"
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full rounded-[8px]">
                      <SelectValue placeholder="Select User Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-input">
                    {roles.map((role) => (
                      <SelectItem key={role?._id} value={role?.name}>
                        {role?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

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
                    placeholder="Create a password"
                    type="password"
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
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm your password"
                    type="password"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>

                {passwordConfirm && password !== passwordConfirm ? (
                  <FormMessage> Password does not match </FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />

          <Button
            disabled={!!passwordConfirm && password !== passwordConfirm}
            type="submit"
            className="mt-5 w-full bg-secondary-500 hover:bg-secondary-600  rounded-[8px]  cursor-pointer"
          >
            {isSubmitting ? "Registering...." : "Register"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Already have an account ?
        <Link href="/login" className="text-primary">
          Login
        </Link>
      </p>
    </div>
  );
}
