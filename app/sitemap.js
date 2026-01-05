export default function sitemap() {
  const baseUrl = 'https://taxedebienvenue.ca';

  // Liste de vos villes (routes dynamiques ou statiques)
  const villes = [
    '', // Page d'accueil
    '/montreal',
    '/laval',
    '/saint-lambert',
    '/quebec',
    '/candiac',
    '/chambly',
  ];

  return villes.map((v) => ({
    url: `${baseUrl}${v}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: v === '' ? 1 : 0.8, // Priorité max pour l'accueil
  }));
}