import axios, { toFormData } from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import EndPoint from "./apis/EndPoint";
import { getCurrentUser } from "./auth/auth";

function PersonalPlan(){
    const [state,setState]= useState({
        mood : "",
        level : "",
        timeAvailbe : ""
    })
    
    const handlesubmit = async(e) =>{
      e.preventDefault();
      try{
        const user = getCurrentUser();
        if (!user) {
        toast.error("User not found. Please login again.");
        return;
    }
        const userId = user._id;
         let response = await axios.post(EndPoint.CREATE_PERSONAL_PLANE,{...state,userId});
         console.log(response.data);
         toast.success("your personl plan create");
      }catch(err){
        console.log(err);
         if (err.response && err.response.status === 409) {
      toast.error("You already created a plan for today!");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
      }
    }
    return <>
    <ToastContainer/>
      <div className="main-wrapper d-flex justify-content-center align-items-center vh-100">
  <div className="form-box p-5 rounded-4">
    <h2 className="text-white fw-bold mb-2">create your personal plan</h2>
    <p className="text-white mb-4">
      Your energy, your pace, your flow — personalized just for you.
    </p>
    <form onSubmit={handlesubmit}>
      <div className="mb-3">
        <select
          onChange={(e) => setState({ ...state, mood: e.target.value })}
          className="form-control rounded-pill"
        >
          <option value="">Select your mood</option>
          <option value="stressed">Stressed</option>
          <option value="tired">Tired</option>
          <option value="sad">Sad</option>
          <option value="energetic">Energetic</option>
        </select>
      </div>

      <div className="mb-3">
        <select
          onChange={(e) => setState({ ...state, level: e.target.value })}
          className="form-control rounded-pill"
        >
          <option value="">Select your level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="mb-3">
        <select
          onChange={(e) => setState({ ...state, timeAvailbe: e.target.value })}
          className="form-control rounded-pill"
        >
          <option value="">Select time available</option>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">1 hour</option>
        </select>
      </div>

      <button type="submit" className="btn btn-light px-6">
        submit
      </button>
    </form>
  </div>
</div>

    </>
}
export default PersonalPlan;
