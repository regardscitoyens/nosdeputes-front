"use client";

import * as React from "react";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import LabelChip from "../LabelChip";
import { Dossier } from "@prisma/client";
import { LoadingButton } from "@mui/lab";
import { searchDossier } from "@/data/searchDossier";

type DossierListProps = {
  theme: string;
  search: string;
};

const PAGE_SIZE = 10;

export default function DossierList(props: DossierListProps) {
  const { theme, search } = props;

  const [dossiers, setDossiers] = React.useState<Dossier[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const fetchMoreDossiers = async () => {
    setIsLoading(true);
    const data = await searchDossier({
      page: currentPage,
      search: search ?? "",
    });

    setIsLoading(false);
    setDossiers((prev) => [...prev, ...(data ?? [])]);
    setCurrentPage((prev) => prev + 1);
  };

  React.useEffect(() => {
    let isValid = true;

    setIsLoading(true);
    setCurrentPage(1);
    setDossiers([]);

    async function fetchInitialDossier() {
      const data = await searchDossier({
        page: 1,
        search: search ?? "",
      });

      if (isValid) {
        setIsLoading(false);
        setDossiers(data ?? []);
        setCurrentPage(2);
      }
    }
    fetchInitialDossier();

    return () => {
      isValid = false;
    };
  }, [search, theme]);

  return (
    <div>
      <Stack component="ol">
        {dossiers
          .filter((dossier) => theme === "" || dossier.theme === theme)
          .map((dossier) => (
            <Stack
              key={dossier.uid}
              component="li"
              sx={{ m: 2 }}
              gap={1}
              title={dossier.titre || undefined}
            >
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
          isLoading || dossiers.length !== (currentPage - 1) * PAGE_SIZE // The last fetch did not returned a full page
        }
      >
        Dossiers suivant
      </LoadingButton>
    </div>
  );
}
