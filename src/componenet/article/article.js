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
  "Yoga",
];

function Article() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("All");
  const [selectedTag, setSelectedTag] = useState("");
  const [article, setArticle] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagArticle, setTagArticle] = useState([]);

  // Fetch all articles
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

  // Fetch tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        let res = await axios.get(EndPoint.GETARTICLETAGS);
        setTags(res.data.tags);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch tags");
      }
    };
    fetchTags();
  }, []);

  // Fetch articles by tag when selectedTag changes
  useEffect(() => {
    if (selectedTag) {
      const fetchArticlesByTag = async () => {
        try {
          let res = await axios.get(EndPoint.GETARTICLEBYTAG(selectedTag));
          setTagArticle(res.data);
        } catch (err) {
          console.log(err);
          toast.error("Failed to fetch articles by tag");
        }
      };
      fetchArticlesByTag();
    } else {
      setTagArticle([]); // Clear tag articles when "All Tags" is selected
    }
  }, [selectedTag]);

  // Determine which articles to display
  const displayedArticles = selectedTag && tagArticle.length > 0 ? tagArticle : article;

  // Filter articles based on search, category, and language
  const filteredArticles = displayedArticles.filter((art) => {
    const matchesCategory = category === "" || art.category === category;
    const matchesSearch =
      search === "" ||
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.description.toLowerCase().includes(search.toLowerCase());
    const matchesLanguage = language === "All" || art.language === language;

    return matchesCategory && matchesSearch && matchesLanguage;
  });

  return (
    <div className="container my-4">
      {/* Filters */}
      <div className="d-flex flex-wrap mb-4 gap-2">
        {/* Search */}
        <input
          type="text"
          className="form-control flex-grow-1"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "300px" }}
        />

        {/* Category Filter */}
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

        {/* Language Filter */}
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

        {/* Tag Filter */}
        <select
          className="form-select"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          style={{ maxWidth: "250px" }}
        >
          <option value="">All Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
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
                {/* Fixed aspect ratio image */}
                <div
                  style={{
                    width: "300px",
                    aspectRatio: "16/9",
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
                      objectFit: "cover",
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
          <p>No articles found for this filter.</p>
        )}
      </div>
    </div>
  );
}

export default Article;