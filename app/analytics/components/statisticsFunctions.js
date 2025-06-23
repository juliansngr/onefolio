export function formatChartData(data) {
  const dateMap = {};
  const dates = data.map((d) => d.dimensions[0]);

  // Map vorhandene Daten
  for (const entry of data) {
    const [date] = entry.dimensions;
    const [views, visitors] = entry.metrics;
    dateMap[date] = { views, visitors };
  }

  // Alle Tage zwischen min und max-Datum aufbauen
  const startDate = new Date(Math.min(...dates.map((d) => new Date(d))));
  const endDate = new Date(Math.max(...dates.map((d) => new Date(d))));

  const result = [];
  const dayMs = 24 * 60 * 60 * 1000;

  for (
    let d = new Date(startDate);
    d <= endDate;
    d = new Date(d.getTime() + dayMs)
  ) {
    const iso = d.toISOString().slice(0, 10);
    const formatted = d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });

    result.push({
      date: formatted,
      views: dateMap[iso]?.views || 0,
      visitors: dateMap[iso]?.visitors || 0,
    });
  }

  return result;
}

export function formatDeviceData(secondaryData) {
  const colorMap = {
    Desktop: "#3B82F6",
    Mobile: "#10B981",
    Tablet: "#F59E0B",
  };

  const deviceCounts = {};

  let total = 0;

  for (const item of secondaryData) {
    let device = item.dimensions[0];
    const visitors = item.metrics[1]; // Unique visitors

    // "Laptop" zählt als "Desktop"
    if (device === "Laptop") {
      device = "Desktop";
    }

    if (!deviceCounts[device]) {
      deviceCounts[device] = 0;
    }

    deviceCounts[device] += visitors;
    total += visitors;
  }

  const result = Object.entries(deviceCounts).map(([device, count]) => ({
    name: device,
    value: Math.round((count / total) * 100),
    color: colorMap[device] || "#999999", // fallback-color
  }));

  return result;
}
