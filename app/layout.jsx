import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import ToasterProvider from "@/lib/ToasterProvider";
import PlausibleProvider from "next-plausible";
import Waitinglist from "@/components/Waitinglist";

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
    <PlausibleProvider domain="onefol.io">
      <html lang="en" className={plusJakartaSans.className}>
        <ToasterProvider />
        <body>
          {/* {children} */}
          <Waitinglist />
        </body>
      </html>
    </PlausibleProvider>
  );
}
