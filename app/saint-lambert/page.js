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
    name: 'Saint-Lambert',
    displayName: 'Saint-Lambert',
    year: '2026',
    heroImage: 'https://imgs.search.brave.com/xH5KqLMH0vQJ5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2FpbnQtbGFtYmVy/dC5jYS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8wNi9wYXJj/LXNhaW50LWxhbWJl/cnQuanBn',
  },

  // Available cities for the top bar
  availableCities: [
    { name: 'Montréal', path: '/montreal' },
    { name: 'Québec', path: '/quebec' },
    { name: 'Laval', path: '/laval' },
    { name: 'Chambly', path: '/chambly' },
    { name: 'Candiac', path: '/candiac' },
    { name: 'Saint-Lambert', path: '/' },
  ],

  // Hero section
  hero: {
    title: 'Calculateur de Taxe de Bienvenue',
    subtitle: 'Estimez précisément vos droits de mutation immobilière à Saint-Lambert en 2026',
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
    inputPlaceholder: '750 000',
    buttonText: 'Calculer maintenant',
    buttonHint: 'Appuyez sur Entrée ou cliquez sur le bouton pour calculer',
    resultTitle: 'Résultat',
    resultSubtitle: 'Estimation instantanée',
    resultLabel: 'Taxe totale',
    resultLocation: 'Saint-Lambert • 2026',
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
    title: 'Expertise hypothécaire à Saint-Lambert',
    subtitle: 'Nos courtiers spécialisés de la Rive-Sud vous aident à financer votre propriété dans cette ville prisée avec les conditions optimales',
    formTitle: 'Demande d\'évaluation',
    formDescription: 'Recevez une analyse personnalisée pour votre projet immobilier à Saint-Lambert',
    benefits: [
      { title: 'Consultation experte', description: 'Gratuite et sans engagement' },
      { title: 'Connaissance locale', description: 'Spécialistes de Saint-Lambert' },
      { title: 'Financement optimal', description: 'Meilleurs taux disponibles' }
    ]
  },

  // Tax brackets display
  bracketsDisplay: {
    title: 'Grille des taux 2026',
    subtitle: 'Structure d\'imposition des droits de mutation à Saint-Lambert',
    brackets: [
      { range: '0 $ à 61 500 $', rate: '0,5%', color: 'from-green-500 to-emerald-600' },
      { range: '61 500 $ à 307 800 $', rate: '1,0%', color: 'from-blue-500 to-cyan-600' },
      { range: 'Plus de 307 800 $', rate: '1,5%', color: 'from-purple-500 to-violet-600' },
    ]
  },

  // City statistics
  statistics: {
    title: 'Saint-Lambert en chiffres',
    subtitle: 'Une ville patrimoniale prisée de la Rive-Sud',
    stats: [
      { icon: Users, value: '22 000+', label: 'résidents (ville établie 1857)' },
      { icon: TrendingUp, value: 'Top 3', label: 'villes les plus chères Rive-Sud' },
      { icon: Building2, value: '3 stations', label: 'de métro à proximité' },
      { icon: Home, value: '700-900K$', label: 'fourchette typique unifamiliale' },
    ]
  },

  // Neighborhoods
  neighborhoods: {
    title: 'Les secteurs de Saint-Lambert',
    subtitle: 'Des quartiers patrimoniaux prisés aux développements modernes',
    items: [
      {
        name: 'Vieux-Saint-Lambert',
        description: 'Cœur historique avec architecture victorienne et édouardienne préservée. Maisons centenaires, rues bordées d\'arbres, proximité église patrimoniale et parc du même nom.',
        icon: '🏛️',
      },
      {
        name: 'Secteur Victoria',
        description: 'Avenue Victoria et ses environs : artère commerciale animée avec boutiques, restaurants et cafés. Mélange résidentiel de maisons ancestrales et condos modernes.',
        icon: '🛍️',
      },
      {
        name: 'Préville',
        description: 'Quartier résidentiel tranquille au sud de la ville. Maisons unifamiliales spacieuses, ambiance familiale, proximité golf et espaces verts. Secteur très recherché.',
        icon: '⛳',
      },
      {
        name: 'Riverside (bordure)',
        description: 'Secteurs limitrophes avec Brossard offrant condos et maisons de ville plus accessibles. Proximité services et transport en commun (REM et métro).',
        icon: '🚇',
      },
      {
        name: 'Secteur du Parc',
        description: 'Autour du magnifique parc Saint-Lambert. Propriétés haut de gamme avec vue sur espaces verts. Très prisé des familles pour qualité de vie exceptionnelle.',
        icon: '🌳',
      },
      {
        name: 'Secteur Métro',
        description: 'Proximité immédiate station Longueuil-Université-de-Sherbrooke. Condos et appartements prisés par jeunes professionnels. Accès rapide à Montréal.',
        icon: '🚊',
      },
    ]
  },

  // Benefits section - RÉÉCRIT POUR SAINT-LAMBERT
  benefits: {
    title: 'Pourquoi consulter un courtier multi-prêteurs à Saint-Lambert ?',
    subtitle: 'Optimisez votre investissement dans cette ville prisée',
    items: [
      {
        title: 'Comparaison exhaustive du marché',
        description: 'Pour des propriétés de 700 000$ à 900 000$+ typiques à Saint-Lambert, l\'accès à 20+ institutions financières permet d\'identifier les meilleures conditions disponibles pour votre profil.',
        icon: <Building2 className="w-8 h-8" />,
      },
      {
        title: 'Économies substantielles garanties',
        description: "Sur un prêt de 750 000$ (typique à Saint-Lambert), économiser 0,15% de taux représente plus de 16 875$ sur 25 ans. Nous négocions agressivement pour vous.",
        icon: <DollarSign className="w-8 h-8" />,
      },
      {
        title: 'Expertise sans frais additionnels',
        description: 'Les prêteurs compensent votre courtier. Vous obtenez une expertise professionnelle du marché haut de gamme de Saint-Lambert sans débours personnel.',
        icon: <CheckCircle className="w-8 h-8" />,
      },
      {
        title: 'Planification fiscale intégrée',
        description: 'Stratégies de déductibilité (Smith, MAPA) particulièrement pertinentes pour propriétés de valeur élevée. Maximisez vos avantages fiscaux.',
        icon: <TrendingUp className="w-8 h-8" />,
      },
      {
        title: 'Solutions pour acheteurs exigeants',
        description: 'Professionnels établis, entrepreneurs, investisseurs : nous structurons des financements adaptés aux situations patrimoniales complexes.',
        icon: <Users className="w-8 h-8" />,
      },
      {
        title: 'Gestion intégrale du processus',
        description: 'Coordination complète de votre dossier avec institutions, évaluateurs et notaires. Service clé en main pour votre tranquillité d\'esprit.',
        icon: <ArrowRight className="w-8 h-8" />,
      },
    ]
  },

  // Programs section - RÉÉCRIT POUR SAINT-LAMBERT
  programs: {
    title: "Optimisation fiscale et exemptions",
    subtitle: "Programmes et stratégies pour alléger vos coûts d'acquisition à Saint-Lambert",
    items: [
      {
        title: "Exemptions des droits de mutation",
        description: [
          "Transferts entre époux lors de séparation ou divorce",
          "Transferts intergénérationnels selon critères légaux",
          "Legs successoraux (droit supplétif minimal applicable)",
          "Restructurations corporatives admissibles pour investisseurs"
        ]
      },
      {
        title: "Stratégies de financement avancées",
        description: [
          "Amortissement 30 ans pour premiers acheteurs (déc. 2024)",
          "Crédit d'impôt première habitation (paliers provincial et fédéral)",
          "RAP : retrait REER jusqu'à 60 000$ par personne pour mise de fonds",
          "Planification hypothécaire pour minimiser coûts d'emprunt à long terme"
        ]
      }
    ]
  },

  // What is Welcome Tax section
  whatIsWelcomeTax: {
    title: "Qu'est-ce que la taxe de bienvenue à Saint-Lambert ?",
    content: [
      "La taxe de bienvenue, formellement désignée comme droit de mutation immobilière, constitue un prélèvement municipal exigé par la Ville de Saint-Lambert lors de tout transfert de propriété immobilière. Ce droit s'applique universellement à toutes les transactions immobilières résidentielles et commerciales sur le territoire, calculé en fonction de la valeur de la propriété transférée.",
      "À Saint-Lambert, comme dans l'ensemble des municipalités québécoises, le calcul suit les taux provinciaux établis par la Loi concernant les droits sur les mutations immobilières. Pour les propriétés de valeur élevée typiques de Saint-Lambert (700 000$ à 900 000$+), cette taxe représente un montant significatif variant généralement de 9 000$ à 12 000$+, une dépense importante à intégrer dans votre planification budgétaire d'acquisition."
    ]
  },

  // How to Calculate section
  howToCalculate: {
    title: 'Comment calculer la taxe de bienvenue à Saint-Lambert en 2026 ?',
    sections: [
      {
        title: 'Établissement de la base de calcul',
        content: "Le montant imposable correspond à la valeur la plus élevée parmi :",
        items: [
          "Prix de vente stipulé dans l'acte notarié (hors TPS/TVQ)",
          "Contrepartie totale convenue pour le transfert",
          "Évaluation municipale ajustée par le facteur comparatif en vigueur"
        ]
      },
      {
        title: 'Application des taux progressifs',
        content: "Saint-Lambert applique les taux provinciaux standards :",
        items: [
          "Première tranche (0-61 500$) : 0,5%",
          "Deuxième tranche (61 500-307 800$) : 1,0%",
          "Tranche supérieure (307 800$+) : 1,5%"
        ]
      }
    ],
    example: {
      title: 'Exemple pour propriété typique lambertoise',
      propertyValue: '750 000 $ (fourchette courante)',
      calculation: [
        { range: '0 $ à 61 500 $ × 0,5%', amount: '307,50 $' },
        { range: '61 500 $ à 307 800 $ × 1,0%', amount: '2 463,00 $' },
        { range: '307 800 $ à 750 000 $ × 1,5%', amount: '6 633,00 $' }
      ],
      total: '9 403,50 $'
    },
    paymentInfo: {
      title: 'Modalités de règlement',
      content: "La Ville de Saint-Lambert transmet la facture approximativement 30 jours après l'enregistrement de l'acte de vente. Le règlement doit s'effectuer dans le délai de 30 jours suivant la réception. Modes de paiement acceptés : transfert bancaire électronique, chèque certifié ou dépôt direct aux services municipaux. Pénalités et intérêts composés applicables en cas de retard."
    }
  },

  // Market Trends section
  marketTrends: {
    title: 'Marché immobilier de Saint-Lambert : prestige de la Rive-Sud',
    sections: [
      {
        title: 'Positionnement haut de gamme',
        content: "Saint-Lambert se positionne parmi les municipalités les plus recherchées et dispendieuses de la Rive-Sud montréalaise. Le marché immobilier se caractérise par sa stabilité, sa clientèle aisée et la rareté de l'offre. Les valeurs médianes varient substantiellement selon les secteurs.",
        stats: [
          { label: 'Unifamiliales Vieux-Saint-Lambert', value: '850-1,2M$' },
          { label: 'Unifamiliales secteur Préville', value: '700-900K$' },
          { label: 'Condos secteur Victoria', value: '450-650K$' },
          { label: 'Maisons de ville récentes', value: '550-750K$' }
        ]
      },
      {
        title: 'Facteurs de valorisation',
        items: [
          { icon: Users, text: "Démographie aisée : revenus moyens parmi les plus élevés de la région métropolitaine" },
          { icon: TrendingUp, text: "Patrimoine architectural : maisons centenaires victorieuses et édouardiennes préservées" },
          { icon: Building2, text: "Localisation stratégique : 3 stations métro à proximité (Longueuil, Jean-Drapeau via passerelle)" },
          { icon: Home, text: "Qualité de vie : parc Saint-Lambert, avenue Victoria commerciale, écoles réputées" }
        ]
      }
    ]
  },

  // Investment Perspective section
  investmentPerspective: {
    title: "Investir à Saint-Lambert : un choix de prestige",
    items: [
      {
        icon: Building2,
        title: 'Accessibilité exceptionnelle',
        description: 'Connexion directe à Montréal : métro Longueuil-Université-de-Sherbrooke, REM vers centre-ville, pont Victoria historique. Proximité immédiate autoroutes 10, 20, 132. Trajet <15 min vers centre-ville Montréal.'
      },
      {
        icon: Users,
        title: 'Communauté établie et prospère',
        description: 'Population de 22 000+ résidents avec revenus élevés et niveau d\'éducation supérieur. Ville fondée en 1857 avec riche histoire. Communauté anglophone et francophone bien intégrée. Stabilité démographique.'
      },
      {
        icon: Home,
        title: 'Patrimoine et caractère unique',
        description: 'Architecture victorienne et édouardienne préservée dans Vieux-Saint-Lambert. Règlements municipaux stricts protégeant caractère patrimonial. Rues arborées, parcs matures, église historique. Ambiance villageoise unique.'
      },
      {
        icon: TrendingUp,
        title: 'Stabilité et appréciation',
        description: 'Marché stable avec faible volatilité. Demande constante pour propriétés de qualité. Inventaire limité maintient valeurs élevées. Excellent investissement long terme pour préservation capital et appréciation modérée.'
      }
    ]
  },

  // Broker Comparison section - RÉÉCRIT POUR SAINT-LAMBERT
  brokerComparison: {
    title: 'Courtier spécialisé vs Conseiller bancaire traditionnel',
    subtitle: 'Pour des propriétés haut de gamme à Saint-Lambert, l\'expertise fait toute la différence',
    independentBroker: {
      title: 'Courtier hypothécaire spécialisé',
      items: [
        'Représentation exclusive de VOS intérêts d\'acheteur',
        'Accès à 20+ institutions incluant prêteurs privés haut de gamme',
        'Négociation experte pour propriétés de 700K$ à 1,2M$+',
        'Connaissance approfondie du marché prestigieux de Saint-Lambert',
        'Structuration complexe pour situations patrimoniales élaborées',
        'Optimisation fiscale avancée (Smith, MAPA, stratégies corporatives)',
        'Service gratuit (compensation par institution prêteuse)'
      ]
    },
    bankAgent: {
      title: 'Conseiller bancaire standard',
      items: [
        'Employé salarié d\'une seule institution',
        'Catalogue de produits limité à son employeur',
        'Grille tarifaire standardisée non négociable',
        'Processus d\'approbation rigide et automatisé',
        'Absence de comparaison avec offres concurrentes',
        'Flexibilité limitée pour dossiers complexes',
        'Vision restreinte aux politiques internes uniquement'
      ]
    },
    financialImpact: {
      title: 'Impact financier significatif',
      content: 'Pour une propriété de 850 000$ typique à Saint-Lambert, la différence entre un taux standard et un taux optimisé peut représenter entre 25 000$ et 50 000$ sur la durée totale du prêt. Un courtier spécialisé dans le haut de gamme maximise systématiquement vos conditions de financement.'
    }
  },

  // Practical Tips section - RÉÉCRIT POUR SAINT-LAMBERT
  practicalTips: {
    title: 'Guide d\'achat immobilier à Saint-Lambert',
    tips: [
      {
        icon: Calculator,
        title: 'Planifier l\'investissement global',
        content: "Au-delà du prix d'achat élevé, anticipez tous les frais : taxe de bienvenue (~9 404$ pour 750K$, ~11 653$ pour 900K$), honoraires notariaux majorés (2 000-3 500$), inspection spécialisée pour propriétés anciennes (800-1 500$), évaluation (400-700$).",
        note: "Les propriétés patrimoniales peuvent nécessiter inspections additionnelles (structure, fondations) et rénovations conformes aux règlements municipaux stricts de préservation."
      },
      {
        icon: TrendingUp,
        title: 'Comprendre les secteurs prisés',
        content: "Vieux-Saint-Lambert : prestige maximal, architecture centenaire, valeurs 850K$-1,2M$+. Préville : résidentiel haut de gamme, tranquillité, 700-900K$. Victoria : vie urbaine, commerces, mix condos (450-650K$) et maisons. Proximité métro : condos jeunes professionnels.",
        items: [
          "Vérifier règlements municipaux si rénovations envisagées (protection patrimoniale)",
          "Évaluer taxes municipales et scolaires (élevées mais services de qualité)",
          "Considérer accessibilité : métro Longueuil à 5-10 min, REM proche"
        ]
      },
      {
        icon: DollarSign,
        title: 'Optimiser financement haut de gamme',
        content: "Travailler avec courtier spécialisé en propriétés de prestige. Pour achat 750-900K$, revenu familial requis : 140-170K$/an minimum (ratio 35% recommandé). Explorer amortissement 30 ans si éligible pour réduire paiements mensuels.",
        items: [
          "Préautorisation solide essentielle (marché compétitif, offres multiples fréquentes)",
          "Considérer mise de fonds >20% pour meilleures conditions et éviter SCHL",
          "Stratégies fiscales avancées pour optimiser déductibilité"
        ]
      },
      {
        icon: Home,
        title: 'Investir dans le prestige',
        content: "Saint-Lambert offre combinaison rare : proximité Montréal (<15 min centre-ville), patrimoine architectural préservé, qualité de vie exceptionnelle, communauté établie prospère. Stabilité du marché assure préservation capital long terme.",
        items: [
          "Visiter plusieurs propriétés pour comprendre nuances entre secteurs",
          "Consulter courtier immobilier expert Saint-Lambert (marché spécifique)",
          "Évaluer mode de vie : ville piétonnière, Avenue Victoria, parc Saint-Lambert"
        ]
      }
    ]
  },

  // FAQ section
  faq: {
    title: 'Questions fréquentes',
    subtitle: "Réponses pour votre achat immobilier à Saint-Lambert",
    items: [
      {
        q: "Quel est le montant de la taxe de bienvenue à Saint-Lambert ?",
        a: "Pour une propriété de 750 000$ (typique à Saint-Lambert), la taxe s'élève à 9 403,50$. Pour une propriété de 900 000$, elle atteint 11 653,50$. Pour un condo de 500 000$, comptez environ 5 653,50$. Le montant augmente progressivement selon la valeur."
      },
      {
        q: 'Pourquoi les propriétés sont-elles plus chères à Saint-Lambert ?',
        a: "Saint-Lambert combine plusieurs facteurs de valorisation : proximité immédiate Montréal (métro, REM), patrimoine architectural centenaire préservé, communauté aisée établie, Avenue Victoria commerciale animée, excellentes écoles, règlements stricts protégeant caractère distinctif."
      },
      {
        q: 'Quels revenus sont nécessaires pour acheter à Saint-Lambert ?',
        a: "Pour une unifamiliale de 750 000$, un revenu familial d'environ 140 000-150 000$/an est recommandé. Pour 900 000$, visez 170 000$/an+. Pour un condo de 500 000$, environ 95 000$/an suffit. Un courtier hypothécaire peut optimiser votre capacité d'emprunt."
      },
      {
        q: 'Quels sont les meilleurs secteurs de Saint-Lambert ?',
        a: "Vieux-Saint-Lambert : prestige, architecture historique, 850K$-1,2M$+. Préville : résidentiel haut de gamme, tranquillité, 700-900K$. Victoria : urbain, commerces, mix condos (450-650K$) et maisons. Proximité métro : condos jeunes professionnels, excellent investissement."
      },
      {
        q: 'Y a-t-il des règlements particuliers à Saint-Lambert ?',
        a: "Oui, Saint-Lambert a des règlements stricts de protection patrimoniale, notamment dans le Vieux-Saint-Lambert. Rénovations extérieures peuvent nécessiter approbations municipales. Consultez urbanisme municipal avant travaux majeurs pour assurer conformité."
      }
    ]
  },

  // Final CTA section
  finalCta: {
    title: 'Réalisez votre projet immobilier à Saint-Lambert',
    subtitle: 'Nos courtiers spécialisés en propriétés de prestige vous accompagnent pour obtenir le financement optimal dans cette ville d\'exception',
    buttons: [
      { text: 'Appelez-nous maintenant', icon: Phone },
      { text: 'Demander une soumission', icon: Mail }
    ]
  },

  // Footer
  footer: {
    about: "Experts en financement hypothécaire haut de gamme sur la Rive-Sud, nous maîtrisons les spécificités du marché prestigieux de Saint-Lambert pour vous obtenir les meilleures conditions.",
    links: [
      { text: 'Calculateur de prêt', href: '#' },
      { text: 'Taux hypothécaires', href: '#' },
      { text: 'Programmes d\'aide', href: '#' },
      { text: 'Blog immobilier', href: '#' }
    ],
    contact: {
      phone: '+1 514 477-3000',
      email: 'equipe@hypotheques.ca',
      address: 'Saint-Lambert, Québec'
    },
    copyright: '© 2026 Calculateur Taxe de Bienvenue Saint-Lambert. Tous droits réservés.',
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