// FavoriteQuotes.js
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import EndPoint from "../apis/EndPoint";
import { getCurrentUser } from "../auth/auth";
import { toast, ToastContainer } from "react-toastify";
function UserfavoriteQuotes(){
      let user = getCurrentUser();
      const [state,dispatch] = useReducer((state,action)=>{
        if(action.type == "get-item"){
            state.list = action.payload;
        }
        return{...state}
      },{
        list : []
      })

      useEffect(()=>{
        loaddata();
      },[]);
      
      const loaddata = async()=>{
        try{
            let response = await axios.get(EndPoint.USER_QOUTE_LIST(user._id));
            console.log(response.data);
            dispatch({type : "get-item",payload : response.data.list});
        }catch(err){
            console.log(err);
        }
      }

      const handleDelete = async(qouteId)=>{
        try{
          let response =await axios.delete(EndPoint.DELETE_FAV_QOUTE(user._id),{
            data :{
              itemType : "quote",
              itemId : qouteId
            }
          })
          toast.success("item removed");
        }catch(err){
          console.log(err);
          toast.error("something went wrong");
        }
      }
     return<>
     <ToastContainer/>
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>Your Favorite Quotes</h2>
      <div style={{ display: "grid", gap: "1rem" }}>
        {state.list.map((quote) => (
          <div
            key={quote._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "1rem",
              backgroundColor: "#f9f9f9"
            }}
          >
            <p style={{ fontSize: "1.2rem", fontStyle: "italic" }}>
              “{quote.itemId?.text}”
            </p>
            <p style={{ fontWeight: "bold" }}>— {quote.itemId?.author}</p>
            <p>
              <strong>Mood:</strong> {quote.itemId?.mood}
            </p>
            <p>
              <strong>Category:</strong> {quote.itemId?.category}
            </p>
            <p>
              {quote.itemId?.tags?.join(", ")}
            </p>
            <button
            onClick={()=>handleDelete(quote.itemId._id)}
              style={{
      
                marginTop: "10px",
                padding: "0.5rem 1rem",
                backgroundColor: "tomato",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
     </>
}

export default UserfavoriteQuotes;
