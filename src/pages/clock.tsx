import React, { CSSProperties, memo, useEffect, useRef, useState } from "react";
import OffClock from "../OffClock";
import { useAnimationFrame } from "../useAnimationFrame";

function blockJS() {
  let i = 0;
  if (
    !confirm(
      "Are you sure you want to block JavaScript with `while (++i < 10e9);` ?",
    )
  ) {
    return;
  }
  console.time("block");
  while (++i < 10e9);
  console.timeEnd("block");
}

export default function ClockPage() {
  return (
    <div>
      <button onClick={blockJS}>block</button>

      <div className="clocks">
        <div>
          <h1>animation frame + rerender css var</h1>
          <ClockWithAnimationFrame />
        </div>
        <div>
          <h1>animation frame + setProperty</h1>
          <ClockWithRefAndSetProperty />
        </div>
        <div>
          <h1>Off-main-thread WebAnimation API</h1>
          <OffClock />
        </div>
      </div>

      <style jsx>{`
        .clocks {
          display: flex;
          flex-direction: row;
          gap: 1rem;
        }

        .clock div {
        }
      `}</style>
    </div>
  );
}

function ClockWithAnimationFrame() {
  useAnimationFrame();

  const time = new Date(Date.now());

  const ms = time.getMilliseconds();
  const ss = time.getSeconds() + ms / 1000;
  const mm = time.getMinutes();
  const hh = time.getHours();

  return (
    <div
      className="clock"
      style={
        {
          "--hour": hh,
          "--minute": mm,
          "--second": ss,
        } as CSSProperties
      }
    >
      <ClockFace />
      <style jsx>{`
        .clock {
          width: 400px;
          height: 400px;
          position: relative;
        }
      `}</style>
    </div>
  );
}

function ClockWithRefAndSetProperty() {
  // useAnimationFrame();

  const clockRef = useRef<HTMLDivElement>();

  useEffect(() => {
    function repaint() {
      const time = new Date(Date.now());

      const ms = time.getMilliseconds();
      const ss = time.getSeconds() + ms / 1000;
      const mm = time.getMinutes();
      const hh = time.getHours();

      if (clockRef.current) {
        requestAnimationFrame(repaint);

        clockRef.current.style.setProperty("--hour", String(hh));
        clockRef.current.style.setProperty("--minute", String(mm));
        clockRef.current.style.setProperty("--second", String(ss));
      }
    }

    repaint();
  }, []);

  return (
    <div className="clock" ref={clockRef}>
      <ClockFace />
      <style jsx>{`
        .clock {
          width: 400px;
          height: 400px;
          position: relative;
        }
      `}</style>
    </div>
  );
}

const ClockFace = memo(function ClockFace() {
  return (
    <div className="clock__face">
      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          className="marker"
          style={
            {
              "--rotate": `${String(i * 6)}deg`,
            } as CSSProperties
          }
        >
          {i / 5 || 12}
        </div>
      ))}
      <div
        className="clock__hand clock__hand--hour"
        style={
          {
            "--rotate": `calc(
                (
                  var(--hour) + 
                  var(--minute) / 60 +
                  var(--second) / 3600
                ) * 30deg
                - 90deg
              )`,
          } as CSSProperties
        }
      />
      <div
        className="clock__hand clock__hand--minute"
        style={
          {
            "--rotate": `calc(
                (
                  var(--minute) +
                  var(--second) / 60
                ) * 6deg
                - 90deg
              )`,
          } as CSSProperties
        }
      />
      <div
        className="clock__hand clock__hand--second"
        style={
          {
            "--rotate": "calc(var(--second) * 6deg - 90deg)",
          } as CSSProperties
        }
      />

      <style jsx>{`
        .clock__face {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: hsl(0 50% 50%);
          border: 3px outset hsl(0 100% 50%);
          position: relative;
        }

        .clock__hand {
          width: 40%;
          height: 1px;
          background-color: hsl(0 0% 100%);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: rotate(var(--rotate));
          transform-origin: center left;
        }

        .clock__hand--hour {
          height: 3px;
          width: 35%;
        }

        .clock__hand--minute {
          height: 2px;
        }

        .marker {
          position: absolute;
          top: 0;
          left: 50%;
          text-align: center;
          height: 100%;
          width: 0;
          transform: rotate(var(--rotate)) translateX(-50%);
        }

        .marker:not(:nth-of-type(5n + 1)) {
          display: none;
        }
      `}</style>
    </div>
  );
});
