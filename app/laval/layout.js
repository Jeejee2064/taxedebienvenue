import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

// --- SEO METADATA ---
export const metadata = {
  title: 'Calculateur Taxe de Bienvenue Laval 2025 | Droits de Mutation',
  description: 'Estimez vos droits de mutation immobilière à Laval en 2025. Calculez vos frais pour Chomedey, Vimont ou Sainte-Rose et découvrez les options de paiement en 2 versements.',
  keywords: [
    'taxe de bienvenue laval 2025',
    'calculateur droits de mutation laval',
    'taxe de bienvenue chomedey',
    'immobilier laval 2025',
    'prix médian maison laval',
    'courtier hypothécaire laval',
    'paiement taxe de bienvenue laval',
    'achat maison laval'
  ],
  alternates: {
    canonical: 'https://taxedebienvenue.ca/laval',
  },
  openGraph: {
    title: 'Calculateur Taxe de Bienvenue Laval 2025',
    description: 'Calculez instantanément vos droits de mutation pour votre achat immobilier à Laval.',
    url: 'https://taxedebienvenue.ca/laval',
    siteName: 'Taxe de Bienvenue Canada',
    images: [
      {
        url: 'https://imgs.search.brave.com/9ZqY8YH0xQJ5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dG91cmlzbWVsYXZh/bC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTkvMDUvY2Vu/dHJlLXZpbGxlLWxh/dmFsLmpwZw',
        width: 1200,
        height: 630,
        alt: 'Centre-ville de Laval - Calculateur de taxe de bienvenue',
      },
    ],
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taxe de Bienvenue Laval 2025 - Estimation Rapide',
    description: 'Outil gratuit pour calculer vos droits de mutation à Laval.',
    images: ['https://imgs.search.brave.com/9ZqY8YH0xQJ5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dG91cmlzbWVsYXZh/bC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTkvMDUvY2Vu/dHJlLXZpbGxlLWxh/dmFsLmpwZw'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#e31837', // Rouge souvent associé à l'identité visuelle de Laval
  width: 'device-width',
  initialScale: 1,
};

export default function LavalLayout({ children }) {
  // --- STRUCTURED DATA (JSON-LD) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Calculateur Taxe de Bienvenue Laval",
        "operatingSystem": "All",
        "applicationCategory": "FinanceApplication",
        "description": "Calculateur gratuit des droits de mutation pour les 14 quartiers de Laval selon les taux 2025.",
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
            "name": "Quel est le montant de la taxe de bienvenue pour une maison de 600 000$ à Laval ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pour une propriété de 600 000$ à Laval en 2025, la taxe de bienvenue est de 7 153,50$."
            }
          },
          {
            "@type": "Question",
            "name": "Peut-on payer la taxe de bienvenue en plusieurs versements à Laval ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, pour les montants supérieurs à 300$, la Ville de Laval permet un paiement en deux versements."
            }
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "Expert Hypothécaire Laval - Taxe de Bienvenue",
        "image": "https://imgs.search.brave.com/9ZqY8YH0xQJ5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dG91cmlzbWVsYXZh/bC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTkvMDUvY2Vu/dHJlLXZpbGxlLWxh/dmFsLmpwZw",
        "url": "https://taxedebienvenue.ca/laval",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Laval",
          "addressRegion": "QC",
          "addressCountry": "CA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 45.5601,
          "longitude": -73.7121
        }
      }
    ]
  };

  return (
    <div className={inter.className}>
      <Script
        id="json-ld-laval"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}