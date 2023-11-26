import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import StatusChip from "@/components/StatusChip";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";

const breadcrumbs = [
  <Link key="1" href="/">
    <Typography variant="caption" fontWeight="light" color="white">
      Accueil
    </Typography>
  </Link>,
  <Link key="2" href="/dossiers">
    <Typography variant="caption" fontWeight="light" color="white">
      Les derniers dossiers
    </Typography>
  </Link>,
  <Typography key="3" variant="caption" fontWeight="bold" color="white">
    Titre du texte de loi/dossier
  </Typography>,
];

const HeroSection = () => {
  return (
    <Box pb={10}>
      <Breadcrumbs
        // separator={<NavigateNextIcon fontSize="small" />}
        separator={">"}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Box
        height={270} // image height + 30px
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
      >
        <Box
          sx={{
            position: "absolute",
            top: 56, // navbar height
            left: 0,
            zIndex: -1,
            backgroundColor: "gainsboro",
            width: "100%",
            height: 240,
          }}
        />
        <Box
          px={3}
          py={4}
          width={680}
          borderRadius={1}
          sx={{ backgroundColor: "white" }}
        >
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Stack direction="column" spacing={2} alignItems="center">
              <Typography fontWeight="bold" variant="body2">
                Type de dossier
                {/* TODO: info tick */}
              </Typography>
              <Typography component="h1" variant="h3">
                Titre du texte de loi/dossier
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 3 }}
              alignItems="center"
            >
              <StatusChip status="validated" label="Lorem" />
              <StatusChip status="review" label="Ipsum" />
              <StatusChip status="refused" label="Dolor" />
              <StatusChip status="dropped" label="Sit" />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
