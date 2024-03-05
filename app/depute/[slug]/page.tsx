import React from "react";
import { getDepute } from "@/repository/database";
import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { FilterContainer } from "@/components/FilterContainer";
import DossierList from "@/components/folderHomePage/DossierList";

import CircleDiv from "@/icons/CircleDiv";
import Mandats from "./Mandats";
import Contacts from "./Contacts";

export default async function Page({ params }: { params: { slug: string } }) {
  const { depute, group, adresses, mandats } = await getDepute(params.slug);

  if (depute === undefined) {
    return <p>Deputé Not Found</p>;
  }

  const circonscription = mandats?.filter(
    (mandat) => mandat.dateFin === null && mandat.codeType === "ASSEMBLEE"
  )[0];

  const mandasEnCours = mandats?.filter((mandat) => mandat.dateFin === null);

  return (
    <Box sx={{ maxWidth: "1024px", mx: "auto", my: 5 }}>
      <Stack direction="row" justifyContent="space-between">
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Avatar sx={{ bgcolor: "grey.200", width: 100, height: 100, mr: 1 }}>
            {depute.prenom[0]}
            {depute.nom[0]}
          </Avatar>
          <Box>
            <Typography variant="h1" fontWeight="bold">
              {depute.prenom} {depute.nom}
            </Typography>

            {circonscription && (
              <Typography variant="body1" fontWeight="light">
                {circonscription.departement} ({circonscription.numDepartement})
                circonscription n°{circonscription.numCirco}
              </Typography>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                mt: 1,
              }}
            >
              <CircleDiv color={group.couleurAssociee} />{" "}
              <Typography sx={{ ml: 1 }} variant="body1" fontWeight="light">
                {group.libelle} ({group.libelleAbrev})
              </Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
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
          <Mandats mandats={mandasEnCours ?? []} />
          <Contacts adresses={adresses ?? []} />
        </Stack>
        {/* <Stack spacing={3} useFlexGap flex={2}>
          <FilterContainer>
            <Filter theme={searchParams.theme ?? ""} />
          </FilterContainer>
        </Stack>
        <Stack spacing={3} flex={5} sx={{ minWidth: 0 }}>
          <DossierList theme={searchParams.theme ?? ""} search="" />
        </Stack> */}
      </Container>

      {/* <pre>{JSON.stringify(depute, null, 2)}</pre>
      <pre>{JSON.stringify(group, null, 2)}</pre>
      <pre>{JSON.stringify(adresses, null, 2)}</pre> 
      <pre>{JSON.stringify(mandasEnCours, null, 2)}</pre>*/}
    </Box>
  );
}
