import * as React from "react";
import { getDossier } from "@/repository/database";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import { getDocumentURL } from "@/domain/dataTransform";

const ids = [
  "DLR5L16N47558",
  "DLR5L16N45912",
  "DLR5L16N45913",
  "DLR5L16N45914",
  "DLR5L16N45926",
  "DLR5L16N47568",
  "DLR5L16N47569",
  "DLR5L16N47571",
  "DLR5L16N45892",
  "DLR5L16N45893",
  "DLR5L16N45894",
  "DLR5L16N45895",
  "DLR5L16N45905",
  "DLR5L16N45906",
  "DLR5L16N45907",
  "DLR5L16N45908",
  "DLR5L16N45911",
  "DLR5L16N45927",
  "DLR5L16N45929",
  "DLR5L16N45931",
  "DLR5L16N45909",
  "DLR5L16N45910",
  "DLR5L16N45933",
  "DLR5L16N45988",
  "DLR5L16N46005",
  "DLR5L16N46006",
  "DLR5L16N46007",
  "DLR5L16N46008",
  "DLR5L16N46009",
  "DLR5L16N46026",
  "DLR5L16N46027",
  "DLR5L16N46046",
  "DLR5L16N45915",
  "DLR5L16N45916",
  "DLR5L16N45917",
  "DLR5L16N45918",
  "DLR5L16N46049",
  "DLR5L16N46057",
  "DLR5L16N46058",
  "DLR5L16N45919",
  "DLR5L16N45920",
  "DLR5L16N45921",
  "DLR5L16N45930",
  "DLR5L16N46059",
  "DLR5L16N45932",
  "DLR5L16N45934",
  "DLR5L16N45935",
  "DLR5L16N45936",
  "DLR5L16N45939",
  "DLR5L16N45940",
];

async function getDocuments() {
  const rep = [];
  for (let i = 0; i < ids.length; i += 1) {
    const d = await getDossier("16", ids[i]);
    // console.log(d?.documents);
    if (d?.documents) {
      Object.values(d?.documents).forEach((doc) => rep.push(doc));
    }
  }
  return rep;
}
export default async function Page() {
  const documents = await getDocuments();
  //   console.log(documents);

  documents.forEach((doc) => {
    const url = getDocumentURL(doc);

    console.log(
      `${doc.uid}\t${doc.titrePrincipalCourt}\t${
        url ?? "no data"
      }\t${JSON.stringify(doc)}`
    );
  });
  return (
    <div>
      {documents.map((doc) => {
        const url = getDocumentURL(doc);

        return (
          <Accordion key={doc.uid}>
            <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {doc.titrePrincipalCourt} ({doc.uid})
                <br />
                <p style={{ color: "blue" }}>
                  {url ? (
                    <a href={url} target="_blank">
                      {url}
                    </a>
                  ) : (
                    "no url"
                  )}
                </p>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <pre>{JSON.stringify(doc, null, 2)}</pre>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
