import React, { useState, useEffect } from "react";

export default function BubbleContainer() {
  const [scale, setScale] = useState(1);
  const [phase, setPhase] = useState("inhale");
  const [isRunning, setIsRunning] = useState(false);

  const inhaleDuration = 4000;
  const holdDuration = 4000;
  const exhaleDuration = 6000;

  useEffect(() => {
    if (!isRunning) return;

    let start = Date.now();
    let animationFrame;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - start;

      let duration;
      if (phase === "inhale") duration = inhaleDuration;
      else if (phase === "hold") duration = holdDuration;
      else duration = exhaleDuration;

      const progress = Math.min(elapsed / duration, 1);

      let target;
      if (phase === "inhale") target = 1 + 0.4 * progress; // grow bubble
      else if (phase === "hold") target = 1.4; // keep bubble expanded
      else target = 1.4 - 0.4 * progress; // shrink bubble

      setScale(target);

      if (progress >= 1) {
        if (phase === "inhale") setPhase("hold");
        else if (phase === "hold") setPhase("exhale");
        else setPhase("inhale");

        start = Date.now();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [phase, isRunning]);

  const getPhaseText = () => {
    if (phase === "inhale") return "Breathe in";
    else if (phase === "hold") return "Hold";
    else return "Breathe out";
  };

  return (
    <>
      {/* Deep Breathing Info Section */}
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-start px-4 py-5 bg-light">
        <h1 className="display-4 fw-bold text-dark mb-4">Deep breathing</h1>

        <p className="fs-5 text-secondary text-center mb-4 w-75">
          Deep breathing is a simple relaxation technique that helps you feel
          better when you’re stressed.
        </p>

        <p className="text-muted text-center mb-4 w-75">
          This tool will show you how to do a deep breathing exercise sometimes
          called square breathing. When you’ve got the hang of it, you can do it
          almost anywhere you feel stressed: at home, at work or in public.
        </p>

        <div
          className="card shadow-sm rounded-4 p-4 w-100"
          style={{ maxWidth: "700px" }}
        >
          <h2 className="h4 fw-semibold mb-3">There are four easy steps:</h2>
          <ol className="ps-3 text-secondary">
            <li>Breathe in deeply for around four seconds</li>
            <li>Hold your breath for around four seconds</li>
            <li>Breathe out for around four seconds</li>
            <li>Hold your breath for around four seconds</li>
          </ol>
        </div>

        <p className="text-muted mt-4 text-center">
          Repeat this for a few minutes or until you start feeling better.
        </p>

        <button className="btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-pill shadow">
          Chat Live
        </button>
      </div>

      {/* Bubble Breathing Exercise Section */}
      <div
        style={{
          margin: "40px",
          height: "500px",
          background: "#1e3d59",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          padding: "20px",
          overflow: "hidden",
        }}
      >
        {/* Bubble container */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Bubble */}
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${scale})`,
              transformOrigin: "center center",
              transition: "transform 0.1s linear",
            }}
          >
            <span style={{ color: "#333", fontSize: "20px" }}>
              {getPhaseText()}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            position: "absolute",
            bottom: "20px",
            width: "100%",
          }}
        >
          <button
            onClick={() => setIsRunning(true)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#4caf50",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Start
          </button>
          <button
            onClick={() => setIsRunning(false)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#f44336",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Stop
          </button>
        </div>
      </div>
    </>
  );
}
