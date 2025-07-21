export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/auth/",
        "/dashboard/",
        "/domains/",
        "/editor/",
        "/analytics/",
        "/contact-requests/",
        "/setup/",
        "/tracking/",
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
