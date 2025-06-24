"use client";
import * as React from "react";
import { Metrique, Stats, StatsPeriode } from "@prisma/client";
import Select from "@mui/material/Select";
import {
  Box,
  Card,
  CardContent,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

const periodes: StatsPeriode[] = [
  "LEGISLATURE",
  "LAST_YEAR",
  "LAST_SIX_MONTHS",
];

const quantilesSentences = [
  "Dans les 20% moins actifs",
  "Dans les 40% moins actifs",
  "Dans les 60% moins actifs",
  "Dans les 40% plus actifs",
  "Dans les 20% plus actifs",
];

const baselineTypeToTitle: Record<string, string> = {
  "questions-ecrites": "Nombre de questions écrites",
  "questions-orales": "Nombre de questions orales",
  interventions: "Nombre d'interventions",
  amendements: "Nombre d'amendements",
  "presence-commission": "Présence en commission",
  "documents-publies": "Nombre de documents publié",
};

const MetriqueCard = (props: Stats & { valeurDepute: number }) => {
  const quantiles = [props.q20, props.q40, props.q60, props.q80, props.q100];

  const quantileIndex = Math.min(
    4,
    quantiles.findLastIndex((v) => props.valeurDepute > v) + 1
  );

  return (
    <Card key={props.id}>
      <CardContent>
        <Typography variant="h1" sx={{ textAlign: "right" }}>
          {props.valeurDepute}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "right" }}>
          {baselineTypeToTitle[props.mesure] ?? props.mesure}
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: 48,
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            gap: 2,
          }}
        >
          {quantiles.map((q, index) => {
            return (
              <Tooltip
                key={index}
                title={`Entre ${index == 0 ? 0 : quantiles[index - 1]} et ${q}`}
              >
                <Box
                  sx={{
                    "&:hover": {
                      bgcolor: "#f3f3f3",

                      "&>div": {
                        bgColor: quantileIndex === index ? "black" : "#A4A4A7",
                      },
                    },
                    position: "relative",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      height: `${Math.max(
                        10,
                        Math.ceil((100 * q) / props.maximum)
                      )}%`,
                      width: "100%",
                      bgcolor: quantileIndex === index ? "black" : "#E4E4E7",
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                    }}
                  />
                </Box>
              </Tooltip>
            );
          })}
        </Box>
        <Typography variant="caption">
          {quantilesSentences[quantileIndex]}
        </Typography>
      </CardContent>
    </Card>
  );
};

export function ActeurStatSectionClient({
  deputeMetriquesData,
  deputeStatsData,
}: {
  deputeMetriquesData: Metrique[];
  deputeStatsData: Stats[];
}) {
  const [periode, setPeriode] = React.useState<StatsPeriode>("LEGISLATURE");

  const metriquesValues = React.useMemo(() => {
    const rep: Record<StatsPeriode, Record<string, number>> = {
      LEGISLATURE: {},
      LAST_YEAR: {},
      LAST_SIX_MONTHS: {},
    };

    for (const metrique of deputeMetriquesData) {
      rep[metrique.periode][metrique.mesure] = metrique.valeur;
    }
    return rep;
  }, [deputeMetriquesData]);

  const statsWithMetrique = React.useMemo(
    () =>
      deputeStatsData
        ?.filter((item) => item.periode === periode)
        .map((item) => ({
          ...item,
          valeurDepute: metriquesValues[item.periode][item.mesure] ?? 0,
        })),
    [deputeStatsData, metriquesValues, periode]
  );

  return (
    <div>
      <Select
        value={periode}
        onChange={(event) => setPeriode(event.target.value)}
      >
        <MenuItem value="LEGISLATURE">Legislature</MenuItem>
        <MenuItem value="LAST_YEAR">Un an</MenuItem>
        <MenuItem value="LAST_SIX_MONTHS">Six mois</MenuItem>
      </Select>

      <div>
        {statsWithMetrique.map((item) => (
          <MetriqueCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
