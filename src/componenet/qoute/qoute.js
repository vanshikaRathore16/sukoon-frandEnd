import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../footer";
import { QouteCategorylist } from "../../App";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import EndPoint from "../apis/EndPoint";
function Qoute() {
  let {CategoryList} = useContext(QouteCategorylist);
  const[qoute,setQoute] = useState();
  useEffect(()=>{
       const fatchData = async()=>{
        try{
          let responce = await axios.get(EndPoint.RONDOM_QOUTE);
          setQoute(responce.data.rondomQuote);
          console.log(responce.data);
        }catch(err){
        console.log(err);
        }
       }
       fatchData();
  },[])
   return (
    <>
      <Header />
      {/* 🌿 Welcome Section */}
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Left Text */}
          <div className="col-md-6 px-4">
            <h2 className="fw-bold display-5 text-dark">
              Welcome to <br />
              Knowledge & <br />
              Meaningful Quotes
            </h2>
            <p className="text-muted mt-3 fs-5">
              Fuel your thoughts with powerful insights. From wisdom to love,
              find quotes that speak to your soul.
            </p>
          </div>

          {/* Right Image */}
          <div className="col-md-6 px-4 text-center">
            <img
              src="/image/Q5.png"
              alt="Buddha"
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "400px",
                objectFit: "cover",
              }}
              className="img-fluid rounded-4 shadow"
            />
          </div>
        </div>
      </div>

      {/* 📚 Quote Count Card */}
      <div className="container my-4">
        <div
          className="d-flex overflow-hidden shadow-lg"
          style={{
            borderRadius: "25px",
            height: "200px",
          }}
        >
          {/* Left Image */}
          <div style={{ width: "50%", height: "100%" }}>
            <img
              src="/image/Q6.png"
              alt="Reading Girl"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "25px 0 0 25px",
              }}
            />
          </div>

          {/* Right Content */}
          <div
            className="d-flex flex-column justify-content-between p-4"
            style={{
              width: "50%",
              background: "linear-gradient(135deg, #033d00, #056d00)",
              color: "white",
              borderRadius: "0 25px 25px 0",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "500" }}>
              1,890 Quotes Now Available – Tailored to Your Preferences
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn"
                style={{
                  backgroundColor: "#fffb57",
                  color: "#033d00",
                  fontWeight: "bold",
                  padding: "8px 25px",
                  borderRadius: "10px",
                }}
              >
                Read Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 💡 Discover Section */}
      <div className="text-center my-5">
        <h2 className="fw-bold">Discover Quotes by Category</h2>
        <p style={{ color: "#555", fontSize: "16px" }}>
          Explore 20+ curated categories to inspire your mind and soul.
        </p>
      </div>
        {/* 🗂️ Enhanced Category Cards */}
<div className="container py-4">
  <div className="row justify-content-center">
    {CategoryList.map((category, index) => (
      <div className="col-md-3 col-sm-6 mb-3" key={index}>
        <Link
           to={`/qoutecategory/${category.toLowerCase()}`}
          style={{ textDecoration: "none" }}
        >
          <div
            className="category-card"
            style={{
              borderRadius: "16px",
              padding: "10px",
              background: "linear-gradient(135deg, #e0f7e9, #b2dfdb)", // ✅ Light green shades
              color: "#004d40", // Deep green text
              fontWeight: "600",
              fontSize: "18px",
              textAlign: "center",
              minHeight: "100px", // ✅ Smaller box
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "rotate(-2deg) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 150, 136, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "rotate(0deg) scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {category}
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>

      {/* 🪨 Buddha Quote Section */}
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Left Image */}
          <div className="col-md-6 text-center">
            <img
              src="/image/Q7.png"
              alt="Stacked Rocks"
              className="img-fluid rounded-4 shadow"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>

          {/* Right Quote */}
          <div className="col-md-6">
            <blockquote
              className="fs-4 fst-italic text-dark"
              style={{ borderLeft: "5px solid #033d00", paddingLeft: "15px" }}
            >
             <p className="lead">{qoute?.text}</p>
              
            </blockquote>
            <h5 className="text-end mt-3 text-muted">–{qoute?.author}</h5>
          </div>
        </div>

        {/* 🧠 Fun Fact Title */}
        <h3 className="text-center my-5 fw-bold">✨ Fun Fact of the Day</h3>

        {/* Fun Fact Card */}
        <div
          className="row mb-3 shadow rounded-4 overflow-hidden"
          style={{ height: "280px" }}
        >
          <div className="col-md-6 d-flex flex-column justify-content-center bg-dark p-4 text-white text-center align-items-center">
            <h5 className="fw-bold">Did You Know?</h5>
            <p className="fs-5 mb-0">
              Only 11% of people in the world are left-handed!
            </p>
          </div>
          <div className="col-md-6 p-0">
            <img
              src="/image/Q8.png"
              alt="Left Hand"
              className="img-fluid h-100 w-100 object-fit-cover"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Qoute;
