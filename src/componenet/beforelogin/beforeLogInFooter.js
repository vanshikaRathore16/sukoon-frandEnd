import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EndPoint from "../apis/EndPoint";
import { getCurrentUser } from "../auth/auth";

const FooterBeforeLogIn = () => {
  const user = getCurrentUser();
  const [feedback, setFeedback] = useState({ feedback: "", rating: "", name: "" });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let details = { ...feedback, name: user?.name || "Anonymous" };
      await axios.post(EndPoint.FEEDBACK_BY_USER(user?._id), details);
      toast.success("Feedback submitted ✅");
      setFeedback({ feedback: "", rating: "", name: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #1a2b49, #0a192f)",
        color: "#fff",
        padding: "60px 20px",
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        

        {/* Other Columns on Right */}
        <div style={{ flex: "2 1 600px", display: "flex", flexWrap: "wrap", gap: "30px" }}>
          {[
            {
              title: "Company",
              items: [
                "About",
                "Careers",
                "Press",
                "Blog",
                "Meet our instructor",
                "Calm Science",
              ],
            },
            {
               
              title: "Help",
              items: [
                "FAQ",
                "Contact Us",
                "Terms",
                "Privacy Policy",
                "Consumer Health",
                "Data",
                "CCPA Notice",
                "Opt Out of Targeted Ads",
                "Cookies",
                "Accessibility Statement",
              ],
            
            },
            {
               
              title: "Help",
              items: [
                "FAQ",
                "Contact Us",
                "Terms",
                "Privacy Policy",
                "Consumer Health",
                "Data",
                "CCPA Notice",
                "Opt Out of Targeted Ads",
                "Cookies",
                "Accessibility Statement",
              ],
            
            },
            {
              title: "Calm for Organizations",
              items: ["Organizations under 300", "Organizations 300+"],
            },
             {
              title: "Calm for Organizations",
              items: ["Organizations under 300", "Organizations 300+"],
            },
           
          ].map((col, idx) => (
            <div key={idx} style={{ minWidth: "200px" }}>
              <h5 style={{ fontWeight: "700", marginBottom: "15px" }}>{col.title}</h5>
              <ul className="list-unstyled" style={{ lineHeight: "2" }}>
                {col.items.map((item, i) => (
                  <li
                    key={i}
                    className="footer-link"
                    style={{ cursor: "pointer", transition: "color 0.3s ease" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Social Icons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        <a href="#" className="social-icon">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="#" className="social-icon">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="#" className="social-icon">
          <i className="bi bi-twitter"></i>
        </a>
      </div>

      {/* Copyright */}
      <p style={{ textAlign: "center", marginTop: "30px", color: "#ccc" }}>
        Copyright © 2025 Calm. All rights reserved
      </p>

      {/* Styles for hover effects */}
      <style>
        {`
          .footer-link:hover {
            color: #6a11cb;
          }
          .social-icon {
            color: #fff;
            font-size: 1.5rem;
            transition: color 0.3s ease, transform 0.3s ease;
          }
          .social-icon:hover {
            color: #2575fc;
            transform: scale(1.2);
          }
        `}
      </style>
    </footer>
  );
};

export default FooterBeforeLogIn;
