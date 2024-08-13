// import { getDeputeDocuments } from "@/repository/database";
import { Stack, Typography } from "@mui/material";
import React from "react";

export default async function Travaux(props: { deputeSlug: string }) {
  // const { depute, documents = [] } = await getDeputeDocuments(props.deputeSlug);

  // if (documents.length === 0) {
  return <p>Pas de documents trouvé.</p>;
  // }
  // return (
  //   <Stack>
  //     {documents.map((documents) => (
  //       <Typography key={documents.id}>
  //         {documents.titrePrincipalCourt}
  //       </Typography>
  //     ))}
  //   </Stack>
  // );
}
