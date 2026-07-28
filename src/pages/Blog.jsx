import React, { useState } from "react";
import { User, Calendar, ArrowRight, Search, Tag, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

const DUMMY_IMAGE =
  "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?q=80&w=800&auto=format&fit=crop";

const articles = [
  {
    id: 1,
    tag: "KNEE-REPLACEMENT",
    title: "Alignment concept: Total Knee Replacement",
    excerpt: "alignment-concept-total-knee-replacement",
    author: "Dr. Ulhas Sonar",
    date: "2026-05-30",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    tag: "TKR IMPLANTS",
    title: "The Evolution of TKR Implants",
    excerpt:
      "The Evolution of TKR Implants Advancing Toward Precision and Performance Total Knee Replacement (TKR) implants have come a lon…",
    author: "Dr. Ulhas Sonar",
    date: "2026-05-30",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    tag: "TOTAL KNEE REPLACEMENT (TKR)",
    title: "Steps in Total Knee Replacement",
    excerpt:
      "Steps in Total Knee Replacement A Surgical Overview by Dr. Ulhas Sonar Total Knee Replacement (TKR) is a complex yet…",
    author: "Dr. Ulhas Sonar",
    date: "2026-05-30",
    image: DUMMY_IMAGE,
  },
  {
    id: 4,
    tag: "KNEE-REPLACEMENT",
    title: "Post-Surgical Kinematic Alignment in TKR",
    excerpt:
      "Understanding kinematic alignment techniques to preserve ligament balance and natural joint motion for knee replacement patients.",
    author: "Dr. Ulhas Sonar",
    date: "2026-06-14",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    tag: "TKR IMPLANTS",
    title: "Patient-Specific Implants & 3D Precision",
    excerpt:
      "Discover how 3D anatomical modeling and patient-specific TKR implant designs improve longevity and patient comfort.",
    author: "Dr. Ulhas Sonar",
    date: "2026-06-25",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    tag: "TOTAL KNEE REPLACEMENT (TKR)",
    title: "Recovery Timeline & Rehabilitation Milestones",
    excerpt:
      "A complete guide to post-operative knee recovery, milestone achievements, home nursing support, and physical therapy exercises.",
    author: "Dr. Ulhas Sonar",
    date: "2026-07-02",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=800&auto=format&fit=crop",
  },
];

const categories = ["ALL", "KNEE-REPLACEMENT", "TKR IMPLANTS", "TOTAL KNEE REPLACEMENT (TKR)"];

function ArticleCard({ article }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/blog/${article.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        boxShadow: isHovered ? "0 16px 32px rgba(37, 99, 235, 0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: isHovered ? "translateY(-6px)" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative", height: "200px", width: "100%", backgroundColor: "#f1f5f9", overflow: "hidden" }}>
        <img
          src={article.image}
          alt={article.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: isHovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        {/* Floating Tag */}
        <span
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            color: "#2563eb",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "0.05em",
            padding: "5px 12px",
            borderRadius: "9999px",
            textTransform: "uppercase",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Tag size={10} style={{ color: "#2563eb" }} />
          {article.tag}
        </span>
      </div>

      {/* Card Body */}
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "700",
            color: isHovered ? "#2563eb" : "#0f172a",
            lineHeight: "1.4",
            marginBottom: "10px",
            transition: "color 0.2s ease",
          }}
        >
          {article.title}
        </h3>
        
        <p
          style={{
            fontSize: "14px",
            color: "#64748b",
            lineHeight: "1.6",
            marginBottom: "24px",
            flex: 1,
          }}
        >
          {article.excerpt}
        </p>

        {/* Footer Meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "16px",
            borderTop: "1px solid #f1f5f9",
            marginTop: "auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#eff6ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User size={14} style={{ color: "#2563eb" }} />
            </span>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#334155" }}>
              {article.author}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#94a3b8" }}>
            <Calendar size={13} style={{ color: "#94a3b8" }} />
            <span>{article.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function OrthopedicArticlesPage() {
  const [blogPostsList, setBlogPostsList] = useState(articles);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const totalPages = Math.ceil(blogPostsList.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPostsList.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/api/blogs/`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map(item => ({
            id: item.id,
            tag: item.category || 'HEALTHCARE',
            title: item.title,
            excerpt: item.excerpt || item.title,
            author: item.author || 'Dr. Ulhas Sonar',
            date: item.date || '2026-05-30',
            image: item.image && !item.image.includes('placeholder') ? item.image : DUMMY_IMAGE,
          }));
          setBlogPostsList(formatted);
        }
      })
      .catch(err => console.log('Django API offline, using default articles:', err));
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "'Poppins', 'Inter', sans-serif", paddingTop: "90px", paddingBottom: "50px" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 24px" }}>
        
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "#eff6ff",
              color: "#2563eb",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "6px 18px",
              borderRadius: "9999px",
              marginBottom: "12px",
              border: "1px solid #dbeafe",
            }}
          >
            Medical Insights
          </span>

          <h1
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "8px",
              letterSpacing: "-0.02em",
            }}
          >
            Expert Orthopedic <span style={{ color: "#2563eb" }}>Articles</span>
          </h1>

          <p style={{ fontSize: "15px", color: "#64748b", maxWidth: "560px", margin: "0 auto", lineHeight: "1.5" }}>
            Stay informed with the latest insights on orthopedic health, treatments, and surgical innovations.
          </p>
        </div>

        {/* Article Grid */}
        {currentPosts.length > 0 ? (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "20px",
                marginBottom: "40px",
              }}
            >
              {currentPosts.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "10px",
                  marginBottom: "50px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: currentPage === 1 ? "#f1f5f9" : "#ffffff",
                    color: currentPage === 1 ? "#94a3b8" : "#1e293b",
                    fontWeight: "600",
                    fontSize: "14px",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      border: page === currentPage ? "none" : "1px solid #cbd5e1",
                      backgroundColor: page === currentPage ? "#2563eb" : "#ffffff",
                      color: page === currentPage ? "#ffffff" : "#1e293b",
                      fontWeight: "700",
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: page === currentPage ? "0 4px 10px rgba(37, 99, 235, 0.2)" : "0 1px 2px rgba(0,0,0,0.05)",
                    }}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: currentPage === totalPages ? "#f1f5f9" : "#ffffff",
                    color: currentPage === totalPages ? "#94a3b8" : "#1e293b",
                    fontWeight: "600",
                    fontSize: "14px",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "60px 24px",
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              marginBottom: "56px",
            }}
          >
            <BookOpen size={44} style={{ margin: "0 auto 16px auto", color: "#94a3b8" }} />
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
              No articles found
            </h3>
            <p style={{ fontSize: "14px", color: "#64748b" }}>
              Try searching with another keyword or selecting a different category tab.
            </p>
          </div>
        )}

        {/* CTA Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #0f172a 100%)",
            borderRadius: "24px",
            padding: "56px 32px",
            textAlign: "center",
            color: "#ffffff",
            boxShadow: "0 20px 40px rgba(30, 64, 175, 0.25)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: "800", marginBottom: "16px", letterSpacing: "-0.01em" }}>
            Have Questions About Your Condition?
          </h2>
          <p style={{ fontSize: "16px", color: "#dbeafe", maxWidth: "560px", margin: "0 auto 32px auto", lineHeight: "1.6" }}>
            Book a consultation with Dr. Ulhas Sonar for personalized assessment and expert orthopedic care.
          </p>
          <Link
            to="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#ffffff",
              color: "#1d4ed8",
              fontWeight: "700",
              fontSize: "14px",
              padding: "14px 32px",
              borderRadius: "9999px",
              textDecoration: "none",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              transition: "transform 0.2s ease, background-color 0.2s ease",
            }}
          >
            Schedule Consultation
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}
