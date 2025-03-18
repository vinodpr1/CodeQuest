export class ProblemDefinitionParser{
    problemName: string = "";
    functionname: string = "";
    input: {type: string, name: string}[] = []
    output: {type: string, name: string}[] = []

    async parse(structure:string){
       
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
       console.log(this.output);
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

    generateCPP () {
        const input = this.input.map((c)=> `${c.type} ${c.name}`).join(', ');
        return `${this.output[0].type} ${this.functionname} ( ${input} ){\n  //Real implementation goes here\n return result;\n }`;
    }
}