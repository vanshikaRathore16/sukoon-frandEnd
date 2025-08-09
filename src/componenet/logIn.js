import axios from "axios";
import { useState } from "react";
import {Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import EndPoint from "./apis/EndPoint";
import { useNavigate } from "react-router-dom";
function LogIn(){
       const navigate = useNavigate();
       const[state,setState] = useState({
        email : "",
        password : ""
       })
       const handleSubmit = async(event)=>{
        try{
           event.preventDefault();
           if(state.email && state.password){
          let response = await axios.post(EndPoint.SiGN_IN,state);
          console.log("response.data:", response.data);
          sessionStorage.setItem("current_user",JSON.stringify(response.data.message));
            toast.success("sign in succesfully");
            if(response.data.message.role === "admin"){
                navigate("/adminDoshboard");
            }else{
                navigate("/home");
            }
           }else{
            toast.error("please enter valid email and password");
           }
     }catch(err){
            console.log(err);
            toast.error("something went wrong");
        }
       }
 return<>
 <ToastContainer/>
 <div className="login-wrapper d-flex justify-content-center align-items-center vh-100">
    <div className="login-card p-5 shadow rounded-lg">
        <h1 className="text-center mb-3 sukoon-title">sukoon</h1>
        <p className="text-center text-white mb-4">Return to your inner peace <br/>log in to Sukoon</p>
        <form onSubmit={handleSubmit}>
        <input onChange = {(event)=>setState({...state,email : event.target.value})}type = "email" className="form-control mb-3" placeholder="email address"></input>
        <input  onChange={(event)=>setState({...state,password : event.target.value})}   type = "password" className="form-control mb-4" placeholder="password"></input>
        <button  type = "submit"className="btn btn-light w-100 rounded-pill mb-3">continue</button>
         Don’t have a Calm account? <Link  to = "/signup" className="text-decoration-none">Sign up</Link>
        <p className="text-center text-white small"></p>
        </form>
    </div>
 </div>
 </>

}
export default LogIn;
