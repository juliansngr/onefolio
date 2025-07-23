"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, Save, Check } from "lucide-react";
import { useState, useEffect } from "react";

export default function SaveButton({ onClick, isSaving }) {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isSaving && showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSaving, showSuccess]);

  const handleClick = async () => {
    await onClick();
    setShowSuccess(true);
  };

  if (showSuccess && !isSaving) {
    return (
      <Button
        disabled
        className="bg-emerald-600 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200/50 transition-all duration-200"
      >
        <Check className="mr-2 h-4 w-4" />
        Saved!
      </Button>
    );
  }

  return (
    <Button
      type="submit"
      disabled={isSaving}
      onClick={handleClick}
      className={`bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg shadow-indigo-200/50 transition-all duration-200 ${
        isSaving
          ? "opacity-80 cursor-not-allowed"
          : "hover:scale-[1.02] active:scale-[0.98]"
      }`}
    >
      {isSaving ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" />
          Save Portfolio
        </>
      )}
    </Button>
  );
}
