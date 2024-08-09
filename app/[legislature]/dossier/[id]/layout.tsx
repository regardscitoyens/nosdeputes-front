import React from "react";

import { HeroSection } from "@/components/folders/HeroSection";
import Tabs from "./Tabs";

import { getCurrentStatus, getDossier } from "./dataFunctions";

export default async function Dossier({
  children,
  params,
}: React.PropsWithChildren<{
  params: { legislature: string; id: string };
}>) {
  const { legislature, id } = params;
  const dossier = await getDossier(id);

  if (dossier === null) {
    return <p>Dossier not found</p>;
  }
  const { libelleProcedure, titre, theme, actesLegislatifs } = dossier;

  const status = getCurrentStatus(actesLegislatifs);

  return (
    <>
      <HeroSection
        libelleProcedure={libelleProcedure}
        titre={titre}
        theme={theme}
        status={status}
      />
      <Tabs legislature={legislature} dossierUid={id} />
      {children}
    </>
  );
}
