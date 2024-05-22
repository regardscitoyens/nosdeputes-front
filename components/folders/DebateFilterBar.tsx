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

export const DebateFilterBar = () => {
  const [placeholderValue, setPlaceholderValue] = React.useState("1");

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
            value={placeholderValue}
            onChange={(e) => setPlaceholderValue(e.target.value)}
            displayEmpty
            sx={{ flex: 1 }}
          >
            <MenuItem value={1}>
              <Typography
                variant="caption"
                sx={{
                  textTransform: {
                    xs: "uppercase",
                    md: "none",
                  },
                }}
              >
                Séance en hémicycle du Jeudi 22 Juin 2023 à 9h00
              </Typography>
            </MenuItem>
            <MenuItem value={2}>
              <Typography variant="caption">
                Séance en hémicycle du Vendredi 23 Juin 2023 à 9h00
              </Typography>
            </MenuItem>
            <MenuItem value={3}>
              <Typography variant="caption">
                Séance en hémicycle du Samedi 24 Juin 2023 à 9h00
              </Typography>
            </MenuItem>
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
            <IconButton size="small">
              <ArrowLeftIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <ArrowRightIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
