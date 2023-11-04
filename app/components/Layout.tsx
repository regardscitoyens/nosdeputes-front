import { NavBar, NavigationItem } from "./NavBar";

const navigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
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
