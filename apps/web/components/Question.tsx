import React from "react";
import { QuestionStatement } from "./QuestionStatement";
import QuestionSubmitBar from "./QuestionSubmitBar";

const Question = ({ question }: { question: any }) => {
  return (
    <section className="px-6 md:px-4 flex flex-col min-h-screen">
      <div className="container pt-16 md:pt-20 mx-auto grid md:grid-cols-2 gap-8 md:gap-8 min-h-[95vh] mb-12">
        <div className="bg-neutral-200 rounded shadow-xl p-2">
          <div className="prose prose-stone dark:prose-invert">
            <QuestionStatement markdown={question.description} />
          </div>
        </div>
        <div className="bg-neutral-200 rounded shadow-xl p-2">
          <QuestionSubmitBar question={question} />
        </div>
      </div>
    </section>
  );
};

export default Question;
