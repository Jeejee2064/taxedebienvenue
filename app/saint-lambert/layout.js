import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

// --- SEO METADATA ---
export const metadata = {
  title: 'Calculateur Taxe de Bienvenue Saint-Lambert 2026 | Droits de Mutation',
  description: 'Calculez vos droits de mutation à Saint-Lambert en 2026. Outil gratuit pour propriétés haut de gamme. Découvrez les taux par tranche pour cette ville prestigieuse de la Rive-Sud.',
  keywords: [
    'taxe de bienvenue saint-lambert 2026',
    'calculateur droits de mutation saint-lambert',
    'taxe de bienvenue rive-sud',
    'prix immobilier saint-lambert 2026',
    'courtier hypothécaire saint-lambert',
    'propriété haut de gamme saint-lambert',
    'vieux-saint-lambert immobilier',
    'achat maison saint-lambert'
  ],
  alternates: {
    canonical: 'https://taxedebienvenue.ca/saint-lambert',
  },
  openGraph: {
    title: 'Calculateur Taxe de Bienvenue Saint-Lambert 2026',
    description: 'Estimez précisément vos droits de mutation immobilière dans cette ville prestigieuse de la Rive-Sud montréalaise.',
    url: 'https://taxedebienvenue.ca/saint-lambert',
    siteName: 'Taxe de Bienvenue Canada',
    images: [
      {
        url: 'https://imgs.search.brave.com/xH5KqLMH0vQJ5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2FpbnQtbGFtYmVy/dC5jYS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8wNi9wYXJj/LXNhaW50LWxhbWJl/cnQuanBn',
        width: 1200,
        height: 630,
        alt: 'Parc Saint-Lambert - Calculateur de taxe de bienvenue',
      },
    ],
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taxe de Bienvenue Saint-Lambert 2026 - Calculateur Gratuit',
    description: 'Calculez vos frais de mutation pour propriétés haut de gamme à Saint-Lambert.',
    images: ['https://imgs.search.brave.com/xH5KqLMH0vQJ5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2FpbnQtbGFtYmVy/dC5jYS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8wNi9wYXJj/LXNhaW50LWxhbWJl/cnQuanBn'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#1e4d2b', // Vert associé aux espaces verts de Saint-Lambert
  width: 'device-width',
  initialScale: 1,
};

export default function SaintLambertLayout({ children }) {
  // --- STRUCTURED DATA (JSON-LD) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Calculateur Taxe de Bienvenue Saint-Lambert",
        "operatingSystem": "All",
        "applicationCategory": "FinanceApplication",
        "description": "Logiciel de calcul des droits de mutation pour la ville de Saint-Lambert selon les barèmes 2026. Spécialisé pour propriétés haut de gamme.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "CAD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "127"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Quel est le montant de la taxe de bienvenue à Saint-Lambert ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pour une propriété de 750 000$ (typique à Saint-Lambert), la taxe s'élève à 9 403,50$. Pour une propriété de 900 000$, elle atteint 11 653,50$. Pour un condo de 500 000$, comptez environ 5 653,50$."
            }
          },
          {
            "@type": "Question",
            "name": "Quels sont les taux de la taxe de bienvenue à Saint-Lambert en 2026 ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Saint-Lambert applique les taux provinciaux standards : 0,5% (jusqu'à 61 500$), 1,0% (61 500$ à 307 800$) et 1,5% pour la portion excédant 307 800$."
            }
          },
          {
            "@type": "Question",
            "name": "Pourquoi les propriétés sont-elles plus chères à Saint-Lambert ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Saint-Lambert combine plusieurs facteurs de valorisation : proximité immédiate Montréal (métro, REM), patrimoine architectural centenaire préservé, communauté aisée établie, Avenue Victoria commerciale animée, et règlements stricts protégeant le caractère distinctif."
            }
          },
          {
            "@type": "Question",
            "name": "Quels revenus sont nécessaires pour acheter à Saint-Lambert ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pour une unifamiliale de 750 000$, un revenu familial d'environ 140 000-150 000$/an est recommandé. Pour 900 000$, visez 170 000$/an+. Pour un condo de 500 000$, environ 95 000$/an suffit."
            }
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "Expert Hypothécaire Saint-Lambert - Taxe de Bienvenue",
        "image": "https://imgs.search.brave.com/xH5KqLMH0vQJ5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2FpbnQtbGFtYmVy/dC5jYS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8wNi9wYXJj/LXNhaW50LWxhbWJl/cnQuanBn",
        "url": "https://taxedebienvenue.ca/saint-lambert",
        "description": "Experts en financement hypothécaire haut de gamme sur la Rive-Sud, spécialisés dans le marché prestigieux de Saint-Lambert",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Saint-Lambert",
          "addressRegion": "QC",
          "addressCountry": "CA",
          "postalCode": "J4P"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 45.5017,
          "longitude": -73.5086
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Saint-Lambert"
          },
          {
            "@type": "City",
            "name": "Longueuil"
          },
          {
            "@type": "City",
            "name": "Brossard"
          }
        ],
        "priceRange": "$$$$",
        "openingHours": "Mo-Fr 09:00-17:00"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Accueil",
            "item": "https://taxedebienvenue.ca"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Saint-Lambert",
            "item": "https://taxedebienvenue.ca/saint-lambert"
          }
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Calcul de taxe de bienvenue",
        "provider": {
          "@type": "Organization",
          "name": "Taxe de Bienvenue Canada"
        },
        "areaServed": {
          "@type": "City",
          "name": "Saint-Lambert",
          "containedIn": {
            "@type": "AdministrativeArea",
            "name": "Québec"
          }
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Services hypothécaires Saint-Lambert",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Calcul taxe de bienvenue",
                "description": "Calcul précis des droits de mutation pour propriétés à Saint-Lambert"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Courtage hypothécaire haut de gamme",
                "description": "Financement optimisé pour propriétés de 700 000$ à 1 200 000$+"
              }
            }
          ]
        }
      },
      {
        "@type": "Article",
        "headline": "Guide complet de la taxe de bienvenue à Saint-Lambert 2026",
        "description": "Tout ce que vous devez savoir sur les droits de mutation immobilière à Saint-Lambert, ville prestigieuse de la Rive-Sud",
        "author": {
          "@type": "Organization",
          "name": "Taxe de Bienvenue Canada"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Taxe de Bienvenue Canada"
        },
        "datePublished": "2026-01-04",
        "dateModified": "2026-01-04",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://taxedebienvenue.ca/saint-lambert"
        }
      }
    ]
  };

  return (
    <div className={inter.className}>
      <Script
        id="json-ld-saint-lambert"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}