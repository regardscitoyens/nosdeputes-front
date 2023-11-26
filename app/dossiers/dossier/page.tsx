"use client";

import { Layout } from "@/app/components/Layout";
import AdditionalInfoCard from "@/components/folders/AdditionalInfoCard";
import Hero from "@/components/folders/HeroSection";
import ContextCard from "@/components/folders/ContextCard";
import CommiteeCard from "@/components/folders/CommiteeCard";
import ForcesCard from "@/components/folders/ForcesCard";
import LegislativeDocuments from "@/components/folders/LegislativeDocuments";
import StatusChip from "@/components/StatusChip";
import SpeakingTimeCard from "@/components/folders/SpeakingTimeCard";
import TextStructureCard from "@/components/folders/TextStructureCard";
import TimelineCard from "@/components/folders/TimelineCard";

import Box from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import TabsSection from "@/components/folders/TabsSection";

export default function Dossier() {
  return (
    <Layout>
      <Hero />
      <Box alignSelf="center" pb={2} width={1024}>
        <TabsSection />
        <Stack direction="row" spacing={5}>
          <Stack spacing={3} flex={5}>
            <SpeakingTimeCard />
            <ContextCard />
            <ForcesCard />
            <TimelineCard />
            <TextStructureCard />
          </Stack>
          <Stack spacing={3} flex={2}>
            <CommiteeCard />
            <AdditionalInfoCard />
            <LegislativeDocuments />
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
}
