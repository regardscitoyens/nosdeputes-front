import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import TuneIcon from "@mui/icons-material/Tune";

import { MinusIcon } from "@/icons/MinusIcon";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Paper } from "@mui/material";

export const FilterContainer = ({
  children,
  disableCollapse: disableCollapseProps,
}: React.PropsWithChildren<{ disableCollapse?: boolean }>) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const disableCollapse =
    disableCollapseProps === undefined ? isDesktop : disableCollapseProps;

  if (disableCollapse) {
    return (
      <Paper sx={{ px: 2, py: 1.5, bgcolor: "grey.50" }} elevation={0}>
        <Stack direction="row" sx={{ mb: 2 }}>
          <TuneIcon />
          <Typography sx={{ ml: 1 }}>Filter</Typography>
        </Stack>
        <Stack
          direction="column"
          spacing={2}
          sx={{ [".MuiInputBase-root"]: { bgcolor: "white" } }}
        >
          {children}
        </Stack>
      </Paper>
    );
  }
  return (
    <Accordion elevation={0} disableGutters defaultExpanded color="secondary">
      <AccordionSummary
        expandIcon={<MinusIcon sx={{ fontSize: "10px" }} />}
        aria-controls="commission-content"
        id="commission-header"
      >
        <TuneIcon />
        <Typography sx={{ ml: 1 }}>Filter</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack
          direction="column"
          spacing={2}
          sx={{ [".MuiInputBase-root"]: { bgcolor: "white" } }}
        >
          {children}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
