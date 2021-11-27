import React from "react";

import StopWatchLesson from "../../compoment/Apps/StopWatchApp";
import StopWatchApp from "../../lessons/stopwatch/stage-3";
import loadSourceCode from "../../loadSourceCode";

export default function StopWatchPage({ sourceCode }) {
  return (
    <StopWatchLesson src={sourceCode}>
      <StopWatchApp />

      <article className="flex flex-col gap-4 mt-20">
        <h3 className="text-lg text-purple-800">Extract common compoment</h3>

        <p>
          <strong className="text-bold bg-green-800 text-white p-1 rounded-md">
            Pro tip:
          </strong>{" "}
          Start with very simple and powerful abstraction to avoid overthinking
        </p>

        <p>
          In this example, we will extract <code>{`<StopWatchLayout />`}</code>{" "}
          and <code>{`<Duration />`}</code> into common components because it's
          quite clear what they do.
        </p>

        <p>
          <code>{`<StopWatchLayout />`}</code> is a container that contains
          basic styling. From our observation, it's identical for each of the
          three states. Simple styling for the container.
        </p>

        <p>
          <code>{`<Duration />`}</code> is a component that displays the
          duration of the stopwatch. It will take the duration in milliseconds.
          Since time is hard, we will use <code>durationMs</code> to make it
          explicit that this is in milliseconds
        </p>
      </article>
    </StopWatchLesson>
  );
}

export async function getStaticProps() {
  const sourceCode = await loadSourceCode("lessons/stopwatch/stage-3.tsx");
  return {
    props: { sourceCode },
  };
}
