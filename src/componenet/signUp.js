import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import EndPoint from "./apis/EndPoint";

function SignUp() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      let response = await axios.post(EndPoint.SIGN_UP, state);
      toast.success(response.data.message);
      setState({
        name: "",
        email: "",
        password: "",
        role: ""
      });
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
    setIsLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <div
        className="login-wrapper d-flex justify-content-center align-items-center vh-100"
        style={{
          background: "linear-gradient(135deg, #003366, #005599)" // ✅ 2-shade gradient
        }}
      >
        {isLoading ? (
          <div className="spinner-border spinner-position"></div>
        ) : (
          ""
        )}

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

          <form onSubmit={handleSubmit}>
            <p className="text-center text-dark mb-4 fs-5 fw-semibold">
              🌿 Create your <span style={{ color: "#003366" }}>Sukoon</span>{" "}
              space — <br />
              <span style={{ fontWeight: "600" }}>
                Start your journey to peace today
              </span>
            </p>

            <input
              value={state.name}
              onChange={(event) =>
                setState({ ...state, name: event.target.value })
              }
              type="text"
              className="form-control mb-3 p-3 rounded-pill shadow-sm"
              placeholder="👤 Your Name"
              style={{ border: "1px solid #ccc" }}
            />

            <input
              value={state.email}
              onChange={(event) =>
                setState({ ...state, email: event.target.value })
              }
              type="email"
              className="form-control mb-3 p-3 rounded-pill shadow-sm"
              placeholder="📧 Email Address"
              style={{ border: "1px solid #ccc" }}
            />

            <input
              value={state.password}
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
              ✨ Sign Up
            </button>

            <p className="text-center">
              Already have a Calm account?{" "}
              <Link
                to="/login"
                className="text-decoration-none"
                style={{ color: "#003366", fontWeight: "600" }}
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
