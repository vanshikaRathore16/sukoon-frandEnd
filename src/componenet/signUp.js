
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import EndPoint from "./apis/EndPoint";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
function SignUp(){
      const[state,setState] = useState({
        name : "",
        email : "",
        password : "",
        role : ""
      })
      const[isLoading,setIsLoading] = useState(false);
      const handleSubmit = async(event)=>{
        try{
           event.preventDefault();
            setIsLoading(true);
           let response = await axios.post(EndPoint.SIGN_UP,state);
           toast.success(response.data.message);
           setState({
        name : "",
        email : "",
        password : "",
        role : ""
           });
        }catch(err){
            console.log(err);
            toast.error("something went wrong");
        }
         setIsLoading(false);
      }
    return<>
          <ToastContainer/>
    <div className="login-wrapper d-flex justify-content-center align-items-center vh-100">
     {isLoading ? <div className="spinner-border spinner-position"></div>: ""}
    <div className="login-card p-5 shadow rounded-lg">
        <h1 className="text-center mb-3 sukoon-title">sukoon</h1>
        <form onSubmit={handleSubmit}>
        <p className="text-center text-white mb-4">Create your Sukoon space —<br/>start your journey to peace today</p>
         <input defaultValue= {state.name} onChange = {(event)=>setState({...state,name : event.target.value})}type = "text" className="form-control mb-3" placeholder="name"></input>
        <input  defaultValue ={state.email} onChange = {(event)=>setState({...state,email : event.target.value })}type = "email" className="form-control mb-3" placeholder="email address"></input>
        <input defaultValue = {state.password} onChange = {(event)=>setState({...state, password : event.target.value})}type = "password" className="form-control mb-4" placeholder="password"></input>
         {/* <input defaultValue = {state.role} onChange = {(event)=>setState({...state, role : event.target.value})}type = "text" className="form-control mb-4" placeholder="role"></input> */}
        <button type="submit" className="btn btn-light w-100 rounded-pill mb-3">sign up</button>
         Don’t have a Calm account? <Link to = "/login" className="text-decoration-none">log in </Link>
        <p className="text-center text-white small"></p>
        </form>
    </div>
 </div>
    </>
}
export default SignUp;