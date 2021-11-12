import React from "react";

import StopWatchLesson from "../../compoment/Apps/StopWatchApp";
import StopWatchApp from "../../lessons/stopwatch/StopWatchAppWithAnimatedDuration";
import Explainer from "../../components/Explainer";
import loadLessonMdx from "../../loadLessonMdx";

export default function StopWatchAppStep1({ source }) {
  return (
    <StopWatchLesson srcFilePath="lessons/stopwatch/StopWatchAppWithAnimatedDuration.tsx">
      <StopWatchApp />
      <Explainer source={source} />
    </StopWatchLesson>
  );
}

export async function getStaticProps() {
  const mdxSource = await loadLessonMdx("stopwatch", "animated-duration.mdx");
  return { props: { source: mdxSource } };
}
