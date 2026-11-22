import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const title = "Media Fuel Solutions | Lead generation for local and service businesses";
const description =
  "Media Fuel Solutions helps local and service-based businesses get more qualified enquiries and turn them into booked appointments, with Google and Meta ads, landing pages, lead tracking and automated follow-ups.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mediafuelsolutions.com"),
  alternates: { canonical: "/" },
  title,
  description,
  openGraph: {
    title,
    description: "More qualified enquiries, faster follow-ups, more booked appointments.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Media Fuel Solutions" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#071A33",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
