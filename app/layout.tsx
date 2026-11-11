import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "New project",
  description: "A Next.js app on LazyFrog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* lf-base: the look's base styles (design/tokens.css); lf-ui: text in cards, lists and forms
          takes its box's width, only prose (<article>, .prose) keeps the reading measure. */}
      <body className="lf-base lf-ui min-h-screen bg-background text-text antialiased">
        {children}
      </body>
    </html>
  );
}
