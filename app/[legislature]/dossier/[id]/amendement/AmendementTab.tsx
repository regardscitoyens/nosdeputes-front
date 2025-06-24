"use client";
import React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { FilterContainer } from "@/components/FilterContainer";

import { Filter } from "./Filter";
import { useFilterSearch } from "./useFilter";
import AmendementList from "./AmendementList";
import { Typography } from "@mui/material";

import { ReturnedDossier } from "@/data/getDossier";
import { ReturnedDocument } from "@/data/getDocument";

export type AmendementTabProps = {
  dossier: ReturnedDossier;
  documents: (ReturnedDocument | null)[];
};

export const AmendementTab = ({ dossier, documents }: AmendementTabProps) => {
  const documentsAvecAmendement = React.useMemo(
    () =>
      documents.filter((document): document is ReturnedDocument =>
        Boolean(document && document._count.amendements)
      ),
    [documents]
  );

  // const [numero, handleNumero] = useFilterSearch("numero");
  // const [document, handleDocument] = useFilterSearch(
  //   "document",
  //   documentsAvecAmendement[0]?.uid
  // );
  // const [depute, handleDepute] = useFilterSearch("depute");
  // const [status, handleStatus] = useFilterSearch("status");

  const [numero, handleNumero] = React.useState('');
  const [document, handleDocument] = React.useState(
    documentsAvecAmendement[0]?.uid
  );
  const [depute, handleDepute] = React.useState('');
  const [status, handleStatus] = React.useState('');

  return (
    <Container
      sx={{
        pt: 3,
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        gap: 5,
      }}
    >
      <Stack spacing={3} useFlexGap flex={2}>
        <FilterContainer>
          <Filter
            numero={numero}
            handleNumero={handleNumero}
            selectedDocument={document}
            setSelectedDocument={handleDocument}
            dossier={dossier}
            documents={documentsAvecAmendement}
            depute={depute}
            handleDepute={handleDepute}
            status={status}
            handleStatus={handleStatus}
          />
        </FilterContainer>
      </Stack>
      <Stack spacing={3} useFlexGap flex={8} sx={{ minWidth: 0 }}>
        {/* <Typography variant="h2" fontWeight="bold" fontFamily="Raleway">
          {flattenAmendements?.length ?? 0} Amendements
        </Typography> */}
        <AmendementList
          numero={numero}
          selectedDocument={document}
          depute={depute}
          status={status}
        />
      </Stack>
    </Container>
  );
};
