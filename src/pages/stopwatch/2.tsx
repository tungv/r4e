import React from "react";

import StopWatchLesson from "../../compoment/Apps/StopWatchApp";
import StopWatchApp from "../../lessons/stopwatch/stage-2";

export default function StopWatchPage2() {
  return (
    <StopWatchLesson srcFilePath="lessons/stopwatch/stage-2.tsx">
      <StopWatchApp />
    </StopWatchLesson>
  );
}
