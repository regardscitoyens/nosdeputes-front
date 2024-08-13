"use client";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { usePathname, useRouter } from "next/navigation";
import React, { useTransition } from "react";

export type VotesState = {
  actUid?: string;
};

export const ActeSelector = (props: {
  acteUid: string;
  setActeUid: (newUid: string) => void;
  actes: { uid: string; codeActe: string }[];
}) => {
  const { actes, acteUid, setActeUid } = props;

  const acteIndex = actes.findIndex(({ uid }) => uid === acteUid);

  return (
    <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
      <Select
        value={acteUid}
        onChange={(event) => setActeUid(event.target.value)}
      >
        {actes.map((act) => (
          <MenuItem key={act.uid} value={act.uid}>
            {act.codeActe}
          </MenuItem>
        ))}
      </Select>
      <div>
        <Button
          onClick={() => setActeUid(actes[acteIndex - 1]?.uid)}
          disabled={acteIndex <= 0}
        >
          prev
        </Button>
        <Button
          onClick={() => setActeUid(actes[acteIndex + 1]?.uid)}
          disabled={acteIndex >= actes.length - 1 || acteIndex < 0}
        >
          next
        </Button>
      </div>
    </Stack>
  );
};
