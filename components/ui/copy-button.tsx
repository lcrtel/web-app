'use client'
import { Check, Copy } from "lucide-react";
import { useState } from "react";

const CopyButton = ({ textToCopy }: { textToCopy: any }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };
    return copied ? (
        <Check className="w-4  h-4" />
    ) : (
        <Copy
            className="w-4 h-4 cursor-pointer"
            onClick={(e) => copyToClipboard(textToCopy)}
        />
    );
};
export default CopyButton;