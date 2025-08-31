import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import EndPoint from '../apis/EndPoint';
import { getCurrentUser } from '../auth/auth';
import { toast, ToastContainer } from 'react-toastify';
import Header from "../Header.js";

function SelfReflection() {
  const [mood, setMood] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [noteContent, setNoteContent] = useState('');

  // Emoji mapping for moods
  const moodEmojiMap = {
    stressed: '😓',
    tired: '😴',
    energized: '⚡',
    'back pain': '😣',
    calm: '😊',
    neutral: '😐',
    anxious: '😰',
    content: '😊👍',
    overwhelmed: '😫',
    restless: '😣',
    inspired: '💡',
    achy: '🤕',
    relaxed: '😌',
    irritable: '😣',
    motivated: '💪',
    drained: '🥱',
    hopeful: '🌈',
    sore: '😖',
    focused: '🎯',
    lonely: '😔'
  };

  let user = getCurrentUser();
  let user_id = user._id;

  // fetch moods from backend
  useEffect(() => {
    fetchMoodList();
  }, []);

  const fetchMoodList = async () => {
    try {
      let response = await axios.get(EndPoint.GETMOODOPTION);
      setMood(response.data.moods);
    } catch (err) {
      console.log(err);
    }
  };

  // submit mood
  const handleSubmit = async () => {
    if (!selectedMood) {
      toast.warn("Please select a mood first!");
      return;
    }
    try {
      let response = await axios.post(EndPoint.SUBMITMOOD, {
        mood: selectedMood,
        userId: user_id,
      });
      toast.success(response.data.message || "Mood added");
      setActiveSection(null);
      setSelectedMood(null);
    } catch (err) {
      console.log(err);
      toast.error("Failed to submit mood");
    }
  };

  // submit note function
  const handleNoteSubmit = async () => {
    if (!noteContent.trim()) {
      toast.warn("Please write something before saving!");
      return;
    }

    try {
      let response = await axios.post(EndPoint.SUBMITNOTE, {
        note: noteContent,
        userId: user_id,
      });

      toast.success(response.data.message || "Note saved successfully");
      setActiveSection(null);
      setNoteContent("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit note");
    }
  };

  const handleBack = () => {
    setActiveSection(null);
    setNoteContent('');
  };

  const handleCancel = () => {
    setActiveSection(null);
    setNoteContent('');
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div
        className="container-fluid py-5"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #9da9b4ff, #d8e5e9ff)",
          color: "white",
        }}
      >
        <h2
          className="text-center mb-5 fw-bold"
          style={{ color: 'white', fontSize: '2.25rem', letterSpacing: '0.5px' }}
        >
          Self Reflection
        </h2>

        {activeSection === null ? (
          // --- Home Cards ---
          <div className="row g-4 justify-content-center">
            {/* Card 1 */}
            <div className="col-md-5 col-10">
              <div
                className="card shadow-lg"
                style={{
                  borderRadius: '15px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  backgroundColor: '#003366',
                }}
                onClick={() => setActiveSection('mood')}
              >
                <img
                  src="https://media.istockphoto.com/id/1433282948/photo/woman-hands-holding-sad-face-hiding-or-behind-happy-smiley-face-bipolar-and-depression-mental.webp?a=1&b=1&s=612x612&w=0&k=20&c=nLBufZdtRYdM8bpN0_cj5rD70vVu7bwwDbzN5zvZcXc="
                  alt="How You Feeling Today"
                  className="card-img-top"
                  style={{
                    height: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '15px',
                    borderTopRightRadius: '15px',
                  }}
                />
                <div className="card-body text-center">
                  <h4 className="card-title fw-bold" style={{ color: 'white' }}>
                    How You Feeling Today
                  </h4>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-5 col-10">
              <div
                className="card shadow-lg"
                style={{
                  borderRadius: '15px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  backgroundColor: '#003366',
                }}
                onClick={() => setActiveSection('notebook')}
              >
                <img
                  src="https://media.istockphoto.com/id/1080259016/photo/writing-in-notebook-close-up.webp?a=1&b=1&s=612x612&w=0&k=20&c=4FgqLJC4joZnkH27TCXTeb3DRmtJ07e4CNalxXPrq_w="
                  alt="Write Your Thoughts"
                  className="card-img-top"
                  style={{
                    height: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '15px',
                    borderTopRightRadius: '15px',
                  }}
                />
                <div className="card-body text-center">
                  <h4 className="card-title fw-bold" style={{ color: 'white' }}>
                    Write Your Thoughts
                  </h4>
                </div>
              </div>
            </div>
          </div>
        ) : activeSection === 'mood' ? (
          // --- Mood Section ---
          <div className="w-100 px-3" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold" style={{ color: '#003366' }}>
                Select Your Mood
              </h3>
              <button className="btn btn-dark" onClick={handleBack}>
                Back
              </button>
            </div>

            <div className="row g-3 justify-content-center">
              {mood.map((m, index) => (
                <div key={index} className="col-6 col-sm-3 col-lg-2">
                  <div
                    className="card text-center"
                    style={{
                      backgroundColor: selectedMood === m ? '#cce5ff' : '#fff',
                      borderRadius: '10px',
                      padding: '1.5rem',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedMood(m)}
                  >
                    <span style={{ fontSize: '2rem', color: '#003366' }}>
                      {moodEmojiMap[m] || m}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {selectedMood && (
              <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-success" onClick={handleSubmit}>
                  Submit Mood
                </button>
              </div>
            )}
          </div>
        ) : (
          // --- Notebook Section ---
          <div className="w-100 px-3" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold" style={{ color: '#003366' }}>
                Reflect on Your Day
              </h3>
              <button className="btn btn-dark" onClick={handleBack}>
                Back
              </button>
            </div>

            <div
              className="p-4"
              style={{
                backgroundColor: '#fff5e6',
                borderRadius: '15px',
                minHeight: '400px',
                position: 'relative',
              }}
            >
              <textarea
                className="form-control"
                placeholder="Write about your day..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                style={{ minHeight: '300px' }}
              ></textarea>

              <div className="d-flex justify-content-end gap-2 mt-3">
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleNoteSubmit}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* fade-in animation */}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </div>
    </>
  );
}

export default SelfReflection;