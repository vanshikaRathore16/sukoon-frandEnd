import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../footer";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import EndPoint from "../apis/EndPoint";
import { addTofavorite } from "../favorite/favoriteMiddleware";
function RoutineList(){
     
    const{tag} = useParams();
    const[routine,setRoutine] = useState([]);
    useEffect(()=>{
      const fatchdata = async()=>{
        try{
             const response = await axios.get(`${EndPoint.LIST_ROUTINE}?category=${tag}`);
              setRoutine(response.data.message);
             console.log(response.data.message);
        }catch(err){
          console.log(err);
          toast.error("something went wrong");
        }
      }
       fatchdata();
    },[tag])

     const handleAddQouerFac = async (typeId) => {
  try {
    let response = await addTofavorite(typeId, "routine");
    toast.success("added to favorite");
  } catch (err) {
    console.log(err);
   
  }
};

    return<>
     <Header/>
     {/* Hero Section */}
     <ToastContainer/>
      <div
      className="hero-section position-relative text-white"
      style={{
        backgroundImage:
        "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')", // Replace with your correct public image URL or actual image
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      {/* Top Left Text */}
      <div
        className="position-absolute"
        style={{ top: "25%", left: "10%", maxWidth: "40%" }}
      >
        <h1 className="display-5 fw-bold">Start Every Day with Sukoon</h1>
        <p className="fs-5">
          Explore our built-in yoga plans designed for every mood and lifestyle
        </p>
      </div>

      {/* Bottom Right Rectangle */}
      <div
        className="position-absolute bg-dark bg-opacity-50 text-white rounded p-4 d-flex flex-column justify-content-between"
        style={{
          bottom: "40px",
          right: "40px",
          width: "350px",
          height: "180px",
        }}
      >
        {/* Top Right Text */}
        <div className="text-end">
          <p className="mb-2 fw-semibold" style={{ fontSize: "1rem" }}>
            From stress to strength — follow a mindful path with ready-made plans
          </p>
        </div>

        {/* Bottom Right Button */}
        <div className="text-end">
          <button className="btn btn-success px-4 py-2">read more</button>
        </div>
      </div>
    </div>
  
      {/*  cartd are start */}
     <div className="container my-5">
      <div className="row">
        {routine?.map((routine, idx) => (
          <div className="col-md-4 mb-4" key={routine._id}>
            <div
              style={{
                
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                height: "420px", // Increased height
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <img
                src={routine.image ? `http://localhost:3000/pose/${routine.image}` : "/placeholder.jpg"}
                alt={routine.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <div
                style={{
                  marginTop: "12px",
                  padding: "10px",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  flexGrow: 1,
                }}
              >
                <h6 style={{ fontWeight: "600" }}>{routine.title}</h6>
                <p style={{ fontSize: "14px", marginBottom: "0" }}>{routine.description}</p>
              </div>
                 <div className="mt-3 d-flex justify-content-between align-items-center">
  <button
     
    className="btn btn-light border rounded-circle shadow-sm"
    style={{ width: "38px", height: "38px" }}
    title="Add to favorites"
    onClick={()=>handleAddQouerFac(routine._id)}
  >
    ❤️
  </button>
  <Link
    to={`/RoutinrDetail/${routine._id}`}
    style={{
      fontSize: "14px",
      fontWeight: "500",
      color: "#007bff",
      textDecoration: "none",
    }}
  >
    View Details →
  </Link>
</div>

            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
}
export default RoutineList;