import * as React from "react";
import { Divider, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { DossierFilterState } from "./Filter";
import { ThemeKeys } from "../const";
import LabelChip from "../LabelChip";

type DossierType = {
  date: string;
  id: string | number;
  title: string;
  theme: ThemeKeys;
};
type MonthDossier = { date: string; dossiers: DossierType[] };

const dossiers: DossierType[] = [
  {
    date: "2024-11-01",
    id: 0,
    title: `Souhaits de bienvenue à une députée nouvellement élue`,
    theme: "Transport",
  },
  {
    date: "2024-11-01",
    id: 1,
    title: `Écoles nationales d'architecture`,
    theme: "Transport",
  },
  {
    date: "2024-11-01",
    id: 2,
    title: `Orientation et programmation du ministère de la justice 2023-2027 `,
    theme: "Transport",
  },
  {
    date: "2024-11-01",
    id: 3,
    title: `Interdiction de l'écriture dite inclusive`,
    theme: "Transport",
  },
  {
    date: "2024-11-01",
    id: 4,
    title: `Crise de l'hôpital public`,
    theme: "Transport",
  },
  {
    date: "2024-11-01",
    id: 5,
    title: `Avenant au protocole d'accord france-luxembourg `,
    theme: "Transport",
  },
  {
    date: "2024-11-01",
    id: 6,
    title: `Débat sur la dette`,
    theme: "Transport",
  },
  {
    date: "2024-11-01",
    id: 7,
    title: `Convocation du parlement en session extraordinaire`,
    theme: "Transport",
  },
  {
    date: "2024-11-01",
    id: 8,
    title: `Modernisation et responsabilité du corps judiciaire `,
    theme: "Transport",
  },
  {
    date: "2024-11-01",
    id: 9,
    title: `Questions orales sans débat (1082 interventions, 3 commentaires)`,
    theme: "Transport",
  },
  {
    date: "2024-11-01",
    id: 10,
    title: `Orientation et programmation du ministère de la justice 2023-2027 - modernisation et responsabilité du corps judiciaire`,
    theme: "Transport",
  },
  {
    date: "2024-11-01",
    id: 11,
    title: `Hommage à léon gautier`,
    theme: "Transport",
  },
  {
    date: "2024-11-01",
    id: 12,
    title: `Lutte contre les arnaques et les dérives des influenceurs sur les réseaux sociaux`,
    theme: "Transport",
  },

  {
    date: "2024-10-01",
    id: 13,
    title: `Accompagnement des élus locaux dans la lutte contre l'artificialisation des sols`,
    theme: "Transport",
  },
  {
    date: "2024-10-01",
    id: 14,
    title: `Hommage au professeur tué à arras `,
    theme: "Transport",
  },
  {
    date: "2024-10-01",
    id: 15,
    title: `Explosion dans le 5e arrondissement`,
    theme: "Transport",
  },
  {
    date: "2024-10-01",
    id: 16,
    title: `Discussion d'une proposition de loi`,
    theme: "Transport",
  },
  {
    date: "2024-10-01",
    id: 17,
    title: `Lutte contre l'inflation concernant les produits de grande consommation `,
    theme: "Transport",
  },
  {
    date: "2024-10-01",
    id: 18,
    title: `Soutien à israel face au terrorisme`,
    theme: "Transport",
  },
  {
    date: "2024-10-01",
    id: 19,
    title: `Solution à deux États et condamnation de l'institutionnalisation par l'État d'israel d'un régime d'apartheid`,
    theme: "Transport",
  },
  {
    date: "2024-10-01",
    id: 20,
    title: `Sécuriser et réguler l'espace numérique `,
    theme: "Transport",
  },
  {
    date: "2024-10-01",
    id: 21,
    title: `Ouverture de la session ordinaire`,
    theme: "Transport",
  },
  {
    date: "2024-10-01",
    id: 22,
    title: `Inscrire le groupe militaire privé wagner sur la liste des organisations terroristes`,
    theme: "Transport",
  },
];

const dossierMensuels = dossiers
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .reduce((acc, val) => {
    if (
      acc.length === 0 ||
      acc[acc.length - 1].date.slice(0, 7) !== val.date.slice(0, 7)
    ) {
      return [...acc, { date: `${val.date.slice(0, 7)}-01`, dossiers: [val] }];
    }
    return [
      ...acc.slice(0, acc.length - 1),
      {
        ...acc[acc.length - 1],
        dossiers: [...acc[acc.length - 1].dossiers, val],
      },
    ];
  }, [] as MonthDossier[]);

type DossierListProps = {
  filterState: DossierFilterState;
  setFilterState: React.Dispatch<React.SetStateAction<DossierFilterState>>;
};

export default function DossierList(props: DossierListProps) {
  return (
    <div>
      <Stack component="ol">
        {dossierMensuels.map(({ date, dossiers }) => (
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
              {dossiers.map(({ id, title, theme }) => (
                <Stack
                  key={id}
                  direction="row"
                  justifyContent="space-between"
                  sx={{ minWidth: 0 }}
                >
                  <Typography
                    variant="body1"
                    component={Link}
                    href="/dossiers/dossier"
                    fontWeight="light"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {title}
                  </Typography>

                  <LabelChip label={theme} size="small" sx={{ ml: 1.5 }} />
                </Stack>
              ))}
            </Stack>
          </React.Fragment>
        ))}
      </Stack>
    </div>
  );
}
