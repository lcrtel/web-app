import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMail } from "react-icons/hi";
import Confirm from "./confirmation";

export const dynamic = "force-dynamic";

const page = async () => {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();
    console.log(session);

    return (
        <div className="w-full md:w-2/3 p-8  flex items-center justify-center">
            <section>
                <div className="flex w-full flex-col mb-5 text-center items-center">
                    <Link href="/" passHref className="mb-4 md:hidden">
                        <Image
                            src="/lcr-icon.svg"
                            alt="LCRTelcom"
                            width={80}
                            height={30}
                        />
                    </Link>
                    <div className="border-2 rounded-lg border-gray-300 p-2 mb-5">
                        <HiOutlineMail className="w-6 h-6 " />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Verify your email
                    </h1>
                    <Confirm />
                </div>
            </section>
        </div>
    );
};

export default page;
