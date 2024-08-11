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
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Link from "next/link";

type Debat = {
  uid: string;
  libelleCourtLieu: string | null;
  libelleLongLieu: string | null;
  timestampDebut: Date;
  compteRenduRef: string;
};

type DebateFilterBarProps = {
  reunions: Pick<
    Agenda,
    | "uid"
    | "libelleCourtLieu"
    | "libelleLongLieu"
    | "timestampDebut"
    | "timestampFin"
    | "compteRenduRef"
  >[];
  // setDebateRef: (newRef: string) => void;
  // debats: Debat[];
};

export const DebateFilterBar = (props: DebateFilterBarProps) => {
  const { reunions } = props;
  const sceanceUid = useSelectedLayoutSegment();

  const reunionIndex = reunions.findIndex(
    (reunion) => reunion.compteRenduRef === sceanceUid
  );
  if (!sceanceUid || reunionIndex < 0) {
    if (reunions.length > 0) {
      if (sceanceUid) {
        permanentRedirect(`${reunions[0].compteRenduRef}`);
      } else {
        permanentRedirect(`debat/${reunions[0].compteRenduRef}`);
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
                compteRenduRef,
                libelleCourtLieu,
                libelleLongLieu,
                timestampDebut,
              }) => {
                return (
                  // @ts-ignore
                  <MenuItem
                    key={compteRenduRef}
                    value={compteRenduRef}
                    component={Link}
                    href={compteRenduRef}
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
                  : reunions[reunionIndex - 1].compteRenduRef!
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
                  : reunions[reunionIndex + 1].compteRenduRef!
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
