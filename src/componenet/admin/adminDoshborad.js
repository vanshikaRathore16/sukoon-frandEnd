import { Link } from "react-router-dom";
function AdminDoshborad(){
       return<>
       <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {/* Left Sidebar */}
      <div
        style={{
          width: "220px",
          backgroundColor: "#044d29",
          padding: "20px",
          color: "white"
        }}
      >
        <h4 style={{ marginBottom: "30px" }}>🧘 Sukoon Admin</h4>
        <ul className="list-unstyled">
        <li style={{ marginBottom: "20px" }}>
          <Link
            to=""
            style={{ color: "white", textDecoration: "none", cursor: "pointer" }}
          >
            📋 Dashboard
          </Link>
        </li>
        <li style={{ marginBottom: "20px" }}>
          <Link
            to="/addToPose"
            style={{ color: "white", textDecoration: "none", cursor: "pointer" }}
          >
            🧘‍♀️ Add Pose
          </Link>
        </li>
        <li style={{ marginBottom: "20px" }}>
          <Link
            to=""
            style={{ color: "white", textDecoration: "none", cursor: "pointer" }}
          >
            💬 Manage Quotes
          </Link>
        </li>
        <li style={{ marginBottom: "20px" }}>
          <Link
            to="/adminRoutine"
            style={{ color: "white", textDecoration: "none", cursor: "pointer" }}
          >
            🧘‍♀️ add-routine
          </Link>
        </li>
          <li style={{ marginBottom: "20px" }}>
          <Link
            to="/adminallfeedback"
            style={{ color: "white", textDecoration: "none", cursor: "pointer" }}
          >
            🧘‍♀️ show-feedback
          </Link>
        </li>
      </ul>
      </div>

      {/* Right Main Content */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "linear-gradient(to right, #e0f2f1, #ffffff)"
        }}
      >
        <h2 style={{ color: "#033d00", marginBottom: "30px" }}>Welcome Admin 🌿</h2>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div
              className="p-3 shadow-sm"
              style={{
                borderRadius: "15px",
                backgroundColor: "#d0f0c0",
                textAlign: "center"
              }}
            >
              <h5>Total Poses</h5>
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>42</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div
              className="p-3 shadow-sm"
              style={{
                borderRadius: "15px",
                backgroundColor: "#b2dfdb",
                textAlign: "center"
              }}
            >
              <h5>Total Quotes</h5>
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>112</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div
              className="p-3 shadow-sm"
              style={{
                borderRadius: "15px",
                backgroundColor: "#c8e6c9",
                textAlign: "center"
              }}
            >
              <h5>Admins</h5>
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
       </>

}
export default AdminDoshborad;