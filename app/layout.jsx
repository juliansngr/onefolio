import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta", // Optional: falls du es per Tailwind variable nutzen willst
  display: "swap",
});

export const metadata = {
  title: "onefol.io | Create beautiful portfolios in minutes",
  description: "Your portfolios. One place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakartaSans.className}>
      <body>{children}</body>
    </html>
  );
}
