import { Plus_Jakarta_Sans } from "next/font/google";

import WidgetRenderer from "@/components/WidgetRenderer";

const geistMono = Plus_Jakarta_Sans({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export default function DefaultPortfolio({ data, userId, portfolioId }) {
  return (
    <div
      className={`${geistMono.className} flex flex-col bg-muted pt-30 p-8 w-full min-h-svh items-center   font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col justify-center gap-4">
        {/* Sections */}
        {data
          .sort((a, b) => a.position - b.position)
          .map((widget) => {
            return (
              <WidgetRenderer
                widget={widget}
                key={widget.id}
                userId={userId}
                portfolioId={portfolioId}
              />
            );
          })}
        {/* {sections.map((section) => {
          return (
            <TextAndIcons
              key={section.id}
              text={section.description}
              iconData={section.iconData}
              indexValue={section.indexValue}
            />
          );
        })} */}
      </main>
    </div>
  );
}
