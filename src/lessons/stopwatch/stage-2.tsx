import { useState } from "react";

export default function StopWatchApp() {
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
    <div>
      {!hasStarted && <StopWatchInitial requestStart={start} />}
      {hasStarted && !isPausing && <StopWatchRunning requestStop={stop} />}
      {hasStarted && isPausing && (
        <StopWatchingStopped requestReset={reset} requestResume={resume} />
      )}
    </div>
  );
}

function StopWatchInitial({ requestStart }: { requestStart: () => void }) {
  return (
    <section>
      <h4>Initial</h4>
      <div className="duration">
        <span>{`00:00:00.000`}</span>
      </div>
      <footer className="flex flex-row gap-1">
        <button onClick={requestStart}>Start</button>
      </footer>

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

function StopWatchRunning({ requestStop }: { requestStop: () => void }) {
  return (
    <section>
      <h4>running…</h4>
      <div className="duration">
        <span>01:23:45.678</span>
      </div>
      <footer className="flex flex-row gap-1">
        <button onClick={requestStop}>stop</button>
      </footer>

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

function StopWatchingStopped({
  requestResume,
  requestReset,
}: {
  requestResume: () => void;
  requestReset: () => void;
}) {
  return (
    <section>
      <h4>stopped</h4>
      <div className="duration">
        <span>01:23:45.678</span>
      </div>
      <footer className="flex flex-row gap-1">
        <button onClick={requestResume}>resume</button>
        <button onClick={requestReset}>reset</button>
      </footer>

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
