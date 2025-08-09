import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const HomePageBeforeLogin = () => {
  const backgroundImage =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1950&q=80";

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 200); // Trigger entrance animation
  }, []);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(65, 61, 61, 0.6), rgba(82, 79, 79, 0.6)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 style={{ margin: 0, fontWeight: "bold", fontSize: "28px" }}>Sukoon</h2>
       <Link
  to="/signup" // Change this to your desired route
  style={{
    background: "#fff",
    color: "#333",
    padding: "10px 20px",
    borderRadius: "30px",
    fontWeight: "600",
    fontSize: "16px",
    border: "none",
    textDecoration: "none",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease-in-out",
    display: "inline-block"
  }}
  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
>
  Let’s Start →
</Link>

      </div>

      {/* Hero Section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 20px",
          textAlign: "center",
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0px)" : "translateY(40px)",
          transition: "all 1s ease-out",
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            fontWeight: "700",
            lineHeight: "1.3",
            maxWidth: "900px",
          }}
        >
          Find Your Inner Peace with{" "}
          <span style={{ color: "#E0FFFF" }}>Sukoon</span>
        </h1>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "400",
            maxWidth: "700px",
            marginTop: "20px",
            color: "#f2f2f2",
          }}
        >
          Begin your journey to mindfulness and serenity. Breathe, relax, and let go of stress with our handpicked yoga, meditation, and mental wellness routines.
        </p>
      <Link
  to="/signup" // 🔁 Change this route to your actual destination
  style={{
    marginTop: "40px",
    background: "#E0FFFF",
    color: "#1a1a1a",
    padding: "12px 30px",
    borderRadius: "30px",
    fontSize: "18px",
    fontWeight: "bold",
    border: "none",
    textDecoration: "none",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    transition: "transform 0.3s ease",
    display: "inline-block"
  }}
  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
>
  Explore Now
</Link>

      </div>

      {/* Service Section */}
      <div
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "30px" }}>
          What We Offer
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          {[
            "Yoga Routines",
            "Meditation",
            "Quotes",
            "Daily Motivation",
            "Breathing Exercises",
            "Sleep Stories",
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                width: "260px",
                backgroundColor: "rgba(255,255,255,0.1)",
                padding: "25px",
                borderRadius: "20px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                transition: "transform 0.4s ease",
                transform: animate ? "translateY(0)" : "translateY(50px)",
                opacity: animate ? 1 : 0,
              }}
            >
              <h4 style={{ fontSize: "20px", fontWeight: "600" }}>{item}</h4>
              <p style={{ fontSize: "14px", marginTop: "10px", color: "#ddd" }}>
                {item === "Yoga Routines" && "Gentle stretches to calm your body."}
                {item === "Meditation" && "Guided sessions to still your mind."}
                {item === "Quotes" && "Inspiration for your soul."}
                {item === "Daily Motivation" && "Uplift your spirit every morning."}
                {item === "Breathing Exercises" && "Regain focus through breath."}
                {item === "Sleep Stories" && "Drift to sleep peacefully."}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#111",
          textAlign: "center",
          padding: "20px",
          color: "#aaa",
          fontSize: "14px",
        }}
      >
        © 2025 Sukoon. All rights reserved.
      </div>
    </div>
  );
};

export default HomePageBeforeLogin;
