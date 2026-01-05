'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Calculator,
  TrendingUp,
  MapPin,
  Users,
  Building2,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';

// ======================
// CITY CONTENT CONFIGURATION
// ======================
const CITY_CONTENT = {
  // Basic city information
  city: {
    name: 'Chambly',
    displayName: 'Chambly',
    year: '2026',
    heroImage: 'https://imgs.search.brave.com/xQZGY5yzqKLQH8KqLMH0vQJ9dYZJH0qGKWH8YqLQH8K/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS1jZG4udHJpcGFk/dmlzb3IuY29tL21l/ZGlhL3Bob3RvLXMv/MWEvN2UvMmQvMmQv/Zm9ydC1jaGFtYmx5/LmpwZw',
  },

  // Available cities for the top bar
  availableCities: [
    { name: 'Montréal', path: '/montreal' },
    { name: 'Québec', path: '/quebec' },
    { name: 'Laval', path: '/laval' },
    { name: 'Chambly', path: '/' },
    { name: 'Candiac', path: '/candiac' },
    { name: 'Saint-Lambert', path: '/saint-lambert' },
  ],

  // Hero section
  hero: {
    title: 'Calculateur de Taxe de Bienvenue',
    subtitle: 'Estimez précisément vos droits de mutation immobilière à Chambly en 2026',
    features: [
      'Calcul instantané',
      'Taux 2026',
      '100% gratuit'
    ]
  },

  // Calculator section
  calculator: {
    title: 'Calculateur',
    subtitle: 'Taxe de bienvenue 2026',
    inputLabel: "Prix d'achat de la propriété",
    inputPlaceholder: '547 089',
    buttonText: 'Calculer maintenant',
    buttonHint: 'Appuyez sur Entrée ou cliquez sur le bouton pour calculer',
    resultTitle: 'Résultat',
    resultSubtitle: 'Estimation instantanée',
    resultLabel: 'Taxe totale',
    resultLocation: 'Chambly • 2026',
    emptyStateText: "Entrez un montant et cliquez\nsur calculer pour voir le résultat",
    breakdownTitle: 'Détails par tranche'
  },

  // Tax brackets (2026 rates for Chambly - provincial standard rates)
  taxBrackets: [
    { max: 61500, rate: 0.5, name: '0 $ à 61 500 $' },
    { max: 307800, rate: 1.0, name: '61 500 $ à 307 800 $' },
    { max: Infinity, rate: 1.5, name: 'Plus de 307 800 $' },
  ],

  // CTA Form section
  ctaForm: {
    title: 'Obtenez un accompagnement personnalisé',
    subtitle: 'Nos experts en financement hypothécaire vous aident à optimiser votre achat et à économiser sur votre taxe de bienvenue',
    formTitle: 'Formulaire Zoho',
    formDescription: 'Insérez votre formulaire Zoho ici pour capturer les leads',
    benefits: [
      { title: 'Consultation gratuite', description: 'Sans engagement' },
      { title: 'Meilleurs taux', description: 'Comparaison de 20+ prêteurs' },
      { title: 'Service personnalisé', description: 'Accompagnement complet' }
    ]
  },

  // Tax brackets display
  bracketsDisplay: {
    title: 'Grille des taux 2026',
    subtitle: 'Structure progressive des droits de mutation immobilière à Chambly',
    brackets: [
      { range: '0 $ à 61 500 $', rate: '0,5%', color: 'from-green-500 to-emerald-600' },
      { range: '61 500 $ à 307 800 $', rate: '1,0%', color: 'from-blue-500 to-cyan-600' },
      { range: 'Plus de 307 800 $', rate: '1,5%', color: 'from-purple-500 to-violet-600' },
    ]
  },

  // City statistics
  statistics: {
    title: 'Chambly en chiffres',
    subtitle: 'Une perle de la Montérégie',
    stats: [
      { icon: Users, value: '31 938', label: 'habitants (2026)' },
      { icon: TrendingUp, value: '+8%', label: 'croissance 2016-2021' },
      { icon: Building2, value: '8', label: 'districts électoraux' },
      { icon: Home, value: '547K$', label: 'prix moyen maison unifamiliale' },
    ]
  },

  // Neighborhoods
  neighborhoods: {
    title: 'Les secteurs de Chambly',
    subtitle: 'Découvrez les quartiers les plus prisés pour votre investissement immobilier',
    items: [
      {
        name: 'Le Fort et Vieux-Chambly',
        description: 'Cœur historique avec le Fort Chambly (1709-1711) classé lieu historique national. 279 bâtiments patrimoniaux, architecture unique et vues sur le bassin.',
        icon: '🏰',
      },
      {
        name: 'Le Quartier du Bassin',
        description: 'Développement récent prisé par les jeunes familles. Maisons modernes, parcs aménagés et accès privilégié aux activités nautiques.',
        icon: '⛵',
      },
      {
        name: 'Le Secteur des Patriotes',
        description: 'Quartier familial par excellence avec excellentes écoles et nombreux parcs. Environnement sécuritaire et vie communautaire active.',
        icon: '👨‍👩‍👧‍👦',
      },
      {
        name: 'Chambly-Ouest',
        description: 'Secteur résidentiel paisible développé depuis les années 1960. Arbres matures, terrains généreux et prix accessibles.',
        icon: '🌳',
      },
      {
        name: 'Parkwood et Longwood',
        description: 'Quartiers établis des années 1960-70 avec ambiance communautaire forte. Bungalows et maisons à étages sur terrains spacieux.',
        icon: '🏘️',
      },
      {
        name: 'Île Demers et Île aux Lièvres',
        description: 'Secteurs insulaires uniques et recherchés. Cadre exceptionnel en bordure de l\'eau avec vues imprenables sur le bassin.',
        icon: '🏝️',
      },
    ]
  },

  // Benefits section
  benefits: {
    title: 'Pourquoi choisir un courtier hypothécaire indépendant ?',
    subtitle: 'Maximisez vos économies et optimisez votre financement',
    items: [
      {
        title: 'Accès à 20+ prêteurs',
        description: 'Comparaison exhaustive incluant banques, Desjardins et prêteurs alternatifs pour trouver le meilleur taux.',
        icon: <Building2 className="w-8 h-8" />,
      },
      {
        title: 'Économies substantielles',
        description: "Chaque 0,1% économisé sur votre taux représente des milliers de dollars sur la durée du prêt.",
        icon: <DollarSign className="w-8 h-8" />,
      },
      {
        title: 'Service gratuit',
        description: 'Le courtier est rémunéré par la banque, ses services ne vous coûtent rien.',
        icon: <CheckCircle className="w-8 h-8" />,
      },
      {
        title: 'Expertise fiscale',
        description: 'Stratégies avancées comme la manœuvre Smith ou le MAPA pour optimiser votre situation.',
        icon: <TrendingUp className="w-8 h-8" />,
      },
      {
        title: 'Dossiers complexes',
        description: 'Solutions pour travailleurs autonomes, nouveaux arrivants et situations de crédit particulières.',
        icon: <Users className="w-8 h-8" />,
      },
      {
        title: 'Accompagnement complet',
        description: 'Support personnalisé du début à la fin, incluant la négociation et le suivi de votre dossier.',
        icon: <ArrowRight className="w-8 h-8" />,
      },
    ]
  },

  // Programs section
  programs: {
    title: "Programmes d'aide et exemptions",
    subtitle: "Réduisez ou éliminez votre taxe de bienvenue grâce aux exemptions légales",
    items: [
      {
        title: "Exemptions légales provinciales",
        description: [
          "Transferts entre conjoints (séparation/divorce)",
          "Transferts parents-enfants (conditions applicables)",
          "Legs par testament"
        ]
      },
      {
        title: "Nouvelles mesures fédérales 2024",
        description: [
          "Amortissement 30 ans pour premiers acheteurs",
          "Amortissement 30 ans pour maisons neuves",
          "Crédit d'impôt pour première habitation"
        ]
      }
    ]
  },

  // What is Welcome Tax section
  whatIsWelcomeTax: {
    title: "Qu'est-ce que la taxe de bienvenue à Chambly ?",
    content: [
      "La taxe de bienvenue, officiellement appelée droit de mutation immobilière, représente un impôt municipal que tout acheteur d'une propriété doit acquitter lors du transfert de propriété à Chambly. Cette contribution financière tire son appellation d'une croyance populaire erronée voulant qu'elle provienne du ministre Jean Bienvenue. L'historien Frédéric Lemieux a démontré que cette présomption était fausse, mais le nom est resté ancré dans le langage courant québécois.",
      "Cette taxe s'applique à l'acquisition de tout type de propriété résidentielle ou commerciale, qu'il s'agisse d'une maison unifamiliale, d'un condominium, d'un duplex, d'un triplex ou d'un immeuble à revenus. Le montant à payer varie selon la valeur de la transaction et représente une somme que les acheteurs doivent impérativement prévoir dans leur budget d'acquisition. À Chambly, comme dans la majorité des municipalités québécoises, les taux appliqués suivent les tranches provinciales standards sans majoration."
    ]
  },

  // How to Calculate section
  howToCalculate: {
    title: 'Comment calculer la taxe de bienvenue à Chambly en 2026 ?',
    sections: [
      {
        title: 'Base d\'imposition',
        content: "Le calcul des droits de mutation s'effectue sur la base d'imposition, qui correspond au montant le plus élevé parmi :",
        items: [
          "Le prix de vente inscrit dans l'acte notarié (excluant TPS et TVQ)",
          "La contrepartie stipulée pour le transfert",
          "La valeur marchande selon le rôle d'évaluation foncière multiplié par le facteur comparatif"
        ]
      },
      {
        title: 'Taux provinciaux applicables',
        content: "Chambly applique les taux provinciaux standards par tranches :",
        items: [
          "0 $ à 61 500 $ : taux de 0,5%",
          "61 500 $ à 307 800 $ : taux de 1,0%",
          "Plus de 307 800 $ : taux de 1,5%"
        ]
      }
    ],
    example: {
      title: 'Exemple de calcul détaillé',
      propertyValue: '547 089 $ (prix moyen 2024)',
      calculation: [
        { range: '0 $ à 61 500 $ × 0,5%', amount: '307,50 $' },
        { range: '61 500 $ à 307 800 $ × 1,0%', amount: '2 463,00 $' },
        { range: '307 800 $ à 547 089 $ × 1,5%', amount: '3 589,34 $' }
      ],
      total: '6 359,84 $'
    },
    paymentInfo: {
      title: 'Modalités de paiement',
      content: "La Ville de Chambly expédie la facture environ 30 jours suivant l'inscription de l'acte de vente. Le paiement doit s'effectuer en un seul versement dans les 30 jours. Le non-paiement entraîne des pénalités et intérêts."
    }
  },

  // Market Trends section
  marketTrends: {
    title: 'Marché immobilier de Chambly : tendances 2026',
    sections: [
      {
        title: 'Un marché attractif et stable',
        content: "Le marché immobilier de Chambly se distingue par sa stabilité et son excellent ratio prix sur salaire, parmi les meilleurs au Québec. En 2024, le prix moyen d'une maison unifamiliale s'établit à 547 089 $, avec des transactions variant de 249 900 $ à 1 399 000 $ selon le type et l'emplacement.",
        stats: [
          { label: 'Prix moyen unifamiliale 2024', value: '547 089 $' },
          { label: 'Part des unifamiliales', value: '66%' },
          { label: 'Part des condos', value: '34%' },
          { label: 'Distance de Montréal', value: '30 km' }
        ]
      },
      {
        title: 'Facteurs d\'attractivité',
        items: [
          { icon: Users, text: "Croissance familiale : 43,5% des ménages ont 3+ personnes (vs 32% au Québec)" },
          { icon: TrendingUp, text: "Âge moyen : 37,2 ans, nettement plus jeune que la moyenne provinciale de 41,9 ans" },
          { icon: Building2, text: "Proximité Montréal : Moins de 30 minutes en voiture, sortie 22 autoroute 10" },
          { icon: Home, text: "Reconnue en 2018 parmi les meilleures villes au Canada pour élever une famille" }
        ]
      }
    ]
  },

  // Investment Perspective section
  investmentPerspective: {
    title: "L'avenir de Chambly : perspectives d'investissement",
    items: [
      {
        icon: Building2,
        title: 'Patrimoine historique unique',
        description: 'Fort Chambly (1709-1711) classé lieu historique national, 279 bâtiments patrimoniaux recensés. Canal historique et bassin offrant un cachet touristique impérissable.'
      },
      {
        icon: Users,
        title: 'Population jeune et en croissance',
        description: 'Âge moyen de 37,2 ans, forte proportion de familles (43,5% des ménages de 3+ personnes). Croissance soutenue de 8% entre 2016 et 2021.'
      },
      {
        icon: Home,
        title: 'Ratio prix/salaire avantageux',
        description: 'Parmi les meilleurs au Québec, rendant l\'accession à la propriété plus accessible qu\'ailleurs dans la région métropolitaine de Montréal.'
      },
      {
        icon: TrendingUp,
        title: 'Qualité de vie exceptionnelle',
        description: 'Festival Bières et Saveurs (65 000 visiteurs), centre culturel moderne, complexe aquatique, école secondaire agrandie (177,3M$). Transport gratuit local.'
      }
    ]
  },

  // Broker Comparison section
  brokerComparison: {
    title: 'Courtier vs Démarcheur hypothécaire',
    subtitle: 'Comprendre la différence peut vous faire économiser des dizaines de milliers de dollars',
    independentBroker: {
      title: 'Courtier hypothécaire indépendant',
      items: [
        'Travaille pour vous, le client',
        'Accès à 20+ prêteurs (banques, Desjardins, prêteurs privés)',
        'Compare des dizaines d\'offres pour trouver la meilleure',
        'Négocie en votre nom pour obtenir les meilleures conditions',
        'Services gratuits (rémunéré par la banque)',
        'Stratégies fiscales (manœuvre Smith, MAPA)',
        'Dossiers complexes (autonomes, nouveaux arrivants, crédit imparfait)'
      ]
    },
    bankAgent: {
      title: 'Démarcheur hypothécaire',
      items: [
        'Travaille pour une seule banque',
        'Accès limité aux produits de son employeur',
        'Aucune comparaison avec d\'autres institutions',
        'Politiques rigides de l\'institution',
        'Taux non négociables selon la grille tarifaire',
        'Options limitées pour dossiers complexes',
        'Peut refuser les dossiers non standard'
      ]
    },
    financialImpact: {
      title: 'Impact financier considérable',
      content: 'Avec un prix moyen de 547 089 $ à Chambly, chaque 0,1% économisé sur votre taux peut représenter des dizaines de milliers de dollars sur la durée de votre prêt hypothécaire de 25 ou 30 ans. Un courtier indépendant maximise vos chances d\'obtenir le meilleur taux disponible.'
    }
  },

  // Practical Tips section
  practicalTips: {
    title: 'Conseils pratiques pour les acheteurs',
    tips: [
      {
        icon: Calculator,
        title: 'Prévoir la taxe dans votre budget',
        content: "Il est impératif d'inclure la taxe de bienvenue dans vos prévisions financières. Cette dépense obligatoire s'ajoute à la mise de fonds, aux frais de notaire et aux frais d'inspection.",
        note: "Pour une propriété au prix moyen de 547 089 $, la taxe s'élève à environ 6 360 $. Pour une propriété de 350 000 $, prévoyez environ 3 404 $."
      },
      {
        icon: TrendingUp,
        title: 'Profiter des avantages de Chambly',
        content: "Chambly offre un ratio prix/salaire parmi les meilleurs au Québec, rendant l'accession à la propriété plus accessible qu'à Montréal.",
        items: [
          "Transport local gratuit (lignes Chambly-Richelieu-Carignan)",
          "Moins de 30 minutes de Montréal (sortie 22 autoroute 10)",
          "Taux standards (plus avantageux que Montréal pour propriétés haut de gamme)"
        ]
      },
      {
        icon: DollarSign,
        title: 'Explorer les différents secteurs',
        content: "Chambly offre une diversité de milieux de vie à différents prix. Le Vieux-Chambly offre du cachet historique, tandis que Chambly-Ouest et Parkwood proposent des prix plus accessibles.",
        items: [
          "Secteur historique : Charme patrimonial unique",
          "Quartier du Bassin : Maisons modernes, jeunes familles",
          "Chambly-Ouest/Parkwood : Prix abordables, bon rapport qualité-prix"
        ]
      },
      {
        icon: Home,
        title: 'Investir dans la qualité de vie',
        content: "Chambly a été reconnue parmi les meilleures villes au Canada pour élever une famille (2018). Cette réputation durable garantit l'attractivité continue de la ville.",
        items: [
          "Obtenir une préautorisation hypothécaire avant de chercher",
          "Visiter plusieurs secteurs pour connaître leurs ambiances",
          "Considérer les duplex/triplex pour revenus locatifs"
        ]
      }
    ]
  },

  // FAQ section
  faq: {
    title: 'Questions fréquentes',
    subtitle: "Tout ce que vous devez savoir sur la taxe de bienvenue à Chambly",
    items: [
      {
        q: "Qu'est-ce que la taxe de bienvenue ?",
        a: "La taxe de bienvenue, officiellement appelée droit de mutation immobilière, est un impôt municipal que tout acheteur doit payer lors du transfert de propriété à Chambly. Contrairement à la croyance populaire, elle ne provient pas du ministre Jean Bienvenue."
      },
      {
        q: 'Quand dois-je payer la taxe de bienvenue à Chambly ?',
        a: "La Ville de Chambly envoie la facture environ 30 jours après l'inscription de l'acte de vente. Le paiement doit s'effectuer en un seul versement dans les 30 jours suivant la réception du compte. Le non-paiement entraîne des pénalités."
      },
      {
        q: 'Combien coûte la taxe pour une propriété moyenne à Chambly ?',
        a: "Pour une maison unifamiliale au prix moyen de 547 089 $ (2024), la taxe de bienvenue s'élève à environ 6 360 $. Pour une propriété de 350 000 $, elle est d'environ 3 404 $. Utilisez notre calculateur pour votre situation spécifique."
      },
      {
        q: 'Les taux de Chambly sont-ils avantageux ?',
        a: "Oui ! Chambly applique les taux provinciaux standards (maximum 1,5%) sans majoration. C'est plus avantageux que Montréal qui applique des taux allant jusqu'à 3% pour les propriétés haut de gamme."
      },
      {
        q: 'Pourquoi acheter à Chambly plutôt qu\'à Montréal ?',
        a: "Chambly offre un ratio prix/salaire parmi les meilleurs au Québec, à seulement 30 km de Montréal. La ville a été reconnue parmi les meilleures au Canada pour élever une famille, avec un riche patrimoine historique et d'excellents services."
      }
    ]
  },

  // Final CTA section
  finalCta: {
    title: 'Prêt à réaliser votre rêve de propriété à Chambly ?',
    subtitle: 'Contactez-nous dès aujourd\'hui pour une consultation gratuite et découvrez comment nous pouvons vous aider à optimiser votre financement dans cette ville exceptionnelle',
    buttons: [
      { text: 'Appelez-nous maintenant', icon: Phone },
      { text: 'Demander une soumission', icon: Mail }
    ]
  },

  // Footer
  footer: {
    about: "Experts en financement hypothécaire à Chambly et la Montérégie, nous vous accompagnons dans tous vos projets immobiliers avec professionnalisme et transparence.",
    links: [
      { text: 'Calculateur de prêt', href: '#' },
      { text: 'Taux hypothécaires', href: '#' },
      { text: 'Programmes d\'aide', href: '#' },
      { text: 'Blog immobilier', href: '#' }
    ],
    contact: {
      phone: '+1 514 447-3000',
      email: 'equipe@hypotheques.ca',
      address: 'Chambly, Québec'
    },
    copyright: '© 2026 Calculateur Taxe de Bienvenue Chambly. Tous droits réservés.',
    disclaimer: 'Les informations fournies sont à titre indicatif. Consultez toujours un professionnel pour votre situation spécifique.'
  }
};

// ======================
// MAIN COMPONENT
// ======================

export default function MontrealWelcomeTaxPage() {
  const [price, setPrice] = useState('');
  const [tax, setTax] = useState(0);
  const [breakdown, setBreakdown] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const resultRef = useRef(null);

  const calculateTax = (value) => {
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(numValue) || numValue <= 0) {
      setTax(0);
      setBreakdown([]);
      return;
    }

    const brackets = CITY_CONTENT.taxBrackets;
    let total = 0;
    const details = [];
    let prev = 0;

    for (let i = 0; i < brackets.length; i++) {
      const b = brackets[i];
      const bracketMin = prev;
      const bracketMax = Math.min(numValue, b.max);

      if (numValue > bracketMin) {
        const taxable = bracketMax - bracketMin;
        const taxAmount = taxable * (b.rate / 100);
        total += taxAmount;
        details.push({
          range: b.name,
          rate: b.rate,
          amount: taxAmount,
        });
      }

      if (numValue <= b.max) break;
      prev = b.max;
    }

    setTax(total);
    setBreakdown(details);
  };

  const handleCalculate = () => {
    if (!price) return;
    setIsCalculating(true);
    setTimeout(() => {
      calculateTax(price);
      setIsCalculating(false);
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 400);
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(num);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="relative z-20 border-b border-white/10 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-400">Calculateur disponible pour :</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {CITY_CONTENT.availableCities.map((city, idx) => (
                  <a
                    key={idx}
                    href={city.path}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      city.name === CITY_CONTENT.city.name
                        ? 'bg-white text-slate-900 font-semibold'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {city.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <img
            src={CITY_CONTENT.city.heroImage}
            alt={CITY_CONTENT.city.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {CITY_CONTENT.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              {CITY_CONTENT.hero.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              {CITY_CONTENT.hero.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Calculator Section */}
      <section className="py-12 -mt-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left side - Input */}
              <div className="p-8 md:p-10 bg-gradient-to-br from-slate-50 to-white">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{CITY_CONTENT.calculator.title}</h2>
                      <p className="text-sm text-slate-600">{CITY_CONTENT.calculator.subtitle}</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        {CITY_CONTENT.calculator.inputLabel}
                      </label>
                      <motion.div
                        whileFocus={{ scale: 1.01 }}
                        className="relative"
                      >
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
                        <input
                          type="text"
                          value={price}
                          onChange={handlePriceChange}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') handleCalculate();
                          }}
                          placeholder={CITY_CONTENT.calculator.inputPlaceholder}
                          className="w-full pl-12 pr-4 py-4 text-xl font-semibold border-2 border-slate-200 rounded-2xl focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 outline-none transition-all bg-white"
                        />
                      </motion.div>
                    </div>

                    <motion.button
                      onClick={handleCalculate}
                      disabled={!price || isCalculating}
                      whileHover={{ scale: !price || isCalculating ? 1 : 1.02 }}
                      whileTap={{ scale: !price || isCalculating ? 1 : 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-600"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10 flex items-center gap-2">
                        {isCalculating ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                          />
                        ) : (
                          <>
                            <Calculator className="w-5 h-5" />
                            {CITY_CONTENT.calculator.buttonText}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </motion.button>

                    <p className="text-xs text-slate-500 text-center">
                      {CITY_CONTENT.calculator.buttonHint}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Right side - Results */}
              <div className="p-8 md:p-10 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="relative z-10"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{CITY_CONTENT.calculator.resultTitle}</h3>
                      <p className="text-sm text-slate-300">{CITY_CONTENT.calculator.resultSubtitle}</p>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {tax > 0 ? (
                      <motion.div
                        ref={resultRef}
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        className="space-y-4"
                      >
                        <motion.div
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
                        >
                          <p className="text-slate-300 text-sm uppercase tracking-wider mb-2 font-medium">
                            {CITY_CONTENT.calculator.resultLabel}
                          </p>
                          <motion.p
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                            className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-white to-slate-200 bg-clip-text text-transparent"
                          >
                            {formatCurrency(tax)}
                          </motion.p>
                          <p className="text-slate-400 text-xs mt-2">{CITY_CONTENT.calculator.resultLocation}</p>
                        </motion.div>

                        {breakdown.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-2"
                          >
                            <p className="text-sm font-semibold text-slate-300 mb-3">{CITY_CONTENT.calculator.breakdownTitle}</p>
                            {breakdown.map((item, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + idx * 0.1 }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all"
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex-1">
                                    <p className="text-xs text-slate-400 mb-0.5">{item.range}</p>
                                    <p className="text-sm font-semibold text-white">
                                      {formatCurrency(item.amount)}
                                    </p>
                                  </div>
                                  <div className="bg-white/10 px-2.5 py-1 rounded-lg">
                                    <p className="text-xs font-bold text-white">{item.rate}%</p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center h-full min-h-[300px]"
                      >
                        <motion.div
                          animate={{
                            y: [0, -10, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-4 border border-white/20"
                        >
                          <Calculator className="w-10 h-10 text-slate-300" />
                        </motion.div>
                        <p className="text-slate-300 text-center text-sm">
                          {CITY_CONTENT.calculator.emptyStateText}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

 {/* CTA Form Section */}
  {/* <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {CITY_CONTENT.ctaForm.title}
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {CITY_CONTENT.ctaForm.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
          >
            <div className="border-4 border-dashed border-slate-300 rounded-xl p-12 text-center">
              <div className="max-w-md mx-auto">
                <Mail className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{CITY_CONTENT.ctaForm.formTitle}</h3>
                <p className="text-slate-600 mb-4">
                  {CITY_CONTENT.ctaForm.formDescription}
                </p>
                <code className="text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded inline-block">
                  &lt;zoho-form-embed&gt;&lt;/zoho-form-embed&gt;
                </code>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {CITY_CONTENT.ctaForm.benefits.map((benefit, idx) => (
                <div key={idx} className="text-center">
                  <div className={`${
                    idx === 0 ? 'bg-green-100' : 
                    idx === 1 ? 'bg-blue-100' : 'bg-purple-100'
                  } rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3`}>
                    <CheckCircle className={`w-6 h-6 ${
                      idx === 0 ? 'text-green-600' : 
                      idx === 1 ? 'text-blue-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-1">{benefit.title}</h4>
                  <p className="text-sm text-slate-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Tax Brackets Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {CITY_CONTENT.bracketsDisplay.title}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {CITY_CONTENT.bracketsDisplay.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CITY_CONTENT.bracketsDisplay.brackets.map((bracket, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`bg-gradient-to-r ${bracket.color} text-white rounded-lg p-4 mb-4`}>
                  <p className="text-3xl font-bold text-center">{bracket.rate}</p>
                </div>
                <p className="text-center text-slate-700 font-semibold">{bracket.range}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* City Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {CITY_CONTENT.statistics.title}
            </h2>
            <p className="text-xl text-slate-600">{CITY_CONTENT.statistics.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CITY_CONTENT.statistics.stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 text-center"
                >
                  <Icon className="w-12 h-12 text-slate-900 mx-auto mb-4" />
                  <p className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</p>
                  <p className="text-slate-600 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {CITY_CONTENT.neighborhoods.title}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {CITY_CONTENT.neighborhoods.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CITY_CONTENT.neighborhoods.items.map((neighborhood, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200 hover:border-slate-900 transition-all hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{neighborhood.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{neighborhood.name}</h3>
                <p className="text-slate-600 leading-relaxed">{neighborhood.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {CITY_CONTENT.benefits.title}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {CITY_CONTENT.benefits.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {CITY_CONTENT.benefits.items.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-slate-200"
              >
                <div className="bg-slate-900 text-white rounded-lg w-16 h-16 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {CITY_CONTENT.programs.title}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {CITY_CONTENT.programs.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {CITY_CONTENT.programs.items.map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`bg-gradient-to-br ${idx === 0 ? 'from-green-50 to-emerald-50 border-green-200' : 'from-blue-50 to-cyan-50 border-blue-200'} border-2 rounded-xl p-8`}
              >
                <div className={`${idx === 0 ? 'bg-green-500' : 'bg-blue-500'} text-white rounded-full w-16 h-16 flex items-center justify-center mb-4`}>
                  {idx === 0 ? <Home className="w-8 h-8" /> : <Users className="w-8 h-8" />}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{program.title}</h3>
                <ul className="space-y-3 text-slate-700">
                  {program.description.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <CheckCircle className={`w-5 h-5 ${idx === 0 ? 'text-green-600' : 'text-blue-600'} mt-0.5 flex-shrink-0`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Welcome Tax Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {CITY_CONTENT.whatIsWelcomeTax.title}
            </h2>
            <div className="prose prose-lg max-w-none text-slate-700 space-y-4">
              {CITY_CONTENT.whatIsWelcomeTax.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How to Calculate Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {CITY_CONTENT.howToCalculate.title}
            </h2>
            
            <div className="space-y-6">
              {CITY_CONTENT.howToCalculate.sections.map((section, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{section.title}</h3>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    {section.content}
                  </p>
                  <ul className="mt-4 space-y-2 text-slate-700">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">{CITY_CONTENT.howToCalculate.example.title}</h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <p className="text-lg mb-4">Pour une propriété de <strong>{CITY_CONTENT.howToCalculate.example.propertyValue}</strong> :</p>
                  <div className="space-y-3 text-sm">
                    {CITY_CONTENT.howToCalculate.example.calculation.map((calc, idx) => (
                      <div key={idx} className="flex justify-between items-center pb-2 border-b border-white/20">
                        <span>{calc.range}</span>
                        <strong>{calc.amount}</strong>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-3 text-lg">
                      <span className="font-bold">TOTAL</span>
                      <strong className="text-2xl">{CITY_CONTENT.howToCalculate.example.total}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
                <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {CITY_CONTENT.howToCalculate.paymentInfo.title}
                </h4>
                <p className="text-amber-900 leading-relaxed">
                  {CITY_CONTENT.howToCalculate.paymentInfo.content}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Trends Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {CITY_CONTENT.marketTrends.title}
            </h2>
            
            <div className="space-y-6">
              {CITY_CONTENT.marketTrends.sections.map((section, idx) => (
                <div key={idx} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{section.title}</h3>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    {section.content}
                  </p>
                  {section.stats && (
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        {section.stats.map((stat, statIdx) => (
                          <div key={statIdx}>
                            <p className="text-sm text-slate-600 mb-1">{stat.year}</p>
                            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {section.items && (
                    <ul className="space-y-3 text-slate-700 mt-4">
                      {section.items.map((item, itemIdx) => {
                        const Icon = item.icon;
                        return (
                          <li key={itemIdx} className="flex items-start gap-3">
                            <Icon className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                            <span>{item.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Investment Perspective Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {CITY_CONTENT.investmentPerspective.title}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {CITY_CONTENT.investmentPerspective.items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-white rounded-xl p-6 border border-slate-200"
                  >
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-700 text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Broker Comparison Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              {CITY_CONTENT.brokerComparison.title}
            </h2>
            <p className="text-xl text-slate-600 text-center mb-12 max-w-3xl mx-auto">
              {CITY_CONTENT.brokerComparison.subtitle}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{CITY_CONTENT.brokerComparison.independentBroker.title}</h3>
                </div>
                <ul className="space-y-4 text-slate-800">
                  {CITY_CONTENT.brokerComparison.independentBroker.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-slate-300 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-slate-600 rounded-2xl flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{CITY_CONTENT.brokerComparison.bankAgent.title}</h3>
                </div>
                <ul className="space-y-4 text-slate-700">
                  {CITY_CONTENT.brokerComparison.bankAgent.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-slate-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-6"
            >
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 text-lg">{CITY_CONTENT.brokerComparison.financialImpact.title}</h4>
                  <p className="text-slate-800 leading-relaxed">
                    {CITY_CONTENT.brokerComparison.financialImpact.content}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Practical Tips Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {CITY_CONTENT.practicalTips.title}
            </h2>
            
            <div className="space-y-6">
              {CITY_CONTENT.practicalTips.tips.map((tip, idx) => {
                const Icon = tip.icon;
                return (
                  <div key={idx} className="bg-white rounded-xl p-6 border-l-4 border-slate-900">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Icon className="w-6 h-6" />
                      {tip.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed mb-4">{tip.content}</p>
                    {tip.note && (
                      <p className="text-slate-600 text-sm">{tip.note}</p>
                    )}
                    {tip.items && (
                      <ul className="space-y-2 text-slate-700 mt-4">
                        {tip.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2">
                            <ArrowRight className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {CITY_CONTENT.faq.title}
            </h2>
            <p className="text-xl text-slate-600">
              {CITY_CONTENT.faq.subtitle}
            </p>
          </motion.div>

          <div className="space-y-4">
            {CITY_CONTENT.faq.items.map((faq, idx) => (
              <motion.details
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden group"
              >
                <summary className="px-6 py-4 cursor-pointer font-semibold text-slate-900 hover:bg-slate-50 transition-colors flex justify-between items-center">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 py-4 text-slate-600 border-t border-slate-100 leading-relaxed">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img
            src={CITY_CONTENT.city.heroImage}
            alt={CITY_CONTENT.city.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {CITY_CONTENT.finalCta.title}
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              {CITY_CONTENT.finalCta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
  {CITY_CONTENT.finalCta.buttons.map((button, idx) => {
    const Icon = button.icon;

    const href =
      idx === 0
        ? "https://wa.me/15144473000"
        : "mailto:equipe@hypotheques.ca";

    const target = idx === 0 ? "_blank" : undefined;

    return (
      <Link
        key={idx}
        href={href}
        target={target}
        rel={idx === 0 ? "noopener noreferrer" : undefined}
 
        className={`${
          idx === 0
            ? "bg-white text-slate-900 hover:bg-slate-100"
            : "bg-slate-700 text-white hover:bg-slate-600 border-2 border-slate-600"
        } px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl`}
      >
        <Icon className="w-5 h-5" />
        {button.text}
      </Link>
    );
  })}
</div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">À propos</h3>
              <p className="text-sm leading-relaxed">
                {CITY_CONTENT.footer.about}
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{CITY_CONTENT.footer.contact.phone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{CITY_CONTENT.footer.contact.email}</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{CITY_CONTENT.footer.contact.address}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>{CITY_CONTENT.footer.copyright}</p>
            <p className="mt-2 text-slate-500">
              {CITY_CONTENT.footer.disclaimer}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}