import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Image metadata
export const alt = "About Acme";

export const contentType = "image/png";

// Image generation
export default async function Image() {
  const fontData = await fetch(
    new URL("../../../assets/PlusJakartaSans.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const imageData = await fetch(
    new URL("../../../assets/opengraph_empty.jpg", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
        <div tw="bg-gray-50 flex w-full">
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
            <div tw="flex flex-col">
              <img
                src={imageData}
                alt="Empty"
                width={1200}
                height={630}
                style={{ objectFit: "cover" }}
              />
            </div>
            <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
              <span style={{ fontFamily: "Plus Jakarta Sans" }}>
                Ready to dive in?
              </span>
              <span style={{ fontFamily: "Plus Jakarta Sans" }}>
                Start your free trial today.
              </span>
            </h2>
            <div tw="mt-8 flex md:mt-0">
              <div tw="flex rounded-md shadow">
                <a tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white">
                  Get started
                </a>
              </div>
              <div tw="ml-3 flex rounded-md shadow">
                <a tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600">
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Plus Jakarta Sans",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
      emoji: "fluent",
    }
  );
}
