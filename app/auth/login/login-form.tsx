"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import type { Session } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Button } from "@/components/ui/button";

const LoginForm = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Invalid email address")
            .required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setErrorMessage(null);
            setLoading(true);
            const { data, error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });
            setLoading(false);

            if (error) {
                setErrorMessage(error.message);
                return;
                // console.error(error.message);
            }
            router.push("/dashboard");

            // Handle successful login (e.g., set user state, redirect to dashboard, etc.)
            console.log("Logged in user:", data?.user);
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="md:max-w-[360px] w-full mx-auto"
        >
            <div className="grid gap-4 mb-6 text-primary-500">
                <div>
                    <Label htmlFor="email" className="inline-block mb-2">
                        Email
                    </Label>
                    <Input
                        type="text"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-sm mt-1.5 text-red-500">
                            {formik.errors.email}
                        </div>
                    ) : null}
                </div>
                <div>
                    <Label htmlFor="password" className="flex gap-2 mb-2">
                        Password
                        <button onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <HiEyeOff className="text-gray-400" />
                            ) : (
                                <HiEye className="text-gray-400" />
                            )}
                        </button>
                    </Label>
                    <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-sm mt-1.5 text-red-500">
                            {formik.errors.password}
                        </div>
                    ) : null}
                    {errorMessage && (
                        <div className="text-base mt-1.5 text-red-500">
                            {errorMessage}
                        </div>
                    )}
                </div>
            </div>
            <Button
                className="w-full mb-5 gap-2"
                type="submit"
                disabled={loading}
            >
                {loading ? (
                    <>
                        Loging in
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                ) : (
                    "Login"
                )}
            </Button>
            <p className="text-sm font-light text-center text-gray-500">
                Don’t have an account yet?{" "}
                <Link
                    href="/auth/signup"
                    className="font-medium text-primary-600 hover:underline"
                >
                    Sign up
                </Link>
            </p>
        </form>
    );
};

export default LoginForm;
