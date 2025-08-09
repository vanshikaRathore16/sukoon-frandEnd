import axios from "axios";
import { useState } from "react";
import EndPoint from "../../apis/EndPoint";
import { toast, ToastContainer } from "react-toastify";

function AdminRoutine() {
    const categories = [
    "morning",
    "night",
    "desk",
    "mental peace",
    "posture reset",
    "weight loss",
    "flexibility",
    "back pain relief",
    "stress relief",
    "pre-sleep relaxation",
    "energy booster",
  ];
  const[state,setState] = useState({
    title : "",
    category : "",
    timeAvailable : "",
    level : "",
    description : ""
  });
  const handlesubmit  = async(event)=>{
    try{
    event.preventDefault();
        let response = await axios.post(EndPoint.Admin_Add_Routine,state);
        console.log(response.data);
        toast.success("data inserted");
   }catch(err){
    console.log(err);
    if(err.response && err.response.status == 404){
        toast.error("not suitable pose found")
    }else{
     
     toast.error("something went wrong");
    }
   }
  }
  return (
    <>
    <ToastContainer/>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #e0eafc, #cfdef3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <form
          onSubmit={handlesubmit}
          style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "20px",
            width: "100%",
            maxWidth: "500px",
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <h2 
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "10px",
            }}
          >
            Create New Routine
          </h2>

          <input
            onChange={(event)=>setState({...state,title : event.target.value})}
            name="title"
            placeholder="Title"
            required
            style={{
              padding: "10px 15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
             <select 
          name="category"
          required
          onChange={(event)=>setState({...state,category : event.target.value})}
          style={{
            padding: "10px 15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
          <input
            name="timeAvailable"
            placeholder="Time (in minutes)"
            required
            onChange={(event)=>setState({...state,timeAvailable : event.target.value})}
            style={{
              padding: "10px 15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />

          <select
            name="level"
            required
            onChange={(event)=>setState({...state,level : event.target.value})}
            style={{
              padding: "10px 15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "16px",
              backgroundColor: "#fff",
            }}
          >
            <option value="">Select Level</option>
            <option value="beginner">beginner</option>
            <option value="intermediate">intermediate</option>
            <option value="advanced">advanced</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            required
            onChange={(event)=>setState({...state,description : event.target.value})}
            rows="4"
            style={{
              padding: "10px 15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "16px",
              resize: "none",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#4a90e2",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#357ABD")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4a90e2")}
          >
            Create Routine
          </button>
        </form>
      </div>
    </>
  );
}

export default AdminRoutine;
