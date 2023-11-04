"use client";

// app/components/NavBar.client.tsx
import { usePathname } from "next/navigation"; // This is hypothetical, replace with the appropriate import
import Link from "next/link";

export interface NavigationItem {
  name: string;
  href: string;
}

interface NavBarProps {
  navigation: NavigationItem[];
}

export function NavBar({ navigation }: NavBarProps): JSX.Element {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow h-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium uppercase ${
                    pathname === item.href
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
