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
import { ReturnedPointsOdj } from "@/data/getPointsOdj";

type DebateFilterBarProps = {
  pointsOdj: ReturnedPointsOdj[];
  // setDebateRef: (newRef: string) => void;
  // debats: Debat[];
};

export const DebateFilterBar = (props: DebateFilterBarProps) => {
  const { pointsOdj } = props;
  const sceanceUid = useSelectedLayoutSegment();

  const reunionIndex = pointsOdj.findIndex((odj) => odj.uid === sceanceUid);
  if (!sceanceUid || reunionIndex < 0) {
    if (pointsOdj.length > 0) {
      if (sceanceUid) {
        permanentRedirect(`${pointsOdj[0].uid}`);
      } else {
        permanentRedirect(`debat/${pointsOdj[0].uid}`);
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
            {pointsOdj.map((odj) => {
              return (
                // @ts-ignore
                <MenuItem
                  key={odj.uid}
                  value={odj.uid}
                  component={Link}
                  href={odj.uid}
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
                    {odj.agendaRef?.libelleCourtLieu ??
                      odj.agendaRef?.libelleLongLieu ??
                      ""}
                    , le{" "}
                    {odj.agendaRef?.timestampDebut?.toLocaleString("fr-FR", {
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
            })}
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
              href={reunionIndex <= 0 ? "" : pointsOdj[reunionIndex - 1].uid!}
              disabled={reunionIndex <= 0}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              component={Link}
              href={
                reunionIndex >= pointsOdj.length - 1
                  ? ""
                  : pointsOdj[reunionIndex + 1].uid!
              }
              disabled={reunionIndex >= pointsOdj.length - 1}
            >
              <ArrowForwardIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
