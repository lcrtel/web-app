"use client";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { supabaseClient } from "@/lib/supabase-client";

const ResetForm = () => {
    const supabase = supabaseClient()
    const router = useRouter();
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Invalid email address")
            .required("Email is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setMessage(null);
            setLoading(true);
            const { data, error } = await supabase.auth.resetPasswordForEmail(
                values.email,
                {
                    redirectTo:
                        "https://lcrtel.com/api/auth/reset_password?password_reset=/user/account/password",
                }
            );
            if (error) {
                setLoading(false);
                setMessage(error.message);
                return;
            }
            toast.success("Password reset link sent successfully");
            setMessage(
                "Password reset link sent successfully, please check your email"
            );
            setLoading(false);
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="md:max-w-[360px] w-full mx-auto"
        >
            <div className="grid gap-4 mb-6 text-primary-900">
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
            </div>
            <Button
                className="w-full mb-5 gap-2"
                type="submit"
                disabled={loading}
            >
                {loading ? (
                    <>
                        Sending password reset link
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                ) : (
                    "Send password reset link"
                )}
            </Button>
            <p className=" font-medium text-green-500 max-w-xs mx-auto text-center">
                {message ? message : null}
            </p>
        </form>
    );
};

export default ResetForm;
