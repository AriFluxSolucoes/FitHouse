import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo_Black } from "next/font/google";
import { StoreProvider } from "@/lib/store";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Fit House — Moda fitness",
  description: "Roupas de treino, acessórios e calçados esportivos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper">
        <AuthProvider>
          <StoreProvider>{children}</StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}