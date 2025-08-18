import { useEffect, useState, useRef } from "react";
import axios from "axios";
import EndPoint from "../apis/EndPoint";
import {
  FaHome,
  FaMoon,
  FaMusic,
  FaLightbulb,
  FaCoffee,
  FaChild,
  FaCircle
} from "react-icons/fa";

function MeditationList() {
  const [meditations, setMeditations] = useState([]);
  const[filterItem,setFilterItem] = useState([]);
  const [filteredMeditations, setFilteredMeditations] = useState([]);
  const [currentMeditation, setCurrentMeditation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories,setCategories] = useState([]);
  const audioRef = useRef(null); 

  
  useEffect(()=>{
       const fatchData = async()=>{
        try{
           const response = await axios.get(EndPoint.MEDIDATION_CATEGORY_LIST);
           console.log(response.data);
           setCategories(response.data.list);
           console.log("setcatory daat"+categories);
        }catch(err){
          console.log(err);
        }
       }
       fatchData();
  },[])

  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const res = await axios.get(EndPoint.GETMEDITATION);
        setMeditations(res.data.list);
        setFilteredMeditations(res.data.list);
        setFilterItem(res.data.list);
      } catch (err) {
        console.error("Error fetching meditations", err);
      }
    };
    fetchMeditations();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = meditations.filter(
      (m) =>
        m.title.toLowerCase().includes(value) ||
        m.description.toLowerCase().includes(value)
    );
    setFilteredMeditations(filtered);
  };

   const handleCategoryClick = (cat) =>{
       const filter = meditations.filter(item =>
    item.type.some(t => t.toLowerCase() === cat.toLowerCase())
  );
      setFilterItem(filter);
   }

    //   related to aodio player
  const playMeditation = (meditation) => {
    setCurrentMeditation(meditation);
    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 100);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Left Sidebar: Categories */}
      <div
        style={{
          backgroundColor: "rgba(129, 187, 129, 1)",
          width: "300px",
          height: "100vh",
          position: "sticky",
          top: 0,
          overflowY: "auto",
          alignItems : "center"
        }}
      >
        <ul style={{ listStyle: "none", padding: 0,alignItems : "center" }}>
          {categories.map((cat) => (
            <li
              key={cat}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                color: "#fff",
                transition: "all 0.3s",
                 alignItems: "center", // vertical center
          justifyContent: "center", // horizontal center
              }}
              onClick={()=>{handleCategoryClick(cat)}}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = cat.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span>{cat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Meditation Grid Section */}
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Search meditations..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              width: "350px",
              padding: "12px 15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          <button
            style={{
              padding: "12px 20px",
              marginLeft: "10px",
              background: "#4fc3f7",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            🔍 Search
          </button>
        </div>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          All Saved Meditations
        </h2>

        {filterItem.length === 0 ? (
          <p style={{ textAlign: "center" }}>No meditations found.</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {filterItem.map((m) => (
              <div
                key={m._id}
                onClick={() => playMeditation(m)}
                style={{
                  flex: "0 0 calc(25% - 15px)",
                  width: "240px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  background: "transparent",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 28px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.3)";
                }}
              >
                <div style={{ position: "relative", height: "220px" }}>
                  <img
                    src={m.imageURL}
                    alt={m.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                  {m.duration && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "rgba(0,0,0,0.6)",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        color: "#fff",
                      }}
                    >
                      {m.duration} min
                    </div>
                  )}
                  {m.locked && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        background: "rgba(0,0,0,0.6)",
                        padding: "5px",
                        borderRadius: "50%",
                        color: "#fff",
                      }}
                    >
                      🔒
                    </div>
                  )}
                </div>

                <div style={{ padding: "10px" }}>
                  <h4 style={{ margin: "5px 0", fontWeight: "500" }}>
                    {m.title}
                  </h4>
                  <p style={{ fontSize: "14px", color: "#111010ff" }}>
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Custom Audio Player */}
      {currentMeditation && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "#0f1a25",
            color: "#fff",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          <img
            src={currentMeditation.imageURL}
            alt={currentMeditation.title}
            style={{ width: "50px", height: "50px", borderRadius: "8px" }}
          />

          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "bold" }}>
              {currentMeditation.title}
            </div>
            <div style={{ fontSize: "12px", color: "#ccc" }}>
              {currentMeditation.description}
            </div>

            <div
              onClick={handleSeek}
              style={{
                height: "5px",
                background: "#333",
                marginTop: "5px",
                borderRadius: "2px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "#4fc3f7",
                  borderRadius: "2px",
                }}
              />
            </div>
          </div>

          <button
            onClick={togglePlay}
            style={{
              border: "none",
              background: "none",
              color: "#fff",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>

          <button
            style={{
              border: "none",
              background: "none",
              color: "red",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ❤️
          </button>

          <audio
            ref={audioRef}
            src={currentMeditation.audioURL}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            style={{ display: "none" }}
          />
        </div>
      )}
    </div>
  );
}

export default MeditationList;
