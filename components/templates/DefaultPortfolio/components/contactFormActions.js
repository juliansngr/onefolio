"use server";

import { createClient } from "@/lib/supabase/serverClient";

export async function sendContactRequest(formData) {
  const supabase = await createClient();

  const sender = formData.get("name");
  const sender_email = formData.get("email");
  const message = formData.get("message");

  const userId = formData.get("userId");
  const portfolioId = formData.get("portfolioId");

  const { error } = await supabase.from("contact_form_requests").insert({
    sender,
    sender_email,
    message,
    user_id: userId,
    portfolio_id: portfolioId,
  });

  if (error) {
    console.error(error);
  }

  return { success: true };
}
