"use client";
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../src/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../src/components/ui/select";
import { Editor } from '@monaco-editor/react';
import Submissions from './Submissions';
import { LANGUAGES } from "@repo/common/language";

const QuestionSubmitBar = ({ question, eventId }: { question: any, eventId?: string }) => {

  const [activeSection, setActiveSection] = useState("question");
  
  return (
    <div className='grid gap-2'>
      <div className=''>
        <Tabs
          defaultValue="question"
          className="flex"
          value={activeSection}
          onValueChange={(value) => setActiveSection(value)}
        >
          <TabsList className='flex gap-4 rounded w-full'>
            <TabsTrigger value="question" className='rounded cursor-pointer'>Question</TabsTrigger>
            <TabsTrigger value="submissions" className='rounded cursor-pointer'>Submissions</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className={`${activeSection == "question" ? "" : "hidden"}`}>
        <CodeEditor question={question}/>
      </div>
      {activeSection === "submissions" && <Submissions />}
    </div>
  )
}



const CodeEditor = ({question, eventId}:{question:any, eventId?:string}) => {

  const [language, setLanguage] = useState(LANGUAGES[0]?.monaco);
  const [code, setCode] = useState(question.defaultcodes[0].code);

  useEffect(()=>{
     const  languageDetail = LANGUAGES.find((lang)=>lang.monaco==language);
     const codes = question.defaultcodes.filter((code:any)=>{
       if(languageDetail?.id==code.languageId) return code.code;
     })
     setCode(codes[0].code);
  },[language]);
  
  return (
    <div>
      <div className=''>
        <Select
          onValueChange={(value) => setLanguage(value)}
          defaultValue="cpp"
          value={language}
        >
          <SelectTrigger className="w-[150px] rounded bg-gray-50">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent className='rounded'>
            {LANGUAGES.map((language) => <SelectItem key={language.id} value={language.monaco}>{language.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className='pt-2'>
        <Editor
          height={"90vh"}
          value={code}
          defaultValue={code}
          theme={"vs-dark"}
          onChange={() => { }}
          options={{
            fontSize: 14,
            scrollBeyondLastLine: false,
            mouseWheelZoom: true,
          }}
          defaultLanguage={language}
          language={language}
        />
      </div>

    </div>
  )
}


export default QuestionSubmitBar