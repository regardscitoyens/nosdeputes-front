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

interface ParoleItemProps {
  acteurRef: string | null;
  prenom: string | null;
  nom: string | null;
  group_color: string | null;
  group_libelle: string | null;
  group_libelle_short: string | null;
  roleDebat: string | null;
  acteur_slug: string | null;
  texte: string | null;
}
export default function ParoleItem(props: ParoleItemProps) {
  const {
    prenom,
    nom,
    acteur_slug,
    group_color,
    group_libelle,
    group_libelle_short,
    roleDebat,
    texte,
  } = props;

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
            alt={`${prenom ?? ""} ${nom ?? ""}`}
            src={`https://www.nosdeputes.fr/depute/photo/${acteur_slug}/${52}`}
          >
            {prenom?.[0]?.toUpperCase()}
            {nom?.[0]?.toUpperCase()}
          </Avatar>
        </Box>

        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Stack direction="column" spacing={1}>
          <div>
            <Typography variant="body1" fontWeight="bold">
              {prenom ?? ""} {nom ?? ""}
            </Typography>
            {group_libelle && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {group_color && <CircleDiv color={group_color} />}{" "}
                <Typography sx={{ ml: 1 }} variant="body2" fontWeight="light">
                  {group_libelle} ({group_libelle_short})
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
