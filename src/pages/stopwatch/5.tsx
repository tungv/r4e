import React from "react";

import StopWatchLesson from "../../compoment/Apps/StopWatchApp";
import StopWatchApp from "../../lessons/stopwatch/VariableRefreshRate";
import Explainer from "../../components/Explainer";
import loadLessonMdx from "../../loadLessonMdx";

export default function StopWatchAppStep1({ source }) {
  return (
    <StopWatchLesson srcFilePath="lessons/stopwatch/StopWatchRunningWithVariableRefreshRate.tsx">
      <StopWatchApp />
      <Explainer source={source} />
    </StopWatchLesson>
  );
}

export async function getStaticProps() {
  const mdxSource = await loadLessonMdx("stopwatch", "refresh-rate.mdx");
  return { props: { source: mdxSource } };
}
