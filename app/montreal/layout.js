import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

// --- SEO METADATA ---
export const metadata = {
  title: 'Calculateur Taxe de Bienvenue Montréal 2026 | Droits de Mutation',
  description: 'Estimez gratuitement vos droits de mutation immobilière (taxe de bienvenue) à Montréal en 2026. Calculez vos frais selon les nouveaux taux et découvrez les programmes d\'exonération.',
  keywords: [
    'taxe de bienvenue montreal 2026',
    'calculateur taxe de bienvenue',
    'droits de mutation montreal',
    'achat immobilier montreal',
    'courtier hypothécaire montréal',
    'prix maison montreal 2026',
    'taxe de bienvenue québec calculation'
  ],
  alternates: {
    canonical: 'https://taxedebienvenue.ca/montreal',
  },
  openGraph: {
    title: 'Calculateur Taxe de Bienvenue Montréal 2026',
    description: 'Calculez instantanément vos droits de mutation pour votre futur achat immobilier à Montréal.',
    url: 'https://taxedebienvenue.ca/montreal',
    siteName: 'Taxe de Bienvenue Canada',
    images: [
      {
        url: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/494000/494753-montreal.jpg',
        width: 1200,
        height: 630,
        alt: 'Vue aérienne de Montréal - Calculateur de taxe de bienvenue',
      },
    ],
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculateur Taxe de Bienvenue Montréal 2026',
    description: 'Estimez vos frais de mutation immobilière à Montréal en quelques secondes.',
    images: ['https://a.travel-assets.com/findyours-php/viewfinder/images/res70/494000/494753-montreal.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function MontrealLayout({ children }) {
  // --- STRUCTURED DATA (JSON-LD) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Calculateur de Taxe de Bienvenue Montréal",
        "operatingSystem": "All",
        "applicationCategory": "FinanceApplication",
        "description": "Outil gratuit pour calculer les droits de mutation immobilière à Montréal selon les taux de 2026.",
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
            "name": "Qu'est-ce que la taxe de bienvenue à Montréal ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La taxe de bienvenue, officiellement appelée droit de mutation immobilière, est un impôt municipal que tout acheteur doit payer lors du transfert de propriété à Montréal."
            }
          },
          {
            "@type": "Question",
            "name": "Quand doit-on payer la taxe de bienvenue ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La Ville de Montréal envoie la facture environ 30 jours après l'inscription de l'acte de vente au registre foncier."
            }
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "Taxe de Bienvenue Montréal - Services Hypothécaires",
        "image": "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/494000/494753-montreal.jpg",
        "@id": "https://taxedebienvenue.ca/montreal",
        "url": "https://taxedebienvenue.ca/montreal",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Montréal",
          "addressRegion": "QC",
          "addressCountry": "CA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 45.5017,
          "longitude": -73.5673
        }
      }
    ]
  };

  return (
    <section className={inter.className}>
      {/* Insertion du JSON-LD pour Google */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Contenu de la page (page.js) */}
      <main>
        {children}
      </main>
    </section>
  );
}