import React from "react";

import Image from "next/image";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchBar from "./SearchBar";
import FloatingIcons from "./FloatingIcons";

const HeroSection = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 7,
      }}
    >
      <Typography variant="body2">
        Bienvenu sur le nouveau site NosDéputés.fr
      </Typography>
      <Box
        sx={{
          minHeight: "630px", // picture height
          maxWidth: "1088px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 5,
          backgroundImage: "url(/background.jpg)",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <FloatingIcons />
        <Typography
          variant="h1"
          fontWeight="bold"
          sx={{ mb: 3, maxWidth: 700, lineHeight: "37px" }}
        >
          Tout comprendre au travail de vos représentants à l&apos;Assemblée
          Nationale
        </Typography>
        <Typography
          variant="caption"
          fontWeight="light"
          sx={{ maxWidth: 500, mb: 6 }}
          component="p"
        >
          NosDéputés met en valeur l&apos;activité parlementaire des députés de
          l&apos;Assemblée nationale Française en synthétisant les différentes
          activités législatives et de contrôle du gouvernement des élus de la
          nation.
        </Typography>

        <SearchBar />
      </Box>
      <div>
        <Image
          src="/FranceMapIcon.png"
          alt=""
          height={30}
          width={30}
          style={{ display: "inline-block", marginRight: 8 }}
        />
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{ display: "inline-block" }}
        >
          Ou consultez la carte des circonscriptions
        </Typography>
      </div>
    </Box>
  );
};

export default HeroSection;
