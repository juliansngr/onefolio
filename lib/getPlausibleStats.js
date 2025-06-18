export async function getPlausibleStats({ userSlug, metrics, dateRange }) {
  const pages = [`/u/${userSlug}`];

  const res = await fetch("https://plausible.io/api/v2/query", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PLAUSIBLE_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      site_id: "onefol.io",
      metrics: metrics,
      date_range: dateRange,
      filters: [["contains", "event:page", pages]],
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Plausible v2 API error: ${res.status} – ${body}`);
  }

  return res.json();
}
