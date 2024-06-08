"use client";

import * as React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { DebateFilterBar } from "./DebateFilterBar";
import { DebateSummary } from "./DebateSummary";
import { DebateTranscript } from "./DebateTranscript";
import { Agenda } from "@/repository/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SUMMARY_CODES } from "./DebateTimeline";

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

  const [isPending, startTransition] = React.useTransition();

  const debatIndex = React.useMemo(() => {
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

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router, searchParams]
  );

  const filteredParagraphes = paragraphs
    .filter(
      (p) =>
        p.debatRefUid === debats[debatIndex].compteRenduRef &&
        Number.parseInt(p.valeurPtsOdj) === debats[debatIndex].ptIndex
    )
    .sort((a, b) => a.ordreAbsoluSeance - b.ordreAbsoluSeance);

  let lastHash = "init";

  const wordsCounts: Record<string, number> = filteredParagraphes.reduce(
    (acc, paragraphe) => {
      if (SUMMARY_CODES.includes(paragraphe.codeGrammaire)) {
        lastHash = paragraphe.hash;
        return { ...acc, [lastHash]: 0 };
      }

      if (
        ["PAROLE_GENERIQUE", "INTERRUPTION_1_10"].includes(
          paragraphe.codeGrammaire
        )
      ) {
        return {
          ...acc,
          [lastHash]: acc[lastHash] + paragraphe.texte.split(" ").length,
        };
      }
      return acc;
    },
    {
      init: 0,
    }
  );

  if (debats.length === 0) {
    return <p>Ce dossier n&aposa pas encore fait l&aposobjet de debats</p>;
  }
  return (
    <>
      <DebateFilterBar
        debatIndex={debatIndex}
        setDebateRef={setDebateRef}
        debats={debats}
      />
      <Container>
        {isPending ? (
          <LinearProgress />
        ) : (
          <Box sx={{ height: 4, width: "100%" }} />
        )}
      </Container>
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
          <DebateSummary
            wordsCounts={wordsCounts}
            sections={filteredParagraphes.filter((p) =>
              SUMMARY_CODES.includes(p.codeGrammaire)
            )}
          />
        </Stack>
        <Stack spacing={3} flex={5} alignItems="flex-start">
          <DebateTranscript
            title={`${
              debats[debatIndex].libelleCourtLieu ??
              debats[debatIndex].libelleLongLieu ??
              ""
            }, le ${debats[debatIndex].timestampDebut.toLocaleString("fr-FR", {
              month: "long",
              day: "numeric",
              weekday: "long",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}`}
            paragraphs={filteredParagraphes}
            wordsCounts={wordsCounts}
          />
        </Stack>
      </Container>
    </>
  );
}
