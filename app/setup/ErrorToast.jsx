"use client";

import { toast } from "sonner";
import { useEffect } from "react";

export default function ErrorToast({ error }) {
  useEffect(() => {
    if (error === "user-taken") {
      toast.error("Username already taken");
    }
    if (error === "insert-error") {
      toast.error("Error saving username. Please try again.");
    }
    if (error === "no-username") {
      toast.error("Please enter a validusername.");
    }
    if (error === "username-too-short") {
      toast.error("Username must be at least 5 characters long.");
    }
    if (error === "username-too-long") {
      toast.error("Username must be less than 20 characters long.");
    }
    if (error === "username-invalid") {
      toast.error("Username must only contain letters and numbers.");
    }
  }, [error]);

  return null;
}
