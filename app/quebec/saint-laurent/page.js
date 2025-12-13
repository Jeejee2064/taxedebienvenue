'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Calculator,
  TrendingUp,
  MapPin,
  ChevronDown,
  Users,
  School,
  Building,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  ArrowRight,
  DollarSign,
  FileText,
  AlertCircle,
  Award,
  Landmark,
} from 'lucide-react';

export default function SaintLambertTaxePage() {
  const [priceInput, setPriceInput] = useState('');
  const [evaluationInput, setEvaluationInput] = useState('');
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeSection, setActiveSection] = useState('calculateur');
  const resultRef = useRef(null);
  const calculatorRef = useRef(null);

  // Sticky navigation
  const sections = [
    { id: 'calculateur', label: 'Calculateur', icon: Calculator },
    { id: 'taux', label: 'Taux 2025', icon: TrendingUp },
    { id: 'quartiers', label: 'Quartiers', icon: MapPin },
    { id: 'exonerations', label: 'Exonérations', icon: CheckCircle },
    { id: 'vivre', label: 'Vivre à St-Lambert', icon: Home },
    { id: 'faq', label: 'FAQ', icon: FileText },
  ];

  const calculateTax = (baseValue) => {
    const brackets = [
      { max: 61500, rate: 0.5, label: '0$ - 61 500$' },
      { max: 307800, rate: 1.0, label: '61 500$ - 307 800$' },
      { max: 500000, rate: 1.5, label: '307 800$ - 500 000$' },
      { max: Infinity, rate: 3.0, label: '500 000$+' },
    ];

    let total = 0;
    const breakdown = [];
    let prev = 0;

    for (let i = 0; i < brackets.length; i++) {
      const b = brackets[i];
      const bracketMin = prev;
      const bracketMax = Math.min(baseValue, b.max);

      if (baseValue > bracketMin) {
        const taxable = bracketMax - bracketMin;
        const tax = taxable * (b.rate / 100);
        total += tax;
        breakdown.push({
          label: b.label,
          taxable,
          rate: b.rate,
          tax,
        });
      }

      if (baseValue <= b.max) break;
      prev = b.max;
    }

    return { total, breakdown };
  };

  const formatCurrency = (v) =>
    new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
    }).format(v);

  const handleCalculate = () => {
    const price = parseFloat(priceInput.replace(/[^0-9.]/g, ''));
    const evaluation = parseFloat(evaluationInput.replace(/[^0-9.]/g, ''));

    if (!price || price <= 0) return;

    setIsCalculating(true);
    setTimeout(() => {
      // Base d'imposition = le plus élevé entre prix d'achat et évaluation municipale
      const baseValue = evaluation && evaluation > price ? evaluation : price;
      const taxResult = calculateTax(baseValue);
      setResult({ ...taxResult, baseValue, usedEvaluation: evaluation > price });
      setIsCalculating(false);
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 400);
  };

  // Scroll spy for navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quartiers = [
    {
      name: 'Centre-ville',
      description:
        'Cœur vibrant avec la rue Victoria, boutiques, restaurants et accès rapide au métro.',
      avgPrice: '950 000$',
      highlights: ['Gare (15 min MTL)', 'Commerces', 'Urbain'],
    },
    {
      name: 'Préville',
      description:
        'Quartier familial recherché avec écoles, parcs et maisons unifamiliales.',
      avgPrice: '1 050 000$',
      highlights: ['Familles', 'Écoles', 'Parcs'],
    },
    {
      name: 'Préville-en-bas',
      description:
        'Joyau patrimonial avec demeures centenaires, grands terrains et végétation mature.',
      avgPrice: '1 400 000$',
      highlights: ['Historique', 'Grands terrains', 'Prestige'],
    },
    {
      name: 'Haut-Saint-Lambert',
      description:
        'Développement moderne (années 2000) avec constructions neuves et spacieuses.',
      avgPrice: '1 200 000$',
      highlights: ['Moderne', 'Familles', 'Neuf'],
    },
    {
      name: 'Parc Victoria',
      description:
        "Secteur de prestige avec maisons victoriennes en brique rouge d'époque.",
      avgPrice: '1 300 000$',
      highlights: ['Architecture', 'Prestige', 'Patrimoine'],
    },
  ];

  const faqItems = [
    {
      q: 'Quand dois-je payer la taxe de bienvenue à Saint-Lambert?',
      a: "Vous devez payer en un seul versement dans les 30 jours suivant la réception de la facture municipale, généralement envoyée quelques semaines après la publication de l'acte notarié.",
    },
    {
      q: 'Combien coûte la taxe pour une maison de 1 million$ à Saint-Lambert?',
      a: 'Pour une propriété de 1 000 000$, la taxe de bienvenue totale est de 20 653,50$. Ce montant est calculé par tranches progressives selon les taux municipaux.',
    },
    {
      q: 'Puis-je inclure la taxe de bienvenue dans mon hypothèque?',
      a: "Dans certains cas, oui. Parlez-en avec votre courtier hypothécaire pour intégrer ce montant dans votre financement et éviter un déboursé important lors de l'achat.",
    },
    {
      q: "Comment est calculée la base d'imposition?",
      a: "La base d'imposition est le montant le PLUS ÉLEVÉ entre: (1) le prix d'achat, (2) le prix inscrit à l'acte, ou (3) la valeur au rôle d'évaluation × facteur comparatif (1,00 en 2025).",
    },
    {
      q: 'Mon transfert entre conjoints est-il exonéré?',
      a: 'Oui! Les transferts entre conjoints mariés, unis civilement ou conjoints de fait sont exonérés. Un droit supplétif de max 200$ peut toutefois être perçu pour frais administratifs.',
    },
    {
      q: "Que se passe-t-il si je ne paie pas dans les délais?",
      a: "Le non-respect peut entraîner une pénalité de 150% du droit normalement exigible imposée par Revenu Québec. Il est crucial de respecter les échéances.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Header */}
      <header className="backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Landmark className="w-7 h-7 text-indigo-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Taxe de Bienvenue</h1>
                <p className="text-xs text-slate-400">Saint-Lambert, Québec</p>
              </div>
            </div>
            <button className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-lg font-medium hover:from-emerald-500 hover:to-emerald-400 transition-all shadow-lg flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Consultation gratuite
            </button>
          </div>
        </div>
      </header>

      {/* Sticky Navigation */}
      <nav className="sticky top-[73px] z-40 bg-slate-800/95 backdrop-blur-md border-b border-slate-700/50 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar gap-1 py-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    const element = document.getElementById(section.id);
                    if (element) {
                      const yOffset = -140;
                      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeSection === section.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Calculateur de Taxe de Bienvenue
            </h2>
            <p className="text-xl text-slate-300 mb-2">Saint-Lambert 2025</p>
            <p className="text-slate-400 max-w-3xl mx-auto">
              Calculez instantanément vos droits de mutation immobilière et découvrez comment
              financer votre achat dans l'une des villes les plus prestigieuses du Québec
            </p>
          </motion.div>
        </div>

        {/* SECTION 1: CALCULATEUR */}
        <section id="calculateur" className="mb-20 scroll-mt-32" ref={calculatorRef}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-800/60 to-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-600/20 rounded-xl">
                  <Calculator className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Calculateur</h3>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Prix d'achat de la propriété
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={priceInput}
                      onChange={(e) => setPriceInput(e.target.value)}
                      placeholder="850 000"
                      className="w-full pl-12 pr-4 py-4 bg-slate-900/80 border border-slate-600 rounded-xl text-white text-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Évaluation municipale (optionnel)
                  </label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={evaluationInput}
                      onChange={(e) => setEvaluationInput(e.target.value)}
                      placeholder="1 082 569"
                      className="w-full pl-12 pr-4 py-4 bg-slate-900/80 border border-slate-600 rounded-xl text-white text-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2 flex items-start gap-1">
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    La base d'imposition = le montant le plus élevé entre le prix d'achat et l'évaluation
                  </p>
                </div>

                <button
                  onClick={handleCalculate}
                  disabled={!priceInput || isCalculating}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-500 hover:via-violet-500 hover:to-purple-500 transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCalculating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Calculator className="w-5 h-5" />
                      Calculer la taxe
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Results Card */}
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-800/60 to-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Résultat du calcul</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-emerald-600/30 via-emerald-500/20 to-emerald-400/10 border-2 border-emerald-500/50 rounded-xl p-6">
                    <p className="text-sm text-emerald-300 mb-1 font-medium uppercase tracking-wide">
                      Taxe de bienvenue totale
                    </p>
                    <p className="text-5xl font-bold text-white mb-2">
                      {formatCurrency(result.total)}
                    </p>
                    <p className="text-sm text-slate-300">
                      Base d'imposition: {formatCurrency(result.baseValue)}
                      {result.usedEvaluation && (
                        <span className="text-yellow-400 ml-2">(évaluation municipale)</span>
                      )}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                      Détail par tranche
                    </p>
                    {result.breakdown.map((b, i) => (
                      <div
                        key={i}
                        className="bg-slate-900/80 border border-slate-700 rounded-lg p-4 hover:border-indigo-500/50 transition-all"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-400">{b.label}</span>
                          <span className="text-sm font-semibold text-indigo-400">
                            {b.rate}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-500">
                            Sur {formatCurrency(b.taxable)}
                          </span>
                          <span className="text-lg font-bold text-white">
                            {formatCurrency(b.tax)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA après calcul */}
                  <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/50 rounded-xl p-5 mt-6">
                    <p className="text-sm text-violet-200 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      <strong>Besoin de financement?</strong>
                    </p>
                    <p className="text-sm text-slate-300 mb-4">
                      Nos courtiers peuvent vous aider à inclure la taxe de bienvenue dans votre
                      prêt hypothécaire et vous obtenir le meilleur taux.
                    </p>
                    <button className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-500 hover:to-purple-500 transition-all shadow-lg">
                      Consultation gratuite
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
                    <Calculator className="w-10 h-10 text-slate-500" />
                  </div>
                  <p className="text-slate-400">
                    Entrez le prix d'achat pour calculer votre taxe de bienvenue
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: TAUX 2025 */}
        <section id="taux" className="mb-20 scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-800/40 to-slate-800/20 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-600/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">Taux applicables 2025</h3>
                <p className="text-slate-400 mt-1">
                  Saint-Lambert | Facteur comparatif: 1,00
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-300 font-medium">0$ - 61 500$</span>
                  <span className="text-2xl font-bold text-indigo-400">0,5%</span>
                </div>
                <p className="text-sm text-slate-500">
                  Exemple: 61 500$ × 0,5% = 307,50$
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-300 font-medium">61 500$ - 307 800$</span>
                  <span className="text-2xl font-bold text-indigo-400">1,0%</span>
                </div>
                <p className="text-sm text-slate-500">
                  Tranche de 246 300$ taxée à 1%
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-300 font-medium">307 800$ - 500 000$</span>
                  <span className="text-2xl font-bold text-indigo-400">1,5%</span>
                </div>
                <p className="text-sm text-slate-500">
                  Tranche de 192 200$ taxée à 1,5%
                </p>
              </div>

              <div className="bg-slate-900/60 border border-emerald-700 rounded-xl p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-300 font-medium">500 000$+</span>
                  <span className="text-2xl font-bold text-emerald-400">3,0%</span>
                </div>
                <p className="text-sm text-slate-500">
                  Taux majoré pour propriétés haut de gamme
                </p>
              </div>
            </div>

            <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-xl p-6">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                Comment est calculée la base d'imposition?
              </h4>
              <p className="text-slate-300 mb-4 leading-relaxed">
                La taxe est calculée sur le <strong>montant le plus élevé</strong> parmi: (1) le
                prix d'achat réel, (2) le prix inscrit à l'acte de transfert, ou (3) la valeur
                au rôle d'évaluation municipale × facteur comparatif.
              </p>
              <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-5">
                <p className="text-sm text-slate-400 mb-2">
                  <strong className="text-white">Exemple concret:</strong>
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Maison achetée à <strong className="text-emerald-400">850 000$</strong> •
                  Évaluation municipale: <strong className="text-yellow-400">1 082 569$</strong> •
                  Facteur: 1,00
                  <br />
                  <span className="text-indigo-400">
                    → Base d'imposition: 1 082 569$ (la plus élevée)
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 3: QUARTIERS */}
        <section id="quartiers" className="mb-20 scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-indigo-600/20 rounded-xl">
                <MapPin className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">Quartiers de Saint-Lambert</h3>
                <p className="text-slate-400 mt-1">
                  Prix moyens et taxe de bienvenue estimée par secteur
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quartiers.map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 hover:border-indigo-500/50 transition-all shadow-lg group"
                >
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {q.name}
                  </h4>
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                    {q.description}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                    <span className="text-lg font-semibold text-emerald-400">
                      Prix moyen: {q.avgPrice}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {q.highlights.map((h, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 rounded-full text-xs text-indigo-300"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <button className="w-full py-2 bg-slate-700 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2">
                    <Calculator className="w-4 h-4" />
                    Calculer pour ce quartier
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/50 rounded-xl p-6">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-violet-400" />
                Saint-Lambert: une ville d'exception
              </h4>
              <p className="text-slate-300 leading-relaxed mb-3">
                Prix médian: <strong className="text-emerald-400">1 000 000$</strong> •
                Population: 23 000 habitants • 16% des ménages millionnaires • 51e rang au
                Québec en population
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Située sur la Rive-Sud avec accès direct au pont Victoria, Saint-Lambert allie
                prestige, patrimoine architectural et proximité de Montréal. Revenu familial
                moyen: 134 200$.
              </p>
            </div>
          </motion.div>
        </section>

        {/* SECTION 4: EXONÉRATIONS */}
        <section id="exonerations" className="mb-20 scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-800/40 to-slate-800/20 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-600/20 rounded-xl">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">Exonérations possibles</h3>
                <p className="text-slate-400 mt-1">
                  Certaines situations vous permettent d'éviter la taxe
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-xl p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white mb-2">Transferts exonérés</h4>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li>• Entre conjoints mariés</li>
                        <li>• Entre conjoints unis civilement</li>
                        <li>• Entre conjoints de fait (vivant maritalement)</li>
                        <li>• Entre parents et enfants (ligne directe)</li>
                        <li>• Entre grands-parents et petits-enfants</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-4 pl-9">
                    Droit supplétif de max 200$ pour frais administratifs
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-red-600/10 border border-red-500/30 rounded-xl p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white mb-2">Transferts NON exonérés</h4>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li>• Entre frères et sœurs</li>
                        <li>• Rachat de la part d'un ex-conjoint</li>
                        <li>• Héritage d'un oncle/tante</li>
                        <li>• Héritage d'autres membres de la famille élargie</li>
                        <li>• Transferts entre amis</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-indigo-600/10 border border-indigo-500/30 rounded-xl p-6">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-indigo-400" />
                Vous pensez être admissible?
              </h4>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Les critères d'exonération peuvent être complexes. Consultez un notaire ou nos
                courtiers pour valider votre situation et éviter des surprises coûteuses.
              </p>
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all">
                Vérifier mon admissibilité
              </button>
            </div>
          </motion.div>
        </section>

        {/* SECTION 5: VIVRE À SAINT-LAMBERT */}
        <section id="vivre" className="mb-20 scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-indigo-600/20 rounded-xl">
                <Home className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">Pourquoi acheter à Saint-Lambert?</h3>
                <p className="text-slate-400 mt-1">
                  Un cadre de vie exceptionnel sur la Rive-Sud
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Landmark className="w-6 h-6 text-indigo-400" />
                </div>
                <h4 className="font-bold text-white mb-2">Patrimoine & Histoire</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Demeures centenaires, architecture d'époque préservée, Manoir Simard (1760),
                  écluses patrimoniales depuis 1959
                </p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="font-bold text-white mb-2">Localisation Stratégique</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Pont Victoria, accès Champlain/Jacques-Cartier, gare vers MTL (15 min),
                  passerelle vélo vers Parc Jean-Drapeau
                </p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center mb-4">
                  <School className="w-6 h-6 text-violet-400" />
                </div>
                <h4 className="font-bold text-white mb-2">Écoles & Services</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  3 écoles primaires francophones, St. Lambert Elementary, Collège
                  Durocher-St-Lambert, Centre culturel, Orchestre symphonique
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-800/60 to-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-white mb-6">Le marché immobilier</h4>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                      <span className="text-slate-400">Prix médian</span>
                      <span className="text-xl font-bold text-emerald-400">1 000 000$</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                      <span className="text-slate-400">Revenu familial moyen</span>
                      <span className="text-xl font-bold text-white">134 200$</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                      <span className="text-slate-400">Ménages millionnaires</span>
                      <span className="text-xl font-bold text-yellow-400">~16%</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                      <span className="text-slate-400">Résidences unifamiliales</span>
                      <span className="text-xl font-bold text-white">57%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6">
                  <h5 className="font-semibold text-white mb-3">Devise de la ville</h5>
                  <p className="text-2xl font-serif italic text-indigo-300 mb-3">
                    "Maximus in minimis"
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Se montrer grand jusque dans les détails infimes. Cette philosophie se
                    reflète dans l'attention portée au patrimoine et aux services municipaux.
                  </p>
                  <p className="text-xs text-slate-500">
                    Nommée en l'honneur de Lambert Closse, sergent-major et gouverneur
                    intérimaire de Montréal
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 6: FAQ */}
        <section id="faq" className="mb-20 scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-800/40 to-slate-800/20 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-indigo-600/20 rounded-xl">
                <FileText className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">Questions fréquentes</h3>
                <p className="text-slate-400 mt-1">
                  Tout ce que vous devez savoir sur la taxe de bienvenue
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-900/60 border border-slate-700 rounded-xl overflow-hidden group"
                >
                  <summary className="px-6 py-4 cursor-pointer list-none flex justify-between items-center hover:bg-slate-800/80 transition-all">
                    <span className="font-semibold text-white pr-4">{item.q}</span>
                    <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 py-4 border-t border-slate-700 bg-slate-900/40">
                    <p className="text-slate-300 leading-relaxed">{item.a}</p>
                  </div>
                </motion.details>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-emerald-600/20 to-emerald-500/10 border border-emerald-500/50 rounded-xl p-6">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-400" />
                Besoin de plus d'informations?
              </h4>
              <p className="text-slate-300 mb-4">
                Contactez la Ville de Saint-Lambert: <strong>450 672-4444</strong> ou{' '}
                <a
                  href="mailto:finances@saint-lambert.ca"
                  className="text-emerald-400 hover:underline"
                >
                  finances@saint-lambert.ca
                </a>
              </p>
            </div>
          </motion.div>
        </section>

        {/* CTA FINAL SECTION */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-2xl p-10 text-center shadow-2xl"
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              Prêt à acheter à Saint-Lambert?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
              Nos courtiers hypothécaires spécialisés dans la Rive-Sud vous aident à financer
              votre achat et à inclure la taxe de bienvenue dans votre prêt. Obtenez le meilleur
              taux garanti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all shadow-xl flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Consultation gratuite
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                Obtenir une soumission
              </button>
            </div>
            <p className="text-white/70 text-sm mt-6">
              Sans frais • Sans engagement • Réponse en 24h
            </p>
          </motion.div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 backdrop-blur-md py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">Calculateur Taxe de Bienvenue</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Outil gratuit pour calculer vos droits de mutation immobilière au Québec.
                Service de courtage hypothécaire inclus.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Villes populaires</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-400">
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Montréal
                </a>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Longueuil
                </a>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Brossard
                </a>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Laval
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> 1-800-XXX-XXXX
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> info@example.com
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-center">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Calculateur Taxe de Bienvenue Québec. Tous droits
              réservés.
            </p>
            <p className="text-xs text-slate-600 mt-2">
              Les taux et informations sont fournis à titre indicatif. Consultez votre notaire
              pour confirmation.
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        details summary::-webkit-details-marker {
          display: none;
        }
      `}</style>
    </div>
  );
}