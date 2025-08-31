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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '40px 50px', backgroundColor: '#f8f9fa' }}>
      <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#212529', marginBottom: '40px' }}>Deep breathing</h1>
      <p style={{ fontSize: '1.5rem', color: '#6c757d', textAlign: 'center', marginBottom: '40px', width: '80%' }}>
        Deep breathing is a simple yet powerful relaxation technique that helps you alleviate stress and restore calm.
      </p>

      <p style={{ fontSize: '1.2rem', color: '#6c757d', textAlign: 'center', marginBottom: '30px', width: '75%' }}>
        This tool guides you through a deep breathing exercise, often called square breathing. Once mastered, you can practice it anywhere—home, work, or in public—to manage stress effectively.
      </p>

      <div style={{ backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '30px', maxWidth: '700px', width: '100%', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px', color: '#212529' }}>There are four easy steps:</h2>
        <ol style={{ paddingLeft: '20px', color: '#6c757d', fontSize: '1.1rem' }}>
          <li>Breathe in deeply for around four seconds</li>
          <li>Hold your breath for around four seconds</li>
          <li>Breathe out slowly for around six seconds</li>
          <li>Hold your breath again for around four seconds</li>
        </ol>
      </div>

      <p style={{ fontSize: '1.1rem', color: '#6c757d', textAlign: 'center', marginBottom: '30px' }}>
        Repeat this cycle for a few minutes or until you feel a sense of relief and calm.
      </p>

      

      
    </div>
  );
}