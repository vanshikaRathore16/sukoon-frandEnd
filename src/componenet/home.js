import Header from "./Header.js";
import Footer from "./footer.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import EndPoint from "./apis/EndPoint.js";
import { useContext,useEffect } from "react";
import { toast } from "react-toastify";
import { getCurrentUser } from "./auth/auth.js";
function Home(){
  //   rondim qoutes 
  let user = getCurrentUser();
  let userId = user._id;
  const [open, setOpen] = useState(null);
  const [quote, setQuote] = useState(null);
  const[approve,setApprove] = useState([]);
  const[metidation,setMetidation] = useState([]);
  const[artice,setArticle] = useState([]);
    // rondom qoute
    const fetchQuote = async () => {
    try {
      const response = await axios.get(EndPoint.RONDOM_QOUTE);
      console.log("API Response:", response.data);
        setQuote(response.data?.rondomQuote);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    approveList();
    fetchQuote();
    fatchMedation();
    fatchArticle();
    const intervalId = setInterval(() => {
      fetchQuote();
    }, 120000); 
    return () => clearInterval(intervalId);
  }, []);
  console.log("state " , quote)
       
  // rating
  const StarRating = ({ rating }) => {
  return (
    <div style={{ color: "#FFD700", fontSize: "1.2rem" }}>
      {"⭐".repeat(rating)}
    </div>
  );
};
  //  apporve feebback
     const approveList = async()=>{
      try{
         let responce = await axios.get(EndPoint.LIST_OF_APPROVE_LIST);
         console.log(responce.data);
         setApprove(responce.data.message);
      }catch(err){
        console.log(err);
        toast.error("something went wrong");
      }
     }

     const toggle = (id) => {
  if (open === id) {
    setOpen(null); // close if clicked again
  } else {
    setOpen(id); // open the clicked FAQ
  }
};
    //  fatch metidation
    const fatchMedation = async()=>{
      try{
         let responce = await axios.get(EndPoint.RECCOMENDMEDIDATION(userId));
         console.log("recoomend meditation = ",responce.data);
         setMetidation(responce.data.recommendedMeditations);
         console.log("set metidation ", metidation);
      }catch(err){
        console.log(err);
     }
    } 

    // fatch article
    const fatchArticle =async()=>{
      try{
         let responce = await axios.get(EndPoint.RECCOMENDARTICLE(userId));
         console.log("article by mood" , responce.data);
         setArticle(responce.data.article);
      }catch(err){
        console.log(err);
      }
    }
    return<>
        <Header/>
        {/* hero section */}
        <div className="hero-section">
            <img
              src = "/image/homeimage.jpg"
              alt = "yoga girl"
            />
            <div className="hero-overlay"></div>
            <div className="hero-text container">
                <h1 className="display-4 font-weight-bold">A healing place for your body and mind</h1>
                <p className="lead">Personalized yoga, meditation, notes, quotes — all in one peaceful app</p>

            </div>
        </div>
       
         {/* meditatio by mood */}
         <div
  style={{
    padding: "4rem 1rem", // 4rem top & bottom, 1rem left & right
    maxWidth: "1200px",
    margin: "0 auto",
  }}
>
  <h2 
  style={{
    fontSize: "35px",       // text-2xl
    fontWeight: "bold",     // font-bold
    textAlign: "center",    // text-center
    marginBottom: "50px",   // mb-8
    paddingTop: "32px",     // pt-8
    color : "#003366"
  }}
>
  Recommended Meditations
</h2>

    
  <div
    className="d-flex flex-nowrap overflow-auto"
    style={{ gap: "1.5rem", paddingBottom: "1rem" }}
  >
    {metidation.length > 0 ? (
      metidation.map((med, index) => (
        <div
          key={index}
          className="card"
          style={{
            minWidth: "280px",
            maxWidth: "280px",
            backgroundColor: "white",
            borderRadius: "1rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          }}
        >
          {/* ✅ Consistent Image at Top */}
          {med.imageURL && (
            <img
              src={med.imageURL}
              alt={med.title || "Meditation"}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />
          )}

          {/* ✅ Card Content */}
          <div style={{ padding: "1rem", flex: 1 }}>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                color: "#222",
                marginBottom: "0.5rem",
              }}
            >
              {med.title || "Untitled Meditation"}
            </h3>

            {med.description && (
              <p
                style={{
                  color: "#555",
                  marginBottom: "0.75rem",
                  fontSize: "0.9rem",
                  lineHeight: "1.4",
                }}
              >
                {med.description}
              </p>
            )}

            <div
              style={{
                fontSize: "0.85rem",
                color: "#666",
                marginBottom: "0.75rem",
              }}
            >
              {med.author && (
                <p>
                  <span style={{ fontWeight: "500" }}>Author:</span> {med.author}
                </p>
              )}
              {med.type?.length > 0 && (
                <p>
                  <span style={{ fontWeight: "500" }}>Type:</span>{" "}
                  {med.type.join(", ")}
                </p>
              )}
              {med.mood?.length > 0 && (
                <p>
                  <span style={{ fontWeight: "500" }}>Mood:</span>{" "}
                  {med.mood.join(", ")}
                </p>
              )}
            </div>

            {/* ✅ Audio at Bottom */}
            {med.audioURL && (
              <audio
                controls
                style={{ width: "100%" }}
                src={med.audioURL}
                title={med.title || "Meditation Audio"}
              >
                Your browser does not support the audio element.
              </audio>
            )}

            {med.podcast && (
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.85rem",
                  color: "#666",
                }}
              >
                <span style={{ fontWeight: "500" }}>Podcast:</span>{" "}
                {med.podcast}
              </p>
            )}
          </div>
        </div>
      ))
    ) : (
      <p
        style={{
          color: "#666",
          textAlign: "center",
          width: "100%",
          fontSize: "1rem",
        }}
      >
        No meditations found.
      </p>
    )}
  </div>
</div>

        {/* how sukoon transorm you */}
      
      {/* How Sukoon Transforms You */}
      <section style={{ padding: "2rem 0", backgroundColor: "#f8f9fa" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.75rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            color: "#333",
          }}
        >
          Discover Your Path to Peace with Sukoon
        </h2>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <Link
                to="/qoute"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="card"
                  style={{
                    padding: "1.5rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "#caffbf",
                    textAlign: "center",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <h4 style={{ fontWeight: "600", marginBottom: "0.5rem", fontSize: "1.25rem", color: "#1a2e57" }}>
                    Daily Inspiration
                  </h4>
                  <p style={{ fontSize: "0.875rem", color: "#555" }}>
                    A daily inspirational quote to uplift your mood and set a positive tone.
                  </p>
                </div>
              </Link>
            </div>
            <div className="col-md-4 mb-3">
              <Link
                to="/aboutus"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="card"
                  style={{
                    padding: "1.5rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "#bdb2ff",
                    textAlign: "center",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <h4 style={{ fontWeight: "600", marginBottom: "0.5rem", fontSize: "1.25rem", color: "#1a2e57" }}>
                    Session Timer
                  </h4>
                  <p style={{ fontSize: "0.875rem", color: "#555" }}>
                    A customizable timer to track your meditation or yoga sessions with ease.
                  </p>
                </div>
              </Link>
            </div>
            <div className="col-md-4 mb-3">
              <Link
                to="/breathing"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="card"
                  style={{
                    padding: "1.5rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "#ffd6a5",
                    textAlign: "center",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0,               }}
                >
                  <h4 style={{ fontWeight: "600", marginBottom: "0.5rem", fontSize: "1.25rem", color: "#1a2e57" }}>
                    Breathing Exercises
                  </h4>
                  <p style={{ fontSize: "0.875rem", color: "#555" }}>
                    Guided breathing exercises to promote relaxation and mindfulness.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

          {/*  qoute */}  
        <div className="quete-section ">
            <img
              src = "/image/FB8.png"
              alt = "yoga girl"
            />
            <div className="hero-overlay"></div>
            <div className="hero-text container">
                <p className="lead">{quote?.text}</p>
                <p className="lead">{quote?.author}</p>
            </div>
        </div>
        {/* article by mood */}
            <div className="container my-5">
      <h3 className="mb-4 text-center fw-bold" style={{ color: "#0d6efd" }}>
        Articles Based on Your Mood
      </h3>

      <div
        className="d-flex overflow-auto"
        style={{
          gap: "20px",
          paddingBottom: "15px",
          paddingTop: "10px",
        }}
      >
        {artice && artice.length > 0 ? (
          artice.map((article) => (
            <div
              key={article._id}
              className="card shadow-lg"
              style={{
                minWidth: "320px",
                maxWidth: "320px",
                borderRadius: "15px",
                flex: "0 0 auto",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
            >
              {/* Article Image with overlay */}
              {article.Image && (
                <div
                  style={{
                    position: "relative",
                    height: "180px",
                    overflow: "hidden",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}
                >
                  <img
                    src={article.Image}
                    alt={article.title}
                    className="card-img-top"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))",
                    }}
                  ></div>
                </div>
              )}

              <div className="card-body d-flex flex-column">
                {/* Title */}
                <h5
                  className="card-title fw-bold"
                  style={{ minHeight: "48px", color: "#0d6efd" }}
                >
                  {article.title}
                </h5>

                {/* Description */}
                <p className="card-text text-muted flex-grow-1">
                  {article.description.length > 80
                    ? article.description.slice(0, 80) + "..."
                    : article.description}
                </p>

                {/* Read More Button */}
                <Link
                  to={`/articleDetail/${article._id}`}
                  className="btn btn-primary mt-2"
                  style={{
                    borderRadius: "50px",
                    fontWeight: "500",
                    padding: "6px 18px",
                    alignSelf: "flex-start",
                  }}
                >
                  Read More
                </Link>
              </div>

              {/* Card Hover Effect */}
              <style>
                {`
                  .card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                  }
                  .card img:hover {
                    transform: scale(1.05);
                  }
                `}
              </style>
            </div>
          ))
        ) : (
          <p className="text-muted">No articles found for your mood 😔</p>
        )}
      </div>
    </div>
        {/* feedvback form */}
        <section style={{ background: "#f0f4f9", padding: "2rem 0" }}>
      <h2
        style={{
          textAlign: "center",
          color: "#1a2e57",
          marginBottom: "2rem",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        Over 2 million 5-star reviews.
      </h2>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
          overflowX: "auto",
        }}
      >
        {approve?.map((item,index) => (
          <div
            key={index}
            style={{
              background:
                "linear-gradient(180deg, #2a5cc7 0%, #7557ca 100%)",
              borderRadius: "16px",
              color: "white",
              padding: "1.5rem",
              minWidth: "300px",
              boxShadow: "0 8px 20px rgba(42,92,199,0.3)",
              position: "relative",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            <div
              style={{ fontSize: "3rem", opacity: 0.2, marginBottom: "1rem" }}
            >
              &#8220;
            </div>
            <p
              style={{
                fontWeight: "600",
                lineHeight: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              {item.feedback}
            </p>
            <div
              style={{
                fontStyle: "italic",
                opacity: 0.8,
                marginBottom: "0.75rem",
              }}
            >
              {item.name}
            </div>
             <StarRating rating={item.rating} />
          </div>
        ))}
      </div>
    </section>
       
        {/* accorgion section */}
       <div className="container my-5">
      <h2 className="text-center mb-4" style={{ fontWeight: "700", color: "#343a40" }}>
        Frequently Asked Questions
      </h2>

      {/* FAQ 1 */}
      <div className="card mb-3" style={{ borderRadius: "8px" }}>
        <div
          className="card-header"
          style={{
            cursor: "pointer",
            backgroundColor: "#f1f1f1",
            fontWeight: "600",
            fontSize: "16px",
            padding: "15px",
          }}
          onClick={() => toggle(1)}
        >
          What is Sukoon?
        </div>
        {open === 1 && (
          <div
            className="card-body"
            style={{
              backgroundColor: "#ffffff",
              padding: "15px",
              fontSize: "15px",
              color: "#555",
            }}
          >
            Sukoon is your personal wellness companion offering yoga, meditation, journaling,
            quotes, and personalized routines to help you find balance in daily life.
          </div>
        )}
      </div>

      {/* FAQ 2 */}
      <div className="card mb-3" style={{ borderRadius: "8px" }}>
        <div
          className="card-header"
          style={{
            cursor: "pointer",
            backgroundColor: "#f1f1f1",
            fontWeight: "600",
            fontSize: "16px",
            padding: "15px",
          }}
          onClick={() => toggle(2)}
        >
          How can I track my mood?
        </div>
        {open === 2 && (
          <div
            className="card-body"
            style={{
              backgroundColor: "#ffffff",
              padding: "15px",
              fontSize: "15px",
              color: "#555",
            }}
          >
            Just go to the mood tracker, pick your emotion, and Sukoon will suggest yoga, quotes, and
            meditation based on your mood.
          </div>
        )}
      </div>

      {/* FAQ 3 */}
      <div className="card mb-3" style={{ borderRadius: "8px" }}>
        <div
          className="card-header"
          style={{
            cursor: "pointer",
            backgroundColor: "#f1f1f1",
            fontWeight: "600",
            fontSize: "16px",
            padding: "15px",
          }}
          onClick={() => toggle(3)}
        >
          Can I build my own routine?
        </div>
        {open === 3 && (
          <div
            className="card-body"
            style={{
              backgroundColor: "#ffffff",
              padding: "15px",
              fontSize: "15px",
              color: "#555",
            }}
          >
            Absolutely! Sukoon allows you to create your own routines with yoga poses, meditation
            sessions, and journaling steps you love.
          </div>
        )}
      </div>
      <div className="card mb-3" style={{ borderRadius: "8px" }}>
  <div
    className="card-header"
    style={{
      cursor: "pointer",
      backgroundColor: "#f1f1f1",
      fontWeight: "600",
      fontSize: "16px",
      padding: "15px",
    }}
    onClick={() => toggle(5)}
  >
    Is there a cost to use Sukoon?
  </div>
  {open === 5 && (
    <div
      className="card-body"
      style={{
        backgroundColor: "#ffffff",
        padding: "15px",
        fontSize: "15px",
        color: "#555",
      }}
    >
      Sukoon is completely free for users. All features are available at no cost.
    </div>
  )}
</div>

{/* FAQ 6 */}
<div className="card mb-3" style={{ borderRadius: "8px" }}>
  <div
    className="card-header"
    style={{
      cursor: "pointer",
      backgroundColor: "#f1f1f1",
      fontWeight: "600",
      fontSize: "16px",
      padding: "15px",
    }}
    onClick={() => toggle(6)}
  >
    Can I journal privately in the app?
  </div>
  {open === 6 && (
    <div
      className="card-body"
      style={{
        backgroundColor: "#ffffff",
        padding: "15px",
        fontSize: "15px",
        color: "#555",
      }}
    >
      Yes, your journal entries are saved privately and securely within your profile.
    </div>
  )}
</div>

{/* FAQ 7 */}
<div className="card mb-3" style={{ borderRadius: "8px" }}>
  <div
    className="card-header"
    style={{
      cursor: "pointer",
      backgroundColor: "#f1f1f1",
      fontWeight: "600",
      fontSize: "16px",
      padding: "15px",
    }}
    onClick={() => toggle(7)}
  >
    What kind of meditation sessions are available?
  </div>
  {open === 7 && (
    <div
      className="card-body"
      style={{
        backgroundColor: "#ffffff",
        padding: "15px",
        fontSize: "15px",
        color: "#555",
      }}
    >
      Sukoon offers sessions for stress relief, sleep improvement, mindfulness, and emotional healing.
    </div>
  )}
</div>

{/* FAQ 8 */}
<div className="card mb-3" style={{ borderRadius: "8px" }}>
  <div
    className="card-header"
    style={{
      cursor: "pointer",
      backgroundColor: "#f1f1f1",
      fontWeight: "600",
      fontSize: "16px",
      padding: "15px",
    }}
    onClick={() => toggle(8)}
  >
    Can I access Sukoon offline?
  </div>
  {open === 8 && (
    <div
      className="card-body"
      style={{
        backgroundColor: "#ffffff",
        padding: "15px",
        fontSize: "15px",
        color: "#555",
      }}
    >
      Currently, Sukoon requires an internet connection. Offline support is coming soon.
    </div>
  )}
</div>

{/* FAQ 9 */}
<div className="card mb-3" style={{ borderRadius: "8px" }}>
  <div
    className="card-header"
    style={{
      cursor: "pointer",
      backgroundColor: "#f1f1f1",
      fontWeight: "600",
      fontSize: "16px",
      padding: "15px",
    }}
    onClick={() => toggle(9)}
  >
    Is there a daily reminder option?
  </div>
  {open === 9 && (
    <div
      className="card-body"
      style={{
        backgroundColor: "#ffffff",
        padding: "15px",
        fontSize: "15px",
        color: "#555",
      }}
    >
      Yes, you can set reminders for your routines, journaling, and meditations.
    </div>
  )}
</div>

{/* FAQ 10 */}
<div className="card mb-3" style={{ borderRadius: "8px" }}>
  <div
    className="card-header"
    style={{
      cursor: "pointer",
      backgroundColor: "#f1f1f1",
      fontWeight: "600",
      fontSize: "16px",
      padding: "15px",
    }}
    onClick={() => toggle(10)}
  >
    Can I share my progress with others?
  </div>
  {open === 10 && (
    <div
      className="card-body"
      style={{
        backgroundColor: "#ffffff",
        padding: "15px",
        fontSize: "15px",
        color: "#555",
      }}
    >
      Absolutely! You can download and share mood summaries and routine stats directly.
    </div>
  )}
</div>
    </div>
    
        <Footer/>
      </>
}

 export default Home;