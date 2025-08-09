import { createContext,useState,useEffect } from "react";
import axios from "axios";
import EndPoint from "../apis/EndPoint";
export const Qoutecontext = createContext();


export const Qouteprovider = ({children})=>{
const[rondomQoute,setRondomQoute] = useState([])     
useEffect(()=>{
   const fatchData = async()=>{
      try{
     let response = await axios.get(EndPoint.RONDOM_QOUTE);
      setRondomQoute(response.data);
     console.log("Full API Response:", response.data);
    console.log("Quote data:", response.data);

   }catch(err){
    console.log(err);
   }
   }
   fatchData();
},[])
console.log("rondom qoute  state " , rondomQoute)
return(
    <Qoutecontext.Provider value={{rondomQoute}}>
        {children}
    </Qoutecontext.Provider>
)
}
