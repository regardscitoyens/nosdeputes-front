import React from "react";

import QuestionCard from "./QuestionCard";
import { getActeurBySlug } from "@/data/getActeurBySlug";
import { getQuestion } from "@/data/getQuestion";

export default async function Votes({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const depute = await getActeurBySlug(slug);

  if (depute === null) {
    return <p>Deputé inconnu</p>;
  }

  const questions = await getQuestion(depute.uid);

  if (questions.length === 0) {
    return <p>Aucune question trouvée.</p>;
  }

  return (
    <div>
      {questions?.map((question) => {
        return <QuestionCard key={question.uid} question={question} />;
      })}
    </div>
  );
}
