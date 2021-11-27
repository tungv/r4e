import React from "react";

import StopWatchLesson from "../../compoment/Apps/StopWatchApp";
import StopWatchApp from "../../lessons/stopwatch/AnimationFrameStopWatchApp";
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
  const sourceCode = await loadSourceCode(
    "lessons/stopwatch/StopWatchRunningWithAnimationFrame.tsx",
  );
  const mdxSource = await loadLessonMdx(
    "stopwatch",
    "request-animation-frame.mdx",
  );
  return { props: { explainer: mdxSource, sourceCode } };
}
