import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiLink from "@mui/material/Link";
import InfoIcon from "@/icons/InfoIcon";
import Link from "next/link";
import Signataires from "../../../../components/folders/Signataires";
import { prisma } from "@/prisma";

async function getDocumentsUnCached(ids: string[]) {
  if (ids.length === 0) {
    return [];
  }

  try {
    return prisma.document.findMany({
      where: { uid: { in: ids } },
      include: {
        _count: {
          // TODO: Check with HEnry if the naming `amendements` make sens for amendements
          select: { amendementsCommission: true, amendements: true },
        },
        coSignataires: {
          include: { acteurRef: { include: { groupeParlementaire: true } } },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching commission:", error);
    throw error;
  }
}

const getDocuments = React.cache(getDocumentsUnCached);

export const AdditionalInfoCard = async (props: {
  documentIds: string[];
  legislature: string;
  dossierUid: string;
}) => {
  const data = await getDocuments(props.documentIds);

  const documentsWithAmendements = data.filter(
    (document) =>
      document._count.amendements + document._count.amendementsCommission > 0
  );
  return (
    <Accordion elevation={0} disableGutters defaultExpanded color="secondary">
      <AccordionSummary
        aria-controls="additional-info-content"
        id="additional-info-header"
      >
        <Typography>Informations complémentaires</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2}>
          {documentsWithAmendements.length > 0 && (
            <React.Fragment>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="body2" fontWeight="light">
                  Amendements
                </Typography>
                <InfoIcon sx={{ fontSize: "14px" }} />
              </Stack>
              <Stack direction="column" spacing={1}>
                {documentsWithAmendements.map(({ uid, titrePrincipalCourt, _count }) => (
                  <div key={uid}>
                    <Typography variant="body2" fontWeight="bold">
                      {_count.amendementsCommission + _count.amendements}{" "}
                      amendements
                    </Typography>
                    <MuiLink
                      variant="body2"
                      fontWeight="light"
                      component={Link}
                      href={`/${props.legislature}/dossier/${props.dossierUid}/amendement?document=${uid}`}
                    >
                      {titrePrincipalCourt}
                    </MuiLink>
                  </div>
                ))}
              </Stack>
            </React.Fragment>
          )}

          <Signataires
            signataires={data
              .flatMap((doc) =>
                doc.coSignataires.map((coSign) => coSign.acteurRef)
              )
              .filter((acteur) => acteur !== null)}
            limite={3}
          />

          {/* <Stack direction="column" spacing={1}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography variant="body2" fontWeight="light">
                Orateur (TODO)
              </Typography>
              <InfoIcon sx={{ fontSize: "14px" }} />
            </Stack>
            <DeputyPreview />
            <DeputyPreview />
            <DeputyPreview />
            <DeputyPreview />
            <Button fullWidth variant="contained" color="secondary">
              Tous les orateurs (7)
            </Button>
          </Stack>*/}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
