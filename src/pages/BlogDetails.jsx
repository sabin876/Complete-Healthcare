import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { API_BASE_URL } from "../config/api";
import { slugifyTitle, getCategoryFallbackImage, DUMMY_IMAGE } from "./Blog";
import { useSSRData } from "../context/SSRDataContext";
import SEO from "../components/SEO";

const blogDatabase = [
  {
    id: 1,
    slug: "what-is-physiotherapy-a-comprehensive-guide",
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
      <h2>When Should You Seek Home Physiotherapy?</h2>
      <p>If you or an elderly family member experience limited mobility, chronic joint pain, recovering from knee/hip replacement, or neurological disorders, structured home physiotherapy delivers hospital-grade clinical outcomes in the privacy of your home.</p>
    `
  },
  {
    id: 2,
    slug: "steps-in-total-knee-replacement",
    category: "TOTAL KNEE REPLACEMENT (TKR)",
    title: "Steps in Total Knee Replacement",
    author: "Dr. Ulhas Sonar",
    authorBio: "Dr. Ulhas Sonar is a senior orthopedic consultant specializing in precision knee replacement.",
    date: "May 30, 2026",
    heroImage: "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?w=1200&q=80",
    tags: ["Orthopedics", "Knee Replacement", "Surgery"],
    content: `
      <p>Total Knee Replacement (TKR) is a transformative surgical procedure designed to alleviate severe pain and restore mobility in patients with end-stage arthritis. Here is a comprehensive overview of the surgical steps involved in precision knee arthroplasty.</p>
      <h2>Step 1: Patient Preparation & Anesthesia</h2>
      <p>Prior to surgery, the patient is thoroughly evaluated, vital signs are stabilized, and regional or general anesthesia is administered.</p>
      <h2>Step 2: Joint Exposure & Bone Preparation</h2>
      <p>A midline anterior incision provides exposure to the damaged joint surfaces. Specialized instrumentation is used to resurface the femur and tibia with millimeter accuracy.</p>
      <h2>Step 3: Trial Component Fitting & Ligament Balancing</h2>
      <p>Trial implants verify stable range of motion, accurate flexion-extension gaps, and proper kinematic tracking.</p>
      <h2>Step 4: Definitive Prosthesis Fixation</h2>
      <p>High-grade biocompatible cobalt-chromium or titanium components with medical-grade polyethylene inserts are secured in place.</p>
    `
  },
  {
    id: 3,
    slug: "the-evolution-of-tkr-implants",
    category: "TKR IMPLANTS",
    title: "The Evolution of TKR Implants",
    author: "Dr. Ulhas Sonar",
    authorBio: "Dr. Ulhas Sonar specializes in joint reconstruction and implant biomechanics.",
    date: "May 30, 2026",
    heroImage: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80",
    tags: ["Implant Technology", "Knee Replacement", "Orthopedics"],
    content: `
      <p>Total Knee Replacement implants have advanced significantly over recent decades, moving from simple hinged mechanisms to highly sophisticated anatomical designs that mimic natural kinematics.</p>
      <h2>Modern Biocompatible Materials</h2>
      <p>Contemporary implants feature highly cross-linked polyethylene inserts, titanium backings, and oxidized zirconium articulating surfaces that significantly reduce wear and increase longevity.</p>
    `
  },
  {
    id: 4,
    slug: "alignment-concept-total-knee-replacement",
    category: "KNEE-REPLACEMENT",
    title: "Alignment concept: Total Knee Replacement",
    author: "Dr. Ulhas Sonar",
    authorBio: "Dr. Ulhas Sonar writes on joint kinematics and surgical biomechanics.",
    date: "May 30, 2026",
    heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    tags: ["Alignment", "Surgical Technique", "Knee Replacement"],
    content: `
      <p>Exploring modern alignment strategies in total knee replacement, including mechanical alignment, anatomical alignment, and kinematic alignment to achieve optimal stability and natural patient joint feel.</p>
      <h2>Kinematic vs Mechanical Alignment</h2>
      <p>While mechanical alignment aims for a neutral 180-degree hip-knee-ankle axis, kinematic alignment restores the patient's individual pre-arthritic joint line, often yielding greater patient satisfaction.</p>
    `
  },
  {
    id: 5,
    slug: "advantages-of-stem-cells-regenerative-medicine-supports-healing-and-recovery",
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
      <h2>What Makes Stem Cells Unique?</h2>
      <p>Stem cells can differentiate into specialized cell types while releasing bioactive factors that recruit the body's natural healing cascades.</p>
    `
  },
  {
    id: 6,
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
      <h2>The Advantage of Doorstep Healthcare</h2>
      <p>With immediate 30-45 minute response across Dubai, on-site diagnostics, and electronic prescriptions, doctor on call provides hospital-grade treatment in the comfort of your own home or hotel room.</p>
    `
  },
  {
    id: 7,
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
      <h2>Personalized Care Plans</h2>
      <p>Experienced DHA-licensed nurses provide vital signs tracking, wound dressing, glucose monitoring, and physician coordination to reduce hospital readmissions and enhance daily quality of life.</p>
    `
  },
  {
    id: 8,
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
      <h2>Restorative Therapies</h2>
      <p>From personalized IV hydration therapy to routine preventative health checks, home medical support helps busy professionals regain vitality without clinic queues.</p>
    `
  },
  {
    id: 9,
    slug: "post-surgical-kinematic-alignment-in-tkr",
    category: "KNEE-REPLACEMENT",
    title: "Post-Surgical Kinematic Alignment in TKR",
    author: "Dr. Ulhas Sonar",
    authorBio: "Dr. Ulhas Sonar is a senior orthopedic consultant specializing in precision knee replacement.",
    date: "June 14, 2026",
    heroImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&q=80",
    tags: ["Knee Replacement", "Kinematic Alignment", "Orthopedics"],
    content: `
      <p>Kinematic alignment (KA) is an innovative surgical philosophy in Total Knee Replacement (TKR) that aims to restore the patient's individual pre-arthritic constitutional joint line and ligament balance rather than imposing a standardized 180-degree mechanical axis.</p>
      <h2>Key Benefits of Kinematic Alignment</h2>
      <p>By respecting native soft tissue tension, kinematic alignment significantly reduces post-operative pain, minimizes the need for extensive ligament releases, and provides patients with a knee that feels natural throughout deep flexion and daily activities.</p>
      <h2>Patient Selection & Surgical Precision</h2>
      <p>Modern preoperative planning and intraoperative caliper-verified resection ensure high precision, allowing surgeons to preserve joint biomechanics and accelerate rehabilitation.</p>
    `
  },
  {
    id: 10,
    slug: "patient-specific-implants-3d-precision",
    category: "TKR IMPLANTS",
    title: "Patient-Specific Implants & 3D Precision",
    author: "Dr. Ulhas Sonar",
    authorBio: "Dr. Ulhas Sonar is a senior orthopedic consultant specializing in precision knee replacement.",
    date: "June 25, 2026",
    heroImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&q=80",
    tags: ["Implants", "3D Precision", "TKR"],
    content: `
      <p>Every human knee has a unique shape, curvature, and rotational geometry. Patient-Specific Instrumentation (PSI) and 3D precision implants leverage high-resolution CT or MRI scans to tailor prosthetic components to the patient's exact anatomy.</p>
      <h2>Custom Cutting Guides & Perfect Fit</h2>
      <p>Pre-operative 3D modeling generates customized disposable cutting guides that match the patient's unique bony contours, ensuring accurate component placement, reduced surgical time, and decreased blood loss.</p>
      <h2>Implant Longevity and Functional Recovery</h2>
      <p>Optimal implant sizing and anatomical alignment eliminate bone overhang and reduce contact stress on polyethylene inserts, promoting implant durability and allowing active patients to return quickly to their favorite physical routines.</p>
    `
  },
  {
    id: 11,
    slug: "recovery-timeline-rehabilitation-milestones",
    category: "TOTAL KNEE REPLACEMENT (TKR)",
    title: "Recovery Timeline & Rehabilitation Milestones",
    author: "Dr. Ulhas Sonar",
    authorBio: "Dr. Ulhas Sonar is a senior orthopedic consultant specializing in precision knee replacement.",
    date: "July 02, 2026",
    heroImage: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1200&q=80",
    tags: ["Rehabilitation", "Recovery", "Physical Therapy"],
    content: `
      <p>Recovering from Total Knee Replacement is a progressive journey requiring structured physical therapy, home nursing assistance, and consistent patient engagement. Understanding what to expect at each stage helps patients achieve maximum mobility and independence.</p>
      <h2>Weeks 1 to 2: Early Mobility & Wound Care</h2>
      <p>The primary goals are edema management, active quadriceps activation, full knee extension, and gentle flexion up to 90 degrees. Patients begin walking with assistive devices and receive specialized home nursing support.</p>
      <h2>Weeks 3 to 6: Strength & Daily Function</h2>
      <p>Patients transition to unassisted walking, increase flexion beyond 110 degrees, and practice stair climbing under the guidance of a dedicated physiotherapist.</p>
      <h2>Weeks 7 to 12+: Long-term Independence</h2>
      <p>Focus shifts to cardiovascular conditioning, low-impact sports, and lasting joint protection to enjoy lifelong pain-free movement.</p>
    `
  }
];

export default function BlogDetails() {
  const { id, slug } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const ssrData = useSSRData();

  const targetParam = (slug || id || '').toString().toLowerCase().trim().replace(/^\/blog\//, '').replace(/\/$/, '');
  const cleanLookup = targetParam.replace(/^the-/, '');

  // Helper to match a post strictly by slug or ID
  const findPost = (param) => {
    if (!param) return null;
    const clean = param.toString().toLowerCase().trim().replace(/^\/blog\//, '').replace(/\/$/, '');
    const cleanNoThe = clean.replace(/^the-/, '');

    // 1. Check ssrData ONLY if it actually matches current slug or ID!
    if (ssrData && ssrData.blogPost) {
      const ssrSlug = (ssrData.blogPost.slug || slugifyTitle(ssrData.blogPost.title || '')).toLowerCase();
      const ssrId = String(ssrData.blogPost.id || '');
      if (ssrSlug === clean || ssrSlug.replace(/^the-/, '') === cleanNoThe || ssrId === clean) {
        return ssrData.blogPost;
      }
    }

    // 2. Exact match in blogDatabase
    let match = blogDatabase.find((p) => {
      const pSlug = (p.slug || slugifyTitle(p.title)).toLowerCase();
      const pId = String(p.id);
      return pSlug === clean || pId === clean || slugifyTitle(p.title) === clean;
    });
    if (match) return match;

    // 3. Match without 'the-' prefix
    match = blogDatabase.find((p) => {
      const pSlug = (p.slug || slugifyTitle(p.title)).toLowerCase().replace(/^the-/, '');
      return pSlug === cleanNoThe;
    });
    if (match) return match;

    // 4. Substring / Prefix match
    if (clean.length >= 6) {
      match = blogDatabase.find((p) => {
        const pSlug = (p.slug || slugifyTitle(p.title)).toLowerCase();
        return pSlug.includes(clean) || clean.includes(pSlug);
      });
      if (match) return match;
    }

    return null;
  };

  const initialPost = findPost(targetParam) || (targetParam ? {
    id: 999,
    slug: targetParam,
    category: "Medical Article",
    title: targetParam.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    author: "CORx Healthcare",
    authorBio: "Medical insights curated by our clinical healthcare team in Dubai.",
    date: "2026",
    heroImage: DUMMY_IMAGE,
    tags: ["Healthcare"],
    content: "<p>Loading article details...</p>"
  } : blogDatabase[0]);

  const [post, setPost] = useState(initialPost);
  const articleId = post ? post.id : 1;

  // Crucial: Update post immediately when targetParam changes (client navigation)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const localMatch = findPost(targetParam);
    if (localMatch) {
      setPost(localMatch);
    } else if (targetParam) {
      setPost({
        id: 999,
        slug: targetParam,
        category: "Medical Article",
        title: targetParam.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        author: "CORx Healthcare",
        authorBio: "Medical insights curated by our clinical healthcare team in Dubai.",
        date: "2026",
        heroImage: DUMMY_IMAGE,
        tags: ["Healthcare"],
        content: "<p>Loading article details...</p>"
      });
    }

    if (targetParam) {
      const fetchSlug = targetParam.trim().toLowerCase();
      fetch(`${API_BASE_URL}/api/blogs/${fetchSlug}/`)
        .then(res => {
          if (!res.ok) {
            const alt = fetchSlug.startsWith('the-') ? fetchSlug.replace(/^the-/, '') : `the-${fetchSlug}`;
            return fetch(`${API_BASE_URL}/api/blogs/${alt}/`);
          }
          return res;
        })
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
              author: data.author || 'Dr. Ulhas Sonar',
              authorBio: data.author_bio || 'Medical specialist providing healthcare and clinical guidance.',
              date: data.date || 'May 30, 2026',
              heroImage: data.image && !data.image.includes('placeholder') ? data.image : getCategoryFallbackImage(data.tag || data.category),
              tags: [data.tag || data.category || 'Healthcare'].filter(Boolean),
              content: data.content || `<p>${data.excerpt || data.title}</p>`,
              excerpt: data.excerpt || undefined,
              meta_title: data.meta_title || '',
              meta_description: data.meta_description || '',
              og_title: data.og_title || '',
              og_description: data.og_description || '',
              og_image: data.og_image || ''
            });
          }
        })
        .catch(err => {
          console.log('Django API offline or failed, using local blog match:', err);
        });
    }
  }, [targetParam]);

  const pageTitle = post?.meta_title || (post?.title ? `${post.title} | CORx Healthcare Blog Dubai` : 'CORx Home Healthcare Blog');
  const pageDesc = post?.meta_description || post?.excerpt || (post?.title ? `Read ${post.title} on CORx Home Healthcare Blog.` : 'Explore the CORx Home Healthcare Blog for expert health tips, home care advice, and wellness guides.');
  const ogTitle = post?.og_title || pageTitle;
  const ogDesc = post?.og_description || pageDesc;
  const postSlug = post?.slug || slugifyTitle(post?.title || 'article');
  const postImage = post?.og_image || post?.heroImage || 'https://corx.ae/og-image.jpg';

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post?.title,
    description: pageDesc,
    image: postImage,
    author: {
      '@type': 'Organization',
      name: post?.author || 'CORx Healthcare',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CORx Healthcare',
      logo: {
        '@type': 'ImageObject',
        url: 'https://corx.ae/favicon.webp',
      },
    },
    datePublished: post?.date || '2026-05-22',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://corx.ae/${postSlug}`,
    },
  };

  const currentIndex = blogDatabase.findIndex(p => p.id === post?.id || p.slug === post?.slug);
  const prevPost = currentIndex > 0 ? blogDatabase[currentIndex - 1] : blogDatabase[blogDatabase.length - 1];
  const nextPost = currentIndex >= 0 && currentIndex < blogDatabase.length - 1 ? blogDatabase[currentIndex + 1] : blogDatabase[0];

  return (
    <div style={{ backgroundColor: "#eef2f6", color: "#3a3f47", fontFamily: "Georgia, 'Times New Roman', serif", minHeight: "100vh", paddingTop: "95px", paddingBottom: "50px" }}>
      <SEO
        title={pageTitle}
        description={pageDesc}
        ogTitle={ogTitle}
        ogDescription={ogDesc}
        canonical={`https://corx.ae/${postSlug}`}
        ogImage={postImage}
        ogType="article"
        schema={blogSchema}
      />
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

          <img 
            src={post.heroImage || getCategoryFallbackImage(post?.category)} 
            alt={post.title} 
            className="article-hero"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = getCategoryFallbackImage(post?.category);
            }} 
          />

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
            <Link to={`/${prevPost.slug || slugifyTitle(prevPost.title) || prevPost.id}`} className="prev">
              <span className="dir">← Previous</span>
              <span className="title">{prevPost.title}</span>
            </Link>
            <Link to={`/${nextPost.slug || slugifyTitle(nextPost.title) || nextPost.id}`} className="next">
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
                    to={`/${item.slug || slugifyTitle(item.title) || item.id}`}
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
