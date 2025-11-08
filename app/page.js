'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Calculator,
  TrendingUp,
  MapPin,
  ChevronDown,
  Search,
  ArrowRight,
} from 'lucide-react';

export default function TaxeBienvenue() {
  const [price, setPrice] = useState('');
  const [municipality, setMunicipality] = useState('Montréal');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const resultRef = useRef(null);

  // ✅ Full list of Québec municipalities (shortened for readability)
  const municipalities = [
    'Montréal',
    'Québec',
    'Laval',
    'Longueuil',
    'Sherbrooke',
    'Trois-Rivières',
    'Gatineau',
    'Saguenay',
    'Drummondville',
    'Granby',
    'Repentigny',
    'Saint-Jean-sur-Richelieu',
    'Brossard',
    'Terrebonne',
    'Blainville',
    'Mirabel',
    'Boucherville',
    'Saint-Jérôme',
    'Rimouski',
    'Victoriaville',
    'Shawinigan',
    'Sorel-Tracy',
    'Saint-Hyacinthe',
    'Val-d’Or',
    'Rouyn-Noranda',
    'Châteauguay',
    'Mascouche',
    'Joliette',
    'Salaberry-de-Valleyfield',
    'Alma',
    'Sept-Îles',
    'Thetford Mines',
    'Baie-Comeau',
    'Magog',
    'Lévis',
    'Rivière-du-Loup',
    'La Tuque',
    'Sainte-Julie',
    'Saint-Eustache',
    'Dollard-des-Ormeaux',
    'Pointe-Claire',
    'Lachute',
    'Beaconsfield',
    'Mont-Tremblant',
    'Amos',
    'Dolbeau-Mistassini',
    'Cowansville',
    'Saint-Georges',
    'Sainte-Thérèse',
    'Sainte-Anne-des-Plaines',
    'Mont-Saint-Hilaire',
    'Rosemère',
    'Saint-Lambert',
    'Hudson',
    'Bromont',
    'Candiac',
    'La Prairie',
    'Varennes',
    'Vaudreuil-Dorion',
    'Pincourt',
    'Saint-Sauveur',
    'Rawdon',
    'Sutton',
    'L’Assomption',
    'Lachenaie',
    'Boisbriand',
    'Saint-Constant',
    'Saint-Basile-le-Grand',
    'Saint-Lin–Laurentides',
    'Mont-Laurier',
    'Sainte-Agathe-des-Monts',
    'Montmagny',
    'Beauceville',
    'Saint-Félicien',
    'Roberval',
    'Chibougamau',
    'La Malbaie',
    'Gaspé',
    'Matane',
    'Chandler',
    'Percé',
    'Carleton-sur-Mer',
    'Bonaventure',
    'Sainte-Marie',
    'Pont-Rouge',
    'Saint-Raymond',
    'Donnacona',
    'Sainte-Anne-de-Beaupré',
    'Baie-Saint-Paul',
    'Maniwaki',
    'Senneterre',
    'Fermont',
    'Kuujjuaq',
    'Inukjuak',
    'Salluit',
    'Blanc-Sablon',
    'Havre-Saint-Pierre',
    'Port-Cartier',
    'Forestville',
    'Matagami',
    'Chertsey',
    'Saint-Adèle',
    'Val-des-Monts',
    'Mont-Saint-Anne',
  ];

  const calculateTax = (price) => {
    const brackets = [
      { max: 61500, rate: 0.5 },
      { max: 307800, rate: 1.0 },
      { max: 552300, rate: 1.5 },
      { max: 1104700, rate: 2.0 },
      { max: Infinity, rate: 2.5 },
    ];

    let total = 0;
    const breakdown = [];
    let prev = 0;

    for (let i = 0; i < brackets.length; i++) {
      const b = brackets[i];
      const bracketMin = prev;
      const bracketMax = Math.min(price, b.max);

      if (price > bracketMin) {
        const taxable = bracketMax - bracketMin;
        const tax = taxable * (b.rate / 100);
        total += tax;
        breakdown.push({ min: bracketMin, max: bracketMax, rate: b.rate, tax });
      }

      if (price <= b.max) break;
      prev = b.max;
    }

    return { total, breakdown };
  };

  const formatCurrency = (v) =>
    new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(v);

  const handleCalculate = () => {
    const num = parseFloat(price.replace(/[^0-9.]/g, ''));
    if (!num || num <= 0) return;

    setIsCalculating(true);
    setTimeout(() => {
      const r = calculateTax(num);
      setResult(r);
      setIsCalculating(false);
      if (resultRef.current) resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-slate-100">
      {/* Header */}
      <header className="backdrop-blur-sm bg-slate-900/60 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6 text-indigo-400" />
            <h1 className="text-xl font-semibold text-white">Taxe de Bienvenue — Québec</h1>
          </div>
          <span className="text-sm text-slate-400">2025</span>
        </div>
      </header>

      {/* Main */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-md"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-400" /> Calculateur
            </h2>

            {/* Municipality Dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-1 text-indigo-400" />
                Municipalité
              </label>
              <div className="relative z-[9999]">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-3 bg-slate-900/70 border border-slate-700 rounded-lg flex justify-between items-center text-slate-100 hover:border-indigo-400 transition-all"
                >
                  {municipality}
                  <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute w-full mt-2 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden max-h-72 overflow-y-auto"
                    >
                      <div className="sticky top-0 bg-slate-800/80 backdrop-blur p-2 border-b border-slate-700">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      {municipalities
                        .filter((m) =>
                          m.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((m) => (
                          <button
                            key={m}
                            onClick={() => {
                              setMunicipality(m);
                              setIsDropdownOpen(false);
                              setSearchQuery('');
                            }}
                            className={`w-full text-left px-4 py-2 hover:bg-slate-800 ${
                              m === municipality ? 'bg-indigo-600/20' : ''
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Price input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <TrendingUp className="w-4 h-4 inline mr-1 text-indigo-400" />
                Prix d'achat ou valeur municipale
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">$</span>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="500000"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={!price || isCalculating}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg font-medium hover:from-indigo-500 hover:to-violet-500 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              {isCalculating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <Calculator className="w-5 h-5" /> Calculer <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.div>

          {/* Results */}
          <motion.div
            ref={resultRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-md"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Résultat</h2>
            {result ? (
              <div>
                <div className="bg-gradient-to-r from-emerald-600/30 to-emerald-400/10 border border-emerald-500/40 rounded-lg p-5 mb-5">
                  <p className="text-sm text-emerald-300 mb-1 font-medium">Taxe totale</p>
                  <p className="text-4xl font-bold">{formatCurrency(result.total)}</p>
                  <p className="text-sm text-slate-400 mt-1">{municipality}</p>
                </div>

                {result.breakdown.map((b, i) => (
                  <div
                    key={i}
                    className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-3"
                  >
                    <div className="flex justify-between text-sm text-slate-400 mb-2">
                      <span>
                        {formatCurrency(b.min)} -{' '}
                        {b.max === Infinity ? '+' : formatCurrency(b.max)}
                      </span>
                      <span>{b.rate}%</span>
                    </div>
                    <p className="text-white font-semibold text-lg">
                      {formatCurrency(b.tax)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-center py-10">
                Entrez un montant pour calculer la taxe
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <footer className="border-t border-slate-800 mt-12 py-6 text-center text-slate-500 text-sm bg-slate-900/40">
        © {new Date().getFullYear()} Calculateur de Taxe de Bienvenue — Québec
      </footer>
    </div>
  );
}
