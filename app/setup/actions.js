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

  if (!data.username) {
    redirect("/setup?error=no-username");
  }

  if (data.username.length < 5) {
    redirect("/setup?error=username-too-short");
  }

  if (data.username.length > 20) {
    redirect("/setup?error=username-too-long");
  }

  if (!/^[a-zA-Z0-9]+$/.test(data.username)) {
    redirect("/setup?error=username-invalid");
  }

  const username = data.username.trim().toLowerCase();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (profile) {
    redirect("/setup?error=user-taken");
  }

  if (!profile) {
    const { error } = await supabase
      .from("profiles")
      .insert({ username: username, user_id: user.id });

    if (error) {
      redirect("/setup?error=insert-error");
    }

    redirect("/dashboard");
  }
}
