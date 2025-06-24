import * as React from "react";

import { List, ListItem, Box, Paper, Stack, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Mandat, Organe } from "@prisma/client";
import { getActeurMandats } from "@/data/getActeurMandats";

// Mandat de depute, et mandat d'appartenance au group parlementaire
const ignoredTypeOrgane = ["ASSEMBLEE", "GP", "PARPOL"];

const translations: Record<string, string> = {
  GE: "Groupes d'études",
  GA: "Groupe d'amitié",
  COMPER: "Commission permanente",
  COMNL: "Missions parlementaires",
};

const order = ["COMPER", "COMNL", "GE", "GA"];

type MandatsPerType = Record<
  string,
  (Pick<Organe, "libelle"> &
    Pick<Mandat, "libQualiteSex" | "organeRefUid" | "dateFin">)[]
>;

export default async function Mandats({ acteurUid }: { acteurUid: string }) {
  const mandats = await getActeurMandats(acteurUid);

  const mandatsPerType = mandats
    .filter((m) => !ignoredTypeOrgane.includes(m.typeOrgane))
    .reduce((acc, mandat) => {
      const organe = mandat.organeRef;

      if (!organe) {
        return acc;
      }
      const { libQualiteSex, typeOrgane, organeRefUid, dateFin } = mandat;

      return {
        ...acc,
        [typeOrgane]: [
          ...(acc[typeOrgane] ?? []),
          {
            organeRefUid,
            libelle: organe?.libelle,
            libQualiteSex,
            dateFin,
          },
        ],
      };
    }, {} as MandatsPerType);

  const types = Object.keys(mandatsPerType).sort(
    (a, b) => order.indexOf(a) - order.indexOf(b)
  );

  return (
    <Paper sx={{ p: 2, bgcolor: "grey.50", width: 300 }} elevation={0}>
      <Stack direction="column" spacing={2}>
        <Typography variant="subtitle1">Responsabilités</Typography>

        {types.map((type) => (
          <Box key={type}>
            <Typography variant="body2" fontWeight="light">
              {translations[type] ?? type}{" "}
              <InfoOutlinedIcon fontSize="inherit" />
            </Typography>
            <List>
              {mandatsPerType[type]
                .filter(({ libQualiteSex, organeRefUid }) => {
                  if (libQualiteSex !== "Membre") {
                    return true;
                  }
                  return (
                    // Display "Membre" mandat if it's the unique mandat in the organe (avoid duplicate with membre + president, or secretaire, ...)
                    mandatsPerType[type].filter(
                      (item) => item.organeRefUid === organeRefUid
                    ).length === 1
                  );
                })
                .map(({ libelle, libQualiteSex }) => (
                  <ListItem key={libelle} disablePadding>
                    <Typography variant="body2">
                      {libelle}
                      {libQualiteSex && ` (${libQualiteSex})`}
                    </Typography>
                  </ListItem>
                ))}
            </List>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
