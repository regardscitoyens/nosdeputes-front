"use client";
import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export type AmendementsFilterState = {
  numero: string;
  search: string;
};

export function useFilterSearch(
  queryName: string,
  defaultValue?: string
): [string, (val: string) => void, boolean] {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const [value, setValue] = React.useState<string>(
    searchParams.get(queryName) ?? defaultValue ?? ""
  );

  function handleUpdate(term: string) {
    const params = new URLSearchParams(window.location.search);
    setValue(term);
    if (term) {
      params.set(queryName, term);
    } else {
      params.delete(queryName);
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }
  return [value, handleUpdate, isPending];
}
