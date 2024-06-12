"use client";
import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type Debat = {
  uid: string;
  libelleCourtLieu: string | null;
  libelleLongLieu: string | null;
  timestampDebut: Date;
  compteRenduRef: string;
};

type DebateFilterBarProps = {
  debatIndex: number;
  setDebateRef: (newRef: string) => void;
  debats: Debat[];
};

export const DebateFilterBar = (props: DebateFilterBarProps) => {
  const { debatIndex, setDebateRef, debats } = props;

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
          <Select
            value={debats[debatIndex]?.uid}
            onChange={(e) => setDebateRef(e.target.value as string)}
            displayEmpty
            sx={{ flex: 1 }}
          >
            {debats.map(
              (
                { uid, libelleCourtLieu, libelleLongLieu, timestampDebut },
                index
              ) => {
                return (
                  <MenuItem key={uid} value={uid}>
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
                      {timestampDebut.toLocaleString("fr-FR", {
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
              onClick={() => setDebateRef(debats[debatIndex - 1]?.uid)}
              disabled={debatIndex <= 0}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => setDebateRef(debats[debatIndex + 1]?.uid)}
              disabled={debatIndex >= debats.length - 1}
            >
              <ArrowForwardIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
