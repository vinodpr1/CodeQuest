"use client";
import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../src/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../src/components/ui/select";
import { Button } from "../src/components/ui/button";
import { Editor } from "@monaco-editor/react";
import Submissions from "./Submissions";
import { LANGUAGES } from "@repo/common/language";
import axios from "axios";
import { Check, CircleDot, CircleX, Timer } from "lucide-react";

enum SubmitStatus {
  SUBMIT = "SUBMIT",
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  FAILED = "FAILED",
}

const QuestionSubmitBar = ({
  question,
  eventId,
}: {
  question: any;
  eventId?: string;
}) => {
  const [activeSection, setActiveSection] = useState("question");

  return (
    <div className="grid gap-2">
      <div className="">
        <Tabs
          defaultValue="question"
          className="flex"
          value={activeSection}
          onValueChange={(value) => setActiveSection(value)}
        >
          <TabsList className="flex gap-4 rounded w-full">
            <TabsTrigger value="question" className="rounded cursor-pointer">
              Question
            </TabsTrigger>
            <TabsTrigger value="submissions" className="rounded cursor-pointer">
              Submissions
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className={`${activeSection == "question" ? "" : "hidden"}`}>
        <CodeEditor question={question} />
      </div>
      {activeSection === "submissions" && <Submissions />}
    </div>
  );
};

const CodeEditor = ({
  question,
  eventId,
}: {
  question: any;
  eventId?: string;
}) => {
  const [language, setLanguage] = useState(LANGUAGES[0]?.monaco);
  const [code, setCode] = useState(question.defaultcodes[0].code);
  const [status, setStatus] = useState(SubmitStatus.SUBMIT);

  useEffect(() => {
    const languageDetail = LANGUAGES.find((lang) => lang.monaco == language);
    const codes = question.defaultcodes.filter((code: any) => {
      if (languageDetail?.id == code.languageId) return code.code;
    });
    setCode(codes[0].code);
  }, [language]);

  const handleSubmitQuestion = async () => {
    // console.log(code);
    const res = await axios.post("/api/submission", {
      code: code,
      languageId: LANGUAGES.find((lang) => lang.monaco == language)?.extension,
      questionId: question.id,
    });

    console.log("Response is", res);
  };

  return (
    <div>
      <div className="flex justify-between">
        <Select
          onValueChange={(value) => setLanguage(value)}
          defaultValue="cpp"
          value={language}
        >
          <SelectTrigger className="w-[150px] rounded bg-gray-50">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent className="rounded">
            {LANGUAGES.map((language) => (
              <SelectItem key={language.id} value={language.monaco}>
                {language.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div>
          <Button
            disabled={status === SubmitStatus.PENDING}
            type="submit"
            onClick={handleSubmitQuestion}
            className="cursor-pointer rounded"
          >
            {status == SubmitStatus?.PENDING ? "Submitting" : "Submit"}
          </Button>
        </div>
      </div>
      <div className="pt-2">
        <Editor
          height={"90vh"}
          value={code}
          defaultValue={code}
          theme={"vs-dark"}
          onChange={(e) => setCode(e)}
          options={{
            fontSize: 14,
            scrollBeyondLastLine: false,
            mouseWheelZoom: true,
          }}
          defaultLanguage={language}
          language={language}
        />
      </div>
      <RenderTestCases />

    </div>
  );
};

const RenderTestCases = () => {
  return (
    <div className="grid grid-cols-6 gap-4 pt-2">
      {
        Array(5).fill(2).map((_, index) => {
         return(
           <div key={index} className="flex flex-col gap-1 justify-center items-center py-2 shadow-xl rounded bg-gray-50">
               <span className="text-xs">Test #{index+1}</span>
               <RenderResult result="PENDING"/>
           </div>
         )})
      }
    </div>
  )
}

const RenderResult=({result}: {result: string})=>{
  if(result=="AC") return <Check className="h-4 w-4 text-green-500"/>
  if(result=="PENDING") return <CircleDot className="h-4 w-4 text-yellow-500"/>
  if(result=="FAIL") return <CircleX className="h-4 w-4 text-red-500"/>
  if(result=="TLE") return <Timer className="h-4 w-4 text-red-500"/>
  if(result=="COMPILATION_ERROR") return <CircleX className="h-4 w-4 text-red-500"/>
}

export default QuestionSubmitBar;
