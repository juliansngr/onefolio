"use server";

import { createClient } from "@/lib/supabase/serverClient";
import { Vercel } from "@vercel/sdk";
import { supabaseAdmin } from "@/lib/supabase/supabaseAdmin";
import { checkProStatus } from "@/lib/proCheck";

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

export async function addDomain(domain) {
  // Pro-Status-Überprüfung
  const { user, isPro, error: proError } = await checkProStatus();

  if (proError) {
    return { error: { status: 401, message: proError } };
  }

  if (!isPro) {
    return { error: { status: 403, message: "Pro subscription required." } };
  }

  const supabase = await createClient();
  const vercel = new Vercel({ bearerToken: VERCEL_TOKEN });

  if (!isValidDomain(domain))
    return { error: { status: 400, message: "Invalid domain format." } };

  const { data: userDomains, error: userDomainsError } = await supabase
    .from("custom_domains")
    .select("*")
    .eq("user_id", user.id);

  if (userDomainsError)
    return { error: { status: 500, message: userDomainsError.message } };
  if (userDomains.length > 0)
    return {
      error: {
        status: 400,
        message:
          "You already have a domain and shouldn't see this. Please contact support.",
      },
    };

  const { data: existingDomain, error: existingDomainError } =
    await supabaseAdmin.from("custom_domains").select("*").eq("domain", domain);

  if (existingDomainError)
    return {
      error: {
        status: 500,
        message: "Domain already exists. #5091",
      },
    };
  if (existingDomain.length > 0)
    return {
      error: {
        status: 400,
        message: "Domain already exists. #5092",
      },
    };

  let addDomainToProject;

  try {
    addDomainToProject = await vercel.projects.addProjectDomain({
      idOrName: VERCEL_PROJECT_ID,
      requestBody: {
        name: domain,
        gitBranch: null,
      },
    });
  } catch (e) {
    const isAlreadyInUse =
      e?.statusCode === 409 &&
      typeof e?.body === "string" &&
      e.body.includes("domain_already_in_use");

    if (isAlreadyInUse) {
      return {
        error: {
          status: 400,
          message: "This domain is already in use. #5095",
        },
      };
    }

    return {
      error: {
        status: e?.statusCode || 500,
        message:
          "Failed to add domain to project. Please contact support. #5094",
      },
    };
  }

  const { data: insertedDomain, error: insertedDomainError } = await supabase
    .from("custom_domains")
    .insert({ domain, user_id: user.id, status: "pending" })
    .select()
    .single();

  if (insertedDomainError)
    return {
      error: {
        status: 500,
        message: `Error: ${insertedDomainError.message} #5093`,
      },
    };

  const { domain: dnsData } = await vercel.domains.getDomain({
    domain: domain,
    teamId: VERCEL_TEAM_ID,
  });

  if (!dnsData) {
    await supabase
      .from("custom_domains")
      .update({
        status: "failed",
      })
      .eq("id", insertedDomain.id);
  }

  const isUsingVercelNameservers = arraysMatch(
    dnsData.nameservers,
    dnsData.intendedNameservers
  );

  if (!isUsingVercelNameservers) {
    await supabase
      .from("custom_domains")
      .update({
        status: "connecting",
        vercel_verification: addDomainToProject?.verification,
      })
      .eq("id", insertedDomain.id);
  } else if (isUsingVercelNameservers) {
    await supabase
      .from("custom_domains")
      .update({
        status: "connected",
      })
      .eq("id", insertedDomain.id);
  }

  return {
    insertedDomain,
    addDomainToProject,
    "using vercel nameservers": isUsingVercelNameservers,
    dnsData,
  };
}

function isValidDomain(domain) {
  const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

  const invalidTLDs = ["localhost", "local", "test", "internal"];

  const parts = domain.toLowerCase().split(".");
  const tld = parts[parts.length - 1];

  return domainRegex.test(domain) && !invalidTLDs.includes(tld);
}

function arraysMatch(a = [], b = []) {
  const normA = a.map((ns) => ns.toLowerCase()).sort();
  const normB = b.map((ns) => ns.toLowerCase()).sort();
  return (
    normA.length === normB.length && normA.every((val, i) => val === normB[i])
  );
}

export async function verifyDomain() {
  // Pro-Status-Überprüfung
  const { user, isPro, error: proError } = await checkProStatus();

  if (proError) {
    return { error: { status: 401, message: proError } };
  }

  if (!isPro) {
    return { error: { status: 403, message: "Pro subscription required." } };
  }

  const supabase = await createClient();
  const vercel = new Vercel({ bearerToken: VERCEL_TOKEN });

  const { data: domainData, error: domainError } = await supabase
    .from("custom_domains")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (domainError)
    return { error: { status: 500, message: domainError.message } };

  const { domain: dnsData } = await vercel.domains.getDomain({
    domain: domainData.domain,
    teamId: VERCEL_TEAM_ID,
  });

  const isUsingVercelNameservers = arraysMatch(
    dnsData.nameservers,
    dnsData.intendedNameservers
  );

  if (!isUsingVercelNameservers) {
    await supabase
      .from("custom_domains")
      .update({
        status: "connecting",
      })
      .eq("id", domainData.id);
  } else if (isUsingVercelNameservers) {
    await supabase
      .from("custom_domains")
      .update({
        status: "connected",
      })
      .eq("id", domainData.id);
  }

  return {
    isUsingVercelNameservers,
    dnsData,
  };
}

export async function deleteDomain() {
  // Pro-Status-Überprüfung
  const { user, isPro, error: proError } = await checkProStatus();

  if (proError) {
    return { error: { status: 401, message: proError } };
  }

  if (!isPro) {
    return { error: { status: 403, message: "Pro subscription required." } };
  }

  const supabase = await createClient();
  const vercel = new Vercel({ bearerToken: VERCEL_TOKEN });

  const { data: domainData, error: domainError } = await supabase
    .from("custom_domains")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (domainError)
    return { error: { status: 500, message: domainError.message } };

  try {
    await vercel.projects.removeProjectDomain({
      idOrName: VERCEL_PROJECT_ID,
      domain: domainData.domain,
      teamId: VERCEL_TEAM_ID,
    });
  } catch (e) {
    console.error(e);
    return {
      error: {
        status: 500,
        message:
          "Failed to remove domain from project. Please contact support. #5096",
      },
    };
  }

  const { error: deletedDomainError } = await supabase
    .from("custom_domains")
    .delete()
    .eq("id", domainData.id);

  if (deletedDomainError) {
    return {
      error: {
        status: 500,
        message:
          "Failed to delete domain from database. Please contact support. #5097",
      },
    };
  }

  return { status: 200, message: "Domain deleted successfully." };
}
