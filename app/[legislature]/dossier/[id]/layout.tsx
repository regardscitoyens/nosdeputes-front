import React from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { HeroSection } from "@/components/folders/HeroSection";
import { PreviewTab } from "@/components/folders/PreviewTab";
import { DebateTab } from "@/components/folders/DebateTab";
import { getDossier } from "@/repository/database";
import Tabs2 from "./Tabs";

export default async function Dossier({ children }: React.PropsWithChildren) {
  return (
    <>
      <HeroSection />
      <Tabs2 />
      {children}
    </>
  );
}
