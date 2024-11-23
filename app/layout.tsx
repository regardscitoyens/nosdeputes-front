import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { NavBar, NavigationItem } from "@/components/NavBar";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const raleway = Raleway({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

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
  { name: "Député·e·s", href: "/deputes" },
  // ... more items
];

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={raleway.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <main className="flex min-h-screen flex-col">
              <NavBar navigation={navigation} />
              {children}
            </main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
