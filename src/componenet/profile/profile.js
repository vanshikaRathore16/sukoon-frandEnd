import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../auth/auth";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import EndPoint from "../apis/EndPoint";
import Header from "../Header";
function ProfilePage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const[mood,setMood] = useState([]);
  const [localUser, setLocalUser] = useState(user);
  const [formdata, setFormdata] = useState({
    contact: user?.profile?.contact || "",
    gender: user?.profile?.gender || "male",
    level: user?.profile?.level || "beginner",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showMoods, setShowMoods] = useState(false);
  const [notes, setNotes] = useState([]);
   const [showNotes, setShowNotes] = useState(false);


  // Handle profile update
  const handleFormdata = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("userId", user._id);
      data.append("contact", formdata.contact);
      data.append("gender", formdata.gender);
      data.append("level", formdata.level);
      if (formdata.image) data.append("imageaname", formdata.image);

      const response = await axios.put(EndPoint.UPDATE_PROFILE, data);
      const updatedUser = response.data;

      setLocalUser(updatedUser);
      sessionStorage.setItem("current_user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  // Fetch moods for Graphic Design
  const fetchMoods = async () => {
    try{
      const res = await axios.get(EndPoint.GETONLYMOOD(user._id));
      setMood(res.data.mood_history);
      console.log(res.data);
      // Assuming res.data is an array of { mood, date }
    } catch (err){
      console.log(err);
      toast.error("Failed to fetch moods");
    }
  };
  
  const fetchNotes = async () => {
  try {
    const res = await axios.get(EndPoint.GETONLYNOTES(user._id)); // create this endpoint
    setNotes(res.data.note_history); // assuming backend returns { notes: [...] }
    console.log(res.data);
  } catch (err) {
    console.log(err);
    toast.error("Failed to fetch notes");
  }
};

  const services = [
    { id: "graphic", title: "moods", desc: "Your Mood Journey 🌸 See all your past feelings at a glance.", color: "#f8f9fa" },
    { id: "web", title: "notes", desc: "Review and revisit everything you’ve saved so far.", color: "#e3f2fd" },
    { id: "software", title: "personal plan", desc: "Review all your past personal plans and see your progress toward peace and balance.", color: "#fff3e0" },
    { id: "application", title: "fav qoute", desc: "All the quotes you’ve saved in one place", color: "#f1f8e9" },
  ];

  // Handle service card click
  const handleServiceClick = (id) => {
    if (id === "graphic") {
      setShowMoods(true);
      fetchMoods();
    } else if (id === "web") {
    setShowNotes(true);
    setShowMoods(false);
    fetchNotes();
  } else if (id === "software") {
    navigate("/personalPlanList")}
    else if (id === "application") {
    navigate("/userfavoriterouter"); // Navigate to application page
  }
  };

  return (
    <>
      <ToastContainer />
      <Header/>
      <div style={{ fontFamily: "Inter, sans-serif", minHeight: "100vh", background: "#ffffff", padding: "60px 20px" }}>
       <h1
  className="fw-bold mb-3"
  style={{
    textAlign: "center",
    fontFamily: "'Lora', serif",
    fontSize: "3.5rem",
    color: "#003366",
    letterSpacing: "2px",
    textShadow: "2px 2px 6px rgba(0,0,0,0.2)",
  }}
>
  sukoon
</h1>

<p
  style={{
    textAlign: "center",
    color: "#555",
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "1.25rem",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.8",
    fontStyle: "italic",
  }}
>
  Calm mind, kind heart, peaceful soul
</p>


        <div className="container">
          <div className="row align-items-center justify-content-center">
            {/* Profile Card */}
            <div className="col-md-4 text-center mb-4">
              <div style={{ background: "#597faaff", borderRadius: "16px", padding: "30px", color: "white" }}>
                <img
                  src={`http://localhost:3000/profile/${localUser?.profile?.imageaname}`}
                  alt="Profile"
                  style={{ borderRadius: "50%", width: "120px", height: "120px", objectFit: "cover", marginBottom: "15px" }}
                />

                {!isEditing ? (
                  <>
                    <h4 className="mb-2">{localUser?.name}</h4>
                    <p className="mb-1">{localUser?.email}</p>
                    <p className="mb-1">Contact: {localUser?.profile?.contact}</p>
                    <p className="mb-1">Gender: {localUser?.profile?.gender}</p>
                    <p className="mb-1">Level: {localUser?.profile?.level}</p>
                    <button
  style={{
    backgroundColor: "#003366", // custom color
    color: "#fff",               // text color
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  }}
  onClick={() => setIsEditing(true)}
>
  Edit Profile
</button>

                  </>
                ) : (
                  <form onSubmit={handleFormdata}>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Contact"
                      value={formdata.contact}
                      onChange={(e) => setFormdata({ ...formdata, contact: e.target.value })}
                    />
                    <select
                      className="form-control mb-2"
                      value={formdata.gender}
                      onChange={(e) => setFormdata({ ...formdata, gender: e.target.value })}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="othere">Other</option>
                    </select>
                    <select
                      className="form-control mb-2"
                      value={formdata.level}
                      onChange={(e) => setFormdata({ ...formdata, level: e.target.value })}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    <input
                      type="file"
                      className="form-control mb-2"
                      onChange={(e) => setFormdata({ ...formdata, image: e.target.files[0] })}
                    />
                    <button type="submit" className="btn btn-light px-4">Save</button>
                    <button type="button" className="btn btn-secondary ms-2 px-4" onClick={() => setIsEditing(false)}>Cancel</button>
                  </form>
                )}
              </div>
            </div>

            {/* Service Cards */}
            <div className="col-md-8">
              <div className="row g-4">
                {services.map((service) => (
                  <div key={service.id} className="col-6">
                    <div
                      className="card shadow-sm h-100"
                      style={{ borderRadius: "16px", background: service.color, cursor: "pointer", transition: "0.3s" }}
                      onClick={() => handleServiceClick(service.id)}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                    >
                      <div className="card-body text-center">
                        <h5 className="fw-bold">{service.title}</h5>
                        <p className="text-muted small">{service.desc}</p>
                      <button
  style={{
    backgroundColor: "#003366", // custom color
    color: "#fff",              // text color
    border: "none",
    padding: "5px 15px",
    borderRadius: "5px",
    fontWeight: "500",
    cursor: "pointer",
  }}
  className="btn-sm mt-2"
>
  View More
</button>

                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Moods Section */}
              {showMoods && (
                <div className="mt-4">
                  <h5>Your Moods:</h5>
                  <ul className="list-group">
                    {mood.length > 0 ? (
                      mood.map((item, index) => (
                        <li key={index} className="list-group-item">
                          <strong>{item.mood}</strong> - {new Date(item.date).toLocaleDateString()}
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item">No moods found</li>
                    )}
                  </ul>
                </div>
              )}
              {showNotes && (
  <div className="mt-4">
    <h5>Your Notes:</h5>
    <ul className="list-group">
      {notes.length > 0 ? (
        notes.map((item, index) => (
          <li key={index} className="list-group-item">
            <strong>{item.note}</strong> - {new Date(item.date).toLocaleDateString()}
          </li>
        ))
      ) : (
        <li className="list-group-item">No notes found</li>
      )}
    </ul>
  </div>
)}

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
