"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SaveButton({ onClick }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} onClick={onClick}>
      {pending ? (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "Save"
      )}
    </Button>
  );
}
