export async function getPlausibleStats({
  userSlug,
  metrics,
  dateRange,
  dimensions = ["time:day"],
}) {
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
      dimensions: dimensions,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Plausible v2 API error: ${res.status} – ${body}`);
  }

  const { results: data } = await res.json();

  // For breakdown data, we need a second query with different dimensions
  if (dimensions.includes("time:day")) {
    const response = await fetch("https://plausible.io/api/v2/query", {
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
        dimensions: [
          "visit:device",
          "visit:browser",
          "visit:country",
          "visit:source",
          "event:page",
        ],
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Plausible v2 API error: ${response.status} – ${body}`);
    }

    const { results: secondaryData } = await response.json();
    return { data: data, secondaryData: secondaryData };
  }

  return { data: data, secondaryData: [] };
}
