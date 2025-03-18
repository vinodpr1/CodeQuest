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
    console.log(input);

    if(!fs.existsSync(boilerPlatePath)){
        fs.mkdirSync(boilerPlatePath, { recursive: true });
    };

    fs.writeFileSync(path.join(boilerPlatePath, "function.cpp"), "#include");
    fs.writeFileSync(path.join(boilerPlatePath, "function.js"), "#include");
    fs.writeFileSync(path.join(boilerPlatePath, "function.rs"), "#include");
    
    console.log("Boilerplate Code has been Generated SUCCESSFULLLY");

  } catch (error) {
    console.error("Error reading file:", error);
  }
}

async function generateFullBoilerPlateCode(route:string) {
    try {
      const filePath = path.join(__dirname, route, "structure.md"); // Ensures correct relative path
      const fullBoilerPlatePath = path.join(__dirname, route, "fullboilerplate")
      const file = Bun.file(filePath);
  
      if (!(await file.exists())) {
        console.error(`Error: File '${filePath}' does not exist.`);
        return;
      }
  
      const input = fs.readFileSync(filePath, "utf-8");
      const parser = new ProblemDefinitionParser();
      parser.parse(input);

      if(!existsSync(fullBoilerPlatePath)){
         fs.mkdirSync(fullBoilerPlatePath, {recursive: true});
      };

      fs.writeFileSync(path.join(fullBoilerPlatePath, "function.cpp"), "# FULL");
      fs.writeFileSync(path.join(fullBoilerPlatePath, "function.js"), "# FULL ds dsdm s");
      fs.writeFileSync(path.join(fullBoilerPlatePath, "function.rs"), "# FULL KUKKKLO");

      console.log("Full Boilerplate Code has been Generated SUCCESSFULLLY");

    } catch (error) {
      console.error("Error reading file:", error);
    }
}

generateFunctionBoilerPlateCode(process.env.GENERATOR_FILE_PAHT || "");
generateFullBoilerPlateCode(process.env.GENERATOR_FILE_PAHT || "");
