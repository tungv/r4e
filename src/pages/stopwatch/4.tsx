import { readFileSync } from "node:fs";
import path from "node:path";

import React from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dracula from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";

import StopWatchLesson from "../../compoment/Apps/StopWatchApp";
import StopWatchApp from "../../lessons/stopwatch/StopWatchAppWithAnimatedDuration";

export default function StopWatchAppStep1({ source }) {
  return (
    <StopWatchLesson srcFilePath="lessons/stopwatch/StopWatchAppWithAnimatedDuration.tsx">
      <StopWatchApp />

      <MDXRemote {...source} components={components} />
    </StopWatchLesson>
  );
}

const components = {
  wrapper: ({ components, ...rest }) => <article {...rest} />,
  h1: (props) => <h1 className="text-3xl text-purple-800 my-4" {...props} />,
  h2: (props) => <h2 className="text-2xl text-purple-800 my-4" {...props} />,
  h3: (props) => <h3 className="text-xl text-purple-800 my-4" {...props} />,
  a: (props) => (
    <a className="text-blue-800 underline" target="_blank" {...props} />
  ),
  p: (props) => (
    <p className="text-black opacity-80 mb-4 last:mb-0" {...props} />
  ),
  inlineCode: (props) => (
    <code className={"bg-purple-100 py-px px-2 rounded"} {...props} />
  ),
  pre: (props) => <pre className="mb-4 last:mb-0" {...props} />,
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return (
      <SyntaxHighlighter
        showLineNumbers
        language={match ? match[1] : "jsx"}
        style={dracula}
        PreTag="div"
        {...props}
      >
        {children.trim()}
      </SyntaxHighlighter>
    );
  },
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-purple-800 bg-purple-200 pl-4 p-2 mb-4"
      {...props}
    />
  ),
};

export async function getStaticProps() {
  const source = String(
    readFileSync(
      path.join(process.cwd(), "src/lessons/stopwatch/animated-duration.mdx"),
    ),
  );
  const mdxSource = await serialize(source);
  return { props: { source: mdxSource } };
}
