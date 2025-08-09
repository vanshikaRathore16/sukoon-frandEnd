import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../footer";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { addTofavorite } from "../favorite/favoriteMiddleware";
import EndPoint from "../apis/EndPoint";

function Posecategory() {
  const { type } = useParams();
  const [poses, setPoses] = useState([]);

  useEffect(() => {
    const fetchPose = async () => {
      try {
        const response = await axios.get(EndPoint.POSE_by_type);
        const allPose = response.data.list;
        let filterPose = [];

        if (type === "Library" || type === "pose by type") {
          filterPose = allPose;
        } else if (type === "beginners") {
          filterPose = allPose.filter(
            (p) => p.level?.toLowerCase() === "beginner"
          );
        } else if (type === "healing pose") {
          filterPose = allPose.filter((p) =>
            p.tags?.some(
              (tag) =>
                tag.toLowerCase().includes("balance") ||
                tag.toLowerCase().includes("calm")
            )
          );
        }

        setPoses(filterPose);
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    };
    fetchPose();
  }, [type]);

  // Favorite handler
  const handleAddQouerFac = async (poseId) => {
    try {
      await addTofavorite(poseId, "pose");
    
    } catch (err) {
      console.log(err);
      
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      {/* Hero Section */}
      <div
        className="hero-section position-relative text-white"
        style={{
          backgroundImage: "url('/image/PC1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <div
          className="position-absolute"
          style={{ top: "25%", left: "10%", maxWidth: "40%" }}
        >
          <h1 className="display-5 fw-bold">Start Every Day with Sukoon</h1>
          <p className="fs-5">
            Explore our built-in yoga plans designed for every mood and
            lifestyle
          </p>
        </div>

        <div
          className="position-absolute bg-dark bg-opacity-50 text-white rounded p-4 d-flex flex-column justify-content-between"
          style={{
            bottom: "40px",
            right: "40px",
            width: "350px",
            height: "180px",
          }}
        >
          <div className="text-end">
            <p className="mb-2 fw-semibold" style={{ fontSize: "1rem" }}>
              From stress to strength — follow a mindful path with ready-made
              plans
            </p>
          </div>
          <div className="text-end">
            <button className="btn btn-success px-4 py-2">Read More</button>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div
        className="container my-5"
        style={{
          backgroundColor: "#f9fcff",
          borderRadius: "25px",
          padding: "30px",
        }}
      >
        <div className="row">
          {poses.map((routine, idx) => {
            const lightColors = [
              "#f0f9ff",
              "#fef9f1",
              "#f3f4f6",
              "#f0fff4",
            ];
            const bgColor =
              lightColors[Math.floor(idx / 2) % lightColors.length];

            return (
              <div className="col-md-4 mb-4" key={routine._id}>
                <div
                  style={{
                    background: bgColor,
                    borderRadius: "20px",
                    boxShadow: "0 12px 25px rgba(0,0,0,0.08)",
                    padding: "20px",
                    height: "450px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition:
                      "transform 0.4s ease, box-shadow 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 32px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 25px rgba(0,0,0,0.08)";
                  }}
                >
                  <div
                    style={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      height: "220px",
                    }}
                  >
                    <img
                      src={`http://localhost:3000/pose/${routine.image}`}
                      alt={routine.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        transition: "transform 0.4s ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                  </div>

                  <div style={{ marginTop: "15px", flexGrow: 1 }}>
                    <h5 style={{ fontWeight: "700", color: "#333" }}>
                      {routine.name}
                    </h5>
                    <span
                      style={{
                        display: "inline-block",
                        background: "#d0f0fd",
                        color: "#005e7c",
                        fontSize: "13px",
                        fontWeight: "600",
                        padding: "5px 12px",
                        borderRadius: "30px",
                        marginTop: "8px",
                      }}
                    >
                      {routine.level}
                    </span>
                  </div>

                  <div className="mt-3 d-flex justify-content-between align-items-center">
                    <button
                      onClick={() => handleAddQouerFac(routine._id)}
                      className="btn btn-light border rounded-circle shadow-sm"
                      style={{ width: "38px", height: "38px" }}
                      title="Add to favorites"
                    >
                      ❤️
                    </button>

                    <Link
                      to={`/PoseDetail/${routine._id}`}
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#1976d2",
                        textDecoration: "none",
                      }}
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Posecategory;
