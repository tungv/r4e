import { useState } from "react";
import StopWatchingStopped from "./StopWatchingStopped";
import StopWatchInitial from "./StopWatchInitial";
import StopWatchRunning from "./StopWatchRunning";

export default function StopWatchApp() {
  const [startTimeMs, setStartTimeMs] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPausing, setIsPausing] = useState(false);

  function start() {
    setStartTimeMs(Date.now());
    setHasStarted(true);
    setIsPausing(false);
  }

  function stop() {
    setIsPausing(true);
  }

  function resume() {
    setIsPausing(false);
  }

  function reset() {
    setHasStarted(false);
    setIsPausing(false);
  }

  return (
    <div>
      {!hasStarted && <StopWatchInitial requestStart={start} />}
      {hasStarted && !isPausing && (
        <StopWatchRunning requestStop={stop} startTimeMs={startTimeMs} />
      )}
      {hasStarted && isPausing && (
        <StopWatchingStopped requestReset={reset} requestResume={resume} />
      )}
    </div>
  );
}
