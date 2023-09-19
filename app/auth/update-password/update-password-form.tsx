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

const UpdatePasswordForm = () => {
    const supabase = supabaseClient();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = yup.object().shape({
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
    });

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const { data, error } = await supabase.auth.updateUser({
                password: values.password,
            });

            if (error) {
                setLoading(false);
                toast.error(error.message);
                return;
            }
            toast.success("Password updated successfully");
            router.push("/user");
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="md:max-w-[360px] w-full mx-auto"
        >
            <div className="grid gap-4 mb-6 text-primary-500">
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
            </div>

            <Button
                className="w-full mb-5 gap-2"
                type="submit"
                disabled={loading}
            >
                {loading ? (
                    <>
                        Updating
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                ) : (
                    "Update"
                )}
            </Button>
        </form>
    );
};

export default UpdatePasswordForm;
