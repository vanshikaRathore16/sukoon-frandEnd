import React, { act, useEffect, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import axios from "axios";
import EndPoint from "../apis/EndPoint";
import { getCurrentUser } from "../auth/auth";
import { resolvePath } from "react-router-dom";
const UserFavoritePose = () => {
     let user = getCurrentUser();
      const [state,dispatch] = useReducer((state,action)=>{
        if (action.type === "get-list") {
    return { ...state, list: action.payload };
}
return state;
      } ,{
        list : []
      })

      useEffect(()=>{
        loadData();
      },[]);
    let loadData = async()=>{
        try{
           let response = await axios.get(EndPoint.USER_FAV_POSE(user._id))
           console.log(response.data);
           dispatch({type : "get-list" , payload : response.data.list});
        }catch(err){
            console.log(err);
            toast.error("something went wrong")
        }
    }

  return (
     <div className="container mt-5">
      <h2 className="text-center mb-4">Your Favorite Yoga Poses</h2>
      <div className="row">
        {state.list?.map((pose) => (
          <div className="col-md-6 mb-4" key={pose._id}>
            <div
              className="card shadow"
              style={{ borderRadius: "10px", overflow: "hidden" }}
            >
              <img
                src={`http://localhost:3000/pose/${pose.itemId?.image}`}
                className="card-img-top"
                alt={pose.itemId?.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body" style={{ padding: "20px" }}>
                <h5 className="card-title" style={{ fontWeight: "bold" }}>
                  {pose.itemId?.name}
                </h5>
                <p className="card-text" style={{ marginBottom: "10px" }}>
                  <strong>Instructions:</strong> {pose.itemId?.instructions}
                </p>
                <p className="card-text" style={{ marginBottom: "10px" }}>
                  <strong>Level:</strong>{" "}
                  <span className="badge bg-info text-dark">{pose.itemId?.level}</span>
                </p>
                <p className="card-text" style={{ marginBottom: "10px" }}>
                  <strong>Duration:</strong> {pose.itemId?.duration} minutes
                </p>
                {pose.itemId?.tags.length > 0 && (
                  <p className="card-text">
                    <strong>Tags:</strong>{" "}
                    {pose.itemId?.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="badge bg-secondary me-1"
                        style={{ fontSize: "12px" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserFavoritePose;
