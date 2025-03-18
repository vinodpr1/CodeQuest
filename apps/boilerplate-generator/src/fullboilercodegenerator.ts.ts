export class FullBoilerCodeGenerator{
 
   problemName: string = "";
   functionname: string = "";
   input: {type: string, name: string}[] = []
   output: {type: string, name: string}[] = []

   parse(structure:string){

      const line = structure.split("\n").map((struct) => struct.trim());
      let currentSection: string | null  = null;
       console.log(line);
      line.forEach((li)=>{
         if (li.startsWith("Problem Name")) {
           this.problemName = this.getProblemName(li);
         } else if (li.startsWith("Function Name")) {
           this.functionname = this.getFunctionName(li);
         } else if (li.startsWith("Input Structure")) {
           currentSection = "input"
         } else if (li.startsWith("Output Structure")) {
           currentSection = "output"    
         } else if ( li.startsWith("Input Field") && currentSection == "input") {
           const field = this.getIOValue(li);
           if (field) this.input.push(field);
         } else if ( li.startsWith("Output Field") && currentSection == "output") {
           const field = this.getIOValue(li);
           if (field) this.output.push(field);
         }
      })
   }

   getProblemName(li: string){
      let x = li.match  (/: "(.*)"$/);
      if(!x) return "";
      return x[1];
   }

   getFunctionName(li: string){
      let x = li.match(/: (\w+)$/);
      if(!x) return "";
      return x[1];
   }

   getIOValue (li:any) {
      const match = li.match(/Field: (\w+(?:<\w+>)?) (\w+)$/);
      return match ? { type: match[1], name: match[2] } : null;
   }

   generateCPP(): string {
      const inputs = this.input
        .map((field) => `${this.mapTypeToCpp(field.type)} ${field.name}`)
        .join(", ");
      const inputReads = this.input
        .map((field) => {
          if (field.type.startsWith("list<")) {
            return `int size_${field.name};\n  std::cin >> size_${field.name};\n  ${this.mapTypeToCpp(field.type)} ${field.name}(size_${field.name});\n  for(int i = 0; i < size_${field.name}; ++i) std::cin >> ${field.name}[i];`;
          } else {
            return `std::cin >> ${field.name};`;
          }
        })
        .join("\n  ");
      const outputType = this.output[0].type;
      const functionCall = `${outputType} result = ${this.functionname}(${this.input.map((field) => field.name).join(", ")});`;
      const outputWrite = `std::cout << result << std::endl;`;
  
      return `
  #include <iostream>
  #include <vector>
  #include <string>
  
  ##USER_CODE_HERE##
  
  int main() {
    ${inputReads}
    ${functionCall}
    ${outputWrite}
    return 0;
  }
      `;
    }

   generateJS(): string {
      const inputs = this.input.map((field) => field.name).join(", ");
      const inputReads = this.input
        .map((field) => {
          if (field.type.startsWith("list<")) {
            return `const size_${field.name} = parseInt(input.shift());\nconst ${field.name} = input.splice(0, size_${field.name}).map(Number);`;
          } else {
            return `const ${field.name} = parseInt(input.shift());`;
          }
        })
        .join("\n  ");
      const outputType = this.output[0].type;
      const functionCall = `const result = ${this.functionname}(${this.input.map((field) => field.name).join(", ")});`;
      const outputWrite = `console.log(result);`;
  
      return `
  //USER_CODE_HERE\n
  
  const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\\n').join(' ').split(' ');
  ${inputReads}
  ${functionCall}
  ${outputWrite}
      `;
    }
  
    generateRS(): string {
      const inputs = this.input
        .map((field) => `${field.name}: ${this.mapTypeToRust(field.type)}`)
        .join(", ");
      const inputReads = this.input
        .map((field) => {
          if (field.type.startsWith("list<")) {
            return `let size_${field.name}: usize = input.next().unwrap().parse().unwrap();\nlet ${field.name}: ${this.mapTypeToRust(field.type)} = input.take(size_${field.name}).map(|s| s.parse().unwrap()).collect();`;
          } else {
            return `let ${field.name}: ${this.mapTypeToRust(field.type)} = input.next().unwrap().parse().unwrap();`;
          }
        })
        .join("\n  ");
      const outputType = this.mapTypeToRust(this.output[0].type);
      const functionCall = `let result = ${this.functionname}(${this.input.map((field) => field.name).join(", ")});`;
      const outputWrite = `println!("{}", result);`;
  
      return `
  use std::io::{self, BufRead};
  
  ##USER_CODE_HERE##
  
  fn main() {
    let stdin = io::stdin();
    let mut input = stdin.lock().lines().map(|l| l.unwrap());
    ${inputReads}
    ${functionCall}
    ${outputWrite}
  }
      `;
    }
  
    mapTypeToCpp(type: string): string {
      switch (type) {
        case "int":
          return "int";
        case "float":
          return "float";
        case "string":
          return "std::string";
        case "bool":
          return "bool";
        case "list<int>":
          return "std::vector<int>";
        case "list<float>":
          return "std::vector<float>";
        case "list<string>":
          return "std::vector<std::string>";
        case "list<bool>":
          return "std::vector<bool>";
        default:
          return "unknown";
      }
    }
  
    mapTypeToRust(type: string): string {
      switch (type) {
        case "int":
          return "i32";
        case "float":
          return "f64";
        case "string":
          return "String";
        case "bool":
          return "bool";
        case "list<int>":
          return "Vec<i32>";
        case "list<float>":
          return "Vec<f64>";
        case "list<string>":
          return "Vec<String>";
        case "list<bool>":
          return "Vec<bool>";
        default:
          return "unknown";
      }
    }

}