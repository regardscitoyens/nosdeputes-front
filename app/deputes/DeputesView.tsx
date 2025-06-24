"use client";
import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";

import Link from "next/link";

import DeputeCard from "@/components/folders/DeputeCard";
import { groupDeputes } from "./groupDeputes";
import CircleDiv from "@/icons/CircleDiv";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Acteur, Mandat, Organe } from "@prisma/client";
import { DeputeFilterProps } from "./DeputesFilter";

function GroupPolitiqueHeader({
  itemKey,
  group,
  nbDeputes,
}: {
  itemKey: string;
  nbDeputes: number;
  group: Organe;
}) {
  return (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`${itemKey}-content`}
      id={`${itemKey}-header`}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <CircleDiv color={group.couleurAssociee ?? "gray"} />
        <Typography>
          {group.libelle} ({group.libelleAbrev}) - {nbDeputes}{" "}
          {nbDeputes > 1 ? "deputés" : "deputé"}
        </Typography>
      </Stack>
    </AccordionSummary>
  );
}

function NameHeader({
  itemKey,
  nbDeputes,
}: {
  itemKey: string;
  nbDeputes: number;
}) {
  return (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`${itemKey}-content`}
      id={`${itemKey}-header`}
    >
      <Typography>
        {itemKey} - {nbDeputes} {nbDeputes > 1 ? "deputés" : "deputé"}
      </Typography>
    </AccordionSummary>
  );
}

function Deputes({
  deputes,
  groups,
  grouping,
}: {
  deputes: (Acteur & { mandatPrincipal?: Mandat })[];
  groups: Record<string, Organe>;
  grouping: "groupPolitique" | "alphabetique";
}) {
  return (
    <Box
      sx={{
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        rowGap: 1.5,
        columnGap: 4,
      }}
    >
      {deputes
        .sort((a, b) =>
          `${a.prenom} ${a.nom}`.localeCompare(`${b.prenom} ${b.nom}`)
        )
        .map((depute) => {
          const {
            uid,
            urlImage,
            nom,
            prenom,
            slug,
            groupeParlementaireUid,
            mandatPrincipal,
          } = depute;

          const groupeParlementaire =
            groupeParlementaireUid && groups[groupeParlementaireUid];
          return (
            <DeputeCard
              key={uid}
              slug={slug}
              prenom={prenom}
              nom={nom}
              urlImage={urlImage}
              secondaryText={
                grouping === "groupPolitique"
                  ? `${mandatPrincipal?.numCirco}e Circ ${mandatPrincipal?.departement}`
                  : undefined
              }
              group={
                grouping === "groupPolitique"
                  ? undefined
                  : !mandatPrincipal || mandatPrincipal.dateFin !== null
                  ? {
                      color: "black",
                      fullName: "mandat terminé",
                      shortName: "",
                    }
                  : groupeParlementaire &&
                    groupeParlementaire.couleurAssociee !== null
                  ? {
                      color: groupeParlementaire.couleurAssociee,
                      fullName: groupeParlementaire.libelle,
                      shortName: groupeParlementaire.libelleAbrege,
                    }
                  : undefined
              }
              isFullCardLink
            />
          );
        })}
    </Box>
  );
}

interface DeputesViewProps extends DeputeFilterProps {
  numeroDepartement: string | null;
}

export default function DeputesView({
  deputes,
  uidPerGroup,
  uidPerNom,
  groups,
  numeroDepartement,
}: DeputesViewProps) {
  const [grouping, setGrouping] = React.useState<
    "groupPolitique" | "alphabetique"
  >("groupPolitique");
  const [search, setSearch] = React.useState("");

  const uidGroup = grouping === "groupPolitique" ? uidPerGroup : uidPerNom;

  const AccordionHeader =
    grouping === "groupPolitique" ? GroupPolitiqueHeader : NameHeader;

  const deputesActifs = Object.values(deputes).filter(
    (depute) =>
      depute.mandatPrincipal && depute.mandatPrincipal.dateFin === null
  ).length;
  const deputesMandatFinit = Object.values(deputes).filter(
    (depute) =>
      !depute.mandatPrincipal || depute.mandatPrincipal.dateFin !== null
  ).length;

  const filterIsActive = !!search || numeroDepartement !== null;
  return (
    <Stack direction="column">
      <Typography variant="h3" component="h1" fontWeight="bold">
        {deputesActifs} Députés
      </Typography>
      <Typography fontWeight="light">
        plus {deputesMandatFinit} députés hors mandat
      </Typography>
      <Stack direction="row" spacing={2} sx={{ my: 2 }}>
        <Input
          fullWidth
          startAdornment={<SearchOutlinedIcon />}
          placeholder="Recherche"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Button
          startIcon={<SortOutlinedIcon />}
          sx={{ flexShrink: 0 }}
          onClick={() => {
            setGrouping((p) =>
              p === "groupPolitique" ? "alphabetique" : "groupPolitique"
            );
          }}
        >
          {grouping === "groupPolitique"
            ? "Par group parlementaire"
            : "Par ordre alphabetique"}
        </Button>
      </Stack>
      {Object.keys(uidGroup)
        .sort()
        .map((key) => {
          const deputesUids = uidGroup[key];
          const filteredDeputes = deputesUids
            .map((uid) => deputes[uid])
            .filter(({ nom, prenom, mandatPrincipal }) => {
              return (
                (!search ||
                  `${nom} ${prenom} ${mandatPrincipal?.departement ?? ""}`
                    .toLowerCase()
                    .includes(search.toLowerCase())) &&
                (numeroDepartement === null ||
                  mandatPrincipal?.numDepartement === numeroDepartement)
              );
            });

          if (filteredDeputes.length === 0) {
            return null;
          }

          return (
            <Accordion
              key={key}
              disableGutters
              elevation={0}
              slotProps={{ transition: { unmountOnExit: true } }}
            >
              <AccordionHeader
                key={key}
                itemKey={key}
                group={groups[key]}
                nbDeputes={filteredDeputes.length}
              />
              <AccordionDetails>
                <Deputes
                  deputes={filteredDeputes}
                  groups={groups}
                  grouping={grouping}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
    </Stack>
  );
}
