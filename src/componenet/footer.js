function Footer() {
  return <>
    <div className="bg-dark"
  style={{
    // background: "linear-gradient(to right, #1b5e20, #66bb6a)", // elegant green gradient
    color: "#fff",
    padding: "60px 30px 30px",
    position: "relative",
    fontFamily: "sans-serif",
    marginTop : "5px"
  }}
>
  {/* Newsletter */}
  <div className="container mb-5">
    <div className="row align-items-center">
      <div className="col-md-6 mb-3">
        <h4 className="fw-bold">Join Our Sukoon Newsletter</h4>
        <p>Get the latest guided meditations, sleep audios, and wellness tips.</p>
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

  {/* Bottom Section */}
  <div className="container">
    <div className="row">
      {/* Logo & About */}
      <div className="col-md-3 mb-4">
        <h2 style={{ fontWeight: "bold" }}>
          <span style={{ color: "#a5d6a7" }}>S</span>ukoon
        </h2>
        <p style={{ fontSize: "14px" }}>
          Your daily dose of calm. Meditation, sleep, and peace—all in one place.
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

    <footer className="bg-secondary text-white text-center py-4 ">
      <p>🌿 Sukoon — A Peaceful Place Within</p>
      <p>© {new Date().getFullYear()} Sukoon. All rights reserved.</p>
      <div>
        <a href="#" className="text-white mx-2">Privacy</a>
        <a href="#" className="text-white mx-2">Terms</a>
        <a href="#" className="text-white mx-2">Contact</a>
      </div>
      <p> © 2025 Sukoon | Powered by Vanshika Rathore ❤️</p> 
    </footer>
  </>
}

export default Footer;
