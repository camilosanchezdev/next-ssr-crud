import type { Metadata } from "next";
import "@/styles/theme/theme.css";
import "primeicons/primeicons.css";
import "./globals.css";


export const metadata: Metadata = {
  title: "Crud SSR",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
