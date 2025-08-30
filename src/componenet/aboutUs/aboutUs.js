
import React, { useState, useEffect, useRef } from "react";

export default function TimerApp() {
  const [mode, setMode] = useState("duration"); // duration | countdown
  const [duration, setDuration] = useState(10); // minutes
  const [timeLeft, setTimeLeft] = useState(600); // in seconds
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  // update timeLeft when duration changes
  useEffect(() => {
    if (!running) setTimeLeft(duration * 60);
  }, [duration, running]);

  // timer logic
  useEffect(() => {
    if (running && !paused && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && running) {
      clearTimeout(timerRef.current);
      setRunning(false);
      alert("Time's up!");
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, running, paused]);

  // format seconds -> MM:SS
  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // handle start based on mode
  const handleBegin = () => {
    setTimeLeft(duration * 60);
    setRunning(true);
    setPaused(false);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 position-relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🔥 Transparent overlay on background */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      ></div>

      {/* Content (setup + running screens) */}
      <div className="position-relative">
        {!running ? (
          // Setup screen
          <div
            className="card text-center shadow-lg"
            style={{
              width: "400px",
              backgroundColor: "rgba(0,0,0,0.8)",
              color: "white",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            {/* Mode buttons */}
            <div className="d-flex justify-content-around mb-4">
              <button
                className={`btn btn-sm ${
                  mode === "countdown" ? "btn-info" : "btn-secondary"
                }`}
                onClick={() => setMode("countdown")}
              >
                Count Down
              </button>
              <button
                className={`btn btn-sm ${
                  mode === "duration" ? "btn-info" : "btn-secondary"
                }`}
                onClick={() => setMode("duration")}
              >
                Duration
              </button>
            </div>

            {/* Time display */}
            <h1 style={{ fontSize: "60px", fontWeight: "bold" }}>
              {formatTime(duration * 60)}
            </h1>
            <p>Minutes</p>

            {/* Slider */}
            <input
              type="range"
              min="1"
              max="60"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="form-range"
            />

            {/* Begin button */}
            <button
              className="btn btn-info mt-4 fw-bold px-4 py-2"
              onClick={handleBegin}
            >
              BEGIN
            </button>
          </div>
        ) : (
          // Running screen (Glass-like UI)
          <div
            className="text-center d-flex flex-column justify-content-center align-items-center"
            style={{
              width: "550px",
              height: "280px",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(12px)",
              borderRadius: "25px",
              boxShadow: "0px 4px 25px rgba(0,0,0,0.4)",
            }}
          >
            <h1
              style={{
                fontSize: "100px",
                fontWeight: "bold",
                color: "white",
                textShadow: "2px 2px 15px rgba(0,0,0,0.6)",
              }}
            >
              {formatTime(timeLeft)}
            </h1>
            <button
              className="btn fw-bold mt-3 px-5 py-2"
              style={{
                backgroundColor: "#00f5d4",
                borderRadius: "25px",
                color: "black",
                fontSize: "20px",
                letterSpacing: "2px",
              }}
              onClick={() => setPaused(!paused)}
            >
              {paused ? "RESUME" : "PAUSE"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
