const fs = require('fs');

const allPosts = [
  {
    title: "WHAT IS PHYSIOTHERAPY? A COMPREHENSIVE GUIDE",
    author: "Corx",
    date: "April 16, 2026",
    category: "Home Physiotherapy"
  },
  {
    title: "Burnout in Working Professionals: Signs & Solutions",
    author: "Corx",
    date: "March 18, 2026",
    category: "Home Healthcare"
  },
  {
    title: "Doctor at Home vs Hospital Visit: What’s Better in 2026?",
    author: "Corx",
    date: "February 12, 2026",
    category: "Home Healthcare"
  },
  {
    title: "Managing Chronic Conditions With Home Healthcare Support",
    author: "Corx",
    date: "January 20, 2026",
    category: "Home Healthcare"
  },
  {
    title: "10 Signs Your Loved One Might Need Home Nursing Care",
    author: "Corx",
    date: "January 6, 2026",
    category: "Home Nursing"
  },
  {
    title: "The Complete Guide to IV Therapy at Home",
    author: "Corx",
    date: "December 16, 2025",
    category: "Home Healthcare"
  },
  {
    title: "Pediatric Home Healthcare: Ensuring Comfort for Children",
    author: "Corx",
    date: "November 12, 2025",
    category: "Home Healthcare"
  },
  {
    title: "What to Expect From a Doctor at Home Visit",
    author: "Corx",
    date: "October 12, 2025",
    category: "Home Healthcare"
  },
  {
    title: "Why Home Healthcare Is Becoming Essential in Dubai",
    author: "Corx",
    date: "September 12, 2025",
    category: "Home Healthcare"
  },
  {
    title: "Why Post-Surgery Home Care is Essential for Recovery",
    author: "Corx",
    date: "August 28, 2025",
    category: "Home Healthcare"
  },
  {
    title: "Holistic Healing: Physiotherapy Plus Lifestyle Support at Home",
    author: "Corx",
    date: "August 21, 2025",
    category: "Home Physiotherapy"
  },
  {
    title: "Why Home Physiotherapy is the Future of Recovery?",
    author: "Corx",
    date: "July 30, 2025",
    category: "Home Physiotherapy"
  },
  {
    title: "Chronic Pain Solutions in Dubai: How Physiotherapy Can Help?",
    author: "Corx",
    date: "June 27, 2025",
    category: "Home Physiotherapy"
  },
  {
    title: "Hydration & Energy: The Role of IV Drips in Dubai’s Wellness Trend",
    author: "Corx",
    date: "June 24, 2025",
    category: "IV Therapy"
  },
  {
    title: "How Corx Healthcare Is Revolutionizing Doctor on Call Services in Dubai?",
    author: "Corx",
    date: "June 17, 2025",
    category: "Doctor on Call"
  },
  {
    title: "Elderly Care Services in Dubai: Providing Comfort and Dignity at Home",
    author: "Corx",
    date: "June 13, 2025",
    category: "Elderly Care"
  },
  {
    title: "How IV Therapy Is Changing Healthcare in Dubai: Boost Your Energy Today",
    author: "Corx",
    date: "June 11, 2025",
    category: "IV Therapy"
  },
  {
    title: "The Benefits of Home Nursing Services in Dubai: Care You Can Trust",
    author: "Corx",
    date: "June 5, 2025",
    category: "Home Nursing"
  }
];

let finalPosts = allPosts.map((post, idx) => ({
  id: idx + 1,
  title: post.title,
  category: post.category,
  date: post.date,
  author: post.author,
  image: "https://www.corx.ae/wp-content/uploads/placeholder.jpg",
  excerpt: "Read more about " + post.title + " and how it can help you achieve better health outcomes.",
  readTime: "5 min read",
  content: "<p>Full content for " + post.title + " coming soon.</p>"
}));

const fileContent = "export const blogPosts = " + JSON.stringify(finalPosts, null, 2) + ";\n";
fs.writeFileSync('./src/data/blogPosts.js', fileContent);
console.log('Successfully updated blogPosts.js with all 18 unique posts');
