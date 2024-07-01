"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUp } from "./action";

export const signupFormSchema = z
  .object({
    name: z.string(),
    company_name: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
            value,
          ),
        {
          message:
            "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character",
        },
      ),
    confirmPassword: z.string(),
    phone: z.string(),
    skype_id: z.string().optional(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    },
  );

const SignupForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    mode: "onChange",
  });
  async function onSubmit(data: any) {
    await signUp(data);
    router.refresh();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full md:w-[420px]"
      >
        <div className="grid gap-2 text-primary-900 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
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
                    placeholder="8+ characters"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  <span>Confirm password</span>
                  <div
                    className="cursor-pointer text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <HiEyeOff /> : <HiEye />}
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Retype password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp No</FormLabel>
                <FormControl>
                  <Input placeholder="WhatsApp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skype_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skype Id</FormLabel>
                <FormControl>
                  <Input placeholder="Skype Id" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full gap-2" type="submit" disabled={loading}>
          {loading ? (
            <>
              Signup
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            "Signup"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
