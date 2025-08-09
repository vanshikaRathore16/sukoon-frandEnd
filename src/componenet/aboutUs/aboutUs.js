import React from "react";
import Footer from "../footer.js";
import Header from "../Header.js";
import { useState } from "react";
import { getCurrentUser } from "../auth/auth.js";
import { toast, ToastContainer } from "react-toastify";
import EndPoint from "../apis/EndPoint.js";
import axios from "axios";
function AboutUs() {
    let user = getCurrentUser();
   const [feedBack,setFeetback] = useState({
      feedback : "",
      rating : "",
      name :""
    })
    const handleFromSubmit =async(event)=>{
        try{ 
         event.preventDefault(); 
         let details ={...feedBack, name : user.name};
         let response = await axios.post(EndPoint.FEEDBACK_BY_USER(user._id),details)
          console.log(response.data);
          toast.success("feebback submited");
           setFeetback({ feedback: "", rating: "" }); 
        }catch(err){
          console.log(err);
          toast.error("something went wrong");
        }
       }
  return (
    <>
    <ToastContainer/>
    <Header/>
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(to right, #dcedc8, #f1f8e9)",
          padding: "60px 0",
          position: "relative",
        }}
      >
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Left Text Block */}
            <div className="col-md-6 px-5 py-4">
              <h2 className="fw-bold mb-3" style={{ color: "#33691e" }}>
                Welcome to <span style={{ color: "#689f38" }}>Sukoon</span> –<br />
                your personal sanctuary for peace and balance.
              </h2>
              <p style={{ color: "#558b2f" }}>
                We help you slow down and reconnect with your inner self through ancient
                wisdom blended with modern simplicity.
              </p>
            </div>

            {/* Right Image */}
            <div className="col-md-6 p-0">
              <img
                src="/image/QC1.png"
                alt="Sukoon Art"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "0 20px 20px 0",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-5" style={{ marginTop: "5%" }}>
  <div className="container">
    <h3 className="fw-bold mb-5 text-center" style={{ fontSize: "2.5rem" }}>About Sukoon</h3>
    <p
      className="text-center"
      style={{
        maxWidth: "100%",
        margin: "auto",
        fontSize: "1.25rem", // Increased text size
        lineHeight: "1.8",   // Better readability
        color: "#333"        // Optional: Darker text
      }}
    >
      In a world full of noise, speed, and stress, we often forget to pause, breathe,
      and simply be. Sukoon is more than just an app – it’s a mindful companion
      created to help you slow down, reconnect with yourself, and rediscover joy in
      everyday moments.
    </p>
  </div>
</section>


      {/* Our Offerings */}
      <section
  className="text-center py-5"
  style={{
    background: "linear-gradient(to right, #f1f8e9, #dcedc8)",
    marginTop: "60px",
    marginBottom: "60px"
  }}
>
  <h2
    className="fw-bold mb-5"
    style={{ fontSize: "2.5rem", color: "#33691e" }}
  >
    What We Offer
  </h2>
  <div className="container">
    <div className="row g-4 justify-content-center">
      {[
        "Mindfulness",
        "Spiritual Growth",
        "Daily Journals",
        "Mood Tracker",
        "Yoga Guides",
        "Audio Meditations",
      ].map((title, i) => (
        <div key={i} className="col-6 col-md-4 col-lg-2">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              backgroundColor: "#e0f2f1",
              borderRadius: "16px",
              transition: "0.3s",
            }}
          >
            <img
              src="/image/FB7.png"
              className="card-img-top"
              alt="Offering"
              style={{
                height: "140px",
                objectFit: "cover",
                borderRadius: "16px 16px 0 0",
              }}
            />
            <div className="card-body">
              <h6 className="fw-bold" style={{ color: "#388e3c" }}>
                {title}
              </h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Why Sukoon */}
      <section className="text-center py-5" style={{ backgroundColor: "transparent" }}>
  <h4 className="mb-4" style={{ fontSize: "3rem", color: "#2e7d32" }}>
    Why Sukoon?
  </h4>
  <div className="d-flex flex-wrap justify-content-center gap-4">
    {["Peace is personal.", "Inner calm matters.", "Balance over burnout.", "Healing is powerful."].map(
      (text, i) => (
        <button
          key={i}
          className="btn"
          style={{
            backgroundColor: "#639467ff", // soft green tag
            color: "#d9e7daff",
            padding: "12px 24px",
            borderRadius: "12px",
            fontWeight: "bold",
            border: "none",
            margin: "10px",
            fontSize : "20px" // this creates space between tags
          }}
        >
          {text}
        </button>
      )
    )}
  </div>
</section>


    {/* Vision Section */}
<section
  className="py-5 text-center"
  style={{ backgroundColor: "#a5d6a7", color: "#1b5e20" }}
>
  <h4 className="fw-bold mb-4" style={{ fontSize: "2.2rem" }}>
    Our Vision
  </h4>
  <p style={{ maxWidth: "700px", margin: "auto", fontSize: "1.2rem" }}>
    To bring the calm of Indian philosophy into every digital heart.
    <br />
    To create a gentle space where your inner peace matters most.
  </p>
</section>

{/* Feedback Form */}
    <div className="container">
      <h2 className="text-center mb-4">Share Your Feedback</h2>
      <form onSubmit={handleFromSubmit}>
        {/* Feedback Input */}
        <div className="mb-3">
          <label className="form-label">Your Feedback</label>
          <textarea
            className="form-control"
            rows="3"
             onChange={(e)=>setFeetback({...feedBack,feedback : e.target.value})}
            required
          ></textarea>
        </div>

        {/* Rating Input */}
        <div className="mb-3">
          <label className="form-label">Rating (1-5)</label>
          <input
            type="number"
            className="form-control"
            min="1"
            max="5"
            
            onChange={(e) => setFeetback({...feedBack,rating : e.target.value})}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Submit Feedback
        </button>
      </form>
    </div>
 <Footer/>
    </>
  );
}

export default AboutUs;