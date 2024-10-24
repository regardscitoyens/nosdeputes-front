"use client";
import React from "react";

import { useSelectedLayoutSegment } from "next/navigation";
import { permanentRedirect } from "next/navigation";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Agenda } from "@prisma/client";
import Link from "next/link";

type DebateFilterBarProps = {
  reunions: Pick<
    Agenda,
    | "uid"
    | "libelleCourtLieu"
    | "libelleLongLieu"
    | "timestampDebut"
    | "timestampFin"
    | "compteRenduRefUid"
  >[];
  // setDebateRef: (newRef: string) => void;
  // debats: Debat[];
};

export const DebateFilterBar = (props: DebateFilterBarProps) => {
  const { reunions } = props;
  const sceanceUid = useSelectedLayoutSegment();

  const reunionIndex = reunions.findIndex(
    (reunion) => reunion.compteRenduRefUid === sceanceUid
  );
  if (!sceanceUid || reunionIndex < 0) {
    if (reunions.length > 0) {
      if (sceanceUid) {
        permanentRedirect(`${reunions[0].compteRenduRefUid}`);
      } else {
        permanentRedirect(`debat/${reunions[0].compteRenduRefUid}`);
      }
    }
  }

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        py: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: {
            xs: "row",
            md: "row",
          },
          gap: 5,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Select value={sceanceUid} displayEmpty sx={{ flex: 1 }}>
            {reunions.map(
              ({
                compteRenduRefUid,
                libelleCourtLieu,
                libelleLongLieu,
                timestampDebut,
              }) => {
                return (
                  // @ts-ignore
                  <MenuItem
                    key={compteRenduRefUid}
                    value={compteRenduRefUid}
                    component={Link}
                    href={compteRenduRefUid}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        textTransform: {
                          xs: "uppercase",
                          md: "none",
                        },
                      }}
                    >
                      {libelleCourtLieu ?? libelleLongLieu ?? ""}, le{" "}
                      {timestampDebut!.toLocaleString("fr-FR", {
                        month: "long",
                        day: "numeric",
                        weekday: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </MenuItem>
                );
              }
            )}
          </Select>
          <Stack
            justifyContent="flex-end"
            direction="row"
            gap={2}
            flex={3}
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <IconButton
              size="small"
              component={Link}
              href={
                reunionIndex <= 0
                  ? ""
                  : reunions[reunionIndex - 1].compteRenduRefUid!
              }
              disabled={reunionIndex <= 0}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              component={Link}
              href={
                reunionIndex >= reunions.length - 1
                  ? ""
                  : reunions[reunionIndex + 1].compteRenduRefUid!
              }
              disabled={reunionIndex >= reunions.length - 1}
            >
              <ArrowForwardIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
