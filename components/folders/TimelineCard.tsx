"use client";

import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { CardLayout } from "@/components/folders/CardLayout";

import { ActeLegislatif } from "@prisma/client";

import { ACT_ROOT, groupActs } from "@/repository/Acts";
import Image from "next/image";
import Link from "next/link";
import getSortedActs from "@/domain/sortActeGroup";
import { CODE_ACTS_AVEC_DEBAT } from "../const";

function getLogoPathFromCode(code: string) {
  if (code.startsWith("AN")) {
    return { src: "/LogoAN.svg", alt: "Assemblée Nationale", size: 30 };
  }
  if (code.startsWith("SN")) {
    return { src: "/LogoSN.svg", alt: "Sénat", size: 44 };
  }
  if (code.startsWith("CC")) {
    return { src: "/LogoCC.svg", alt: "Conseil Consitiutionel", size: 44 };
  }
  return undefined;
}

const TimelineItemLvl0 = ({
  act,
  groupDate,
  children,
}: React.PropsWithChildren<{
  act: ActeLegislatif;
  groupDate?: Date;
}>) => {
  const title = act.nomCanonique || act.codeActe;
  const date = act.dateActe ?? groupDate;
  const logo = getLogoPathFromCode(act.codeActe);
  return (
    <React.Fragment>
      <TimelineItem>
        <TimelineOppositeContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              height: 50,
            }}
          >
            <Typography variant="body2" fontWeight="light">
              {date
                ? date.toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "?"}
            </Typography>
          </Box>
        </TimelineOppositeContent>
        <TimelineSeparator sx={{ minWidth: 50 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              my: 1,
              mx: "auto",
              borderColor: "grey.400",
              borderWidth: 2,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {logo && (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.size}
                height={logo.size}
                style={{
                  width: logo.size,
                  height: logo.size,
                }}
              />
            )}
          </Box>

          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              height: 50,
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              {title}
            </Typography>
          </Box>
        </TimelineContent>
      </TimelineItem>
      {children}
    </React.Fragment>
  );
};

const TimelineItemLvl1 = ({
  act,
  groupDate,
  children,
}: React.PropsWithChildren<{ act: ActeLegislatif; groupDate?: Date }>) => {
  const title = `${act.nomCanonique} (${act.codeActe})` || act.codeActe;
  const date = act.dateActe ?? groupDate;
  return (
    <TimelineItem key={act.uid}>
      <TimelineOppositeContent />
      <TimelineSeparator sx={{ minWidth: 50 }}>
        <TimelineConnector sx={{ height: 10, flexGrow: 0 }} />
        <Box
          sx={{
            bgcolor: "black",
            width: 8,
            height: 8,
            my: 0.5,
            mx: "auto",
            borderRadius: "50%",
          }}
        />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="body1">
          {title}
          {/* ({act.uid}) */}
        </Typography>
        <Typography
          variant="caption"
          component="p"
          fontWeight="light"
          sx={{
            textTransform: "capitalize",
            color: "grey.600",
          }}
        >
          {date
            ? date.toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "?"}
        </Typography>
        {children}{" "}
      </TimelineContent>
    </TimelineItem>
  );
};

export const TimelineCard = ({
  actesLegislatifs,
  dossierUid,
  legislature,
}: {
  actesLegislatifs: ActeLegislatif[];
  dossierUid: string;
  legislature: string;
}) => {
  const { actsStructure, actsLookup } = groupActs(actesLegislatifs);

  return (
    <CardLayout title="Chronologie du dossier">
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        {getSortedActs(
          actsStructure[ACT_ROOT].children.map((id) => ({
            id,
            date: actsLookup[id].dateActe ?? actsStructure[id].date,
            codeActe: actsLookup[id].codeActe,
          }))
        ).map((lvl0Id) => {
          return (
            <TimelineItemLvl0
              key={lvl0Id}
              act={actsLookup[lvl0Id]}
              groupDate={actsStructure[lvl0Id].date}
            >
              {getSortedActs(
                actsStructure[lvl0Id].children.map((id) => ({
                  id,
                  date: actsLookup[id].dateActe ?? actsStructure[id].date,
                  codeActe: actsLookup[id].codeActe,
                }))
              ).map((lvl1Id) => {
                return (
                  <TimelineItemLvl1
                    key={lvl1Id}
                    act={actsLookup[lvl1Id]}
                    groupDate={actsStructure[lvl1Id].date}
                  >
                    {getSortedActs(
                      actsStructure[lvl1Id].children.map((id) => ({
                        id,
                        date: actsLookup[id].dateActe ?? actsStructure[id].date,
                        codeActe: actsLookup[id].codeActe,
                      }))
                    ).map((lvl2Id) => {
                      const act = actsLookup[lvl2Id];
                      const date = act.dateActe ?? actsStructure[lvl2Id].date;

                      const link = CODE_ACTS_AVEC_DEBAT.includes(act.codeActe)
                        ? `/${legislature}/dossier/${dossierUid}/debat?compteRenduRef=${act.reunionRefUid}`
                        : "";
                      const title = `${act.nomCanonique}${
                        date
                          ? ` du ${date.toLocaleDateString("fr-FR", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}`
                          : ""
                      }`;

                      return (
                        <div key={act.uid}>
                          <Typography
                            variant="caption"
                            component={link ? Link : "p"}
                            fontWeight="light"
                            href={link}
                            sx={{ my: 1.5 }}
                          >
                            {title}
                            {/* ({act.organeRefUid})(
              {act.uid}) */}
                          </Typography>

                          {getSortedActs(
                            actsStructure[lvl2Id].children.map((id) => ({
                              id,
                              date:
                                actsLookup[id].dateActe ??
                                actsStructure[id].date,
                              codeActe: actsLookup[id].codeActe,
                            }))
                          ).map((lvl3Id) => {
                            const date = actsLookup[lvl3Id].dateActe;
                            const title = `${actsLookup[lvl3Id].nomCanonique}${
                              date
                                ? ` du ${date.toLocaleDateString("fr-FR", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}`
                                : ""
                            }`;

                            return (
                              <Typography
                                variant="caption"
                                component="p"
                                fontWeight="light"
                                key={lvl3Id}
                                sx={{ my: 0, ml: 4 }}
                              >
                                {title}
                                {/* ({act.organeRefUid})({act.uid}) */}
                              </Typography>
                            );
                          })}
                        </div>
                      );
                    })}
                  </TimelineItemLvl1>
                );
              })}
            </TimelineItemLvl0>
          );
        })}
      </Timeline>
    </CardLayout>
  );
};
