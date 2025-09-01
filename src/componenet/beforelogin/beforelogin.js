import BeforeLogInFooter from "./beforeLogInFooter";
import HeaderBeforeLog from "./headerBeforeLogIn";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EndPoint from "../apis/EndPoint";
import { toast } from "react-toastify";

function BeforeLigIn() {
  const [approve, setApprove] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    approveList();
  }, []);

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

  const features = [
    {
      icon: "📍", // Placeholder for professional icon (e.g., SVG)
      title: "Stress Management",
      desc: "Experience immediate relief from stress and anxiety with tailored techniques.",
    },
    {
      icon: "🌙", // Placeholder for professional icon (e.g., SVG)
      title: "Improved Sleep",
      desc: "Achieve restful sleep naturally with guided relaxation methods.",
    },
    {
      icon: "🍃", // Placeholder for professional icon (e.g., SVG)
      title: "Mindful Living",
      desc: "Build resilience and confidence with expert-guided support.",
    },
  ];

  return (
    <>
      <HeaderBeforeLog />
      <div>
        <div
          style={{
            backgroundImage: "url('https://www.calm.com/_next/image?url=%2F_n%2Fimages%2Fjasper-lake.webp&w=1920&q=75')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#ffffff",
            backgroundColor: "rgba(0, 0, 0, 0.3)", // Softer transparency
            backgroundBlendMode: "overlay",
          }}
        >
          <h1 style={{ fontWeight: "700", fontSize: "3rem", marginBottom: "1rem" }}>Calm Your Mind. Transform Your Life.</h1>
          <p style={{ fontSize: "1.3rem", color: "#e0e0e0", marginBottom: "2rem" }}>
            The Premier App for Sleep, Meditation, and Relaxation
          </p>
          {/* <Link
            to="/login"
            className="btn"
            style={{
              backgroundColor: "#1a2b49",
              borderColor: "#4a68b0",
              color: "#fff",
              padding: "12px 30px",
              borderRadius: "25px",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "1.1rem",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4a68b0")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1a2b49")}
          >
            Get Started
          </Link> */}
             <div>
          <Link to="/signup">
  <button
    className="btn"
    style={{
      backgroundColor: "#003366",
      color: "#fff",
      padding: "14px 32px", // increased padding
      borderRadius: "30px", // slightly larger curve
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "1.1rem", // increased font size
      boxShadow: "0 6px 15px rgba(0,0,0,0.15)", // stronger shadow
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = "#4a68b0";
      e.target.style.transform = "scale(1.08)"; // slightly bigger hover effect
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = "#003366";
      e.target.style.transform = "scale(1)";
    }}
  >
    get started
  </button>
</Link>

        </div>
        </div>

        {/* Features Section */}
        <div style={{ textAlign: "center", margin: "100px auto", maxWidth: "1200px", padding: "0 20px" }}>
          <h2 style={{ color: "#1a2b49", fontWeight: "700", fontSize: "2.5rem", letterSpacing: "0.5px", paddingBottom: "15px", display: "inline-block" }}>
            Our Commitment to Your Well-Being
          </h2>
          <div style={{ marginTop: "70px", display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  flex: "0 0 28%",
                  maxWidth: "28%",
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  padding: "25px",
                  transition: "box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)")}
              >
                <div style={{ fontSize: "2rem", color: "#4a68b0", marginBottom: "20px" }}>{f.icon}</div>
                <h5 style={{ fontWeight: "600", fontSize: "1.4rem", color: "#1a2b49", marginBottom: "12px" }}>{f.title}</h5>
                <p style={{ color: "#666666", fontSize: "1rem", lineHeight: "1.7", marginBottom: "20px" }}>{f.desc}</p>
                <a
                  href="#"
                  style={{
                    color: "#4a68b0",
                    fontWeight: "600",
                    textDecoration: "none",
                    borderBottom: "1px solid #4a68b0",
                    paddingBottom: "2px",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#1a2b49")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#4a68b0")}
                >
                  Learn More
                </a>
              </div>
            ))}
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

        {/* FAQ Section */}
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

        <BeforeLogInFooter />
      </div>
    </>
  );
}

export default BeforeLigIn;