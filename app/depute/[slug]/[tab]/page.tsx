import React from "react";
import Amendements from "./Amendements";
import Votes from "./Votes";
import Travaux from "./Travaux";
import Activites from "./Activites";

export default function Page({
  params,
}: {
  params: { slug: string; tab: string };
}) {
  switch (params.tab) {
    case "amendements":
      return <Amendements deputeSlug={params.slug} />;
    case "votes":
      return <Votes deputeSlug={params.slug} />;
    case "travaux":
      return <Travaux deputeSlug={params.slug} />;
    default:
      return <Activites deputeSlug={params.slug} />;
  }
}
