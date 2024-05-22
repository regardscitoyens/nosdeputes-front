import * as React from "react";
import { Divider, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { THEMES, ThemeKeys } from "../const";
import LabelChip from "../LabelChip";
import { getDossiers } from "@/repository/database";
import { Dossier } from "@/repository/types";

type DossierType = Dossier & {
  theme: ThemeKeys;
};
type MonthDossier = { date: string; dossiers: DossierType[] };

type DossierListProps = {
  theme: string;
  search: string;
};

export default async function DossierList(props: DossierListProps) {
  const { theme, search } = props;

  const dossiers = await getDossiers({ legislature: 16 }, 50);

  console.log(dossiers.map(d => d.uid))
  const dossierMensuels = [{ date: "2024-03-01", dossiers }];
  const dossierMensuelsFiltered = dossierMensuels
    .map((month) => {
      return {
        ...month,
        dossiers: month.dossiers.filter(
          (dossier) => theme === "" || dossier.themes_labels?.includes(theme)
        ),
      };
    })
    .filter((month) => month.dossiers.length > 0);

  return (
    <div>
      <Stack component="ol">
        {dossierMensuelsFiltered.map(({ date, dossiers }) => (
          <React.Fragment key={date}>
            <Typography
              component="li"
              variant="body1"
              sx={{ textTransform: "capitalize", p: 1.5 }}
            >
              {new Date(date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
              })}
            </Typography>
            <Divider />
            <Stack component="ol" sx={{ m: 2 }} gap={1}>
              {dossiers.map(({ uid, titre, themes_labels, legislature }) => (
                <Stack
                  key={uid}
                  direction="row"
                  justifyContent="space-between"
                  sx={{ minWidth: 0 }}
                >
                  <Typography
                    variant="body1"
                    component={Link}
                    href={`${legislature}/dossier/${uid}`}
                    fontWeight="light"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {titre}
                  </Typography>

                  {themes_labels.map((theme: string) => (
                    <LabelChip
                      key={theme}
                      label={theme}
                      size="small"
                      sx={{ ml: 1.5 }}
                    />
                  ))}
                </Stack>
              ))}
            </Stack>
          </React.Fragment>
        ))}
      </Stack>
    </div>
  );
}
