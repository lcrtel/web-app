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

const LoginModal = ({ session }: { session: Session | null }) => {
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

            if (error) {
                setLoading(false);
                setErrorMessage(error.message);
                return;
            }
            const userRole = data.user.user_metadata.role;
            if (userRole === "admin") {
                router.push("/admin");
            } else if (userRole === "manager") {
                router.push("/manager");
            } else {
                router.refresh();
            }
        },
    });

    return (
        <div className="absolute bg-white/50 backdrop-blur w-full h-full z-20 flex items-center justify-center">
            <div className="md:max-w-[360px] w-full">
                <h2 className="mb-5 text-2xl text-center font-bold tracking-tight">
                    Login to access
                </h2>

                <form
                    onSubmit={formik.handleSubmit}
                    className=" w-full mx-auto"
                >
                    <div className="grid gap-4 mb-6 text-primary-500">
                        <div>
                            <Label
                                htmlFor="email"
                                className="inline-block mb-2"
                            >
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
                            <div className="flex gap-2 mb-2">
                                <Label htmlFor="password">Password</Label>{" "}
                                <div
                                    className="text-gray-400 cursor-pointer"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? <HiEyeOff /> : <HiEye />}
                                </div>
                            </div>

                            <Input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password &&
                            formik.errors.password ? (
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
            </div>
        </div>
    );
};

export default LoginModal;