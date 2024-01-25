import Image from "next/image";
import Link from "next/link";

import { Metadata } from "next";
import LoginForm from "./login-form";

export const metadata: Metadata = {
    title: "Login",
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
                    <h1 className="text-2xl font-bold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-sm text-gray-400 ">
                        Please enter your details.
                    </p>
                </div>
                {searchParams?.message && (
                    <p className="md:max-w-[360px] w-full my-4 p-4 mx-auto bg-surface text-primary-500 text-center rounded-md">
                        {searchParams.message}
                    </p>
                )}
                <LoginForm />
            </section>
        </div>
    );
};

export default page;
