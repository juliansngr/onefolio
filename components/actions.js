"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/serverClient";
import { plans } from "@/data/plans";

export async function subscribeToPro() {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();

  redirect(plans.link + "?prefilled_email=" + user.user.email);
}
