"use server";

import { createClient } from "@/lib/supabase/serverClient";

export async function createTrackingLink(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (profileError) {
    console.error(profileError);
    return;
  }

  const recipient = formData.get("tracking-link-recipient");

  if (!recipient) {
    return;
  }

  function generateId(length = 8) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array)
      .map((n) => chars[n % chars.length])
      .join("");
  }

  const trackingLinkId = generateId();

  const { error } = await supabase.from("tracking_links").insert({
    link_id: trackingLinkId,
    recipient,
    user_id: user.id,
  });

  if (error) {
    console.error(error);
    return;
  }

  const trackingLink = `https://onefol.io/u/${profile.username}/?tr=${trackingLinkId}`;

  return trackingLink;
}
