import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import InfoIcon from "@/icons/InfoIcon";
import DeputeCard from "../../../../components/folders/DeputeCard";
import { prisma } from "@/prisma";

async function getCommissionsUnCached(ids: string[]) {
  if (ids.length === 0) {
    return [];
  }

  try {
    return prisma.organe.findMany({
      where: { uid: { in: ids } },
    });
  } catch (error) {
    console.error("Error fetching commission:", error);
    throw error;
  }
}

const getCommissions = React.cache(getCommissionsUnCached);

async function getRapporteursUnCached(ids: string[]) {
  if (ids.length === 0) {
    return [];
  }

  try {
    const rapporteurs = await prisma.rapporteur.findMany({
      where: { acteLegislatifRefUid: { in: ids } },
      include: {
        acteurRef: {
          include: {
            groupeParlementaire: true,
          },
        },
      },
    });
    return rapporteurs
      .filter((nomi) => nomi !== null)
      .map((nomi) => nomi.acteurRef);
  } catch (error) {
    console.error("Error fetching rapporteur:", error);
    throw error;
  }
}

const getRapporteurs = React.cache(getRapporteursUnCached);

interface CommissionsCardProps {
  fondIds: string[];
  avisIds: string[];
  fondNomination: string[];
  avisNomination: string[];
}

export const CommissionsCard = async ({
  fondIds,
  avisIds,
  fondNomination,
  avisNomination,
}: CommissionsCardProps) => {
  const commissionFond = await getCommissions(fondIds);
  const commissionAvis = await getCommissions(avisIds);

  const rapporteursFond = (await getRapporteurs(fondNomination)).filter(
    (rapporteur) => rapporteur !== null
  );
  const rapporteursAvis = (await getRapporteurs(avisNomination)).filter(
    (rapporteur) => rapporteur !== null
  );

  if (
    (!commissionFond || commissionFond.length === 0) &&
    (!commissionAvis || commissionAvis.length === 0) &&
    (!rapporteursFond || rapporteursFond.length === 0) &&
    (!rapporteursAvis || rapporteursAvis.length === 0)
  ) {
    return null;
  }

  return (
    <Accordion elevation={0} disableGutters defaultExpanded color="secondary">
      <AccordionSummary
        aria-controls="commission-content"
        id="commission-header"
      >
        <Typography>Commissions</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2}>
          {commissionFond && commissionFond.length > 0 && (
            <div>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="body2" fontWeight="light">
                  Commission saisie au fond
                </Typography>
                <InfoIcon sx={{ fontSize: "14px" }} />
              </Stack>
              {commissionFond.map((commission) => (
                <Typography
                  key={commission.uid}
                  variant="body2"
                  fontWeight="bold"
                  pb={2}
                >
                  {commission.libelleAbrege || commission.libelle}
                </Typography>
              ))}
            </div>
          )}
          {rapporteursFond && rapporteursFond.length > 0 && (
            <div>
              <Typography variant="body2" fontWeight="light" pb={1}>
                Rapporteur
              </Typography>
              {rapporteursFond.map((acteur) => {
                const { prenom, nom, slug, groupeParlementaire } = acteur;

                return (
                  <DeputeCard
                    key={acteur.uid}
                    prenom={prenom}
                    nom={nom}
                    slug={slug}
                    group={
                      groupeParlementaire && {
                        fullName: "",
                        shortName: groupeParlementaire?.libelleAbrev,
                        color: groupeParlementaire?.couleurAssociee,
                      }
                    }
                  />
                );
              })}
            </div>
          )}
          {commissionAvis && commissionAvis.length > 0 && (
            <div>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="body2" fontWeight="light">
                  Comission saisie pour avis
                </Typography>
                <InfoIcon sx={{ fontSize: "14px" }} />
              </Stack>
              {commissionAvis.map((commission) => (
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  pb={2}
                  key={commission.uid}
                >
                  {commission.libelleAbrege || commission.libelle}
                </Typography>
              ))}
            </div>
          )}
          {rapporteursAvis && rapporteursAvis.length > 0 && (
            <div>
              <Typography variant="body2" fontWeight="light" pb={1}>
                Rapporteur
              </Typography>
              {rapporteursAvis.map((acteur) => {
                const { prenom, nom, slug, groupeParlementaire } = acteur;

                return (
                  <DeputeCard
                    key={acteur.uid}
                    prenom={prenom}
                    nom={nom}
                    slug={slug}
                    group={
                      groupeParlementaire && {
                        fullName: "",
                        shortName: groupeParlementaire?.libelleAbrev,
                        color: groupeParlementaire?.couleurAssociee,
                      }
                    }
                  />
                );
              })}
            </div>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
