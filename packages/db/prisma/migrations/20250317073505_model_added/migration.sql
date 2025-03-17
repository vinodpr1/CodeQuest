-- CreateEnum
CREATE TYPE "TestCaseResult" AS ENUM ('AC', 'FAIL', 'TLE', 'COMPILATION_ERROR', 'PENDING');

-- CreateEnum
CREATE TYPE "SubmissionResult" AS ENUM ('AC', 'REJECTED', 'PENDING');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT true,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leaderboard" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventQuestion" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "QuestionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "index" INTEGER NOT NULL,
    "solved" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "EventQuestion_pkey" PRIMARY KEY ("eventId","QuestionId")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT true,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "slug" TEXT NOT NULL,
    "solved" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DefaultCode" (
    "id" TEXT NOT NULL,
    "languageId" INTEGER NOT NULL,
    "questionId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DefaultCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "judge0Id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "languageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "fullcode" TEXT NOT NULL,
    "activeEventId" TEXT,
    "status" "SubmissionResult" NOT NULL DEFAULT 'PENDING',
    "memory" INTEGER,
    "time" DOUBLE PRECISION,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCase" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "TestCaseResult" NOT NULL DEFAULT 'PENDING',
    "index" INTEGER NOT NULL,
    "submissionId" TEXT NOT NULL,
    "memory" INTEGER,
    "time" DOUBLE PRECISION,
    "judge0TrackingId" TEXT NOT NULL,

    CONSTRAINT "TestCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSubmission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "EventSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventPoints" (
    "id" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "EventPoints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Question_slug_key" ON "Question"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "DefaultCode_questionId_languageId_key" ON "DefaultCode"("questionId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "Language_judge0Id_key" ON "Language"("judge0Id");

-- CreateIndex
CREATE UNIQUE INDEX "TestCase_judge0TrackingId_key" ON "TestCase"("judge0TrackingId");

-- CreateIndex
CREATE UNIQUE INDEX "EventSubmission_userId_questionId_eventId_key" ON "EventSubmission"("userId", "questionId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "EventPoints_contestId_userId_key" ON "EventPoints"("contestId", "userId");

-- AddForeignKey
ALTER TABLE "EventQuestion" ADD CONSTRAINT "EventQuestion_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventQuestion" ADD CONSTRAINT "EventQuestion_QuestionId_fkey" FOREIGN KEY ("QuestionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DefaultCode" ADD CONSTRAINT "DefaultCode_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DefaultCode" ADD CONSTRAINT "DefaultCode_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_activeEventId_fkey" FOREIGN KEY ("activeEventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSubmission" ADD CONSTRAINT "EventSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSubmission" ADD CONSTRAINT "EventSubmission_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSubmission" ADD CONSTRAINT "EventSubmission_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPoints" ADD CONSTRAINT "EventPoints_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
