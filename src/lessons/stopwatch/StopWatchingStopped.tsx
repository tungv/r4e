import Duration from "./Duration";
import StopWatchLayout from "./StopWatchLayout";

export default function StopWatchingStopped({
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
