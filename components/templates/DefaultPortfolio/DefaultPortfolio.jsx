import { Plus_Jakarta_Sans } from "next/font/google";

import WidgetRenderer from "@/components/WidgetRenderer";

const geistMono = Plus_Jakarta_Sans({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export default function DefaultPortfolio({ data }) {
  return (
    <div
      className={`${geistMono.className} flex flex-col bg-white pt-10 p-8 w-full items-center mt-0 sm:mt-20  font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col justify-center">
        {/* Sections */}
        {data
          .sort((a, b) => a.position - b.position)
          .map((widget) => {
            return <WidgetRenderer widget={widget} key={widget.id} />;
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
