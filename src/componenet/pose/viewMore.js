import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EndPoint from "../apis/EndPoint";

const PoseDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pose, setPose] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPose = async () => {
      try {
        const res = await axios.get(EndPoint.FATCH_POSE_ID(id));
        setPose(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch pose details");
      } finally {
        setLoading(false);
      }
    };
    fetchPose();
  }, [id]);

  if (loading) {
    return (
      <h4
        style={{
          textAlign: "center",
          marginTop: "50px",
          color: "#1976d2",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Loading...
      </h4>
    );
  }

  if (!pose) {
    return (
      <h4
        style={{
          textAlign: "center",
          marginTop: "50px",
          color: "#d32f2f",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Pose not found
      </h4>
    );
  }

const imageUrl = pose.image?.startsWith("http")
  ? pose.image
  : `http://localhost:3000/pose/${pose.image}`;

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "linear-gradient(135deg, #f6f9fc, #fdfbfb)",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          width: "100%",
            height: "500px",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "40px",
            color: "white",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "50px",
              fontSize: "1rem",
              position: "absolute",
              top: "20px",
              left: "20px",
              cursor: "pointer",
              backdropFilter: "blur(5px)",
            }}
          >
            ← Back
          </button>
          <h1 style={{ fontSize: "3rem", marginBottom: "0" }}>{pose.name}</h1>
          {pose.sanskritName && (
            <h3
              style={{
                fontSize: "1.5rem",
                fontStyle: "italic",
                opacity: 0.9,
              }}
            >
              {pose.sanskritName}
            </h3>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
        {/* Quick Info */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "15px",
          }}
        >
          {pose.level && (
            <span
              style={{
                background: "#ffebee",
                padding: "6px 12px",
                borderRadius: "30px",
                fontWeight: 500,
                fontSize: "0.9rem",
              }}
            >
              Level: {pose.level}
            </span>
          )}
          {pose.duration && (
            <span
              style={{
                background: "#e3f2fd",
                padding: "6px 12px",
                borderRadius: "30px",
                fontWeight: 500,
                fontSize: "0.9rem",
              }}
            >
              ⏱ {pose.duration}s
            </span>
          )}
          {pose.caloriesBurned && (
            <span
              style={{
                background: "#fff3e0",
                padding: "6px 12px",
                borderRadius: "30px",
                fontWeight: 500,
                fontSize: "0.9rem",
              }}
            >
              🔥 {pose.caloriesBurned} cal
            </span>
          )}
          {pose.difficultyScore && (
            <span
              style={{
                background: "#ede7f6",
                padding: "6px 12px",
                borderRadius: "30px",
                fontWeight: 500,
                fontSize: "0.9rem",
              }}
            >
              ⭐ {pose.difficultyScore}/10
            </span>
          )}
        </div>

        {/* Tags */}
        {pose.tags && pose.tags.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            {pose.tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  background: "#e3f2fd",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  marginRight: "6px",
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
              background: "rgba(255, 255, 255, 0.85)",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "16px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            }}
          >
            <h2 style={{ marginBottom: "12px", fontSize: "1.3rem" }}>
              Instructions
            </h2>
            <p>{pose.instructions}</p>
          </div>
        )}

        {pose.steps?.length > 0 && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "16px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            }}
          >
            <h2 style={{ marginBottom: "12px", fontSize: "1.3rem" }}>Steps</h2>
            <ol>
              {pose.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {pose.benefits?.length > 0 && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "16px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            }}
          >
            <h2 style={{ marginBottom: "12px", fontSize: "1.3rem" }}>
              Benefits
            </h2>
            <ul>
              {pose.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        )}

        {pose.contraindications?.length > 0 && (
          <div
            style={{
              background: "rgba(255, 0, 0, 0.05)",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "16px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            }}
          >
            <h2 style={{ marginBottom: "12px", fontSize: "1.3rem" }}>
              Contraindications
            </h2>
            <ul>
              {pose.contraindications.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        {pose.focusAreas?.length > 0 && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "16px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            }}
          >
            <h2 style={{ marginBottom: "12px", fontSize: "1.3rem" }}>
              Focus Areas
            </h2>
            <ul>
              {pose.focusAreas.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {pose.preparation && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "16px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            }}
          >
            <h2 style={{ marginBottom: "12px", fontSize: "1.3rem" }}>
              Preparation
            </h2>
            <p>{pose.preparation}</p>
          </div>
        )}

        {/* Favorite Button */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{
              background: "linear-gradient(45deg, #ff4081, #ff7043)",
              color: "white",
              padding: "14px 30px",
              fontSize: "1.1rem",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={() => toast.info("Added to favorites (coming soon)")}
          >
            ❤️ Add to Favorite
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoseDetail;
