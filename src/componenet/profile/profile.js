import React, { useState, useEffect } from "react";
import axios from "axios";
import EndPoint from "../apis/EndPoint";
import { toast, ToastContainer } from "react-toastify";
import { getCurrentUser } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    contact: user?.contact || "",
    gender: user?.gender || "",
    level: user?.level || "",
    imageaname: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        contact: user.contact || "",
        gender: user.gender || "",
        level: user.level || "",
        imageaname: null,
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("User not found");
      return;
    }

    const userId = user._id;
    const data = new FormData();
    data.append("contact", formData.contact);
    data.append("gender", formData.gender);
    data.append("level", formData.level);
    if (formData.imageaname) data.append("imageaname", formData.imageaname);
    data.append("userId", userId);

    try {
      await axios.put(EndPoint.UPDATE_PROFILE, data);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const handleBack = () => navigate(-1);

  return (
    <>
      <ToastContainer />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          backgroundColor: "#1a1a1a",
          color: "#fff",
          padding: "20px",
        }}
      >
        <aside style={{ width: "60px", padding: "20px 0", textAlign: "center" }}>
          <button style={{ background: "none", border: "none", color: "#fff", fontSize: "24px" }}>☰</button>
        </aside>
        <main style={{ flexGrow: 1, padding: "0 20px" }}>
          <h1 style={{ fontSize: "24px", marginBottom: "5px" }}>Profile</h1>
          <p style={{ color: "#888", marginBottom: "20px" }}>View all your profile details here.</p>
          <div style={{ display: "flex", background: "#222", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
            <div style={{ position: "relative" }}>
              <img
                src={`http://localhost:3000/profile/${user?.profile?.imageaname || "default.jpg"}`}
                alt="profile"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid #fff",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                }}
              />
            </div>
            <div style={{ marginLeft: "20px", flexGrow: 1 }}>
              <h2 style={{ margin: 0, fontSize: "20px" }}>
                {user?.name} <span style={{ color: "#00cc00", fontSize: "14px" }}>Premium User</span>
              </h2>
              <div style={{ marginTop: "10px" }}>
                <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>Bio & other details</h3>
                <p><strong>My Role:</strong> Beatmaker</p>
                <p><strong>My 3 Favorite Artists:</strong> Ninno, Travis Scott, Metro Boomin</p>
                <p><strong>The Software or Equipment I Use:</strong> Ableton</p>
                <p><strong>My City or Region:</strong> California, USA</p>
                <p><strong>My Experience Level:</strong> Intermediate</p>
                <p><strong>My Favorite Music Genre:</strong> Trap</p>
                <p><strong>My Preferred Music Mood:</strong> Melancholic</p>
                <p><strong>Availability:</strong> <span style={{ color: "#00cc00" }}>✔ Available for Collaboration</span></p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <span style={{ background: "#00cc00", padding: "5px 10px", borderRadius: "5px", marginRight: "10px" }}>✔ Top Collaborator</span>
              </div>
              <div style={{ marginTop: "10px" }}>
                <span style={{ background: "#333", padding: "5px 10px", borderRadius: "5px", marginRight: "10px" }}>#Drill</span>
                <span style={{ background: "#333", padding: "5px 10px", borderRadius: "5px", marginRight: "10px" }}>#Melancholic</span>
                <span style={{ background: "#333", padding: "5px 10px", borderRadius: "5px" }}>#Rap-US</span>
              </div>
            </div>
          </div>
          <div style={{ background: "#222", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>Social Media</h3>
            <div style={{ display: "flex", gap: "10px" }}>
              <a href="#"><img src="https://via.placeholder.com/30?text=YouTube" alt="YouTube" style={{ width: "30px", height: "30px" }} /></a>
              <a href="#"><img src="https://via.placeholder.com/30?text=Instagram" alt="Instagram" style={{ width: "30px", height: "30px" }} /></a>
              <a href="#"><img src="https://via.placeholder.com/30?text=TikTok" alt="TikTok" style={{ width: "30px", height: "30px" }} /></a>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <button style={{ background: "#444", border: "none", color: "#fff", width: "50px", height: "50px", borderRadius: "50%", marginLeft: "10px", cursor: "pointer" }}>↑</button>
            <button style={{ background: "#444", border: "none", color: "#fff", width: "50px", height: "50px", borderRadius: "50%", marginLeft: "10px", cursor: "pointer" }}>↓</button>
            <button style={{ background: "#444", border: "none", color: "#fff", width: "50px", height: "50px", borderRadius: "50%", marginLeft: "10px", cursor: "pointer" }}>↻</button>
          </div>
          {!editMode ? (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                style={{
                  backgroundColor: "#667eea",
                  color: "white",
                  borderRadius: "50px",
                  padding: "10px 20px",
                  margin: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/userRoutine")}
              >
                Routine
              </button>
              <button
                style={{
                  backgroundColor: "#764ba2",
                  color: "white",
                  borderRadius: "50px",
                  padding: "10px 20px",
                  margin: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/personalPlanList")}
              >
                Personal Plan
              </button>
              <button
                style={{
                  backgroundColor: "#667eea",
                  color: "white",
                  borderRadius: "50px",
                  padding: "10px 20px",
                  margin: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/userfavoriterouter")}
              >
                Quotes
              </button>
              <button
                style={{
                  backgroundColor: "#764ba2",
                  color: "white",
                  borderRadius: "50px",
                  padding: "10px 20px",
                  margin: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/userFavoritePose")}
              >
                Poses
              </button>
              <button
                style={{
                  backgroundColor: "#667eea",
                  color: "white",
                  borderRadius: "50px",
                  padding: "10px 20px",
                  margin: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/moodhistory")}
              >
                Track Your Mood
              </button>
              <button
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "1px solid #fff",
                  borderRadius: "50px",
                  padding: "10px 20px",
                  marginTop: "20px",
                  width: "100%",
                  cursor: "pointer",
                }}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                background: "#222",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                marginTop: "20px",
              }}
              encType="multipart/form-data"
            >
              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, imageaname: e.target.files[0] })
                }
                style={{ background: "#333", color: "#fff", border: "none", padding: "10px" }}
              />
              <input
                type="text"
                placeholder="Contact"
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
                className="form-control"
                style={{ background: "#333", color: "#fff", border: "none", padding: "10px" }}
              />
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="form-control"
                style={{ background: "#333", color: "#fff", border: "none", padding: "10px" }}
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                placeholder="Level"
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                className="form-control"
                style={{ background: "#333", color: "#fff", border: "none", padding: "10px" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#00cc00",
                    color: "white",
                    borderRadius: "50px",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  style={{
                    backgroundColor: "#444",
                    color: "white",
                    borderRadius: "50px",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={handleBack}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </>
  );
}

export default Profile;