import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { THEMES } from "../const";

export type DossierFilterState = {
  theme: string;
};

type FilterProps = {
  filterState: DossierFilterState;
  setFilterState: React.Dispatch<React.SetStateAction<DossierFilterState>>;
};

export const Filter = (props: FilterProps) => {
  const { filterState, setFilterState } = props;

  return (
    <TextField
      select
      size="small"
      label="Thème"
      value={filterState.theme}
      onChange={(event) => {
        setFilterState((prev) => ({
          ...prev,
          theme: event.target.value,
        }));
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
