import React from "react";
import useSWR from "swr";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dracula from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";

export default function SourceCode({ src }: { src: string }) {
  return (
    <div className="h-full overflow-auto">
      <SyntaxHighlighter language="tsx" showLineNumbers style={dracula}>
        {src}
      </SyntaxHighlighter>
    </div>
  );
}
