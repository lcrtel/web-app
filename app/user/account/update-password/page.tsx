import UpdatePasswordForm from "./update-password-form";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
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
                        Update Password
                    </h1>
                    <p className="text-sm text-gray-400 ">
                        Set your new password
                    </p>
                </div>
                <UpdatePasswordForm />
            </section>
        </div>
    );
};

export default page;
