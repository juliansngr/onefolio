"use server";

import { createClient } from "@/lib/supabase/serverClient";
import { checkProStatus } from "@/lib/proCheck";

export async function createTrackingLink(formData) {
  // Pro-Status-Überprüfung
  const { user, profile, isPro, error: proError } = await checkProStatus();

  if (proError) {
    console.error("Pro status error:", proError);
    return { error: proError };
  }

  if (!isPro) {
    return { error: "Pro subscription required." };
  }

  const supabase = await createClient();

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
