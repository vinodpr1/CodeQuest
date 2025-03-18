import fs from "fs";
import {prisma} from "../src/index";
import { LANGUAGES } from "@repo/common/language";

const basepath = process.env.MOUNT_PATH ?? "../../apps/problems"

const getFIleContent = async (path: string): Promise<string> =>{
   return new Promise((resolve, reject)=>{
     fs.readFile(path, "utf-8" ,(error, data)=>{
        if(error){
            reject(error);
        }
        resolve(data);
     });
   });
}

async function main( PROBLEM_SLUG: string, PROBLEM_TITLE: string ){
    const questionStatement =await getFIleContent(`${basepath}/${PROBLEM_SLUG}/Problem.md`);
    const question = await prisma.question.upsert({
        where:{
            slug: PROBLEM_SLUG
        },
        create:{
            title: PROBLEM_SLUG,
            slug: PROBLEM_SLUG,
            description: questionStatement,
        },
        update: {
            description: questionStatement,
        }
    });

    await Promise.all(
        LANGUAGES.map(async (lang)=>{
            const code = await getFIleContent(`${basepath}/${PROBLEM_SLUG}/boilerplate/function.${lang.monaco}`);
            await prisma.defaultCode.upsert({
                where:{
                    questionId_languageId: {
                      questionId: question.id,
                      languageId: lang.id
                    }, 
                },
                create:{
                   questionId: question.id,
                   languageId: lang.id, 
                   code: code,
                },
                update:{
                    code: code
                }
            })
        })
    );
   
}
main(process.env.PROBLEM_SLUG!, process.env.PROBLEM_TITLE!);