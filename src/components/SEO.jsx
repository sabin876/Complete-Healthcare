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

    // 1. Strict Document Title & Title Element Deduplication
    if (title) {
      document.title = title;
      const titleEls = document.querySelectorAll('title');
      for (let i = 1; i < titleEls.length; i++) {
        titleEls[i].remove();
      }
    }

    // Helper to strictly update a <meta> tag, removing ANY existing duplicate tags
    const updateMetaStrict = (querySelectors, primaryAttr, attrVal, contentVal) => {
      if (!contentVal) return;
      const matches = document.querySelectorAll(querySelectors);
      let targetEl = matches[0];

      // Remove all duplicate tags beyond the first
      for (let i = 1; i < matches.length; i++) {
        matches[i].remove();
      }

      if (!targetEl) {
        targetEl = document.createElement('meta');
        targetEl.setAttribute(primaryAttr, attrVal);
        document.head.appendChild(targetEl);
      } else {
        targetEl.setAttribute(primaryAttr, attrVal);
      }
      targetEl.setAttribute('content', contentVal);
    };

    // 2. Meta Description (Strictly Single Tag)
    if (description) {
      updateMetaStrict(
        'meta[name="description"], meta[property="description"]',
        'name',
        'description',
        description
      );
    }

    // 3. Robots Tag (Strictly Single Tag, or removed if public)
    if (robots) {
      updateMetaStrict('meta[name="robots"]', 'name', 'robots', robots);
    } else {
      const robotsEls = document.querySelectorAll('meta[name="robots"]');
      robotsEls.forEach(el => el.remove());
    }

    // 4. OpenGraph Tags (Strictly Single Tag for each property)
    const ogTitle = title;
    const ogDesc = description;
    if (ogTitle) {
      updateMetaStrict(
        'meta[property="og:title"], meta[name="og:title"]',
        'property',
        'og:title',
        ogTitle
      );
    }
    if (ogDesc) {
      updateMetaStrict(
        'meta[property="og:description"], meta[name="og:description"]',
        'property',
        'og:description',
        ogDesc
      );
    }
    if (ogType) {
      updateMetaStrict(
        'meta[property="og:type"], meta[name="og:type"]',
        'property',
        'og:type',
        ogType
      );
    }
    updateMetaStrict(
      'meta[property="og:site_name"], meta[name="og:site_name"]',
      'property',
      'og:site_name',
      'CORx Healthcare'
    );

    const defaultImage = 'https://corx.ae/og-image.jpg';
    const finalImage = ogImage || defaultImage;
    updateMetaStrict(
      'meta[property="og:image"], meta[name="og:image"]',
      'property',
      'og:image',
      finalImage
    );

    // 5. Twitter Card Tags (Strictly Single Tag for each property)
    updateMetaStrict(
      'meta[name="twitter:card"], meta[property="twitter:card"]',
      'name',
      'twitter:card',
      'summary_large_image'
    );
    if (ogTitle) {
      updateMetaStrict(
        'meta[name="twitter:title"], meta[property="twitter:title"]',
        'name',
        'twitter:title',
        ogTitle
      );
    }
    if (ogDesc) {
      updateMetaStrict(
        'meta[name="twitter:description"], meta[property="twitter:description"]',
        'name',
        'twitter:description',
        ogDesc
      );
    }
    updateMetaStrict(
      'meta[name="twitter:image"], meta[property="twitter:image"]',
      'name',
      'twitter:image',
      finalImage
    );

    // 6. Canonical URL (Strictly Single Tag)
    const cleanPath = window.location.pathname.endsWith('/') && window.location.pathname !== '/'
      ? window.location.pathname.slice(0, -1)
      : window.location.pathname;
    const origin = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
      ? window.location.origin
      : 'https://corx.ae';
    const computedCanonical = canonical || `${origin}${cleanPath}`;

    const canonicalEls = document.querySelectorAll('link[rel="canonical"]');
    let canonicalLink = canonicalEls[0];
    for (let i = 1; i < canonicalEls.length; i++) {
      canonicalEls[i].remove();
    }
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', computedCanonical);

    updateMetaStrict(
      'meta[property="og:url"], meta[name="og:url"]',
      'property',
      'og:url',
      computedCanonical
    );

    // 7. Structured JSON-LD Schema (Strictly Single Tag)
    const scriptEls = document.querySelectorAll('script[type="application/ld+json"][data-seo="true"]');
    if (schema) {
      let targetScript = scriptEls[0];
      for (let i = 1; i < scriptEls.length; i++) {
        scriptEls[i].remove();
      }
      if (!targetScript) {
        targetScript = document.createElement('script');
        targetScript.setAttribute('type', 'application/ld+json');
        targetScript.setAttribute('data-seo', 'true');
        document.head.appendChild(targetScript);
      }
      targetScript.textContent = typeof schema === 'string' ? schema : JSON.stringify(schema);
    } else {
      scriptEls.forEach(el => el.remove());
    }
  }, [title, description, canonical, ogImage, ogType, robots, schema]);

  return null;
}

export default SEO;
