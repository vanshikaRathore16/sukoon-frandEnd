import React, { useState, useEffect, useRef } from "react";
import Header from "../Header";

export default function TimerApp() {
  const [mode, setMode] = useState("duration"); // duration | countdown
  const [duration, setDuration] = useState(10); // minutes
  const [timeLeft, setTimeLeft] = useState(600); // in seconds
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  // Update timeLeft when duration changes
  useEffect(() => {
    if (!running) setTimeLeft(duration * 60);
  }, [duration, running]);

  // Timer logic
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

  // Format seconds -> MM:SS
  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Handle start based on mode
  const handleBegin = () => {
    setTimeLeft(duration * 60);
    setRunning(true);
    setPaused(false);
  };

  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Lighter overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, rgba(26, 60, 109, 0.2), rgba(0, 51, 102, 0.4))",
          }}
        ></div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {!running ? (
            // Setup screen
            <div
              style={{
                width: "400px",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(230, 240, 250, 0.1))",
                backdropFilter: "blur(15px)",
                borderRadius: "20px",
                padding: "30px",
                boxShadow: "0 8px 24px rgba(0, 51, 102, 0.3)",
                color: "#fff",
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {/* Brand Name */}
              <h2
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  color: "#e6f0fa",
                  marginBottom: "20px",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                meditation Timer
              </h2>

              {/* Mode buttons */}
              

              {/* Time display */}
              <h1
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "4rem",
                  fontWeight: "700",
                  color: "#e6f0fa",
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
                  marginBottom: "10px",
                }}
              >
                {formatTime(duration * 60)}
              </h1>
              <p
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "1.1rem",
                  color: "#e6f0fa",
                  opacity: 0.8,
                  marginBottom: "20px",
                }}
              >
                Minutes
              </p>

              {/* Slider */}
              <input
                type="range"
                min="1"
                max="60"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                style={{
                  width: "100%",
                  height: "8px",
                  background: "linear-gradient(to right, #00c4b4, #b3e5fc)",
                  borderRadius: "5px",
                  cursor: "pointer",
                  appearance: "none",
                  outline: "none",
                  marginBottom: "25px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 196, 180, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              />

              {/* Begin button */}
              <button
                style={{
                  background: "#003366",
                  color: "#fff",
                  border: "none",
                  padding: "12px 30px",
                  borderRadius: "25px",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0, 51, 102, 0.3)",
                }}
                onClick={handleBegin}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#002244";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#003366";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                BEGIN
              </button>
            </div>
          ) : (
            // Running screen
            <div
              style={{
                width: "600px",
                height: "320px",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(230, 240, 250, 0.1))",
                backdropFilter: "blur(15px)",
                borderRadius: "25px",
                boxShadow: "0 8px 24px rgba(0, 51, 102, 0.3)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <h1
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "6rem",
                  fontWeight: "700",
                  color: "#e6f0fa",
                  textShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                  marginBottom: "20px",
                }}
              >
                {formatTime(timeLeft)}
              </h1>
              <button
                style={{
                  background: paused ? "#b3e5fc" : "#00c4b4",
                  color: "#fff",
                  border: "none",
                  padding: "12px 40px",
                  borderRadius: "25px",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0, 196, 180, 0.3)",
                  letterSpacing: "1px",
                }}
                onClick={() => setPaused(!paused)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = paused ? "#81d4fa" : "#00a896";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = paused ? "#b3e5fc" : "#00c4b4";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {paused ? "RESUME" : "PAUSE"}
              </button>
            </div>
          )}
        </div>

        {/* Custom styles for range input */}
        <style>
          {`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 20px;
              height: 20px;
              background: #00c4b4;
              border-radius: 50%;
              cursor: pointer;
              box-shadow: 0 0 8px rgba(0, 196, 180, 0.5);
              transition: all 0.3s ease;
            }
            input[type="range"]::-webkit-slider-thumb:hover {
              transform: scale(1.2);
              background: #00a896;
            }
            input[type="range"]::-moz-range-thumb {
              width: 20px;
              height: 20px;
              background: #00c4b4;
              border-radius: 50%;
              cursor: pointer;
              box-shadow: 0 0 8px rgba(0, 196, 180, 0.5);
              transition: all 0.3s ease;
            }
            input[type="range"]::-moz-range-thumb:hover {
              transform: scale(1.2);
              background: #00a896;
            }
          `}
        </style>
      </div>
    </>
  );
}