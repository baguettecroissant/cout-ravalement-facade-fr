export interface MaterialData {
  slug: string;
  name: string;
  title: string;
  costRange: string;
  durability: string;
  idealUse: string;
  specifications: {
    composition: string;
    thickness: string;
    finishes: string;
  };
  brands: Array<{ name: string; price: string }>;
  supportCompatibility: string;
  pros: string[];
  cons: string[];
}

export const materialsList: MaterialData[] = [
  {
    slug: 'enduit-monocouche',
    name: 'Enduit monocouche',
    title: 'Enduit monocouche pour Façade : Caractéristiques, Prix au m² et Application 2026',
    costRange: '30 — 60 € / m²',
    durability: '20 à 30 ans',
    idealUse: 'Construction neuve et pavillonnaire récent sur parpaing ou brique.',
    specifications: {
      composition: 'Mortier hydraulique prêt à l\'emploi (ciment, chaux hydraulique, sables et adjuvants).',
      thickness: '12 à 15 mm en moyenne après finition.',
      finishes: 'Projeté, gratté, taloché, écrasé.',
    },
    brands: [
      { name: 'Parexlanko (Monorex)', price: '32 — 45 € / m²' },
      { name: 'Weber (Weber.pral)', price: '35 — 50 € / m²' },
      { name: 'PRB (Super Brut)', price: '30 — 42 € / m²' },
    ],
    supportCompatibility: 'Murs en béton brut, blocs de parpaings, briques de structure. Incompatible avec le pisé, la terre crue ou le bois.',
    pros: [
      'Application rapide (une seule passe projetée mécaniquement).',
      'Excellent rapport qualité/prix.',
      'Grand choix de coloris teintés dans la masse.',
    ],
    cons: [
      'Peu flexible, sujet aux micro-fissures si le support bouge.',
      'Ne convient pas du tout au bâti ancien respirant.',
    ],
  },
  {
    slug: 'enduit-traditionnel-multicouche',
    name: 'Enduit traditionnel multicouche',
    title: 'Enduit traditionnel 3 couches : Techniques, Prix et Normes DTU 26.1',
    costRange: '50 — 90 € / m²',
    durability: '30 à 50 ans',
    idealUse: 'Rénovation de murs irréguliers ou maçonneries anciennes nécessitant une bonne épaisseur.',
    specifications: {
      composition: 'Application de 3 couches successives : gobetis d\'accroche, corps d\'enduit pour dresser, et couche de finition.',
      thickness: '20 à 25 mm d\'épaisseur totale.',
      finishes: 'Taloché feutré, gratté fin, jeté truelle.',
    },
    brands: [
      { name: 'Saint-Gobain Weber (Tradition)', price: '55 — 75 € / m²' },
      { name: 'Parexlanko (Tradipro)', price: '50 — 70 € / m²' },
    ],
    supportCompatibility: 'Briques, parpaings, pierres denses de maçonnerie courante.',
    pros: [
      'Grande résistance aux chocs et aux intempéries.',
      'Excellente planéité des supports déformés.',
      'Longévité exceptionnelle.',
    ],
    cons: [
      'Temps de mise en œuvre très long (séchage nécessaire entre chaque couche).',
      'Coût de main d\'œuvre supérieur.',
    ],
  },
  {
    slug: 'enduit-chaux-nhl',
    name: 'Enduit à la chaux NHL',
    title: 'Enduit à la chaux hydraulique naturelle (NHL) : Patrimoine et Bâti Ancien',
    costRange: '60 — 110 € / m²',
    durability: '50 à 100 ans',
    idealUse: 'Rénovation de bâtiments historiques, maisons anciennes en pierre ou pisé.',
    specifications: {
      composition: 'Chaux hydraulique naturelle pure (NHL 2, 3.5 ou 5), sables locaux et pigments minéraux.',
      thickness: '15 à 20 mm.',
      finishes: 'Taloché éponge, brossé, lissé serré.',
    },
    brands: [
      { name: 'Saint-Astier (Chaux Pure)', price: '65 — 90 € / m²' },
      { name: 'Tradical (Chaux formulée)', price: '70 — 95 € / m²' },
      { name: 'Chaux & Enduits de Saint-Astier', price: '60 — 85 € / m²' },
    ],
    supportCompatibility: 'Pierre calcaire, moellons, terre cuite ancienne, maçonnerie de mortier de chaux.',
    pros: [
      'Perméabilité à la vapeur d\'eau inégalée (les murs respirent).',
      'Souplesse naturelle qui épouse les mouvements des vieux bâtis sans fissurer.',
      'Propriétés antifongiques et antibactériennes naturelles.',
    ],
    cons: [
      'Application manuelle délicate exigeant un savoir-faire spécifique.',
      'Séchage lent sensible aux conditions climatiques.',
    ],
  },
  {
    slug: 'peinture-rpe',
    name: 'Peinture de façade RPE',
    title: 'Peinture extérieure et Revêtement Plastique Épais (RPE) : Prix et Rénovation',
    costRange: '20 — 45 € / m²',
    durability: '8 à 12 ans',
    idealUse: 'Rafraîchissement esthétique rapide de façades saines et de murets.',
    specifications: {
      composition: 'Résines acryliques, siloxanes ou pliolites en dispersion aqueuse ou solvantée.',
      thickness: 'Film mince (classe D2) ou semi-épais (RPE classe D3).',
      finishes: 'Aspect lisse, taloché, poché.',
    },
    brands: [
      { name: 'Tollens (Toll-O-Therm)', price: '22 — 35 € / m²' },
      { name: 'Zolpan (Joker)', price: '25 — 40 € / m²' },
      { name: 'Seigneurie (Garnotec)', price: '28 — 45 € / m²' },
    ],
    supportCompatibility: 'Supports déjà peints, enduits sains nettoyés, maçonneries lisses.',
    pros: [
      'Solution la plus économique à court terme.',
      'Séchage rapide et mise en œuvre simple.',
      'Idéal pour masquer le faïençage superficiel.',
    ],
    cons: [
      'Durabilité limitée (nécessite d\'être repeint tous les 10 ans).',
      'N\'isole pas et ne corrige pas les défauts de relief.',
    ],
  },
  {
    slug: 'bardage-bois',
    name: 'Bardage bois',
    title: 'Bardage Bois pour Façade : Essences, Isolation et Coûts au m²',
    costRange: '80 — 200 € / m²',
    durability: '30 à 50 ans (avec entretien)',
    idealUse: 'Architecture moderne ou rénovation thermique couplée à une isolation extérieure.',
    specifications: {
      composition: 'Lames de bois massif (mélèze, douglas, red cedar) ou bois traité thermiquement (bois THT).',
      thickness: '18 à 22 mm sur ossature bois ventilée.',
      finishes: 'Brut de sciage, raboté, saturé ou peint.',
    },
    brands: [
      { name: 'Silverwood (Lames Douglas)', price: '85 — 140 € / m²' },
      { name: 'Piveteaubois (Mélèze)', price: '90 — 150 € / m²' },
    ],
    supportCompatibility: 'Ossature bois, parpaings, ossature métallique.',
    pros: [
      'Esthétique naturelle, chaleureuse et très moderne.',
      'Excellent isolant thermique et phonique additionnel.',
      'Matériau écologique et biosourcé.',
    ],
    cons: [
      'Nécessite un traitement régulier (saturateur/lasure) pour éviter le grisaillement.',
      'Prix de pose élevé.',
    ],
  },
  {
    slug: 'bardage-composite',
    name: 'Bardage composite',
    title: 'Bardage Composite et Fibres-Ciment : Design Moderne et Zéro Entretien',
    costRange: '90 — 220 € / m²',
    durability: '30 à 50 ans',
    idealUse: 'Habillage extérieur de villas contemporaines sans contrainte d\'entretien.',
    specifications: {
      composition: 'Mélange de fibres de bois recyclées et de polymères (PVC/polyéthylène) ou ciment-silice (fibre-ciment).',
      thickness: '10 à 15 mm.',
      finishes: 'Aspect nervuré bois, lisse brossé, coloris teintés.',
    },
    brands: [
      { name: 'Cedral (Lap / Click)', price: '95 — 160 € / m²' },
      { name: 'Trespa (Meteon)', price: '120 — 220 € / m²' },
      { name: 'Rockpanel (Design)', price: '110 — 190 € / m²' },
    ],
    supportCompatibility: 'Maçonneries pleines ou creuses sur tasseaux de ventilation bois/alu.',
    pros: [
      'Aucun entretien requis (ne grise pas, ne se décolore pas).',
      'Résiste aux insectes xylophages et aux moisissures.',
      'Classement au feu élevé.',
    ],
    cons: [
      'Aspect moins chaleureux que le bois naturel.',
      'Bilan carbone plus élevé à la fabrication.',
    ],
  },
  {
    slug: 'systeme-ite',
    name: 'Système ITE sous enduit',
    title: 'Système ITE (Isolation Thermique Extérieure) : Confort et Ravalement',
    costRange: '100 — 180 € / m²',
    durability: '30 à 40 ans',
    idealUse: 'Projet de ravalement global sur maison énergivore (passoire thermique).',
    specifications: {
      composition: 'Isolant (Polystyrène expansé, laine de roche ou fibre de bois) collé/chevillé + sous-enduit armé de fibre de verre + enduit de finition.',
      thickness: '120 à 180 mm d\'isolant selon le R visé.',
      finishes: 'Enduit organique mince RPE ou enduits siloxanes.',
    },
    brands: [
      { name: 'STO (StoTherm Classic)', price: '110 — 170 € / m²' },
      { name: 'Weber (weber.therm)', price: '105 — 165 € / m²' },
      { name: 'Parexlanko (Parisol)', price: '100 — 160 € / m²' },
    ],
    supportCompatibility: 'Murs extérieurs en brique, parpaing ou béton.',
    pros: [
      'Supprime tous les ponts thermiques et fait chuter la facture de chauffage.',
      'Double gain : ravalement esthétique et confort thermique en une seule opération.',
      'Éligible aux aides MaPrimeRénov\' de l\'État.',
    ],
    cons: [
      'Investissement de départ conséquent.',
      'Modifie l\'aspect extérieur (épaisseur des fenêtres, débords de toit).',
    ],
  },
  {
    slug: 'hydrofuge-traitement',
    name: 'Hydrofuge et traitement de surface',
    title: 'Imperméabilisation et Hydrofuge de Façade : Prix et Protection',
    costRange: '8 — 25 € / m²',
    durability: '5 à 8 ans',
    idealUse: 'Façades en briques apparentes, pierres naturelles ou enduits en bon état physique.',
    specifications: {
      composition: 'Hydrofuge de surface siliconé en phase aqueuse ou solvantée qui imprègne les pores sans boucher le support.',
      thickness: 'Pénétration par imprégnation (filmogène ou non).',
      finishes: 'Effet mat invisible ou effet mouillé.',
    },
    brands: [
      { name: 'Guard Industrie (ImperGuard)', price: '10 — 18 € / m²' },
      { name: 'Sika (Sikagard)', price: '8 — 15 € / m²' },
      { name: 'Rubson (Anti-Infiltration)', price: '9 — 16 € / m²' },
    ],
    supportCompatibility: 'Briques, pierres de taille, dalles poreuses silico-calcaires, enduits ciments.',
    pros: [
      'Protège durablement contre la pénétration de l\'eau de pluie.',
      'Laisse respirer le mur (ne crée pas de bulle).',
      'Effet auto-nettoyant : l\'eau emporte les poussières.',
    ],
    cons: [
      'Ne répare pas les fissures actives ni les joints éclatés.',
      'Nécessite d\'être renouvelé périodiquement.',
    ],
  },
];
