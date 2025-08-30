import { useState } from "react";
import { toast } from "react-toastify";
import EndPoint from "./apis/EndPoint.js";
import axios from "axios";
import { getCurrentUser } from "./auth/auth.js";

function Footer() {
  let user = getCurrentUser();

  const [feedBack, setFeetback] = useState({
    feedback: "",
    rating: "",
    name: "",
  });

  const handleFromSubmit = async (event) => {
    try {
      event.preventDefault();
      let details = { ...feedBack, name: user?.name || "Anonymous" };
      let response = await axios.post(
        EndPoint.FEEDBACK_BY_USER(user?._id),
        details
      );
      console.log(response.data);
      toast.success("Feedback submitted ✅");
      setFeetback({ feedback: "", rating: "", name: "" });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <>
      <div
        className="bg-dark"
        style={{
          color: "#fff",
          padding: "60px 30px 30px",
          position: "relative",
          fontFamily: "sans-serif",
          marginTop: "5px",
        }}
      >
        {/* Newsletter */}
        <div className="container mb-5">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3">
              <h4 className="fw-bold">Join Our Sukoon Newsletter</h4>
              <p>
                Get the latest guided meditations, sleep audios, and wellness
                tips.
              </p>
            </div>
            <div className="col-md-6">
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#fff",
                  borderRadius: "30px",
                  overflow: "hidden",
                  maxWidth: "450px",
                  marginLeft: "auto",
                }}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  style={{
                    border: "none",
                    padding: "10px 20px",
                    flex: 1,
                    outline: "none",
                  }}
                />
                <button
                  style={{
                    backgroundColor: "#2e7d32",
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="container mb-5">
          <h2 className="text-center mb-4">We Value Your Feedback 💚</h2>
          <form
            onSubmit={handleFromSubmit}
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              background: "rgba(255,255,255,0.05)",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Share your experience with Sukoon..."
                value={feedBack.feedback}
                onChange={(e) =>
                  setFeetback({ ...feedBack, feedback: e.target.value })
                }
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                min="1"
                max="5"
                placeholder="Rate us (1-5)"
                value={feedBack.rating}
                onChange={(e) =>
                  setFeetback({ ...feedBack, rating: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              style={{ borderRadius: "25px", fontWeight: "bold" }}
            >
              Submit Feedback
            </button>
          </form>
        </div>

        {/* Bottom Section */}
        <div className="container">
          <div className="row">
            {/* Logo & About */}
            <div className="col-md-3 mb-4">
              <h2 style={{ fontWeight: "bold" }}>
                <span style={{ color: "#a5d6a7" }}>S</span>ukoon
              </h2>
              <p style={{ fontSize: "14px" }}>
                Your daily dose of calm. Meditation, sleep, and peace—all in one
                place.
              </p>
              <div style={{ fontSize: "18px", gap: "10px", display: "flex" }}>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-youtube"></i>
              </div>
            </div>

            {/* Navigation */}
            <div className="col-md-3 mb-4">
              <h5 className="fw-bold">Navigation</h5>
              <ul className="list-unstyled">
                <li>Home</li>
                <li>Meditation</li>
                <li>Sleep</li>
                <li>Music</li>
                <li>About</li>
              </ul>
            </div>

            {/* Resources */}
            <div className="col-md-3 mb-4">
              <h5 className="fw-bold">Resources</h5>
              <ul className="list-unstyled">
                <li>FAQs</li>
                <li>Blog</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-md-3 mb-4">
              <h5 className="fw-bold">Contact Us</h5>
              <p style={{ fontSize: "14px" }}>
                support@sukoon.com <br /> Mon - Fri, 9AM - 6PM
              </p>
              <button
                style={{
                  backgroundColor: "#a5d6a7",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: "20px",
                  color: "#1b5e20",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Call Now
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.2)",
              marginTop: "30px",
              paddingTop: "15px",
              textAlign: "center",
              fontSize: "13px",
            }}
          >
            © {new Date().getFullYear()} Sukoon • All rights reserved.
          </div>
        </div>
      </div>

      {/* Final Footer Bar */}
      <footer className="bg-secondary text-white text-center py-4 ">
        <p>🌿 Sukoon — A Peaceful Place Within</p>
        <p>© {new Date().getFullYear()} Sukoon. All rights reserved.</p>
        <div>
          <a href="#" className="text-white mx-2">
            Privacy
          </a>
          <a href="#" className="text-white mx-2">
            Terms
          </a>
          <a href="#" className="text-white mx-2">
            Contact
          </a>
        </div>
        <p>© 2025 Sukoon | Powered by Vanshika Rathore ❤️</p>
      </footer>
    </>
  );
}

export default Footer;
