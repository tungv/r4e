import React, { PropsWithChildren, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import SourceCode from "../../components/SourceCode";

export default function StopWatchLesson(
  props: PropsWithChildren<{ srcFilePath: string }>,
) {
  return (
    <div className="flex flex-row divide-x relative">
      <Head>
        <title>StopWatchApp - React for Enterprise by Tung Vu</title>
      </Head>
      <aside className="flex flex-col p-2">
        <h1 className="text-lg">Stop Watch</h1>
        <nav>
          <ol className="flex flex-col gap-1">
            <li>
              <Link href="/stopwatch/1">Step 1</Link>
              <p className="text-sm text-gray-600">Branching by state</p>
            </li>
            <li>
              <Link href="/stopwatch/2">Step 2</Link>
              <p className="text-sm text-gray-600">
                Break state into multiple components
              </p>
            </li>
            <li>
              <Link href="/stopwatch/3">Step 3</Link>
              <p className="text-sm text-gray-600">
                Extract common parts into a component
              </p>
            </li>
            <li>
              <Link href="/stopwatch/4">Step 4</Link>
              <p className="text-sm text-gray-600">The clock is ticking</p>
            </li>
            <li>
              <Link href="/stopwatch/5">Step 5</Link>
              <p className="text-sm text-gray-600">Move faster</p>
            </li>
          </ol>
        </nav>
      </aside>

      <div className="flex flex-row flex-1 max-h-full">
        <main className="flex-1 p-4">
          <div className="sticky top-4 flex flex-col gap-8">
            {props.children}
          </div>
        </main>
        <aside className="flex-1">
          <SourceCode path={props.srcFilePath} />
        </aside>
      </div>
    </div>
  );
}
