import { servicesData as staticServicesData } from '../data/servicesData.js';

// Non-service reserved top-level routes
const NON_SERVICE_ROUTES = new Set([
  '',
  'about-us',
  'contact-us',
  'contact',
  'book-an-appointment',
  'team',
  'career',
  'privacy-policy',
  'sitemap',
  'blog',
  'dashboard',
  'portal',
  '404',
  'robots.txt',
  'sitemap.xml',
  'favicon.ico',
]);

/**
 * Match a requested pathname to determine if it is a service route and extract its slug.
 * @param {string} pathname - e.g. "/services/iv-therapy" or "/lab-test-at-home"
 * @returns {{ isService: boolean, isOverview: boolean, slug: string | null }}
 */
export function matchServiceRoute(pathname) {
  if (!pathname) return { isService: false, isOverview: false, slug: null };

  const cleanPath = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  const segments = cleanPath.split('/').filter(Boolean);

  // Home or root
  if (segments.length === 0) {
    return { isService: false, isOverview: false, slug: null };
  }

  // /services or /services/
  if (segments.length === 1 && segments[0].toLowerCase() === 'services') {
    return { isService: true, isOverview: true, slug: null };
  }

  // /services/:slug or /service/:slug
  if ((segments[0].toLowerCase() === 'services' || segments[0].toLowerCase() === 'service') && segments.length >= 2) {
    const lastPart = segments[segments.length - 1].toLowerCase();
    return { isService: true, isOverview: false, slug: lastPart };
  }

  const firstPart = segments[0].toLowerCase();

  // Known static/portal non-service routes
  if (NON_SERVICE_ROUTES.has(firstPart)) {
    return { isService: false, isOverview: false, slug: null };
  }

  // Blog subroutes
  if (firstPart === 'blog' || firstPart === 'portal') {
    return { isService: false, isOverview: false, slug: null };
  }

  // Asset or file extensions
  if (firstPart.includes('.') || firstPart.startsWith('assets') || firstPart.startsWith('api')) {
    return { isService: false, isOverview: false, slug: null };
  }

  // Single segment flat service route (e.g. /lab-test-at-home, /iv-therapy, /sports-injury-rehab)
  if (segments.length === 1) {
    return { isService: true, isOverview: false, slug: firstPart };
  }

  return { isService: false, isOverview: false, slug: null };
}

/**
 * Find static fallback data for a service slug.
 * @param {string} slug 
 * @returns {object}
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
 * Load service data with API fallback + static data merge.
 * @param {string} slug 
 * @param {string} apiBaseUrl 
 * @returns {Promise<{ slug: string, serviceData: object, seo: object }>}
 */
export async function loadServiceData(slug, apiBaseUrl = 'http://localhost:8000') {
  if (!slug) {
    return {
      slug: '',
      serviceData: null,
      seo: {
        title: 'Home Healthcare Services in Dubai | CORx Healthcare',
        description: 'From 24/7 doctor home visits and IV drip therapy to home nursing, physiotherapy, and lab tests across Dubai.',
      },
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

  // Attempt to fetch from backend API with timeout
  const baseUrl = (apiBaseUrl || 'http://localhost:8000').replace(/\/+$/, '');
  for (const candidate of candidateSlugs) {
    try {
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timeoutId = controller ? setTimeout(() => controller.abort(), 1500) : null;

      const res = await fetch(`${baseUrl}/api/services/${candidate}/`, {
        signal: controller ? controller.signal : undefined,
        headers: { 'Accept': 'application/json' },
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
      // Ignore network / timeout errors and fallback to static
    }
  }

  const validBackendData = (backendData && typeof backendData === 'object' && !Array.isArray(backendData)) ? backendData : null;

  const mergedData = validBackendData ? {
    ...staticFallback,
    ...validBackendData,
    title: validBackendData.title || staticFallback.title || cleanSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    eyebrow: validBackendData.eyebrow || staticFallback.eyebrow,
    tagline: validBackendData.tagline || staticFallback.tagline,
    description: validBackendData.description || staticFallback.description,
    about_section_title: validBackendData.about_section_title || staticFallback.about_section_title,
    indications_title: validBackendData.indications_title || staticFallback.indications_title,
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

  const seo = {
    title: pageTitle,
    description: pageDesc,
    ogTitle: pageTitle,
    ogDescription: pageDesc,
    canonicalUrl: `https://corx.ae/${cleanSlug}`,
    schema: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "CORx Healthcare",
      "url": `https://corx.ae/${cleanSlug}`,
      "description": pageDesc,
      "telephone": "+97143990800",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      },
      "serviceType": mergedData?.title || cleanSlug
    }
  };

  return {
    slug: cleanSlug,
    serviceData: mergedData,
    seo,
  };
}
