import { PropsWithChildren, useEffect, useState } from "react";

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

function StopWatchLayout(props: PropsWithChildren<{}>) {
  return (
    <section>
      {props.children}

      <style jsx>{`
        section {
          margin: auto;
          width: 320px;
          padding: 16px;
          border: 2px solid hsl(0 50% 50%);
          border-radius: 8px;
        }
      `}</style>
    </section>
  );
}

function Duration({ durationMs }: { durationMs: number }) {
  const hh = String(Math.floor(durationMs / 1000 / 60 / 60)).padStart(2, "0");
  const mm = String(Math.floor(durationMs / 1000 / 60) % 60).padStart(2, "0");
  const ss = String(Math.floor(durationMs / 1000) % 60).padStart(2, "0");
  const ms = String(durationMs % 1000).padStart(3, "0");

  return (
    <div>
      <span>{hh}</span>:<span>{mm}</span>:<span>{ss}</span>.<span>{ms}</span>
    </div>
  );
}

function StopWatchInitial({ requestStart }: { requestStart: () => void }) {
  return (
    <StopWatchLayout>
      <h4>Initial</h4>
      <Duration durationMs={0} />
      <footer className="flex flex-row gap-1">
        <button onClick={requestStart}>Start</button>
      </footer>
    </StopWatchLayout>
  );
}

function StopWatchRunning({
  requestStop,
  startTimeMs,
}: {
  requestStop: () => void;
  startTimeMs: number;
}) {
  return (
    <StopWatchLayout>
      <h4>running…</h4>
      <Duration durationMs={useNow() - startTimeMs} />
      <footer className="flex flex-row gap-1">
        <button onClick={requestStop}>stop</button>
      </footer>
    </StopWatchLayout>
  );
}

function useNow() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);
  return now;
}

function StopWatchingStopped({
  requestResume,
  requestReset,
}: {
  requestResume: () => void;
  requestReset: () => void;
}) {
  return (
    <StopWatchLayout>
      <h4>stopped</h4>
      <Duration durationMs={562739} />
      <footer className="flex flex-row gap-1">
        <button onClick={requestResume}>resume</button>
        <button onClick={requestReset}>reset</button>
      </footer>
    </StopWatchLayout>
  );
}
