import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const isUserExit  = ()=>{
    return !!sessionStorage.getItem("current_user");
}
export const getCurrentUser = ()=>{
    let user = sessionStorage.getItem("current_user");
    user = JSON.parse(user);
    return user;
}
function Auth({children}){
    const {user,isLoggedIn} = useSelector((store)=>store.User);
    if(isLoggedIn)
        return children;
    return <Navigate to="/"/>
      
}
export default Auth;