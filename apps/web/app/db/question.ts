import { prisma } from "@repo/db/prisma";

export async function getQuestion(questionId: string, eventId?: string){

    // get question by contest id implementation goes here
    if(eventId) {
      return null; 
    };

    try {
     const question = await prisma.question.findFirst({
         where:{
             id: questionId
         },
         include: {
            defaultcodes: true,
        },
     });
     return question;
    } catch (error) {
       console.log("error occured");
    }
 }


export async function getQuestionsBulk(){
   try {
    const questions = await prisma.question.findMany({
        where:{
            hidden: false
        }
    });
    return questions;
   } catch (error) {
      console.log("error occured");
   }
}