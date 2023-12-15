"use client";

import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { THEMES } from "../const";
import { useFilterState } from "./useFilter";

type FilterProps = {
  theme: string;
};

export const Filter = (props: FilterProps) => {
  const { theme } = props;

  const { handleThemes } = useFilterState();

  return (
    <TextField
      select
      size="small"
      label="Thème"
      value={theme}
      onChange={(event) => {
        handleThemes(event.target.value);
      }}
      variant="outlined"
    >
      <MenuItem value="">-</MenuItem>
      {THEMES.map((theme) => (
        <MenuItem key={theme} value={theme}>
          {theme}
        </MenuItem>
      ))}
    </TextField>
  );
};
