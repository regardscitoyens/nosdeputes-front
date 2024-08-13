import * as React from "react";

import Typography from "@mui/material/Typography";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CircleDiv from "@/icons/CircleDiv";
import { ParagrapheWithActeur } from "@/app/[legislature]/dossier/[id]/debat/[compteRenduRef]/DebateTranscript";

interface ParoleItemProps {
  acteur: ParagrapheWithActeur["acteur"];
  roleDebat: string | null;
  texte: string | null;
}
export default function ParoleItem(props: ParoleItemProps) {
  const { acteur, roleDebat, texte } = props;

  return (
    <TimelineItem>
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
          <Avatar
            sx={{ height: 40, width: 40 }}
            alt={`${acteur?.prenom ?? ""} ${acteur?.nom ?? ""}`}
            src={
              acteur?.slug
                ? `https://www.nosdeputes.fr/depute/photo/${acteur.slug}/${52}`
                : ""
            }
          >
            {acteur?.prenom?.[0]?.toUpperCase()}
            {acteur?.nom?.[0]?.toUpperCase()}
          </Avatar>
        </Box>

        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Stack direction="column" spacing={1}>
          <div>
            <Typography variant="body1" fontWeight="bold">
              {acteur?.prenom ?? ""} {acteur?.nom ?? ""}
            </Typography>
            {acteur?.groupeParlementaire?.libelle && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {acteur?.groupeParlementaire?.couleurAssociee && (
                  <CircleDiv
                    color={acteur?.groupeParlementaire?.couleurAssociee}
                  />
                )}{" "}
                <Typography sx={{ ml: 1 }} variant="body2" fontWeight="light">
                  {acteur?.groupeParlementaire?.libelle} (
                  {acteur?.groupeParlementaire?.libelleAbrev})
                </Typography>
              </Box>
            )}
            {roleDebat && <Typography>{roleDebat}</Typography>}
          </div>
          <Typography
            variant="caption"
            dangerouslySetInnerHTML={{ __html: texte || "TEXT_NOT_FOUND" }}
          ></Typography>
        </Stack>
      </TimelineContent>
    </TimelineItem>
  );
}
