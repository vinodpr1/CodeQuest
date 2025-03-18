export class BoilerCodeGenerator{
    problemName: string = "";
    functionname: string = "";
    input: {type: string, name: string}[] = []
    output: {type: string, name: string}[] = []

    parse(structure:string): void{
       
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

    getProblemName(li: string): string {
       let x = li.match  (/: "(.*)"$/);
       if(!x) return "";
       return x[1];
    }

    getFunctionName(li: string): string{
        let x = li.match(/: (\w+)$/);
        if(!x) return "";
        return x[1];
    }

    getIOValue (li:string) : { type: string; name: string } | null {
        const match = li.match(/Field: (\w+(?:<\w+>)?) (\w+)$/);
        return match ? { type: match[1], name: match[2] } : null;
    }

    generateCPP (): string {
        const input = this.input.map((c)=> `${c.type} ${c.name}`).join(', ');
        return `${this.output[0].type} ${this.functionname} ( ${input} ){\n  //Real implementation goes here\n return result;\n }`;
    }

    generateJS (): string {
        const input = this.input.map((c) => c.name).join(", ");
        return `function ${this.functionname}(${input}){\n  //Implementation goes here\n    return result;\n}`;
    }

    generateRS(): string {
        const inputs = this.input
          .map((field) => `${field.name}: ${this.mapTypeToRust(field.type)}`)
          .join(", ");
        const outputType = this.mapTypeToRust(this.output[0].type);
        return `fn ${this.functionname}(${inputs}) -> ${outputType} {\n    // Implementation goes here\n    result\n}`;
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