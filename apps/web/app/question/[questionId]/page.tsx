import { getQuestion } from 'app/db/question';
import Question from 'components/Question';
import React from 'react'

const page = async({ params }:{ params: {  questionId: string; }}  ) => {
  const questionId = (await params).questionId;
  const question = await getQuestion(questionId);

  return (
   <main>
      <Question question={question}/>
   </main>
  )
}

export default page;
export const dynamic = "force-dynamic";