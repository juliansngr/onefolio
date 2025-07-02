import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function CopyEmailButton({ email }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Kopieren fehlgeschlagen", err);
    }
  };

  return (
    <Button
      className={`cursor-pointer w-36 ${
        copied ? "bg-green-500 hover:bg-green-500 " : ""
      }`}
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-white" />
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 mr-2" />
          Copy Email
        </>
      )}
    </Button>
  );
}
