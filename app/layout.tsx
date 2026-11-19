import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/marcellus/400.css";
import "@fontsource/amiri/arabic-400.css";
import "@fontsource/amiri/arabic-700.css";
import "@fontsource/aref-ruqaa/arabic-400.css";
import "@fontsource/aref-ruqaa/arabic-700.css";
import "@fontsource/noto-nastaliq-urdu/arabic-700.css";
import "./globals.css";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: `${config.bride} weds ${config.groom} · ${config.ceremony}`,
  description: `You are invited to the ${config.ceremony} of ${config.brideFull} & ${config.groomFull}.`,
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#141a2e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
