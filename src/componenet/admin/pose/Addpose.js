import axios from "axios";
import { useState } from "react";
import EndPoint from "../../apis/EndPoint";
import { ToastContainer, toast } from "react-toastify";

function AddToPose() {
  const [state, setState] = useState({
    name: "",
    sanskritName: "",
    instructions: "",
    steps: "",
    preparation: "",
    benefits: "",
    contraindications: "",
    focusAreas: "",
    caloriesBurned: "",
    tags: "",
    level: "",
    duration: "",
    difficultyScore: "",
    image: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Basic fields
    data.append("name", state.name);
    data.append("sanskritName", state.sanskritName);
    data.append("instructions", state.instructions);
    data.append("level", state.level);
    data.append("duration", state.duration);
    data.append("difficultyScore", state.difficultyScore);
    data.append("caloriesBurned", state.caloriesBurned);

    // Arrays (convert string to array)
    data.append("tags", JSON.stringify(state.tags.split(",").map(t => t.trim())));
    data.append("steps", JSON.stringify(state.steps.split(",").map(s => s.trim())));
    data.append("benefits", JSON.stringify(state.benefits.split(",").map(b => b.trim())));
    data.append("contraindications", JSON.stringify(state.contraindications.split(",").map(c => c.trim())));
    data.append("focusAreas", JSON.stringify(state.focusAreas.split(",").map(f => f.trim())));

    // Other fields
    data.append("preparation", state.preparation);

    // Image file
    if (state.image) {
      data.append("image", state.image);
    }

    try {
      await axios.post(EndPoint.ADD_POSE, data);
      toast.success("Pose added successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add pose");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mt-4" style={{ maxWidth: "700px", padding: "20px", backgroundColor: "#f4fff7", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <h3 className="text-center mb-4" style={{ color: "#28a745" }}>Add New Pose</h3>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Pose Name</label>
            <input onChange={(e) => setState({ ...state, name: e.target.value })} type="text" className="form-control" placeholder="e.g., Tree Pose" />
          </div>

          {/* Sanskrit Name */}
          <div className="mb-3">
            <label className="form-label">Sanskrit Name</label>
            <input onChange={(e) => setState({ ...state, sanskritName: e.target.value })} type="text" className="form-control" placeholder="e.g., Vrikshasana" />
          </div>

          {/* Image */}
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input onChange={(e) => setState({ ...state, image: e.target.files[0] })} type="file" className="form-control" />
          </div>

          {/* Instructions */}
          <div className="mb-3">
            <label className="form-label">Instructions</label>
            <textarea onChange={(e) => setState({ ...state, instructions: e.target.value })} rows="4" className="form-control" placeholder="Step-by-step instructions..."></textarea>
          </div>

          {/* Steps */}
          <div className="mb-3">
            <label className="form-label">Steps (comma separated)</label>
            <input onChange={(e) => setState({ ...state, steps: e.target.value })} type="text" className="form-control" placeholder="Step 1, Step 2, Step 3" />
          </div>

          {/* Preparation */}
          <div className="mb-3">
            <label className="form-label">Preparation</label>
            <input onChange={(e) => setState({ ...state, preparation: e.target.value })} type="text" className="form-control" placeholder="Warm-up required..." />
          </div>

          {/* Benefits */}
          <div className="mb-3">
            <label className="form-label">Benefits (comma separated)</label>
            <input onChange={(e) => setState({ ...state, benefits: e.target.value })} type="text" className="form-control" placeholder="Benefit 1, Benefit 2" />
          </div>

          {/* Contraindications */}
          <div className="mb-3">
            <label className="form-label">Contraindications (comma separated)</label>
            <input onChange={(e) => setState({ ...state, contraindications: e.target.value })} type="text" className="form-control" placeholder="Avoid if..." />
          </div>

          {/* Focus Areas */}
          <div className="mb-3">
            <label className="form-label">Focus Areas (comma separated)</label>
            <input onChange={(e) => setState({ ...state, focusAreas: e.target.value })} type="text" className="form-control" placeholder="Legs, Core, Back" />
          </div>

          {/* Calories Burned */}
          <div className="mb-3">
            <label className="form-label">Calories Burned</label>
            <input onChange={(e) => setState({ ...state, caloriesBurned: e.target.value })} type="number" className="form-control" />
          </div>

          {/* Tags */}
          <div className="mb-3">
            <label className="form-label">Tags (comma separated)</label>
            <input onChange={(e) => setState({ ...state, tags: e.target.value })} type="text" className="form-control" placeholder="yoga, relaxation" />
          </div>

          {/* Level */}
          <div className="mb-3">
            <label className="form-label">Level</label>
            <select className="form-select" onChange={(e) => setState({ ...state, level: e.target.value })}>
              <option value="" disabled>Select a level</option>
              <option>beginner</option>
              <option>intermediate</option>
              <option>advanced</option>
            </select>
          </div>

          {/* Duration */}
          <div className="mb-3">
            <label className="form-label">Duration (in seconds)</label>
            <input onChange={(e) => setState({ ...state, duration: e.target.value })} type="number" className="form-control" min="5" max="600" />
          </div>

          {/* Difficulty Score */}
          <div className="mb-3">
            <label className="form-label">Difficulty Score (1-10)</label>
            <input onChange={(e) => setState({ ...state, difficultyScore: e.target.value })} type="number" className="form-control" min="1" max="10" />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success" style={{ padding: "10px 30px" }}>Add Pose</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddToPose;
