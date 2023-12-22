import React from "react";

import { HeroSection } from "@/components/folders/HeroSection";
import Tabs from "./Tabs";
import { getDossier } from "@/repository/database";

export default async function Dossier({
  children,
  params,
}: React.PropsWithChildren<{
  params: { legislature: string; id: string };
}>) {
  const dossierData = await getDossier(params.legislature, params.id);

  return (
    <>
      <HeroSection dossier={dossierData?.dossier} acts={dossierData?.acts} />
      <Tabs />
      {children}
    </>
  );
}
