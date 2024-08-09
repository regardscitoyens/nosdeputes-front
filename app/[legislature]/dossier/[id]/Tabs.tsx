"use client";

import { usePathname, useSelectedLayoutSegment } from "next/navigation";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Link from "next/link";

export default function DossiersTabs(props: {
  legislature: string;
  dossierUid: string;
}) {
  const { legislature, dossierUid } = props;
  const segment = useSelectedLayoutSegment();

  const rootPathName = `/${legislature}/dossier/${dossierUid}/`;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Tabs
        value={
          segment && ["debat", "amendement", "votes"].includes(segment)
            ? segment
            : ""
        }
        variant="scrollable"
      >
        <Tab value="" label="Aperçu" component={Link} href={rootPathName} />
        <Tab
          value="debat"
          label="Débats"
          component={Link}
          href={`${rootPathName}/debat`}
        />
        <Tab
          value="amendement"
          label="Amendements"
          component={Link}
          href={`${rootPathName}/amendement`}
        />
        <Tab
          value="votes"
          label="Votes"
          component={Link}
          href={`${rootPathName}/votes`}
        />
      </Tabs>
    </Box>
  );
}
