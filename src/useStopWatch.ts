import { useReducer, useState } from "react";

export default function useStopWatch(): {
  hasStarted: boolean;
  isPausing: boolean;
  elapsedTime: number;
  startTimeMs: number;
  laps: number[];
  lap: () => void;
  start: () => void;
  stop: () => void;
  resume: () => void;
  reset: () => void;
} {
  const [state, dispatch] = useReducer(stopWatchReducer, initialState);

  const hasStarted = state.hasStarted;
  const startTimeMs = state.startTimeMs;
  const isPausing = state.isPausing;
  const elapsedTime = state.elapsedTime;

  function start() {
    dispatch({ type: "start", payload: Date.now() });
  }

  function stop() {
    dispatch({ type: "stop", payload: Date.now() });
  }

  function resume() {
    dispatch({ type: "resume", payload: Date.now() - state.pauseTimeMs });
  }

  function reset() {
    dispatch({ type: "reset" });
  }

  function lap() {
    dispatch({ type: "lap", payload: Date.now() });
  }

  return {
    hasStarted,
    isPausing,
    elapsedTime,
    startTimeMs,
    laps: state.laps,
    lap,
    start,
    stop,
    resume,
    reset,
  };
}
interface StopWatchState {
  hasStarted: boolean;
  isPausing: boolean;

  pauseTimeMs: number;
  elapsedTime: number;
  startTimeMs: number;
  laps: number[];
}
const initialState: StopWatchState = {
  hasStarted: false,
  isPausing: false,
  elapsedTime: 0,
  pauseTimeMs: 0,
  startTimeMs: 0,
  laps: [],
};
type StopWatchAction =
  | { type: "start"; payload: number }
  | { type: "stop"; payload: number }
  | { type: "resume"; payload: number }
  | { type: "reset" }
  | { type: "lap"; payload: number };

function stopWatchReducer(
  state: StopWatchState,
  action: StopWatchAction,
): StopWatchState {
  switch (action.type) {
    case "start":
      return {
        ...state,
        hasStarted: true,
        isPausing: false,
        startTimeMs: action.payload,
      };

    case "stop":
      return {
        ...state,
        isPausing: true,
        pauseTimeMs: action.payload,
        elapsedTime: action.payload - state.startTimeMs,
      };

    case "resume":
      return {
        ...state,
        isPausing: false,
        startTimeMs: state.startTimeMs + action.payload,
        pauseTimeMs: 0,
      };

    case "reset":
      return initialState;

    case "lap":
      return {
        ...state,
        laps: [action.payload - state.startTimeMs, ...state.laps].slice(0, 10),
      };
    default:
      return state;
  }
}
