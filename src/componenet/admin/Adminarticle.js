import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EndPoint from "../apis/EndPoint";

function ArticleForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
    category: "",
    tags: "",
    Image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("content", form.content);
    data.append("author", form.author);
    data.append("category", form.category);
    data.append("tags", form.tags.split(","));
    if (form.Image) data.append("Image", form.Image);

    try {
      setLoading(true);
      const res = await axios.post(EndPoint.CREATE_ARTICLE, data);
      toast.success("✅ Article created successfully!", { autoClose: 3000 });

      // Clear form fields
      setForm({
        title: "",
        description: "",
        content: "",
        author: "",
        category: "",
        tags: "",
        Image: null,
      });
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to create article", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div
        className="card shadow-lg w-100"
        style={{ maxWidth: "800px", borderRadius: "15px", padding: "30px" }}
      >
        <h2
          className="text-center mb-4"
          style={{ fontWeight: "bold", color: "#0d6efd" }}
        >
          📝 Submit Your Article
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="form-control"
              placeholder="Enter article title"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="form-control"
              placeholder="Short description..."
              rows="3"
              required
            />
          </div>

          {/* Content */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="form-control"
              placeholder="Write your full article here..."
              rows="20"
              required
            />
          </div>

          {/* Two columns */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="form-control"
                placeholder="Author name"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="form-control"
              >
                <option value="">Select a category</option>
                <option value="Mental Health & Wellbeing">Mental Health & Wellbeing</option>
                <option value="Tips & Guides">Tips & Guides</option>
                <option value="Science & Research">Science & Research</option>
                <option value="Tradition">Tradition</option>
                <option value="Spirituality">Spirituality</option>
                <option value="At Work">At Work</option>
                <option value="Yoga">Yoga</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Tags (comma separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="form-control"
              placeholder="tag1, tag2, tag3"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Upload Image</label>
            <input
              type="file"
              onChange={(e) => setForm({ ...form, Image: e.target.files[0] })}
              className="form-control"
              accept="image/*"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100"
            style={{ fontWeight: "600", fontSize: "18px", padding: "10px" }}
          >
            {loading ? "Submitting..." : "Submit Article"}
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}

export default ArticleForm;
