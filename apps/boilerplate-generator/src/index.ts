import path from "path";
import { fileURLToPath } from "url";
import fs, { existsSync } from "fs"
import { ProblemDefinitionParser } from "./ProblemDefinitionParser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFunctionBoilerPlateCode(route:string) {
  try {
    const filePath = path.join(__dirname, route, "Structure.md");
    const boilerPlatePath = path.join(__dirname, route, "boilerplate");
  
    const file = Bun.file(filePath);

    if (!(await file.exists())) {
      console.error(`Error: File '${filePath}' does not exist.`);
      return;
    }

    const input = fs.readFileSync(filePath, "utf-8");
    const parser = new ProblemDefinitionParser();
    parser.parse(input);

    if(!fs.existsSync(boilerPlatePath)){
        fs.mkdirSync(boilerPlatePath, { recursive: true });
    };

    const CPPCode = parser.generateCPP();
    const JSCode = parser.generateJS();

    fs.writeFileSync(path.join(boilerPlatePath, "function.cpp"), CPPCode);
    fs.writeFileSync(path.join(boilerPlatePath, "function.js"),   JSCode);
    fs.writeFileSync(path.join(boilerPlatePath, "function.rs"), CPPCode);
    
    console.log("Boilerplate Code has been Generated SUCCESSFULLLY");

  } catch (error) {
    console.error("Error reading file:", error);
  }
}

generateFunctionBoilerPlateCode(process.env.GENERATOR_FILE_PAHT || "");
