"use client";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

const CopyButton = ({ textToCopy }: { textToCopy: any }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  return copied ? (
    <Check className="h-4 w-4" />
  ) : (
    <Copy
      className="h-4 w-4 cursor-pointer"
      onClick={(e) => copyToClipboard(textToCopy)}
    />
  );
};
export default CopyButton;
