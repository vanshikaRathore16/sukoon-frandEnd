import { Link } from "react-router-dom"
function HeaderBeforeLog(){
    return<>
      <div>
      {/* Top Navigation Bar */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ddd",
        }}
      >
       <div>
  <span style={{ color: "#007bff", fontFamily: "cursive", marginRight: "20px" }}>Calm</span>
  <Link to="/sleep" style={{ color: "#333", margin: "0 10px", textDecoration: "none" }}>Sleep</Link>
  <Link to="/stress-anxiety" style={{ color: "#333", margin: "0 10px", textDecoration: "none" }}>Stress & Anxiety</Link>
  <Link to="/mindfulness" style={{ color: "#333", margin: "0 10px", textDecoration: "none" }}>Mindfulness</Link>
  <Link to="/screening" style={{ color: "#333", margin: "0 10px", textDecoration: "none" }}>Screening</Link>
  <Link to="/calm-health" style={{ color: "#333", margin: "0 10px", textDecoration: "none" }}>Calm Health</Link>
  <Link to="/continue-to-app" style={{ color: "#333", margin: "0 10px", textDecoration: "none" }}>Continue to app</Link>
</div>
        <div>
          <button
            className="btn"
            style={{
              backgroundColor: "#4a68b0",
              color: "#fff",
              padding: "8px 20px",
              borderRadius: "20px",
              marginRight: "10px",
            }}
          >
            Try Calm for Free
          </button>
       
        </div>
      </div>

      {/* Bottom Button Section */}
     
    </div>
    </>
}
export default HeaderBeforeLog