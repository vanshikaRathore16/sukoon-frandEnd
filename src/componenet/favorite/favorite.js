import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import EndPoint from "../apis/EndPoint";
import { getCurrentUser } from "../auth/auth";

const FavoritePage = () => {
  const user = getCurrentUser();
  let userId = user._id;
  const [state,dispatch] = useReducer((state,action)=>{
     if(action.type == "set-fav"){
        state.FavoriteList = action.payload;
    }
     return{...state}
},{
  FavoriteList : []
})

useEffect(()=>{
    loadFavoriteList();
},[])

    const loadFavoriteList = async()=>{
      try{
         let response = await axios.get(EndPoint.LIST_FAVORITE(userId));
         dispatch({type : "set-fav",payload : response.data.favorites});
      }catch(err){
        console.log(err);
      }
      return null;
    }
  return (
    <div className="container mt-4">
      <h3 className="mb-4">🌟 Your Favorites</h3>

      {/* Filter Buttons */}
      <div className="mb-4 d-flex flex-wrap gap-2">
        <button className="btn btn-primary btn-sm">All</button>
        <button className="btn btn-outline-primary btn-sm">Pose</button>
        <button className="btn btn-outline-primary btn-sm">Quote</button>
        <button className="btn btn-outline-primary btn-sm">Routine</button>
        <button className="btn btn-outline-primary btn-sm">Meditation</button>
      </div>

      {/* Cards Grid */}
      <div className="row">
        {state.FavoriteList?.map((fav) => (
          <div key={fav.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              {/* Show image only if exists */}
               {fav.itemType === "quote" && (
                <>
                 <h3>{fav.test}</h3>
                 <h3>{fav.author}</h3>
                </>
               )}
               {fav.itemType === "pose" && (
                <>
                <h3>{fav.name}</h3>
                <p>{fav.instructions}</p>
                <p>{fav.level}</p>
                <p>{fav.duration}</p>
                </>
               )}
               {fav.itemType === "routine" && (
                 <>
                 <h3>{fav.title}</h3>
                 <p>{fav.category}</p>
                 </>
               )} 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;
