'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Calculator,
  TrendingUp,
  MapPin,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  ChevronDown,
  Search,
  Globe,
  Shield,
  Clock,
  Award,
  BarChart,
  Home,
  Layers,
  HelpCircle,
  Users
} from 'lucide-react';

// ======================
// DATA & CONFIGURATION
// ======================
const CITY_CONTENT = {


  // Available cities for the top bar
  availableCities: [
    { name: 'Montréal', path: '/montreal' },
    { name: 'Québec', path: '/quebec' },
    { name: 'Laval', path: '/' },
    { name: 'Chambly', path: '/chambly' },
    { name: 'Candiac', path: '/candiac' },
    { name: 'Saint-Lambert', path: '/saint-lambert' },
  ],

 
};

const CITIES_DATA = [
  {
    name: 'Montréal',
    path: '/montreal',
    region: 'Montréal',
    population: '1.8M',
    avgPrice: '925K$',
    taxBrackets: [
      { max: 61500, rate: 0.5, name: '0 $ à 61 500 $' },
      { max: 307800, rate: 1.0, name: '61 500 $ à 307 800 $' },
      { max: 550000, rate: 1.5, name: '307 800 $ à 550 000 $' },
      { max: 1100000, rate: 2.0, name: '550 000 $ à 1 100 000 $' },
      { max: 2100000, rate: 2.5, name: '1 100 000 $ à 2 100 000 $' },
      { max: Infinity, rate: 3.0, name: 'Plus de 2 100 000 $' },
    ],
    color: 'bg-red-50 text-red-700 border-red-100'
  },
  {
    name: 'Québec',
    path: '/quebec',
    region: 'Capitale-Nationale',
    population: '549K',
    avgPrice: '450K$',
    taxBrackets: [
      { max: 61500, rate: 0.5, name: '0 $ à 61 500 $' },
      { max: 307800, rate: 1.0, name: '61 500 $ à 307 800 $' },
      { max: Infinity, rate: 1.5, name: 'Plus de 307 800 $' },
    ],
    color: 'bg-blue-50 text-blue-700 border-blue-100'
  },
  {
    name: 'Laval',
    path: '/laval',
    region: 'Laval',
    population: '438K',
    avgPrice: '600K$',
    taxBrackets: [
      { max: 61500, rate: 0.5, name: '0 $ à 61 500 $' },
      { max: 307800, rate: 1.0, name: '61 500 $ à 307 800 $' },
      { max: 500000, rate: 1.5, name: '307 800 $ à 500 000 $' },
      { max: 1000000, rate: 2.0, name: '500 000 $ à 1 000 000 $' },
      { max: Infinity, rate: 2.5, name: 'Plus de 1 000 000 $' },
    ],
    color: 'bg-emerald-50 text-emerald-700 border-emerald-100'
  },
  {
    name: 'Chambly',
    path: '/chambly',
    region: 'Montérégie',
    population: '31K',
    avgPrice: '547K$',
    taxBrackets: [
      { max: 61500, rate: 0.5, name: '0 $ à 61 500 $' },
      { max: 307800, rate: 1.0, name: '61 500 $ à 307 800 $' },
      { max: Infinity, rate: 1.5, name: 'Plus de 307 800 $' },
    ],
    color: 'bg-purple-50 text-purple-700 border-purple-100'
  },
  {
    name: 'Candiac',
    path: '/candiac',
    region: 'Montérégie',
    population: '25K',
    avgPrice: '550K$',
    taxBrackets: [
      { max: 61500, rate: 0.5, name: '0 $ à 61 500 $' },
      { max: 307800, rate: 1.0, name: '61 500 $ à 307 800 $' },
      { max: Infinity, rate: 1.5, name: 'Plus de 307 800 $' },
    ],
    color: 'bg-cyan-50 text-cyan-700 border-cyan-100'
  },
  {
    name: 'Saint-Lambert',
    path: '/saint-lambert',
    region: 'Montérégie',
    population: '22K',
    avgPrice: '850K$',
    taxBrackets: [
      { max: 61500, rate: 0.5, name: '0 $ à 61 500 $' },
      { max: 307800, rate: 1.0, name: '61 500 $ à 307 800 $' },
      { max: 500000, rate: 1.5, name: '307 800 $ à 500 000 $' },
      { max: 1000000, rate: 2.0, name: '500 000 $ à 1 000 000 $' },
      { max: Infinity, rate: 2.5, name: 'Plus de 1 000 000 $' },
    ],
    color: 'bg-amber-50 text-amber-700 border-amber-100'
  }
];

// ======================
// MAIN COMPONENT
// ======================

export default function GlobalHomePage() {
  const [selectedCity, setSelectedCity] = useState(CITIES_DATA[0]);
  const [price, setPrice] = useState('');
  const [tax, setTax] = useState(0);
  const [breakdown, setBreakdown] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const resultRef = useRef(null);
  const cityDropdownRef = useRef(null);

  const filteredCities = CITIES_DATA.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateTax = (value) => {
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(numValue) || numValue <= 0) {
      setTax(0);
      setBreakdown([]);
      return;
    }

    const brackets = selectedCity.taxBrackets;
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
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
    setSearchQuery('');
    if (price) calculateTax(price);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(e.target)) {
        setIsCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. HERO & CALCULATOR */}
      <div className="relative z-20 border-b border-white/10 bg-slate-900/50 backdrop-blur-sm">
                <div className="w-full mx-auto px-4 bg-white py-3 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-800">Calculateur disponible pour :</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {CITY_CONTENT.availableCities.map((city, idx) => (
                        <a
                          key={idx}
                          href={city.path}
                          className={`px-3 py-1.5 rounded-full border-2 border-slate-800 text-sm font-medium transition-colors `}
                        >
                          {city.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Calculateur de Taxe de Bienvenue Québec 2026
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
              Estimez précisément vos droits de mutation pour toutes les municipalités du Québec. 
              Données officielles mises à jour pour 2026.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border text-blue-400 border-blue-900/50 bg-blue-900/20 backdrop-blur-sm">
                <Calculator className="w-4 h-4" /> <span className="text-sm font-semibold">Calcul instantané</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border text-emerald-400 border-emerald-900/50 bg-emerald-900/20 backdrop-blur-sm">
                <MapPin className="w-4 h-4" /> <span className="text-sm font-semibold">Toutes les villes QC</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="grid lg:grid-cols-5">
              {/* Inputs */}
              <div className="lg:col-span-3 p-8 lg:p-12 text-left">
                <div className="space-y-8">
                  <div ref={cityDropdownRef} className="relative">
                    <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Ville de la propriété</label>
                    <button onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                      className="w-full flex items-center justify-between p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl hover:border-blue-400 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span className="block font-bold text-slate-900">{selectedCity.name}</span>
                          <span className="block text-xs text-slate-500">{selectedCity.region}</span>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isCityDropdownOpen && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                          className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
                          <div className="p-3 border-b bg-slate-50">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input type="text" placeholder="Rechercher une ville..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                          </div>
                          <div className="max-h-60 overflow-y-auto">
                            {filteredCities.map((c, i) => (
                              <button key={i} onClick={() => handleCitySelect(c)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-blue-50 text-left border-b border-slate-50 last:border-0 transition-colors">
                                <div><span className="block font-bold text-slate-900">{c.name}</span><span className="text-xs text-slate-500">{c.region}</span></div>
                                <ArrowRight className="w-4 h-4 text-slate-300" />
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Prix d'achat ($)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                      <input type="text" placeholder="Ex: 550 000" className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-2xl font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                        value={price} onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ''))} />
                    </div>
                  </div>

                  <button onClick={handleCalculate} disabled={!price || isCalculating}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-2xl font-bold text-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3">
                    {isCalculating ? <div className="w-7 h-7 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : <><Calculator className="w-6 h-6" /> Calculer la taxe</>}
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-2 p-8 lg:p-12 bg-slate-900 text-white flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/20 blur-[80px] rounded-full"></div>
                <div className="relative z-10 space-y-8" ref={resultRef}>
                  <div className="text-center">
                    <h3 className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em] mb-4">Résultat estimé</h3>
                    <div className="inline-block px-6 py-10 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 w-full">
                      <p className="text-5xl font-black text-white mb-2">{new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(tax)}</p>
                      <p className="text-blue-400 font-semibold">{selectedCity.name} • 2026</p>
                    </div>
                  </div>
                  {breakdown.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Détail des tranches</p>
                      {breakdown.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                          <div className="text-left">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">{item.range}</p>
                            <p className="font-bold text-sm">{new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(item.amount)}</p>
                          </div>
                          <div className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-black">{item.rate}%</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {!tax && <div className="text-center py-10 opacity-40"><Calculator className="w-12 h-12 mx-auto mb-4 text-slate-600" /><p className="text-sm">Entrez un montant pour voir le calcul détaillé</p></div>}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comment fonctionne la taxe de bienvenue ?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Évitez les mauvaises surprises en comprenant le calcul des droits de mutation.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            {[
              { icon: Layers, title: "1. La base imposable", desc: "Calculée sur le montant le plus élevé entre le prix d'achat, l'évaluation municipale uniformisée ou la contrepartie stipulée." },
              { icon: BarChart, title: "2. Le calcul progressif", desc: "La taxe s'applique par paliers. Chaque tranche de la valeur de votre maison possède son propre taux d'imposition (0.5% à 3.0%)." },
              { icon: Clock, title: "3. Le délai de paiement", desc: "Vous recevrez la facture par la poste généralement 3 à 6 mois après votre passage chez le notaire. Vous aurez alors 30 jours pour payer." }
            ].map((step, i) => (
              <div key={i} className="group">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 mx-auto md:mx-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CITY DIRECTORY (INTERNAL LINKS) */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Répertoire des villes</h2>
              <p className="text-slate-600">Accédez aux taux spécifiques et guides détaillés par municipalité.</p>
            </div>

          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CITIES_DATA.map((city, idx) => (
              <Link href={city.path} key={idx} className="group">
                <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 group-hover:border-blue-300 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${city.color}`}>{city.region}</div>
                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors"><Calculator className="w-5 h-5" /></div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Taxe de bienvenue {city.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">Données immobilières 2026</p>
                  <div className="flex items-center text-blue-600 text-sm font-bold">Calculateur {city.name} <ArrowRight className="ml-2 w-4 h-4" /></div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXEMPTIONS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full"></div>
            <div className="relative z-10  gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Peut-on être exempté ?</h2>
                <p className="text-slate-300 mb-8 leading-relaxed text-lg">Dans certains cas prévus par la loi, vous n'aurez pas à payer les droits de mutation.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Transfert entre conjoints", "Parent à enfant (ligne directe)", "Base imposable < 5 000 $", "Compagnie contrôlée à 90%+"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
{/* 4.5 CTA FORM */}
<section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800">
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

    {/* HEADER */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-16 text-center"
    >
      <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
        Obtenez votre stratégie personnalisée
      </h2>
      <p className="mx-auto max-w-3xl text-lg text-slate-300">
        Comparez les meilleures options de financement pour absorber le coût de votre taxe de bienvenue.
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
          className="w-full rounded-xl h-[85vh] md:h-[75vh] lg:h-[70vh]"
          style={{ border: "none" }}
        />

      {/* TRUST / BENEFITS */}
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {[
          {
            title: "Sans engagement",
            desc: "Analyse gratuite, aucune obligation de poursuivre.",
            color: "green",
          },
          {
            title: "Accès à 20+ prêteurs",
            desc: "Banques, coopératives et prêteurs alternatifs.",
            color: "blue",
          },
          {
            title: "Réponse rapide",
            desc: "Un courtier vous contacte sous 24h ouvrables.",
            color: "purple",
          },
        ].map((item, idx) => (
          <div key={idx} className="text-center">
            <div
              className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
                item.color === "green"
                  ? "bg-green-100 text-green-600"
                  : item.color === "blue"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-purple-100 text-purple-600"
              }`}
            >
              <CheckCircle className="h-6 w-6" />
            </div>
            <h4 className="mb-1 font-semibold text-slate-900">
              {item.title}
            </h4>
            <p className="text-sm text-slate-600">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </motion.div>

  </div>
</section>

      {/* 5. FINAL CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 italic">Optimisez votre financement immobilier.</h2>
          <p className="text-xl text-blue-100 mb-12">Nos experts comparent 20+ prêteurs pour compenser le coût de votre taxe de bienvenue.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
<Link
  href="https://wa.me/15144473000"
  target="_blank"
  rel="noopener noreferrer"
  className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-3 shadow-xl"
>
  <Phone className="w-5 h-5" />
  Parler à un courtier
</Link>

<Link
  href="mailto:equipe@hypotheques.ca"
  className="px-10 py-5 bg-blue-700 text-white border border-blue-500 rounded-2xl font-bold text-lg hover:bg-blue-800 transition-all flex items-center justify-center gap-3 shadow-xl"
>
  <Mail className="w-5 h-5" />
  Soumission en ligne
</Link>
          </div>
        </div>
      </section>

      <footer className="py-10 bg-slate-900 text-slate-500 text-center text-xs border-t border-white/5">
        <p>© 2026 TaxeDeBienvenue.ca — Estimation indicative. Consultez un professionnel.</p>
      </footer>
    </div>
  );
}