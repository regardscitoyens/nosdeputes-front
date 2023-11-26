import { NavBar, NavigationItem } from "./NavBar";

const navigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Dossiers", href: "/dossiers" }, // old url is "/dossiers/date"
  // ... more items
];

export { Layout };

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col">
      <NavBar navigation={navigation} />
      {children}
    </main>
  );
}
