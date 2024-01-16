"use client";
import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export type AmendementsFilterState = {
  numero: string;
  search: string;
};

export function useFilterState() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const [numero, setNumero] = React.useState<string>(
    searchParams.get("numero") ?? ""
  );
  const [selectedDocument, setSelectedDocument] = React.useState("");

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

  function handleNumero(numero: string) {
    const params = new URLSearchParams(window.location.search);
    setNumero(numero);
    if (numero === "") {
      params.delete("numero");
    } else {
      params.set("numero", numero);
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return {
    isPending,
    handleSearch,
    handleNumero,
    numero,
    selectedDocument,
    setSelectedDocument,
  };
}
