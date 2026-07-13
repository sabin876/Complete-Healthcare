import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ChevronRight, ArrowRight, ChevronLeft } from 'lucide-react';
import labServicesImg from '../assets/lab_services_home.png';
import FAQ from '../components/FAQ';

/* ─── Brand Tokens ─── */
const PRIMARY   = "#08709d";
const TEXT_DARK = "#1a1a1a";
const TEXT_MUTED = "#666666";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    fetch('http://localhost:8000/api/blogs/')
      .then(res => res.json())
      .then(data => {
        setBlogPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(blogPosts.length / postsPerPage) || 1;

  const currentPosts = blogPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingTop: '10rem' }}>
        <div style={{ fontSize: '1.2rem', fontFamily: "'Poppins', sans-serif", color: PRIMARY }}>Loading insights...</div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-40 pb-20">
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

      {/* ── Page Heading ── */}
      <div style={{ textAlign: "center", marginBottom: "60px", padding: "0 20px" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "3rem",
            fontWeight: 700,
            color: TEXT_DARK,
            marginBottom: "16px",
            letterSpacing: "-0.02em"
          }}>
            Caring better,<br />
            one insight at a time
          </h1>
          <p style={{
            color: TEXT_MUTED,
            fontSize: "1.1rem",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6
          }}>
            Stay updated with the latest medical insights, care strategies, and health tips from our expert team.
          </p>
        </motion.div>
      </div>

      {/* ── Post Grid ── */}
      <div className="container mx-auto px-4">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "40px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          {currentPosts.map((post, idx) => (
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-20">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-70' 
                  : 'bg-white border-2 border-gray-100 text-[#08709d] hover:bg-[#08709d] hover:text-white hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>
            
            <div className="px-6 py-3 bg-white border-2 border-gray-100 rounded-2xl shadow-sm">
              <span className="text-gray-500 font-medium font-poppins text-sm uppercase tracking-widest">
                Page <span className="text-[#08709d] font-bold text-lg mx-1">{currentPage}</span> of {totalPages}
              </span>
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentPage === totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-70' 
                  : 'bg-white border-2 border-gray-100 text-[#08709d] hover:bg-[#08709d] hover:text-white hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>

      {/* ── FAQ Section ── */}
      <FAQ />

    </div>
  );
};

export default Blog;
