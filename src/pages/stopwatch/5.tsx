import React from "react";

import StopWatchLesson from "../../compoment/Apps/StopWatchApp";
import StopWatchApp from "../../lessons/stopwatch/VariableRefreshRate";
import Explainer from "../../components/Explainer";
import loadLessonMdx from "../../loadLessonMdx";
import loadSourceCode from "../../loadSourceCode";

export default function StopWatchAppStep1({ explainer, sourceCode }) {
  return (
    <StopWatchLesson src={sourceCode}>
      <StopWatchApp />
      <Explainer source={explainer} />
    </StopWatchLesson>
  );
}

export async function getStaticProps() {
  const mdxSource = await loadLessonMdx("stopwatch", "refresh-rate.mdx");
  const sourceCode = await loadSourceCode(
    "lessons/stopwatch/StopWatchRunningWithVariableRefreshRate.tsx",
  );
  return { props: { explainer: mdxSource, sourceCode } };
}
