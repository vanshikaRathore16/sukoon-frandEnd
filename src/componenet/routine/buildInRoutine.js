import Header from "../Header"
import { Link } from "react-router-dom";
import Footer from "../footer";
function BuildInRoutine(){
    return<>
       <Header/>
          <div className="container-fluid" style={{ paddingLeft: 0, paddingRight: 0 }}>
      {/* Heading & Description */}
    
      <div className="row align-items-center bg-light" style={{ borderRadius: "12px" }}>
  {/* Left Content */}
  <div className="col-md-6 align-items-center justify-content-center text-center">
    <h2 className="fw-bold mb-4" style={{ color: "#2E3361", fontSize: "3rem" }}>
      meditations, music and soundscapes for your dreamiest sleep yet
    </h2>
    <p style={{ fontSize: "18px", color: "#555" }}>
      Join millions of sound sleepers worldwide. Fall asleep easily and naturally with our Sleep Stories,
      sleep meditations, exclusive sleep music and sleep sounds. With hundreds of titles to choose from,
      you'll be drifting off to dreamland in no time. Just press play and drift away.
    </p>
    <button
      className="btn btn-primary mt-4 px-4 py-2"
      style={{
        backgroundColor: "#2E3361",
        borderRadius: "25px",
        fontWeight: "500",
        fontSize: "15px",
        border: "none"
      }}
    >
      Sleep better for free
    </button>
  </div>

  {/* Right Image */}
  <div className="col-md-6 text-center">
    <img
      src="/image/R1.png"
      alt="Mother and child sleeping"
    //   className="img-fluid rounded"
      style={{ maxHeight: "700px",width : "100%" ,objectFit: "cover" }}
    />
  </div>
</div>
      {/* Tags */}
   <div className="d-flex flex-wrap justify-content-center  mb-4 mt-5" style={{ gap: "16px" }}>
  {["morning",
      "night",
      "desk",
      "mental peace",
      "posture reset",
      "weight loss",
      "flexibility",
      "back pain relief",
      "stress relief",
      "pre-sleep relaxation",
      "energy booster"].map((tag, idx) => (
    <Link
      key={idx}
      to= {`/routinelist/${tag}`}
      className="text-capitalize text-decoration-none"
      style={{
        padding: "12px 24px",              // space inside the rectangle
        borderRadius: "12px",              // smooth corners
        fontSize: "16px",
        border: "1px solid #ccc",          // visible light gray border
        backgroundColor: "#fff",           // white background
        color: "#000",                     // black text
        transition: "all 0.3s ease",       // smooth hover effect
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)", // subtle outer shadow
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#0d6efd"; // blue on hover
        e.target.style.color = "#fff";              // white text
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#fff";
        e.target.style.color = "#000";
      }}
    >
      {tag}
    </Link>
  ))}
</div>
       {/* Desk Yoga Section */}
       <div className="container">
      <div className="row align-items-center  margin-2"style={{ minHeight: "500px" }}>
        <div className="col-md-6 align-items-center justify-content-center text-center">
          <h5 className="fw-semibold" style={{fontSize : "36px"}}>Desk Yoga</h5>
          <p style={{ fontSize: "20px", color: "#555" }}>
            Move, breathe, and feel better at work*
            <br />
            <br />
            Quick and easy stretches you can do at your desk to reduce stress and tension. No mat needed — just you and your chair!
          </p>
          <ul style={{ paddingLeft: "20px", fontSize: "18px" }}>
            <li>Seated spinal twist</li>
            <li>Chair pigeon pose</li>
            <li>Wrist/ankle rolls</li>
            <li>Neck rolls with pause</li>
          </ul>
        </div>
        <div className="col-md-6 text-center">
          <img
            src="/image/R2.png"
            alt="Desk Yoga"
            className="img-fluid rounded"
            style={{ height: "400px", width: "50%", objectFit: "cover", borderRadius: "10px" }}
          />
        </div>
      </div>
      </div>

      {/* Bottom Section */}
      <div
        className="text-center text-white py-5"
        style={{
          backgroundImage: "url('/image/R3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "12px",
          minHeight: "300px",
           display: "flex",
           alignItems: "center",
            justifyContent: "center"
        
        }}
      >
        <h5 className="fw-bold" style={{fontSize : "40px"}}>Small steps every day lead to big changes</h5>
      </div>
    </div>
    <Footer/>

    </>
}
export default BuildInRoutine;