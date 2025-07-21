import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "About Acme";
export const contentType = "image/png";

export default async function Image({ params }) {
  const { slug } = await params;

  const resp = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/blog?slug=eq.${encodeURIComponent(
      slug
    )}`,
    {
      headers: {
        apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        Accept: "application/json",
      },
    }
  );

  if (!resp.ok) {
    console.error("Supabase fetch failed:", resp.statusText);
    return new Response("Error fetching post", { status: 500 });
  }
  const [post] = await resp.json();

  const BASE = "https://onefol.io";
  const [fontData, fontBold, bgData, logoData] = await Promise.all([
    fetch(`${BASE}/assets/PlusJakartaSans.ttf`).then((r) => r.arrayBuffer()),
    fetch(`${BASE}/assets/PlusJakartaSansBold.ttf`).then((r) =>
      r.arrayBuffer()
    ),
    fetch(`${BASE}/assets/opengraph_empty.jpg`).then((r) => r.arrayBuffer()),
    fetch(`${BASE}/assets/onefolio_icon.png`).then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div tw="flex w-full h-full items-center justify-center bg-white relative">
        <img src={bgData} alt="Empty" width={1200} height={630} />
        <div tw="flex flex-col absolute max-w-4xl">
          <div tw="flex items-center">
            <img src={logoData} alt="Logo" width={80} height={80} />
            <h2
              tw="text-white text-7xl ml-4"
              style={{ fontFamily: "Plus Jakarta Sans Bold" }}
            >
              onefolio.
            </h2>
          </div>
          <h2
            tw="flex items-center text-6xl tracking-tight text-left text-white mt-24 leading-none"
            style={{ fontFamily: "Plus Jakarta Sans Bold" }}
          >
            {post.title}
          </h2>
          <p
            style={{ fontFamily: "Plus Jakarta Sans Medium" }}
            tw="text-white text-4xl mt-24 flex items-center leading-none"
          >
            {post.excerpt}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Plus Jakarta Sans Medium",
          data: fontData,
          style: "normal",
          weight: 400,
        },
        {
          name: "Plus Jakarta Sans Bold",
          data: fontBold,
          style: "normal",
          weight: 700,
        },
      ],
      emoji: "fluent",
    }
  );
}
