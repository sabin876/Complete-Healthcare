import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    tags: ["Physiotherapy", "Guide"],
    title: "What is Physiotherapy? A Comprehensive Guide",
    desc: "Discover the benefits of physiotherapy and how it can help you regain mobility, manage pain, and improve your overall quality of life.",
    delay: 0.1,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    link: "https://www.corx.ae/what-is-physiotherapy/"
  },
  {
    id: 2,
    tags: ["Doctor on Call", "Healthcare"],
    title: "Doctor at Home vs Hospital Visit: What's Better in 2026?",
    desc: "Explore the growing trend of home healthcare and learn why calling a doctor to your home might be the safer and more convenient choice.",
    delay: 0.2,
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    link: "https://www.corx.ae/doctor-at-home-vs-hospital-visit-whats-better-in-2026/"
  },
  {
    id: 3,
    tags: ["Home Nursing", "Elderly Care"],
    title: "10 Signs Your Loved One Might Need Home Nursing Care",
    desc: "Is it time for professional help? Learn the top 10 signs that indicate your elderly loved one could benefit from dedicated home nursing.",
    delay: 0.3,
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    link: "https://www.corx.ae/10-signs-your-loved-one-might-need-home-nursing-care/"
  },
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-[#f8f9fa]">
      <div className="container px-6 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="h-[2px] w-8 bg-[#08709d]"></span>
              <h4 className="text-[#08709d] font-bold uppercase tracking-widest text-sm">Our Blog</h4>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-[#1a294a] tracking-tight leading-tight"
            >
              Latest Health Insights
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <a 
              href="https://www.corx.ae/blog/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#08709d] text-[#08709d] rounded-full font-bold hover:bg-[#08709d] hover:text-white transition-colors duration-300 uppercase tracking-wide text-sm"
            >
              View All Posts
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: post.delay }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay Tags */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
          {post.tags.map((tag, i) => (
            <span 
              key={i} 
              className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[#08709d] rounded-md shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-[22px] font-bold text-[#1a294a] mb-4 leading-snug group-hover:text-[#08709d] transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-500 text-[15px] leading-relaxed mb-6 flex-grow line-clamp-3">
          {post.desc}
        </p>
        
        <div className="mt-auto pt-6 border-t border-gray-100">
          <a 
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#08709d] font-bold text-[14px] uppercase tracking-wide group/link"
          >
            Read Article
            <ArrowRight size={18} className="group-hover/link:translate-x-1.5 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
