import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import MuiLink from "@mui/material/Link";

import CompareArrowsSharpIcon from "@mui/icons-material/CompareArrowsSharp";
import CircleDiv from "@/icons/CircleDiv";
import Link from "next/link";
import { Acteur } from "@prisma/client";

type DeputeCardProps<RootComponent extends React.ElementType = "div"> = Pick<
  Acteur,
  "prenom" | "nom" | "slug" | "urlImage"
> & {
  secondaryText?: string;
  group?: {
    color: string | null;
    fullName: string;
    shortName: string;
  } | null;
  smallGroupColor?: boolean;
  showVote?: boolean;
  /**
   * If true, the entire card is a link to the deputy page. Otherwise it's its name.
   */
  isFullCardLink?: boolean;
  vote?: "pour" | "contre" | "nonVotant" | "abstention" | null;
  groupPosition?: "pour" | "contre" | "nonVotant" | "abstention";
} & BoxProps<RootComponent>;

export default function DeputeCard<RootComponent extends React.ElementType>(
  props: DeputeCardProps<RootComponent>
) {
  const {
    urlImage,
    prenom,
    nom,
    slug,
    group,
    smallGroupColor,
    vote,
    showVote,
    groupPosition,
    sx,
    secondaryText,
    isFullCardLink,
    ...other
  } = props;

  const isDissident = groupPosition !== vote && vote !== "nonVotant";

  return (
    <Box
      sx={[
        {
          px: 1.5,
          py: 0.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "&:hover": isFullCardLink ? { bgcolor: "grey.50" } : {},
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...(isFullCardLink
        ? {
            component: Link,
            href: `/depute/${slug}`,
          }
        : {})}
      {...other}
    >
      <Box sx={{ display: "flex", minWidth: 0 }}>
        <Avatar
          sx={{ height: 40, width: 40 }}
          alt={`${prenom} ${nom}`}
          src={urlImage ?? ""}
        >
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
          {slug && !isFullCardLink ? (
            <MuiLink
              variant="body2"
              fontWeight="bold"
              underline="hover"
              component={Link}
              href={`/depute/${slug}`}
            >
              {prenom} {nom}
            </MuiLink>
          ) : (
            <Typography variant="body2" fontWeight="bold">
              {prenom} {nom}
            </Typography>
          )}
          {secondaryText && (
            <Typography variant="body2" fontWeight="light">
              {secondaryText}
            </Typography>
          )}
          {group && (
            <Tooltip title={group.fullName}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircleDiv
                  color={group.color || "gray"}
                  size={smallGroupColor ? 10 : 16}
                />
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
                    {group.shortName} {group.shortName && group.fullName && ":"}
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
        {showVote && vote && vote !== "nonVotant" && (
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
