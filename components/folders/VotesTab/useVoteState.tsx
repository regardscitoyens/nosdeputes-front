"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type VotesState = {
  actId: string;
  vodeId: string;
  zoom: "groupes" | "deputes" | "";
};

export function useSearchState<V extends string | number>(
  queryName: string,
  defaultValue?: V
): [V, (val: V) => void, boolean] {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = React.useTransition();

  const [value, setValue] = React.useState<V>(
    searchParams.get(queryName) ?? defaultValue ?? ""
  );

  function handleUpdate(term: V) {
    const params = new URLSearchParams(window.location.search);
    setValue(term);
    if (term) {
      params.set(queryName, term.toString());
    } else {
      params.delete(queryName);
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }
  return [value, handleUpdate, isPending];
}
