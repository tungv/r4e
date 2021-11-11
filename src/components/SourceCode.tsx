import React from "react";
import useSWR from "swr";
import SyntaxHighlighter from "react-syntax-highlighter";

export default function SourceCode({ path }: { path: string }) {
  const { data, error } = useSWR(`/api/sources/${path}`, (url) =>
    fetch(url).then((resp) => resp.text()),
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading…</div>;

  return (
    <div className="h-full overflow-auto">
      <SyntaxHighlighter language="typescript" showLineNumbers>
        {data}
      </SyntaxHighlighter>
    </div>
  );
}
