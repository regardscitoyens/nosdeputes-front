"use client";

import * as React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { DebateFilterBar } from "./DebateFilterBar";
import { DebateSummary } from "./DebateSummary";
import { DebateTranscript } from "./DebateTranscript";
import { Agenda } from "@/repository/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DebatePageProps {
  paragraphs: any[];
  debats: (Agenda & { ptIndex: number })[];
  compteRenduRef?: string;
}

export function DebatePage(props: DebatePageProps) {
  const { paragraphs, debats } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const debatIndex = React.useMemo(() => {
    console.log(debats);
    const index = debats.findIndex(
      (debat) => debat.uid === searchParams.get("compteRenduRef")
    );
    if (index < 0) {
      return 0;
    }
    return index;
  }, [debats, searchParams]);

  const setDebateRef = React.useCallback(
    (ref: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("compteRenduRef", ref);

      router.replace(pathname + "?" + params.toString());
    },
    [pathname, router, searchParams]
  );

  return (
    <>
      <DebateFilterBar
        debatIndex={debatIndex}
        setDebateRef={setDebateRef}
        debats={debats}
      />
      <Container
        sx={{
          pt: 3,
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 5,
        }}
      >
        <Stack flex={2}>
          <DebateSummary />
        </Stack>
        <Stack spacing={3} flex={5} alignItems="flex-start">
          <DebateTranscript
            paragraphs={paragraphs.filter(
              (p) =>
                p.debatRefUid === debats[debatIndex].compteRenduRef &&
                Number.parseInt(p.valeurPtsOdj) === debats[debatIndex].ptIndex
            )}
          />
        </Stack>
      </Container>
    </>
  );
}
