import LogIn from "./componenet/logIn.js"
import SignUp from "./componenet/signUp.js"
import Home from "./componenet/home.js";
import PersonalPlan from "./componenet/personalPlan.js";
import BuildInRoutine from "./componenet/routine/buildInRoutine.js";
import RoutineList from "./componenet/routine/routineList.js";
import Qoute from "./componenet/qoute/qoute.js";
import Mood from "./componenet/mood/mood.js";
import SelfReflation from "./componenet/mood/seldReflcation.js";
import Pose from "./componenet/pose/pose.js";
import Profile from "./componenet/profile/profile.js";
import Metidation from "./componenet/medidation/medidation.js";
import QouteCategory from "./componenet/qoute/qouteCategory.js";
import AboutUs from "./componenet/aboutUs/aboutUs.js";
import Posecategory from "./componenet/pose/typeOdYoga.js";
import AdminDoshborad from "./componenet/admin/adminDoshborad.js";
import { createContext, useEffect, useReducer, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./index.js";
import axios from "axios";
import EndPoint from "./componenet/apis/EndPoint.js";
import AddToPose from "./componenet/admin/pose/Addpose.js";
import PoseDetail from "./componenet/pose/viewMore.js";
// import BeforeLigIn from "./componenet/begoreLogIn/beforeLigIn.js";
import AdminRoutine from "./componenet/admin/add_routine/AddRoutine.js";
import RoutineDetails from "./componenet/routine/routineDeatal.js";
import FavoritePage from "./componenet/favorite/favorite.js";
import Auth from "./componenet/auth/auth.js";
import UserRoutineList from "./componenet/routine/userRoutine.js";
import FavoriteRoutine from "./componenet/routine/favoriteRoutine.js";
import { getCurrentUser } from "./componenet/auth/auth.js";
import PersonalPlanList from "./componenet/personalPlanList.js";
import UserfavoriteQuotes from "./componenet/qoute/qouteList.js";
import UserFavoritePoses from "./componenet/pose/userFavPose.js";
import UserMoodHistory from "./componenet/mood/userMood.js";
import AdminAllFeedback from "./componenet/admin/FeedbackPageApprove/feedbackpageApprove.js";
import Article from "./componenet/article/article.js";
import MedidationUploadForm from "./componenet/admin/add_medidation/AdminMedidation.js";
import MeditationList from "./componenet/medidation/newMedidationpage.js";
import CreateArticle from "./componenet/admin/Adminarticle.js";
import ArticleDetails from "./componenet/article/artileDetails.js";
import Breathing from "./componenet/breathing/breathing.js";
import BeforeLigIn from "./componenet/beforelogin/beforelogin.js";
import SleepBL from "./componenet/beforelogin/sleepBL.js";
import StressBL from "./componenet/beforelogin/stressBeforeLog.js";
import Mindfullness from "./componenet/beforelogin/mindfullness.js"
export const QouteCategorylist = createContext();
function App(){
   const [state,dispatch] = useReducer((state,action)=>{
  if(action.type == "set-category"){
     state.CategoryList = action.payload;
  }else if(action.type == "set-favorite"){
    state.FavoriteList = action.payload;
  }
  return {...state}},{
    CategoryList: [],
    FavoriteList : []
  }
)
useEffect(()=>{
 loadQouteCategory();
},[])
const loadQouteCategory = async()=>{
  try{
    const response = await axios.get(EndPoint.QOUTE_CATEGORY);
     dispatch({type : "set-category",payload : response.data.Category});
  }catch(err){
      console.log(err);
  }
  return null;
}
//  category end here

  return<>
 
  <QouteCategorylist.Provider value={{CategoryList : state.CategoryList}}>
     
  <Router>
    <Routes>
      <Route path="/" element={<BeforeLigIn />} />
      <Route path = "/home" element = {<Home/>}/>
      <Route path = "/personalplan" element = {< PersonalPlan/>}/>
       <Route path="/routine" element={<BuildInRoutine />} />
        <Route path="/routinelist/:tag" element={<RoutineList />} />
        <Route path="/selfReflation" element={<SelfReflation />} />
        <Route path="/mood" element={<Mood/>}/>
        <Route path = "/profile" element = {<Profile/>} />
        <Route path = "/qoute" element={<Qoute />}/>
         <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path = "/pose" element={<Pose />}/>
        <Route path = "/aboutus" element = {<AboutUs/>}/>
         <Route path = "/posecategory/:type" element={<Posecategory />}/>
        <Route path = "/qoutecategory/:category" element={<QouteCategory />}/>
         <Route path = "/metidation" element={<Metidation />}/>
         <Route path = "/adminDoshboard" element = {<AdminDoshborad/>}/>
         <Route path = "/addToPose" element = {<AddToPose/>}/>
          <Route path = "/PoseDetail/:id" element = {<PoseDetail/>}/>
          <Route path =  "/adminRoutine" element = {<AdminRoutine/>}/>
          <Route path="/RoutinrDetail/:id" element = {<RoutineDetails/>} />
          <Route path = "/favorite" element = {<FavoritePage/>}/>
          <Route path = "/userRoutine" element = {<UserRoutineList/>}/>
          <Route path  = "/FavoriteRoutine/:id" element = {<FavoriteRoutine/>}/>
          <Route path = "/personalPlanList" element ={<PersonalPlanList/>}/>
          <Route path = "/userfavoriterouter" element = {<UserfavoriteQuotes/>}/>
          <Route path = "/userFavoritePose" element = {<UserFavoritePoses/>}/>
          <Route path = "/moodhistory" element = {<UserMoodHistory/>}/>
          <Route path = "/adminallfeedback" element = {<AdminAllFeedback/>}/>
          <Route path = "/article" element = {<Article/>}/>
          <Route path = "/medidationForm" element = {<MedidationUploadForm/>}/>
          <Route path = "/GETMEDITATION" element = {<MeditationList/>}/>
          <Route path="/createArticle" element = {<CreateArticle/>}/>
          <Route path = "/articleDetail/:id" element ={<ArticleDetails/>}/>
          <Route path ="/breathing" element = {<Breathing/>}/>
          <Route path = "/sleep"  element = {<SleepBL/>}/>
          <Route path = "/Stress" element = {<StressBL/>}/>
          <Route path = "/mindfullness" element = {<Mindfullness/>}/>
          
    </Routes>
  </Router>
  
  </QouteCategorylist.Provider>
  
  </>
}
export default App