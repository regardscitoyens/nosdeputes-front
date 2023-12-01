"use client";

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
            <div className="flex space-x-4 items-center justify-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-center h-5 text-sm font-medium uppercase transition px-4 py-4 duration-300 ease-in-out transform rounded-2xl ${
                    pathname === item.href
                      ? "bg-black text-white"
                      : "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
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
