import React from "react";

import StopWatchLesson from "../../compoment/Apps/StopWatchApp";
import StopWatchApp from "../../lessons/stopwatch/stage-2";
import loadSourceCode from "../../loadSourceCode";

export default function StopWatchPage2({ sourceCode }) {
  return (
    <StopWatchLesson src={sourceCode}>
      <StopWatchApp />
    </StopWatchLesson>
  );
}

export async function getStaticProps() {
  const sourceCode = await loadSourceCode("lessons/stopwatch/stage-2.tsx");
  return {
    props: {
      sourceCode,
    },
  };
}
