"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/serverClient";
import { plans } from "@/data/plans";

export async function subscribeToPro() {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();

  redirect(plans.link + "?prefilled_email=" + user.user.email);
}

export async function addToWaitinglist(email) {
  const supabase = await createClient();

  if (!isValidEmail(email)) {
    return { error: { status: 400, message: "Invalid email address." } };
  }

  const { error: waitinglistError } = await supabase
    .from("waitinglist")
    .insert({
      mail: email,
    });

  if (waitinglistError) {
    return { error: { status: 500, message: waitinglistError.message } };
  }

  return { status: 200, message: "Email added to waitinglist." };
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
