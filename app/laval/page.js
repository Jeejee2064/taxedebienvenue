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

// ======================
// CITY CONTENT CONFIGURATION
// ======================
const CITY_CONTENT = {
  // Basic city information
  city: {
    name: 'Laval',
    displayName: 'Laval',
    year: '2025',
    heroImage: 'https://imgs.search.brave.com/9ZqY8YH0xQJ5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H5H/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dG91cmlzbWVsYXZh/bC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTkvMDUvY2Vu/dHJlLXZpbGxlLWxh/dmFsLmpwZw',
  },

  // Available cities for the top bar
  availableCities: [
    { name: 'Montréal', path: '/montreal' },
    { name: 'Québec', path: '/quebec' },
    { name: 'Laval', path: '/' },
    { name: 'Chambly', path: '/chambly' },
    { name: 'Candiac', path: '/candiac' },
    { name: 'Saint-Lambert', path: '/saint-lambert' },
  ],

  // Hero section
  hero: {
    title: 'Calculateur de Taxe de Bienvenue',
    subtitle: 'Estimez précisément vos droits de mutation immobilière à Laval en 2025',
    features: [
      'Calcul instantané',
      'Taux 2025',
      '100% gratuit'
    ]
  },

  // Calculator section
  calculator: {
    title: 'Calculateur',
    subtitle: 'Taxe de bienvenue 2025',
    inputLabel: "Prix d'achat de la propriété",
    inputPlaceholder: '600 000',
    buttonText: 'Calculer maintenant',
    buttonHint: 'Appuyez sur Entrée ou cliquez sur le bouton pour calculer',
    resultTitle: 'Résultat',
    resultSubtitle: 'Estimation instantanée',
    resultLabel: 'Taxe totale',
    resultLocation: 'Laval • 2025',
    emptyStateText: "Entrez un montant et cliquez\nsur calculer pour voir le résultat",
    breakdownTitle: 'Détails par tranche'
  },

  // Tax brackets (2025 rates for Laval - provincial standard rates)
  taxBrackets: [
    { max: 61500, rate: 0.5, name: '0 $ à 61 500 $' },
    { max: 307800, rate: 1.0, name: '61 500 $ à 307 800 $' },
    { max: Infinity, rate: 1.5, name: 'Plus de 307 800 $' },
  ],

  // CTA Form section
  ctaForm: {
    title: 'Experts hypothécaires à Laval',
    subtitle: 'Nos spécialistes du financement immobilier à Laval vous accompagnent pour maximiser votre capacité d\'achat et réduire vos coûts d\'acquisition',
    formTitle: 'Formulaire de contact',
    formDescription: 'Remplissez ce formulaire pour une consultation gratuite avec nos experts lavallois',
    benefits: [
      { title: 'Évaluation gratuite', description: 'Aucun frais, aucun engagement' },
      { title: 'Taux compétitifs', description: 'Accès à 20+ institutions' },
      { title: 'Expertise locale', description: 'Connaissance du marché lavallois' }
    ]
  },

  // Tax brackets display
  bracketsDisplay: {
    title: 'Grille des taux 2025',
    subtitle: 'Tranches d\'imposition des droits de mutation à Laval',
    brackets: [
      { range: '0 $ à 61 500 $', rate: '0,5%', color: 'from-green-500 to-emerald-600' },
      { range: '61 500 $ à 307 800 $', rate: '1,0%', color: 'from-blue-500 to-cyan-600' },
      { range: 'Plus de 307 800 $', rate: '1,5%', color: 'from-purple-500 to-violet-600' },
    ]
  },

  // City statistics
  statistics: {
    title: 'Laval en chiffres',
    subtitle: 'La 3e ville du Québec en pleine effervescence',
    stats: [
      { icon: Users, value: '460K', label: 'habitants (3e ville du Québec)' },
      { icon: TrendingUp, value: '+17%', label: 'ventes unifamiliales en 2024' },
      { icon: Building2, value: '14', label: 'quartiers distincts' },
      { icon: Home, value: '600K$', label: 'prix médian unifamiliale (avril 2025)' },
    ]
  },

  // Neighborhoods
  neighborhoods: {
    title: 'Les quartiers de Laval',
    subtitle: 'Découvrez les 14 secteurs issus de la fusion de 1965 pour votre investissement immobilier',
    items: [
      {
        name: 'Chomedey',
        description: 'Le cœur urbain avec 94 000 habitants. Centropolis, Carrefour Laval et la plus grande diversité culturelle. Condos de 390K$ à 969K$.',
        icon: '🏙️',
      },
      {
        name: 'Vimont',
        description: 'Centre géographique de Laval, quartier familial par excellence. Train de banlieue, hôpital principal et grands espaces verts. 359K$ à 1,125M$.',
        icon: '👨‍👩‍👧‍👦',
      },
      {
        name: 'Sainte-Rose',
        description: 'Charme patrimonial du Vieux-Sainte-Rose fondé en 1740. Église historique (1856), galeries d\'art et proximité rivière des Mille Îles.',
        icon: '🏛️',
      },
      {
        name: 'Fabreville',
        description: '2e quartier le plus peuplé (48 000 habitants). Secteur familial tranquille en bordure de la rivière des Mille Îles. 579K$ à 989K$.',
        icon: '🌊',
      },
      {
        name: 'Laval-sur-le-Lac',
        description: 'Le "Westmount de Laval". Résidences haut de gamme en bordure du lac des Deux Montagnes. Quartier cossu et exclusif.',
        icon: '💎',
      },
      {
        name: 'Pont-Viau et Laval-des-Rapides',
        description: 'Accès direct à Montréal via pont Viau et métro Cartier. Plex à partir de 575K$, idéal pour investisseurs et jeunes professionnels.',
        icon: '🚇',
      },
    ]
  },

  // Benefits section - RÉÉCRIT POUR LAVAL
  benefits: {
    title: 'Pourquoi travailler avec un courtier multi-prêteurs à Laval ?',
    subtitle: 'Optimisez votre financement dans le marché immobilier lavallois',
    items: [
      {
        title: 'Accès privilégié au marché du financement',
        description: 'Nos courtiers analysent plus de 20 institutions financières - grandes banques, Desjardins, prêteurs alternatifs - pour trouver la solution adaptée au marché lavallois où le prix médian atteint 600K$.',
        icon: <Building2 className="w-8 h-8" />,
      },
      {
        title: 'Réduction significative de vos coûts',
        description: "Sur un prêt de 600 000 $ (médiane à Laval), économiser 0,15% représente 13 500 $ sur 25 ans. Nos courtiers négocient activement pour vous.",
        icon: <DollarSign className="w-8 h-8" />,
      },
      {
        title: 'Sans frais pour vous',
        description: 'Les institutions financières rémunèrent directement votre courtier. Vous bénéficiez d\'une expertise professionnelle sans débourser un dollar.',
        icon: <CheckCircle className="w-8 h-8" />,
      },
      {
        title: 'Stratégies fiscales avancées',
        description: 'Manœuvre Smith, MAPA et autres techniques de déductibilité fiscale pour les propriétaires lavallois qui souhaitent maximiser leurs avantages.',
        icon: <TrendingUp className="w-8 h-8" />,
      },
      {
        title: 'Solutions pour profils atypiques',
        description: 'Travailleurs autonomes, nouveaux arrivants dans la communauté multiculturelle lavalloise, situations de crédit particulières : nous trouvons des solutions.',
        icon: <Users className="w-8 h-8" />,
      },
      {
        title: 'Suivi personnalisé du dossier',
        description: 'De la préautorisation jusqu\'à la signature chez le notaire, votre courtier coordonne toutes les étapes de votre financement immobilier à Laval.',
        icon: <ArrowRight className="w-8 h-8" />,
      },
    ]
  },

  // Programs section - RÉÉCRIT POUR LAVAL
  programs: {
    title: "Aide financière et exemptions à Laval",
    subtitle: "Réduisez votre fardeau fiscal lors de l'achat de votre propriété lavalloise",
    items: [
      {
        title: "Exemptions provinciales applicables",
        description: [
          "Transferts entre époux ou conjoints de fait (lors de séparation/divorce)",
          "Transferts parents-enfants selon critères légaux spécifiques",
          "Successions testamentaires (droit supplétif max 200$)"
        ]
      },
      {
        title: "Mesures fédérales récentes",
        description: [
          "Amortissement sur 30 ans pour premiers acheteurs (depuis déc. 2024)",
          "Amortissement 30 ans pour constructions neuves",
          "Crédit d'impôt première habitation (paliers provincial et fédéral)"
        ]
      }
    ]
  },

  // What is Welcome Tax section
  whatIsWelcomeTax: {
    title: "Qu'est-ce que la taxe de bienvenue à Laval ?",
    content: [
      "La taxe de bienvenue, officiellement appelée droit de mutation immobilière, représente un impôt municipal que tout acheteur d'une propriété doit acquitter lors du transfert de propriété à Laval. Cette contribution financière tire son appellation d'une croyance populaire attribuant son origine au ministre Jean Bienvenue. Toutefois, l'historien Frédéric Lemieux, œuvrant au service de la recherche de la bibliothèque de l'Assemblée nationale du Québec, a démontré que cette présomption était fausse.",
      "Cette taxe s'applique à l'acquisition de tout type de propriété résidentielle ou commerciale à Laval, qu'il s'agisse d'une maison unifamiliale, d'un condominium, d'un duplex, d'un triplex, d'un plex ou d'un immeuble à revenus. Le montant à payer varie selon la valeur de la transaction. À Laval, comme dans la majorité des municipalités québécoises, les taux appliqués suivent les tranches provinciales standards sans majoration, contrairement à Montréal."
    ]
  },

  // How to Calculate section
  howToCalculate: {
    title: 'Comment calculer la taxe de bienvenue à Laval en 2025 ?',
    sections: [
      {
        title: 'Base d\'imposition à Laval',
        content: "Le calcul s'effectue sur le montant le plus élevé parmi :",
        items: [
          "Le prix de vente inscrit dans l'acte notarié (sans TPS/TVQ)",
          "La contrepartie stipulée pour le transfert",
          "La valeur selon le rôle d'évaluation × facteur comparatif (1,002 pour Laval en 2025)"
        ]
      },
      {
        title: 'Taux progressifs provinciaux',
        content: "Laval applique les taux standards sans majoration :",
        items: [
          "0 $ à 61 500 $ : taux de 0,5%",
          "61 500 $ à 307 800 $ : taux de 1,0%",
          "Plus de 307 800 $ : taux de 1,5%"
        ]
      }
    ],
    example: {
      title: 'Exemple pour une propriété médiane lavalloise',
      propertyValue: '600 000 $ (prix médian avril 2025)',
      calculation: [
        { range: '0 $ à 61 500 $ × 0,5%', amount: '307,50 $' },
        { range: '61 500 $ à 307 800 $ × 1,0%', amount: '2 463,00 $' },
        { range: '307 800 $ à 600 000 $ × 1,5%', amount: '4 383,00 $' }
      ],
      total: '7 153,50 $'
    },
    paymentInfo: {
      title: 'Options de paiement à Laval',
      content: "La Ville expédie la facture ~30 jours après l'inscription de l'acte. Paiement dans les 30 jours. Pour montants >300$, option de 2 versements disponible. Paiement possible par virement bancaire, chèque (CP 11051, Montréal H3C 0R9) ou au 1333 boul. Chomedey, bureau 101."
    }
  },

  // Market Trends section
  marketTrends: {
    title: 'Marché immobilier lavallois : boom de 2025',
    sections: [
      {
        title: 'Reprise spectaculaire du marché',
        content: "Le marché lavallois connaît une vigueur remarquable en 2024-2025. Les ventes de maisons unifamiliales ont bondi de 17% en 2024, avec 2 571 transactions au 30 novembre 2025 (+12% vs 2024). Cette reprise s'explique par les 9 baisses consécutives du taux directeur (de 5% en mai 2024 à 2,25% en oct. 2025).",
        stats: [
          { label: 'Prix médian unifamiliale (avril 2025)', value: '600 000 $' },
          { label: 'Hausse annuelle', value: '+3%' },
          { label: 'Prix médian condo', value: '410 000 $' },
          { label: 'Délai de vente moyen', value: '42 jours' }
        ]
      },
      {
        title: 'Dynamiques du marché lavallois',
        items: [
          { icon: Users, text: "460 396 habitants : 3e ville du Québec, 2e pour proportion d'immigrants" },
          { icon: TrendingUp, text: "Appréciation spectaculaire : valeur moyenne passée de 108 607$ (1999) à 627 295$ (2024)" },
          { icon: Building2, text: "Rareté de l'offre : 1 409 inscriptions fin nov. 2025, niveau identique à 2024" },
          { icon: Home, text: "Marché vendeurs : ratio ventes/inscriptions de 81% en avril 2025" }
        ]
      }
    ]
  },

  // Investment Perspective section
  investmentPerspective: {
    title: "Investir à Laval : perspectives 2025",
    items: [
      {
        icon: Building2,
        title: 'Position stratégique unique',
        description: '3 stations de métro (Cartier, De la Concorde, Montmorency), accès autoroutes 15/440/13, train de banlieue Exo. Prix médian 600K$ vs 800K$ à Montréal pour une unifamiliale.'
      },
      {
        icon: Users,
        title: 'Croissance démographique soutenue',
        description: 'Population de 460K en 2025, +112 200 personnes depuis 1998. Immigration internationale moteur principal. Projections +4,6% d\'ici 2026. Âge moyen jeune, forte présence familiale.'
      },
      {
        icon: Home,
        title: 'Diversité de quartiers attractifs',
        description: '14 quartiers distincts : Chomedey urbain et multiculturel, Vimont familial, Sainte-Rose patrimonial, Laval-sur-le-Lac prestigieux. Options pour tous budgets de 359K$ à 1,125M$+.'
      },
      {
        icon: TrendingUp,
        title: 'Marché locatif et plex dynamiques',
        description: 'Ventes de plex +17% en 2025 (292 transactions). Forte demande locative près du métro et dans Chomedey. Triplex à partir de 575K$ offrent revenus stables.'
      }
    ]
  },

  // Broker Comparison section - RÉÉCRIT POUR LAVAL
  brokerComparison: {
    title: 'Courtier multi-prêteurs vs Représentant bancaire',
    subtitle: 'Dans le marché lavallois en effervescence, le bon choix de financement change tout',
    independentBroker: {
      title: 'Courtier hypothécaire multi-prêteurs',
      items: [
        'Représente VOS intérêts d\'acheteur lavallois',
        'Compare 20+ prêteurs pour votre dossier spécifique',
        'Négocie les taux et conditions en votre faveur',
        'Solutions créatives pour tous profils (autonomes, immigrants, etc.)',
        'Expertise du marché local : connaît les spécificités lavalloises',
        'Stratégies fiscales (Smith, MAPA) pour maximiser déductions',
        'Gratuit pour vous (rémunération par l\'institution prêteuse)'
      ]
    },
    bankAgent: {
      title: 'Représentant d\'une seule banque',
      items: [
        'Employé d\'une institution spécifique',
        'Offre uniquement les produits de son employeur',
        'Grille tarifaire fixe sans marge de négociation',
        'Critères d\'acceptation rigides et standardisés',
        'Aucune comparaison avec d\'autres institutions',
        'Peut refuser les dossiers non conventionnels',
        'Vision limitée du marché du financement'
      ]
    },
    financialImpact: {
      title: 'L\'impact sur votre portefeuille',
      content: 'Avec un prix médian de 600 000 $ à Laval (avril 2025), la différence entre un bon taux et le meilleur taux disponible peut représenter entre 15 000 $ et 40 000 $ sur la durée de votre prêt. Un courtier multi-prêteurs maximise vos chances d\'obtenir les meilleures conditions du marché.'
    }
  },

  // Practical Tips section - RÉÉCRIT POUR LAVAL
  practicalTips: {
    title: 'Conseils pour acheter à Laval',
    tips: [
      {
        icon: Calculator,
        title: 'Budgétiser tous les frais d\'acquisition',
        content: "Au-delà du prix d'achat, intégrez la taxe de bienvenue (7 154$ pour une propriété à 600K$), les frais de notaire, l'inspection et l'évaluation. La facture moyenne de taxe atteignait 8 000$ en 2023, en hausse de 70% depuis 2017.",
        note: "Pour un condo au prix médian de 410K$, prévoyez environ 4 304$ de taxe de bienvenue. Utilisez notre calculateur pour votre situation."
      },
      {
        icon: TrendingUp,
        title: 'Choisir le bon quartier lavallois',
        content: "Laval offre 14 quartiers distincts issus de la fusion de 1965. Chomedey attire les jeunes professionnels (urbain, multiculturel). Vimont et Fabreville conviennent aux familles (écoles, parcs). Sainte-Rose séduit par son cachet patrimonial.",
        items: [
          "Proximité métro : Cartier, De la Concorde, Montmorency",
          "Train de banlieue : gare dans plusieurs secteurs",
          "Budget : de 359K$ (condos Vimont) à 1,125M$+ (Vimont/Laval-sur-le-Lac)"
        ]
      },
      {
        icon: DollarSign,
        title: 'Profiter du marché vendeurs intelligemment',
        content: "Avec un ratio ventes/inscriptions de 81% et seulement 42 jours de délai moyen, le marché favorise les vendeurs mais offre plus de choix qu'en 2023. Une préautorisation solide est essentielle.",
        items: [
          "Revenu requis : ~113K$/an pour une unifamiliale à 600K$",
          "Revenu requis : ~78K$/an pour un condo à 410K$",
          "Nouvelle règle : amortissement 30 ans pour premiers acheteurs (déc. 2024)"
        ]
      },
      {
        icon: Home,
        title: 'Considérer les plex pour investissement',
        content: "Les ventes de plex ont explosé de 17% en 2025 (292 transactions). Triplex disponibles à partir de 575K$ dans Pont-Viau et Laval-des-Rapides. Forte demande locative grâce à la population multiculturelle et aux étudiants.",
        items: [
          "Générer des revenus tout en occupant votre propriété",
          "Marché locatif dynamique (2e place au Québec pour proportion d'immigrants)",
          "Secteurs à considérer : Chomedey, Pont-Viau, près du métro"
        ]
      }
    ]
  },

  // FAQ section
  faq: {
    title: 'Questions fréquentes',
    subtitle: "Tout savoir sur la taxe de bienvenue à Laval",
    items: [
      {
        q: "Quelle est la taxe de bienvenue pour une maison à 600 000$ à Laval ?",
        a: "Pour une propriété au prix médian lavallois de 600 000$ (avril 2025), la taxe de bienvenue s'élève à 7 153,50$. Ce montant se calcule par tranches : 307,50$ (première tranche), 2 463$ (deuxième tranche) et 4 383$ (troisième tranche)."
      },
      {
        q: 'Puis-je payer la taxe en plusieurs versements à Laval ?',
        a: "Oui ! Pour les montants supérieurs à 300$, Laval offre une option de paiement en deux versements. La facture est envoyée environ 30 jours après l'inscription de l'acte. En août 2024, le Parti Laval a proposé d'étendre cette option à 4 versements sans intérêt."
      },
      {
        q: 'Les taux de Laval sont-ils plus avantageux que Montréal ?',
        a: "Oui, absolument. Laval applique les taux provinciaux standards (maximum 1,5%), tandis que Montréal applique des taux bonifiés allant jusqu'à 3% pour les propriétés de plus de 2M$. Pour une propriété haut de gamme, Laval est nettement plus avantageux."
      },
      {
        q: 'Quel quartier de Laval choisir selon mon profil ?',
        a: "Chomedey (94 000 hab.) : jeunes professionnels, vie urbaine, multiculturel. Vimont : familles, centre géographique, train de banlieue. Sainte-Rose : charme patrimonial, Vieux village 1740. Fabreville : tranquillité, familles. Laval-sur-le-Lac : prestige, haut de gamme."
      },
      {
        q: 'Le marché de Laval est-il favorable aux acheteurs en 2025 ?',
        a: "Le marché favorise actuellement les vendeurs avec un ratio ventes/inscriptions de 81% et 1 409 inscriptions stables. Toutefois, les ventes ont bondi de 17% (unifamiliales) grâce aux baisses de taux. Les acheteurs bien préparés avec préautorisation trouvent des opportunités."
      }
    ]
  },

  // Final CTA section
  finalCta: {
    title: 'Prêt à devenir propriétaire à Laval ?',
    subtitle: 'Contactez nos experts du financement immobilier lavallois pour une évaluation gratuite et découvrez comment maximiser votre pouvoir d\'achat',
    buttons: [
      { text: 'Appelez-nous maintenant', icon: Phone },
      { text: 'Demander une soumission', icon: Mail }
    ]
  },

  // Footer
  footer: {
    about: "Spécialistes du financement hypothécaire à Laval, nous connaissons parfaitement les 14 quartiers de la ville et vous guidons vers le meilleur financement possible.",
    links: [
      { text: 'Calculateur de prêt', href: '#' },
      { text: 'Taux hypothécaires', href: '#' },
      { text: 'Programmes d\'aide', href: '#' },
      { text: 'Blog immobilier', href: '#' }
    ],
    contact: {
      phone: '(450) 678-9012',
      email: 'info@votresite.com',
      address: 'Laval, Québec'
    },
    copyright: '© 2025 Calculateur Taxe de Bienvenue Laval. Tous droits réservés.',
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
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
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
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${idx === 0 ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-700 text-white hover:bg-slate-600 border-2 border-slate-600'} px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl`}
                  >
                    <Icon className="w-5 h-5" />
                    {button.text}
                  </motion.button>
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