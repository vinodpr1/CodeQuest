import React from "react";
import QuestionCard from "./QuestionCard";
import { getQuestionsBulk } from "app/db/question";

const Questions = async () => {
  const questions = await getQuestionsBulk();
  if (!questions) return <h1>No questions found</h1>;

  return (
    <section className="bg-white dark:bg-gray-900 py-8 md:py-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Popular Problems</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Check out the most popular programming problems on CodeQuest.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Questions;
