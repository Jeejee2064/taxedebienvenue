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
    name: 'Candiac',
    displayName: 'Candiac',
    year: '2026',
    heroImage: 'https://imgs.search.brave.com/xH5KqLMH0vQJ5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2FuZGlhYy5jYS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8w/MS9wYXJjLWhhZW5k/ZWwtY2FuZGlhYy5q/cGc',
  },

  // Available cities for the top bar
  availableCities: [
    { name: 'Montréal', path: '/montreal' },
    { name: 'Québec', path: '/quebec' },
    { name: 'Laval', path: '/laval' },
    { name: 'Chambly', path: '/chambly' },
    { name: 'Candiac', path: '/' },
    { name: 'Saint-Lambert', path: '/saint-lambert' },
  ],

  // Hero section
  hero: {
    title: 'Calculateur de Taxe de Bienvenue',
    subtitle: 'Estimez précisément vos droits de mutation immobilière à Candiac en 2026',
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
    inputPlaceholder: '550 000',
    buttonText: 'Calculer maintenant',
    buttonHint: 'Appuyez sur Entrée ou cliquez sur le bouton pour calculer',
    resultTitle: 'Résultat',
    resultSubtitle: 'Estimation instantanée',
    resultLabel: 'Taxe totale',
    resultLocation: 'Candiac • 2026',
    emptyStateText: "Entrez un montant et cliquez\nsur calculer pour voir le résultat",
    breakdownTitle: 'Détails par tranche'
  },

  // Tax brackets (2026 rates - provincial standard)
  taxBrackets: [
    { max: 61500, rate: 0.5, name: '0 $ à 61 500 $' },
    { max: 307800, rate: 1.0, name: '61 500 $ à 307 800 $' },
    { max: Infinity, rate: 1.5, name: 'Plus de 307 800 $' },
  ],

  // CTA Form section
  ctaForm: {
    title: 'Consultation hypothécaire à Candiac',
    subtitle: 'Nos spécialistes de la Rive-Sud vous aident à financer votre propriété à Candiac avec les meilleures conditions du marché',
    formTitle: 'Demande de consultation',
    formDescription: 'Obtenez une évaluation personnalisée pour votre projet immobilier à Candiac',
    benefits: [
      { title: 'Analyse gratuite', description: 'Sans obligation de votre part' },
      { title: 'Expertise Rive-Sud', description: 'Connaissance du marché local' },
      { title: 'Solutions sur mesure', description: 'Adaptées à votre situation' }
    ]
  },

  // Tax brackets display
  bracketsDisplay: {
    title: 'Grille des taux 2026',
    subtitle: 'Barème progressif des droits de mutation à Candiac',
    brackets: [
      { range: '0 $ à 61 500 $', rate: '0,5%', color: 'from-green-500 to-emerald-600' },
      { range: '61 500 $ à 307 800 $', rate: '1,0%', color: 'from-blue-500 to-cyan-600' },
      { range: 'Plus de 307 800 $', rate: '1,5%', color: 'from-purple-500 to-violet-600' },
    ]
  },

  // City statistics
  statistics: {
    title: 'Candiac en chiffres',
    subtitle: 'Une ville jeune et dynamique de la Rive-Sud',
    stats: [
      { icon: Users, value: '25 000+', label: 'résidents (fondée en 1957)' },
      { icon: TrendingUp, value: '38 ans', label: 'âge moyen (ville très jeune)' },
      { icon: Building2, value: '15 km', label: 'du centre-ville de Montréal' },
      { icon: Home, value: '450-650K$', label: 'fourchette unifamiliale typique' },
    ]
  },

  // Neighborhoods
  neighborhoods: {
    title: 'Les secteurs de Candiac',
    subtitle: 'De l\'historique Vieux-Candiac aux développements modernes de Symphonie',
    items: [
      {
        name: 'Vieux-Candiac',
        description: 'Cœur historique des années 1960-70 avec arbres centenaires. Bungalows et plain-pied sur généreux terrains. Proximité parc Haendel.',
        icon: '🌳',
      },
      {
        name: 'Quartier Montcalm',
        description: 'Expansion des années 1980-90. Maisons contemporaines familiales avec sous-sols aménagés et garages doubles. Proximité écoles primaires et secondaires.',
        icon: '🏘️',
      },
      {
        name: 'Jardins de Candiac',
        description: 'Développement début 2000 avec urbanisme moderne. Larges boulevards, pistes cyclables intégrées et nombreux parcs. Normes énergétiques récentes.',
        icon: '🚴',
      },
      {
        name: 'Quartier Symphonie',
        description: 'Développement le plus récent avec résidences neuves. Rues nommées d\'après compositeurs. Mix unifamiliales, jumelés et maisons de ville.',
        icon: '🎵',
      },
      {
        name: 'Secteur du Bassin',
        description: 'Adjacent au bassin de rétention avec sentiers pédestres. Cours arrière sur espaces verts et zones boisées. Ambiance champêtre en milieu urbain.',
        icon: '🌲',
      },
      {
        name: 'Quartier DIX30 (proximité)',
        description: 'Accès immédiat à l\'un des plus grands pôles commerciaux à ciel ouvert du Québec. Restaurants, boutiques et divertissements.',
        icon: '🛍️',
      },
    ]
  },

  // Benefits section - RÉÉCRIT POUR CANDIAC
  benefits: {
    title: 'Les avantages d\'un courtier hypothécaire pour votre achat à Candiac',
    subtitle: 'Simplifiez votre financement sur la Rive-Sud',
    items: [
      {
        title: 'Réseau étendu d\'institutions partenaires',
        description: 'Accédez à plus de 20 prêteurs incluant les institutions nationales et régionales bien implantées sur la Rive-Sud pour comparer les offres adaptées au marché de Candiac.',
        icon: <Building2 className="w-8 h-8" />,
      },
      {
        title: 'Maximisation de votre budget',
        description: "Pour une propriété de 550 000$ à Candiac, chaque 0,1% de taux en moins représente environ 8 250$ d'économies sur 25 ans. Nous négocions pour vous.",
        icon: <DollarSign className="w-8 h-8" />,
      },
      {
        title: 'Services professionnels inclus',
        description: 'Votre courtier est compensé par l\'institution prêteuse. Vous bénéficiez d\'un accompagnement expert sans frais directs.',
        icon: <CheckCircle className="w-8 h-8" />,
      },
      {
        title: 'Optimisation fiscale intelligente',
        description: 'Stratégies comme la manœuvre Smith pour transformer votre dette hypothécaire en déductions fiscales, particulièrement avantageux pour les propriétaires candiagiens.',
        icon: <TrendingUp className="w-8 h-8" />,
      },
      {
        title: 'Expertise pour situations variées',
        description: 'Travailleurs autonomes, jeunes professionnels de la Rive-Sud, nouveaux arrivants : nous trouvons le financement adapté à votre profil spécifique.',
        icon: <Users className="w-8 h-8" />,
      },
      {
        title: 'Accompagnement de A à Z',
        description: 'De l\'analyse initiale jusqu\'à la signature finale, coordination complète de votre dossier avec les institutions et votre notaire.',
        icon: <ArrowRight className="w-8 h-8" />,
      },
    ]
  },

  // Programs section - RÉÉCRIT POUR CANDIAC
  programs: {
    title: "Aide à l'acquisition et exemptions",
    subtitle: "Programmes disponibles pour alléger vos coûts d'achat à Candiac",
    items: [
      {
        title: "Exemptions et réductions légales",
        description: [
          "Transferts entre conjoints mariés ou unis civilement",
          "Transferts par succession à certains héritiers directs",
          "Transferts à fiducie personnelle selon critères",
          "Réorganisations corporatives admissibles"
        ]
      },
      {
        title: "Crédits gouvernementaux",
        description: [
          "Crédit d'impôt première habitation (provincial et fédéral)",
          "Amortissement 30 ans pour premiers acheteurs (depuis déc. 2024)",
          "Remboursement TPS/TVQ pour constructions neuves",
          "RAP : utilisation REER pour mise de fonds (max 60K$ par personne)"
        ]
      }
    ]
  },

  // What is Welcome Tax section
  whatIsWelcomeTax: {
    title: "Qu'est-ce que la taxe de bienvenue à Candiac ?",
    content: [
      "La taxe de bienvenue est un droit municipal perçu par la Ville de Candiac lors du transfert de propriété d'un immeuble. Ce droit s'applique à toute transaction immobilière et varie selon la valeur marchande de la propriété achetée. À Candiac, comme dans toutes les municipalités du Québec, le calcul de cette taxe suit les taux prescrits par la Loi concernant les droits sur les mutations immobilières.",
      "Le montant de la taxe de bienvenue se calcule par tranches progressives appliquées sur le prix de vente ou la valeur marchande de la propriété, selon le montant le plus élevé. Cette taxe représente une dépense significative que tout acheteur doit anticiper lors de l'acquisition d'une propriété résidentielle ou commerciale à Candiac, qu'il s'agisse d'une maison unifamiliale, d'un condominium ou d'une propriété à revenus."
    ]
  },

  // How to Calculate section
  howToCalculate: {
    title: 'Comment calculer la taxe de bienvenue à Candiac en 2026 ?',
    sections: [
      {
        title: 'Détermination de la base imposable',
        content: "Le calcul s'applique sur le montant le plus élevé entre :",
        items: [
          "Prix de vente notarié (excluant TPS et TVQ)",
          "Contrepartie stipulée dans le contrat de vente",
          "Valeur au rôle d'évaluation × facteur comparatif municipal"
        ]
      },
      {
        title: 'Structure des taux à Candiac',
        content: "Application des taux provinciaux standards :",
        items: [
          "Tranche 1 (0-61 500$) : 0,5%",
          "Tranche 2 (61 500-307 800$) : 1,0%",
          "Tranche 3 (307 800$+) : 1,5%"
        ]
      }
    ],
    example: {
      title: 'Calcul type pour Candiac',
      propertyValue: '550 000 $ (fourchette typique)',
      calculation: [
        { range: '0 $ à 61 500 $ × 0,5%', amount: '307,50 $' },
        { range: '61 500 $ à 307 800 $ × 1,0%', amount: '2 463,00 $' },
        { range: '307 800 $ à 550 000 $ × 1,5%', amount: '3 633,00 $' }
      ],
      total: '6 403,50 $'
    },
    paymentInfo: {
      title: 'Règlement de la facture',
      content: "La Ville de Candiac expédie la facture environ 30 jours après l'inscription de l'acte de vente. Paiement requis dans les 30 jours suivant réception. Modes acceptés : virement bancaire en ligne, chèque postal (Ville de Candiac – Taxes, CP...) ou dépôt direct à l'hôtel de ville. Pénalités et intérêts en cas de retard."
    }
  },

  // Market Trends section
  marketTrends: {
    title: 'Marché immobilier de Candiac : dynamisme de la Rive-Sud',
    sections: [
      {
        title: 'Valeurs et typologies',
        content: "Le marché immobilier de Candiac demeure vigoureux et attractif. La valeur médiane des propriétés unifamiliales se situe généralement entre 450 000$ et 650 000$, selon le secteur, la grandeur et l'âge de la construction. Les condominiums et maisons de ville offrent un point d'entrée entre 300 000$ et 450 000$.",
        stats: [
          { label: 'Unifamiliales Vieux-Candiac', value: '450-550K$' },
          { label: 'Unifamiliales Symphonie (neuf)', value: '600-650K$' },
          { label: 'Condos et maisons de ville', value: '300-450K$' },
          { label: 'Distance Montréal', value: '15 km' }
        ]
      },
      {
        title: 'Facteurs d\'attractivité candiagiens',
        items: [
          { icon: Users, text: "Population jeune : âge moyen de 38 ans, l'une des municipalités les plus jeunes de la Montérégie" },
          { icon: TrendingUp, text: "Croissance soutenue depuis 1957 : plus de 25 000 résidents, familles et jeunes professionnels" },
          { icon: Building2, text: "Situation stratégique : 15 km de Montréal, accès pont Champlain et autoroute 15" },
          { icon: Home, text: "Gare train de banlieue : connexion directe centre-ville Montréal en moins de 30 minutes" }
        ]
      }
    ]
  },

  // Investment Perspective section
  investmentPerspective: {
    title: "Pourquoi investir à Candiac en 2026",
    items: [
      {
        icon: Building2,
        title: 'Ville planifiée et moderne',
        description: 'Fondée en 1957 avec développement urbain harmonieux. Quartiers distincts du Vieux-Candiac historique au moderne Symphonie. Urbanisme axé sur qualité de vie avec 85+ hectares d\'espaces verts.'
      },
      {
        icon: Users,
        title: 'Démographie favorable',
        description: 'Population jeune (38 ans moyenne) et dynamique. Forte attractivité auprès jeunes familles et professionnels. Écoles publiques réputées : Mosaïque, Grand-Héron, Paul-VI, Secondaire Grand-Coteau.'
      },
      {
        icon: Home,
        title: 'Accessibilité et transport',
        description: 'Gare terminus ligne Candiac Exo : 14 départs/jour vers Montréal, trajet <30 min. Stationnement incitatif 1 000+ places. Autoroute 15 et route 132 pour automobile. Pistes cyclables intégrées.'
      },
      {
        icon: TrendingUp,
        title: 'Infrastructures et services',
        description: 'Centre Alain-Larose (bibliothèque, activités). Aquadôme (piscine olympique). Proximité Quartier DIX30 (commerce majeur). Plusieurs CPE et garderies. Taxation compétitive avec services de qualité.'
      }
    ]
  },

  // Broker Comparison section - RÉÉCRIT POUR CANDIAC
  brokerComparison: {
    title: 'Courtier indépendant vs Conseiller bancaire',
    subtitle: 'Pour votre achat à Candiac, le choix du professionnel hypothécaire est déterminant',
    independentBroker: {
      title: 'Courtier hypothécaire indépendant',
      items: [
        'Travaille exclusivement dans VOTRE intérêt',
        'Analyse 20+ institutions pour trouver la meilleure offre',
        'Négocie taux et conditions pour maximiser vos avantages',
        'Connaissance du marché Rive-Sud et particularités Candiac',
        'Solutions créatives pour profils variés (autonomes, immigrants)',
        'Stratégies fiscales avancées (Smith, MAPA, etc.)',
        'Gratuit pour vous (compensation par le prêteur)'
      ]
    },
    bankAgent: {
      title: 'Conseiller d\'une seule banque',
      items: [
        'Employé d\'une institution spécifique',
        'Limité aux produits de son employeur uniquement',
        'Grille de taux fixe sans flexibilité de négociation',
        'Critères d\'approbation standardisés et rigides',
        'Aucune comparaison avec marché concurrent',
        'Peut refuser dossiers atypiques ou complexes',
        'Perspective limitée aux politiques internes'
      ]
    },
    financialImpact: {
      title: 'L\'impact financier concret',
      content: 'Sur une propriété de 550 000$ typique à Candiac, obtenir un taux 0,20% inférieur représente environ 16 500$ d\'économies sur un prêt de 25 ans. Un courtier indépendant maximise vos chances d\'obtenir les conditions optimales disponibles sur le marché.'
    }
  },

  // Practical Tips section - RÉÉCRIT POUR CANDIAC
  practicalTips: {
    title: 'Guide pratique pour acheter à Candiac',
    tips: [
      {
        icon: Calculator,
        title: 'Anticiper l\'ensemble des frais',
        content: "Prévoyez tous les coûts au-delà du prix d'achat : taxe de bienvenue (~6 404$ pour 550K$), frais de notaire (1 500-2 500$), inspection préachat (500-800$), évaluation (300-500$), ajustements taxes municipales/scolaires, déménagement.",
        note: "Notre calculateur vous donne une estimation précise de la taxe selon le prix envisagé. Point d'entrée condos/maisons de ville : 300-450K$ (taxe ~3 100-4 800$)."
      },
      {
        icon: TrendingUp,
        title: 'Identifier le secteur qui vous convient',
        content: "Candiac offre des quartiers distincts pour différents besoins. Vieux-Candiac : terrains généreux, arbres matures, cachet. Montcalm : familles, proximité écoles. Jardins de Candiac : moderne, pistes cyclables. Symphonie : neuf, normes récentes.",
        items: [
          "Train de banlieue : départs fréquents vers Montréal (<30 min)",
          "Quartier DIX30 : à proximité immédiate (commerce, restaurants)",
          "85+ hectares d'espaces verts : parcs, terrains sportifs, sentiers"
        ]
      },
      {
        icon: DollarSign,
        title: 'Optimiser votre pouvoir d\'achat',
        content: "Travaillez avec un courtier hypothécaire indépendant pour maximiser votre capacité d'emprunt et obtenir les meilleures conditions. Explorez l'amortissement 30 ans pour premiers acheteurs (disponible depuis déc. 2024).",
        items: [
          "Préautorisation avant recherche : démontre sérieux aux vendeurs",
          "Considérer condos/maisons de ville si budget plus serré",
          "Explorer crédits d'impôt première habitation (provincial et fédéral)"
        ]
      },
      {
        icon: Home,
        title: 'Miser sur la qualité de vie',
        content: "Candiac se distingue par son développement harmonieux depuis 1957. Population jeune (38 ans moyenne), excellentes écoles publiques, sécurité élevée, services municipaux de qualité (Aquadôme, Centre Alain-Larose).",
        items: [
          "Visiter les différents secteurs pour ressentir leurs ambiances",
          "Consulter courtier immobilier connaissant bien Candiac",
          "Évaluer temps de trajet vers lieu de travail (train vs auto)"
        ]
      }
    ]
  },

  // FAQ section
  faq: {
    title: 'Questions fréquentes',
    subtitle: "Réponses sur la taxe de bienvenue à Candiac",
    items: [
      {
        q: "Combien coûte la taxe de bienvenue à Candiac ?",
        a: "Pour une propriété de 550 000$ (fourchette typique à Candiac), la taxe s'élève à environ 6 404$. Pour un condo à 400 000$, elle est d'environ 4 383$. Le montant varie selon la valeur de votre acquisition et se calcule par tranches progressives."
      },
      {
        q: 'Quand dois-je payer cette taxe ?',
        a: "La Ville de Candiac envoie la facture environ 30 jours après l'inscription de l'acte de vente au registre foncier. Vous devez payer dans les 30 jours suivant la réception. Modes acceptés : virement bancaire, chèque ou dépôt à l'hôtel de ville."
      },
      {
        q: 'Puis-je être exempté de la taxe ?',
        a: "Oui, certaines situations donnent droit à exemptions : transferts entre conjoints mariés/unis civilement, transferts par décès à certains héritiers, transferts à fiducie personnelle. Consultez votre notaire pour vérifier votre admissibilité."
      },
      {
        q: 'Quels sont les avantages de vivre à Candiac ?',
        a: "Population jeune (38 ans), gare train de banlieue (14 départs/jour, <30 min vers Montréal), proximité Quartier DIX30, excellentes écoles publiques, 85+ hectares d'espaces verts, taxation compétitive, développement urbain harmonieux depuis 1957."
      },
      {
        q: 'Quel secteur de Candiac choisir ?',
        a: "Vieux-Candiac : terrains généreux, arbres matures. Montcalm : familles, proximité écoles (années 80-90). Jardins de Candiac : moderne, pistes cyclables (début 2000). Symphonie : résidences neuves, dernières normes. Secteur du Bassin : nature, sentiers pédestres."
      }
    ]
  },

  // Final CTA section
  finalCta: {
    title: 'Concrétisez votre projet immobilier à Candiac',
    subtitle: 'Nos experts de la Rive-Sud vous accompagnent pour obtenir le meilleur financement et réaliser votre rêve de propriété dans cette ville dynamique',
    buttons: [
      { text: 'Appelez-nous maintenant', icon: Phone },
      { text: 'Demander une soumission', icon: Mail }
    ]
  },

  // Footer
  footer: {
    about: "Spécialistes du financement hypothécaire sur la Rive-Sud, nous connaissons Candiac et ses quartiers pour vous guider vers la meilleure solution de financement.",
    links: [
      { text: 'Calculateur de prêt', href: '#' },
      { text: 'Taux hypothécaires', href: '#' },
      { text: 'Programmes d\'aide', href: '#' },
      { text: 'Blog immobilier', href: '#' }
    ],
    contact: {
      phone: '+1 514 447-3000',
      email: 'equipe@hypotheques.ca',
      address: 'Candiac, Québec'
    },
    copyright: '© 2026 Calculateur Taxe de Bienvenue Candiac. Tous droits réservés.',
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
 <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20">
   <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
     
     {/* HEADER */}
     <motion.div
       initial={{ opacity: 0, y: 30 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.6 }}
       className="mb-14 text-center"
     >
       <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
         {CITY_CONTENT.ctaForm.title}
       </h2>
       <p className="mx-auto max-w-3xl text-lg text-slate-300 md:text-xl">
         {CITY_CONTENT.ctaForm.subtitle}
       </p>
     </motion.div>
 
     {/* CARD */}
     <motion.div
       initial={{ opacity: 0, y: 30 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.6, delay: 0.2 }}
       className="rounded-3xl bg-white p-5 shadow-2xl md:p-10"
     >
       {/* FORM */}
        <iframe
          title="Achat futur"
          aria-label="Achat futur"
          src="https://forms.zohopublic.ca/hypothequesca1/form/Achatfutur/formperma/xrnwQ82JU7effpcL7lo8ShLkRkESAvzGNmBWLB_hpNM"
          className="w-full rounded-xl h-[1020] md:[900] lg:h-[800]"
          style={{ border: "none" }}
        />
 
       {/* BENEFITS */}
       <div className="mt-12 grid gap-8 md:grid-cols-3">
         {CITY_CONTENT.ctaForm.benefits.map((benefit, idx) => (
           <div key={idx} className="text-center">
             <div
               className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
                 idx === 0
                   ? "bg-green-100"
                   : idx === 1
                   ? "bg-blue-100"
                   : "bg-purple-100"
               }`}
             >
               <CheckCircle
                 className={`h-6 w-6 ${
                   idx === 0
                     ? "text-green-600"
                     : idx === 1
                     ? "text-blue-600"
                     : "text-purple-600"
                 }`}
               />
             </div>
             <h4 className="mb-1 font-semibold text-slate-900">
               {benefit.title}
             </h4>
             <p className="text-sm text-slate-600">
               {benefit.description}
             </p>
           </div>
         ))}
       </div>
     </motion.div>
 
   </div>
 </section>

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
          <div className="grid md:grid-cols-3 gap-8 mb-8">
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