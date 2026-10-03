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
 * Normalize backend URL to IPv4 (127.0.0.1) on local environments
 * to avoid IPv6 timeout delays on Windows Node.js.
 */
export function resolveBackendUrl(apiBaseUrl) {
  const url = apiBaseUrl || process.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
  return url.replace('http://localhost:', 'http://127.0.0.1:').replace(/\/+$/, '');
}

/**
 * Resilient JSON fetch with timeout and graceful null fallback.
 */
export async function safeFetchJson(url, timeoutMs = 1500) {
  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
    const res = await fetch(url, {
      signal: controller ? controller.signal : undefined,
      headers: { Accept: 'application/json' },
    });
    if (timeoutId) clearTimeout(timeoutId);
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Graceful fallback on network timeout/failure
  }
  return null;
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
export async function loadServiceData(slug, apiBaseUrl = 'http://127.0.0.1:8000') {
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
    ...(cleanSlug.includes('lab') ? ['lab-services', 'lab-test-at-home', 'lab-test-at-home-dubai'] : []),
    ...(cleanSlug.includes('elder') ? ['elderly-home-care', 'elderly-care'] : []),
    ...(cleanSlug.includes('iv') ? ['iv-therapy-iv-drip', 'iv-therapy'] : []),
    ...(cleanSlug.includes('physio') ? ['physiotherapy', 'physiotherapy-at-home-in-dubai'] : []),
    ...(cleanSlug.includes('nurs') ? ['home-nursing', 'nursing'] : []),
    ...(cleanSlug.includes('doctor') ? ['doctor-on-call', 'doctor-at-home'] : []),
  ].filter((val, idx, arr) => Boolean(val) && arr.indexOf(val) === idx);

  const baseUrl = resolveBackendUrl(apiBaseUrl);
  for (const candidate of candidateSlugs) {
    const data = await safeFetchJson(`${baseUrl}/api/services/${candidate}/`, 1200);
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      backendData = data;
      break;
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

  const rawSchema = validBackendData?.schema || validBackendData?.schema_markup;
  let backendSchema = null;
  if (rawSchema) {
    if (typeof rawSchema === 'object') {
      backendSchema = rawSchema;
    } else if (typeof rawSchema === 'string') {
      const cleanJson = rawSchema.replace(/<script[^>]*>/gi, '').replace(/<\/script>/gi, '').trim();
      try {
        backendSchema = JSON.parse(cleanJson);
      } catch (e) {
        backendSchema = null;
      }
    }
  }

  const seo = {
    title: pageTitle,
    description: pageDesc,
    ogTitle: pageTitle,
    ogDescription: pageDesc,
    ogImage: serviceImageUrl,
    ogType: 'website',
    canonicalUrl: `${BASE_SITE_URL}/${cleanSlug}`,
    ...(backendSchema ? { schema: backendSchema } : {}),
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
export async function loadBlogPostData(slugOrId, apiBaseUrl = 'http://127.0.0.1:8000') {
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
  const baseUrl = resolveBackendUrl(apiBaseUrl);
  const data = await safeFetchJson(`${baseUrl}/api/blogs/${target}/`, 1200);
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
export async function matchRouteAndLoadSEO(pathname, backendUrl = 'http://127.0.0.1:8000') {
  const cleanPath = (pathname || '/').split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  const segments = cleanPath.split('/').filter(Boolean);
  const baseUrl = resolveBackendUrl(backendUrl);

  // 1. Homepage ("/")
  if (cleanPath === '/') {
    const homeData = await safeFetchJson(`${baseUrl}/api/homepage/`, 1500);

    const title = homeData?.meta_title?.trim() || 'CORX Healthcare: Home Health Care Services in Dubai *24/7';
    const description = homeData?.meta_description?.trim() || 'Get premium home health care services in Dubai with Corx Healthcare. Book expert doctors and nurses for physiotherapy, IV therapy, lab tests & elder care, available 24/7.';
    const canonical = homeData?.canonical_url?.trim() || `${BASE_SITE_URL}/`;
    const ogTitle = homeData?.og_title?.trim() || title;
    const ogDescription = homeData?.og_description?.trim() || description;
    const ogImage = homeData?.og_image?.trim() || DEFAULT_OG_IMAGE;

    let schema = {
      '@context': 'https://schema.org',
      '@type': 'MedicalBusiness',
      name: 'CORx Healthcare',
      url: `${BASE_SITE_URL}/`,
      logo: 'https://corx.ae/favicon.webp',
      description: description,
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
    };

    if (homeData?.schema_markup?.trim()) {
      try {
        schema = JSON.parse(homeData.schema_markup);
      } catch (e) {}
    }

    return {
      statusCode: 200,
      initialData: { isHomepage: true, ...homeData },
      seo: {
        title,
        description,
        ogTitle,
        ogDescription,
        ogImage,
        ogType: 'website',
        canonicalUrl: canonical,
        schema,
      },
    };
  }

  const first = segments[0] ? segments[0].toLowerCase() : '';

  // 2. Static Core Pages: About Us
  if (first === 'about-us') {
    return {
      statusCode: 200,
      initialData: { page: 'about-us' },
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

  // 3. Contact & Booking
  if (first === 'contact-us' || first === 'contact' || first === 'book-an-appointment') {
    const rawServices = await safeFetchJson(`${baseUrl}/api/services/`, 1200);
    const serviceTitles = (Array.isArray(rawServices) ? rawServices : (rawServices?.results || []))
      .map(s => s.title)
      .filter(Boolean);

    return {
      statusCode: 200,
      initialData: { page: 'contact', services: serviceTitles },
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

  // 4. Team Page
  if (first === 'team') {
    const teamData = await safeFetchJson(`${baseUrl}/api/team/`, 1500);

    return {
      statusCode: 200,
      initialData: { isTeam: true, team: Array.isArray(teamData) ? teamData : [] },
      seo: {
        title: 'Our Medical Team | DHA Licensed Doctors & Nurses | CORx Healthcare',
        description: 'Meet the expert medical team at CORx Healthcare Dubai. Our DHA-licensed doctors, registered nurses, and specialized physiotherapists provide 24/7 home care.',
        ogTitle: 'Our Medical Team | DHA Licensed Doctors & Nurses | CORx Healthcare',
        ogDescription: 'Meet the expert medical team at CORx Healthcare Dubai. Our DHA-licensed doctors, registered nurses, and specialized physiotherapists provide 24/7 home care.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        canonicalUrl: `${BASE_SITE_URL}/team`,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'MedicalOrganization',
          name: 'CORx Healthcare Dubai Medical Team',
          url: `${BASE_SITE_URL}/team`,
          description: 'DHA-licensed medical professionals and clinical caregivers delivering home healthcare in Dubai.',
        },
      },
    };
  }

  // 5. Career Page
  if (first === 'career') {
    return {
      statusCode: 200,
      initialData: { page: 'career' },
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

  // 6. Privacy Policy Page
  if (first === 'privacy-policy') {
    return {
      statusCode: 200,
      initialData: { page: 'privacy-policy' },
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

  // 7. Sitemap Page
  if (first === 'sitemap') {
    const [rawServices, rawBlogs] = await Promise.all([
      safeFetchJson(`${baseUrl}/api/services/`, 1500),
      safeFetchJson(`${baseUrl}/api/blogs/`, 1500),
    ]);

    const services = Array.isArray(rawServices) ? rawServices : (rawServices?.results || []);
    const blogs = Array.isArray(rawBlogs) ? rawBlogs : (rawBlogs?.results || []);

    return {
      statusCode: 200,
      initialData: { isSitemap: true, services, blogs },
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

  // 8. Social Media Page
  if (first === 'social-media' || first === 'socials' || first === 'connect') {
    return {
      statusCode: 200,
      initialData: { page: 'social-media' },
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

  // 9. Blog Routes
  if (first === 'blog') {
    // List /blog
    if (segments.length === 1) {
      const rawBlogs = await safeFetchJson(`${baseUrl}/api/blogs/`, 1500);
      let blogPosts = null;
      if (Array.isArray(rawBlogs) && rawBlogs.length > 0) {
        blogPosts = rawBlogs.map(item => ({
          id: item.id,
          slug: item.slug || slugifyText(item.title),
          tag: item.tag || item.category || 'HEALTHCARE',
          title: item.title,
          excerpt: item.excerpt || item.title,
          author: item.author || 'Dr. Ulhas Sonar',
          date: item.date || '2026-05-30',
          image: item.image && !item.image.includes('placeholder') ? item.image : (item.image_file || DEFAULT_OG_IMAGE),
        }));
      }

      return {
        statusCode: 200,
        initialData: { isBlogList: true, blogPosts },
        seo: {
          title: 'CORx Healthcare Blog — Health Tips, Care Guides & Medical Advice Dubai',
          description: 'Explore the CORx Healthcare blog for expert health tips, home care advice, physiotherapy insights, and wellness guides across Dubai.',
          ogTitle: 'CORx Healthcare Blog — Health Tips, Care Guides & Medical Advice Dubai',
          ogDescription: 'Explore the CORx Healthcare blog for expert health tips, home care advice, physiotherapy insights, and wellness guides across Dubai.',
          ogImage: DEFAULT_OG_IMAGE,
          ogType: 'website',
          canonicalUrl: `${BASE_SITE_URL}/blog`,
          schema: {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'CORx Healthcare Blog',
            description: 'Expert health tips, care guides, and medical advice from DHA-licensed clinicians in Dubai.',
            url: `${BASE_SITE_URL}/blog`,
          },
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
          isBlogDetail: true,
          blogPost: loadedBlog.blogPost,
        },
        seo: loadedBlog.seo,
      };
    }
  }

  // 10. Portal / Dashboard (Private -> noindex, nofollow)
  if (first === 'portal' || first === 'dashboard') {
    return {
      statusCode: 200,
      initialData: { isPortal: true },
      seo: {
        title: 'Staff & Admin Portal | CORx Healthcare',
        description: 'Secure staff and clinical management portal for CORx Healthcare.',
        robots: 'noindex, nofollow',
        canonicalUrl: `${BASE_SITE_URL}/${first}`,
      },
    };
  }

  // 11. Services Overview Route (/services)
  if (first === 'services' && segments.length === 1) {
    let allServicesSchema = null;
    let servicesList = [];
    const data = await safeFetchJson(`${baseUrl}/api/services/`, 1500);
    servicesList = Array.isArray(data) ? data : (data?.results || []);
    if (servicesList.length > 0) {
      allServicesSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'CORx Healthcare Services in Dubai',
        description: 'From 24/7 doctor home visits and IV drip therapy to home nursing, physiotherapy, and lab tests — receive hospital-grade medical care directly in your home.',
        itemListElement: servicesList.map((svc, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: `${BASE_SITE_URL}/${svc.custom_url_path ? svc.custom_url_path.replace(/^\//, '') : svc.slug}`,
          name: svc.title || svc.name,
          description: svc.description || svc.tagline || '',
        })),
      };
    }

    return {
      statusCode: 200,
      initialData: {
        isOverview: true,
        slug: null,
        serviceData: null,
        servicesList,
        servicesOverviewSchema: allServicesSchema,
      },
      seo: {
        title: 'Home Healthcare Services in Dubai | CORx Healthcare',
        description: 'From 24/7 doctor home visits and IV drip therapy to home nursing, physiotherapy, and lab tests — receive hospital-grade medical care directly in your home.',
        ogTitle: 'Home Healthcare Services in Dubai | CORx Healthcare',
        ogDescription: 'From 24/7 doctor home visits and IV drip therapy to home nursing, physiotherapy, and lab tests — receive hospital-grade medical care directly in your home.',
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        canonicalUrl: `${BASE_SITE_URL}/services`,
        ...(allServicesSchema ? { schema: allServicesSchema } : {}),
      },
    };
  }

  // 12. Service Detail Routes (/services/:slug, /services/:parent/:slug, /lab-test-at-home, etc.)
  let targetServiceSlug = null;
  if ((first === 'services' || first === 'service') && segments.length >= 2) {
    targetServiceSlug = segments[segments.length - 1].toLowerCase();
  } else if (segments.length === 1 && !first.includes('.') && !first.startsWith('api')) {
    targetServiceSlug = first;
  }

  // Handle aliases
  if (targetServiceSlug === 'elderly-care') targetServiceSlug = 'elderly-home-care';
  if (targetServiceSlug === 'physiotherapy') targetServiceSlug = 'physiotherapy-at-home-in-dubai';

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

  // 13. 404 Not Found Page
  return {
    statusCode: 404,
    initialData: { is404: true },
    seo: {
      title: '404 - Page Not Found | CORx Healthcare Dubai',
      description: 'The requested page could not be found. Explore our 24/7 home healthcare services in Dubai at CORx Healthcare.',
      robots: 'noindex, nofollow',
      canonicalUrl: `${BASE_SITE_URL}/404`,
    },
  };
}
