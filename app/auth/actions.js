"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/serverClient";

export async function login(formData) {
  const supabase = await createClient();

  const emailRaw = formData.get("email");
  const passwordRaw = formData.get("password");

  if (typeof emailRaw !== "string" || typeof passwordRaw !== "string") {
    return {
      error: "Invalid inputs: Email and password must be strings.",
    };
  }

  const data = {
    email: emailRaw,
    password: passwordRaw,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function loginWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `https://onefol.io/auth/callback?next=${encodeURIComponent(
        "/setup"
      )}`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect(data.url);
}

export async function loginWithFacebook() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: `https://onefol.io/auth/callback?next=${encodeURIComponent(
        "/setup"
      )}`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect(data.url);
}

export async function signup(formData) {
  const supabase = await createClient();

  const emailRaw = formData.get("email");
  const passwordRaw = formData.get("password");

  if (typeof emailRaw !== "string" || typeof passwordRaw !== "string") {
    return {
      error: "Invalid inputs: Email and password must be strings.",
    };
  }

  const data = {
    email: emailRaw,
    password: passwordRaw,
  };

  const { data: exists, error: mailExistsError } = await supabase.rpc(
    "email_exists",
    { p_email: data.email }
  );
  if (mailExistsError) throw mailExistsError;

  if (exists) {
    return { error: "Email already in use. Please use a different email." };
  }

  const response = await supabase.auth.signUp(data);
  if (response.error) {
    return { error: response.error.message };
  }

  revalidatePath("/", "layout");
  redirect("/auth/sign-up/success");
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/auth/login");
}
