import { servicesData as staticServicesData } from '../data/servicesData.js';
import { blogPosts as rawBlogList } from '../data/blogPosts.js';

export const BASE_SITE_URL = 'https://corx.ae';
export const DEFAULT_OG_IMAGE = 'https://corx.ae/og-image.jpg';

// Static fallback detailed blogs
const staticBlogDatabase = [
  {
    id: 1,
    slug: 'advantages-of-stem-cells-regenerative-medicine',
    category: 'Home Healthcare',
    title: 'Advantages of Stem Cells: Regenerative Medicine Supports Healing and Recovery',
    author: 'Corx',
    authorBio: 'Corx writes on regenerative medicine, home healthcare, and recovery-focused treatment options, translating clinical research into practical guidance for patients and caregivers.',
    date: 'May 22, 2026',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    tags: ['Regenerative Medicine', 'Stem Cells', 'Recovery', 'Healthcare'],
    excerpt: 'Explore how stem cell therapies and regenerative medicine support natural tissue healing, cellular renewal, and recovery in modern healthcare.',
    meta_title: 'Advantages of Stem Cells: Regenerative Medicine | CORx Healthcare Dubai',
    meta_description: 'Explore how stem cell therapies and regenerative medicine support natural tissue healing, cellular renewal, and recovery in modern healthcare.',
    content: `
      <p>Stem cells are probably one of the most significant breakthroughs in modern regenerative medicine because they have this incredible ability to help repair tissue, renew cells, and aid the healing process within the body. Unlike regular cells, stem cells can actually regenerate themselves, and they can even turn into different kinds of specialized cells, such as muscle cells, cartilage cells, nerve cells, blood cells, and heart cells, to name a few.</p>
      <p>This is one of the big reasons why the benefits of stem cells are being talked about all over the healthcare world, in regenerative medicine, orthopedics, neurology, sports medicine, and chronic disease research. Rather than just treating the symptoms of a condition, stem cell therapy is increasingly being looked at as a possible way to actually help the body fix itself, by supporting recovery, tissue repair, and regulation of inflammation.</p>
    `
  },
  {
    id: 2,
    slug: 'what-is-physiotherapy-comprehensive-guide',
    category: 'Home Physiotherapy',
    title: 'WHAT IS PHYSIOTHERAPY? A COMPREHENSIVE GUIDE',
    author: 'Corx',
    authorBio: 'Corx writes on physical therapy, mobility restoration, and post-surgical rehabilitation.',
    date: 'April 16, 2026',
    heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    tags: ['Home Physiotherapy', 'Rehabilitation', 'Recovery'],
    excerpt: 'Comprehensive guide to home physiotherapy in Dubai, covering exercise therapy, post-op rehabilitation, pain relief, and mobility restoration.',
    meta_title: 'What is Physiotherapy? Comprehensive Guide | CORx Healthcare Dubai',
    meta_description: 'Discover the complete guide to physiotherapy at home in Dubai: benefits, conditions treated, and how specialized physiotherapists restore mobility.',
    content: `
      <p>Physiotherapy is a primary healthcare profession that promotes wellness, mobility, and independence. It assists patients of all ages who are affected by injury, illness, or disability through movement, exercise, manual therapy, and education.</p>
      <h2>Key Benefits of Physiotherapy</h2>
      <p>Physiotherapy helps patients regain full function, manage chronic pain, avoid surgery, and recover quickly after major orthopedic procedures.</p>
    `
  },
  {
    id: 3,
    slug: 'burnout-in-working-professionals-signs-solutions',
    category: 'Home Healthcare',
    title: 'Burnout in Working Professionals: Signs & Solutions',
    author: 'Corx',
    authorBio: 'Corx writes on wellness, executive health assessment, and preventative medicine.',
    date: 'March 18, 2026',
    heroImage: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80',
    tags: ['Healthcare', 'Wellness', 'Workplace Health'],
    excerpt: 'Recognize the critical signs of executive burnout and discover medical and lifestyle solutions to restore energy and cognitive performance.',
    meta_title: 'Burnout in Working Professionals: Signs & Solutions | CORx Healthcare',
    meta_description: 'Learn how to identify and manage professional burnout in Dubai. Explore executive wellness checkups, IV therapy, and at-home medical support.',
    content: `
      <p>Professional burnout affects mental and physical health. Learn key indicators and effective at-home health solutions to restore your energy and focus.</p>
    `
  },
  {
    id: 4,
    slug: 'doctor-at-home-vs-hospital-visit',
    category: 'Doctor on Call',
    title: "Doctor at Home vs Hospital Visit: What's Better in 2026?",
    author: 'Corx',
    authorBio: 'Corx writes on 24/7 home physician care and emergency primary response.',
    date: 'February 12, 2026',
    heroImage: 'https://images.unsplash.com/photo-1580281657527-47f249e8f4df?w=1200&q=80',
    tags: ['Doctor on Call', 'Home Care', 'Dubai Healthcare'],
    excerpt: 'Compare on-demand home doctor visits with emergency room waiting times in Dubai for speed, comfort, safety, and clinical outcomes.',
    meta_title: "Doctor at Home vs Hospital Visit: What's Better? | CORx Healthcare",
    meta_description: 'Find out why booking a 24/7 doctor on call in Dubai provides fast, comfortable, and hospital-grade medical care in the comfort of your home.',
    content: `
      <p>Comparing home physician visits against hospital ER waiting rooms. Discover why calling a doctor directly to your doorstep in Dubai is fast, comfortable, and safe.</p>
    `
  },
  {
    id: 5,
    slug: 'managing-chronic-conditions-with-home-healthcare',
    category: 'Home Nursing',
    title: 'Managing Chronic Conditions With Home Healthcare Support',
    author: 'Corx',
    authorBio: 'Corx writes on home nursing, chronic disease management, and elderly care.',
    date: 'January 20, 2026',
    heroImage: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1200&q=80',
    tags: ['Home Nursing', 'Chronic Care', 'Elderly Care'],
    excerpt: 'How personalized home nursing and clinical monitoring empower patients with hypertension, diabetes, and cardiovascular conditions in Dubai.',
    meta_title: 'Managing Chronic Conditions with Home Healthcare | CORx Healthcare',
    meta_description: 'Discover how dedicated home nurses in Dubai manage chronic illnesses with regular vitals monitoring, medication support, and doctor oversight.',
    content: `
      <p>Managing long-term illness requires structured clinical monitoring, medication oversight, and compassionate nursing assistance right in the comfort of your home.</p>
    `
  }
];

export function slugifyText(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Find static fallback data for a service slug.
 */
export function getStaticServiceData(slug) {
  if (!slug) return {};
  const clean = slug.toLowerCase().trim();
  const alt1 = clean.replace(/docotor/g, 'doctor');
  const alt2 = clean.replace(/doctor/g, 'docotor');
  const altNoHyphen = clean.replace(/-/g, '');

  return (
    staticServicesData[clean] ||
    staticServicesData[alt1] ||
    staticServicesData[alt2] ||
    staticServicesData[altNoHyphen] ||
    (clean.includes('nurs') ? staticServicesData['nursing'] : null) ||
    (clean.includes('iv') ? staticServicesData['iv-therapy'] : null) ||
    (clean.includes('doctor') ? staticServicesData['doctor-on-call'] : null) ||
    (clean.includes('elder') ? staticServicesData['elderly-care'] : null) ||
    (clean.includes('lab') ? staticServicesData['lab-services'] : null) ||
    (clean.includes('physio') ? staticServicesData['physiotherapy'] : null) ||
    {}
  );
}

/**
 * Load service data from API with static fallback.
 */
export async function loadServiceData(slug, apiBaseUrl = 'http://localhost:8000') {
  if (!slug) {
    return {
      slug: '',
      serviceData: null,
      seo: null,
    };
  }

  const cleanSlug = slug.toLowerCase().trim();
  const staticFallback = getStaticServiceData(cleanSlug);
  let backendData = null;

  const candidateSlugs = [
    cleanSlug,
    cleanSlug.replace('doctor', 'docotor'),
    cleanSlug === 'doctor-on-call' ? 'docotor-on-call' : null,
    cleanSlug === 'lab-services' ? 'lab-test-at-home' : (cleanSlug === 'lab-test-at-home' ? 'lab-services' : null),
    cleanSlug === 'elderly-care' ? 'elderly-home-care' : (cleanSlug === 'elderly-home-care' ? 'elderly-care' : null),
    cleanSlug === 'iv-therapy' ? 'iv-therapy-iv-drip' : (cleanSlug === 'iv-therapy-iv-drip' ? 'iv-therapy' : null),
  ].filter((val, idx, arr) => Boolean(val) && arr.indexOf(val) === idx);

  const baseUrl = (apiBaseUrl || 'http://localhost:8000').replace(/\/+$/, '');
  for (const candidate of candidateSlugs) {
    try {
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timeoutId = controller ? setTimeout(() => controller.abort(), 1200) : null;

      const res = await fetch(`${baseUrl}/api/services/${candidate}/`, {
        signal: controller ? controller.signal : undefined,
        headers: { Accept: 'application/json' },
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          backendData = data;
          break;
        }
      }
    } catch {
      // Fallback to static data on timeout / network failure
    }
  }

  const validBackendData = backendData && typeof backendData === 'object' && !Array.isArray(backendData) ? backendData : null;

  const mergedData = validBackendData ? {
    ...staticFallback,
    ...validBackendData,
    title: validBackendData.title || staticFallback.title || cleanSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    eyebrow: validBackendData.eyebrow || staticFallback.eyebrow,
    tagline: validBackendData.tagline || staticFallback.tagline,
    description: validBackendData.description || staticFallback.description,
    features: (Array.isArray(validBackendData.features) && validBackendData.features.length > 0) ? validBackendData.features : (staticFallback.features || []),
    indications: (Array.isArray(validBackendData.indications) && validBackendData.indications.length > 0) ? validBackendData.indications : (staticFallback.indications || []),
    reasons: (Array.isArray(validBackendData.reasons) && validBackendData.reasons.length > 0) ? validBackendData.reasons : (staticFallback.reasons || []),
    steps: (Array.isArray(validBackendData.steps) && validBackendData.steps.length > 0) ? validBackendData.steps : (staticFallback.steps || []),
    faqs: (Array.isArray(validBackendData.faqs) && validBackendData.faqs.length > 0) ? validBackendData.faqs : (staticFallback.faqs || []),
    benefits: (Array.isArray(validBackendData.benefits) && validBackendData.benefits.length > 0) ? validBackendData.benefits : (staticFallback.benefits || []),
    lab_columns: (Array.isArray(validBackendData.lab_columns) && validBackendData.lab_columns.length > 0) ? validBackendData.lab_columns : (staticFallback.lab_columns || []),
  } : staticFallback;

  const pageTitle = mergedData?.meta_title || (mergedData?.title ? `${mergedData.title} in Dubai | CORx Healthcare` : 'CORx Healthcare: Home Health Care Services in Dubai *24/7');
  const pageDesc = mergedData?.meta_description || mergedData?.description || mergedData?.tagline || 'Get premium home health care services in Dubai with Corx Healthcare. Book expert doctors and nurses 24/7.';
  const serviceImageUrl = mergedData?.image_file || mergedData?.image || DEFAULT_OG_IMAGE;

  const seo = {
    title: pageTitle,
    description: pageDesc,
    ogTitle: pageTitle,
    ogDescription: pageDesc,
    ogImage: serviceImageUrl,
    ogType: 'website',
    canonicalUrl: `${BASE_SITE_URL}/${cleanSlug}`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'MedicalBusiness',
      name: 'CORx Healthcare',
      url: `${BASE_SITE_URL}/${cleanSlug}`,
      description: pageDesc,
      image: serviceImageUrl,
      telephone: '+97143320776',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Office 303, Royal Class Building, DIP',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '24.9981035',
        longitude: '55.1701128',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
        ],
        opens: '00:00',
        closes: '23:59'
      },
      serviceType: mergedData?.title || cleanSlug,
    },
  };

  return {
    slug: cleanSlug,
    serviceData: mergedData,
    seo,
  };
}

/**
 * Load single blog post data from API with static fallback.
 */
export async function loadBlogPostData(slugOrId, apiBaseUrl = 'http://localhost:8000') {
  if (!slugOrId) return null;
  const target = slugOrId.toString().toLowerCase().trim();

  let post = staticBlogDatabase.find(
    p => p.slug === target || p.id.toString() === target || slugifyText(p.title) === target
  );

  // If not found in detailed static blogs, check rawBlogList
  if (!post) {
    const rawPost = rawBlogList.find(
      p => p.id.toString() === target || slugifyText(p.title) === target
    );
    if (rawPost) {
      post = {
        id: rawPost.id,
        slug: slugifyText(rawPost.title),
        category: rawPost.category || 'Home Healthcare',
        title: rawPost.title,
        author: rawPost.author || 'Corx',
        authorBio: 'Corx writes on home healthcare, clinical care, and patient wellness in Dubai.',
        date: rawPost.date || '2026',
        heroImage: rawPost.image && !rawPost.image.includes('placeholder') ? rawPost.image : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
        tags: [rawPost.category || 'Healthcare'],
        excerpt: rawPost.excerpt,
        content: rawPost.content,
      };
    }
  }

  // Attempt to fetch fresh data from backend
  const baseUrl = (apiBaseUrl || 'http://localhost:8000').replace(/\/+$/, '');
  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 1200) : null;

    const res = await fetch(`${baseUrl}/api/blogs/${target}/`, {
      signal: controller ? controller.signal : undefined,
      headers: { Accept: 'application/json' },
    });

    if (timeoutId) clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.title) {
        post = {
          id: data.id || (post ? post.id : 1),
          slug: data.slug || slugifyText(data.title),
          category: data.tag || data.category || (post ? post.category : 'Home Healthcare'),
          title: data.title,
          author: data.author || 'Corx',
          authorBio: 'Corx writes on regenerative medicine, home healthcare, and recovery-focused treatment options.',
          date: data.date || (post ? post.date : 'May 22, 2026'),
          heroImage: data.image && !data.image.includes('placeholder') ? data.image : (data.image_file || (post ? post.heroImage : DEFAULT_OG_IMAGE)),
          tags: [data.tag || data.category || 'Healthcare'],
          content: data.content || (post ? post.content : ''),
          excerpt: data.excerpt || (post ? post.excerpt : ''),
          meta_title: data.meta_title || '',
          meta_description: data.meta_description || '',
        };
      }
    }
  } catch {
    // Keep static fallback
  }

  if (!post) {
    post = staticBlogDatabase[0];
  }

  const postSlug = post.slug || slugifyText(post.title);
  const pageTitle = post.meta_title || `${post.title} | CORx Healthcare Blog Dubai`;
  const pageDesc = post.meta_description || post.excerpt || `Read ${post.title} on CORx Healthcare Blog Dubai.`;
  const postImage = post.heroImage || post.image_file || post.image || DEFAULT_OG_IMAGE;

  const seo = {
    title: pageTitle,
    description: pageDesc,
    ogTitle: pageTitle,
    ogDescription: pageDesc,
    ogImage: postImage,
    ogType: 'article',
    canonicalUrl: `${BASE_SITE_URL}/blog/${postSlug}`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: pageDesc,
      image: postImage,
      author: {
        '@type': 'Organization',
        name: post.author || 'CORx Healthcare',
      },
      publisher: {
        '@type': 'Organization',
        name: 'CORx Healthcare',
        logo: {
          '@type': 'ImageObject',
          url: 'https://corx.ae/favicon.webp',
        },
      },
      datePublished: post.date || '2026-05-22',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${BASE_SITE_URL}/blog/${postSlug}`,
      },
    },
  };

  return {
    blogPost: post,
    seo,
  };
}

/**
 * Match any incoming request pathname and load complete SSR data and SEO metadata.
 * @param {string} pathname 
 * @param {string} backendUrl 
 * @returns {Promise<{ statusCode: number, initialData: object | null, seo: object }>}
 */
export async function matchRouteAndLoadSEO(pathname, backendUrl = 'http://localhost:8000') {
  const cleanPath = (pathname || '/').split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  const segments = cleanPath.split('/').filter(Boolean);

  // 1. Homepage ("/")
  if (cleanPath === '/') {
    return {
      statusCode: 200,
      initialData: null,
      seo: {
        title: 'CORX Healthcare: Home Health Care Services in Dubai *24/7',
        description: 'Get premium home health care services in Dubai with Corx Healthcare. Book expert doctors and nurses for physiotherapy, IV therapy, lab tests & elder care, available 24/7.',
        ogTitle: 'CORX Healthcare: Home Health Care Services in Dubai *24/7',
        ogDescription: 'Get premium home health care services in Dubai with Corx Healthcare. Book expert doctors and nurses for physiotherapy, IV therapy, lab tests & elder care, available 24/7.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        canonicalUrl: `${BASE_SITE_URL}/`,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'MedicalBusiness',
          name: 'CORx Healthcare',
          url: `${BASE_SITE_URL}/`,
          logo: 'https://corx.ae/favicon.webp',
          description: 'Get premium home health care services in Dubai with Corx Healthcare. Book expert doctors and nurses for physiotherapy, IV therapy, lab tests & elder care, available 24/7.',
          telephone: '+97143320776',
          priceRange: '$$',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Office 303, Royal Class Building, DIP',
            addressLocality: 'Dubai',
            addressCountry: 'AE',
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59',
          },
        },
      },
    };
  }

  // 2. Static Core Pages
  const first = segments[0] ? segments[0].toLowerCase() : '';

  if (first === 'about-us') {
    return {
      statusCode: 200,
      initialData: null,
      seo: {
        title: 'About Us | DHA-Licensed Home Healthcare in Dubai | CORx Healthcare',
        description: "Learn about CORx Healthcare, Dubai's premier DHA-licensed home healthcare provider offering 24/7 doctor home visits, home nursing, physiotherapy, and lab services.",
        ogTitle: 'About Us | DHA-Licensed Home Healthcare in Dubai | CORx Healthcare',
        ogDescription: "Learn about CORx Healthcare, Dubai's premier DHA-licensed home healthcare provider offering 24/7 doctor home visits, home nursing, physiotherapy, and lab services.",
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        canonicalUrl: `${BASE_SITE_URL}/about-us`,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About CORx Healthcare Dubai',
          url: `${BASE_SITE_URL}/about-us`,
          description: "DHA-licensed medical services, physiotherapy, and skilled nursing delivered directly to your doorstep across Dubai.",
        },
      },
    };
  }

  if (first === 'contact-us' || first === 'contact' || first === 'book-an-appointment') {
    return {
      statusCode: 200,
      initialData: null,
      seo: {
        title: 'Book an Appointment | Contact CORx Home Healthcare Dubai 24/7',
        description: 'Book an appointment with CORx Home Healthcare in Dubai. Contact our 24/7 medical team for doctor home visits, nursing, lab tests, and physiotherapy.',
        ogTitle: 'Book an Appointment | Contact CORx Home Healthcare Dubai 24/7',
        ogDescription: 'Book an appointment with CORx Home Healthcare in Dubai. Contact our 24/7 medical team for doctor home visits, nursing, lab tests, and physiotherapy.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        canonicalUrl: `${BASE_SITE_URL}/${first === 'contact' ? 'contact-us' : first}`,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Book an Appointment with CORx Healthcare',
          url: `${BASE_SITE_URL}/${first}`,
          telephone: '+97143320776',
        },
      },
    };
  }

  if (first === 'team') {
    return {
      statusCode: 200,
      initialData: null,
      seo: {
        title: 'Our Medical Team | DHA Licensed Doctors & Nurses | CORx Healthcare',
        description: 'Meet the expert medical team at CORx Healthcare Dubai. Our DHA-licensed doctors, registered nurses, and specialized physiotherapists provide 24/7 home care.',
        ogTitle: 'Our Medical Team | DHA Licensed Doctors & Nurses | CORx Healthcare',
        ogDescription: 'Meet the expert medical team at CORx Healthcare Dubai. Our DHA-licensed doctors, registered nurses, and specialized physiotherapists provide 24/7 home care.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        canonicalUrl: `${BASE_SITE_URL}/team`,
      },
    };
  }

  if (first === 'career') {
    return {
      statusCode: 200,
      initialData: null,
      seo: {
        title: 'Careers | Join CORx Healthcare Medical Team in Dubai',
        description: 'Explore healthcare careers at CORx Healthcare Dubai. We are hiring DHA-licensed doctors, registered nurses, physiotherapists, and clinical coordinators.',
        ogTitle: 'Careers | Join CORx Healthcare Medical Team in Dubai',
        ogDescription: 'Explore healthcare careers at CORx Healthcare Dubai. We are hiring DHA-licensed doctors, registered nurses, physiotherapists, and clinical coordinators.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        canonicalUrl: `${BASE_SITE_URL}/career`,
      },
    };
  }

  if (first === 'privacy-policy') {
    return {
      statusCode: 200,
      initialData: null,
      seo: {
        title: 'Privacy Policy | CORx Healthcare Dubai',
        description: 'Read the official privacy policy of CORx Healthcare Dubai regarding how we protect, process, and handle your confidential health and medical records.',
        ogTitle: 'Privacy Policy | CORx Healthcare Dubai',
        ogDescription: 'Read the official privacy policy of CORx Healthcare Dubai regarding how we protect, process, and handle your confidential health and medical records.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        canonicalUrl: `${BASE_SITE_URL}/privacy-policy`,
      },
    };
  }

  if (first === 'sitemap') {
    return {
      statusCode: 200,
      initialData: null,
      seo: {
        title: 'HTML Website Sitemap | CORx Healthcare Dubai',
        description: 'Browse the complete structure and pages of CORx Healthcare Dubai including all medical services, care guides, and official resources.',
        ogTitle: 'HTML Website Sitemap | CORx Healthcare Dubai',
        ogDescription: 'Browse the complete structure and pages of CORx Healthcare Dubai including all medical services, care guides, and official resources.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        canonicalUrl: `${BASE_SITE_URL}/sitemap`,
      },
    };
  }

  if (first === 'social-media' || first === 'socials' || first === 'connect') {
    return {
      statusCode: 200,
      initialData: null,
      seo: {
        title: 'Connect & Official Social Media | CORx Healthcare Dubai',
        description: 'Connect with CORx Healthcare Dubai across official platforms: WhatsApp, Instagram, LinkedIn, Facebook, and Google Maps.',
        ogTitle: 'Connect & Official Social Media | CORx Healthcare Dubai',
        ogDescription: 'Connect with CORx Healthcare Dubai across official platforms: WhatsApp, Instagram, LinkedIn, Facebook, and Google Maps.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        canonicalUrl: `${BASE_SITE_URL}/social-media`,
      },
    };
  }

  // 3. Blog Routes
  if (first === 'blog') {
    // List /blog
    if (segments.length === 1) {
      return {
        statusCode: 200,
        initialData: null,
        seo: {
          title: 'CORx Healthcare Blog — Health Tips, Care Guides & Medical Advice Dubai',
          description: 'Explore the CORx Healthcare blog for expert health tips, home care advice, physiotherapy insights, and wellness guides across Dubai.',
          ogTitle: 'CORx Healthcare Blog — Health Tips, Care Guides & Medical Advice Dubai',
          ogDescription: 'Explore the CORx Healthcare blog for expert health tips, home care advice, physiotherapy insights, and wellness guides across Dubai.',
          ogImage: DEFAULT_OG_IMAGE,
          ogType: 'website',
          canonicalUrl: `${BASE_SITE_URL}/blog`,
        },
      };
    }

    // Detail /blog/:slug
    const blogSlug = segments[segments.length - 1];
    const loadedBlog = await loadBlogPostData(blogSlug, backendUrl);
    if (loadedBlog) {
      return {
        statusCode: 200,
        initialData: {
          blogPost: loadedBlog.blogPost,
        },
        seo: loadedBlog.seo,
      };
    }
  }

  // 4. Portal / Dashboard (Private -> noindex, nofollow)
  if (first === 'portal' || first === 'dashboard') {
    return {
      statusCode: 200,
      initialData: null,
      seo: {
        title: 'Staff & Admin Portal | CORx Healthcare',
        description: 'Secure staff and clinical management portal for CORx Healthcare.',
        robots: 'noindex, nofollow',
        canonicalUrl: `${BASE_SITE_URL}/${first}`,
      },
    };
  }

  // 5. Services Routes
  if (first === 'services' && segments.length === 1) {
    return {
      statusCode: 200,
      initialData: {
        isOverview: true,
        slug: null,
        serviceData: null,
      },
      seo: {
        title: 'Home Healthcare Services in Dubai | CORx Healthcare',
        description: 'From 24/7 doctor home visits and IV drip therapy to home nursing, physiotherapy, and lab tests — receive hospital-grade medical care directly in your home.',
        ogTitle: 'Home Healthcare Services in Dubai | CORx Healthcare',
        ogDescription: 'From 24/7 doctor home visits and IV drip therapy to home nursing, physiotherapy, and lab tests — receive hospital-grade medical care directly in your home.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        canonicalUrl: `${BASE_SITE_URL}/services`,
      },
    };
  }

  // /services/:slug or flat /:slug
  let targetServiceSlug = null;
  if ((first === 'services' || first === 'service') && segments.length >= 2) {
    targetServiceSlug = segments[segments.length - 1].toLowerCase();
  } else if (segments.length === 1 && !first.includes('.') && !first.startsWith('api')) {
    targetServiceSlug = first;
  }

  if (targetServiceSlug) {
    const loaded = await loadServiceData(targetServiceSlug, backendUrl);
    if (loaded && loaded.serviceData && Object.keys(loaded.serviceData).length > 0) {
      return {
        statusCode: 200,
        initialData: {
          slug: loaded.slug,
          serviceData: loaded.serviceData,
          isOverview: false,
        },
        seo: loaded.seo,
      };
    }
  }

  // 6. 404 Not Found Page
  return {
    statusCode: 404,
    initialData: null,
    seo: {
      title: '404 - Page Not Found | CORx Healthcare Dubai',
      description: 'The requested page could not be found. Explore our 24/7 home healthcare services in Dubai at CORx Healthcare.',
      robots: 'noindex, nofollow',
      canonicalUrl: `${BASE_SITE_URL}/404`,
    },
  };
}
