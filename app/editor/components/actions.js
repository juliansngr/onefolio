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

  const theme = formData.get("theme");

  if (!theme) {
    return;
  }

  // check if user already has a main portfolio

  const { data: mainPortfolio } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_main", true);

  const hasMain = mainPortfolio && mainPortfolio.length > 0;

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
    is_main: !hasMain,
    theme: theme,
  });

  if (error) {
    redirect("/editor?error=insert-error");
  }

  redirect(`/editor/${portfolioId}`);
}

export async function updateMainPortfolio(portfolioId) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: mainPortfolio } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_main", true)
    .single();

  if (mainPortfolio.id === portfolioId) {
    return {
      error:
        "You can't deactivate your main portfolio. Please switch to another portfolio and make it your main portfolio.",
    };
  }

  const { error: mainPortfolioError } = await supabase
    .from("portfolios")
    .update({ is_main: false })
    .eq("user_id", user.id)
    .eq("is_main", true);

  if (mainPortfolioError) {
    return { error: mainPortfolioError };
  }

  const { error: updateError } = await supabase
    .from("portfolios")
    .update({ is_main: true })
    .eq("id", portfolioId)
    .eq("user_id", user.id);

  if (updateError) {
    return { error: updateError };
  }

  return { error: null };
}
