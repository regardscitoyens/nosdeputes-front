"use client";

import React from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { HeroSection } from "@/components/folders/HeroSection";
import { PreviewTab } from "@/components/folders/PreviewTab";
import { DebateTab } from "@/components/folders/DebateTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function Dossier() {
  const [tabNumber, setTabNumber] = React.useState(0);

  return (
    <>
      <HeroSection />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={tabNumber}
          variant="scrollable"
          onChange={(_e, newValue) => setTabNumber(newValue)}
        >
          <Tab label="Aperçu" />
          <Tab label="Débats" />
          <Tab label="Amendements" />
          <Tab label="Votes" />
        </Tabs>
      </Box>

      {tabNumber === 0 && <PreviewTab />}
      {tabNumber === 1 && <DebateTab />}
      {tabNumber === 2 && <p>Amendements</p>}
      {tabNumber === 3 && <p>Votes</p>}
    </>
  );
}
