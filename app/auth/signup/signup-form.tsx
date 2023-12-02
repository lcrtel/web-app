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
            .required("Phone is required")
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

            await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Set the appropriate content type
                },
                body: JSON.stringify(values), // Convert data to JSON string
            }).then(async (response) => {
                if (!response.ok) {
                    const error = await response.json();
                    toast.error(error.message);
                    setLoading(false);
                    return;
                }
            });

            fetch(`/api/emails/auth/signup`, {
                method: "POST",
                body: JSON.stringify({
                    name: values.name,
                    company_name: values.company_name,
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
            className="md:max-w-[400px] w-full mx-auto"
        >
            <div className="grid gap-4 mb-6 sm:grid-cols-2 text-primary-500">
                <div>
                    <Label htmlFor="name" className="inline-block mb-2">
                        Name
                    </Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-sm mt-1.5 text-red-500">
                            {formik.errors.name}
                        </div>
                    ) : null}
                </div>
                <div>
                    <Label htmlFor="company_name" className="inline-block mb-2">
                        Company Name
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
            
        </form>
    );
};

export default SignupForm;
