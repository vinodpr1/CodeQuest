import path from "path";
import { fileURLToPath } from "url";
import fs from "fs"
import { BoilerCodeGenerator } from "./boilercodegenerator";
import { FullBoilerCodeGenerator } from "./fullboilercodegenerator.ts";

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
    const parser = new BoilerCodeGenerator();
    parser.parse(input);

    if(!fs.existsSync(boilerPlatePath)){
        fs.mkdirSync(boilerPlatePath, { recursive: true });
    };

    const CPPCode = parser.generateCPP();
    const JSCode = parser.generateJS();
    const RSCode = parser.generateRS();

    fs.writeFileSync(path.join(boilerPlatePath, "function.cpp"), CPPCode);
    fs.writeFileSync(path.join(boilerPlatePath, "function.js"),   JSCode);
    fs.writeFileSync(path.join(boilerPlatePath, "function.rs"), RSCode);
    
    console.log("Boilerplate Code has been Generated SUCCESSFULLLY");

  } catch (error) {
    console.error("Error reading file:", error);
  }
}


async function generateFullBoilerPlateCode(route:string) {
  try {
    const filePath = path.join(__dirname, route, "Structure.md");
    const boilerPlatePath = path.join(__dirname, route, "fullboilerplate");
  
    const file = Bun.file(filePath);

    if (!(await file.exists())) {
      console.error(`Error: File '${filePath}' does not exist.`);
      return;
    }

    const input = fs.readFileSync(filePath, "utf-8");
    const parser = new FullBoilerCodeGenerator();
    parser.parse(input);

    if(!fs.existsSync(boilerPlatePath)){
        fs.mkdirSync(boilerPlatePath, { recursive: true });
    };

    const JSCode = parser.generateJS();
    const CPPCode = parser.generateCPP();
    const RSCode = parser.generateRS();

    fs.writeFileSync(path.join(boilerPlatePath, "function.cpp"), CPPCode);
    fs.writeFileSync(path.join(boilerPlatePath, "function.js"),   JSCode);
    fs.writeFileSync(path.join(boilerPlatePath, "function.rs"), RSCode);
    
    console.log("Full Boilerplate Code has been Generated SUCCESSFULLLY");

  } catch (error) {
    console.error("Error reading file:", error);
  }
}

// generateFunctionBoilerPlateCode(process.env.GENERATOR_FILE_PAHT || "");
generateFullBoilerPlateCode(process.env.GENERATOR_FILE_PAHT || "");