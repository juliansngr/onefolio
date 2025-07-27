"use client";

import { useState } from "react";
import { Share, Check, Copy } from "lucide-react";

export default function ShareButton({ title, url }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Prüfe ob Web Share API verfügbar ist
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Schau dir diesen Artikel an: ${title}`,
          url: url,
        });
      } catch (error) {
        // Fallback zu Copy-to-Clipboard wenn Share abgebrochen wird
        if (error.name !== "AbortError") {
          copyToClipboard();
        }
      }
    } else {
      // Fallback zu Copy-to-Clipboard
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Fehler beim Kopieren:", error);
    }
  };

  return (
    <div
      onClick={handleShare}
      className="flex items-center gap-2 text-sm text-slate-500 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-full border border-slate-200/60 hover:shadow-md transition-all duration-300 cursor-pointer group"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-600 transition-transform duration-300" />
          <span className="text-green-600">Copied!</span>
        </>
      ) : (
        <>
          <Share className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          Share
        </>
      )}
    </div>
  );
}
