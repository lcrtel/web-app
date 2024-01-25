"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiEye, HiEyeOff, HiOutlineMail } from "react-icons/hi";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase-client";

const SignupForm = () => {
    const supabase = supabaseClient()
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);

    const validationSchema = yup.object().shape({
        name: yup.string().required("First Name is required"),
        company_name: yup.string(),
        email: yup
            .string()
            .email("Invalid email address")
            .required("Email is required"),
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
            ),
        confirmPassword: yup
            .string()
            .required("Confirm Password is required")
            .oneOf([yup.ref("password")], "Passwords must match")
            .nullable(),
        phone: yup
            .string()
            .required("WhatsApp No is required")
            .matches(/^\+?[0-9]*$/, "Invalid phone number"),
        skype_id: yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            company_name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            skype_id: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const { data, error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    data: {
                        name: values.name,
                        company_name: values.company_name,
                        email: values.email,
                        phone: values.phone,
                        skype_id: values.skype_id,
                        role: "client",
                    },
                    emailRedirectTo: `${location.origin}/api/auth/callback`,
                },
            });
            if (error) {
                setLoading(false);
                return;
            }
            setLoading(false);
            setCheckEmail(true);
            router.refresh();
        },
    });

    return (
        <div className="md:max-w-[360px] w-full mx-auto">
            {checkEmail ? (
                <div className="flex w-full flex-col mb-5 text-center items-center">
                    <div className="border-2 rounded-lg border-gray-300 p-2 mb-5">
                        <HiOutlineMail className="w-6 h-6 " />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Check your email
                    </h1>
                    <p className="text-sm text-gray-400 ">
                        We sent a verification link to your email
                    </p>
                </div>
            ) : (
                <form
                    onSubmit={formik.handleSubmit}
                    className="md:max-w-[360px] w-full mx-auto"
                >
                    <h2 className="mb-2 text-2xl text-center font-bold tracking-tight">
                        Signup
                    </h2>
                    <p className="text-sm font-light mb-5 text-center text-gray-500">
                        If you don’t have an account
                    </p>
                    <div className="grid gap-4 mb-6 sm:grid-cols-2 text-primary-500">
                        <div>
                            <Label
                                htmlFor="name"
                                className="inline-block mb-2"
                            >
                                First Name
                            </Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name &&
                            formik.errors.name ? (
                                <div className="text-sm mt-1.5 text-red-500">
                                    {formik.errors.name}
                                </div>
                            ) : null}
                        </div>
                        <div>
                            <Label
                                htmlFor="company_name"
                                className="inline-block mb-2"
                            >
                                Last Name
                            </Label>
                            <Input
                                type="text"
                                id="company_name"
                                name="company_name"
                                value={formik.values.company_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.company_name &&
                            formik.errors.company_name ? (
                                <div className="text-sm mt-1.5 text-red-500">
                                    {formik.errors.company_name}
                                </div>
                            ) : null}
                        </div>
                        <div className="sm:col-span-2">
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
                                placeholder="8+ characters"
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
                        </div>
                        <div>
                            <div className="flex gap-2 mb-2">
                                <Label htmlFor="confirmPassword">
                                    Confirm Password
                                </Label>{" "}
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
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword ? (
                                <div className="text-sm mt-1.5 text-red-500">
                                    {formik.errors.confirmPassword}
                                </div>
                            ) : null}
                        </div>
                        <div>
                            <Label
                                htmlFor="phone"
                                className="inline-block mb-2"
                            >
                                WhatsApp No
                            </Label>
                            <Input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                                <div className="text-sm mt-1.5 text-red-500">
                                    {formik.errors.phone}
                                </div>
                            ) : null}
                        </div>
                        <div>
                            <Label
                                htmlFor="skype_id"
                                className="inline-block mb-2"
                            >
                                Skype ID
                            </Label>
                            <Input
                                type="text"
                                id="skype_id"
                                name="skype_id"
                                value={formik.values.skype_id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.skype_id &&
                            formik.errors.skype_id ? (
                                <div className="text-sm mt-1.5 text-red-500">
                                    {formik.errors.skype_id}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <Button
                        className="w-full mb-5 gap-2"
                        type="submit"
                        disabled={loading}
                    >
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
            )}
        </div>
    );
};

export default SignupForm;
