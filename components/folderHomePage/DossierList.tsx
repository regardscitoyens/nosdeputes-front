"use client";

import * as React from "react";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import LabelChip from "../LabelChip";
import { prisma } from "@/prisma";
import { Dossier } from "@prisma/client";
import { LoadingButton } from "@mui/lab";

async function getDossiersUnCached(legislature: string) {
  return prisma.dossier.findMany({
    where: { legislature },
    orderBy: { numero: "asc" },
    take: 10,
  });
}
const getDossiers = React.cache(getDossiersUnCached);

// The API return string for Dates
function formatDossier(dossier: Dossier): Dossier {
  return {
    ...dossier,
    dateDernierActe: dossier.dateDernierActe
      ? new Date(dossier.dateDernierActe)
      : null,
    dateDepot: dossier.dateDepot ? new Date(dossier.dateDepot) : null,
  };
}
type DossierListProps = {
  theme: string;
  search: string;
};

const PAGE_SIZE = 10;

export default function DossierList(props: DossierListProps) {
  const { theme, search } = props;

  const [dossiers, setDossiers] = React.useState<Dossier[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(0);

  const fetchMoreDossiers = async () => {
    setIsLoading(true);
    let res = await fetch(
      "/dossiers/api?" +
        new URLSearchParams({
          legislature: "16",
          page: currentPage.toString(),
          theme: theme,
          pageSize: PAGE_SIZE.toString(),
        }).toString()
    );
    const { data } = await res.json();

    setIsLoading(false);
    setDossiers((prev) => [...prev, ...data.map(formatDossier)]);
    setCurrentPage((prev) => prev + 1);
  };

  React.useEffect(() => {
    let isValid = true;

    setIsLoading(true);
    setCurrentPage(0);
    setDossiers([]);

    async function fetchInitialDossier() {
      let res = await fetch(
        "/dossiers/api?" +
          new URLSearchParams({
            legislature: "16",
            page: "0",
            theme: theme,
            pageSize: PAGE_SIZE.toString(),
          }).toString()
      );
      const { data } = await res.json();
      if (isValid) {
        setIsLoading(false);
        setDossiers(data.map(formatDossier));
        setCurrentPage((prev) => prev + 1);
      }
    }
    fetchInitialDossier();

    return () => {
      isValid = false;
    };
  }, [theme]);

  return (
    <div>
      <Stack component="ol">
        {dossiers
          .filter((dossier) => theme === "" || dossier.theme === theme)
          .map((dossier) => (
            <Stack key={dossier.uid} component="li" sx={{ m: 2 }} gap={1}>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ minWidth: 0 }}
              >
                <Typography
                  variant="body1"
                  component={Link}
                  href={`${dossier.legislature}/dossier/${dossier.uid}`}
                  fontWeight="light"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {dossier.titre}
                </Typography>

                {dossier.theme && (
                  <LabelChip
                    label={dossier.theme}
                    size="small"
                    sx={{ ml: 1.5 }}
                  />
                )}
                {dossier.dateDernierActe?.toLocaleDateString()}
              </Stack>
            </Stack>
          ))}
      </Stack>

      <LoadingButton
        loading={isLoading}
        onClick={() => fetchMoreDossiers()}
        disabled={
          isLoading || dossiers.length !== currentPage * PAGE_SIZE // The last fetch did not returned a full page
        }
      >
        Dossiers suivant
      </LoadingButton>
    </div>
  );
}
