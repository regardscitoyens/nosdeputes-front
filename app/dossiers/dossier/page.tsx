"use client";

import React from "react";

import { Layout } from "@/app/components/Layout";
import AdditionalInfoCard from "@/components/folders/AdditionalInfoCard";
import CommiteeCard from "@/components/folders/CommiteeCard";
import Hero from "@/components/folders/HeroSection";
import LegislativeDocuments from "@/components/folders/LegislativeDocuments";
import TextStructureCard from "@/components/folders/TextStructureCard";
import TimelineCard from "@/components/folders/TimelineCard";
import SpeakingTimeCard from "@/components/folders/SpeakingTimeCard";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useTheme } from "@mui/material";

export default function Dossier() {
  const theme = useTheme();
  const tabNumber = 0;

  return (
    <Layout>
      <Hero />
      <Box
        mb={2}
        display="flex"
        justifyContent="center"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={"value"}
          onChange={() => console.log("Should set selected tab value")}
          aria-label="basic tabs example"
          variant="scrollable"
        >
          <Tab
            label={"Aperçu"}
            sx={{
              color: "grey.900",
              fontWeight: "fontWeightRegular",
              borderBottom: "2px solid #000000",
            }}
          />
          <Tab
            label={"Débats"}
            disabled
            sx={{
              color: "grey.900",
              fontWeight: "fontWeightRegular",
            }}
          />
          <Tab
            label={"Amendements"}
            disabled
            sx={{
              color: "grey.900",
              fontWeight: "fontWeightRegular",
            }}
          />
          <Tab
            label={"Votes"}
            disabled
            sx={{
              color: "grey.900",
              fontWeight: "fontWeightRegular",
            }}
          />
        </Tabs>
      </Box>

      <div
        role="tabpanel"
        hidden={tabNumber !== 0}
        id="preview"
        aria-labelledby="aperçu"
      >
        {tabNumber === 0 && (
          <Container
            maxWidth="lg"
            sx={{
              pb: 2,
              px: 2,
              display: "flex",
              flexDirection: {
                xs: "column-reverse",
                md: "row",
              },
              gap: 5,
              flexWrap: "wrap-reverse",
            }}
          >
            <Stack spacing={3} flex={2}>
              <CommiteeCard />
              <AdditionalInfoCard />
              <LegislativeDocuments />
            </Stack>
            <Stack spacing={3} flex={5}>
              <SpeakingTimeCard />
              <TimelineCard />
              <TextStructureCard />
            </Stack>
          </Container>
        )}
      </div>
    </Layout>
  );
}
