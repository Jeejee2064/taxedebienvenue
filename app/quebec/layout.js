import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

// --- SEO METADATA ---
export const metadata = {
  title: 'Calculateur Taxe de Bienvenue Québec 2026 | Droits de Mutation',
  description: 'Calculez vos droits de mutation à Québec en 2026. Profitez de notre outil gratuit, découvrez les taux par tranche et les modalités de paiement en 3 versements.',
  keywords: [
    'taxe de bienvenue québec 2026',
    'calculateur droits de mutation québec',
    'taxe de bienvenue ville de québec',
    'prix immobilier québec 2026',
    'courtier hypothécaire québec',
    'paiement taxe de bienvenue trois versements',
    'achat maison québec'
  ],
  alternates: {
    canonical: 'https://taxedebienvenue.ca/quebec',
  },
  openGraph: {
    title: 'Calculateur Taxe de Bienvenue Québec 2026',
    description: 'Estimez précisément vos droits de mutation immobilière dans la Capitale-Nationale.',
    url: 'https://taxedebienvenue.ca/quebec',
    siteName: 'Taxe de Bienvenue Canada',
    images: [
      {
        url: 'https://imgs.search.brave.com/fxK8_YPZHqQJN3dqKLPfxuD9vXEJKV9xGgQKLMQH_Yc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTMx/ODYzODM3L3Bob3Rv/L2NoYXRlYXUtZnJv/bnRlbmFjLWFuZC1v/bGQtcXVlYmVjLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1G/WW0zVzBRWDU3LTk1/TzY4OVFIc2JxR0Rw/ZHRhbGp0SmdsUW1K/TDNnQWRnPQ',
        width: 1200,
        height: 630,
        alt: 'Le Château Frontenac à Québec - Calculateur de taxe de bienvenue',
      },
    ],
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taxe de Bienvenue Québec 2026 - Calculateur Gratuit',
    description: 'Calculez vos frais de mutation à Québec et découvrez les programmes d\'aide.',
    images: ['https://imgs.search.brave.com/fxK8_YPZHqQJN3dqKLPfxuD9vXEJKV9xGgQKLMQH_Yc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTMx/ODYzODM3L3Bob3Rv/L2NoYXRlYXUtZnJv/bnRlbmFjLWFuZC1v/bGQtcXVlYmVjLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1G/WW0zVzBRWDU3LTk1/TzY4OVFIc2JxR0Rw/ZHRhbGp0SmdsUW1K/TDNnQWRnPQ'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#004a99', // Bleu institutionnel souvent associé à Québec
  width: 'device-width',
  initialScale: 1,
};

export default function QuebecLayout({ children }) {
  // --- STRUCTURED DATA (JSON-LD) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Calculateur Taxe de Bienvenue Québec",
        "operatingSystem": "All",
        "applicationCategory": "FinanceApplication",
        "description": "Logiciel de calcul des droits de mutation pour la ville de Québec selon les barèmes 2026.",
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
            "name": "Peut-on payer la taxe de bienvenue en plusieurs fois à Québec ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, la Ville de Québec permet le paiement en trois versements égaux sans intérêts à 30, 90 et 150 jours pour les montants supérieurs à 300 $."
            }
          },
          {
            "@type": "Question",
            "name": "Quels sont les taux de la taxe de bienvenue à Québec en 2026 ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Québec applique les taux de 0,5% (jusqu'à 61 500 $), 1,0% (61 500 $ à 307 800 $) et 1,5% pour la portion excédant 307 800 $."
            }
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "Expert Hypothécaire Québec - Taxe de Bienvenue",
        "image": "https://imgs.search.brave.com/fxK8_YPZHqQJN3dqKLPfxuD9vXEJKV9xGgQKLMQH_Yc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTMx/ODYzODM3L3Bob3Rv/L2NoYXRlYXUtZnJv/bnRlbmFjLWFuZC1v/bGQtcXVlYmVjLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1G/WW0zVzBRWDU3LTk1/TzY4OVFIc2JxR0Rw/ZHRhbGp0SmdsUW1K/TDNnQWRnPQ",
        "url": "https://taxedebienvenue.ca/quebec",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Québec",
          "addressRegion": "QC",
          "addressCountry": "CA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 46.8139,
          "longitude": -71.2080
        }
      }
    ]
  };

  return (
    <div className={inter.className}>
      <Script
        id="json-ld-quebec"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}