// pages/RoutineList.js
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import EndPoint from "../apis/EndPoint";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/auth";

function UserRoutineList(){
     const user = getCurrentUser();
     const[state,dispatch] = useReducer((state,action)=>{
        if(action.type == "get-routine"){
           state.RoutineList = action.payload;
        }
        return{...state}
     },{
          RoutineList : []
     })

     useEffect(()=>{
        loadList();
     },[])
      console.log(user._id);
     let loadList = async()=>{
        try{
          let response = await axios.get(EndPoint.USER_ROUTINE_LIST(user._id));
          dispatch({type : "get-routine",payload : response.data.list});
        }catch(err){
            console.log(err);
        }
     }
     console.log(state.RoutineList);
  return (
       <div className="container my-5">
      <div className="row">
        {state.RoutineList?.map((routine, idx) => (
          <div className="col-md-4 mb-4" key={routine._id}>
            <div
              style={{
                
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                height: "420px", // Increased height
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <img
                src={routine.image ? `http://localhost:3000/pose/${routine.image}` : "/placeholder.jpg"}
                alt={routine.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <div
                style={{
                  marginTop: "12px",
                  padding: "10px",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  flexGrow: 1,
                }}
              >
                <h6 style={{ fontWeight: "600" }}>{routine.itemId.title}</h6>
                <p style={{ fontSize: "14px", marginBottom: "0" }}>{routine.itemId.description}</p>
              </div>
                 <div className="mt-3 d-flex justify-content-between align-items-center">
  <button
     
    className="btn btn-light border rounded-circle shadow-sm"
    style={{ width: "38px", height: "38px" }}
    title="Add to favorites"
    onClick={()=>handleAddQouerFac(routine._id)}
  >
    ❤️
  </button>
  <Link
    to={`/favoriteRoutine/${routine._id}`}
    style={{
      fontSize: "14px",
      fontWeight: "500",
      color: "#007bff",
      textDecoration: "none",
    }}
  >
    View Details →
  </Link>
</div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserRoutineList;
