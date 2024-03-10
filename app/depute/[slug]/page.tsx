import React from "react";
import Activites from "./[tab]/Activites";

export default function Page({
  params,
}: {
  params: { slug: string; tab: string };
}) {
  return <Activites deputeSlug={params.slug} />;
}
