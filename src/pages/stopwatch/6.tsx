import React from "react";

import StopWatchLesson from "../../compoment/Apps/StopWatchApp";
import StopWatchApp from "../../lessons/stopwatch/AnimationFrameStopWatchApp";
import Explainer from "../../components/Explainer";
import loadLessonMdx from "../../loadLessonMdx";

export default function StopWatchAppStep1({ source }) {
  return (
    <StopWatchLesson srcFilePath="lessons/stopwatch/StopWatchRunningWithAnimationFrame.tsx">
      <StopWatchApp />
      <Explainer source={source} />
    </StopWatchLesson>
  );
}

export async function getStaticProps() {
  const mdxSource = await loadLessonMdx(
    "stopwatch",
    "request-animation-frame.mdx",
  );
  return { props: { source: mdxSource } };
}
