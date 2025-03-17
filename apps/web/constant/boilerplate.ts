const boilerPlateCode = new Map<number, string>([
    [
        45,
        `section .data
          msg db "Hello, World!", 0xa
          len equ $ - msg
      
      section .text
          global _start
      
      _start:
          ; Write "Hello, World!" to stdout
          mov eax, 4        ; sys_write
          mov ebx, 1        ; file descriptor (stdout)
          mov ecx, msg      ; message to write
          mov edx, len      ; message length
          int 0x80          ; interrupt
      
          ; Exit program
          mov eax, 1        ; sys_exit
          xor ebx, ebx      ; exit code 0
          int 0x80`,
      ],
      [
        46,
        `#!/bin/bash
      echo "Hello, World!"`,
      ],
      [47, `PRINT "Hello, World!"`],
      [
        50,
        `#include <stdio.h>
      
      int main() {
          printf("Hello, World!\\n");
          return 0;
      }`,
      ],
      [
        51,
        `using System;
      
      class Program {
          static void Main() {
              Console.WriteLine("Hello, World!");
          }
      }`,
      ],
      [
        54,
        `#include<bits/stdc++.h>
      using namespace std;
      
      int main() {
          cout << "Hello World!" << endl;
          return 0;
      }`,
      ],
      [55, `(format t "Hello, World!~%")`],
      [
        56,
        `import std.stdio;
      
      void main() {
          writeln("Hello, World!");
      }`,
      ],
      [57, `IO.puts "Hello, World!"`],
      [
        58,
        `-module(hello).
      -export([hello_world/0]).
      
      hello_world() -> io:fwrite("Hello, World!\\n").`,
      ],
      [
        59,
        `program hello
          print *, "Hello, World!"
      end program hello`,
      ],
      [
        60,
        `package main
      
      import "fmt"
      
      func main() {
          fmt.Println("Hello, World!")
      }`,
      ],
      [61, `main = putStrLn "Hello, World!"`],
      [
        62,
        `public class HelloWorld {
          public static void main(String[] args) {
              System.out.println("Hello, World!");
          }
      }`,
      ],
      [63, `console.log("Hello, World");`],
      [64, `print("Hello, World!")`],
      [65, `print_endline "Hello, World!"`],
      [66, `printf("Hello, World!\\n");`],
      [
        67,
        `program HelloWorld;
      begin
          writeln('Hello, World!');
      end.`,
      ],
      [
        68,
        `<?php
      echo "Hello, World!";
      ?>`,
      ],
      [70, `print "Hello, World!"`],
      [71, `print("Hello, World!")`],
      [72, `puts "Hello, World!"`],
      [
        73,
        `fn main() {
          println!("Hello, World!");
      }`,
      ],
      [74, `console.log("Hello, World!");`],
      [
        77,
        `IDENTIFICATION DIVISION.
      PROGRAM-ID. HELLO.
      PROCEDURE DIVISION.
          DISPLAY "Hello, World!".
          STOP RUN.`,
      ],
      [
        78,
        `fun main() {
          println("Hello, World!")
      }`,
      ],
      [
        79,
        `#import <Foundation/Foundation.h>
      
      int main() {
          @autoreleasepool {
              NSLog(@"Hello, World!");
          }
          return 0;
      }`,
      ],
      [80, `cat("Hello, World!\\n")`],
      [
        81,
        `object HelloWorld {
          def main(args: Array[String]): Unit = {
              println("Hello, World!")
          }
      }`,
      ],
      [
        82,
        `CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL
      );`,
      ],
      [83, `print("Hello, World!")`],
      [
        84,
        `Module HelloWorld
          Sub Main()
              Console.WriteLine("Hello, World!")
          End Sub
      End Module`,
      ],
      [85, `print "Hello, World!\\n";`],
      [86, `(println "Hello, World!")`]
])

export const BoilerCodeGenerator = (languageId: number): string =>{
   return boilerPlateCode.get(languageId)  || "";
}