"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, Save } from "lucide-react";

export default function SaveButton({ onClick, isSaving }) {
  return (
    <Button
      type="submit"
      disabled={isSaving}
      onClick={onClick}
      className="w-full py-6 cursor-pointer"
    >
      {isSaving ? (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" />
          Save Portfolio
        </>
      )}
    </Button>
  );
}
