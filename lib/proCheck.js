"use server";

import { createClient } from "@/lib/supabase/serverClient";

/**
 * Überprüft, ob der aktuelle Benutzer ein Pro-Abonnement hat
 * @returns {Promise<{user: Object|null, profile: Object|null, isPro: boolean, error: string|null}>}
 */
export async function checkProStatus() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        user: null,
        profile: null,
        isPro: false,
        error: "User not authenticated",
      };
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (profileError || !profile) {
      return {
        user,
        profile: null,
        isPro: false,
        error: "Profile not found",
      };
    }

    return {
      user,
      profile,
      isPro: !!profile.is_pro,
      error: null,
    };
  } catch (error) {
    console.error("Pro status check failed:", error);
    return {
      user: null,
      profile: null,
      isPro: false,
      error: "Error checking Pro status",
    };
  }
}

/**
 * Middleware-Funktion, die eine Pro-Berechtigung erfordert
 * @returns {Promise<{user: Object, profile: Object} | Response>}
 */
export async function requireProAccess() {
  const { user, profile, isPro, error } = await checkProStatus();

  if (error) {
    return new Response(
      JSON.stringify({
        error: error,
        code: "AUTHENTICATION_ERROR",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (!isPro) {
    return new Response(
      JSON.stringify({
        error: "Pro subscription required",
        code: "PRO_REQUIRED",
      }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return { user, profile };
}
