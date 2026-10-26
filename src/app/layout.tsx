import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/archivo/wdth.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import { DemoProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "TrailArc — Your adventure, unlocked",
  description:
    "TrailArc connects 4×4 owners with legal trails, private land access, skills and community. Concept demo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
