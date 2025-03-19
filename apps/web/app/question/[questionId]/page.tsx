import { getQuestion } from 'app/db/question';
import React from 'react'

const page = async({params}:{params:{questionId: string}}) => {
  const questionId = params.questionId;
  const question =await getQuestion(questionId);
  console.log("QUESTION ID IS", question);

  return (
    <section className="py-12 px-6 md:px-4 min-h-screen">
      <div className='bg-neutral-300 px-4 py-2'>
         kfdfj {questionId}
      </div>
    </section>
  )
}

export default page