"use client";

import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { THEMES } from "../const";
import { useFilterState } from "./useFilter";

type FilterProps = {
  search: string;
  theme: string;
};

export const Filter = (props: FilterProps) => {
  const { theme, search } = props;

  const { handleThemes, handleSearch } = useFilterState();

  return (
    <>
      {/* <TextField
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
      </TextField> */}

      <TextField
        size="small"
        label="Search"
        value={search}
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
        variant="outlined"
      />
    </>
  );
};
