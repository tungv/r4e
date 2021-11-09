import { useEffect } from "react";
import useStopWatch from "../useStopWatch";
import { useAnimationFrame } from "./useAnimationFrame";

export default function Home() {
  const {
    hasStarted,
    isPausing,
    elapsedTime,
    startTimeMs,
    laps,
    lap,
    start,
    stop,
    resume,
    reset,
  } = useStopWatch();

  return (
    <main>
      <style jsx>{`
        main {
          width: 100vw;
        }
        div {
          margin: auto;
          width: 320px;
        }
      `}</style>
      {!hasStarted && (
        <div>
          <DefaultClock />
          <button onClick={start}>start</button>
        </div>
      )}

      {hasStarted && (
        <div>
          {!isPausing && (
            <>
              <StopWatch startTimeMs={startTimeMs} />
              <button onClick={stop}>stop</button>
              <button onClick={lap}>lap</button>
            </>
          )}
          {isPausing && (
            <>
              <StoppedClock elapsedTime={elapsedTime} />
              <button onClick={resume}>resume</button>
              <button onClick={reset}>reset</button>
            </>
          )}

          <ol>
            {laps.map((lapTimeMs) => (
              <li key={lapTimeMs}>
                <StoppedClock elapsedTime={lapTimeMs}></StoppedClock>
              </li>
            ))}
          </ol>
        </div>
      )}
    </main>
  );
}

function DefaultClock() {
  useEffect(() => {
    document.title = "00:00:00";
  });
  return <Duration durationMs={0} />;
}

function StoppedClock({ elapsedTime }: { elapsedTime: number }) {
  useEffect(() => {
    // assumption: only paused while running
    document.title = "paused: " + document.title;
  });
  return <Duration durationMs={elapsedTime} />;
}

function StopWatch({ startTimeMs }: { startTimeMs: number }) {
  useAnimationFrame();

  useEffect(() => {
    const interval = setInterval(syncTitle, 500);
    syncTitle();

    return () => clearInterval(interval);

    function syncTitle() {
      const durationS = (Date.now() - startTimeMs) / 1000;

      const hh = String(Math.floor(durationS / 60 / 60)).padStart(2, "0");
      const mm = String(Math.floor(durationS / 60) % 60).padStart(2, "0");
      const ss = String(Math.floor(durationS) % 60).padStart(2, "0");

      document.title = `${hh}:${mm}:${ss}`;
    }
  }, [startTimeMs]);

  return <Duration durationMs={Date.now() - startTimeMs} />;
}

function Duration({ durationMs }: { durationMs: number }) {
  const hh = String(Math.floor(durationMs / 1000 / 60 / 60)).padStart(2, "0");
  const mm = String(Math.floor(durationMs / 1000 / 60) % 60).padStart(2, "0");
  const ss = String(Math.floor(durationMs / 1000) % 60).padStart(2, "0");
  const ms = String(durationMs % 1000).padStart(3, "0");

  return (
    <div>
      <style jsx>{`
        span:not(:last-child) {
          font-size: 2rem;
        }
        span {
          font-family: cursive;
          font-variant-numeric: tabular-nums;
        }
      `}</style>
      <span>{hh}</span>:<span>{mm}</span>:<span>{ss}</span>.<span>{ms}</span>
    </div>
  );
}
