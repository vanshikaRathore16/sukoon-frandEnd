import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../footer";
function Mood(){
    return<>
    <Header/>
     <div className="container my-5">
  <div className="row align-items-center justify-content-center">
    
    {/* Left Side Text */}
    <div className="col-md-6 mb-4 mb-md-0">
      <h2 className="fw-bold">Start tracking your mood today!</h2>
      <p className="fs-5">
        <span className="fw-semibold fs-3">U</span>
        nderstand yourself better and take better control of your life with Sukoon
      </p>
      <Link to="/selfReflation">
  <button className="btn btn-success rounded-pill px-4 py-2 mt-3 fw-semibold">
    Let’s start
  </button>
</Link>
    </div>

    {/* Right Side Big + Small Image */}
    <div className="col-md-6 position-relative mb-4 mb-md-0 ">  {/* <== Added ps-5 for right shift */}
      {/* Big Image */}
      <img
        src="image/MP1.png"
        alt="Mood Background"
        className="img-fluid rounded-4"
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          borderRadius: "20px",
        }}
      />

      {/* Small Image - Half Outside on Left Side Only */}
      <img
        src="image/MP2.png"
        alt="Overlay"
        className="position-absolute shadow"
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "20px",
          bottom: "20px",        // inside vertically
          left: "-30px",         // half out on left
          objectFit: "cover",
          backgroundColor: "#fff",
        }}
      />
    </div>
  </div>
 
</div>
 {/* Support Text Section */}
      <div className="py-5 px-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#7c9d7d",height : "400px" }}>
        <div className="container text-white">
          <h5 className="fw-bold text-white mb-3 text-center">How Sukoon Supports You</h5>
          <p className="text-center fs-6">
            Sukoon is more than an app — it's your safe space to pause, reflect, and heal.
            With simple mood check-ins and peaceful journaling prompts, it helps you understand how you truly feel.
            Whether you're having a good day or a hard one, Sukoon meets you where you are. Each feature — from emotional
            tracking to personal routines — is designed to hold space for your growth, clarity, and calm. Over time,
            it helps you reconnect with yourself — softly, steadily, and truthfully.
          </p>
          <p className="fw-bold text-center text-success fs-5 mb-0">read more</p>
        </div>
      </div>
    {/* third section */}
  <div
  className="container-fluid"
  style={{
    padding: "0",
    margin: "0",
    height: "100vh",
    overflow: "hidden",
  }}
>
  <div
    className="row no-gutters h-100"
    style={{ margin: 0 }}
  >
    {/* Left: Full Image */}
    <div className="col-md-6 position-relative h-100">
      <img
        src="image/MP3.png"
        alt="Full"
        style={{
          width: "80%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Overlay Image */}
      <img
        src="image/MP4.png"
        alt="Overlay"
        className="position-absolute"
        style={{
          width: "300px",
          height: "300px",
          bottom: "40px",
          left: "400px",
          objectFit: "cover",
          backgroundColor: "#fff",
          borderRadius: "20px",
        }}
      />
    </div>

    {/* Right: Text */}
    <div
      className="col-md-6 d-flex flex-column justify-content-center align-items-start px-5"
      style={{ backgroundColor: "#fff" }}
    >
      <h2 className="fw-bold"> How Journaling Helps You</h2>
      <p className="fs-5">
        <span className="fw-semibold fs-3">U</span>
      Journaling is more than just writing — it’s a safe space to slow down, reflect, and release your thoughts. When you express how you feel, you gain clarity, emotional balance, and a deeper understanding of yourself. It helps reduce stress, process tough emotions, and celebrate small wins. Over time, journaling builds self-awareness and emotional strength, empowering you to respond to life more mindfully and confidently.
      </p>
    </div>
  </div>
</div>

{/* forth section */}
<div
  className="d-flex flex-wrap"
  style={{
    height: "500px",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#7c9d7d",
    borderRadius: "12px",
  }}
>
  {/* Left Div - Text Section */}
  <div
    className="d-flex flex-column justify-content-center"
    style={{
      width: "50%",
      paddingTop: "40px",
      paddingBottom: "40px",
      paddingLeft: "30px",
      paddingRight: "30px",
      color: "#000",
    }}
  >
    <h2 className="fw-bold">How Mood Tracking Supports You</h2>
    <p className="fs-5">
      <span className="fw-semibold fs-3">U</span>
     Your emotions tell a story — and mood tracking helps you listen. By recording how you feel each day, you begin to notice patterns and triggers in your emotional well-being. This gentle habit helps you connect your moods to daily choices, relationships, and routines. Over time, it becomes a powerful self-care tool that guides you toward better mental balance, self-understanding, and healthier responses to life’s ups and downs.
    </p>
  </div>

  {/* Right Div - Image Section */}
  <div
    className="position-relative"
    style={{
      width: "50%",
      height: "100%",
    }}
  >
    {/* Main Background Image */}
    <img
      src="image/MP5.png"
      alt="Mood Background"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />

    {/* Small Floating Image */}
    <img
      src="image/MP6.png"
      className="position-absolute"
      alt="Overlay Leaf"
      style={{
        width: "250px",
        height: "250px",
        bottom: "20px",
        left: "-50px",
        objectFit: "cover",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        backgroundColor: "#fff",
      }}
    />
  </div>
</div>

  {/* fifth sectation */}
   {/* fifth section */}
<div
  className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5"
  style={{ paddingTop: "40px" }}
>
  <h2 className="fw-bold text-center">Write, Track, Heal: The Sukoon Way to Emotional Wellness</h2>
  <p className="fs-5 text-center">
    <span className="fw-semibold fs-3">U</span>
    At Sukoon, we believe that emotional wellness begins with understanding yourself deeply. Our combined journaling and mood tracking tools give you a safe space to write down your thoughts and feelings, while also tracking your daily emotional patterns. This powerful duo helps you uncover insights, process stress, and celebrate progress. By writing, tracking, and healing, you create a mindful routine that nurtures your mental health and guides you toward lasting peace and balance.
  </p>
</div>

    <Footer/>
    </>
}
export default Mood;