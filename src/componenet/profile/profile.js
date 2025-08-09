import React, { useState } from "react";
import axios from "axios";
import EndPoint from "../apis/EndPoint";
import { toast } from "react-toastify";
import { getCurrentUser } from "../auth/auth";
import { useNavigate } from "react-router-dom";

function Profile(){
  const navigate = useNavigate();
  const user = getCurrentUser();
  // state
  const [editMode, setEditMode] = useState(false);
  
  const [formData, setFormData] = useState({
    contact: "",
    gender: "",
    level: "",
    imageaname :  "",
  });
  // user edit profile funcation
   const handleSubmit = async(e)=>{
     if(!user){
      toast.error("user not found");
     }
     let userId = user._id;
    e.preventDefault();
    const data = new FormData();
    data.append("contact",formData.contact);
    data.append("gender", formData.gender);
    data.append("level", formData.level);
    data.append("imageaname",formData.imageaname);
    data.append("userId",userId);
    try{
        const response = await axios.put(EndPoint.UPDATE_PROFILE,data)
        setEditMode(false); 
        toast.success("profile updated");
    }catch(err){
      console.log(err);
      toast.error("something went wrong");
    }
   }
  //  handle back
   const handleBack = async(e)=>{
    navigate(-1);
   }
  

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundImage: "url('/image/PP2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        padding: "40px 0",
      }}
    >
      {/* Profile Card */}
      {!editMode ? (
        <>
          <div
            className="d-flex flex-column align-items-center p-4 mb-4"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              backdropFilter: "blur(10px)",
              width: "700px",
            }}
          >
            <img
              src={`http://localhost:3000/profile/${user.profile.imageaname}`}
              alt="profile"
              className="rounded-circle mb-3"
              style={{ width: "80px", height: "80px", objectFit: "cover", border: "3px solid white" }}
            />
            <h5 className="fw-bold text-white mb-1">{user.name}</h5>
            <p className="text-white-50 mb-3" style={{ fontSize: "0.9rem" }}>{user.email}</p>
            <hr style={{ width: "100%", borderColor: "rgba(255,255,255,0.4)" }} />
             <button className="btn btn-light w-100 rounded-pill fw-semibold" onClick={()=>{navigate("/userRoutine")}}> routine </button>
              <button className="btn btn-light w-100 rounded-pill fw-semibold" onClick={()=>{navigate("/personalPlanList")}}> personal plan </button>
               <button className="btn btn-light w-100 rounded-pill fw-semibold" onClick={()=>{navigate("/userfavoriterouter")}}> qoutes </button>
               <button className="btn btn-light w-100 rounded-pill fw-semibold" onClick={()=>{navigate("/userFavoritePose")}}>pose </button>
                <button className="btn btn-light w-100 rounded-pill fw-semibold" onClick={()=>{navigate("/moodhistory")}}>track your mood </button>
          </div>

          <div
            className="d-flex justify-content-center p-3"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(8px)",
              borderRadius: "20px",
              width: "300px",
            }}
          >
            <button className="btn btn-dark w-100 fw-bold rounded-pill" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </div>
        </>
      ) : (
        // Edit Form
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column gap-3 p-4"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            width: "400px",
          }}
          encType="multipart/form-data"
        >
          <input onChange= {(e)=>setFormData({...formData,imageaname : e.target.files[0]})} type="file"  className="form-control" />

          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={(e)=>setFormData({...formData,contact : e.target.value})}
            className="form-control"
          />

          <select name="gender" value={formData.gender} onChange={(e)=>setFormData({...formData,gender : e.target.value})} className="form-control">
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            name="level"
            placeholder="Level"
            value={formData.level}
            onChange={(e)=>setFormData({...formData,level : e.target.value})}
            className="form-control"
          />

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success rounded-pill px-4">Save</button>
            <button
              type="button"
              className="btn btn-secondary rounded-pill px-4"
              onClick={handleBack}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Profile;
