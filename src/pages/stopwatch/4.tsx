import React from "react";

import StopWatchLesson from "../../compoment/Apps/StopWatchApp";
import StopWatchApp from "../../lessons/stopwatch/StopWatchAppWithAnimatedDuration";

export default function StopWatchAppStep1() {
  return (
    <StopWatchLesson srcFilePath="lessons/stopwatch/StopWatchAppWithAnimatedDuration.tsx">
      <StopWatchApp />
    </StopWatchLesson>
  );
}
