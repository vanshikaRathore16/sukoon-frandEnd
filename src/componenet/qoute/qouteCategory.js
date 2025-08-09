import { useContext, useEffect, useState } from "react";
import { QouteCategorylist } from "../../App";
import { useParams } from "react-router-dom";
import { addTofavorite } from "../favorite/favoriteMiddleware";
import axios from "axios";
import EndPoint from "../apis/EndPoint";
import { toast, ToastContainer } from "react-toastify";
export default function QouteCategory(){
  let {CategoryList} = useContext(QouteCategorylist);
     const {category} = useParams();
     const [qoute,setqoute] = useState([]);
     useEffect(()=>{
      const fatchQoute = async()=>{
        try{
               const response = await axios.get(`${EndPoint.Qoute_BY_CATEGORY}?category=${category}`);
               setqoute(response.data.category);
               console.log(response.data.category);
        }catch(err){
          console.log(err);
        }
      }
      fatchQoute();
     },[category])
     

     const handleAddQouerFac = async (typeId) => {
  try {
    let response = await addTofavorite(typeId, "quote");
    toast.success("added to favorite");
  } catch (err) {
    console.log(err);
   
  }
};

    return <>
         <ToastContainer/>
        {/* Category Tabs */}
       <div
        style={{
          backgroundColor: "#111",
          color: "white",
          padding: "12px 0",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <div
          className="container d-flex flex-wrap justify-content-center gap-2"
          style={{ rowGap: "10px", columnGap: "12px" }}
        >
          {CategoryList.map((cat, i) => (
            <button
              key={i}
              className="btn btn-sm rounded-pill"
              style={{
                padding: "6px 18px",
                fontWeight: 500,
                backgroundColor: "#333",
                color: "white",
                border: "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

        {/* Quotes Section */}
       <div className="container my-5">
  <h2 className="text-center mb-4">Daily Quotes</h2>

  {qoute.length === 0 ? (
    <div className="text-center text-muted">
      <h4>No Quotes Found</h4>
    </div>
  ) : (
    <div className="row">
      {qoute.map((quote) => (
        <div key={quote._id} className="col-md-6 mb-4">
          <div className="card shadow p-4 h-100 border-0">
            <p className="mb-2 fst-italic">“{quote.text}”</p>
            <p className="text-end fw-bold">— {quote.author}</p>
            <div className="d-flex justify-content-center mt-3">
              <button onClick={()=>handleAddQouerFac(quote._id)}
                className="btn btn-outline-danger rounded-pill px-4"
                style={{ fontWeight: "bold" }}
              >
                ❤️ Favorite
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

    </>
}