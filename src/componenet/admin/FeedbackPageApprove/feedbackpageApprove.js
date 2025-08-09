// pages/AllFeedback.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import EndPoint from "../../apis/EndPoint";
export default function AdminAllFeedback() {
      const[state,setState] = useState([]);
      const fatchdata = async()=>{
        try{
            let response = await axios.get(EndPoint.ADMIN_FEEDBACK_LIST);
            setState(response.data);
        }catch(err){
            console.log(err);
            toast.error("something went wrong");
        }
      }

      useEffect(()=>{
        fatchdata()
      },[])

      const approveFeedBack = async(id)=>{
        try{
            let responce = await axios.patch(EndPoint.APPROVE_FEEDBACK(id));
            fatchdata();
            toast.success("apporved");
        }catch(err){
            console.log(err);
            toast.error("somethinf went wrong");
        }
      }
      
  return <>
    <ToastContainer/>
    <div className="container mt-4">
      <h2 className="mb-4 text-center">All Feedback</h2>
      <div className="row">
        {state.list?.map((item) => (
          <div className="col-md-4 mb-3" key={item._id}>
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="text-warning mb-1">
                  {"⭐".repeat(item.rating)}
                </p>
                <p className="card-text">{item.feedback}</p>
                <small className="text-muted">Date: {item.date}</small>
                 <div className="mt-3">
                    {item.isApprove ? (<span className="badge bg-success">approves</span>) :
                     (<button className="btn btn-primary" onClick={()=>approveFeedBack(item._id)}>approve</button>)}
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
}
