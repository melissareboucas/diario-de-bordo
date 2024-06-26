import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import './globalicons.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diario de Bordo",
  description: "Website para guardar suas memórias de viagem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}&libraries=places`}
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
