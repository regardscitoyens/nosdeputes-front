"use client";

import React from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import Hero from "@/components/folders/HeroSection";
import PreviewTab from "@/components/folders/PreviewTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function Dossier() {
  const [tabNumber, setTabNumber] = React.useState(0);

  return (
    <React.Fragment>
      <Hero />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          borderBottom: 1,
          borderColor: "divider",
          mb: 3,
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
      {tabNumber === 1 && <p>Débats</p>}
      {tabNumber === 2 && <p>Amendements</p>}
      {tabNumber === 3 && <p>Votes</p>}
    </React.Fragment>
  );
}
