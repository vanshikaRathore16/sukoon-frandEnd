import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import EndPoint from "../apis/EndPoint";
import axios from "axios";
import { getCurrentUser } from "../auth/auth";
import { ToastContainer,toast } from "react-toastify";
function Journal() {
    const[moods,setMoods] = useState([]);
    const [state,setState] = useState({
      mood : "",
      note : ""
    })
    const submitMood = async(event)=>{
      try{
       event.preventDefault();
       if(state.mood && state.note){
        let user = getCurrentUser();
        let moodDeayls = {...state,userId : user._id}
        let response = await axios.post(EndPoint.SUBMITMOOD,moodDeayls);
        console.log(response.data);
        toast.success("success");
       }else{
        toast.error("please enter both");
       }
      }catch(err){
        console.log(err);
         toast.error("something went wrong");
      }
    }
    useEffect(()=>{
    const fatchMoods = async()=>{
      try{
         const response  = await axios.get(EndPoint.GETMOODOPTION);
         setMoods(response.data.moods);
      }catch(error){
         console.error("Error fetching moods:", error);
      }
    }
    fatchMoods();
    },[])
  return (
  
    <>
    <ToastContainer/>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: "url('/image/MP8.png')", // ✅ Correct usage
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          padding: "4rem 1rem",
          position: "relative",
        }}
      >
        <div
          className="rounded-4 shadow-lg p-5 text-white"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            width: "100%",
            maxWidth: "700px",
            backdropFilter: "blur(5px)",
          }}
        >
          <h2 className="mb-4 fw-bold text-center" style={{ fontFamily: "cursive", fontSize: "2.2rem" }}>
            <FaCalendarAlt className="me-2" />
            Today’s Mood & Journal
          </h2>

          {/* Mood Select Dropdown */}
         <div className="mb-4">
      <label className="form-label fs-5">🌈 Select Your Mood</label>
      <select
        className="form-select form-select-lg rounded-pill"
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          color: "#333",
          fontWeight: "500",
        }}
        value={state.mood}
              onChange={(e) => setState({ ...state, mood: e.target.value })}
      >
        {moods.map((mood, index) => (
          <option key={index}>{mood}</option>
        ))}
      </select>
    </div>
         <form onSubmit={submitMood}>
          {/* Journal Input Box */}
          <div className="mb-4">
            <label className="form-label fs-5">📝 Write Your Thoughts</label>
            <textarea
              className="form-control"
              rows="6"
              placeholder="Dear diary, today was..."
              style={{
                borderRadius: "1rem",
                fontSize: "1.1rem",
                padding: "1rem",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                color: "#222",
                fontFamily: "Georgia, serif",
              }}
              value={state.note}
              onChange={(e) => setState({ ...state, note: e.target.value })}
            ></textarea>
          </div>

          {/* Let’s Start Button */}
          <div className="text-center">
            <a href="/journal/start">
              <button
              type="submit"
                className="btn px-5 py-2 rounded-pill fw-semibold fs-5"
                style={{
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                  border: "none",
                  color: "white",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = 0.9)}
                onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
              >
                Let’s Start
              </button>
            </a>
          </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Journal;
