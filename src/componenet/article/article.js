import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EndPoint from "../apis/EndPoint";
import { Link } from "react-router-dom";

const categories = [
  "Mental Health & Wellbeing",
  "Tips & Guides",
  "Science & Research",
  "Tradition",
  "Spirituality",
  "At Work",
  "Yoga"
];

function Article() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(""); // default = All
  const [language, setLanguage] = useState("All");
  const [article, setArticle] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(EndPoint.GET_ARTICLE);
        setArticle(response.data);
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, []);

  // Filter articles based on category and search
  const filteredArticles = article.filter((art) => {
    const matchesCategory = category === "" || art.category === category;
    const matchesSearch =
      search === "" ||
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container my-4">
      {/* Filters */}
      <div className="d-flex flex-wrap mb-4 gap-2">
        <input
          type="text"
          className="form-control flex-grow-1"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "300px" }}
        />
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          className="form-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="All">All Languages</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
        </select>
      </div>

      {/* Articles */}
        <div className="d-flex flex-column gap-3">
  {filteredArticles.length > 0 ? (
    filteredArticles.map((art) => (
      <Link
        key={art._id}
        className="text-decoration-none text-dark"
        to={`/articleDetail/${art._id}`}
      >
        <div
          className="d-flex bg-light p-3 rounded"
          style={{ gap: "20px", alignItems: "center" }}
        >
          {/* Fixed aspect ratio image container */}
          <div
            style={{
              width: "300px",
              aspectRatio: "16/9", // maintains uniform size
              overflow: "hidden",
              borderRadius: "8px",
              flexShrink: 0,
            }}
          >
            <img
              src={art.Image}
              alt={art.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // crops image without distortion
              }}
            />
          </div>

          <div className="flex-grow-1">
            <h5>{art.title}</h5>
            <p className="text-muted">{art.description}</p>
            <span className="text-secondary">{art.author}</span>
          </div>
        </div>
      </Link>
    ))
  ) : (
    <p>No articles found for this category.</p>
  )}
</div>

    </div>
  );
}

export default  Article ;

