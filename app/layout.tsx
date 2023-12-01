import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { NavBar, NavigationItem } from "@/components/NavBar";

const inter = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nosdeputes.fr"),
  robots: "index, follow",
  title: "NosDéputés.fr : Observatoire citoyen de l'activité parlementaire",
  description: "Observatoire citoyen de l'activité parlementaire",

  twitter: {
    card: "summary",
    site: "@RegardsCitoyens",
    title: "NosDéputés.fr par @RegardsCitoyens",
    description:
      "Observatoire citoyen de l'activité parlementaire à l'Assemblée nationale",
    images: {
      url: "https://www.nosdeputes.fr/images/xneth/bouton_logo.png",
      type: "image/png",
    },
  },
  openGraph: {
    type: "website",
    title: "NosDéputés.fr par Regards Citoyens",
    siteName: "NosDéputés.fr",
    description:
      "Observatoire citoyen de l'activité parlementaire à l'Assemblée nationale",
    url: "https://www.NosDéputés.fr",
    locale: "fr_FR",
    images: "https://www.nosdeputes.fr/images/xneth/bouton_logo.png",
  },
};

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
