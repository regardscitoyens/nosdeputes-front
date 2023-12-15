import React from "react";

import { HeroSection } from "@/components/folders/HeroSection";
import Tabs from "./Tabs";

export default async function Dossier({ children }: React.PropsWithChildren) {
  return (
    <>
      <HeroSection />
      <Tabs />
      {children}
    </>
  );
}
