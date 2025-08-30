import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import EndPoint from "./apis/EndPoint";
import { getCurrentUser } from "./auth/auth";
import "react-toastify/dist/ReactToastify.css";

function PersonalPlan() {
  const [state, setState] = useState({
    mood: "",
    level: "",
    timeAvailable: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = getCurrentUser();
      if (!user) {
        toast.error("User not found. Please login again.");
        return;
      }
      const userId = user._id;
      const response = await axios.post(EndPoint.CREATE_PERSONAL_PLANE, {
        ...state,
        userId,
      });
      console.log(response.data);
      toast.success("Your personal plan has been created!");
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 409) {
        toast.error("You already created a plan for today!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          background: "linear-gradient(135deg, #095207ff, #75c998ff)",
          padding: "20px",
        }}
      >
        <div
          className="p-5 rounded-4 shadow-lg"
          style={{
            backgroundColor: "#ffffff",
            width: "100%",
            maxWidth: "80%",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >
          <h2 className="mb-3 text-center text-dark fw-bold">
            Create Your Personal Plan
          </h2>
          <p className="mb-4 text-center text-secondary">
            Tailor your energy, mood, and time — for your perfect flow.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <select
                onChange={(e) => setState({ ...state, mood: e.target.value })}
                className="form-control rounded-pill px-3 py-2 shadow-sm"
                style={{ border: "1px solid #ddd", fontSize: "16px" }}
              >
                <option value="">Select your mood</option>
                <option value="stressed">Stressed</option>
                <option value="tired">Tired</option>
                <option value="sad">Sad</option>
                <option value="energetic">Energetic</option>
              </select>
            </div>

            <div className="mb-3">
              <select
                onChange={(e) => setState({ ...state, level: e.target.value })}
                className="form-control rounded-pill px-3 py-2 shadow-sm"
                style={{ border: "1px solid #ddd", fontSize: "16px" }}
              >
                <option value="">Select your level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="mb-4">
              <select
                onChange={(e) =>
                  setState({ ...state, timeAvailable: e.target.value })
                }
                className="form-control rounded-pill px-3 py-2 shadow-sm"
                style={{ border: "1px solid #ddd", fontSize: "16px" }}
              >
                <option value="">Select time available</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn w-100 rounded-pill text-white fw-bold"
              style={{
                background:
                  "linear-gradient(90deg, #0c972aff, #1c884dff)",
                padding: "10px 0",
                fontSize: "16px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.target.style.background =
                  "linear-gradient(90deg, #088008ff, #044b1cff)")
              }
              onMouseOut={(e) =>
                (e.target.style.background =
                  "linear-gradient(90deg, #4ca051ff, #188b2cff)")
              }
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PersonalPlan;
