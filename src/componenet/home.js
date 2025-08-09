import Header from "./Header.js";
import Footer from "./footer.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import EndPoint from "./apis/EndPoint.js";
import { useContext,useEffect } from "react";
import { toast } from "react-toastify";
const reviews = [
  {
    id: 1,
    text: "My family loves Calm! Out of the three meditation apps I have on my phone, Calm is the one I actually use.",
    user: "Kristie from Irvine",
    rating: 5,
  },
  {
    id: 2,
    text: "Calm cuts through my stress, anxiety, irregular sleep schedule and brings me to deep sleep. I usually fall asleep within 5 minutes.",
    user: "Mathieu from New Orleans",
    rating: 5,
  },
  {
    id: 3,
    text: "I have tried many meditation apps, but Calm has the best techniques and guided meditations.",
    user: "Jen from Boston",
    rating: 4.5,
  },
];

function Home(){
  //   rondim qoutes 
  const [open, setOpen] = useState(null);
    const [quote, setQuote] = useState(null);
    const[approve,setApprove] = useState([]);
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

    return<>
        <Header/>
        {/* hero section */}
        <div className="hero-section">
            <img
              src = "/image/FPhero.png"
              alt = "yoga girl"
            />
            <div className="hero-overlay"></div>
            <div className="hero-text container">
                <h1 className="display-4 font-weight-bold">A healing place for your body and mind</h1>
                <p className="lead">Personalized yoga, meditation, notes, quotes — all in one peaceful app</p>

            </div>
        </div>
        {/* what you find incide the sukoon */}
        <section className="text-center py-5">
            <h1> What You'll Find Inside Sukoon</h1>
            <p className="text-muted">Discover Our Mindful Program</p>
              </section>
              <section>
                {/* fisrt */}
               <div className="feature-section">
                    <div className="feature-text">
                        <h5>1000+ Yoga Poses. One Journey to Peace.</h5>
                         <p>
                      Sukoon is your personal wellness app to build a daily routine. You can
                      access 1000+ yoga poses customized to your comfort level. Whether you're
                    a beginner or advanced, Sukoon makes your journey easier.
                     </p>
                     <Link to="/signup" className="btn btn-success">learn more</Link>
                    </div>
                    <div className="feature-image">
                        <img
                        src = "/image/FB1.png"
                        alt = "image"
                        
                        />
                    </div>
                </div>
                {/* second */}
                 <div className="feature-section">
                     <div className="feature-image">
                        <img
                        src = "/image/FP2.png"
                        alt = "image"
                        
                        />
                    </div>
                    <div className="feature-text">
                        <h5>Personalized Routine</h5>
                         <p>
                     At Sukoon, we understand that every journey is unique. That’s why we offer personalized wellness routines tailored to your goals, fitness level, and available time. Simply share your preferences and we’ll create a calming, energizing, or healing routine just for you. It’s your self-care — thoughtfully crafted to support your lifestyle and emotional needs.


                     </p>
                     <Link to="/signup" className="btn btn-success">learn more</Link>
                    </div>
                   
                </div>
                {/* third */}
                <div className="feature-section">
                    <div className="feature-text">
                        <h5>Built-in Routines</h5>
                         <p>
                     Not sure where to begin? Our pre-built routines are here to guide you. Whether you want a morning energy boost, evening relaxation, or a quick 10-minute stretch, we’ve designed ready-made sequences to fit your mood and schedule. These professionally curated plans help you stay consistent, even on busy days, and build long-term habits with ease.
                     </p>
                     <Link to="/signup" className="btn btn-success">learn more</Link>
                    </div>
                    <div className="feature-image">
                        <img
                        src = "/image/FB3.png"
                        alt = "image"
                        
                        />
                    </div>
                </div>
                {/* forth */}
                 <div className="feature-section">
                     <div className="feature-image">
                        <img
                        src = "/image/FB4.png"
                        alt = "image"
                        
                        />
                    </div>
                    <div className="feature-text">
                        <h5>Mood Tracker</h5>
                         <p>
                     Your emotions matter — and they deserve to be heard. Our beautifully designed mood tracker allows you to log how you’re feeling each day, offering insight into your mental and emotional patterns. Over time, you’ll notice how your moods connect to your routines, and you’ll feel more in control, aware, and grounded in your daily life.
                     </p>
                     <Link to="/signup" className="btn btn-success">learn more</Link>
                    </div>
                   
                </div>
                {/* fifth */}
                 <div className="feature-section">
                    <div className="feature-text">
                        <h5>Guided Journaling</h5>
                         <p>
                     Turn your thoughts into clarity with our guided journaling space. Whether you’re celebrating a good day or processing a tough one, our prompts help you reflect, release, and reset. Writing becomes a form of therapy — private, powerful, and personal. It’s more than journaling; it’s a conversation with your inner self.
                     </p>
                     <Link to="/signup" className="btn btn-success">learn more</Link>
                    </div>
                    <div className="feature-image">
                        <img
                        src = "/image/FB5.png"
                        alt = "image"
                        
                        />
                    </div>
                </div>
                 {/* forth */}
                 <div className="feature-section">
                     <div className="feature-image">
                        <img
                        src = "/image/FB6.png"
                        alt = "image"
                        
                        />
                    </div>
                    <div className="feature-text">
                        <h5>Quotes for Every Mood</h5>
                         <p>
                    Sometimes, a few simple words can shift your whole day. That’s why Sukoon brings you handpicked quotes across all emotional states — from gratitude and hope to love, courage, and healing. Let inspiring words find you when you need them most and remind you that you’re never alone on this journey.
                     </p>
                     <Link to="/signup" className="btn btn-success">learn more</Link>
                    </div>
                   
                </div>
                {/* fifth */}
                 <div className="feature-section">
                    <div className="feature-text">
                        <h5> Mindful Meditation</h5>
                         <p>
                    Quiet your mind and return to the present moment with our library of guided meditations. Whether you’re seeking better sleep, improved focus, or emotional healing, our sessions are designed to help you breathe deeper and live lighter. Meditation isn’t just a practice — with Sukoon, it becomes a peaceful daily ritual.


                     </p>
                     <Link to="/signup" className="btn btn-success">learn more</Link>
                    </div>
                    <div className="feature-image">
                        <img
                        src = "/image/FB7.png"
                        alt = "image"
                        
                        />
                    </div>
                </div>
            </section>
      
        {/* how sukoon transorm you */}
        <section className="py-5">
         <h4 className="text-center mb-4">how sukoon transorm you</h4>
         <div className="container">
            <div className="row text-center">
                <div className="col-md-4">
                    <div className="p-4 rounded" style={{ backgroundColor: "#caffbf" }}>
                        Create Your Peaceful Routine
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-4 rounded" style={{ backgroundColor: "#bdb2ff" }}>
                        Create Your Peaceful Routine
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-4 rounded" style={{ backgroundColor: "#ffd6a5" }}>
                        Create Your Peaceful Routine
                    </div>
                </div>
            </div>
         </div>
        </section>
        <div className="quete-section">
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