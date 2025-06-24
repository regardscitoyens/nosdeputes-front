"use client";
import React from "react";

import Stack from "@mui/material/Stack";

import AmendementCard from "@/components/folders/AmendementCard";
import { Acteur, Amendement, Organe } from "@prisma/client";
import { Button, Typography } from "@mui/material";
import { searchAmendement } from "@/data/searchAmendement";
import { unique } from "@/utils/unique";

export default function AmendementsList(props: {
  numero: string;
  selectedDocument: string;
  depute: string;
  status: string;
}) {
  const { numero, depute, status, selectedDocument } = props;

  const searchActivated =
    numero !== "" || selectedDocument !== "" || depute !== "" || status !== "";

  const [amendements, setAmendements] = React.useState<Amendement[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const fetchMoreAmendements = async () => {
    setIsLoading(true);
    const data = await searchAmendement({
      page: currentPage,
      documentRefUid: selectedDocument,
    });

    setIsLoading(false);
    setAmendements((prev) => [...prev, ...unique(data ?? [])]);
    setCurrentPage((prev) => prev + 1);
  };

  React.useEffect(() => {
    let isValid = true;

    setIsLoading(true);
    setCurrentPage(1);
    setAmendements([]);

    async function fetchInitialDossier() {
      const data = await searchAmendement({
        page: 1,
        documentRefUid: selectedDocument,
      });

      if (isValid) {
        setIsLoading(false);
        setAmendements(data ?? []);
        setCurrentPage(2);
      }
    }
    fetchInitialDossier();

    return () => {
      isValid = false;
    };
  }, [selectedDocument]);

  // const filteredAmendements = amendements
  //   .filter((amendement) => {
  //     if (status === "") {
  //       return true;
  //     }
  //     return (amendement.sortAmendement || amendement.etatLibelle) === status;
  //   })
  //   .filter((amendement) => {
  //     if (depute === "") {
  //       return true;
  //     }
  //     return amendement.acteurRefUid === depute;
  //   })
  //   .filter((amendement) => {
  //     if (numero === "") {
  //       return true;
  //     }
  //     if (amendement.numeroLong == null) {
  //       return false;
  //     }
  //     return amendement.numeroLong
  //       .toLowerCase()
  //       .startsWith(numero.toLowerCase());
  //   })
  //   .filter(
  //     ({ documentRefUid }) =>
  //       !selectedDocument || documentRefUid === selectedDocument
  //   )
  //   .sort((a, b) =>
  //     (a.numeroOrdreDepot ?? Number.POSITIVE_INFINITY) <
  //     (b.numeroOrdreDepot ?? Number.POSITIVE_INFINITY)
  //       ? -1
  //       : 1
  //   );

  if (isLoading) {
    <p>Loading ...</p>;
  }
  return (
    <Stack>
      {/* {searchActivated && (
        // <Typography>
        //   {filteredAmendements.length} correspondent à votre recherche
        // </Typography>
      )} */}
      {amendements.map((amendement) => (
        <AmendementCard
          amendement={amendement}
          acteurUid={amendement.acteurRefUid}
          key={amendement.uid}
        />
      ))}

      <Button onClick={fetchMoreAmendements}>Voir plus</Button>
    </Stack>
  );
}
