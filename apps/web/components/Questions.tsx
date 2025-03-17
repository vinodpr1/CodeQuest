import React from "react";
import QuestionCard from "./QuestionCard";

const Questions = () => {
  return ( 
<section className="bg-white dark:bg-gray-900 py-8 md:py-12 min-h-screen">
  <div className="container mx-auto px-4 md:px-6">
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">Popular Problems</h2>
      <p className="text-gray-500 dark:text-gray-400">
        Check out the most popular programming problems on Code100x.
      </p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(5).fill(5).map((problem, index) => (
        <QuestionCard 
        key={index}
        title="Startee end"
        id={1}
        startTime={5}
        endTime={7}
      />
      ))}
    </div>
  </div>
</section>
  )
};

export default Questions;


// import {
//     Card,
//     CardHeader,
//     CardTitle,
//     CardDescription,
//     CardContent,
//     CardFooter,
//   } from "@repo/ui/card";
//   import { getProblems } from "../app/db/problem";
//   import { PrimaryButton } from "./LinkButton";
  
//   export async function Problems() {
//     const problems = await getProblems();
  
//     return (
    
//     );
//   }
  