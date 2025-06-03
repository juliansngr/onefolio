"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/serverClient";

export async function setUsername(formData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    username: formData.get("username"),
  };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", data.username)
    .single();

  if (profile) {
    redirect("/setup?error=user-taken");
  }

  if (!profile) {
    const { error } = await supabase
      .from("profiles")
      .insert({ username: data.username, user_id: user.id });

    if (error) {
      redirect("/setup?error=insert-error");
    }

    redirect("/dashboard");
  }
}
