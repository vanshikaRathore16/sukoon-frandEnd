import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { resolvePath } from "react-router-dom";
import EndPoint from "../apis/EndPoint";
import { getCurrentUser } from "../auth/auth";

function UserMoodHistory(){
      let user = getCurrentUser();
       const[state,dispatch] = useReducer((state,action)=>{
          if(action.type === "get-item"){
            state.list = action.payload;
          }
          return{...state}
       },{
        list : []
       })
       useEffect(()=>{
            loadData();
       },[])
    let loadData = async()=>{
        try{
           let response = await axios.get(EndPoint.USER_MOOD_HISTORY(user._id));
           console.log(response.data);
           dispatch({type : "get-item" , payload : response.data.mood_history})
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Mood History</h2>
      <div className="row">
        {state.list?.map((entry) => (
          <div className="col-md-4 mb-4" key={entry._id}>
            <div className="card h-100 border-primary">
              <div className="card-body">
                <h5 className="card-title text-capitalize">
                  Mood:{" "}
                  <span className="badge badge-primary">{entry.mood}</span>
                </h5>
                <p className="card-text">
                  <strong>Note:</strong>{" "}
                  {entry.note ? entry.note : "No note added."}
                </p>
                <p className="card-text text-muted">
                  <strong>Date:</strong>{" "}
                  {new Date(entry.date).toDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMoodHistory;
