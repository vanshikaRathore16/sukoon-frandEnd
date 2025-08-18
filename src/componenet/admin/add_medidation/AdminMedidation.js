import EndPoint from "../../apis/EndPoint";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function MedidationUploadForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: [], // now array
    mood: [], // now array
    padcast : "",
    audio: null,
    image: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) {
        // For arrays, append each value separately
        if (Array.isArray(form[key])) {
          form[key].forEach((item) => data.append(key, item));
        } else {
          data.append(key, form[key]);
        }
      }
    });

    try {
      const res = await axios.post(EndPoint.MEDITATION_FORM, data);
      console.log(res.data);
      toast.success("con medidation added");
      setForm({
        title: "",
        description: "",
        type: [],
        mood: [],
        padcast : "",
        audio: null,
        image: null
      });
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  return <>
    <ToastContainer/>
    <div style={{ maxWidth: "500px", margin: "30px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", background: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Upload Meditation</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <label style={{ fontWeight: "bold" }}>podcast</label>
        <input
          type="text"
          value={form.podcast}
          onChange={(e) => setForm({ ...form, podcast: e.target.value })}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          required
        />
        <label style={{ fontWeight: "bold" }}>Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          required
        />
         
        <label style={{ fontWeight: "bold" }}>Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", resize: "none", minHeight: "80px" }}
        />

        <label style={{ fontWeight: "bold" }}>Type (Select multiple with Ctrl/Cmd)</label>
        <select
          multiple
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: Array.from(e.target.selectedOptions, (option) => option.value),
            })
          }
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="sleep">Sleep</option>
<option value="meditation">Meditation</option>
<option value="soundscapes">Soundscapes</option>
<option value="anxiety">Anxiety</option>
<option value="focus">Focus</option>
<option value="stress">Stress</option>
<option value="work">Work</option>
<option value="kids">Kids</option>
<option value="sleep_stories">Sleep Stories</option>
<option value="motivation">Motivation</option>
<option value="mindfulness">Mindfulness</option>
<option value="podcast">podcast</option>

        </select>

        <label style={{ fontWeight: "bold" }}>Mood (Select multiple with Ctrl/Cmd)</label>
        <select
          multiple
          value={form.mood}
          onChange={(e) =>
            setForm({
              ...form,
              mood: Array.from(e.target.selectedOptions, (option) => option.value),
            })
          }
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="Calm">Calm</option>
          <option value="Focused">Focused</option>
          <option value="Relaxed">Relaxed</option>
          <option value="Happy">Happy</option>
          <option value="Energized">Energized</option>
        </select>



        <label style={{ fontWeight: "bold" }}>Audio File</label>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setForm({ ...form, audio: e.target.files[0] })}
          style={{ padding: "5px" }}
          required
        />

        <label style={{ fontWeight: "bold" }}>Image File</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          style={{ padding: "5px" }}
          required
        />

        <button
          type="submit"
          style={{ padding: "10px", borderRadius: "5px", border: "none", background: "#4CAF50", color: "#fff", fontWeight: "bold", cursor: "pointer" }}
        >
          Upload
        </button>
      </form>
    </div>
</>
}

export default MedidationUploadForm;
