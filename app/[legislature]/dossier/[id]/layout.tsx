import React from "react";

import { HeroSection } from "@/components/folders/HeroSection";
import Tabs from "./Tabs";

import { getCurrentStatus } from "./dataFunctions";
import { getDossier } from "@/data/getDossier";

export default async function Dossier({
  children,
  params,
}: React.PropsWithChildren<{
  params: Promise<{ legislature: string; id: string }>;
}>) {
  const { legislature, id } = await params;
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
