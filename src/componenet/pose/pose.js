import { FaSearch } from "react-icons/fa";
import Footer from "../footer";
import Header from "../Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import EndPoint from "../apis/EndPoint";

function Pose() {
  const [poseType, setPoseType] = useState([]);

  useEffect(() => {
    const fetchPose = async () => {
      try {
        let response = await axios.get(EndPoint.POSE_CATEGORY);
        console.log("Data from backend:", response.data);
        setPoseType(response.data.Type);
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    };
    fetchPose();
  }, []);

  return (
    <>
      <Header />
      <div
        className="container-fluid"
        style={{
          background: "linear-gradient(135deg, #e6f0fa, #f0f7ff)",
          minHeight: "100vh",
          paddingBottom: "40px",
        }}
      >
        {/* Beautiful Intro Paragraph */}
        <div className="container pt-5 text-center mb-5">
          <h2
            className="mb-4 fw-bold"
            style={{
              fontFamily: "'Lora', serif",
              color: "#1a3c6d",
              fontSize: "2.5rem",
              letterSpacing: "0.5px",
            }}
          >
            Discover the Power of Yoga
          </h2>
          <p
            className="mx-auto"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "1.1rem",
              color: "#4a4a4a",
              maxWidth: "800px",
              lineHeight: "1.8",
            }}
          >
            I was overweight, had bad skin, and was losing hair. My clothes didn’t fit, and my constant agitation was straining my relationships. After moving back to India from the US, I was depressed, lethargic, and battling writer’s block. My life felt utterly imbalanced. That’s when I began my yoga practice. Ten years later, I’m at my ideal weight, eating healthier without cravings, and my hair and skin are thriving. I approach work with a balanced mindset, detached from outcomes, and often find myself in a creative flow. I’ve learned to manage my emotions and discovered that life, no matter the circumstances, can be a joyful journey.
          </p>
        </div>

        <hr
          style={{
            margin: "30px auto",
            border: "none",
            height: "3px",
            background: "linear-gradient(to right, #1a3c6d, #66a3ff)",
            maxWidth: "600px",
          }}
        />

        {/* Section Title */}
        <div className="text-center my-5">
          <h3
            className="fw-bold"
            style={{
              fontFamily: "'Lora', serif",
              color: "#1a3c6d",
              fontSize: "2rem",
            }}
          >
            Types of Poses
          </h3>
        </div>

        {/* Pose Category Cards */}
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
                      background: `linear-gradient(135deg, ${
                        i % 2 === 0 ? "#b3cde0" : "#d6e4ff"
                      }, #e6f0fa)`,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      borderRadius: "20px",
                      minHeight: "220px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 30px rgba(0, 51, 102, 0.2)";
                      const img = e.currentTarget.querySelector("img");
                      if (img) {
                        img.style.transform = "scale(1.1)";
                        img.style.border = "3px solid #1a73e8";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0, 0, 0, 0.1)";
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
                      className="rounded-circle mb-3"
                      style={{
                        width: "140px",
                        height: "140px",
                        objectFit: "cover",
                        transition: "transform 0.3s ease, border 0.3s ease",
                        border: "3px solid transparent",
                      }}
                    />
                    <p
                      className="mt-2 fw-bold fs-5 text-capitalize"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        color: "#1a3c6d",
                      }}
                    >
                      {item.type}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Support Text Section */}
        <div
          className="py-5 px-3"
          style={{
            background: "linear-gradient(135deg, #1a3c6d, #2a5298)",
            color: "#fff",
          }}
        >
          <div className="container text-center">
            <h5
              className="fw-bold mb-4"
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "1.8rem",
              }}
            >
              How Sukoon Supports You
            </h5>
            <p
              className="fs-6 mx-auto"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                maxWidth: "700px",
                lineHeight: "1.8",
              }}
            >
              Sukoon is more than an app — it’s your sanctuary for pause, reflection, and healing. With intuitive mood check-ins and serene journaling prompts, it helps you connect with your true emotions. Whether you’re embracing a joyful moment or navigating a challenging day, Sukoon is there for you. Every feature, from emotional tracking to personalized routines, is crafted to foster growth, clarity, and calm, guiding you gently toward a deeper connection with yourself.
            </p>
            <Link
              to="/learn-more"
              className="fw-bold text-success fs-5 text-decoration-none"
              style={{
                fontFamily: "'Poppins', sans-serif",
                color: "#12024dff",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00a896")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#00c4b4")}
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Pose;