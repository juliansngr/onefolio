import { Plus_Jakarta_Sans } from "next/font/google";

import CreativePortfolioPage from "./Creative/Creative";

const geistMono = Plus_Jakarta_Sans({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export default function PortfolioPage({ data, userId, portfolio }) {
  const getTheme = () => {
    switch (portfolio.theme) {
      case "light":
        return "light";
      case "dark":
        return "dark";
      case "creative":
        return (
          <CreativePortfolioPage
            data={data}
            userId={userId}
            portfolio={portfolio}
          />
        );
      case "modern":
        return "modern";
      default:
        return "light";
    }
  };
  return (
    <main
      className={`${geistMono.className}font-[family-name:var(--font-geist-sans)]`}
    >
      {getTheme()}
    </main>
  );
}
