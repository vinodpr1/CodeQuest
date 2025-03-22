"use client";
import React, { useEffect, useState } from "react";
import { RotateCcw, WandSparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../src/components/ui/select";
import { Button } from "../src/components/ui/button";
import Editor from "@monaco-editor/react";
import { Textarea } from "../src/components/ui/textarea";
import { BoilerCodeGenerator } from "constant/boilerplate";
import { LANGUAGES } from "constant/language";

const Compiler = () => {
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [code, setCode] = useState(BoilerCodeGenerator(74));

  const handleChange = (value: string) => {
    console.log(value);
    setLanguage(value);
    const lang: any = LANGUAGES.find((lang) => lang.value == value);
    if (lang) {
      const boilercode = BoilerCodeGenerator(lang.id);
      setCode(boilercode);
    }
  };

  return (
    <section className="py-12 px-6 md:px-4 min-h-screen">
      <div className="bg-neutral-300 px-4 py-2">Online Javascript Compiler</div>
      <div className="grid grid-cols-12">
        <div className="col-span-7 border">
          <nav className="flex px-8 py-2 justify-between">
            <div className="flex items-center gap-2">
              <Select onValueChange={handleChange}>
                <SelectTrigger className="w-[120px] border border-gray-300 rounded outline-none focus:outline-none">
                  <SelectValue placeholder="Javascript" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] rounded">
                  <SelectGroup>
                    {LANGUAGES.map((language) => {
                      return (
                        <SelectItem key={language.id} value={language.value}>
                          {language.label}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setTheme(value)}>
                <SelectTrigger className="w-[120px] border border-gray-300 rounded outline-none focus:outline-none">
                  <SelectValue placeholder="Light" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] rounded">
                  <SelectGroup>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="hc-black">hc-black</SelectItem>
                    <SelectItem value="vs-dark">VS-Code</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCode("")}
                className="p-2 rounded bg-neutral-200 cursor-pointer hover:bg-neutral-300 transition-all duration-300"
              >
                <WandSparkles className="h-4 w-4 hp-4 text-neutral-600" />
              </button>
              <button
                onClick={() => setCode("")}
                className="p-2 rounded bg-neutral-200 cursor-pointer hover:bg-neutral-300 transition-all duration-300"
              >
                <RotateCcw className="h-4 w-4 hp-4 text-neutral-600" />
              </button>
            </div>
          </nav>
          <div className="border border-neutral-300">
            <Editor
              height={"70vh"}
              value={code}
              defaultValue={code}
              theme={theme}
              onMount={() => {}}
              onChange={() => {}}
              options={{
                fontSize: 14,
                scrollBeyondLastLine: false,
                mouseWheelZoom: true,
              }}
              defaultLanguage="javascript"
              language={language}
            />
          </div>
        </div>
        <div className="col-span-5 border">
          <nav className="flex py-2 px-4 justify-between border-b border-neutral-300">
            <Button className="rounded bg-blue-600 hover:bg-blue-500 cursor-pointer">
              Run
            </Button>
          </nav>
          <div className="px-4 flex flex-col">
            <div className="">
              <h1 className="">Input</h1>
              <Textarea
                className="border border-black rounded text-black"
                placeholder="Enter input here"
              />
            </div>
            <div className="pt-12">
              <h1 className="py-2">Output</h1>
              <div className="border border-black rounded h-32"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Compiler;
