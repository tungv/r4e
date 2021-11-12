import Duration from "./Duration";
import StopWatchLayout from "./StopWatchLayout";

export default function StopWatchInitial({
  requestStart,
}: {
  requestStart: () => void;
}) {
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
