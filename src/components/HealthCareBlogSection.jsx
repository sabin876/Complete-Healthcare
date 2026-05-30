import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import labServicesImg from "../assets/lab_services_home.png";

/* ─── Brand Tokens ─── */
const PRIMARY   = "#08709d";
const TEXT_DARK = "#1a1a1a";
const TEXT_MUTED = "#666666";

export default function HealthCareBlogSection() {
  // Use first 3 posts for the section
  const displayedPosts = blogPosts.slice(0, 3);

  return (
    <section id="insights" style={{
      fontFamily: "'Inter', 'Open Sans', sans-serif",
      backgroundColor: "#ffffff",
      padding: "100px 24px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500&display=swap');

        .blog-card {
          transition: transform 0.3s ease;
        }
        .blog-card:hover {
          transform: translateY(-8px);
        }
        .blog-card:hover .read-more {
          color: ${PRIMARY};
        }
        .blog-card:hover .read-more span {
          transform: translateX(5px);
        }
        .read-more span {
          display: inline-block;
          transition: transform 0.3s ease;
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2 style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "2.5rem",
          fontWeight: 700,
          color: TEXT_DARK,
          marginBottom: "16px",
          letterSpacing: "-0.02em"
        }}>
          Caring better,<br />
          one insight at a time
        </h2>
        <p style={{
          color: TEXT_MUTED,
          fontSize: "1.1rem",
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: 1.6
        }}>
          Stay updated with the latest medical insights, care strategies, and health tips from our expert team.
        </p>
      </div>

      {/* ── Grid ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "40px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {displayedPosts.map((post) => (
          <motion.div 
            key={post.id} 
            className="blog-card" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: "#ffffff",
              overflow: "hidden"
            }}
          >
            {/* Image */}
            <div style={{ height: "240px", overflow: "hidden", marginBottom: "24px", borderRadius: "12px" }}>
              <img 
                src={labServicesImg} 
                alt={post.title} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Content */}
            <div style={{ padding: "0 4px" }}>
              <div style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: PRIMARY,
                textTransform: "uppercase",
                marginBottom: "8px",
                letterSpacing: "0.05em"
              }}>
                {post.category}
              </div>

              <h3 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: TEXT_DARK,
                marginBottom: "12px",
                lineHeight: 1.3
              }}>
                {post.title}
              </h3>

              <div style={{
                fontSize: "0.9rem",
                color: TEXT_MUTED,
                marginBottom: "16px",
                fontWeight: 500
              }}>
                {post.author} &nbsp;·&nbsp; {post.date}
              </div>



              <Link 
                to={`/blog/${post.id}`} 
                className="read-more"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: TEXT_DARK,
                  textDecoration: "none",
                  transition: "color 0.3s ease"
                }}
              >
                Read More <span>→</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <Link
          to="/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "14px 32px",
            backgroundColor: PRIMARY,
            color: "#fff",
            borderRadius: "100px",
            fontWeight: "600",
            textDecoration: "none",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 14px rgba(8, 112, 157, 0.3)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          View All Insights
        </Link>
      </div>
    </section>
  );
}
