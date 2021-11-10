import { animate } from "motion";
import { CSSProperties, memo, useEffect, useRef, useState } from "react";

export default function AnalogClock() {
  const clockRef = useRef<HTMLDivElement>();
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
  const secondHandRef = useRef<HTMLDivElement>();
  const minuteHandRef = useRef<HTMLDivElement>();
  const hourHandRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const time = new Date(Date.now());

    const ss = time.getSeconds();
    const mm = time.getMinutes() + ss / 60;
    const hh = time.getHours() + mm / 60;
    // const ms = time.getMilliseconds();

    const secondCtrl = animate(
      secondHandRef.current,
      {
        transform: [
          `rotate(${ss * 6 - 90}deg)`,
          `rotate(${360 + ss * 6 - 90}deg)`,
        ],
      },
      {
        duration: 60,
        easing: "linear",
        repeat: Infinity,
      },
    );

    const minuteCtrl = animate(
      minuteHandRef.current,
      {
        transform: [
          `rotate(${mm * 6 - 90}deg)`,
          `rotate(${360 + mm * 6 - 90}deg)`,
        ],
      },
      {
        duration: 60 * 60,
        easing: "linear",
        repeat: Infinity,
      },
    );

    const hourCtrl = animate(
      hourHandRef.current,
      {
        transform: [
          `rotate(${hh * 30 - 90}deg)`,
          `rotate(${360 + hh * 30 - 90}deg)`,
        ],
      },
      {
        duration: 12 * 60 * 60,
        easing: "linear",
        repeat: Infinity,
      },
    );

    return () => {
      secondCtrl.stop();
      minuteCtrl.stop();
      hourCtrl.stop();
    };
  }, []);

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
      <div className="clock__hand clock__hand--hour" ref={hourHandRef} />
      <div className="clock__hand clock__hand--minute" ref={minuteHandRef} />
      <div ref={secondHandRef} className="clock__hand clock__hand--second" />

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
