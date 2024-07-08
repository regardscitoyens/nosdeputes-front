import * as React from "react";

import { List, ListItem, Box, Paper, Stack, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Mandat, Organe } from "@prisma/client";
// Mandat de depute, et mandat d'appartenance au group parlementaire
const ignoredTypeOrgane = ["ASSEMBLEE", "GP", "PARPOL"];

const translations: Record<string, string> = {
  GE: "Groupes d'études",
  GA: "Groupe d'amitié",
  COMPER: "Commission permanente",
  COMNL: "Missions parlementaires",
};

const order = ["COMPER", "COMNL", "GE", "GA"];

export default function Mandats({ mandats }: { mandats: Mandat[] }) {
  const mandatsPerType = mandats
    .filter((m) => !ignoredTypeOrgane.includes(m.typeOrgane))
    .reduce((acc, mandat) => {
      // @ts-ignore
      const organe: Organe = mandat.organesMandats[0].organeRef;
      const { libQualiteSex, typeOrgane } = mandat;

      return {
        ...acc,
        [typeOrgane]: [
          ...(acc[typeOrgane] ?? []),
          {
            libelle: organe?.libelle,
            libQualiteSex,
          },
        ],
      };
    }, {} as Record<string, Pick<Mandat, "libelle" | "libQualiteSex">[]>);

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
              {mandatsPerType[type].map(({ libelle, libQualiteSex }) => (
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
