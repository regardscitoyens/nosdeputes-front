"use client";
import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ArrowLeftIcon } from "@/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "@/icons/ArrowRightIcon";

type Debat = {
  uid: string;
  libelleCourtLieu: string | null;
  libelleLongLieu: string | null;
  timestampDebut: Date;
};
type DebateFilterBarProps = {
  debatIndex: number;
  setDebatIndex: (newVal: number) => void;
  debats: Debat[];
};
export const DebateFilterBar = (props: DebateFilterBarProps) => {
  const { debatIndex, setDebatIndex, debats } = props;

  console.log(debatIndex);

  console.log({ debats });

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
            value={debatIndex}
            onChange={(e) => setDebatIndex(e.target.value as number)}
            displayEmpty
            sx={{ flex: 1 }}
          >
            {debats.map(
              (
                { uid, libelleCourtLieu, libelleLongLieu, timestampDebut },
                index
              ) => {
                return (
                  <MenuItem key={uid} value={index}>
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
              onClick={() => setDebatIndex(debatIndex - 1)}
              disabled={debatIndex <= 0}
            >
              <ArrowLeftIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => setDebatIndex(debatIndex + 1)}
              disabled={debatIndex >= debats.length - 1}
            >
              <ArrowRightIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
