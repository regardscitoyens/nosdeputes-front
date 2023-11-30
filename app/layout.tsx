import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { NavBar, NavigationItem } from "@/components/NavBar";

const inter = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {

const navigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Dossiers", href: "/dossiers" }, // old url is "/dossiers/date"
  // ... more items
];

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ThemeRegistry>
          <main className="flex min-h-screen flex-col">
            <NavBar navigation={navigation} />
            {children}
          </main>
        </ThemeRegistry>
      </body>
    </html>
  );
}
