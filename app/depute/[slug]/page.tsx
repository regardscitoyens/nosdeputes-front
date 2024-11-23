import React from "react";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

import { prisma } from "@/prisma";
import { Box, Typography } from "@mui/material";
import WeeklyStats from "./WeeklyActivity";

async function getDeputeStatsUnCached(slug: string) {
  try {
    return await prisma.acteur.findFirst({
      where: { slug },
      select: {
        uid: true,
        nombreAmendements: true,
        nombreInterventions: true,
        nombreQuestions: true,
        statistiquesHebdomadaire: true,
      },
    });
  } catch (error) {
    console.error(`Error fetching stats from depute ${slug}:`, error);
    throw error;
  }
}

async function getStatsOnWeeklyActivityUnCached(slug: string) {
  try {
    return await prisma.statistiqueHebdomadaire.findMany({
      where: { OR: [{ acteurUid: "median" }, { acteurUid: "max" }] },
      select: {
        type: true,
        semaineIndex: true,
        valeur: true,
        acteurUid: true,
      },
    });
  } catch (error) {
    console.error(`Error fetching stats from depute ${slug}:`, error);
    throw error;
  }
}

async function getBaselineStatsUnCached() {
  try {
    return await prisma.stats.findMany({
      select: {
        type: true,
        id: true,
        minimum: true,
        maximum: true,
        q20: true,
        q40: true,
        q60: true,
        q80: true,
      },
    });
  } catch (error) {
    console.error(`Error fetching stat baseline:`, error);
    throw error;
  }
}

const getDeputeStats = React.cache(getDeputeStatsUnCached);
const getBaselineStats = React.cache(getBaselineStatsUnCached);
const getStatsOnWeeklyActivity = React.cache(getStatsOnWeeklyActivityUnCached);

const baselineTypeToDeputeKey: Record<
  string,
  "nombreAmendements" | "nombreInterventions" | "nombreQuestions"
> = {
  questions: "nombreQuestions",
  interventions: "nombreInterventions",
  amendements: "nombreAmendements",
};

const baselineTypeToTitle: Record<string, string> = {
  questions: "Nombre de questions",
  interventions: "Nombre d'interventions",
  amendements: "Nombre d'amendements",
};

const quantilesSentences = [
  "Dans les 20% moins actifs",
  "Dans les 40% moins actifs",
  "Dans les 60% moins actifs",
  "Dans les 40% plus actifs",
  "Dans les 20% plus actifs",
];

export default async function Page({ params }: { params: { slug: string } }) {
  const deputeStatsData = getDeputeStats(params.slug);
  const statsOnWeeklyActivityData = getStatsOnWeeklyActivity(params.slug);
  const baselineStatsData = getBaselineStats();

  // Initiate both requests in parallel
  const [deputeStats, statsOnWeeklyActivity, baselineStats] = await Promise.all(
    [deputeStatsData, statsOnWeeklyActivityData, baselineStatsData]
  );

  return (
    <div>
      <WeeklyStats
        deputeWeeklyActivity={deputeStats?.statistiquesHebdomadaire ?? []}
        statsOnWeeklyActivity={statsOnWeeklyActivity}
      />

      {baselineStats.map(({ q20, q40, q60, q80, maximum, type, id }) => {
        if (!baselineTypeToDeputeKey[type as string] || !deputeStats) {
          return null;
        }

        if (!id.includes("-AN-")) {
          // Enleve les stats liées au senat
          return null;
        }

        const value = deputeStats[baselineTypeToDeputeKey[type]];

        const quantiles = [q20, q40, q60, q80, maximum];

        // On equality we are kind and put then in the next one. Except for the last one because there is no next one.
        const quantileIndex = quantiles.findLastIndex(
          (q, index) => index === 0 || value >= q
        );

        return (
          <Card key={id}>
            <CardContent>
              <Typography variant="h1" sx={{ textAlign: "right" }}>
                {value}
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "right" }}>
                {baselineTypeToTitle[type]}
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
                    <Box
                      key={index}
                      sx={{
                        "&:hover": {
                          bgcolor: "#f3f3f3",

                          "&>div": {
                            bgColor:
                              quantileIndex === index ? "black" : "#A4A4A7",
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
                            Math.ceil((100 * q) / maximum)
                          )}%`,
                          width: "100%",
                          bgcolor:
                            quantileIndex === index ? "black" : "#E4E4E7",
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
              <Typography variant="caption">
                {quantilesSentences[quantileIndex]}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
