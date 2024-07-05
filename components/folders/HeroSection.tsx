"use client";

import React from "react";

import Link from "next/link";

import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import EnergyIcon from "@/icons/EnergyIcon";
import LabelChip from "@/components/LabelChip";
import StatusChip from "@/components/StatusChip";
import { getCurrentStatus, statusInfo } from "@/domain/dataTransform";
import { DossierData } from "@/repository/database";

const breadcrumbs = [
  <Link key="1" href="/">
    {/* <HomeIcon sx={{ fontSize: 12, mr: 1, mb: "3px" }} /> */}
    <Typography variant="caption" fontWeight="light">
      Accueil
    </Typography>
  </Link>,
  <Link key="2" href="/dossiers">
    <Typography variant="caption" fontWeight="regular">
      Dossiers
    </Typography>
  </Link>,
];

type HeroSectionProps = Partial<Pick<DossierData, "dossier" | "acts">>;

export const HeroSection = ({ dossier, acts = [] }: HeroSectionProps) => {
  const theme = useTheme();

  const status = getCurrentStatus(acts);
  return (
    <>
      <Breadcrumbs
        // separator={<ChevronRightIcon sx={{ fontSize: 8 }} />}
        separator=">"
        aria-label="breadcrumb"
        sx={{ backgroundColor: "white", padding: "12px 16px" }}
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Box
        sx={{
          minHeight: "272px", // picture height + header box padding
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          backgroundColor: "grey.900",
          [theme.breakpoints.up("md")]: {
            alignItems: "flex-end",
            justifyContent: "center",
            backgroundColor: "transparent",
          },
        }}
      >
        {/* Future background picture */}
        <Box
          sx={{
            position: "absolute",
            top: 104, // navbar + breadcrumb height
            left: 0,
            zIndex: -1,
            backgroundColor: "#CCCCCC",
            width: "100%",
            height: 240,
            display: "hidden",
          }}
        />
        <Paper
          elevation={0}
          sx={{
            py: 4,
            px: 3,
            width: "680px",
            borderRadius: 1,
            backgroundColor: "transparent",
            [theme.breakpoints.up("md")]: {
              backgroundColor: "white",
            },
          }}
        >
          <Stack
            direction="column"
            sx={{
              alignItems: "flex-start",
              [theme.breakpoints.up("md")]: {
                alignItems: "center",
              },
            }}
          >
            <Stack
              direction="column"
              spacing={2}
              sx={{
                textAlign: "center",
                alignItems: "flex-start",
                [theme.breakpoints.up("md")]: {
                  alignItems: "center",
                },
              }}
            >
              <Typography
                fontWeight="bold"
                variant="body2"
                sx={{
                  color: "white",
                  [theme.breakpoints.up("md")]: {
                    color: "grey.900",
                  },
                }}
              >
                {dossier.libelleProcedure}
                {/* TODO: info tick */}
              </Typography>
              <Typography
                component="h1"
                sx={{
                  color: "white",
                  fontSize: "body1.fontSize",
                  fontWeight: "fontWeightBold",
                  [theme.breakpoints.up("md")]: {
                    color: "grey.900",
                    fontSize: "h2.fontSize",
                  },
                }}
              >
                {dossier.titre}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              useFlexGap
              spacing={1}
              alignItems="center"
              flexWrap="wrap"
              sx={{
                justifyContent: "flex-start",
                mt: 3,
                [theme.breakpoints.up("md")]: {
                  justifyContent: "center",
                },
              }}
            >
              {status && <StatusChip size="small" {...statusInfo[status]} />}
              {/* <StatusChip size="small" status="refused" label="Abrogé" />
              <StatusChip size="small" status="refused" label="Rejeté" />
              <StatusChip size="small" status="dropped" label="Non-soutenu" />
              <StatusChip size="small" status="review" label="1e lecture AN" />
              <StatusChip size="small" status="validated" label="Promulgué" /> */}
              {dossier.themes_labels?.map((label: string) => (
                <LabelChip
                  key={label}
                  size="small"
                  label={label}
                  icon={<EnergyIcon />}
                />
              ))}

              {/* <LabelChip size="small" label="Label" />
              <LabelChip size="small" label="Label" onDelete={() => {}} />
              <LabelChip size="small" label="Label" onDelete={() => {}} /> */}
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </>
  );
};
