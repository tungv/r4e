import { PropsWithChildren } from "react";

export default function StopWatchLayout(props: PropsWithChildren<{}>) {
  return (
    <section>
      {props.children}

      <style jsx>{`
        section {
          margin: auto;
          width: 320px;
          padding: 16px;
          border: 2px solid hsl(0 50% 50%);
          border-radius: 8px;
        }
      `}</style>
    </section>
  );
}
