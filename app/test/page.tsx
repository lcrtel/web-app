import { buttonVariants } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ClientLogin from "./ClientLogin";

export default async function Loading({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    async function onSubmit() {
        "use server";
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        var myHeaders = new Headers();

        var raw = JSON.stringify({
            username: "VOS",
            password: "salafi#123#",
        });

        var requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "",
        };

        fetch("https://23.106.253.237/loginpost", requestOptions)
            .then((response) => response.url)
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    }

    return (
        <div className="w-[1200px] h-[630px] relative">
            {/* <ClientLogin/> */}
            <form action={onSubmit}>
                <button>Login</button>
            </form>
        </div>
    );
}
