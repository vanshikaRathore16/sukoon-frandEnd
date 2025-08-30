import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import EndPoint from "./apis/EndPoint";

function LogIn() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (state.email && state.password) {
        let response = await axios.post(EndPoint.SiGN_IN, state);
        console.log("response.data:", response.data);
        sessionStorage.setItem(
          "current_user",
          JSON.stringify(response.data.message)
        );
        toast.success("Sign in successfully ✨");

        if (response.data.message.role === "admin") {
          navigate("/adminDoshboard");
        } else {
          navigate("/home");
        }
      } else {
        toast.error("Please enter valid email and password");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="login-wrapper d-flex justify-content-center align-items-center vh-100"
        style={{
          background: "linear-gradient(135deg, #003366, #005599)" // ✅ same gradient
        }}
      >
        <div
          className="login-card p-5 shadow-lg"
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            minWidth: "380px",
            maxWidth: "420px"
          }}
        >
          <h1
            className="text-center mb-3"
            style={{ color: "#003366", fontWeight: "700" }}
          >
            sukoon
          </h1>

          <p className="text-center text-dark mb-4 fs-5 fw-semibold">
            🌸 Return to your{" "}
            <span style={{ color: "#003366", fontWeight: "700" }}>Sukoon</span>{" "}
            <br />
            <span style={{ fontWeight: "600" }}>Log in to find your peace</span>
          </p>

          <form onSubmit={handleSubmit}>
            <input
              onChange={(event) =>
                setState({ ...state, email: event.target.value })
              }
              type="email"
              className="form-control mb-3 p-3 rounded-pill shadow-sm"
              placeholder="📧 Email Address"
              style={{ border: "1px solid #ccc" }}
            />

            <input
              onChange={(event) =>
                setState({ ...state, password: event.target.value })
              }
              type="password"
              className="form-control mb-4 p-3 rounded-pill shadow-sm"
              placeholder="🔒 Password"
              style={{ border: "1px solid #ccc" }}
            />

            <button
              type="submit"
              className="btn w-100 mb-3 rounded-pill"
              style={{
                background: "linear-gradient(135deg, #003366, #005599)",
                color: "white",
                fontWeight: "600",
                padding: "12px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => (e.target.style.opacity = "0.9")}
              onMouseOut={(e) => (e.target.style.opacity = "1")}
            >
              🚀 Continue
            </button>

            <p className="text-center">
              Don’t have a Calm account?{" "}
              <Link
                to="/signup"
                className="text-decoration-none"
                style={{ color: "#003366", fontWeight: "600" }}
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
