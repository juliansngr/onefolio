import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/serverClient";

export const runtime = "edge";
export const alt = "About Acme";
export const contentType = "image/png";

export default async function Image({ params }) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: post, error } = await supabase
    .from("blog")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching blog post:", error);
    return new Response("Error fetching blog post", { status: 500 });
  }

  const fontData = await fetch(
    new URL(`../../../assets/PlusJakartaSans.ttf`, import.meta.url)
  ).then((res) => res.arrayBuffer());

  const fontBold = await fetch(
    new URL(`../../../assets/PlusJakartaSansBold.ttf`, import.meta.url)
  ).then((res) => res.arrayBuffer());

  const backgroundData = await fetch(
    new URL(`../../../assets/opengraph_empty.jpg`, import.meta.url)
  ).then((res) => res.arrayBuffer());

  const logoData = await fetch(
    new URL(`../../../assets/onefolio_icon.png`, import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div tw="flex w-full h-full items-center justify-center bg-white relative">
        <img src={backgroundData} alt="Empty" width={1200} height={630} />
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
