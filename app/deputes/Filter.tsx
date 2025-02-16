"use client";
import * as React from "react";
import { Autocomplete, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { departements } from "./structureCircos";

type FilterProps = {
  numeroDepartement: string | null;
  handleNumeroDepartement: (numeroDepartement: string | null) => void;
};

export const Filter = (props: FilterProps) => {
  const { numeroDepartement, handleNumeroDepartement } = props;

  const value = React.useMemo(
    () =>
      numeroDepartement === null
        ? null
        : departements.find((v) => v.numeroDepartement === numeroDepartement) ??
          null,
    [numeroDepartement]
  );

  return (
    <div>
      <Autocomplete
        disablePortal
        options={departements}
        isOptionEqualToValue={(option, value) =>
          option.numeroDepartement === value.numeroDepartement
        }
        value={value}
        onChange={(_, newValue) =>
          handleNumeroDepartement(newValue?.numeroDepartement ?? null)
        }
        groupBy={(option) => option.region}
        getOptionLabel={(option) =>
          `${option.nomDepartement} (${option.numeroDepartement})`
        }
        getOptionKey={(option) => option.numeroDepartement}
        
        renderInput={(params) => <TextField {...params} label="Département" />}
      />
    </div>
  );
};
