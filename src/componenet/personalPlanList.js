import React, { useEffect, useReducer } from "react";
import {
  FaClock,
  FaLevelUpAlt,
  FaSmile,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaForward,
} from "react-icons/fa";
import { getCurrentUser } from "./auth/auth";
import axios from "axios";
import EndPoint from "./apis/EndPoint";

function PersonalPlanList() {
  const user = getCurrentUser();
  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type === "get-item") {
        return { ...state, plan: action.payload };
      }
      return state;
    },
    {
      plan: [],
    }
  );

  useEffect(() => {
    loadPlan();
  }, []);

  const loadPlan = async () => {
    try {
      let response = await axios.get(
        EndPoint.USER_PERSONALROUTINE_LIST(user._id)
      );
      console.log("response data", response.data.message);
      dispatch({ type: "get-item", payload: response.data.message });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4 text-primary">
          🧘 Personal Yoga Plan
        </h2>

        {state.plan.map((plan, i) => (
          <div key={i} className="bg-light rounded-4 p-4 shadow-sm mb-4">
            <h5 className="mb-3 text-secondary">📝 Summary #{i + 1}</h5>
            <div className="row">
              <div className="col-md-3">
                <p>
                  <FaSmile className="text-warning me-2" />{" "}
                  <strong>Mood:</strong> {plan.mood}
                </p>
              </div>
              <div className="col-md-3">
                <p>
                  <FaClock className="text-info me-2" />{" "}
                  <strong>Time:</strong> {plan.timeAvailble} mins
                </p>
              </div>
              <div className="col-md-3">
                <p>
                  <FaLevelUpAlt className="text-success me-2" />{" "}
                  <strong>Level:</strong> {plan.level}
                </p>
              </div>
              <div className="col-md-3">
                <p>
                  <FaCalendarAlt className="text-danger me-2" />{" "}
                  <strong>Date:</strong>{" "}
                  {new Date(plan.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <h6 className="mt-3 text-muted">📋 Pose List</h6>
            <div className="row g-4">
              {plan.poseList?.map((pose, index) => (
  <div className="col-md-4" key={index}>
    <div className="card border-0 shadow rounded-4 h-100">
      <div className="card-body">
        <h5 className="card-title fw-bold text-primary mb-2">
          {pose.pose?.name}
        </h5>

        {/* Description */}
        {pose.pose?.description && (
          <p><strong>Description:</strong> {pose.pose.description}</p>
        )}

        {/* Difficulty / Level */}
        {pose.pose?.level && (
          <p><strong>Level:</strong> {pose.pose.level}</p>
        )}

        {/* Category */}
        {pose.pose?.category && (
          <p><strong>Category:</strong> {pose.pose.category}</p>
        )}

        {/* Duration */}
        {pose.pose?.duration && (
          <p><strong>Duration:</strong> {pose.pose.duration} second</p>
        )}

        {/* Image */}
        {pose.pose?.image && (
          <div className="mb-2">
            <img
              src={`http://localhost:3000/pose/${pose.pose.image}`}
              alt={pose.pose.name}
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </div>
        )}

        {/* Status */}
        <p>
          <strong>Status:</strong>{" "}
          {pose.isCompleted
            ? "✅ Completed"
            : pose.isSkipped
            ? "⏭️ Skipped"
            : "⏳ Not Done"}
        </p>
        <botton className = "btn btn-primary">not done</botton>
      </div>
    </div>
  </div>
))}

            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PersonalPlanList;
