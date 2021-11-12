import { ChangeEvent, useEffect, useReducer, useState } from "react";
import Duration from "./Duration";
import StopWatchLayout from "./StopWatchLayout";

export default function StopWatchRunning({
  requestStop,
  startTimeMs,
}: {
  requestStop: () => void;
  startTimeMs: number;
}) {
  const [refreshRate, onInputChange] = useReducer(
    (_: number, event: ChangeEvent<HTMLInputElement>) =>
      event.target.valueAsNumber,
    1,
  );

  return (
    <StopWatchLayout>
      <h4>running…</h4>
      <Duration durationMs={useNow(refreshRate) - startTimeMs} />

      <form>
        <label htmlFor="refreshRate">Refresh Rate:</label>
        <input
          type="range"
          id="refreshRate"
          min="1"
          max="1000"
          step="1"
          value={refreshRate}
          onChange={onInputChange}
        />
        <output>{refreshRate}Hz</output>
      </form>

      <footer>
        <button onClick={requestStop}>stop</button>
      </footer>

      <style jsx>{`
        form {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;
          color: hsl(240 100% 50%);
        }
      `}</style>
    </StopWatchLayout>
  );
}

function useNow(refreshRate: number = 1) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000 / refreshRate);
    return () => clearInterval(interval);
  }, [refreshRate]);
  return now;
}
