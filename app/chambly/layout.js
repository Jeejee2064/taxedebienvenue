import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

// --- SEO METADATA ---
export const metadata = {
  title: 'Calculateur Taxe de Bienvenue Chambly 2025 | Droits de Mutation',
  description: 'Calculez vos droits de mutation immobilière à Chambly en 2025. Estimez vos frais pour le Vieux-Chambly ou le Quartier du Bassin et découvrez les conseils de nos experts.',
  keywords: [
    'taxe de bienvenue chambly 2025',
    'calculateur droits de mutation chambly',
    'immobilier chambly montérégie',
    'prix maison chambly 2025',
    'vieux-chambly achat maison',
    'courtier hypothécaire chambly',
    'taxe de bienvenue montérégie'
  ],
  alternates: {
    canonical: 'https://taxedebienvenue.ca/chambly',
  },
  openGraph: {
    title: 'Calculateur Taxe de Bienvenue Chambly 2025',
    description: 'Outil gratuit pour estimer vos droits de mutation à Chambly. Planifiez votre achat immobilier en Montérégie avec précision.',
    url: 'https://taxedebienvenue.ca/chambly',
    siteName: 'Taxe de Bienvenue Canada',
    images: [
      {
        url: 'https://imgs.search.brave.com/xQZGY5yzqKLQH8KqLMH0vQJ9dYZJH0qGKWH8YqLQH8K/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS1jZG4udHJpcGFk/dmlzb3IuY29tL21l/ZGlhL3Bob3RvLXMv/MWEvN2UvMmQvMmQv/Zm9ydC1jaGFtYmx5/LmpwZw',
        width: 1200,
        height: 630,
        alt: 'Fort Chambly - Lieu historique national et calculateur de taxe',
      },
    ],
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taxe de Bienvenue Chambly 2025 - Estimez vos frais',
    description: 'Calculez instantanément vos droits de mutation pour votre future maison à Chambly.',
    images: ['https://imgs.search.brave.com/xQZGY5yzqKLQH8KqLMH0vQJ9dYZJH0qGKWH8YqLQH8K/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS1jZG4udHJpcGFk/dmlzb3IuY29tL21l/ZGlhL3Bob3RvLXMv/MWEvN2UvMmQvMmQv/Zm9ydC1jaGFtYmx5/LmpwZw'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#4f46e5', // Un bleu indigo moderne pour la Montérégie
  width: 'device-width',
  initialScale: 1,
};

export default function ChamblyLayout({ children }) {
  // --- STRUCTURED DATA (JSON-LD) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Calculateur Taxe de Bienvenue Chambly",
        "operatingSystem": "All",
        "applicationCategory": "FinanceApplication",
        "description": "Logiciel gratuit de calcul des droits de mutation pour la ville de Chambly selon les taux standards de 2025.",
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
            "name": "Quel est le montant de la taxe de bienvenue pour une maison moyenne à Chambly ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pour une propriété au prix moyen de 547 089 $ à Chambly, la taxe de bienvenue s'élève à environ 6 359,84 $."
            }
          },
          {
            "@type": "Question",
            "name": "Quels sont les taux de la taxe de bienvenue à Chambly en 2025 ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Chambly utilise les taux provinciaux standards : 0,5% jusqu'à 61 500 $, 1,0% jusqu'à 307 800 $, et 1,5% pour l'excédent."
            }
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "Expert Hypothécaire Chambly - Droits de Mutation",
        "image": "https://imgs.search.brave.com/xQZGY5yzqKLQH8KqLMH0vQJ9dYZJH0qGKWH8YqLQH8K/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS1jZG4udHJpcGFk/dmlzb3IuY29tL21l/ZGlhL3Bob3RvLXMv/MWEvN2UvMmQvMmQv/Zm9ydC1jaGFtYmx5/LmpwZw",
        "url": "https://taxedebienvenue.ca/chambly",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Chambly",
          "addressRegion": "QC",
          "addressCountry": "CA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 45.4491,
          "longitude": -73.2878
        }
      }
    ]
  };

  return (
    <div className={inter.className}>
      <Script
        id="json-ld-chambly"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}