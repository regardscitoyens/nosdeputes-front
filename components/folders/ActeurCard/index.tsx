"use client";
import * as React from "react";

import { getActeur, ReturnedActeur } from "@/data/getActeur";
import { ActeurCardWithData, ActeurCardWithDataProps } from "./ActeurCard";
import { PendingActeur } from "./PendingActeur";

type ActeurCardProps<RootComponent extends React.ElementType = "div"> = Omit<
  ActeurCardWithDataProps<RootComponent>,
  "acteur"
> & { id: string };

export function ActeurCard(props: ActeurCardProps) {
  const { id, ...other } = props;
  const [acteur, setActeur] = React.useState<ReturnedActeur | null>(null);
  const [status, setStatus] = React.useState<"pending" | "error" | "done">(
    "pending"
  );

  React.useEffect(() => {
    setStatus("pending");
    let valid = true;
    getActeur(id)
      .then((data) => {
        if (valid) {
          setActeur(data);
          setStatus("done");
        }
      })
      .catch(() => {
        setStatus("error");
      });

    return () => {
      valid = false;
    };
  }, [id]);

  if (status === "pending") {
    return <PendingActeur />;
  }

  if (status === "error") {
    return null;
  }

  return <ActeurCardWithData acteur={acteur} {...other} />;
}

export default ActeurCard;
