import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { AlertProvider } from "@/components/global/AlertProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MitNetwork. // Interface d'administration réseau",
  description: "Interface d'administration réseau",
  keywords: [
    "mitnetwork",
    "interface d'administration réseau",
    "administration réseau",
  ],
  openGraph: {
    title: "MitNetwork. // Interface d'administration réseau",
    description: "Interface d'administration réseau",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-50`}>
        <AlertProvider>
          <AuthProvider>{children}</AuthProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
