import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import AppIcon from "@/components/ui/AppIcon";
import TextAndIcons from "@/components/templates/DefaultPortfolio/components/TextAndIcons";

const geistMono = Plus_Jakarta_Sans({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export default function DefaultPortfolio({ data }) {
  const sections = data.sections;

  return (
    <div
      className={`${geistMono.className} flex flex-col bg-white pt-10 p-8 w-full items-center mt-0 sm:mt-20  font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col justify-center">
        {/* Me Section */}
        <span className="flex items-center gap-2">
          <h2 className="text-2xl sm:text-4xl font-light">
            Hi, my name is <span className="font-bold">{data.name}</span>
          </h2>
          <Image
            src={data.avatar}
            alt="me"
            width={60}
            height={60}
            className="rounded-full"
          />
        </span>
        {/* Description */}
        <span className="text-md sm:text-lg font-light">
          <p className="mb-8">{data.description}</p>
        </span>
        {/* Sections */}
        {sections.map((section) => {
          return (
            <TextAndIcons
              key={section.id}
              text={section.description}
              iconData={section.iconData}
              indexValue={section.indexValue}
            />
          );
        })}
      </main>
    </div>
  );
}
