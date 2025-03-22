import { prisma } from "@repo/db/prisma";
import { Session } from "inspector/promises";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Isubmission } from "@repo/common/types";
import { getFullQuestionDetails } from "app/lib/questionDetails";
import { AuthOptions } from "app/lib/auth";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(AuthOptions);
  if (!session?.user) {
    return NextResponse.json(
      {
        message: "Log in to submit a Question",
      },
      {
        status: 401,
      },
    );
  }

  const parsedSubmissionInput = Isubmission.safeParse(await req.json());
  if (!parsedSubmissionInput.success) {
    return NextResponse.json(
      {
        message: "Invalid input",
      },
      {
        status: 400,
      },
    );
  }

  const isValidQuestion = await prisma.question.findUnique({
    where: {
      id: parsedSubmissionInput.data.questionId,
    },
  });

  if (!isValidQuestion) {
    return NextResponse.json(
      {
        message: "Question not found",
      },
      {
        status: 404,
      },
    );
  }
  // console.log(isValidQuestion, parsedSubmissionInput);
  // now get all the input, output from the file system and try to get get the default code based upon question id and languageCode

  const fullQuestionDetails = await getFullQuestionDetails(
    isValidQuestion.slug,
    parsedSubmissionInput.data.languageId,
  );
  fullQuestionDetails.fullBoilerplateCode =
    fullQuestionDetails.fullBoilerplateCode.replace(
      "##USER_CODE_HERE##",
      parsedSubmissionInput.data.code,
    );
  console.log(fullQuestionDetails);

  // make a request to submit the problem to judge0 and subscribe a webHook

  return NextResponse.json(
    {
      message: "Successfull submissions",
    },
    {
      status: 201,
    },
  );
}
