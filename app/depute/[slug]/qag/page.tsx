import React from "react";

import { prisma } from "@/prisma";
import QuestionCard from "./QuestionCard";

async function getDeputeQuestionsUnCached(slug: string) {
  try {
    return await prisma.acteur.findFirst({
      where: { slug },
      include: {
        questions: {
          include: {
            minIntRef: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(`Error fetching QAG from depute ${slug}:`, error);
    throw error;
  }
}

const getDeputeQuestions = React.cache(getDeputeQuestionsUnCached);

export default async function Votes({ params }: { params: { slug: string } }) {
  const deputeWithQuestions = await getDeputeQuestions(params.slug);
  
  if (!deputeWithQuestions) {
    return <p>Deputé inconnu</p>;
  }
  const { questions = [] } = deputeWithQuestions;
  return (
    <div>
      {questions?.map((question) => {
        return <QuestionCard key={question.uid} question={question} />;
      })}
    </div>
  );
}
