import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import EndPoint from '../apis/EndPoint';

const PoseDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, setState] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(EndPoint.FATCH_POSE_ID(id));
        setState(response.data);
        console.log("🔥 Fetching Pose by ID:", response.data);

         // assuming backend returns a single object now
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, [id]);

  if (!state) return <h4 className="text-center mt-5 text-danger">Pose not found</h4>;

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #e0f7fa 0%, #fff3e0 100%)",
        padding: "60px 20px",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "950px",
          width: "100%",
          borderRadius: "25px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-dark mb-4 rounded-pill"
        >
          ← Back
        </button>

        {/* Image */}
        <img
          src={`http://localhost:3000/pose/${state.image}`}
          alt={state.name}
          className="rounded-4 w-100 mb-4"
          style={{ height: "450px",width: "100%", objectFit: "contain",objectPosition: "center", boxShadow: "0 6px 16px rgba(0,0,0,0.15)" }}
        />

        {/* Text Content */}
        <div className="text-center px-3">
          <h2 className="fw-bold mb-3" style={{ fontSize: "2.4rem", color: "#2e2e2e" }}>
            {state.name}
          </h2>

          <h5 className="text-muted mb-2" style={{ fontSize: "1.2rem" }}>
            Level: <span className="fw-semibold text-dark">{state.level}</span>
          </h5>

          <h6 className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>
            Duration: <span className="fw-semibold text-dark">{state.duration} sec</span>
          </h6>

          {/* Tags */}
          <div className="mb-4 d-flex justify-content-center flex-wrap gap-2">
            {state.tags?.map((tag, index) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-pill"
                style={{
                  backgroundColor: `hsl(${tag * 60}, 85%, 90%)`,
                  color: "#444",
                  fontWeight: "500",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Instructions */}
          <p
            className="text-start text-secondary mb-4"
            style={{ fontSize: "1.1rem", whiteSpace: "pre-line" }}
          >
            {state.instructions}
          </p>

          {/* Add to Favorite */}
          <button
            className="btn btn-danger px-5 py-2 rounded-pill"
            style={{
              fontSize: "1.1rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            ❤️ Add to Favorite
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoseDetail;
