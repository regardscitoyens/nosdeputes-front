import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import CardLayout from "@/components/folders/CardLayout";
import LinkIcon from "@/icons/LinkIcon";
import Link from "next/link";

const LegislativeDocuments = () => {
  return (
    <CardLayout title={"Documents législatifs"}>
      <Stack direction="column" spacing={2}>
        {Array.from(Array(10).keys()).map((link) => (
          <Stack key={link} direction="row" spacing={1} alignItems="center">
            <LinkIcon sx={{ fontSize: "14px" }} />
            <Link href="">
              <Typography variant="body2" fontWeight="bold">
                Lien vers {link}
              </Typography>
            </Link>
          </Stack>
        ))}
      </Stack>
    </CardLayout>
  );
};

export default LegislativeDocuments;
