import * as React from "react";
import { DossierData } from "@/repository/database";
import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";

type FilterProps = Pick<DossierData, "documents" | "amendementCount"> & {
  numero: string;
  handleNumero: (numero: string) => void;
  selectedDocument: string;
  setSelectedDocument: (id: string) => void;
};

export const Filter = (props: FilterProps) => {
  const {
    numero,
    handleNumero,
    selectedDocument,
    setSelectedDocument,
    documents,
    amendementCount,
  } = props;

  return (
    <React.Fragment>
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
      <TextField
        select
        size="small"
        label="Document"
        value={selectedDocument}
        onChange={(event) => {
          setSelectedDocument(event.target.value);
        }}
        variant="outlined"
      >
        {Object.keys(amendementCount).map((documentId) => (
          <MenuItem key={documentId} value={documentId}>
            {documents[documentId].depotLibelle} ({amendementCount[documentId]})
          </MenuItem>
        ))}
      </TextField>
    </React.Fragment>
  );
};
