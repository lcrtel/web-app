import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ResetForm from "./reset-form";

export const metadata: Metadata = {
    title: "Reset Password",
};
export const dynamic = "force-dynamic";
const page =  () => {

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
                        Reset Password
                    </h1>
                    <p className="text-sm text-gray-400 ">
                        Enter your email to reset your password
                    </p>
                </div>
                <ResetForm />
            </section>
        </div>
    );
};

export default page;
