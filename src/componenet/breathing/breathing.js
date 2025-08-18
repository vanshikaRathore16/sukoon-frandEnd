import React, { useRef, useState, useEffect } from "react";

const exercises = [
  { 
    name: "Relax", gradient: "linear-gradient(135deg, #4fc3f7, #81d4fa)", pattern: "Inhale 4 → Exhale 6", 
    purpose: "Calm the nervous system", 
    benefits: ["Lowers heart rate","Reduces anxiety","Promotes relaxation"], 
    instructions: ["Sit comfortably","Inhale 4s","Exhale 6s","Repeat 5–10 cycles"] 
  },
  { 
    name: "Balance", gradient: "linear-gradient(135deg, #81c784, #a5d6a7)", pattern: "4-2-4", 
    purpose: "Harmonizes mind and body", 
    benefits: ["Balances oxygen & CO₂","Stabilizes emotions","Enhances focus"], 
    instructions: ["Sit or lie comfortably","Inhale 4s","Hold 2s","Exhale 4s","Repeat 5–10 rounds"] 
  },
  { 
    name: "Restore", gradient: "linear-gradient(135deg, #ffb74d, #ffe082)", pattern: "5-5", 
    purpose: "Restores energy", 
    benefits: ["Activates parasympathetic system","Reduces tension","Improves oxygen flow"], 
    instructions: ["Sit comfortably","Inhale 5s","Exhale 5s","Repeat 5–10 cycles"] 
  },
  { 
    name: "Focus", gradient: "linear-gradient(135deg, #ba68c8, #ce93d8)", pattern: "4-4-4-4", 
    purpose: "Improves clarity", 
    benefits: ["Calms mind","Reduces stress","Enhances concentration"], 
    instructions: ["Sit upright","Inhale 4s","Hold 4s","Exhale 4s","Hold 4s","Repeat 5–8 rounds"] 
  },
  { 
    name: "Energize", gradient: "linear-gradient(135deg, #f06292, #f48fb1)", pattern: "4-2", 
    purpose: "Boosts energy", 
    benefits: ["Increases oxygen","Awakens body","Improves focus"], 
    instructions: ["Sit upright","Inhale 4s","Exhale 2s","Repeat 10–15 cycles"] 
  },
  { 
    name: "Unwind", gradient: "linear-gradient(135deg, #4db6ac, #80cbc4)", pattern: "4-7-8", 
    purpose: "Deep relaxation", 
    benefits: ["Reduces stress hormones","Helps sleep","Relieves tension"], 
    instructions: ["Sit or lie comfortably","Inhale 4s","Hold 7s","Exhale 8s","Repeat 4–6 rounds"] 
  },
];

function BreathingLandingPage() {
  const [runningSection, setRunningSection] = useState(null);
  const [phaseIndexes, setPhaseIndexes] = useState(Array(exercises.length).fill(0));
  const [circleScales, setCircleScales] = useState(Array(exercises.length).fill(1));

  const phases = [
    { name: "Breathe In", duration: 4000, scale: 1.2 },
    { name: "Hold", duration: 7000, scale: 1.2 },
    { name: "Breathe Out", duration: 8000, scale: 0.8 },
  ];

  useEffect(() => {
    if (runningSection === null) return;
    let currentPhase = phaseIndexes[runningSection];
    let startTime = Date.now();
    let requestId;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const phaseDuration = phases[currentPhase].duration;

      const startScale = currentPhase === 0 ? 1 : phases[(currentPhase - 1 + phases.length) % phases.length].scale;
      const endScale = phases[currentPhase].scale;

      setCircleScales((prev) => prev.map((s, idx) => (idx === runningSection ? startScale + (endScale - startScale) * (elapsed / phaseDuration) : s)));

      if (elapsed >= phaseDuration) {
        currentPhase = (currentPhase + 1) % phases.length;
        setPhaseIndexes((prev) => prev.map((p, idx) => (idx === runningSection ? currentPhase : p)));
        startTime = Date.now();
      }

      requestId = requestAnimationFrame(animate);
    };

    requestId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestId);
  }, [runningSection]);

  return (
    <div style={{
      scrollSnapType: "y mandatory",
      overflowY: "scroll",
      height: "100vh",
    }}>
      {exercises.map((ex, idx) => (
        <div key={idx} style={{ 
          height: "100vh",
          scrollSnapAlign: "start",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: ex.gradient,
          padding: "40px",
          boxSizing: "border-box"
        }}>
          {/* Circle */}
          <div style={{ width: "250px", height: "250px", borderRadius: "50%", background: ex.gradient, transform: `scale(${circleScales[idx]})`, transition: "transform 0.1s linear", position: "relative", overflow: "hidden", boxShadow: "0 0 35px rgba(255,255,255,0.5)" }}>
            <div style={{ width: "200px", height: "200px", borderTop: "8px solid rgba(255,255,255,0.5)", borderRadius: "50%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(0deg)", animation: runningSection === idx ? "semiRotate 6s linear infinite" : "none" }}></div>
            <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "white", position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, -125px) rotate(0deg)`, transformOrigin: "50% 125px", animation: runningSection === idx ? "rotate 4s linear infinite" : "none" }}></div>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "24px", fontWeight: "bold", color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>{phases[phaseIndexes[idx]].name}</div>
          </div>

          {/* Start/End Button */}
          <div style={{ marginTop: "20px" }}>
            {runningSection === idx ? <button onClick={() => setRunningSection(null)} className="btn btn-danger">End</button> : <button onClick={() => setRunningSection(idx)} className="btn btn-primary">Start</button>}
          </div>

          {/* Details below */}
          <div style={{ width: "80%", maxWidth: "650px", marginTop: "30px", textAlign: "left", background: "linear-gradient(135deg, #fff, #f0f4f8)", borderRadius: "25px", padding: "30px", boxShadow: "0 15px 35px rgba(0,0,0,0.15)", border: "2px solid rgba(255,255,255,0.6)" }}>
            <h2 style={{ color: "#333", fontWeight: "700" }}>{ex.name}</h2>
            <p><strong>Pattern:</strong> {ex.pattern}</p>
            <p><strong>Purpose:</strong> {ex.purpose}</p>
            <p><strong>Benefits:</strong></p>
            <ul>{ex.benefits.map((b, i) => <li key={i}>{b}</li>)}</ul>
            <p><strong>Instructions:</strong></p>
            <ol>{ex.instructions.map((inst, i) => <li key={i}>{inst}</li>)}</ol>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes rotate {
          0% { transform: translate(-50%, -125px) rotate(0deg); }
          100% { transform: translate(-50%, -125px) rotate(360deg); }
        }
        @keyframes semiRotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default BreathingLandingPage;
