import * as React from "react";
import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AmendementTabProps } from "./AmendementTab";

const AVAILABLE_STATUS = [
  "Rejeté",
  "Irrecevable",
  "Non soutenu",
  "Tombé",
  "Retiré",
  "Irrecevable 40",
  "Adopté",
];
type FilterProps = AmendementTabProps & {
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
    depute,
    handleDepute,
    status,
    handleStatus,
  } = props;

  // const deputes = React.useMemo(() => {
  //   const seenIds = new Set();
  //   return documents
  //     .filter((amendement) => amendement != null)
  //     .filter(({ acteurRef }) => {
  //       if (!acteurRef) {
  //         return false;
  //       }

  //       const seen = seenIds.has(acteurRef.uid);
  //       if (!seen) {
  //         seenIds.add(acteurRef.uid);
  //       }

  //       return !seen;
  //     })

  //     .map(({ acteurRef }) => {
  //       const { uid, prenom, nom } = acteurRef!;
  //       return { uid, prenom, nom };
  //     });
  // }, [dossier]);

  return (
    <React.Fragment>
      {/* <TextField
        size="small"
        label="Numero"
        variant="outlined"
        type="numeric"
        value={numero}
        onChange={(event) => {
          handleNumero(event.target.value);
        }}
      /> */}
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
        {/* <MenuItem value="">Tout document</MenuItem> */}
        {documents
          .filter((document) => document !== null)
          .map((document) => (
            <MenuItem key={document.uid} value={document.uid}>
              {document.depotLibelle} ({document._count.amendements})
            </MenuItem>
          ))}
      </TextField>
      {/* <TextField
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
        {deputes?.map(({ uid, prenom, nom }) => (
          <MenuItem key={uid} value={uid}>
            {prenom} {nom}
          </MenuItem>
        ))}
      </TextField> */}
      {/* <TextField
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
      </TextField> */}
    </React.Fragment>
  );
};
