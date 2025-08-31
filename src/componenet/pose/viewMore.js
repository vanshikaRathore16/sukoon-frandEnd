import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EndPoint from "../apis/EndPoint";
import { FaExclamationTriangle } from "react-icons/fa";

const PoseDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pose, setPose] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPose = async () => {
      try {
        const res = await axios.get(EndPoint.FATCH_POSE_ID(id));
        const poseData = res.data;

        // Debug: Log raw data
        console.log("Raw pose data:", poseData);
        console.log("Contraindications raw value:", poseData.contraindications);
        console.log("Contraindications type:", typeof poseData.contraindications);

        // Handle contraindications
        let contraindications = [];
        if (poseData.contraindications) {
          if (Array.isArray(poseData.contraindications)) {
            contraindications = poseData.contraindications;
          } else if (typeof poseData.contraindications === "string") {
            try {
              contraindications = JSON.parse(poseData.contraindications);
              if (!Array.isArray(contraindications)) {
                throw new Error("Parsed contraindications is not an array");
              }
            } catch (e) {
              console.error("JSON.parse failed for contraindications:", e);
              // Fallback: Manually parse string like "['item1', 'item2']"
              contraindications = poseData.contraindications
                .replace(/^\[|\]$/g, "") // Remove [ and ]
                .replace(/['"]/g, "") // Remove quotes
                .split(",")
                .map((item) => item.trim())
                .filter((item) => item);
            }
          }
        }

        // Debug: Log parsed contraindications
        console.log("Parsed contraindications:", contraindications);

        setPose({ ...poseData, contraindications });
      } catch (err) {
        console.error("Error fetching pose:", err);
        toast.error("Failed to fetch pose details");
      } finally {
        setLoading(false);
      }
    };
    fetchPose();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #e6f0fa, #f0f7ff)",
        }}
      >
        <h4
          style={{
            textAlign: "center",
            color: "#1a3c6d",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "500",
            fontSize: "1.5rem",
          }}
        >
          Loading...
        </h4>
      </div>
    );
  }

  if (!pose) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #e6f0fa, #f0f7ff)",
        }}
      >
        <h4
          style={{
            textAlign: "center",
            color: "#d32f2f",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "500",
            fontSize: "1.5rem",
          }}
        >
          Pose not found
        </h4>
      </div>
    );
  }

  const imageUrl = pose.image?.startsWith("http")
    ? pose.image
    : `http://localhost:3000/pose/${pose.image}`;

  return (
    <div
      style={{
        fontFamily: "'Open Sans', sans-serif",
        background: "linear-gradient(135deg, #e6f0fa, #f0f7ff)",
        minHeight: "100vh",
        paddingBottom: "40px",
      }}
    >
      {/* Hero Section: Name and Sanskrit Name */}
      <div
        style={{
          width: "100%",
          padding: "40px 20px",
          textAlign: "left",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "#003366",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "50px",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            marginBottom: "20px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00a896")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#00c4b4")}
        >
          ← Back
        </button>
        <h1
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "3rem",
            fontWeight: "700",
            color: "#1a3c6d",
            marginBottom: "10px",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {pose.name}
        </h1>
        {pose.sanskritName && (
          <h3
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "1.5rem",
              fontStyle: "italic",
              color: "#4a4a4a",
              opacity: 0.9,
            }}
          >
            {pose.sanskritName}
          </h3>
        )}
      </div>

      {/* Hero Section: Image */}
      <div
        style={{
          width: "100%",
          height: "50vh",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          margin: "20px 0",
          maxWidth: "900px",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0, 51, 102, 0.1)",
        }}
      />

      {/* Content Section */}
      <div style={{ padding: "40px 20px", maxWidth: "900px", margin: "auto" }}>
        {/* Quick Info */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "25px",
          }}
        >
          {pose.level && (
            <span
              style={{
                background: "#b3e5fc",
                padding: "8px 16px",
                borderRadius: "20px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "500",
                fontSize: "0.9rem",
                color: "#1a3c6d",
              }}
            >
              Level: {pose.level}
            </span>
          )}
          {pose.duration && (
            <span
              style={{
                background: "#e0f7fa",
                padding: "8px 16px",
                borderRadius: "20px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "500",
                fontSize: "0.9rem",
                color: "#1a3c6d",
              }}
            >
              ⏱ {pose.duration}s
            </span>
          )}
          {pose.caloriesBurned && (
            <span
              style={{
                background: "#f0fff4",
                padding: "8px 16px",
                borderRadius: "20px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "500",
                fontSize: "0.9rem",
                color: "#1a3c6d",
              }}
            >
              🔥 {pose.caloriesBurned} cal
            </span>
          )}
          {pose.difficultyScore && (
            <span
              style={{
                background: "#e6f0fa",
                padding: "8px 16px",
                borderRadius: "20px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "500",
                fontSize: "0.9rem",
                color: "#1a3c6d",
              }}
            >
              ⭐ {pose.difficultyScore}/10
            </span>
          )}
        </div>

        {/* Tags */}
        {pose.tags && pose.tags.length > 0 && (
          <div style={{ marginBottom: "25px" }}>
            {pose.tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  background: "#b3e5fc",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.85rem",
                  marginRight: "8px",
                  color: "#1a3c6d",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Sections */}
        {pose.instructions && (
          <div
            style={{
              background: "#fff",
              padding: "25px",
              marginBottom: "25px",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0, 51, 102, 0.1)",
            }}
          >
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "1.5rem",
                color: "#1a3c6d",
                marginBottom: "15px",
              }}
            >
              Instructions
            </h2>
            <p style={{ lineHeight: "1.8", color: "#4a4a4a" }}>
              {pose.instructions}
            </p>
          </div>
        )}

        {pose.steps?.length > 0 && (
          <div
            style={{
              background: "#fff",
              padding: "25px",
              marginBottom: "25px",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0, 51, 102, 0.1)",
            }}
          >
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "1.5rem",
                color: "#1a3c6d",
                marginBottom: "15px",
              }}
            >
              Steps
            </h2>
            <ol style={{ lineHeight: "1.8", color: "#4a4a4a" }}>
              {pose.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {pose.benefits?.length > 0 && (
          <div
            style={{
              background: "#fff",
              padding: "25px",
              marginBottom: "25px",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0, 51, 102, 0.1)",
            }}
          >
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "1.5rem",
                color: "#1a3c6d",
                marginBottom: "15px",
              }}
            >
              Benefits
            </h2>
            <ul style={{ lineHeight: "1.8", color: "#4a4a4a" }}>
              {pose.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        )}

        {pose.contraindications && (
          <div
            style={{
              background: "rgba(255, 235, 238, 0.2)",
              padding: "25px",
              marginBottom: "25px",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0, 51, 102, 0.1)",
              borderLeft: "4px solid #d32f2f",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "1.5rem",
                color: "#1a3c6d",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaExclamationTriangle style={{ color: "#d32f2f", fontSize: "1.3rem" }} /> Contraindications
            </h2>
            <ul style={{ lineHeight: "1.8", color: "#4a4a4a", paddingLeft: "20px" }}>
              {(Array.isArray(pose.contraindications) && pose.contraindications.length > 0) ? (
                pose.contraindications.map((c, i) => (
                  <li key={i} style={{ marginBottom: "8px" }}>
                    {c}
                  </li>
                ))
              ) : (
                <li style={{ fontStyle: "italic", color: "#6b7280" }}>
                  No contraindications available
                </li>
              )}
            </ul>
          </div>
        )}

        {pose.focusAreas?.length > 0 && (
          <div
            style={{
              background: "#fff",
              padding: "25px",
              marginBottom: "25px",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0, 51, 102, 0.1)",
            }}
          >
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "1.5rem",
                color: "#1a3c6d",
                marginBottom: "15px",
              }}
            >
              Focus Areas
            </h2>
            <ul style={{ lineHeight: "1.8", color: "#4a4a4a" }}>
              {pose.focusAreas.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {pose.preparation && (
          <div
            style={{
              background: "#fff",
              padding: "25px",
              marginBottom: "25px",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0, 51, 102, 0.1)",
            }}
          >
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "1.5rem",
                color: "#1a3c6d",
                marginBottom: "15px",
              }}
            >
              Preparation
            </h2>
            <p style={{ lineHeight: "1.8", color: "#4a4a4a" }}>
              {pose.preparation}
            </p>
          </div>
        )}

        {/* Favorite Button */}
        {/* <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{
              background: "#00c4b4",
              color: "#fff",
              padding: "14px 30px",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.1rem",
              fontWeight: "500",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#00a896";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#00c4b4";
              e.currentTarget.style.transform = "scale(1)";
            }}
            onClick={() => toast.info("Added to favorites (coming soon)")}
          >
            ❤️ Add to Favorite
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PoseDetail;