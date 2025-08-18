// ArticleDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EndPoint from "../apis/EndPoint";
import { toast } from "react-toastify";

function ArticleDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(EndPoint.ARTICLE_BY_ID(id));
        setArticle(response.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load article");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading article...</p>;
  if (!article) return <p>Article not found</p>;

  return (
    <div className="container my-5" style={{ maxWidth: "900px" }}>
      {/* Article Card */}
      <div className="card shadow-sm p-4">
        {/* Title */}
        <h1 className="mb-3">{article.title}</h1>

        {/* Author Info */}
        <div className="d-flex align-items-center mb-3">
         
          <div>
            <p className="mb-0 text-muted">By {article.author}</p>
            <small className="text-muted">
              {new Date(article.createdAt).toLocaleDateString()}
            </small>
          </div>
        </div>

        {/* Article Image */}
        {article.Image && (
          <img
            src={article.Image}
            alt={article.title}
            className="img-fluid rounded mb-4"
            style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
          />
        )}

        {/* Article Content */}
        <p className="lead">{article.description}</p>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />

        {/* Tags & Category */}
      
        {/* Language */}
        <p className="mt-3"><strong>Language:</strong> {article.language}</p>
      </div>
    </div>
  );
}

export default ArticleDetails;
