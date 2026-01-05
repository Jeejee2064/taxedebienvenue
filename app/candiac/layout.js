import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

// --- SEO METADATA ---
export const metadata = {
  title: 'Calculateur Taxe de Bienvenue Candiac 2026 | Droits de Mutation',
  description: 'Estimez vos droits de mutation à Candiac en 2026. Calculez les frais pour le Vieux-Candiac, le quartier Symphonie ou Montcalm. Experts en financement sur la Rive-Sud.',
  keywords: [
    'taxe de bienvenue candiac 2026',
    'calculateur droits de mutation candiac',
    'immobilier candiac rive-sud',
    'prix maison candiac 2026',
    'quartier symphonie candiac',
    'vieux-candiac immobilier',
    'courtier hypothécaire candiac',
    'taxe de bienvenue montérégie'
  ],
  alternates: {
    canonical: 'https://taxedebienvenue.ca/candiac',
  },
  openGraph: {
    title: 'Calculateur Taxe de Bienvenue Candiac 2026',
    description: 'Planifiez votre achat immobilier à Candiac avec notre calculateur de taxe de bienvenue précis et gratuit.',
    url: 'https://taxedebienvenue.ca/candiac',
    siteName: 'Taxe de Bienvenue Canada',
    images: [
      {
        url: 'https://imgs.search.brave.com/xH5KqLMH0vQJ5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2FuZGlhYy5jYS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8w/MS9wYXJjLWhhZW5k/ZWwtY2FuZGlhYy5q/cGc',
        width: 1200,
        height: 630,
        alt: 'Parc Haendel à Candiac - Calculateur de taxe de bienvenue',
      },
    ],
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taxe de Bienvenue Candiac 2026 - Estimation Rive-Sud',
    description: 'Calculez instantanément vos frais de mutation pour votre future propriété à Candiac.',
    images: ['https://imgs.search.brave.com/xH5KqLMH0vQJ5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2FuZGlhYy5jYS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8w/MS9wYXJjLWhhZW5k/ZWwtY2FuZGlhYy5q/cGc'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#0072bc', // Bleu dynamique pour Candiac
  width: 'device-width',
  initialScale: 1,
};

export default function CandiacLayout({ children }) {
  // --- STRUCTURED DATA (JSON-LD) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Calculateur Taxe de Bienvenue Candiac",
        "operatingSystem": "All",
        "applicationCategory": "FinanceApplication",
        "description": "Calculateur gratuit des droits de mutation pour la ville de Candiac (Rive-Sud) selon les barèmes 2026.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "CAD"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Quelle est la taxe de bienvenue pour une maison de 550 000 $ à Candiac ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pour une propriété de 550 000 $ à Candiac en 2026, la taxe de bienvenue s'élève à environ 6 403,50 $."
            }
          },
          {
            "@type": "Question",
            "name": "Quand doit-on payer la taxe de bienvenue à Candiac ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La facture est généralement expédiée 30 jours après l'inscription de l'acte de vente et doit être payée dans les 30 jours suivants."
            }
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "Expert Hypothécaire Candiac - Rive-Sud",
        "image": "https://imgs.search.brave.com/xH5KqLMH0vQJ5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2FuZGlhYy5jYS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8w/MS9wYXJjLWhhZW5k/ZWwtY2FuZGlhYy5q/cGc",
        "url": "https://taxedebienvenue.ca/candiac",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Candiac",
          "addressRegion": "QC",
          "addressCountry": "CA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 45.3855,
          "longitude": -73.5233
        }
      }
    ]
  };

  return (
    <div className={inter.className}>
      <Script
        id="json-ld-candiac"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}