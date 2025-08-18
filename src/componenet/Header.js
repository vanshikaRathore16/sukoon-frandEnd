import { Link, useNavigate } from "react-router-dom";
import { isUserExit } from "./auth/auth";

function Header() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "linear-gradient(90deg, #111213ff, #030303ff)",
        padding: "15px 30px",
        position: "sticky",
        top: "0",
        zIndex: "1000",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo */}
      <Link
        className="navbar-brand fw-bold fs-3"
        to="/"
        style={{
          color: "#fff",
          letterSpacing: "1px",
        }}
      >
        Sukoon
      </Link>

      {/* Left Navigation */}
      <div className="d-flex gap-4 align-items-center flex-grow-1 ms-5">
        {[
          ["Home", "/home"],
          ["Mood", "/mood"],
          ["Quotes", "/qoute"],
          ["Pose", "/pose"],
          ["Personal Plan", "/personalplan"],
          ["Routine", "/routine"],
          ["breathing", "/breathing"],
          ["Article", "/article"],
          ["About Us", "/aboutus"],
          ["new mwtation", "/GETMEDITATION"],
        ].map(([label, path]) => (
          <Link
            key={path}
            to={path}
            className="nav-link"
            style={{
              color: "#fff",
              fontWeight: "500",
              transition: "color 0.3s, transform 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#f1f1f1";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#fff";
              e.target.style.transform = "scale(1)";
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Right Side */}
      <div className="d-flex gap-3 align-items-center">
        {/* <Link
          to="/favorite"
          className="nav-link fs-5"
          style={{
            color: "#fff",
            transition: "transform 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#f1f1f1";
            e.target.style.transform = "scale(1.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#fff";
            e.target.style.transform = "scale(1)";
          }}
        >
          <i className="bi bi-heart-fill"></i>
        </Link> */}

        <Link
          to="/profile"
          className="nav-link fs-5"
          style={{
            color: "#fff",
            transition: "transform 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#f1f1f1";
            e.target.style.transform = "scale(1.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#fff";
            e.target.style.transform = "scale(1)";
          }}
        >
          <i className="bi bi-person-circle"></i>
        </Link>

        {!isUserExit() && (
          <>
            <Link
              to="/login"
              className="btn rounded-pill px-3 py-1"
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.4)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255,255,255,0.2)";
              }}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="btn rounded-pill px-3 py-1"
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.4)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255,255,255,0.2)";
              }}
            >
              Sign Up
            </Link>
          </>
        )}
        {isUserExit() && (
          <button
            onClick={handleSignOut}
            className="btn rounded-pill px-3 py-1"
            style={{
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.4)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.2)";
            }}
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Header;
