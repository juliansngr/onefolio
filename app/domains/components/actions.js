"use server";

import { createClient } from "@/lib/supabase/serverClient";

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;

export async function addDomain(domain) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not logged in.");

  if (!isValidDomain(domain)) throw new Error("Invalid domain.");

  const { data: existingDomain, error: existingDomainError } = await supabase
    .from("custom_domains")
    .select("*")
    .eq("domain", domain)
    .eq("user_id", user.id);

  if (existingDomainError) throw new Error(existingDomainError.message);
  if (existingDomain.length > 0) throw new Error("Domain already exists.");

  const { data: insertedDomain, error: insertedDomainError } = await supabase
    .from("custom_domains")
    .insert({ domain, user_id: user.id, status: "pending" })
    .select();

  if (insertedDomainError) {
    throw new Error(insertedDomainError.message);
  }

  const res = await fetch(
    `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: domain }),
    }
  );

  const vercelResult = await res.json();

  if (!res.ok) {
    await supabase
      .from("custom_domains")
      .update({
        status: "error",
        vercel_error: vercelResult.error?.message || "Unknown error",
      })
      .eq("id", insertedDomain.id);

    throw new Error(
      `Vercel error: ${vercelResult.error?.message || "Unknown error"}`
    );
  }

  await supabase
    .from("custom_domains")
    .update({
      status: vercelResult?.verified ? "connected" : "vercel_checking",
      vercel_verification: vercelResult?.verification,
    })
    .eq("id", insertedDomain.id);

  return {
    insertedDomain,
    vercelResult: vercelResult?.verification,
  };
}

function isValidDomain(domain) {
  const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

  const invalidTLDs = ["localhost", "local", "test", "internal"];

  const parts = domain.toLowerCase().split(".");
  const tld = parts[parts.length - 1];

  return domainRegex.test(domain) && !invalidTLDs.includes(tld);
}
