import TextField from "@mui/material/TextField";

type FilterProps = {
  numero: string;
  handleNumero: (numero: string) => void;
};

export const Filter = (props: FilterProps) => {
  const { numero, handleNumero } = props;

  return (
    <TextField
      size="small"
      label="Numero"
      value={numero}
      onChange={(event) => {
        handleNumero(event.target.value);
      }}
      variant="outlined"
      type="numeric"
    />
  );
};
