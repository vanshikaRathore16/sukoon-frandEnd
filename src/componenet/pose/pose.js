import { FaSearch } from "react-icons/fa";
import Footer from "../footer";
import Header from "../Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import EndPoint from "../apis/EndPoint";
function Pose(){
      const[poseType,setPoseType] = useState([]);
      useEffect(()=>{
       const fatchPose = async()=>{
        try{
           let response = await axios.get(EndPoint.POSE_CATEGORY);
           console.log( "Data from backend:" ,response.data);
           setPoseType(response.data.Type);
          }catch(err){
          console.log(err);
          toast.error("something went wrong");
        }
       }
       fatchPose();
      },[])
    return<>
    <Header/>
    <div className="container-fluid p-0">
  {/* Top Banner Image */}
    
  
  <div className="container-fluid p-0">
  {/* Top Banner Image */}
  <div className="position-relative">
    <img
      src="/image/FP2.png"
      alt="Yoga Banner"
      className="img-fluid w-100"
      style={{ height: "350px", objectFit: "cover" }}
    />

    {/* Search & Level Filter Box */}
    <div
      className="position-absolute w-100 d-flex justify-content-center"
      style={{ bottom: "-30px" }}
    >
      <div
        className="d-flex align-items-center justify-content-between px-4 py-3 rounded-4 shadow"
        style={{
          backgroundColor: "#d0e6c1", // soft green background
          minWidth: "700px",
          gap: "20px",
        }}
      >
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search pose by name"
          className="form-control"
          style={{
            minWidth: "250px",
            border: "1px solid #ccc",
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        />

        {/* Dropdown */}
        <select
          className="form-select"
          style={{
            minWidth: "180px",
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        >
          <option>Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        {/* Search Button */}
        <button
          className="btn btn-dark"
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            whiteSpace: "nowrap",
          }}
        >
          Search
        </button>
      </div>
    </div>
  </div>
</div>
{/* Beautiful Intro Paragraph */}
   <div className="container mt-5 pt-5 text-center mb-5">
    <h2 className="mb-3" style={{ fontWeight: "700", color: "#2f4f4f" }}>
      Discover the Power of Yoga
    </h2>
    <p style={{ fontSize: "18px", color: "#555" }}>
      was overweight, I had bad skin, and I was losing hair. None of my clothes fit me, and my constant state of agitation was ruining my personal relationships. I had just moved back to India from the US, and I was depressed, lethargic, and had a major case of writer’s block. Overall, my life was utterly imbalanced. This was my state of being when I first began my yoga practice.

Ten years later, I am at my ideal weight. I eat healthier and never fight to ward off cravings. It may sound bizarre, but I only crave what is good for my body, and my hair and skin are not just under control but fabulous. I have a healthy attitude towards my work – I work hard but am detached from the outcome of the results – and often, I find myself floating on a creative high. I have better control over my emotions and have realized that nothing in this world or this life should make me unhappy. No matter how clichéd it sounds, I’ve also realized that no matter what the circumstances or how dreary the situation, life can truly be a joy every step of the way.

    </p>
  </div>
<hr style={{ border: "1px solid black" }} />
{/* Section Title */}
<div className="text-center my-5 pt-3">
    <h3 className="fw-bold">
      <u>types of poses</u>
    </h3>
  </div>
  
 <div className="container pb-5">
  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 text-center">
    {poseType.map((item, i) => (
      <div key={i} className="col">
        <Link
          to={`/posecategory/${item.type}`}
          className="text-decoration-none text-dark"
        >
          <div
            className="p-4 position-relative rounded shadow-sm h-100"
            style={{
              background: `linear-gradient(135deg, ${i % 2 === 0 ? "#e0f7fa" : "#ffe0b2"}, #ffffff)`,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              borderRadius: "25px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 150, 136, 0.3)";
              const img = e.currentTarget.querySelector("img");
              if (img) {
                img.style.transform = "scale(1.1)";
                img.style.border = "3px solid #00bfa5";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
              const img = e.currentTarget.querySelector("img");
              if (img) {
                img.style.transform = "scale(1)";
                img.style.border = "3px solid transparent";
              }
            }}
          >
            <img
              src={item.image}
              alt={item.label}
              className="rounded-circle"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                transition: "transform 0.3s ease, border 0.3s ease",
                border: "3px solid transparent",
              }}
            />
            <p
              className="mt-3 fw-bold fs-5 text-capitalize"
              style={{ color: "#333", fontFamily: "Poppins, sans-serif" }}
            >
              {item.type}
            </p>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>


</div>
{/* Support Text Section */}
      <div className="py-5 px-3 mb-0" style={{ backgroundColor: "#7c9d7d" }}>
        <div className="container text-white">
          <h5 className="fw-bold text-white mb-3 text-center">How Sukoon Supports You</h5>
          <p className="text-center fs-6">
            Sukoon is more than an app — it's your safe space to pause, reflect, and heal.
            With simple mood check-ins and peaceful journaling prompts, it helps you understand how you truly feel.
            Whether you're having a good day or a hard one, Sukoon meets you where you are. Each feature — from emotional
            tracking to personal routines — is designed to hold space for your growth, clarity, and calm. Over time,
            it helps you reconnect with yourself — softly, steadily, and truthfully.
          </p>
          <p className="fw-bold text-center text-success fs-5 mb-0">read more</p>
        </div>
      </div>
      <Footer/>
    </>
}
export default Pose;