import React, { useEffect } from 'react';

/**
 * Universal SEO component for managing title, meta description, og/twitter tags,
 * canonical link, robots directives, and JSON-LD schema without duplicates.
 */
export function SEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  robots,
  schema,
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Update Document Title
    if (title) {
      document.title = title;
    }

    // Helper to safely set/update a <meta> tag
    const updateMeta = (selector, attrName, attrVal, contentVal) => {
      if (!contentVal) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    // 2. Meta Description
    if (description) {
      updateMeta('meta[name="description"]', 'name', 'description', description);
    }

    // 3. Robots
    if (robots) {
      updateMeta('meta[name="robots"]', 'name', 'robots', robots);
    }

    // 4. OpenGraph Tags
    const ogTitle = title;
    const ogDesc = description;
    if (ogTitle) {
      updateMeta('meta[property="og:title"]', 'property', 'og:title', ogTitle);
    }
    if (ogDesc) {
      updateMeta('meta[property="og:description"]', 'property', 'og:description', ogDesc);
    }
    if (ogType) {
      updateMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    }
    updateMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'CORx Healthcare');

    const defaultImage = 'https://corx.ae/og-image.jpg';
    const finalImage = ogImage || defaultImage;
    updateMeta('meta[property="og:image"]', 'property', 'og:image', finalImage);

    // 5. Twitter Card Tags
    updateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    if (ogTitle) {
      updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', ogTitle);
    }
    if (ogDesc) {
      updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', ogDesc);
    }
    updateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', finalImage);

    // 6. Canonical URL
    const cleanPath = window.location.pathname.endsWith('/') && window.location.pathname !== '/'
      ? window.location.pathname.slice(0, -1)
      : window.location.pathname;
    const origin = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
      ? window.location.origin
      : 'https://corx.ae';
    const computedCanonical = canonical || `${origin}${cleanPath}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', computedCanonical);
    updateMeta('meta[property="og:url"]', 'property', 'og:url', computedCanonical);

    // 7. Structured JSON-LD Schema
    if (schema) {
      let scriptEl = document.querySelector('script[type="application/ld+json"][data-seo="true"]');
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.setAttribute('type', 'application/ld+json');
        scriptEl.setAttribute('data-seo', 'true');
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema);
    }
  }, [title, description, canonical, ogImage, ogType, robots, schema]);

  return null;
}

export default SEO;
