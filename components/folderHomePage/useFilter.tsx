"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { ThemeKeys } from "../const";

export type DossierFilterState = {
  theme: ThemeKeys | "";
  search: string;
};

export function useFilterState() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  function handleThemes(theme: string) {
    const params = new URLSearchParams(window.location.search);
    if (theme === "") {
      params.delete("theme");
    } else {
      params.set("theme", theme);
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return { isPending, handleSearch, handleThemes };
}
