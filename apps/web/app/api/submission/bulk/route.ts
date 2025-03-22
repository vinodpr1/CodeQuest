import { AuthOptions } from "app/lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@repo/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(AuthOptions);
  if (!session?.user) {
    return NextResponse.json(
      {
        messgae: "Please login to get submission history",
      },
      {
        status: 401,
      },
    );
  }

  const url = new URL(req.url);
  const searchparams = new URLSearchParams(url.search);
  const questionId = searchparams.get("questionId");
  if (!questionId) {
    return NextResponse.json(
      {
        messgae: "Invalid question",
      },
      {
        status: 404,
      },
    );
  }

  const response = await prisma.submission.findMany({
    where: {
      questionId: questionId,
      userId: "dkms,,dsd",
    },
    take: 10,
    include: {
      testcases: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(
    {
      response,
    },
    {
      status: 200,
    },
  );
}
