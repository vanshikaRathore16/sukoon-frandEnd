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
        background: "#ffffff",
        padding: "18px 40px",
        position: "sticky",
        top: "0",
        zIndex: "1000",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo */}
      <Link
        className="navbar-brand fw-bold fs-3"
        to="/"
        style={{
          color: "#003366",
          letterSpacing: "1.5px",
          fontWeight: "700",
        }}
      >
        Sukoon
      </Link>

      {/* Navigation */}
      <div className="d-flex gap-4 align-items-center flex-grow-1 ms-5">
        {[
          ["Home", "/home"],
          ["Mood", "/mood"],
          ["Quotes", "/qoute"],
          ["Pose", "/pose"],
          ["Personal Plan", "/personalplan"],
          ["Routine", "/routine"],
          ["Breathing", "/breathing"],
          ["Article", "/article"],
          ["About Us", "/aboutus"],
          ["New Meditation", "/GETMEDITATION"],
        ].map(([label, path]) => (
          <Link
            key={path}
            to={path}
            className="nav-link"
            style={{
              color: "#333",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#003366";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#333";
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Right Side */}
      <div className="d-flex gap-3 align-items-center">
        <Link
          to="/profile"
          className="nav-link fs-5"
          style={{
            color: "#333",
            transition: "color 0.3s, transform 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#003366";
            e.target.style.transform = "scale(1.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#333";
            e.target.style.transform = "scale(1)";
          }}
        >
          <i className="bi bi-person-circle"></i>
        </Link>

        {!isUserExit() && (
          <>
            <Link
              to="/login"
              className="btn rounded-pill px-3 py-2 fw-semibold"
              style={{
                background: "#003366",
                color: "#fff",
                border: "none",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#00509e";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#003366";
              }}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="btn rounded-pill px-3 py-2 fw-semibold"
              style={{
                background: "#003366",
                color: "#fff",
                border: "none",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#00509e";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#003366";
              }}
            >
              Sign Up
            </Link>
          </>
        )}

        {isUserExit() && (
          <button
            onClick={handleSignOut}
            className="btn rounded-pill px-3 py-2 fw-semibold"
            style={{
              background: "#003366",
              color: "#fff",
              border: "none",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#00509e";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#003366";
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
