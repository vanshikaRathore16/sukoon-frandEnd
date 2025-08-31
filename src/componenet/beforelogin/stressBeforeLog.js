import HeaderBeforeLog from "./headerBeforeLogIn";
import FooterBeforeLogIn from "./beforeLogInFooter";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EndPoint from "../apis/EndPoint";
import { toast } from "react-toastify";
function StressBL(){
  const [scale, setScale] = useState(1);
  const [phase, setPhase] = useState("inhale");
  const [isRunning, setIsRunning] = useState(false);

  const inhaleDuration = 4000;
  const holdDuration = 4000;
  const exhaleDuration = 6000;

  useEffect(() => {
    if (!isRunning) return;

    let start = Date.now();
    let animationFrame;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - start;

      let duration;
      if (phase === "inhale") duration = inhaleDuration;
      else if (phase === "hold") duration = holdDuration;
      else duration = exhaleDuration;

      const progress = Math.min(elapsed / duration, 1);

      let target;
      if (phase === "inhale") target = 1 + 0.4 * progress; // grow bubble
      else if (phase === "hold") target = 1.4; // keep bubble expanded
      else target = 1.4 - 0.4 * progress; // shrink bubble

      setScale(target);

      if (progress >= 1) {
        if (phase === "inhale") setPhase("hold");
        else if (phase === "hold") setPhase("exhale");
        else setPhase("inhale");

        start = Date.now();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [phase, isRunning]);

  const getPhaseText = () => {
    if (phase === "inhale") return "Breathe in";
    else if (phase === "hold") return "Hold";
    else return "Breathe out";
  };
     const [approve, setApprove] = useState([]);
  const [open, setOpen] = useState(null);
  const[meditation,setMeditation] = useState(null);
  useEffect(() => {
    approveList();
    fatchData();
  }, []);
  const fatchData = async()=>{
    try{
       let responce = await axios.get(EndPoint.soundScapes_FOR_BL);
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
  Close your eyes and drift away with soundscapes designed to calm your body and soul
</h2>

<p style={{ fontSize: "1.25rem", color: "#444", margin: "20px 0" }}>
  Close your eyes and drift away with soundscapes designed to calm your body and soul. From the gentle patter of rain to the soft hum of ocean waves, each sound has been carefully crafted to guide you into a state of deep relaxation. Whether you’re seeking focus, peace, or restful sleep, let these soothing soundscapes become your sanctuary in the midst of life’s noise.
</p>

          </div>

          {/* Image Section */}
          <div style={{ flex: "1 1 50%", padding: "20px" }}>
            <img
              src="https://www.calm.com/_next/image?url=%2F_n%2Fimages%2Fsubpages%2Fstress-hero.webp&w=1920&q=75"
              alt="Sleep Story"
              style={{ width: "100%", borderRadius: "15px", display: "block" }}
            />
          </div>
        </div>
      </div>
        <div className="container py-5">
      <div className="row align-items-center">

   <h2 style={{ color: "#003366", fontWeight: "700", fontSize: "30px", textAlign : "center"}}>
Try a quick breathing exercise to ease your stress.

</h2>

 {/* Bubble Breathing Exercise Section */}
      <div
        style={{
          margin: "40px",
          height: "500px",
          background: "#1e3d59",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          padding: "20px",
          overflow: "hidden",
        }}
      >
      
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
    
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${scale})`,
              transformOrigin: "center center",
              transition: "transform 0.1s linear",
            }}
          >
            <span style={{ color: "#333", fontSize: "20px" }}>
              {getPhaseText()}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            position: "absolute",
            bottom: "20px",
            width: "100%",
          }}
        >
          <button
            onClick={() => setIsRunning(true)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#03024dff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Start
          </button>
          <button
            onClick={() => setIsRunning(false)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#03024dff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Stop
          </button>
        </div>
      </div>






<h2 style={{ color: "#003366", fontWeight: "700", fontSize: "30px", textAlign: "center",marginTop : "50px" }}>
  Lose yourself in the rhythm of rain, the whispers of the forest, and the song of the sea.
</h2>

<div className="container py-5">
  <div className="row align-items-center">
    {/* Left Section */}
    <div className="col-md-6 text-center mb-2 mb-md-0">
      <h3 className="fw-bold mb-3">
        {meditation?.title || "Loading..."}
      </h3>
       <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>
        {meditation?.description || "Sleep Stories will guide you off to sleep quickly and naturally."}
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

      <h5 className="fw-bold mb-1">{meditation?.title}</h5>

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
        // background: "rgba(0, 0, 0, 0.5)", // dark overlay
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
export default StressBL;