"use client";
import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";

import Link from "next/link";

import DeputeCard from "@/components/folders/DeputeCard";
import { groupDeputes } from "./groupDeputes";
import CircleDiv from "@/icons/CircleDiv";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Acteur, Mandat } from "@/repository/types";
import { Input, TextField } from "@mui/material";

function GroupPolitiqueHeader({
  itemKey,
  group,
  nbDeputes,
}: {
  itemKey: string;
  nbDeputes: number;
  group: {
    color: string;
    libelle: string;
    libelle_short: string;
  };
}) {
  return (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`${itemKey}-content`}
      id={`${itemKey}-header`}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <CircleDiv color={group.color} />
        <Typography>
          {group.libelle} ({group.libelle_short}) - {nbDeputes}{" "}
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
  grouping,
}: {
  deputes: DeputesType[];
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
            nom,
            prenom,
            slug,
            dateFin,
            group_color,
            group_libelle,
            group_libelle_short,
            numCirco,
            departement,
          } = depute;
          return (
            <DeputeCard
              key={uid}
              prenom={prenom}
              nom={nom}
              secondaryText={
                grouping === "groupPolitique"
                  ? `${numCirco}e Circ ${departement}`
                  : undefined
              }
              group={
                grouping === "groupPolitique"
                  ? undefined
                  : dateFin !== null
                  ? {
                      color: "black",
                      fullName: "mandat terminé",
                      shortName: "",
                    }
                  : group_color !== null
                  ? {
                      color: group_color,
                      fullName: group_libelle,
                      shortName: group_libelle_short,
                    }
                  : undefined
              }
              component={Link}
              href={`/depute/${slug}`}
              sx={{
                "&:hover": { bgcolor: "grey.50" },
              }}
            />
          );
        })}
    </Box>
  );
}

type DeputesType = Acteur & Mandat;
export default function DeputesView({
  deputes,
  indexesPerGroup,
  indexesPerNom,
  groups,
}: { deputes: DeputesType[] } & ReturnType<typeof groupDeputes>) {
  const [grouping, setGrouping] = React.useState<
    "groupPolitique" | "alphabetique"
  >("groupPolitique");
  const [search, setSearch] = React.useState("");

  const indexGroup =
    grouping === "groupPolitique" ? indexesPerGroup : indexesPerNom;

  const AccordionHeader =
    grouping === "groupPolitique" ? GroupPolitiqueHeader : NameHeader;

  const deputesActifs = deputes.filter(
    (depute) => depute.dateFin === null
  ).length;
  const deputesMandatFinit = deputes.filter(
    (depute) => depute.dateFin !== null
  ).length;

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
      {Object.keys(indexGroup)
        .sort()
        .map((key) => {
          const deputesIndex = indexGroup[key];
          const filteredDeputes = deputesIndex
            .map((i) => deputes[i])
            .filter(({ nom, prenom, departement }) => {
              return (
                !search ||
                `${nom} ${prenom} ${departement}`
                  .toLowerCase()
                  .includes(search.toLowerCase())
              );
            });
          return (
            <Accordion key={key} disableGutters elevation={0}>
              <AccordionHeader
                key={key}
                itemKey={key}
                group={groups[key]}
                nbDeputes={filteredDeputes.length}
              />
              <AccordionDetails>
                <Deputes deputes={filteredDeputes} grouping={grouping} />
              </AccordionDetails>
            </Accordion>
          );
        })}
    </Stack>
  );
}
