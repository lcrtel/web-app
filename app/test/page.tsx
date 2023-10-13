import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Loading() {
    return (
        <div className="w-[1200px] h-[630px] relative">
            <Image
                src="/blue_wave_bg.jpg"
                width={2000}
                height={2000}
                alt="Background Image"
            />
            <div className=" h-full w-full flex flex-col items-center justify-center absolute gap-4 inset-0">
                <Image
                    src="/lcrtelcom_logo.svg"
                    width={200}
                    height={50}
                    className=" mb-5"
                    alt="LCRTel Logo"
                />
                <div className="flex flex-col items-start sm:items-center bg-white bg-opacity-25 backdrop-blur p-5 md:p-10 rounded-2xl sm:rounded-3xl border-2 border-white">
                    <h1 className="text-4xl sm:text-center font-bold tracking-tight text-primary-500 sm:text-5xl">
                        Streamline Your<br />VoIP Trading Experience
                    </h1>
                    <p className="mt-6 text-lg sm:text-center leading-8 max-w-2xl text-primary-500">
                        Unlock new possibilities and maximize your VoIP trading
                        potential with LCR Telcom&apos;s cutting-edge platform.
                    </p>
                </div>
            </div>
        </div>
    );
}
