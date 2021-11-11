import React, { useState } from "react";

import StopWatchLesson from "../../compoment/Apps/StopWatchApp";

export default function StopWatchAppStep1() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPausing, setIsPausing] = useState(false);

  function start() {
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
    <StopWatchLesson srcFilePath="pages/stopwatch/1.tsx">
      {!hasStarted && (
        <section>
          <h4>Initial</h4>
          <div className="duration">
            <span>{`00:00:00.000`}</span>
          </div>
          <footer className="flex flex-row gap-1">
            <button onClick={start}>start</button>
          </footer>
        </section>
      )}
      {hasStarted && (
        <section>
          {!isPausing && (
            <>
              <h4>running…</h4>
              <div className="duration">
                <span>01:23:45.678</span>
              </div>
              <footer className="flex flex-row gap-1">
                <button onClick={stop}>stop</button>
              </footer>
            </>
          )}
          {isPausing && (
            <>
              <h4>stopped!</h4>
              <div className="duration">
                <span>01:23:45.678</span>
              </div>
              <footer className="flex flex-row gap-1">
                <button onClick={resume}>resume</button>
                <button onClick={reset}>reset</button>
              </footer>
            </>
          )}
        </section>
      )}
      <style jsx>{`
        main {
          width: 100vw;
          margin: 64px auto;
        }
        section {
          margin: auto;
          width: 320px;
          padding: 16px;
          border: 2px solid hsl(0 50% 50%);
          border-radius: 8px;
        }
      `}</style>
    </StopWatchLesson>
  );
}
