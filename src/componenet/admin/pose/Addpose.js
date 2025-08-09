import axios from "axios";
import { useState } from "react";
import EndPoint from "../../apis/EndPoint";
import { ToastContainer,toast } from "react-toastify";
function AddToPose(){
    const[state,setState]= useState({
        name : "",
        instructions:"",
        tags : "",
        level :"",
        duration : "",
        image : ""
    });
     const handleSubmit = async(e)=>{
        e.preventDefault();
        const data = new FormData();
        data.append("name", state.name);
      data.append("instructions", state.instructions);
    //  data.append("tags", Array.isArray(state.tags) ? state.tags.join(",") : state.tags); 
        data.append("tags", JSON.stringify(state.tags)); 
     data.append("level", state.level);
    data.append("duration", state.duration);
     data.append("image", state.image);
      try{
         let response = await axios.post(EndPoint.ADD_POSE,data);
        //  console.log(response.data);
         toast.success("pose added");
      }catch(err){
        console.log(err);
        alert("failed to add pose");
      }

    }
    return<>
        <ToastContainer/>
        <div className="container mt-4" style={{ maxWidth: '700px', padding: '20px', backgroundColor: '#f4fff7', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h3 className="text-center mb-4" style={{ color: '#28a745' }}>Add New Pose</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Pose Name</label>
          <input  onChange={(e) => setState({ ...state, name: e.target.value })} name =  "name" type="text" className="form-control" placeholder="e.g., Tree Pose" />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input onChange={(e) => setState({ ...state, image: e.target.files[0] })} name = "image" type="file" className="form-control" placeholder="https://image-link.com" />
        </div>

        <div className="mb-3">
          <label className="form-label">Instructions</label>
          <textarea onChange={(e) => setState({ ...state, instructions: e.target.value })}  name = "instructions" rows="4" className="form-control"  placeholder="Step-by-step instructions..."></textarea>
        </div>
         <input type="text" name="tags" className="form-control" value={Array.isArray(state.tags) ? state.tags.join(",") : state.tags}
  onChange={(e) => setState({ ...state, tags: e.target.value.split(",") })} placeholder="enter tags"/>

        <div className="mb-3">
          <label className="form-label">Level</label>
          <select 
          className="form-select" name = "level" onClick={(e)=>setState({...state,level : e.target.value})}>
            <option value="" disabled>Select a level</option>
            <option>beginner</option>
            <option>intermediate</option>
            <option>advanced</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Duration (in seconds)</label>
          <input  onChange={(e) => setState({ ...state, duration: e.target.value })} name = "duration"type="number" className="form-control" placeholder="e.g., 30" min="5" max="600" />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success" style={{ padding: '10px 30px' }}>Add Pose</button>
        </div>
      </form>
    </div>
</>
}
export default AddToPose;