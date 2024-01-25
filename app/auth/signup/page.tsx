import { Metadata } from "next";
import SignupForm from "./signup-form";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Signup",
};

const page = ({ searchParams }: { searchParams: { message: string } }) => {
    return (
        <div className="w-full md:w-2/3 p-8  flex items-center justify-center">
            <section className="w-full">
                <div className="flex w-full flex-col space-y-1 mb-5 text-center items-center">
                    <Link href="/" passHref className="mb-4 md:hidden">
                        <Image
                            src="/lcr-icon.svg"
                            alt="LCRTelcom"
                            width={80}
                            height={30}
                        />
                    </Link>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create an account
                    </h1>
                    <p className="text-sm text-gray-400 ">
                        Enter your details below to create your account
                    </p>
                </div>
                {searchParams?.message && (
                    <p className="md:max-w-[400px] w-full my-4 p-4 mx-auto bg-surface text-primary-500 text-center rounded-md">
                        {searchParams.message}
                    </p>
                )}
                <SignupForm />
                <p className="text-sm font-light text-center text-gray-500">
                    Already have an account?{" "}
                    <Link
                        href="/auth/login"
                        className="font-medium text-primary-600 hover:underline"
                    >
                        Log In
                    </Link>
                </p>
            </section>
        </div>
    );
};

export default page;
