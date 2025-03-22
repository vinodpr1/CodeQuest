import React from "react";
import ReactMarkdown from "react-markdown";

interface ProblemDescriptionProps {
  markdown: string;
}

export function QuestionStatement({ markdown }: ProblemDescriptionProps) {
  return (
    <div className="min-h-screen bg-gray-50 rounded">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="prose max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {children}
                </h4>
              ),

              p: ({ children }) => (
                <p className="text-gray-700 leading-relaxed mb-6">{children}</p>
              ),

              code: ({ children }) => (
                <pre className="bg-gray-200 p-3 rounded font-mono text-sm mb-4">
                  {children}
                </pre>
              ),

              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-6">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-6">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-700 mb-2">{children}</li>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
