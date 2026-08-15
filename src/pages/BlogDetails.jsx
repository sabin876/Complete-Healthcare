import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { API_BASE_URL } from "../config/api";

import { slugifyTitle } from "./Blog";

const blogDatabase = [
  {
    id: 1,
    slug: "advantages-of-stem-cells-regenerative-medicine",
    category: "Home Healthcare",
    title: "Advantages of Stem Cells: Regenerative Medicine Supports Healing and Recovery",
    author: "Corx",
    authorBio: "Corx writes on regenerative medicine, home healthcare, and recovery-focused treatment options, translating clinical research into practical guidance for patients and caregivers.",
    date: "May 22, 2026",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    tags: ["Regenerative Medicine", "Stem Cells", "Recovery", "Healthcare"],
    content: `
      <p>Stem cells are probably one of the most significant breakthroughs in modern regenerative medicine because they have this incredible ability to help repair tissue, renew cells, and aid the healing process within the body. Unlike regular cells, stem cells can actually regenerate themselves, and they can even turn into different kinds of specialized cells, such as muscle cells, cartilage cells, nerve cells, blood cells, and heart cells, to name a few.</p>

      <p>This is one of the big reasons why the benefits of stem cells are being talked about all over the healthcare world, in regenerative medicine, orthopedics, neurology, sports medicine, and chronic disease research. Rather than just treating the symptoms of a condition, stem cell therapy is increasingly being looked at as a possible way to actually help the body fix itself, by supporting recovery, tissue repair, and regulation of inflammation.</p>

      <p>Scientists all around the world are right now exploring the benefits of stem cells for pretty much all conditions involving tissue damage, chronic inflammation, degenerative diseases, joint injuries, neurological disorders, autoimmune conditions, and recovery-focused medicine.</p>

      <div class="pull-note">"Stem cell research isn't about replacing the body's healing process — it's about giving it better tools to do the job."</div>

      <h2>What Makes Stem Cells Unique?</h2>
      <p>The benefits of stem cells come from some pretty unique biological properties that let them behave in a way that's very different from most mature cells in the body.</p>

      <h3>Self-Renewal</h3>
      <p>Stem cells can just keep dividing and creating new stem cells over time, which is really helpful for supporting ongoing tissue repair and cellular renewal processes.</p>

      <h3>Differentiation Ability</h3>
      <p>Stem cells can turn into really specific types of cells, like:</p>
      <ul>
        <li>Cartilage cells</li>
        <li>Bone cells</li>
        <li>Blood cells</li>
        <li>Nerve cells</li>
        <li>Muscle and connective tissue cells</li>
      </ul>

      <h3>Paracrine Signaling</h3>
      <p>Beyond becoming new cells themselves, stem cells also release signaling molecules that recruit the body's own repair mechanisms, reduce inflammation, and encourage nearby tissue to heal faster.</p>

      <h2>Where Stem Cell Therapy Is Being Used Today</h2>
      <p>Clinics and research hospitals are applying regenerative approaches across a growing list of specialties, including orthopedic injury recovery, post-surgical rehabilitation, chronic pain management, and support for age-related joint degeneration. As research continues, the list of conditions being studied only keeps growing.</p>
    `
  },
  {
    id: 2,
    slug: "what-is-physiotherapy-comprehensive-guide",
    category: "Home Physiotherapy",
    title: "WHAT IS PHYSIOTHERAPY? A COMPREHENSIVE GUIDE",
    author: "Corx",
    authorBio: "Corx writes on physical therapy, mobility restoration, and post-surgical rehabilitation.",
    date: "April 16, 2026",
    heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    tags: ["Home Physiotherapy", "Rehabilitation", "Recovery"],
    content: `
      <p>Physiotherapy is a primary healthcare profession that promotes wellness, mobility, and independence. It assists patients of all ages who are affected by injury, illness, or disability through movement, exercise, manual therapy, and education.</p>
      <h2>Key Benefits of Physiotherapy</h2>
      <p>Physiotherapy helps patients regain full function, manage chronic pain, avoid surgery, and recover quickly after major orthopedic procedures.</p>
    `
  },
  {
    id: 3,
    slug: "burnout-in-working-professionals-signs-solutions",
    category: "Home Healthcare",
    title: "Burnout in Working Professionals: Signs & Solutions",
    author: "Corx",
    authorBio: "Corx writes on wellness, executive health assessment, and preventative medicine.",
    date: "March 18, 2026",
    heroImage: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80",
    tags: ["Healthcare", "Wellness", "Workplace Health"],
    content: `
      <p>Professional burnout affects mental and physical health. Learn key indicators and effective at-home health solutions to restore your energy and focus.</p>
    `
  },
  {
    id: 4,
    slug: "doctor-at-home-vs-hospital-visit",
    category: "Doctor on Call",
    title: "Doctor at Home vs Hospital Visit: What's Better in 2026?",
    author: "Corx",
    authorBio: "Corx writes on 24/7 home physician care and emergency primary response.",
    date: "February 12, 2026",
    heroImage: "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?w=1200&q=80",
    tags: ["Doctor on Call", "Home Care", "Dubai Healthcare"],
    content: `
      <p>Comparing home physician visits against hospital ER waiting rooms. Discover why calling a doctor directly to your doorstep in Dubai is fast, comfortable, and safe.</p>
    `
  },
  {
    id: 5,
    slug: "managing-chronic-conditions-with-home-healthcare",
    category: "Home Nursing",
    title: "Managing Chronic Conditions With Home Healthcare Support",
    author: "Corx",
    authorBio: "Corx writes on home nursing, chronic disease management, and elderly care.",
    date: "January 20, 2026",
    heroImage: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1200&q=80",
    tags: ["Home Nursing", "Chronic Care", "Elderly Care"],
    content: `
      <p>Managing long-term illness requires structured clinical monitoring, medication oversight, and compassionate nursing assistance right in the comfort of your home.</p>
    `
  }
];

export default function BlogDetails() {
  const { id, slug } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const targetParam = (slug || id || '').toString().toLowerCase();
  const initialPost = blogDatabase.find(
    (p) => p.slug === targetParam || p.id.toString() === targetParam || slugifyTitle(p.title) === targetParam
  ) || blogDatabase[0];
  const [post, setPost] = useState(initialPost);
  const articleId = post ? post.id : 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (targetParam) {
      fetch(`${API_BASE_URL}/api/blogs/${targetParam}/`)
        .then(res => {
          if (!res.ok) return null;
          return res.json();
        })
        .then(data => {
          if (data && data.title) {
            setPost({
              id: data.id,
              slug: data.slug || slugifyTitle(data.title),
              category: data.tag || data.category || 'Home Healthcare',
              title: data.title,
              author: data.author || 'Corx',
              authorBio: 'Corx writes on regenerative medicine, home healthcare, and recovery-focused treatment options.',
              date: data.date || 'May 22, 2026',
              heroImage: data.image && !data.image.includes('placeholder') ? data.image : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
              tags: [data.tag || data.category || 'Healthcare'],
              content: data.content || `<p>${data.excerpt}</p>`,
              excerpt: data.excerpt || undefined
            });
          }
        })
        .catch(err => console.log('Django API offline, using static details:', err));
    }
  }, [targetParam]);

  useEffect(() => {
    if (!post) return;

    const pageTitle = post.meta_title || (post.title ? `${post.title} | Corx Healthcare Blog Dubai` : 'Corx Home Healthcare Blog');
    const pageDesc = post.meta_description || post.excerpt || (post.title ? `Read ${post.title} on Corx Home Healthcare Blog.` : 'Explore the Corx Home Healthcare Blog for expert health tips, home care advice, and wellness guides.');

    document.title = pageTitle;

    const setMetaTag = (attrName, attrVal, contentVal) => {
      let metaElem = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!metaElem) {
        metaElem = document.createElement('meta');
        metaElem.setAttribute(attrName, attrVal);
        document.head.appendChild(metaElem);
      }
      metaElem.setAttribute('content', contentVal);
    };

    setMetaTag('name', 'description', pageDesc);
    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', pageDesc);
    setMetaTag('property', 'og:type', 'article');
    if (post.heroImage) {
      setMetaTag('property', 'og:image', post.heroImage);
    }
    setMetaTag('property', 'twitter:title', pageTitle);
    setMetaTag('property', 'twitter:description', pageDesc);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const origin = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
      ? window.location.origin
      : 'https://corx.ae';
    canonicalLink.setAttribute('href', `${origin}/blog/${post.slug || articleId}`);
  }, [post]);

  const prevPost = blogDatabase.find((p) => p.id === articleId - 1) || blogDatabase[blogDatabase.length - 1];
  const nextPost = blogDatabase.find((p) => p.id === articleId + 1) || blogDatabase[0];

  return (
    <div style={{ backgroundColor: "#eef2f6", color: "#3a3f47", fontFamily: "Georgia, 'Times New Roman', serif", minHeight: "100vh", paddingTop: "95px", paddingBottom: "50px" }}>
      <style>{`
        .blog-page {
          max-width: 1220px;
          margin: 0 auto;
          padding: 24px 24px 48px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 310px;
          gap: 24px;
          align-items: start;
        }

        .breadcrumb {
          grid-column: 1 / -1;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
          color: #5a616b;
          margin-bottom: 4px;
        }
        .breadcrumb a { color: #1f6fb2; text-decoration: none; }
        .breadcrumb a:hover { text-decoration: underline; }

        .article-card {
          background: #ffffff;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(20, 30, 45, 0.06), 0 1px 2px rgba(20, 30, 45, 0.04);
          padding: 40px 44px 48px;
        }

        .article-title {
          color: #1f5f9e;
          font-size: 26px;
          line-height: 1.35;
          margin: 0 0 10px;
          font-weight: 700;
          font-family: Georgia, serif;
        }

        .article-meta {
          color: #2f8f4e;
          font-size: 14px;
          font-family: Arial, Helvetica, sans-serif;
          font-style: italic;
          margin-bottom: 22px;
        }
        .article-meta a { color: inherit; text-decoration: none; }
        .article-meta a:hover { text-decoration: underline; }

        .article-hero {
          width: 100%;
          height: auto;
          max-height: 480px;
          object-fit: cover;
          border-radius: 4px;
          margin-bottom: 26px;
          display: block;
        }

        .article-body p {
          margin: 0 0 20px;
          font-size: 16px;
          color: #3a3f47;
          line-height: 1.65;
        }

        .article-body h2 {
          color: #1f5f9e;
          font-size: 22px;
          margin: 34px 0 14px;
          font-weight: 700;
          font-family: Georgia, serif;
        }

        .article-body h3 {
          color: #1f5f9e;
          font-size: 19px;
          margin: 28px 0 12px;
          font-weight: 700;
          font-family: Georgia, serif;
        }

        .article-body ul {
          margin: 0 0 20px;
          padding-left: 22px;
        }
        .article-body li {
          margin-bottom: 8px;
          font-size: 16px;
        }

        .article-body a { color: #1f6fb2; }

        .pull-note {
          background: #f4f8fb;
          border-left: 3px solid #1f6fb2;
          padding: 16px 20px;
          font-size: 15px;
          color: #5a616b;
          margin: 26px 0;
          font-style: italic;
        }

        .tags {
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid #e7eaee;
          font-family: Arial, Helvetica, sans-serif;
        }
        .tags .label {
          font-weight: 700;
          color: #3a3f47;
          font-size: 13px;
          margin-right: 8px;
        }
        .tag {
          display: inline-block;
          background: #eef2f6;
          color: #5a616b;
          font-size: 12px;
          padding: 5px 12px;
          border-radius: 14px;
          margin: 0 6px 6px 0;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .tag:hover { background: #1f6fb2; color: #ffffff; }

        .share {
          margin-top: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: Arial, Helvetica, sans-serif;
        }
        .share .label { font-size: 13px; font-weight: 700; color: #3a3f47; }
        .share a {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #1f6fb2;
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          transition: background 0.2s ease;
        }
        .share a:hover { background: #164d80; }

        .author-box {
          margin-top: 40px;
          background: #f7f9fb;
          border-radius: 6px;
          padding: 24px;
          display: flex;
          gap: 18px;
          align-items: flex-start;
          font-family: Arial, Helvetica, sans-serif;
        }
        .author-avatar {
          width: 56px; height: 56px;
          border-radius: 50%;
          background: #1f6fb2;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 20px;
          flex: none;
        }
        .author-box h4 {
          margin: 0 0 4px;
          color: #1f5f9e;
          font-size: 15px;
          font-family: Arial, Helvetica, sans-serif;
        }
        .author-box p {
          margin: 0;
          font-size: 13.5px;
          color: #5a616b;
          line-height: 1.5;
        }

        .post-nav {
          margin-top: 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          font-family: Arial, Helvetica, sans-serif;
        }
        .post-nav a {
          display: block;
          background: #f7f9fb;
          border-radius: 6px;
          padding: 16px 18px;
          text-decoration: none;
          color: #5a616b;
          transition: background 0.2s ease;
        }
        .post-nav a:hover { background: #eef4f9; }
        .post-nav .dir {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .06em;
          color: #1f6fb2;
          display: block;
          margin-bottom: 4px;
        }
        .post-nav .title {
          font-size: 14px;
          color: #3a3f47;
          font-weight: 700;
        }
        .post-nav.next { text-align: right; }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
          font-family: Arial, Helvetica, sans-serif;
          position: sticky;
          top: 130px;
        }

        .widget {
          background: #ffffff;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(20, 30, 45, 0.06), 0 1px 2px rgba(20, 30, 45, 0.04);
          padding: 22px 24px 26px;
        }

        .widget h3 {
          margin: 0 0 16px;
          font-size: 18px;
          color: #1a2733;
          font-family: Georgia, serif;
          font-weight: 700;
        }

        .search-form {
          display: flex;
          gap: 8px;
        }
        .search-form input {
          flex: 1;
          min-width: 0;
          padding: 10px 12px;
          border: 1px solid #d6dce2;
          border-radius: 3px;
          font-size: 14px;
          font-family: Arial, Helvetica, sans-serif;
        }
        .search-form input:focus {
          outline: 2px solid #1f6fb2;
          outline-offset: 1px;
        }
        .search-form button {
          background: #1f6fb2;
          color: #ffffff;
          border: none;
          padding: 0 18px;
          border-radius: 3px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s ease;
        }
        .search-form button:hover { background: #164d80; }

        .recent-posts {
          list-style: none;
          margin: 0; padding: 0;
        }
        .recent-posts li {
          padding: 12px 0;
          border-bottom: 1px solid #e7eaee;
        }
        .recent-posts li:first-child { padding-top: 0; }
        .recent-posts li:last-child { border-bottom: none; padding-bottom: 0; }
        .recent-posts a {
          color: #1f6fb2;
          text-decoration: none;
          font-size: 14.5px;
          line-height: 1.45;
          font-weight: 600;
        }
        .recent-posts a:hover { color: #164d80; text-decoration: underline; }
        .recent-posts a.current { color: #1f5f9e; }

        .categories {
          list-style: none;
          margin: 0; padding: 0;
        }
        .categories li {
          padding: 9px 0;
          border-bottom: 1px solid #e7eaee;
        }
        .categories li:last-child { border-bottom: none; }
        .categories a {
          color: #1f6fb2;
          text-decoration: none;
          font-size: 14.5px;
          display: flex;
          justify-content: space-between;
        }
        .categories a:hover { color: #164d80; text-decoration: underline; }
        .categories .count { color: #5a616b; font-size: 13px; }

        @media (max-width: 860px) {
          .blog-page { grid-template-columns: 1fr; }
          .article-card { padding: 28px 22px 34px; }
          .article-title { font-size: 22px; }
          .post-nav { grid-template-columns: 1fr; }
          .post-nav.next { text-align: left; }
          .sidebar { position: static; }
        }
      `}</style>

      <div className="blog-page">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <Link to="/blog">{post.category}</Link> / {post.title}
        </div>

        <article className="article-card">
          <h1 className="article-title">{post.title}</h1>
          <div className="article-meta">
            By <strong>{post.author}</strong> • {post.date} • {post.category}
          </div>

          <img src={post.heroImage} alt={post.title} className="article-hero" />

          <div 
            className="article-body" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          <div className="tags">
            <span className="label">TAGS:</span>
            {post.tags && post.tags.map((tag, i) => (
              <span key={i} className="tag">#{tag}</span>
            ))}
          </div>

          <div className="share">
            <span className="label">SHARE:</span>
            <a href="#" aria-label="Share on Facebook">f</a>
            <a href="#" aria-label="Share on X">x</a>
            <a href="#" aria-label="Share via email">@</a>
            <a href="#" aria-label="Copy link">🔗</a>
          </div>

          <div className="author-box">
            <div className="author-avatar">{(post.author && post.author.charAt(0)) || "C"}</div>
            <div>
              <h4>Written by {post.author}</h4>
              <p>{post.authorBio}</p>
            </div>
          </div>

          <div className="post-nav">
            <Link to={`/blog/${prevPost.slug || slugifyTitle(prevPost.title) || prevPost.id}`} className="prev">
              <span className="dir">← Previous</span>
              <span className="title">{prevPost.title}</span>
            </Link>
            <Link to={`/blog/${nextPost.slug || slugifyTitle(nextPost.title) || nextPost.id}`} className="next">
              <span className="dir">Next →</span>
              <span className="title">{nextPost.title}</span>
            </Link>
          </div>
        </article>

        <aside className="sidebar">
          <div className="widget">
            <h3>Search</h3>
            <form className="search-form" role="search" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">Go</button>
            </form>
          </div>

          <div className="widget">
            <h3>Recent Posts</h3>
            <ul className="recent-posts">
              {blogDatabase.map((item) => (
                <li key={item.id}>
                  <Link 
                    to={`/blog/${item.slug || slugifyTitle(item.title) || item.id}`}
                    className={item.id === post.id ? "current" : ""}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="widget">
            <h3>Categories</h3>
            <ul className="categories">
              <li><Link to="/blog">Home Healthcare <span className="count">(4)</span></Link></li>
              <li><Link to="/blog">Home Nursing <span className="count">(2)</span></Link></li>
              <li><Link to="/blog">Home Physiotherapy <span className="count">(3)</span></Link></li>
              <li><Link to="/blog">Doctor on Call <span className="count">(2)</span></Link></li>
              <li><Link to="/blog">Uncategorized <span className="count">(1)</span></Link></li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  );
}
