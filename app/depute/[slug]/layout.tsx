import React from "react";
import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import CircleDiv from "@/icons/CircleDiv";
import Mandats from "./Mandats";
import Contacts from "./Contacts";
import Tabs from "./Tabs";
import InfoPersonelles from "./InfoPersonelles";
import { getActeurBySlug } from "@/data/getActeurBySlug";

export default async function Page({
  children,
  params,
}: {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}) {
  const { slug } = await params;
  const depute = await getActeurBySlug(slug);

  if (depute === null) {
    return <p>Deputé Not Found</p>;
  }

  const circonscription = depute.mandatPrincipal;

  return (
    <Box sx={{ maxWidth: "1024px", mx: "auto", my: 5 }}>
      <Stack direction="row" justifyContent="space-between">
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Avatar
            sx={{ bgcolor: "grey.200", width: 100, height: 100, mr: 1 }}
            alt={`${depute.prenom} ${depute.nom}`}
            src={depute.urlImage ?? ""}
          >
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
                {circonscription.dateFin !== null && (
                  <>
                    <br />
                    Fin de mandat le{" "}
                    {new Date(circonscription.dateFin).toLocaleDateString(
                      "fr-FR"
                    )}
                  </>
                )}
              </Typography>
            )}

            {depute.groupeParlementaire && (
              // Deputes sans mandat n'ont plus d'organe associé
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <CircleDiv
                  color={depute.groupeParlementaire.couleurAssociee!}
                />{" "}
                <Typography sx={{ ml: 1 }} variant="body1" fontWeight="light">
                  {depute.groupeParlementaire.libelle} (
                  {depute.groupeParlementaire.libelleAbrev})
                </Typography>
              </Box>
            )}
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
          <InfoPersonelles acteurUid={depute.uid} depute={depute} />
          <Mandats acteurUid={depute.uid} />
          <Contacts acteurUid={depute.uid} />
        </Stack>

        <Stack spacing={3} flex={5} sx={{ minWidth: 0 }}>
          <Tabs slug={slug} />
          {children}
        </Stack>
      </Container>
    </Box>
  );
}
