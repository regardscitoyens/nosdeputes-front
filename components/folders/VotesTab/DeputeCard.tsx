import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CompareArrowsSharpIcon from "@mui/icons-material/CompareArrowsSharp";
import { Stack, Tooltip } from "@mui/material";
import CircleDiv from "@/icons/CircleDiv";

type DeputeCardProps = {
  prenom: string;
  nom: string;
  group?: {
    color: string;
    fullName: string;
    shortName: string;
  };
  vote?: "pour" | "contre" | "nonVotant" | "abstension";
  groupPosition?: "pour" | "contre" | "abstension";
};

export default function DeputeCard(props: DeputeCardProps) {
  const { prenom, nom, group, vote, groupPosition } = props;

  const isDissident = groupPosition !== vote && vote !== "nonVotant";

  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", minWidth: 0 }}>
        <Avatar sx={{ height: 40, width: 40 }}>
          {prenom[0].toUpperCase()}
          {nom[0].toUpperCase()}
        </Avatar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: 1,
            minWidth: 0,
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            {prenom} {nom}
          </Typography>
          {group && (
            <Tooltip title={group.fullName}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircleDiv color={group.color} style={{ minWidth: 16 }} />
                <Typography
                  sx={{
                    ml: 0.5,
                    lineHeight: "18px",
                    display: "flex",
                    minWidth: 0,
                  }}
                  variant="caption"
                  fontWeight="light"
                >
                  <span
                    style={{
                      flexShrink: 0,
                      flexGrow: 1,
                      marginRight: 4,
                    }}
                  >
                    {group.shortName}:
                  </span>
                  <span
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      flexGrow: 1,
                      flexShrink: 1,
                    }}
                  >
                    {group.fullName}
                  </span>
                </Typography>
              </Box>
            </Tooltip>
          )}
        </Box>
      </Box>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ minWidth: "auto" }}
      >
        {isDissident && (
          <Tooltip title="Dissident à son groupe">
            <CompareArrowsSharpIcon />
          </Tooltip>
        )}
        {vote && vote !== "nonVotant" && (
          <CircleDiv
            color={
              (vote === "pour" && "green") ||
              (vote === "contre" && "red") ||
              "gray"
            }
          />
        )}
        {vote === "nonVotant" && <span>(non votant)</span>}
      </Stack>
    </Box>
  );
}
