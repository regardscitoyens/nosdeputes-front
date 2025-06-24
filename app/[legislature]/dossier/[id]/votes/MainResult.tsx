"use client";
import * as React from "react";

import { Scrutin } from "@prisma/client";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { VotesGroups } from "./VotesGroups";
import { VoteWithActeur } from "./votes.type";

export function MainResult(props: {
  scrutin: Scrutin & { votes: VoteWithActeur[] };
  setZoom: (zoome: "" | "depute" | "group") => void;
  zoom: string;
  vote: React.ReactNode;
}) {
  const { scrutin, setZoom, zoom } = props;
  return (
    <React.Fragment>
      <Tooltip title="Détail du vote solenel">
        <Box
          onClick={() => {
            setZoom("depute");
          }}
          sx={{
            ":hover": {
              cursor: "pointer",
            },
          }}
        >
          <Typography>Vote solenel</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              width: "100%",
              height: 10,
            }}
          >
            <Box sx={{ backgroundColor: "green", flexGrow: scrutin.pour }} />
            <Box sx={{ backgroundColor: "red", flexGrow: scrutin.contre }} />
            <Box
              sx={{ backgroundColor: "gray", flexGrow: scrutin.abstentions }}
            />
          </Box>
        </Box>
      </Tooltip>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: "green",
          }}
        />
        <Typography sx={{ color: "green" }}>{scrutin.pour} Pour</Typography>

        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: "red",
          }}
        />
        <Typography sx={{ color: "red" }}>{scrutin.contre} Contre</Typography>

        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: "gray",
          }}
        />
        <Typography sx={{ color: "gray" }}>
          {scrutin.abstentions} abstention
        </Typography>
      </Box>

      {/* <Dialog
        onClose={() => setZoom("")}
        open={zoom !== ""}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          <Tabs
            value={zoom}
            onChange={(event, newVal) => {
              setZoom(newVal);
            }}
            centered
            aria-label="basic tabs example"
          >
            <Tab
              value="depute"
              label="Deputés"
              id="tabpanel-depute"
              aria-controls="tabpanel-depute"
            />
            <Tab
              value="group"
              label="Groups"
              id="tabpanel-groups"
              aria-controls="tabpanel-groups"
            />
          </Tabs>
          <div
            role="tabpanel"
            hidden={zoom !== "depute"}
            id={`tabpanel-depute`}
            aria-labelledby={`tabpanel-depute`}
          >
            {zoom === "depute" && (
              <React.Suspense fallback={<div>test</div>}>
                <VotesDeputes votes={scrutin.votes} />
              </React.Suspense>
            )}
          </div>
          <div
            role="tabpanel"
            hidden={zoom !== "group"}
            id={`tabpanel-groups`}
            aria-labelledby={`tabpanel-groups`}
          >
            {zoom === "group" && <VotesGroups votes={scrutin.votes} />}
          </div>
        </DialogContent>
      </Dialog> */}
      {props.vote}
      {/* <React.Suspense fallback={<div />}>
        <VotesDeputes votes={scrutin.votes} />
      </React.Suspense> */}
    </React.Fragment>
  );
}
