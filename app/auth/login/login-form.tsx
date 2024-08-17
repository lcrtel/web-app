"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiEye, HiEyeOff } from "react-icons/hi";
import * as z from "zod";
import { signInWithPassword } from "./action";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });
  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    setLoading(true);
    const res = await signInWithPassword(data);
    if (res?.error) {
      setLoading(false);
      toast.error(res.error);
      return;
    }
    router.refresh();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid w-full gap-2 text-primary-900"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
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
              <FormLabel className="flex gap-2">
                <span>Password</span>
                <div
                  className="cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full gap-2" disabled={loading} type="submit">
          {loading ? (
            <>
              Logging in <Loader2 className="size-4 animate-spin" />
            </>
          ) : (
            "Login"
          )}
        </Button>
        <div className="flex items-center justify-between gap-2">
          <span className="h-px w-full bg-gradient-to-r from-transparent to-slate-200" />
          <p className="text-slate-400">or</p>
          <span className="h-px w-full bg-gradient-to-l from-transparent to-slate-200" />
        </div>
        <Link
          href="/auth/otp-login"
          className={`w-full gap-2 ${buttonVariants({ variant: "outline" })}`}
        >
          Login with OTP <ArrowRight className="size-4" />
        </Link>
      </form>
    </Form>
  );
};

export default LoginForm;
