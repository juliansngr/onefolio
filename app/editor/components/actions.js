"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/serverClient";

export async function createPortfolio(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const title = formData.get("portfolio-name");

  if (!title) {
    return;
  }

  const portfolioId = crypto.randomUUID();

  const tailwindColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-amber-600",
    "bg-indigo-500",
    "bg-emerald-500",
    "bg-cyan-500",
    "bg-rose-500",
  ];

  const randomColor =
    tailwindColors[Math.floor(Math.random() * tailwindColors.length)];

  const { error } = await supabase.from("portfolios").insert({
    title: title,
    user_id: user.id,
    id: portfolioId,
    color: randomColor,
  });

  if (error) {
    redirect("/editor?error=insert-error");
  }

  redirect(`/editor/${portfolioId}`);
}
