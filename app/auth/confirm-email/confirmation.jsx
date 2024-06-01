"use client";
import { useSearchParams } from "next/navigation";

export default function Confirm() {
    const searchParams = useSearchParams();
    const confirmation_url = searchParams.get("confirmation_url");

    http: return (
        <div>
            <p className="text-gray-400 mb-5">
                Click the button below to verify
            </p>
            <a
                href={confirmation_url}
                className="bg-primary-900 text-white py-2 px-3 rounded-lg"
            >
                Verify Email
            </a>
        </div>
    );
}
