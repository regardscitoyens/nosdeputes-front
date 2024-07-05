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

import { ActeLegislatif, Document } from "@/repository/types";

import { groupActs } from "@/repository/Acts";
import { sortActDate } from "../utils";
import Image from "next/image";
import Link from "next/link";
import getSortedActGroups from "@/domain/sortActeGroup";
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
  acts,
  documents,
}: {
  acts: ActeLegislatif[];
  documents: Record<string, Document>;
}) => {
  const { actsStructure, actsLookup } = groupActs(acts);

  return (
    <CardLayout title="Chronologie du dossier">
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        {getSortedActGroups(actsStructure, actsLookup).flatMap(
          ({
            acts: lvl0Acts,
            groupDate: lvl0GroupDate,
            children: lvl1Group,
          }) => {
            return lvl0Acts?.map((act) => {
              return (
                <TimelineItemLvl0
                  key={act.uid}
                  act={act}
                  groupDate={lvl0GroupDate}
                >
                  {lvl1Group &&
                    getSortedActGroups(lvl1Group, actsLookup).flatMap(
                      ({
                        acts: lvl1Acts,
                        groupDate: lvl1GroupDate,
                        children: lvl2Group,
                      }) => {
                        return lvl1Acts?.map((act) => {
                          return (
                            <TimelineItemLvl1
                              key={act.uid}
                              act={act}
                              groupDate={lvl1GroupDate}
                            >
                              {lvl2Group &&
                                getSortedActGroups(
                                  lvl2Group,
                                  actsLookup
                                ).flatMap(
                                  ({
                                    acts: lvl2Acts,
                                    groupDate: lvl2GroupDate,
                                    children: lvl3Group,
                                  }) => {
                                    return lvl2Acts?.map((act) => {
                                      const date =
                                        act.dateActe ?? lvl2GroupDate;

                                      const link =
                                        CODE_ACTS_AVEC_DEBAT.includes(
                                          act.codeActe
                                        )
                                          ? `/16/dossier/DLR5L16N46484/debat?compteRenduRef=${act.reunionRefUid}`
                                          : "";
                                      const title = `${act.nomCanonique}${
                                        date
                                          ? ` du ${date.toLocaleDateString(
                                              "fr-FR",
                                              {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                              }
                                            )}`
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
                                          {lvl3Group &&
                                            getSortedActGroups(
                                              lvl3Group,
                                              actsLookup
                                            )
                                              .flatMap(({ acts: lvl3Acts }) => {
                                                console.log({ lvl3Acts });
                                                return lvl3Acts;
                                              })
                                              // Certain dossier saissisent plusieurs commissions. Ils faut donc les distinguer par oregane
                                              .filter(
                                                (childrenAct) =>
                                                  act.organeRefUid ===
                                                  childrenAct.organeRefUid
                                              )
                                              ?.sort(sortActDate)
                                              ?.map((act) => {
                                                const date = act.dateActe;
                                                const title = `${
                                                  act.nomCanonique
                                                }${
                                                  date
                                                    ? ` du ${date.toLocaleDateString(
                                                        "fr-FR",
                                                        {
                                                          year: "numeric",
                                                          month: "short",
                                                          day: "numeric",
                                                        }
                                                      )}`
                                                    : ""
                                                }`;

                                                return (
                                                  <Typography
                                                    variant="caption"
                                                    component="p"
                                                    fontWeight="light"
                                                    key={act.uid}
                                                    sx={{ my: 0, ml: 4 }}
                                                  >
                                                    {title}
                                                    {/* ({act.organeRefUid})({act.uid}) */}
                                                  </Typography>
                                                );
                                              })}
                                        </div>
                                      );
                                    });
                                  }
                                )}
                            </TimelineItemLvl1>
                          );
                        });
                      }
                    )}
                </TimelineItemLvl0>
              );
            });
          }
        )}
      </Timeline>
    </CardLayout>
  );
};
