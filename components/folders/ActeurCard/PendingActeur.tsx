import * as React from "react";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export function PendingActeur() {
  return (
    <Box
      sx={[
        {
          px: 1.5,
          py: 0.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
      ]}
    >
      <Box sx={{ display: "flex", minWidth: 0 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: 1,
            minWidth: 0,
          }}
        >
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton variant="circular" width={10} height={10} />
            <Skeleton variant="text" sx={{ fontSize: "0.7rem" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
