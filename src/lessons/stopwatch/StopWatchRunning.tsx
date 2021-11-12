import { useEffect, useState } from "react";
import Duration from "./Duration";
import StopWatchLayout from "./StopWatchLayout";

export default function StopWatchRunning({
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
