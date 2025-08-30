import React, { useState, useRef, useEffect } from "react";
import { FaHeart, FaPlay, FaPause } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import axios from "axios";
import EndPoint from "../apis/EndPoint.js"


// Categories for the sidebar
const categories = [
  "Home",
  "Meditate",
  "Sleep",
  "Music",
  "For Work",
  "Wisdom",
  "Calm Kids"
];

// Cards data
const cardsData = [
  {
    id: 1,
    title: "Contemplative Chill (Calm Mix)",
    type: "Album",
    author: "Headphone Activist",
    img: "https://via.placeholder.com/150",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "Taking Flight: A Felt Piano Duet",
    type: "Song",
    author: "Jeremy Siegel",
    img: "https://via.placeholder.com/150",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "Twilight Beach",
    type: "Song",
    author: "Tom Middleton",
    img: "https://via.placeholder.com/150",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

// AudioPlayer Component
function AudioPlayer({ currentAudio }){
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const[meditation,setMeditation] = useState([]);

  // Update time and duration
  useEffect(() => {
      const fatchData = async()=>{
        try{
            const res = await axios.get(EndPoint.GETMEDITATION);
           setMeditation(res.data.list);
        console.log(res.data);
        }catch(err){
          console.log(err);
          toast.error("something went wrong"); 
        }
      }
  }, [currentAudio]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  if (!currentAudio) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#0d2b60",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1000,
      }}
    >
      {/* Audio Info */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="https://via.placeholder.com/40"
          alt="audio"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
        <div>
          <div style={{ fontWeight: "500" }}>Now Playing</div>
          <div style={{ fontSize: "12px" }}>Your Audio</div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span>
          {Math.floor(currentTime / 60)}:
          {("0" + Math.floor(currentTime % 60)).slice(-2)}
        </span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleProgressChange}
          style={{ width: "200px" }}
        />
        <span>
          {Math.floor(duration / 60)}:{("0" + Math.floor(duration % 60)).slice(-2)}
        </span>
        <button
          onClick={togglePlay}
          style={{
            border: "none",
            background: "white",
            color: "#0d2b60",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>

      {/* Like Button */}
      <button
        style={{
          border: "none",
          backgroundColor: "red",
          color: "white",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
      >
        <FaHeart />
      </button>

      <audio ref={audioRef} src={currentAudio} />
    </div>
  );
}

// Main MusicCards Component
export default function MusicApp() {
  const [currentAudio, setCurrentAudio] = useState(null);

  const handleCardClick = (audioUrl) => {
    setCurrentAudio(audioUrl);
  };

  return (
    <div className="container-fluid" style={{ marginTop: "20px" }}>
      <div className="row">
        {/* Left Category Menu */}
        <div
          className="col-md-2"
          style={{
            backgroundColor: "#bce2a6ff",
            borderRight: "1px solid #ccc",
            minHeight: "100vh",
            paddingTop: "20px",
          }}
        >
          <ul style={{ listStyle: "none", padding: "0" }}>
            {categories.map((cat, index) => (
              <li
                key={index}
                style={{
                  padding: "10px 15px",
                  marginBottom: "10px",
                  cursor: "pointer",
                  color: "#175009ff",
                  fontWeight: "500",
                }}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Cards Section */}
        <div className="col-md-10">
          <div className="row">
            {cardsData.map((card) => (
              <div
                key={card.id}
                className="col-md-4 mb-3"
                style={{ cursor: "pointer" }}
                onClick={() => handleCardClick(card.audio)}
              >
                <div
                  className="card"
                  style={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <img
                    src={card.img}
                    className="card-img-top"
                    alt={card.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text">
                      {card.type} • {card.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Audio Player */}
      <AudioPlayer currentAudio={currentAudio} />
    </div>
  );
} 