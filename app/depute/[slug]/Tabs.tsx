"use client";

import { useSelectedLayoutSegment } from "next/navigation";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Link from "next/link";

export default function DeputeTabs({ slug }: { slug: string }) {
  const segment = useSelectedLayoutSegment();

  return (
    <Tabs value={segment ?? "activites"} variant="scrollable">
      <Tab
        value="activites"
        label="Activités"
        component={Link}
        href={`/depute/${slug}/`}
      />
      <Tab
        value="travaux"
        label="Travaux"
        component={Link}
        href={`/depute/${slug}/travaux`}
      />
      <Tab
        value="amendements"
        label="Amendements"
        component={Link}
        href={`/depute/${slug}/amendements`}
      />
      <Tab
        value="votes"
        label="Votes"
        component={Link}
        href={`/depute/${slug}/votes`}
      />
    </Tabs>
  );
}
