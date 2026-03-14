// =============================================================================
// JSON-LD Structured Data — RoThi Bouw
// =============================================================================
// Place this in your root layout.jsx inside <head> or as a <script> tag.
//
// This tells Google explicitly: "This is a local construction/carpentry business
// based in Reusel, serving the Eindhoven/Tilburg region." It helps you appear
// in Google Maps results and the local 3-pack (the map box that shows up when
// someone searches "aanemers- timmerbedrijf bij mij in de buurt").
// =============================================================================

export function LocalBusinessJsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'LFT-Works',
    description: 'Industriele automatisering, PLC software, en panelenbouw in regio Reusel, Eindhoven en Tilburg.',
    url: 'https://www.lft-works.nl',
    logo: 'https://www.lft-works.nl/assets/logo/light.png',

    // -- Location --
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kattenbos 11',
      addressLocality: 'Reusel',
      addressRegion: 'Noord-Brabant',
      postalCode: '5541 PJ',
      addressCountry: 'NL'
    },

    // -- Contact --
    telephone: '', // TODO: Fill in phone number (format: +31 6 12345678)
    email: 'info@lft-works.nl',

    // -- Coordinates (for Google Maps) --
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.3609,
      longitude: 5.1691
    },

    // -- Service area --
    areaServed: [
      {
        '@type': 'City',
        name: 'Reusel',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Noord-Brabant' }
      },
      {
        '@type': 'City',
        name: 'Eindhoven',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Noord-Brabant' }
      },
      {
        '@type': 'City',
        name: 'Tilburg',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Noord-Brabant' }
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Noord-Brabant'
      }
    ],

    // -- Services offered --
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Diensten',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'PLC Software', description: 'Ontwikkeling en implementatie van PLC software' }
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Panelenbouw', description: 'Constructie en installatie van elektrische panelen' }
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Advies', description: 'Professioneel advies op het gebied van industriële automatisering' }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Machine ombouw',
            description: 'Aanpassen, vervangen en optimaliseren van bestaande machines voor langere levensduur en betere prestaties'
          }
        }
      ]
    },

    // -- Business details --
    foundingDate: '2014',
    priceRange: '$$', // General indicator
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Bankoverschrijving',

    // -- Opening hours --
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '17:00'
      }
    ],

    // -- Social / profiles --
    sameAs: [
      // TODO: Add social media URLs
      // 'https://www.facebook.com/lftworks',
      // 'https://www.instagram.com/lftworks',
      // 'https://www.linkedin.com/company/lftworks',
    ]
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}
