import React from "react";
import { Button } from "../src/components/ui/button";
import Link from "next/link";

const QuestionCard = ({ question }: { question: any }) => {
  return (
    <div className="shadow-lg bg-gray-200 hover:translate-y-1 rounded p-4 transition-all duration-500">
      <div className="flex flex-col gap-2">
        <div className="">
          <h1 className="text-xl font-semibold">{question.title}</h1>
          <span className="text-gray-500 text-sm">
            {question.difficulty == "EASY"
              ? "Easy question for beginers"
              : question.difficulty == "MEDIUM"
                ? "Medium question for intermediate"
                : "Hard question for Advanced"}
          </span>
        </div>
        <div className=" pb-1">
          <div className="flex justify-between text-sm text-gray-500 font-normal">
            <h1>Difficulty</h1>
            <span className="">Submissions</span>
          </div>
          <div className="flex justify-between text-sm text-gray-800 font-normal">
            <h1>{question.difficulty}</h1>
            <span className="">{question.solved}</span>
          </div>
        </div>
        <Link href={`/question/${question.id}`}>
          <Button className="rounded cursor-pointer">Solve</Button>
        </Link>
      </div>
    </div>
  );
};

export default QuestionCard;
