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

      <footer>
        <button onClick={requestStop}>stop</button>
      </footer>
    </StopWatchLayout>
  );
}

function useNow() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    let cancelled = false;

    function repaint() {
      if (!cancelled) {
        setNow(Date.now());
        requestAnimationFrame(repaint);
      }
    }

    repaint();

    return () => {
      cancelled = true;
    };
  }, []);
  return now;
}
