import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ChevronRight, Share2, Facebook, Twitter, Linkedin, ArrowLeft } from 'lucide-react';

const BlogDetails = () => {
  const { id } = useParams();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const post = blogPosts.find(p => p.id === parseInt(id));

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingTop: '10rem' }}>
        <div style={{ fontSize: '1.2rem', fontFamily: "'Poppins', sans-serif", color: '#08709d' }}>Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingTop: '10rem' }}>
        <div style={{ fontSize: '1.2rem', fontFamily: "'Poppins', sans-serif", color: '#1a1a1a', marginBottom: '1rem' }}>Post not found.</div>
        <Link to="/#insights" style={{ color: '#08709d', fontWeight: 'bold' }}>Back to Insights</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <style>{`
        .blog-content h2 {
          font-family: 'Poppins', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          line-height: 1.2;
        }
        .blog-content h3 {
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .blog-content p {
          font-family: 'Poppins', sans-serif;
          font-size: 1.125rem;
          line-height: 1.8;
          color: #4a4a4a;
          margin-bottom: 1.5rem;
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .blog-content li {
          font-family: 'Poppins', sans-serif;
          font-size: 1.125rem;
          color: #4a4a4a;
          margin-bottom: 0.75rem;
          list-style-type: disc;
        }
        .blog-content ol li {
          list-style-type: decimal;
        }
        .blog-content blockquote {
          font-family: 'Poppins', sans-serif;
          font-style: italic;
          font-size: 1.5rem;
          color: #08709d;
          border-left: 4px solid #08709d;
          padding-left: 1.5rem;
          margin: 2.5rem 0;
          font-weight: 500;
        }
        .blog-content strong {
          color: #1a1a1a;
          font-weight: 700;
        }
      `}</style>

      {/* ── Breadcrumbs ── */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
          <Link to="/" className="hover:text-[#08709d] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/#insights" className="hover:text-[#08709d] transition-colors">Insights</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 truncate max-w-[200px] sm:max-w-none">{post.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* ── Main Content ── */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8"
          >
            {/* Category & Title */}
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-blue-50 text-[#08709d] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 font-poppins">
                {post.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-500 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User size={18} />
                  </div>
                  <span className="font-semibold text-gray-900">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl shadow-gray-200">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>

            {/* Post Body */}
            <div 
              className="blog-content mb-16"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share & Tags */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-8 border-y border-gray-100">
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900">Share:</span>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                    <Facebook size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-sky-400 hover:text-white hover:border-sky-400 transition-all">
                    <Twitter size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all">
                    <Linkedin size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
              <Link to="/#insights" className="inline-flex items-center gap-2 text-[#08709d] font-bold hover:underline">
                <ArrowLeft size={18} />
                Back to All Insights
              </Link>
            </div>
          </motion.div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-10">
              
              {/* Search or About Widget */}
              <div className="bg-gray-50 p-8 rounded-3xl">
                <h4 className="text-xl font-bold text-gray-900 mb-4 font-poppins">About CORX Healthcare</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Dubai's premier home healthcare provider, committed to delivering clinical excellence and compassionate care in the comfort of your home.
                </p>
                <Link to="/about" className="text-[#08709d] font-bold text-sm flex items-center gap-1 group">
                  Learn More <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Related Posts */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6 font-poppins border-l-4 border-[#08709d] pl-4">Related Insights</h4>
                <div className="space-y-6">
                  {blogPosts.filter(p => p.id !== parseInt(id)).slice(0, 3).map(p => (
                    <Link key={p.id} to={`/blog/${p.id}`} className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h5 className="text-sm font-bold text-gray-900 group-hover:text-[#08709d] transition-colors line-clamp-2 leading-snug">
                          {p.title}
                        </h5>
                        <span className="text-xs text-gray-400 mt-1">{p.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-[#08709d] p-8 rounded-3xl text-white">
                <h4 className="text-xl font-bold mb-4 font-poppins">Subscribe</h4>
                <p className="text-white/80 text-sm mb-6">
                  Get the latest healthcare tips and updates delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all"
                  />
                  <button className="w-full py-3 rounded-xl bg-white text-[#08709d] font-bold hover:bg-gray-100 transition-colors">
                    Join Now
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
