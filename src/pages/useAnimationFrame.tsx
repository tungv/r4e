import { useEffect, useReducer } from "react";

export function useAnimationFrame() {
  const [_, refresh] = useReducer((c) => c + 1, 0);
  useEffect(() => {
    let shouldContinue = true;

    function requestRefresh() {
      requestAnimationFrame(() => {
        if (!shouldContinue) return;

        refresh();
        requestRefresh();
      });
    }
    requestRefresh();

    return () => {
      shouldContinue = false;
    };
  }, []);
}
