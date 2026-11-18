import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/pinyon-script/400.css";
import "@fontsource/cinzel/400.css";
import "@fontsource/amiri/arabic-400.css";
import "@fontsource/amiri/arabic-700.css";
import "./globals.css";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: `${config.brideShort} & ${config.groomShort} · ${config.ceremony}`,
  description: `You are invited to the ${config.ceremony} of ${config.bride} & ${config.groom}.`,
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f5f2" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
