import React from "react";

import StopWatchLesson from "../../compoment/Apps/StopWatchApp";
import StopWatchApp from "../../lessons/stopwatch/stage-1";

export default function StopWatchAppStep1() {
  return (
    <StopWatchLesson srcFilePath="lessons/stopwatch/stage-1.tsx">
      <StopWatchApp />
    </StopWatchLesson>
  );
}
