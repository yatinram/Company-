import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://aventixsolutions.vercel.app';
const DEFAULT_TITLE = 'Aventrix Solutions — Transforming Ideas Into Digital Reality';
const DEFAULT_DESCRIPTION = 'Aventrix Solutions is a leading software development company delivering cutting-edge Web, Mobile, Cloud, AI & SaaS solutions for businesses worldwide.';
const DEFAULT_KEYWORDS = 'software development, web development company, mobile app development, custom AI solutions, SaaS development, enterprise software, digital transformation, Aventrix Solutions';
const DEFAULT_OG_IMAGE = `${SITE_URL}/aventrix-logo.png`;

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  schema = null,
  noIndex = false,
}) {
  const fullTitle = title
    ? `${title} | Aventrix Solutions`
    : DEFAULT_TITLE;
  
  const currentUrl = canonicalUrl ? `${SITE_URL}${canonicalUrl}` : SITE_URL;

  // Default Organization & Website Schema
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Aventrix Solutions',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/aventrix-logo.png`,
          caption: 'Aventrix Solutions Logo',
        },
        description: DEFAULT_DESCRIPTION,
        email: 'info@aventrixsolutions.com',
        sameAs: [
          'https://www.linkedin.com/company/aventrixsolutions',
          'https://twitter.com/aventrixsol',
          'https://github.com/aventrixsolutions'
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Aventrix Solutions',
        description: DEFAULT_DESCRIPTION,
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#service`,
        name: 'Aventrix Solutions',
        url: SITE_URL,
        image: `${SITE_URL}/aventrix-logo.png`,
        priceRange: '$$$',
        telephone: '+91 99999 99999',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'India',
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          opens: '09:00',
          closes: '19:00',
        },
      },
    ],
  };

  const schemaToRender = schema ? schema : defaultSchema;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="google-site-verification" content="bi1qn3wghtSRnnY8BcadaqW83-hJj76D5W4Px-_bvLA" />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Canonical Link */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Aventrix Solutions" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@aventrixsol" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(schemaToRender)}
      </script>
    </Helmet>
  );
}
