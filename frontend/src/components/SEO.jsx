import { useEffect } from 'react';

const SITE_URL = 'https://aventixsolutions.vercel.app';
const DEFAULT_TITLE = 'Aventrix Solutions — Custom Web, Mobile & AI Software Development';
const DEFAULT_DESCRIPTION = 'Aventrix Solutions is a top-tier software development and digital transformation company. We build high-performance Web Applications, Mobile Apps, Cloud Systems, and AI-powered solutions.';
const DEFAULT_KEYWORDS = 'software development company, web development agency, mobile app developers, AI software solutions, cloud computing, SaaS development, IT consulting, Aventrix Solutions';
const DEFAULT_OG_IMAGE = `${SITE_URL}/aventrix-logo.png`;

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  schema = null,
}) {
  const fullTitle = title
    ? `${title} | Aventrix Solutions`
    : DEFAULT_TITLE;
  
  const currentUrl = canonicalUrl ? `${SITE_URL}${canonicalUrl}` : SITE_URL;

  useEffect(() => {
    // 1. Title
    document.title = fullTitle;

    // Helper to set or create a meta tag
    const setMetaTag = (attribute, name, content) => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content || '');
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);

    // 3. OpenGraph Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', currentUrl);

    // 6. Structured Data Schema (JSON-LD)
    if (schema) {
      let scriptTag = document.getElementById('dynamic-page-schema');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'dynamic-page-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    }
  }, [fullTitle, description, keywords, currentUrl, ogType, ogImage, schema]);

  return null;
}
