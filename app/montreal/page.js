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

    const brackets = [
      { max: 58900, rate: 0.5, name: '0 $ à 58 900 $' },
      { max: 294600, rate: 1.0, name: '58 900 $ à 294 600 $' },
      { max: 500000, rate: 1.5, name: '294 600 $ à 500 000 $' },
      { max: 1000000, rate: 2.0, name: '500 000 $ à 1 000 000 $' },
      { max: 2000000, rate: 2.5, name: '1 000 000 $ à 2 000 000 $' },
      { max: Infinity, rate: 3.0, name: 'Plus de 2 000 000 $' },
    ];

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
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://imgs.search.brave.com/1_fkxhVywnz9r-MJaRJjFDopwrLp6ie-fD6LmSNIzmY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hLnRy/YXZlbC1hc3NldHMu/Y29tL2ZpbmR5b3Vy/cy1waHAvdmlld2Zp/bmRlci9pbWFnZXMv/cmVzNzAvNDk0MDAw/LzQ5NDc1My1tb250/cmVhbC5qcGc_aW1w/b2xpY3k9ZmNyb3Am/dz0xMDQwJmg9NTgw/JnE9bWVkaXVtSGln/aA"
            alt="Montreal"
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
              Calculateur de Taxe de Bienvenue
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Estimez précisément vos droits de mutation immobilière à Montréal en 2025
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Calcul instantané</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Taux 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>100% gratuit</span>
              </div>
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
                      <h2 className="text-2xl font-bold text-slate-900">Calculateur</h2>
                      <p className="text-sm text-slate-600">Taxe de bienvenue 2025</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Prix d'achat de la propriété
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
                          placeholder="500 000"
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
                            Calculer maintenant
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </motion.button>

                    <p className="text-xs text-slate-500 text-center">
                      Appuyez sur Entrée ou cliquez sur le bouton pour calculer
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Right side - Results */}
              <div className="p-8 md:p-10 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
                {/* Decorative elements */}
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
                      <h3 className="text-2xl font-bold">Résultat</h3>
                      <p className="text-sm text-slate-300">Estimation instantanée</p>
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
                            Taxe totale
                          </p>
                          <motion.p
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                            className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-white to-slate-200 bg-clip-text text-transparent"
                          >
                            {formatCurrency(tax)}
                          </motion.p>
                          <p className="text-slate-400 text-xs mt-2">Montréal • 2025</p>
                        </motion.div>

                        {breakdown.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-2"
                          >
                            <p className="text-sm font-semibold text-slate-300 mb-3">Détails par tranche</p>
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
                          Entrez un montant et cliquez<br />sur calculer pour voir le résultat
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
              Obtenez un accompagnement personnalisé
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Nos experts en financement hypothécaire vous aident à optimiser votre achat et à économiser sur votre taxe de bienvenue
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
          >
            {/* Zoho Form Placeholder */}
            <div className="border-4 border-dashed border-slate-300 rounded-xl p-12 text-center">
              <div className="max-w-md mx-auto">
                <Mail className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Formulaire Zoho</h3>
                <p className="text-slate-600 mb-4">
                  Insérez votre formulaire Zoho ici pour capturer les leads
                </p>
                <code className="text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded inline-block">
                  &lt;zoho-form-embed&gt;&lt;/zoho-form-embed&gt;
                </code>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">Consultation gratuite</h4>
                <p className="text-sm text-slate-600">Sans engagement</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">Meilleurs taux</h4>
                <p className="text-sm text-slate-600">Comparaison de 20+ prêteurs</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">Service personnalisé</h4>
                <p className="text-sm text-slate-600">Accompagnement complet</p>
              </div>
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
              Grille des taux 2025
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Structure progressive des droits de mutation immobilière à Montréal
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { range: '0 $ à 58 900 $', rate: '0,5%', color: 'from-green-500 to-emerald-600' },
              { range: '58 900 $ à 294 600 $', rate: '1,0%', color: 'from-blue-500 to-cyan-600' },
              { range: '294 600 $ à 500 000 $', rate: '1,5%', color: 'from-purple-500 to-violet-600' },
              { range: '500 000 $ à 1 000 000 $', rate: '2,0%', color: 'from-orange-500 to-amber-600' },
              { range: '1 000 000 $ à 2 000 000 $', rate: '2,5%', color: 'from-red-500 to-rose-600' },
              { range: 'Plus de 2 000 000 $', rate: '3,0%', color: 'from-slate-700 to-slate-900' },
            ].map((bracket, idx) => (
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

      {/* Montreal Stats Section */}
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
              Montréal en chiffres
            </h2>
            <p className="text-xl text-slate-600">La métropole la plus dynamique du Québec</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, value: '4,3M', label: 'habitants en région métropolitaine' },
              { icon: TrendingUp, value: '+4,2%', label: 'croissance démographique annuelle' },
              { icon: Building2, value: '19', label: 'arrondissements distincts' },
              { icon: Home, value: '925K$', label: 'prix moyen maison unifamiliale' },
            ].map((stat, idx) => {
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
              Les quartiers de Montréal
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Découvrez les arrondissements les plus prisés pour votre investissement immobilier
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Le Plateau-Mont-Royal',
                description:
                  'Quartier artistique et bohème avec ses escaliers extérieurs emblématiques et sa vie culturelle dynamique.',
                icon: '🎨',
              },
              {
                name: 'Ville-Marie',
                description:
                  'Centre névralgique avec le Vieux-Montréal, le centre-ville et le Quartier des spectacles.',
                icon: '🏙️',
              },
              {
                name: 'Rosemont–La Petite-Patrie',
                description:
                  'Ambiance familiale avec le marché Jean-Talon et des prix plus accessibles.',
                icon: '👨‍👩‍👧‍👦',
              },
              {
                name: 'Outremont',
                description:
                  'Élégance et raffinement avec ses maisons bourgeoises et ses rues arborées.',
                icon: '🌳',
              },
              {
                name: 'Le Sud-Ouest',
                description:
                  'Secteur en transformation avec le canal de Lachine et des prix attractifs.',
                icon: '🚢',
              },
              {
                name: 'Ahuntsic-Cartierville',
                description:
                  'Tranquillité et espaces verts en bordure de la rivière des Prairies.',
                icon: '🌊',
              },
            ].map((neighborhood, idx) => (
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
              Pourquoi choisir un courtier hypothécaire indépendant ?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Maximisez vos économies et optimisez votre financement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Accès à 20+ prêteurs',
                description:
                  'Comparaison exhaustive des offres de toutes les institutions financières pour trouver le meilleur taux.',
                icon: <Building2 className="w-8 h-8" />,
              },
              {
                title: 'Économies substantielles',
                description:
                  "Chaque 0,1% économisé sur votre taux représente des milliers de dollars sur la durée du prêt.",
                icon: <DollarSign className="w-8 h-8" />,
              },
              {
                title: 'Service gratuit',
                description:
                  'Le courtier est rémunéré par la banque, ses services ne vous coûtent rien.',
                icon: <CheckCircle className="w-8 h-8" />,
              },
              {
                title: 'Expertise fiscale',
                description:
                  'Stratégies avancées comme la manœuvre Smith ou le MAPA pour optimiser votre situation.',
                icon: <TrendingUp className="w-8 h-8" />,
              },
              {
                title: 'Dossiers complexes',
                description:
                  'Solutions pour travailleurs autonomes, nouveaux arrivants et situations de crédit particulières.',
                icon: <Users className="w-8 h-8" />,
              },
              {
                title: 'Accompagnement complet',
                description:
                  'Support personnalisé du début à la fin, incluant la négociation et le suivi de votre dossier.',
                icon: <ArrowRight className="w-8 h-8" />,
              },
            ].map((benefit, idx) => (
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
              Programmes d'aide disponibles
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Réduisez ou éliminez votre taxe de bienvenue grâce aux programmes municipaux
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8"
            >
              <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Home className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Programme d'accession à la propriété
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Remboursement jusqu'à 100% pour les familles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Pour les premiers acheteurs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Économies de plusieurs milliers de dollars</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-8"
            >
              <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Exemptions légales</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Transferts entre conjoints</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Transferts parents-enfants (conditions applicables)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Legs par testament</span>
                </li>
              </ul>
            </motion.div>
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
              Qu'est-ce que la taxe de bienvenue à Montréal ?
            </h2>
            <div className="prose prose-lg max-w-none text-slate-700 space-y-4">
              <p className="leading-relaxed">
                La taxe de bienvenue, officiellement appelée <strong>droit de mutation immobilière</strong>, représente un impôt municipal que tout acheteur d'une propriété doit acquitter lors du transfert de propriété à Montréal. Cette contribution financière tire son appellation du nom de Jean Bienvenue, ancien ministre des Affaires municipales du Québec qui a instauré cette mesure en 1976.
              </p>
              <p className="leading-relaxed">
                Cette taxe s'applique à l'acquisition de tout type de propriété résidentielle ou commerciale, qu'il s'agisse d'une maison unifamiliale, d'un condominium, d'un duplex, d'un triplex ou d'un immeuble à revenus. Le montant à payer varie considérablement selon la valeur de la transaction et représente souvent une somme substantielle que les acheteurs doivent prévoir dans leur budget d'acquisition.
              </p>
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
              Comment calculer la taxe de bienvenue à Montréal en 2025 ?
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Base d'imposition</h3>
                <p className="text-slate-700 leading-relaxed">
                  Le calcul des droits de mutation s'effectue sur la base d'imposition, qui correspond au montant le plus élevé parmi :
                </p>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                    <span>Le prix de vente inscrit dans l'acte notarié (excluant TPS et TVQ)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                    <span>La contrepartie stipulée pour le transfert</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                    <span>La valeur marchande selon le rôle d'évaluation foncière multiplié par le facteur comparatif</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Exemple de calcul détaillé</h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <p className="text-lg mb-4">Pour une propriété de <strong>700 000 $</strong> :</p>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span>0 $ à 58 900 $ × 0,5%</span>
                      <strong>294,50 $</strong>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span>58 900 $ à 294 600 $ × 1,0%</span>
                      <strong>2 357,00 $</strong>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span>294 600 $ à 500 000 $ × 1,5%</span>
                      <strong>3 081,00 $</strong>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span>500 000 $ à 700 000 $ × 2,0%</span>
                      <strong>4 000,00 $</strong>
                    </div>
                    <div className="flex justify-between items-center pt-3 text-lg">
                      <span className="font-bold">TOTAL</span>
                      <strong className="text-2xl">9 732,50 $</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
                <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Modalités de paiement
                </h4>
                <p className="text-amber-900 leading-relaxed">
                  La Ville de Montréal expédie la facture environ <strong>30 jours</strong> suivant l'inscription de l'acte de vente. Le paiement doit s'effectuer en un seul versement. Les contribuables peuvent régler par virement bancaire, chèque ou aux comptoirs de services de la Ville.
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
              Marché immobilier montréalais : tendances 2025
            </h2>
            
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Évolution des prix</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Le marché immobilier montréalais a connu une croissance soutenue. Entre 1999 et 2024, la valeur moyenne des résidences unifamiliales a presque <strong>sextuplé</strong>, passant de 155 446 $ à <strong>925 599 $</strong>, la plus forte augmentation de toutes les régions du Québec.
                </p>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">1999</p>
                      <p className="text-2xl font-bold text-slate-900">155 446 $</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">2024</p>
                      <p className="text-2xl font-bold text-slate-900">925 599 $</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Facteurs influençant le marché</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                    <span><strong>Immigration internationale</strong> : Alimente continuellement la demande en logements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                    <span><strong>Taux d'intérêt</strong> : Influencent directement la capacité d'emprunt</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                    <span><strong>Infrastructures</strong> : REM et prolongements de métro stimulent le développement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Home className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                    <span><strong>Pénurie de logements</strong> : Exerce une pression à la hausse sur les prix</span>
                  </li>
                </ul>
              </div>
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
              L'avenir de Montréal : perspectives d'investissement
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Développements infrastructurels</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Le Réseau express métropolitain améliore la desserte des quartiers périphériques. Les projets de revitalisation dans l'est de Montréal et le long du fleuve créent de nouvelles opportunités d'investissement.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Tendances démographiques</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  La croissance soutenue alimentée par l'immigration garantit une demande continue. Montréal attire des travailleurs qualifiés en technologie, IA et aérospatiale.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Marché locatif dynamique</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Taux d'inoccupation faible et demande soutenue près des campus, du centre-ville et dans les quartiers bien desservis par le transport en commun.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Propriétés multifamiliales</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Les duplex et triplex permettent de générer des revenus locatifs tout en habitant la propriété. Stratégie populaire pour réduire le coût d'habitation.
                </p>
              </div>
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
              Courtier vs Démarcheur hypothécaire
            </h2>
            <p className="text-xl text-slate-600 text-center mb-12 max-w-3xl mx-auto">
              Comprendre la différence peut vous faire économiser des dizaines de milliers de dollars
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
                  <h3 className="text-2xl font-bold text-slate-900">Courtier hypothécaire indépendant</h3>
                </div>
                <ul className="space-y-4 text-slate-800">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Travaille pour vous</strong>, le client</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Accès à 20+ prêteurs</strong> (banques, caisses, prêteurs privés)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Compare des dizaines d'offres</strong> pour trouver la meilleure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Négocie en votre nom</strong> pour obtenir les meilleures conditions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Services gratuits</strong> (rémunéré par la banque)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Stratégies fiscales</strong> (manœuvre Smith, MAPA)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Dossiers complexes</strong> (autonomes, nouveaux arrivants, crédit imparfait)</span>
                  </li>
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
                  <h3 className="text-2xl font-bold text-slate-900">Démarcheur hypothécaire</h3>
                </div>
                <ul className="space-y-4 text-slate-700">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-400 mt-0.5 flex-shrink-0" />
                    <span>Travaille pour <strong>une seule banque</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-400 mt-0.5 flex-shrink-0" />
                    <span>Accès <strong>limité aux produits</strong> de son employeur</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Aucune comparaison</strong> avec d'autres institutions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Politiques rigides</strong> de l'institution</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Taux non négociables</strong> selon la grille tarifaire</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Options limitées</strong> pour dossiers complexes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-400 mt-0.5 flex-shrink-0" />
                    <span>Peut <strong>refuser les dossiers</strong> non standard</span>
                  </li>
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
                  <h4 className="font-bold text-slate-900 mb-2 text-lg">Impact financier</h4>
                  <p className="text-slate-800 leading-relaxed">
                    Dans un marché où les prix ont considérablement augmenté, <strong>chaque 0,1% économisé sur votre taux</strong> peut représenter <strong>des dizaines de milliers de dollars</strong> sur la durée de votre prêt hypothécaire. Un courtier indépendant peut faire toute la différence.
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
              Conseils pratiques pour les acheteurs
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border-l-4 border-slate-900">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Calculator className="w-6 h-6" />
                  Prévoir la taxe dans votre budget
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Il est impératif d'inclure la taxe de bienvenue dans vos prévisions financières. Cette dépense obligatoire s'ajoute à la mise de fonds, aux frais de notaire, aux frais d'inspection et aux autres coûts associés à l'achat.
                </p>
                <p className="text-slate-600 text-sm">
                  De nombreux primo-accédants sont surpris par l'ampleur de cette dépense. Utilisez notre calculateur pour éviter les mauvaises surprises.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-slate-900">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Optimiser votre stratégie d'achat
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Selon votre situation familiale et financière, vous pourriez être admissible à différents programmes d'aide qui réduiront substantiellement le coût de la taxe de bienvenue.
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                    <span>Renseignez-vous sur les programmes municipaux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                    <span>Travaillez avec un courtier hypothécaire indépendant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                    <span>Consultez un notaire compétent</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-slate-900">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-6 h-6" />
                  Comprendre la structure progressive
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  La structure progressive signifie que plus votre propriété est dispendieuse, plus le taux marginal augmente. Une propriété à 495 000 $ sera taxée différemment qu'une à 505 000 $ en raison du passage au taux de 2% pour la portion excédant 500 000 $.
                </p>
              </div>
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
              Questions fréquentes
            </h2>
            <p className="text-xl text-slate-600">
              Tout ce que vous devez savoir sur la taxe de bienvenue
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "Qu'est-ce que la taxe de bienvenue ?",
                a: "La taxe de bienvenue, officiellement appelée droit de mutation immobilière, est un impôt municipal que tout acheteur doit payer lors du transfert de propriété à Montréal. Elle a été instaurée en 1976.",
              },
              {
                q: 'Quand dois-je payer la taxe de bienvenue ?',
                a: "La Ville de Montréal envoie la facture environ 30 jours après l'inscription de l'acte de vente au registre foncier. Le paiement doit se faire en un seul versement.",
              },
              {
                q: "Comment est calculée la base d'imposition ?",
                a: "La base d'imposition correspond au montant le plus élevé entre le prix de vente (sans TPS/TVQ), la contrepartie stipulée, ou la valeur marchande selon le rôle d'évaluation.",
              },
              {
                q: 'Puis-je être exempté de la taxe de bienvenue ?',
                a: "Oui, plusieurs situations permettent une exemption : transferts entre conjoints, entre parents-enfants (conditions applicables), legs par testament, et programmes d'aide pour premiers acheteurs avec famille.",
              },
            ].map((faq, idx) => (
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
            src="https://imgs.search.brave.com/1_fkxhVywnz9r-MJaRJjFDopwrLp6ie-fD6LmSNIzmY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hLnRy/YXZlbC1hc3NldHMu/Y29tL2ZpbmR5b3Vy/cy1waHAvdmlld2Zp/bmRlci9pbWFnZXMv/cmVzNzAvNDk0MDAw/LzQ5NDc1My1tb250/cmVhbC5qcGc_aW1w/b2xpY3k9ZmNyb3Am/dz0xMDQwJmg9NTgw/JnE9bWVkaXVtSGln/aA"
            alt="Montreal"
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
              Prêt à économiser sur votre achat immobilier ?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour une consultation gratuite et découvrez comment
              nous pouvons vous aider à optimiser votre financement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-xl"
              >
                <Phone className="w-5 h-5" />
                Appelez-nous maintenant
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-600 transition-all flex items-center justify-center gap-2 border-2 border-slate-600"
              >
                <Mail className="w-5 h-5" />
                Demander une soumission
              </motion.button>
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
                Experts en financement hypothécaire à Montréal, nous vous accompagnons dans tous
                vos projets immobiliers avec professionnalisme et transparence.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Liens utiles</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Calculateur de prêt
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Taux hypothécaires
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Programmes d'aide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog immobilier
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>(514) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@votresite.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Montréal, Québec</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2025 Calculateur Taxe de Bienvenue Montréal. Tous droits réservés.</p>
            <p className="mt-2 text-slate-500">
              Les informations fournies sont à titre indicatif. Consultez toujours un
              professionnel pour votre situation spécifique.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}