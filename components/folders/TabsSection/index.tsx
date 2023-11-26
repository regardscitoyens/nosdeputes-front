import React from "react";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

const TabsSection = () => {
  return (
    <>
      <Box
        mb={2}
        display="flex"
        justifyContent="center"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={"value"}
          onChange={() => console.log("change")}
          aria-label="basic tabs example"
        >
          <Tab label={"Aperçu".toUpperCase()} />
          <Tab label={"Débats".toUpperCase()} />
          <Tab label={"Amendements".toUpperCase()} />
          <Tab label={"Votes".toUpperCase()} />
          <Tab label={"Commission".toUpperCase()} />
        </Tabs>
      </Box>

      {/* <div value={value} index={0}>
        Item One
      </div>
      <div value={value} index={1}>
        Item Two
      </div>
      <div value={value} index={2}>
        Item Three
      </div> */}
    </>
  );
};

export default TabsSection;
