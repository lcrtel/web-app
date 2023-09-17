"use client";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import * as yup from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabaseClient } from "@/lib/supabase-client";
import { toast } from "react-hot-toast";

const SignupForm = () => {
    const supabase = supabaseClient();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = yup.object().shape({
        first_name: yup.string().required("First Name is required"),
        last_name: yup.string(),
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
            .required("Phone is required")
            .matches(/^\+?[0-9]*$/, "Invalid phone number"),
        skype_id: yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
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
                        first_name: values.first_name,
                        last_name: values.last_name,
                        email: values.email,
                        phone: values.phone,
                        skype_id: values.skype_id,
                        role: "buyer",
                        finance_department: {},
                        noc_dipartment: {},
                        sales_dipartment: {},
                    },
                    emailRedirectTo: `${location.origin}/api/auth/callback`,
                },
            });
            if (error) {
                setLoading(false);
                toast.error(error.message);
                return;
            }
            toast.success("Check your mail");
            fetch(`${location.origin}/api/emails/auth/signup`, {
                method: "POST",
                body: JSON.stringify({
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    password: values.password,
                }),
            });
            router.push("/auth/check-email");
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="md:max-w-[360px] w-full mx-auto"
        >
            <div className="grid gap-4 mb-6 sm:grid-cols-2 text-primary-500">
                <div>
                    <Label htmlFor="first_name" className="inline-block mb-2">
                        First Name
                    </Label>
                    <Input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.first_name && formik.errors.first_name ? (
                        <div className="text-sm mt-1.5 text-red-500">
                            {formik.errors.first_name}
                        </div>
                    ) : null}
                </div>
                <div>
                    <Label htmlFor="last_name" className="inline-block mb-2">
                        Last Name
                    </Label>
                    <Input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.last_name && formik.errors.last_name ? (
                        <div className="text-sm mt-1.5 text-red-500">
                            {formik.errors.last_name}
                        </div>
                    ) : null}
                </div>
                <div className="sm:col-span-2">
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
                    <div className="flex gap-2 mb-2">
                        <Label htmlFor="password">Password</Label>{" "}
                        <div
                            className="text-gray-400 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
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
                    {formik.touched.password && formik.errors.password ? (
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
                            onClick={() => setShowPassword(!showPassword)}
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
                    <Label htmlFor="phone" className="inline-block mb-2">
                        Phone
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
                    <Label htmlFor="skype_id" className="inline-block mb-2">
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
                    {formik.touched.skype_id && formik.errors.skype_id ? (
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
            <p className="text-sm font-light text-center text-gray-500">
                Already have an account?{" "}
                <Link
                    href="/auth/login"
                    className="font-medium text-primary-600 hover:underline"
                >
                    Log In
                </Link>
            </p>
        </form>
    );
};

export default SignupForm;
