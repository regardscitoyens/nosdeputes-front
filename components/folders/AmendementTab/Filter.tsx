import * as React from "react";
import { DossierData } from "@/repository/database";
import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AmendementTabProps } from ".";

const AVAILABLE_STATUS = [
  "Rejeté",
  "Irrecevable",
  "Non soutenu",
  "Tombé",
  "Retiré",
  "Irrecevable 40",
  "Adopté",
];
type FilterProps = Pick<DossierData, "documents" | "amendementCount"> &
  Pick<AmendementTabProps, "amendements"> & {
    numero: string;
    handleNumero: (numero: string) => void;
    selectedDocument: string;
    setSelectedDocument: (id: string) => void;
    depute: string;
    handleDepute: (id: string) => void;
    status: string;
    handleStatus: (id: string) => void;
  };

export const Filter = (props: FilterProps) => {
  const {
    numero,
    handleNumero,
    selectedDocument,
    setSelectedDocument,
    documents,
    amendementCount,
    depute,
    handleDepute,
    amendements,
    status,
    handleStatus,
  } = props;

  const deputes = React.useMemo(() => {
    const seenIds = new Set();
    return amendements
      .filter(({ acteur_uid, prenom, nom }) => {
        const seen = seenIds.has(acteur_uid);

        if (!seen) {
          seenIds.add(acteur_uid);
        }
        return !seen;
      })
      .map(({ acteur_uid, prenom, nom }) => ({ acteur_uid, prenom, nom }));
  }, [amendements]);

  return (
    <React.Fragment>
      <TextField
        size="small"
        label="Numero"
        variant="outlined"
        type="numeric"
        value={numero}
        onChange={(event) => {
          handleNumero(event.target.value);
        }}
      />
      <TextField
        select
        size="small"
        variant="outlined"
        label="Document"
        value={selectedDocument}
        onChange={(event) => {
          setSelectedDocument(event.target.value);
        }}
      >
        <MenuItem value="">Tout document</MenuItem>
        {Object.keys(amendementCount).map((documentId) => (
          <MenuItem key={documentId} value={documentId}>
            {documents[documentId].depotLibelle} ({amendementCount[documentId]})
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        size="small"
        variant="outlined"
        label="Auteur"
        value={depute}
        onChange={(event) => {
          handleDepute(event.target.value);
        }}
      >
        <MenuItem value="">Auteur</MenuItem>
        {deputes.map(({ acteur_uid, prenom, nom }) => (
          <MenuItem key={acteur_uid} value={acteur_uid}>
            {prenom} {nom}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        size="small"
        variant="outlined"
        label="Status"
        value={status}
        onChange={(event) => {
          handleStatus(event.target.value);
        }}
      >
        <MenuItem value="">Status</MenuItem>
        {AVAILABLE_STATUS.map((state) => (
          <MenuItem key={state} value={state}>
            {state}
          </MenuItem>
        ))}
      </TextField>
    </React.Fragment>
  );
};
