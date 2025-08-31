import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../footer";
import { QouteCategorylist } from "../../App";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import EndPoint from "../apis/EndPoint";

function Qoute() {
  let { CategoryList } = useContext(QouteCategorylist);
  const [qoute, setQoute] = useState();

  // Mapping of categories to relevant background image URLs
  const categoryImageMap = {
    positive: "https://images.unsplash.com/photo-1516810714657-e654b97f1d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvc2l0aXZlfGVufDB8fDB8fHww",
    peace: "https://media.istockphoto.com/id/1496615471/photo/mixed-race-woman-relax-and-breathing-fresh-air-outdoor-at-sunset.webp?a=1&b=1&s=612x612&w=0&k=20&c=zLydVANIYj4xHiq5JR1BhC66yZ5i-jzgBRB-m2gKfw8=",
    focus: "https://media.istockphoto.com/id/935507394/photo/young-female-college-student-in-chemistry-class-writing-notes-focused-student-in-classroom.webp?a=1&b=1&s=612x612&w=0&k=20&c=mEHNDMWEsQjq8nc1tfclgmMowBTKLo8RFbH7wN_8td4=",
    joy: "https://media.istockphoto.com/id/2151245962/photo/grandparents-bubbles-and-children-play-in-park-happy-together-for-fun.webp?a=1&b=1&s=612x612&w=0&k=20&c=W-lVUVPvOVT1xS6Mcf1oHQJCIkjD_G2unn795AntOus=",
    calm: "https://images.unsplash.com/photo-1483691278019-cb7253bee49f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNhbG18ZW58MHx8MHx8fDA%3D",
    gratitude: "https://media.istockphoto.com/id/2219446935/photo/meditation-and-gratitude-practice-by-indian-woman-in-nature.webp?a=1&b=1&s=612x612&w=0&k=20&c=2AAjPzpJeOAEuJgh9jaJT_CEdD-qoR14mt6qz5Ca5Lo=",
    energy: "https://media.istockphoto.com/id/1332653740/photo/shot-of-a-young-man-exercising-in-nature.webp?a=1&b=1&s=612x612&w=0&k=20&c=RNzzNHl-rreBLisIS8-DYIFiktJsKeHBmmhxvVvviJo=",
    love: "https://media.istockphoto.com/id/1206898969/photo/happy-friends-making-heart-shaped-symbol-with-hands-and-showing.webp?a=1&b=1&s=612x612&w=0&k=20&c=wJIRp8QgGs-t1UfZ4c2KtFHUnNnqoi6FLO00RYydeyg=",
    growth: "https://media.istockphoto.com/id/1312448469/photo/business-woman-at-office-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=GuXEEi-R_HFqs84qkNd7sNSfPsSmqldDxd0o3tAf-nw=",
    kindness: "https://media.istockphoto.com/id/1485167200/photo/smiling-adorable-caucasian-teen-boy-expressing-positive-emotions-while-feeding-rock-pigeons.webp?a=1&b=1&s=612x612&w=0&k=20&c=iEkD7oaxu4Z8XW9SJMuGUx8QaSNpTlVGyksoP5_06xc=",
    motivation: "https://media.istockphoto.com/id/2007594847/photo/sisyphean-task-under-a-fiery-sky.webp?a=1&b=1&s=612x612&w=0&k=20&c=jzpqPweRS41SgLmC08bfFA9MnCj4C2vpkYXI2aT9cBY=",
    inspiration: "https://media.istockphoto.com/id/639340888/photo/working-their-way-through-different-solutions.webp?a=1&b=1&s=612x612&w=0&k=20&c=iy0bEzn2crFSLJ5PFt1tc8mnOX78esSKrbhqSPh6TCE=",
    spiritual: "https://media.istockphoto.com/id/1187160971/photo/young-woman-practicing-yoga-and-meditation-in-sunshine-of-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=cPbKL7YobQ1wtGJHT2_prblnNKYTuFb3yUaPvdNTa5s=",
    wisdom: "https://media.istockphoto.com/id/1344939844/photo/hand-holding-drawing-virtual-lightbulb-with-brain-on-bokeh-background-for-creative-and-smart.webp?a=1&b=1&s=612x612&w=0&k=20&c=Q1LGFdFoZQ0YRWTcHtSZpvfJ_DtgD86aMMuUYxPtz8s=",
    reflection: "https://media.istockphoto.com/id/1064573830/photo/hes-full-of-bright-ideas.webp?a=1&b=1&s=612x612&w=0&k=20&c=2SrY1ttYGHzn0T6o3OWCzsGMLJ_WgQrEf6h-YTEmD8E=",
    strength: "https://media.istockphoto.com/id/1010069056/photo/funny-portrait-of-a-young-black-curvy-woman-during-a-training-session.webp?a=1&b=1&s=612x612&w=0&k=20&c=iA66xJhTQOIEuvDdvalOXwWLoof_oh-iwbYV4fN61D0=",
    "self-love": "https://media.istockphoto.com/id/1829889058/photo/horizontal-image-of-pretty-redhead-female-with-closed-eyes-wearing-rings-on-fingers-hugging.webp?a=1&b=1&s=612x612&w=0&k=20&c=o4ge5RN89ibWncVzMLHJXCat0P2EuGs_5eYx3oxX2sM=",
    courage: "https://media.istockphoto.com/id/1080117308/photo/freedom-young-woman-outstretched-arms-on-seaside-rock-cliff-edge.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ely-ZDF0tsg-n6aCb4V469Gjz5uSBqEuy2Y0WoSQis0=",
    healing: "https://plus.unsplash.com/premium_photo-1663047725430-f855f465b6a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aGVhbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    hope: "https://plus.unsplash.com/premium_photo-1690038210770-ca8b03424635?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9wZXxlbnwwfHwwfHx8MA%3D%3D"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(EndPoint.RONDOM_QOUTE);
        setQoute(response.data.rondomQuote);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

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

      {/* 🗂️ Enhanced Category Cards with Background Images */}
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
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${categoryImageMap[category.toLowerCase()] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "18px",
                    textAlign: "center",
                    minHeight: "150px", // Increased for better image display
                    transition: "transform 0.4s ease, box-shadow 0.4s ease",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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

       
      </div>

      <Footer />
    </>
  );
}

export default Qoute;