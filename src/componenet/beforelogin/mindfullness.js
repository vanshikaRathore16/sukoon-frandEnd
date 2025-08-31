import HeaderBeforeLog from "./headerBeforeLogIn";
import FooterBeforeLogIn from "./beforeLogInFooter";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EndPoint from "../apis/EndPoint";
import { toast } from "react-toastify";
function Mindfullness(){
     const [approve, setApprove] = useState([]);
      const [open, setOpen] = useState(null);
      const[meditation,setMeditation] = useState(null);
      useEffect(() => {
        approveList();
        fatchData();
      }, []);
    
      const fatchData = async()=>{
        try{
           let responce = await axios.get(EndPoint.PADCAST_FOR_BL);
           console.log(responce.data);
           setMeditation(responce.data);
        }catch(err){
            console.log(err);
        }
      }
      const approveList = async () => {
        try {
          const response = await axios.get(EndPoint.LIST_OF_APPROVE_LIST);
          console.log(response.data);
          setApprove(response.data.message);
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong");
        }
      };
    
      const StarRating = ({ rating }) => {
        return (
          <div style={{ color: "#FFD700", fontSize: "1.2rem" }}>
            {"⭐".repeat(rating)}
          </div>
        );
      };
    
      const toggle = (id) => {
        setOpen(open === id ? null : id);
      };
    return<>
       <HeaderBeforeLog/>
      <div
        style={{
          background: "#f9f9ff",
          width: "100vw",  // force full viewport width
          margin: "0",
         padding: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",  // take full width
          }}
        >
          {/* Text Section */}
          <div style={{ flex: "1 1 50%", padding: "20px" }}>
           <h2 style={{ color: "#003366", fontWeight: "700", fontSize: "50px" }}>
Your daily dose of peace, positivity, and perspective
</h2>

<p style={{ fontSize: "1.25rem", color: "#444", margin: "20px 0" }}>
Your daily dose of peace, positivity, and perspective. Each podcast episode is crafted to inspire mindfulness, reduce stress, and spark meaningful reflection. Whether you’re starting your morning, taking a midday break, or winding down at night, let these calming voices guide you toward balance and clarity.
</p>
          </div>

          {/* Image Section */}
          <div style={{ flex: "1 1 50%", padding: "20px" }}>
            <img
              src="https://www.calm.com/_next/image?url=%2F_n%2Fimages%2Fsubpages%2Fmindfulness-hero.webp&w=1920&q=75"
              alt="Sleep Story"
              style={{ width: "100%", borderRadius: "15px", display: "block" }}
            />
          </div>
        </div>
      </div>
        <div className="container py-5">
      <div className="row align-items-center">








<h2 style={{ color: "#003366", fontWeight: "700", fontSize: "40px", textAlign: "center" , marginBottom : "100px"}}>
  “Listen, learn, and relax with curated podcasts for you
</h2>

          {/* Left Section */}
<div className="col-md-6 text-center mb-2 mb-md-0">
  <h3 className="fw-bold mb-3">
    {meditation?.title || "Loading..."}
  </h3>

  <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>
    {meditation?.description ||
      "Sleep Stories will guide you off to sleep quickly and naturally."}
  </p>

  <button
    className="btn btn-light border mb-3"
    style={{
      borderRadius: "10px",
      padding: "5px 15px",
      fontSize: "0.9rem",
    }}
  >
    Free Sample
  </button>

  <p className="text-primary mb-3" style={{ fontSize: "0.9rem" }}>
    Narrated by {meditation?.author || "Unknown"}
  </p>

  {meditation?.audioURL && (
    <audio
      controls
      style={{
        borderRadius: "30px",
        width: "80%",
        maxWidth: "300px",
        margin: "0 auto",
        display: "block",
      }}
    >
      <source src={meditation.audioURL} type="audio/mpeg" />
    </audio>
  )}
</div>

{/* Right Section */}
<div className="col-md-6 text-center">
  <div
    style={{
      position: "relative",
      borderRadius: "25px",
      overflow: "hidden",
      maxWidth: "320px",
      margin: "0 auto",
      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    }}
  >
    <img
      src={meditation?.imageURL || "https://via.placeholder.com/320x450"}
      alt={meditation?.title || "Dream with Me"}
      style={{
        width: "100%",
        height: "450px",
        objectFit: "cover",
        display: "block",
      }}
    />

    {/* Overlay content */}
    <div
      style={{
        position: "absolute",
        bottom: "0",
        left: "0",
        right: "0",
        // background: "rgba(0, 0, 0, 0.5)", // put back for readability
        color: "#fff",
        padding: "15px",
        textAlign: "center",
      }}
    >
      <h5 style={{ fontWeight: "700", marginBottom: "5px" }}>
        {meditation?.title || "Dream with Me"}
      </h5>
      <p style={{ fontSize: "0.9rem", margin: 0 }}>
        {meditation?.description || "Relax and fall asleep peacefully."}
      </p>
    </div>
  </div>
</div>


      </div>
    </div>
     {/* Testimonials Section */}
        <section style={{ background: "#f8f9fa", padding: "60px 0", fontFamily: "'Roboto', sans-serif" }}>
          <h2
            style={{
              textAlign: "center",
              color: "#1a2b49",
              marginBottom: "40px",
              fontSize: "2.2rem",
              fontWeight: "700",
            }}
          >
            What Our Users Say
          </h2>
          <div
            style={{
              display: "flex",
              gap: "30px",
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 20px",
              overflowX: "auto",
            }}
          >
            {approve?.map((item, index) => (
              <div
                key={index}
                style={{
                  background: "linear-gradient(180deg, #1a2b49 0%, #4a68b0 100%)",
                  borderRadius: "12px",
                  color: "#ffffff",
                  padding: "25px",
                  minWidth: "320px",
                  boxShadow: "0 6px 18px rgba(26, 43, 73, 0.2)",
                  position: "relative",
                }}
              >
                <div style={{ fontSize: "2.5rem", opacity: 0.1, marginBottom: "15px" }}>“</div>
                <p style={{ fontWeight: "500", lineHeight: "1.6", marginBottom: "15px" }}>{item.feedback}</p>
                <div style={{ fontStyle: "italic", opacity: 0.9, marginBottom: "10px" }}>{item.name}</div>
                <StarRating rating={item.rating} />
              </div>
            ))}
          </div>
        </section>

     <div style={{ maxWidth: "1200px", margin: "80px auto", padding: "0 20px" }}>
          <h2 style={{ textAlign: "center", color: "#1a2b49", fontWeight: "700", fontSize: "2.2rem", marginBottom: "40px" }}>
            Frequently Asked Questions
          </h2>
          {[
            { id: 1, question: "What is Sukoon?", answer: "Sukoon is your personal wellness companion offering yoga, meditation, journaling, and personalized routines to promote balance in daily life." },
            { id: 2, question: "How can I track my mood?", answer: "Navigate to the mood tracker, select your emotion, and Sukoon will recommend yoga, quotes, and meditation tailored to your mood." },
            { id: 3, question: "Can I build my own routine?", answer: "Yes, create custom routines with yoga poses, meditation sessions, and journaling steps of your choice." },
            { id: 5, question: "Is there a cost to use Sukoon?", answer: "Sukoon is completely free, with all features accessible at no cost." },
            { id: 6, question: "Can I journal privately in the app?", answer: "Yes, your journal entries are securely saved within your private profile." },
            { id: 7, question: "What kind of meditation sessions are available?", answer: "Sukoon provides sessions for stress relief, sleep improvement, mindfulness, and emotional healing." },
            { id: 8, question: "Can I access Sukoon offline?", answer: "Currently, an internet connection is required; offline support is in development." },
            { id: 9, question: "Is there a daily reminder option?", answer: "Yes, set reminders for your routines, journaling, and meditations." },
            { id: 10, question: "Can I share my progress with others?", answer: "Yes, download and share mood summaries and routine statistics directly." },
          ].map((faq) => (
            <div key={faq.id} style={{ marginBottom: "20px", borderRadius: "8px", overflow: "hidden" }}>
              <div
                style={{
                  cursor: "pointer",
                  backgroundColor: "#f8f9fa",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  padding: "15px",
                  color: "#1a2b49",
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => toggle(faq.id)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e9ecef")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
              >
                {faq.question}
              </div>
              {open === faq.id && (
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "15px",
                    fontSize: "1rem",
                    color: "#555555",
                    lineHeight: "1.6",
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

    <FooterBeforeLogIn/>
    </>
}
export default Mindfullness;