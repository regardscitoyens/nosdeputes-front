import * as React from "react";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import LabelChip from "../LabelChip";
import { prisma } from "@/prisma";

async function getDossiersUnCached(legislature: string) {
  return prisma.dossier.findMany({
    where: { legislature },
    orderBy: { numero: "asc" },
    take: 10,
  });
}
const getDossiers = React.cache(getDossiersUnCached);

type DossierListProps = {
  theme: string;
  search: string;
};

export default async function DossierList(props: DossierListProps) {
  const { theme, search } = props;

  const dossiers = await getDossiers("16");

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
              </Stack>
            </Stack>
          ))}
      </Stack>
    </div>
  );
}
