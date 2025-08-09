import axios from "axios";
import React, { useEffect,  useReducer } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EndPoint from "../apis/EndPoint";
import "bootstrap/dist/css/bootstrap.min.css";
const FavoriteRoutine = () => {
  const {id} = useParams();
         const[state,dispatch] = useReducer((state,action)=>{
                if(action.type == "get-routine"){
                   state.RoutineList = action.payload;
                }
                return{...state}
             },{
                  RoutineList : {}
             })
              let loadList = async()=>{
                try{
                  let response = await axios.get(EndPoint.FAVORITE_BY_ID(id));
                  dispatch({type : "get-routine",payload : response.data.favorite});
                }catch(err){
                    console.log(err);
                }
             }
             useEffect(()=>{
                loadList();
                 console.log(state.RoutineList.itemId)
             },[])
             console.log("RoutineList Data:", state.RoutineList);

  return (
    <div style={{
      background: "linear-gradient(to bottom right, #f0f4ff, #e6f7ff)",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div className="container py-5">
        <div className="bg-white rounded-5 shadow p-5 mb-5 border border-primary-subtle">
          <h1 className="display-4 fw-bold text-center text-gradient mb-4" style={{
            background: "linear-gradient(to right, #007bff, #00c6ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            {state.RoutineList.itemId?.title  || "Loading..."}
          </h1>

          <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
            <span className="badge bg-secondary fs-6 px-3 py-2 shadow">{state.RoutineList.itemId?.category}</span>
            <span className="badge bg-info text-dark fs-6 px-3 py-2 shadow">{state.RoutineList.itemId?.level}</span>
            <span className="badge bg-success fs-6 px-3 py-2 shadow">{state.RoutineList.itemId?.timeAvailable}</span>
          </div>

          <div className="mb-5 px-4 py-3" style={{
            backgroundColor: "#f9f9fb",
            borderLeft: "5px solid #00c6ff",
            borderRadius: "12px",
            color: "#555"
          }}>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
              {state.RoutineList.itemId?.description || "No description available."}
            </p>
          </div>

          <h2 className="h3 text-center mb-4" style={{
            color: "#004085",
            fontWeight: "600",
            letterSpacing: "1px"
          }}>🧘 Yoga Poses Included</h2>

          {state.RoutineList.itemId?.poseId?.length > 0 ? (
            <div className="row g-4">
              {state.RoutineList.itemId?.poseId?.map((pose, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden">
                    <img
                      src={pose.image ? `http://localhost:3000/pose/${pose.image}` : "/placeholder.jpg"}
                      alt={pose.name}
                      className="card-img-top"
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                    <div className="card-body p-4">
                      <h5 className="card-title text-primary fw-bold">{pose.name}</h5>
                      <p className="card-text mb-2"><strong>📝 Instructions:</strong> {pose.instructions}</p>
                      <p className="card-text mb-2"><strong>📈 Level:</strong> {pose.level}</p>
                      <p className="card-text mb-2"><strong>⏱ Duration:</strong> {pose.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-center mt-4">No poses available for this routine.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteRoutine;
