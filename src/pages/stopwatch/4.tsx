import React from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import { readFileSync } from "node:fs";
import path from "node:path";

import StopWatchLesson from "../../compoment/Apps/StopWatchApp";
import StopWatchApp from "../../lessons/stopwatch/StopWatchAppWithAnimatedDuration";

export default function StopWatchAppStep1({ source }) {
  return (
    <StopWatchLesson srcFilePath="lessons/stopwatch/StopWatchAppWithAnimatedDuration.tsx">
      <StopWatchApp />

      <MDXRemote {...source} />
    </StopWatchLesson>
  );
}

export async function getStaticProps() {
  const source = String(
    readFileSync(
      path.join(process.cwd(), "src/lessons/stopwatch/animated-duration.mdx"),
    ),
  );
  const mdxSource = await serialize(source);
  return { props: { source: mdxSource } };
}
