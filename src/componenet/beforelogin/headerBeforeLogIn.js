import { Link } from "react-router-dom";

function HeaderBeforeLog() {
  return (
    <>
      {/* Top Navigation Bar */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "12px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          position: "sticky",
          top: "0",
          zIndex: "1000",
        }}
      >
        {/* Logo + Nav Links */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              color: "#003366",
              fontFamily: "cursive",
              fontSize: "1.6rem",
              fontWeight: "bold",
              marginRight: "30px",
            }}
          >
            sukoon
          </span>

          <nav style={{ display: "flex", gap: "20px" }}>
            <Link
              to="/sleep"
              style={{
                color: "#333",
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#4a68b0")}
              onMouseLeave={(e) => (e.target.style.color = "#333")}
            >
              Sleep
            </Link>

            <Link
              to="/stress"
              style={{
                color: "#333",
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#4a68b0")}
              onMouseLeave={(e) => (e.target.style.color = "#333")}
            >
              Stress & Anxiety
            </Link>

            <Link
              to="/mindfullness"
              style={{
                color: "#333",
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#4a68b0")}
              onMouseLeave={(e) => (e.target.style.color = "#333")}
            >
              Mindfulness
            </Link>
          </nav>
        </div>

        {/* CTA Button */}
        <div>
          <Link to="/signup">
            <button
              className="btn"
              style={{
                backgroundColor: "#003366",
                color: "#fff",
                padding: "8px 22px",
                borderRadius: "25px",
                border: "none",
                cursor: "pointer",
                fontWeight: "500",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#4a68b0";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#003366";
                e.target.style.transform = "scale(1)";
              }}
            >
              log-in
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeaderBeforeLog;
