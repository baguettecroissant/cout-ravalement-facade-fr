import type { City } from '../types/index';

// ─────────────────────────────────────────────────────────────────────────────
// INTERFACES
// ─────────────────────────────────────────────────────────────────────────────

export interface ClimateProfile {
  zone: string;
  risks: string;
  renderType: string;
  advice: string;
  description: string;
}

export interface CityPriceData {
  min: number;
  max: number;
}

export interface PriceRange {
  peinture: CityPriceData;
  enduitMonocouche: CityPriceData;
  enduitTraditionnel: CityPriceData;
  enduitChaux: CityPriceData;
  bardage: CityPriceData;
  ite: CityPriceData;
  nettoyage: CityPriceData;
  echafaudage: CityPriceData;
}

export interface CityContext {
  type: 'village' | 'bourg' | 'ville' | 'grande-ville' | 'metropole';
  label: string;
  labelAdjectif: string;
  populationStr: string;
  isUrban: boolean;
  isRural: boolean;
  batiDominant: string;
  periodeConstruction: string;
}

export interface DTUZone {
  code: string;         // ex: "H2a", "H3"
  label: string;        // ex: "Zone H2a – Bretagne & Normandie"
  hivernal: string;     // description du régime hivernal
  exigences: string;    // exigences réglementaires DTU
  isolationReq: string; // niveau d'isolation minimum recommandé
}

export interface ArchitectureContext {
  style: string;        // "granite moellon", "enduit chaux coloré", etc.
  description: string;  // paragraphe descriptif
  contraintes: string;  // contraintes spécifiques pour le ravalement
  materiaux: string;    // matériaux recommandés
}

export interface ExternalLink {
  label: string;
  url: string;
  description: string;
  rel: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

function stringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

// ─────────────────────────────────────────────────────────────────────────────
// PRICES
// ─────────────────────────────────────────────────────────────────────────────

export function getCityPrices(city: City): PriceRange {
  const hash = stringHash(city.slug);
  const dept = parseInt(city.department_code) || 0;

  const isExpensiveRegion =
    (dept >= 75 && dept <= 95) ||
    dept === 13 || dept === 6 || dept === 69;

  const markup = isExpensiveRegion ? 1.22 : 1.0;
  const variance = 1 + ((hash % 11) - 5) * 0.01;

  const applyFormula = (baseMin: number, baseMax: number) => ({
    min: Math.round(baseMin * markup * variance),
    max: Math.round(baseMax * markup * variance),
  });

  return {
    nettoyage: applyFormula(8, 25),
    peinture: applyFormula(20, 45),
    enduitMonocouche: applyFormula(30, 60),
    enduitTraditionnel: applyFormula(50, 90),
    enduitChaux: applyFormula(60, 110),
    bardage: applyFormula(80, 200),
    ite: applyFormula(100, 180),
    echafaudage: applyFormula(15, 25),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// CITY CONTEXT (based on population)
// ─────────────────────────────────────────────────────────────────────────────

export function getCityContext(city: City): CityContext {
  const pop = city.population ?? 0;
  const dept = parseInt(city.department_code) || 0;
  const hash = stringHash(city.slug);
  const reg = city.region?.toLowerCase() || '';

  // Determine city type
  let type: CityContext['type'];
  let label: string;
  let labelAdjectif: string;
  let batiDominant: string;
  let periodeConstruction: string;

  if (pop >= 100000) {
    type = 'metropole';
    label = 'métropole';
    labelAdjectif = 'métropolitaine';
  } else if (pop >= 20000) {
    type = 'grande-ville';
    label = 'grande ville';
    labelAdjectif = 'urbaine';
  } else if (pop >= 5000) {
    type = 'ville';
    label = 'ville';
    labelAdjectif = 'citadine';
  } else if (pop >= 1000) {
    type = 'bourg';
    label = 'bourg';
    labelAdjectif = 'semi-rurale';
  } else {
    type = 'village';
    label = 'village';
    labelAdjectif = 'rurale';
  }

  // Determine dominant building type by region & epoch
  if (reg.includes('bretagne') || reg.includes('normandie')) {
    const options = [
      'maisons en granite ou en moellons calcaires',
      'longères en pierre de taille et colombages traditionnels',
      'maisons bretonnes en schiste ardoisé et enduit à la chaux',
    ];
    batiDominant = pick(options, hash);
    periodeConstruction = pop > 5000 ? 'avant-guerre et reconstruction 1950-1970' : 'XIXe siècle à 1960';
  } else if (reg.includes('provence') || reg.includes('occitanie') || dept === 13 || dept === 6 || dept === 83) {
    const options = [
      'maisons en pierre calcaire à enduit coloré pigmenté ocre ou terre de Sienne',
      'bastides et mas provençaux à murs épais en moellons',
      'immeubles à enduit taloché coloré de tradition méditerranéenne',
    ];
    batiDominant = pick(options, hash);
    periodeConstruction = 'XVIIIe–XIXe siècle et expansion pavillonnaire des années 1970-1990';
  } else if (reg.includes('île-de-france') || (dept >= 75 && dept <= 95)) {
    const options = [
      'immeubles haussmanniens en meulière avec enduit à la chaux (Paris/banlieue ancienne)',
      'pavillons en meulière des années 1900-1930 et maisons de banlieue en brique',
      'grands ensembles en béton banché des années 1960-1975 et copropriétés récentes',
    ];
    batiDominant = pick(options, hash);
    periodeConstruction = pop > 20000 ? 'XIXe siècle à 1980 (mixte)' : '1930-1980 (pavillonnaire)';
  } else if (reg.includes('grand est') || dept === 67 || dept === 68 || dept === 57) {
    const options = [
      'maisons à colombages alsaciens et maisons lorraines en grès des Vosges',
      'immeubles en brique rouge lorraine avec encadrements en pierre de taille',
      'maisons en grès rose vosgien ou calcaire jurassique',
    ];
    batiDominant = pick(options, hash);
    periodeConstruction = 'XIXe siècle à 1950, avec reconstruction d\'après-guerre';
  } else if (reg.includes('hauts-de-france') || dept === 59 || dept === 62 || dept === 80 || dept === 2 || dept === 60) {
    const options = [
      'maisons en brique rouge flamande et estaminet en brique moulée',
      'corons miniers en brique et maisons bourgeoises en briquette de parement',
      'maisons en brique claire et pierre bleue du Nord',
    ];
    batiDominant = pick(options, hash);
    periodeConstruction = 'XIXe siècle industriel à reconstruction 1950';
  } else if (reg.includes('auvergne-rhône-alpes') && (dept === 73 || dept === 74 || dept === 38 || dept === 5)) {
    const options = [
      'chalets et fermes en bois avec soubassement en pierre locale',
      'maisons savoyardes en pierre et lauzes avec bardage mélèze',
      'constructions en pisé (terre crue) et moellons calcaires alpins',
    ];
    batiDominant = pick(options, hash);
    periodeConstruction = 'avant 1900 (patrimoine) à 1980 (stations de ski)';
  } else if (reg.includes('nouvelle-aquitaine') || dept === 33 || dept === 64 || dept === 40) {
    const options = [
      'maisons girondines en pierre de Bordeaux (calcaire blond) et chartrons',
      'maisons basques à colombages blancs et rouge sang de bœuf',
      'longères en calcaire charentais ou tuffeau vendéen',
    ];
    batiDominant = pick(options, hash);
    periodeConstruction = 'XVIIIe–XIXe siècle à expansion pavillonnaire 1970-2000';
  } else if (reg.includes('pays de la loire') || dept === 44 || dept === 49 || dept === 72 || dept === 85 || dept === 53) {
    const options = [
      'maisons en tuffeau blanc du Val de Loire et logis à chainages de brique',
      'maisons en schiste bleu et granit avec enduit à la chaux',
      'constructions en calcaire jurassique et granite vendéen',
    ];
    batiDominant = pick(options, hash);
    periodeConstruction = 'XVIIIe–XIXe siècle à pavillonnaire des années 1970';
  } else if (reg.includes('bourgogne') || reg.includes('centre-val')) {
    const options = [
      'maisons en calcaire oolithique bourguignon et Comblanchien',
      'maisons en tuffeau du Val de Loire avec toits d\'ardoises',
      'fermes et demeures bourgeoises en pierre de Beaune ou calcaire berrichon',
    ];
    batiDominant = pick(options, hash);
    periodeConstruction = 'XVIIIe–XIXe siècle, patrimoine viticole';
  } else {
    const options = [
      'pavillons individuels des années 1960-1980 en parpaing enduit',
      'maisons de bourg en pierre locale avec enduit ciment traditionnel',
      'constructions mixtes en brique et béton de la seconde moitié du XXe siècle',
    ];
    batiDominant = pick(options, hash);
    periodeConstruction = '1960-1990 (expansion pavillonnaire)';
  }

  const populationStr = pop > 0
    ? pop >= 1000
      ? `${(pop / 1000).toFixed(pop >= 10000 ? 0 : 1)} 000 habitants`
      : `${pop} habitants`
    : 'commune';

  return {
    type,
    label,
    labelAdjectif,
    populationStr,
    isUrban: pop >= 5000,
    isRural: pop < 1000,
    batiDominant,
    periodeConstruction,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// DTU CLIMATIC ZONES (H1a / H1b / H1c / H2a / H2b / H2c / H2d / H3)
// ─────────────────────────────────────────────────────────────────────────────

export function getZoneClimatiqueDTU(city: City): DTUZone {
  const dept = parseInt(city.department_code) || 0;
  const lat = city.coordinates?.lat ?? 46;

  // H3 — Méditerranée
  if ([6, 11, 13, 30, 34, 66, 83, 84].includes(dept) || city.department_code === '2A' || city.department_code === '2B') {
    return {
      code: 'H3',
      label: 'Zone climatique H3 – Méditerranéenne',
      hivernal: 'Hivers doux et courts (température minimale rarement sous -5°C). Étés chauds et secs avec épisodes de canicule.',
      exigences: 'La réglementation thermique impose en zone H3 une résistance thermique minimale des parois opaques de R ≥ 2,5 m².K/W pour les murs existants rénovés (arrêté du 3 mai 2007).',
      isolationReq: 'R ≥ 2,5 m².K/W (murs). Priorité à la protection solaire et à la perméabilité à la vapeur d\'eau pour éviter la condensation estivale.',
    };
  }

  // H2a — Bretagne et Normandie
  if ([14, 22, 29, 35, 44, 50, 56, 76, 85].includes(dept)) {
    return {
      code: 'H2a',
      label: 'Zone climatique H2a – Bretagne & Normandie',
      hivernal: 'Hivers doux mais très humides et venteux. Précipitations annuelles importantes (900 à 1 400 mm/an). Faibles risques de gel prolongé.',
      exigences: 'En zone H2a, la RT impose R ≥ 3,7 m².K/W pour les murs rénovés. L\'isolation par l\'extérieur est particulièrement adaptée au bâti en pierre humide typique de la région.',
      isolationReq: 'R ≥ 3,7 m².K/W (murs). Membrane pare-vapeur déconseillée sur maçonneries anciennes – privilégier les enduits respirants.',
    };
  }

  // H2b — Pays de Loire, Centre, Poitou
  if ([17, 36, 37, 41, 45, 49, 72, 79, 86, 87].includes(dept)) {
    return {
      code: 'H2b',
      label: 'Zone climatique H2b – Pays de la Loire & Centre',
      hivernal: 'Hivers frais avec gel modéré (T° min entre -5°C et -10°C). Printemps humides, étés chauds et secs.',
      exigences: 'La réglementation en zone H2b exige R ≥ 3,7 m².K/W pour les murs rénovés. La ventilation des parois est essentielle pour les constructions en tuffeau ou en schiste.',
      isolationReq: 'R ≥ 3,7 m².K/W (murs). Enduits à base de chaux ou de chaux-ciment recommandés pour assurer la perméabilité à la vapeur.',
    };
  }

  // H2d — Sud-Ouest (Nouvelle-Aquitaine hors côte)
  if ([24, 32, 33, 40, 47, 64, 65, 81, 82].includes(dept)) {
    return {
      code: 'H2d',
      label: 'Zone climatique H2d – Sud-Ouest & Nouvelle-Aquitaine',
      hivernal: 'Hivers doux avec gel rare. Influence atlantique marquée avec précipitations régulières (700-1 000 mm/an). Étés chauds avec épisodes orageux.',
      exigences: 'En zone H2d, l\'isolation des murs doit atteindre R ≥ 2,9 m².K/W (murs rénovés). La région bénéficie d\'un ensoleillement favorable aux solutions ITE avec finition claire réfléchissante.',
      isolationReq: 'R ≥ 2,9 m².K/W (murs). Revêtements à fort indice de réflexion solaire (IRS > 25) recommandés pour réduire les surchauffes estivales.',
    };
  }

  // H2c — Auvergne, Massif Central, Rhône-Alpes hors alpes
  if ([3, 7, 12, 15, 19, 23, 26, 38, 42, 43, 46, 48, 63, 69, 88].includes(dept)) {
    return {
      code: 'H2c',
      label: 'Zone climatique H2c – Massif Central & Auvergne-Rhône-Alpes',
      hivernal: 'Hivers froids (gel fréquent, T° min entre -10°C et -15°C en altitude). Enneigement possible. Fortes amplitudes thermiques journalières.',
      exigences: 'La réglementation en zone H2c impose R ≥ 4,0 m².K/W pour les murs rénovés. Les matériaux d\'isolation doivent résister aux cycles gel-dégel répétés (norme DTU 26.2 renforcée).',
      isolationReq: 'R ≥ 4,0 m².K/W (murs). Lame d\'air ventilée recommandée pour les bardages. Imperméabilisant minéral à éviter sur les maçonneries anciennes (risque d\'éclatement par le gel).',
    };
  }

  // H1c — Alsace & Haute-Moselle
  if ([57, 67, 68].includes(dept)) {
    return {
      code: 'H1c',
      label: 'Zone climatique H1c – Alsace & Moselle',
      hivernal: 'Hivers très froids et continentaux (T° min pouvant descendre à -20°C dans le fossé rhénan). Enneigement régulier. Étés chauds et orageux.',
      exigences: 'Zone H1c : obligation de R ≥ 4,5 m².K/W pour les murs rénovés. L\'écart entre les températures estivales et hivernales exige des matériaux à forte inertie thermique.',
      isolationReq: 'R ≥ 4,5 m².K/W (murs). La laine de roche ou le PIR sont privilégiés pour leur résistance au feu et aux cycles thermiques extrêmes.',
    };
  }

  // H1b — Grand Est hors Alsace, Bourgogne, Franche-Comté
  if ([2, 8, 10, 21, 25, 39, 51, 52, 54, 55, 58, 70, 89, 90].includes(dept)) {
    return {
      code: 'H1b',
      label: 'Zone climatique H1b – Grand Est & Bourgogne',
      hivernal: 'Hivers froids avec gel fréquent (-10°C à -15°C). Précipitations mixtes pluie/neige. Forte amplitude thermique entre été et hiver.',
      exigences: 'La RT impose R ≥ 4,5 m².K/W pour les murs rénovés en zone H1b. Les façades en pierre calcaire typiques de la région nécessitent une attention particulière aux remontées capillaires.',
      isolationReq: 'R ≥ 4,5 m².K/W (murs). Pare-pluie indispensable pour les ITE. Traitement hydrofuge profond des façades en calcaire avant application des systèmes d\'isolation.',
    };
  }

  // H1a — Île-de-France, Nord, Hauts-de-France, Picardie
  if ((dept >= 75 && dept <= 95) || [2, 59, 60, 62, 80].includes(dept)) {
    return {
      code: 'H1a',
      label: 'Zone climatique H1a – Île-de-France & Nord',
      hivernal: 'Hivers froids et humides (T° min entre -5°C et -12°C). Fréquents épisodes de brouillard. Faible ensoleillement hivernal (moins de 1 700 h/an).',
      exigences: 'En zone H1a, la réglementation exige R ≥ 4,5 m².K/W pour les murs. Les bâtiments haussmanniens en meulière ou en pierre de taille requièrent une expertise spécifique avant toute application d\'isolation.',
      isolationReq: 'R ≥ 4,5 m².K/W (murs). Diagnostic humidité obligatoire sur bâti ancien. ITE en laine minérale ou EPS graphité selon l\'état du support.',
    };
  }

  // Default — Tempéré de transition
  return {
    code: lat < 46 ? 'H2c' : 'H1b',
    label: `Zone climatique ${lat < 46 ? 'H2c' : 'H1b'} – Tempérée de transition`,
    hivernal: 'Hivers modérément froids avec gel intermittent. Printemps humides. Amplitude thermique annuelle notable.',
    exigences: 'La réglementation en vigueur impose R ≥ 3,7 à 4,5 m².K/W selon la localisation précise. Consulter le diagnostiqueur thermique local pour confirmer la zone exacte.',
    isolationReq: 'R ≥ 3,7 m².K/W minimum. Enduits minéraux respirants ou systèmes composites selon l\'état du bâti existant.',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// ARCHITECTURE LOCAL CONTEXT
// ─────────────────────────────────────────────────────────────────────────────

export function getLocalArchitectureContext(city: City): ArchitectureContext {
  const dept = parseInt(city.department_code) || 0;
  const reg = city.region?.toLowerCase() || '';
  const hash = stringHash(city.slug);

  if (reg.includes('bretagne') || dept === 29 || dept === 22 || dept === 56 || dept === 35) {
    return {
      style: 'Granite, Schiste & Enduit à la Chaux',
      description: `La ${city.department_name} est caractérisée par une architecture vernaculaire en granite ou en schiste ardoisé, des matériaux extrêmement durs et poreux à la fois. Les façades bretonnes traditionnelles sont typiquement laissées en pierre apparente ou recouvertes d'un enduit à la chaux aérienne (CL90) aux tonalités blanches ou légèrement ocres, appliqué en deux à trois couches sur la maçonnerie de moellons.`,
      contraintes: `À ${city.name}, le ravalement sur pierre de granite exige impérativement d'éviter les produits filmogènes imperméables (peintures acryliques pures) qui bloqueraient l'évaporation naturelle de l'humidité captive dans les murs épais. Le choix du produit doit favoriser la perméabilité à la vapeur d'eau (Sd < 0,1 m selon NF EN ISO 12572).`,
      materiaux: `Enduits à la chaux aérienne NHL 2 ou NHL 3.5 (norme NF EN 459-1), gobetis d'accrochage au ciment blanc, badigeons à la chaux teintés aux pigments naturels. Les enduits à la chaux-ciment sont également adaptés sur les façades exposées aux embruns (zones côtières).`,
    };
  }

  if (reg.includes('normandie') || dept === 14 || dept === 50 || dept === 76 || dept === 27 || dept === 61) {
    return {
      style: 'Colombages, Silex & Brique Normande',
      description: `L'architecture normande présente une grande diversité : colombages à remplissage de torchis (pans de bois) dans le Pays d'Auge, constructions en silex dans le Pays de Caux, ou maisons en brique rouge et calcaire dans les zones de reconstruction d'après-guerre. À ${city.name}, on retrouve souvent ce mélange de matériaux qui impose des techniques de ravalement adaptées à chaque nature de support.`,
      contraintes: `Le ravalement des colombages nécessite un traitement distinct du bois et du remplissage : les bois de structure doivent être traités à l'huile de lin ou au saturateur, tandis que les hourdis (remplissages) en torchis ou brique sont enduits à la chaux. La peinture imperméable sur le bois d'un colombage provoque son pourrissement accéléré.`,
      materiaux: `Enduits à la chaux grasse pour les remplissages, saturateurs microscopiques pour les bois, peintures à la chaux (lait de chaux) ou à la caséine pour les façades en torchis restauré. En zone littorale, traitement hydrofuge siloxane pour la protection du silex.`,
    };
  }

  if (reg.includes('provence') || dept === 13 || dept === 83 || dept === 84 || dept === 4 || dept === 5) {
    return {
      style: 'Pierre Calcaire & Enduit Coloré Provençal',
      description: `L'architecture provençale se distingue par ses murs épais en moellons calcaires ou en pierres taillées, recouverts d'enduits colorés aux teintes chaudes : ocre jaune de Roussillon, rouge de Briançon, sienna naturelle ou blanc cassé caractéristique des bastides. À ${city.name}, le PLU peut imposer des gammes colorimetriques spécifiques validées par l'Architecte des Bâtiments de France (ABF) pour les constructions en secteur patrimonial.`,
      contraintes: `En zone méditerranéenne, la forte irradiation UV (>2 700 h d'ensoleillement annuel) dégrade les pigments organiques en 5 à 8 ans. Les chocs thermiques estivaux (ΔT pouvant dépasser 40°C entre jour et nuit) fissurent les enduits rigides. Les produits filmogènes imperméables sont à proscrire sur les maçonneries anciennes respirantes.`,
      materiaux: `Enduits à la chaux aérienne ou chaux hydraulique naturelle (NHL 2) teintés aux oxydes minéraux. Peintures minérales silicatées (K-Silicate) pour une durabilité UV maximale. Badigeons à la chaux sur les supports anciens. Éviter impérativement les peintures acryliques pures sous le climat méditerranéen.`,
    };
  }

  if ((dept >= 75 && dept <= 95) || dept === 77 || dept === 78 || dept === 91 || dept === 92 || dept === 93 || dept === 94 || dept === 95) {
    return {
      style: 'Meulière, Pierre de Taille & Brique Haussmannienne',
      description: `Le bâti d'Île-de-France est extrêmement varié. Le tissu urbain dense se compose d'immeubles haussmanniens en calcaire lutétien (Paris et proche banlieue), tandis que la petite couronne et les villes nouvelles présentent des pavillons en meulière (grès ferrugineux brun typique de la région), des immeubles en brique de Saint-Ouen ou des façades en béton des grands ensembles. À ${city.name}, le diagnostic préalable doit identifier précisément la nature du support avant tout devis.`,
      contraintes: `La meulière pose une contrainte particulière : très poreuse et difficile à enduire, elle nécessite un gobetis d'accrochage au ciment prompt avant enduit. Les pierres de taille haussmanniennes peuvent présenter des altérations (sulfatation, noircissement) nécessitant un traitement préalable au nettoyage chimique doux. En secteur sauvegardé ou périmètre ABF, l'accord de la DRAC est obligatoire.`,
      materiaux: `Gobetis sur meulière (ciment prompt ou ciment blanc + adjuvant), enduits bâtards ou à la chaux hydraulique (NHL 5), pierres de taille nettoyées à la microabrasion et consolidées à la chaux de Saint-Astier. Finitions à la peinture silicatée ou à l'enduit grésé sur les parties courantes.`,
    };
  }

  if (dept === 67 || dept === 68 || reg.includes('alsace')) {
    return {
      style: 'Colombages Alsaciens & Grès des Vosges',
      description: `L'architecture alsacienne est emblématique avec ses maisons à colombages polychromes, leurs poutres sculptées et leurs encorbellements caractéristiques. Le grès rose des Vosges et le calcaire coquillier sont les matériaux de construction dominants. À ${city.name}, de nombreuses façades sont classées ou inscrites au titre des Monuments Historiques, ce qui impose des règles strictes en matière de ravalement.`,
      contraintes: `Les colombages alsaciens exigent un entretien régulier des joints entre les poutres de bois et les remplissages en torchis, brique ou hourdis. Toute intervention sur un bâtiment en secteur sauvegardé (nombreux à Colmar, Strasbourg, Obernai) nécessite une Déclaration Préalable de Travaux et l'accord de l'ABF.`,
      materiaux: `Lait de chaux ou badigeon coloré traditionnel (rouge, vert, bleu) pour les encadrements. Enduit à la chaux grasse ou badigeon minéral pour les remplissages. Lasure ou huile de lin pour la protection des bois de structure. Peinture minérale K-Silicate pour les façades en grès.`,
    };
  }

  if (dept === 59 || dept === 62 || dept === 80 || reg.includes('hauts-de-france')) {
    return {
      style: 'Brique Rouge Flamande & Pierre Bleue du Nord',
      description: `L'architecture du Nord et du Pas-de-Calais est marquée par l'omniprésence de la brique rouge flamande, matériau de construction universel dans toute la plaine du Nord. Les corons miniers, les maisons estaminets et les immeubles bourgeois arborent cette brique aux teintes allant du rouge brun au rosé. Les corniches, encadrements et soubassements sont souvent réalisés en pierre bleue de Belgique ou en calcaire de Lézennes.`,
      contraintes: `À ${city.name}, les façades en brique ancienne ne doivent pas être enduites avec des produits imperméables. Le nettoyage préconisé est le brossage doux ou l'hydrogommage à basse pression. Les joints de brique doivent être rejointoyés à la chaux hydraulique naturelle en respectant le profil original (joint beurré ou joint vif). L'imperméabilisation siloxane est admise sur brique saine.`,
      materiaux: `Mortier de rejointoiement à la chaux hydraulique NHL 3.5 teintée pour imiter la couleur d'origine. Consolidants siloxaniques pour la protection hydrofuge de la brique. Enduit hydraulique sur soubassements humides. Peinture minérale pour les façades en ciment grésé d'après-guerre.`,
    };
  }

  if (reg.includes('nouvelle-aquitaine') || dept === 33 || dept === 64) {
    return {
      style: 'Pierre de Bordeaux & Colombages Basques',
      description: `La Nouvelle-Aquitaine présente deux grandes typologies architecturales : le calcaire blond de Bordeaux ("pierre de Bordeaux" ou calcaire à astéries), caractéristique des châteaux, hôtels particuliers et maisons chartrons, et les maisons basques à colombages rouges et blancs, emblématiques du Pays Basque. À ${city.name}, l'architecture locale s'inscrit dans l'une ou l'autre de ces traditions selon la sous-région.`,
      contraintes: `La pierre de Bordeaux est sensible à la sulfatation en milieu urbain (dépôt de gypse noir en surface). Son nettoyage doit être réalisé par micronébulisation ou microabrasion douce, jamais au sablage. Les colombages basques imposent le même traitement distinct bois/remplissage que les colombages normands.`,
      materiaux: `Pour la pierre de Bordeaux : consolidants à base de chaux de Saint-Astier, enduits à la chaux hydraulique naturelle NHL 2, peintures minérales à l'eau de chaux. Pour le Pays Basque : peinture microporeuse blanche, enduit monocouche léger projeté sur les parties maçonnées.`,
    };
  }

  if (dept === 73 || dept === 74 || dept === 38 || dept === 5 || reg.includes('alpes')) {
    return {
      style: 'Pierre Alpine, Pisé & Bardage Mélèze',
      description: `L'architecture alpine de ${city.department_name} combine des matériaux nobles et locaux : pierres de taille calcaires ou cristallines pour les maçonneries, lauzes pour les toitures, et bois de mélèze ou de douglas pour les bardages. Dans les zones de piémont et les vallées, le pisé (terre crue comprimée) reste une technique ancestrale qui demande un entretien spécifique et délicat.`,
      contraintes: `En montagne, les façades subissent des contraintes mécaniques extrêmes liées aux cycles gel-dégel répétés et au poids de la neige. Tout enduit appliqué sur pisé doit être exclusivement à base de chaux aérienne (jamais ciment) pour ne pas emprisonner l'humidité dans la terre. Les bardages bois doivent être ventilés avec une lame d'air de minimum 2 cm.`,
      materiaux: `Enduit à la chaux aérienne NHL 2 pour les supports en pisé. Lasures et huiles de lin ou de tung pour les bois de bardage. Pierre naturelle pour les reprises de maçonnerie. Membrane d'étanchéité à l'air perméable à la vapeur (HPV) sous les bardages neufs.`,
    };
  }

  // Default
  return {
    style: 'Bâti Mixte & Enduit Ciment',
    description: `À ${city.name}, le bâti est principalement constitué de constructions en parpaing ou en brique enduite des années 1960 à 1990, caractéristiques du développement pavillonnaire français d'après-guerre. Ces façades en enduit ciment ou acrylique présentent généralement des pathologies courantes : micro-fissures de retrait, décollements locaux et encrassement atmosphérique.`,
    contraintes: `Les enduits ciment anciens sont souvent peu flexibles et présentent des micro-fissures de retrait. Avant toute application d'un nouveau revêtement, le grattage ou le brossage des parties mal accrochées est indispensable. Sur les supports en parpaing ou brique, un gobetis d'accrochage améliore l'adhérence du nouveau système.`,
    materiaux: `Enduits monocouche hydrauliques (OC2) ou bi-couches, peintures façade acryliques ou silicone sur supports sains, revêtements plastiques épais (RPE/RPT) sur supports fissurés. ITE en polystyrène graphité ou laine de roche selon l'exposition au vent et aux intempéries.`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// EXTERNAL LINKS (official, nofollow)
// ─────────────────────────────────────────────────────────────────────────────

export function getCityExternalLinks(city: City): ExternalLink[] {
  const dept = parseInt(city.department_code) || 0;
  const deptCode = city.department_code;
  const reg = city.region?.toLowerCase() || '';
  const hash = stringHash(city.slug);

  const links: ExternalLink[] = [
    {
      label: 'MaPrimeRénov\' — Simulateur officiel ANAH',
      url: 'https://www.maprimerenov.gouv.fr/prweb/PRAuth/app/MRENOVGP_/YReSwTPHhR_f5VQqcHT9Kg**/!STANDARD',
      description: `Simulez en ligne votre éligibilité et le montant de l'aide MaPrimeRénov' pour une ITE à ${city.name}.`,
      rel: 'nofollow noopener noreferrer',
    },
    {
      label: 'France Rénov\' — Réseau de conseillers locaux',
      url: 'https://france-renov.gouv.fr/',
      description: `Trouvez un conseiller France Rénov' gratuit proche de ${city.name} pour un accompagnement personnalisé de votre projet.`,
      rel: 'nofollow noopener noreferrer',
    },
    {
      label: 'Qualibat — Annuaire des artisans certifiés',
      url: `https://www.qualibat.com/trouver-une-entreprise/`,
      description: `Vérifiez la certification Qualibat 7131 (enduits de façade) et 7141 (ITE) des artisans intervenant à ${city.name}.`,
      rel: 'nofollow noopener noreferrer',
    },
    {
      label: 'RGE — Vérifier la qualification d\'un artisan',
      url: 'https://www.faire.gouv.fr/trouvez-un-artisan',
      description: `Vérifiez qu'un artisan de ${city.department_name} est bien qualifié RGE (Reconnu Garant de l'Environnement), condition nécessaire pour bénéficier des aides de l'État.`,
      rel: 'nofollow noopener noreferrer',
    },
  ];

  // Add regional ADEME link
  const ademeRegions: Record<string, string> = {
    'île-de-france': 'https://ile-de-france.ademe.fr/',
    'bretagne': 'https://bretagne.ademe.fr/',
    'normandie': 'https://normandie.ademe.fr/',
    'nouvelle-aquitaine': 'https://nouvelle-aquitaine.ademe.fr/',
    'occitanie': 'https://occitanie.ademe.fr/',
    'auvergne-rhône-alpes': 'https://auvergne-rhone-alpes.ademe.fr/',
    'grand est': 'https://grandest.ademe.fr/',
    'hauts-de-france': 'https://hautsdefrance.ademe.fr/',
    'pays de la loire': 'https://paysdeloire.ademe.fr/',
    'centre-val de loire': 'https://centre.ademe.fr/',
    'bourgogne-franche-comté': 'https://bourgogne-franche-comte.ademe.fr/',
    'provence-alpes-côte d\'azur': 'https://paca.ademe.fr/',
    'corse': 'https://corse.ademe.fr/',
  };

  let ademeUrl = 'https://www.ademe.fr/';
  for (const [key, url] of Object.entries(ademeRegions)) {
    if (reg.includes(key)) {
      ademeUrl = url;
      break;
    }
  }

  links.push({
    label: `ADEME ${city.region} — Guide rénovation énergie`,
    url: ademeUrl,
    description: `L'Agence de la transition écologique en ${city.region} publie des guides gratuits sur les techniques d'isolation et les aides disponibles dans votre région.`,
    rel: 'nofollow noopener noreferrer',
  });

  // Add CAUE link (Conseil Architecture Urbanisme Environnement — per dept)
  links.push({
    label: `CAUE ${city.department_name} — Conseil architecture gratuit`,
    url: `https://www.fncaue.fr/`,
    description: `Le Conseil d'Architecture, d'Urbanisme et d'Environnement du ${city.department_name} peut vous conseiller gratuitement sur les couleurs et matériaux adaptés au bâti local de ${city.name}.`,
    rel: 'nofollow noopener noreferrer',
  });

  // Add Éco-PTZ link
  links.push({
    label: 'Éco-PTZ — Demande de prêt à taux zéro',
    url: 'https://www.service-public.fr/particuliers/vosdroits/F19905',
    description: `Le prêt à taux zéro pour la rénovation énergétique est accessible jusqu'à 50 000 € pour les travaux d'isolation extérieure à ${city.name}. Renseignez-vous auprès de votre banque.`,
    rel: 'nofollow noopener noreferrer',
  });

  // Rotate one additional link for departmental variation
  const extraLinks = [
    {
      label: 'Cerema — Base Géodonnées construction',
      url: 'https://www.cerema.fr/fr/actualites/renovation-energetique-batiments',
      description: `Le Cerema propose des ressources techniques sur la rénovation des façades en zones climatiques spécifiques.`,
      rel: 'nofollow noopener noreferrer',
    },
    {
      label: 'OPPBTP — Guide sécurité travaux en façade',
      url: 'https://www.oppbtp.com/ressources-documentaires/',
      description: `L'Organisme Professionnel de Prévention du BTP fournit des guides de sécurité pour les travaux sur échafaudage, essentiels lors d'un ravalement.`,
      rel: 'nofollow noopener noreferrer',
    },
    {
      label: 'Service-Public.fr — Déclaration préalable travaux',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F17578',
      description: `Une déclaration préalable de travaux est souvent requise pour un changement de couleur de façade à ${city.name}. Vérifiez les règles auprès de la mairie.`,
      rel: 'nofollow noopener noreferrer',
    },
    {
      label: 'IMéRA — Base données DTU & normes façade',
      url: 'https://www.cstb.fr/fr/services/solutions-logicielles/rt-batiment/',
      description: `Retrouvez les références réglementaires et techniques applicables aux travaux de façade en ${city.department_name}.`,
      rel: 'nofollow noopener noreferrer',
    },
    {
      label: 'Réseau Action Logement — Aides propriétaires',
      url: 'https://www.actionlogement.fr/le-guide/travaux/aides-a-la-renovation',
      description: `Action Logement propose des prêts bonifiés pour la rénovation des logements des salariés du secteur privé, incluant les travaux de façade et d'isolation.`,
      rel: 'nofollow noopener noreferrer',
    },
  ];

  links.push(extraLinks[dept % extraLinks.length]);

  return links;
}

// ─────────────────────────────────────────────────────────────────────────────
// CLIMATE PROFILE (legacy + enhanced)
// ─────────────────────────────────────────────────────────────────────────────

export function getClimateProfile(city: City): ClimateProfile {
  const dept = parseInt(city.department_code) || 0;
  const reg = city.region?.toLowerCase() || '';

  if (reg.includes('provence') || reg.includes('corse') || reg.includes('occitanie') || [6, 13, 83, 84, 30, 34].includes(dept)) {
    return {
      zone: 'Méditerranéenne',
      risks: 'Forte exposition aux rayons UV, chocs thermiques estivaux, épisodes cévenols violents et sécheresse prolongée.',
      renderType: 'Chaux traditionnelle aérienne ou revêtement silicato-silicone résistant aux UV',
      advice: `À ${city.name}, optez pour des coloris clairs à fort indice de réflexion lumineuse pour éviter la surchauffe des murs et les micro-fissures structurelles.`,
      description: `Le climat ensoleillé de ${city.name} accélère la décoloration des pigments et fatigue les enduits rigides lors des variations brutales de température été/hiver.`,
    };
  }

  if (reg.includes('bretagne') || reg.includes('normandie') || [29, 22, 56, 35, 50, 14, 76, 44, 85].includes(dept)) {
    return {
      zone: 'Océanique humide',
      risks: 'Humidité atmosphérique constante, pluies battantes fréquentes, embruns maritimes salins et vents dominants d\'ouest.',
      renderType: 'Enduit organique imperméable ou peinture hydrofuge à effet perlant',
      advice: `Un traitement algicide et anti-mousse de classe de durabilité élevée est impératif à ${city.name} après le nettoyage préparatoire.`,
      description: `L'exposition constante au vent d'ouest humide favorise la prolifération rapide de micro-organismes (lichens, mousses, algues rouges/vertes) sur les façades de ${city.name}.`,
    };
  }

  if (reg.includes('grand est') || reg.includes('bourgogne') || reg.includes('hauts-de-france') || [59, 62, 80, 2, 60, 67, 68, 57, 54, 21, 25].includes(dept)) {
    return {
      zone: 'Semi-continentale',
      risks: 'Hivers froids et humides, cycles répétés de gel-dégel, fortes amplitudes thermiques annuelles et précipitations neigeuses.',
      renderType: 'Enduit minéral épais à haute perméabilité à la vapeur d\'eau',
      advice: `À ${city.name}, vérifiez minutieusement l'état des joints de dilatation et des points singuliers (acrotères, appuis de fenêtre) avant le chantier.`,
      description: `Les rigueurs hivernales de ${city.name} agressent les façades poreuses : l'eau infiltrée se dilate en gelant, provoquant le décollement progressif des enduits.`,
    };
  }

  if (reg.includes('auvergne') || [73, 74, 38, 5, 4, 15, 63, 43, 48, 65].includes(dept)) {
    return {
      zone: 'Montagnarde',
      risks: 'Cycles thermiques extrêmes, gel prolongé, poids de la neige accumulée sur les appuis et vents violents de montagne.',
      renderType: 'Bardage ventilé en bois résineux traité ou enduit spécial montagne à base de chaux hydraulique',
      advice: `Le bardage avec isolation thermique par l'extérieur (ITE) est la solution technique la plus pérenne à ${city.name} pour protéger les maçonneries.`,
      description: `L'exposition aux intempéries extrêmes à ${city.name} nécessite des revêtements souples et une lame d'air ventilée pour éviter l'accumulation d'humidité.`,
    };
  }

  return {
    zone: 'Tempérée',
    risks: 'Variations saisonnières d\'humidité, encrassement atmosphérique en zone urbaine et micro-fissuration par cycles de dilatation.',
    renderType: 'Enduit monocouche hydraulique semi-allégé (OC2) ou crépi acrylique',
    advice: `À ${city.name}, entretenez régulièrement vos évacuations d'eaux pluviales et réalisez un nettoyage doux tous les 7 à 10 ans pour prévenir les pathologies.`,
    description: `Le climat tempéré de ${city.name} limite les agressions extrêmes, mais l'usure naturelle et la pollution nécessitent un contrôle visuel régulier des façades.`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// MUNICIPAL OBLIGATIONS (enriched)
// ─────────────────────────────────────────────────────────────────────────────

export function getObligationRavalement(city: City): string {
  const dept = parseInt(city.department_code) || 0;
  if (dept >= 75 && dept <= 95) {
    return `À ${city.name}, les arrêtés préfectoraux de la région Île-de-France imposent un ravalement obligatoire tous les 10 ans en vertu des articles L132-1 à L132-5 du Code de la construction et de l'habitation. Toute façade donnant sur la voie publique doit être maintenue en bon état de propreté et d'étanchéité. La mairie peut émettre une injonction de travaux assortie d'une astreinte journalière en cas de refus ou de délai dépassé. En secteur sauvegardé ou dans le périmètre d'un Site Patrimonial Remarquable (SPR), la validation de l'Architecte des Bâtiments de France (ABF) est obligatoire avant tout dépôt de Déclaration Préalable de Travaux.`;
  }
  if ([13, 69, 31, 33, 44, 6, 59].includes(dept)) {
    return `La municipalité de ${city.name} peut imposer le ravalement par arrêté municipal spécifique dans les secteurs classés, en centre historique ou en Zone d'Aménagement Concerté (ZAC). Le Code général des collectivités territoriales (art. L2212-2-2) autorise le maire à prescrire des travaux de ravalement pour des motifs de sécurité ou de salubrité publique. Pour les autres quartiers, le propriétaire est tenu de maintenir la façade en bon état de propreté et de sécurité. Vérifiez les prescriptions du Plan Local d'Urbanisme (PLU) de ${city.name} pour connaître les contraintes de teintes et de matériaux applicables.`;
  }
  if ([67, 68].includes(dept)) {
    return `En Alsace, le régime juridique local (droit d'Alsace-Moselle) comporte des spécificités en matière de construction et d'urbanisme. À ${city.name}, outre les dispositions du Code de la construction national, le régime concordataire local peut introduire des obligations supplémentaires en matière d'entretien du patrimoine bâti. Les bâtiments situés dans les périmètres sauvegardés de Strasbourg, Colmar ou Sélestat sont soumis à l'accord préalable de l'ABF selon la procédure AVAP (Aire de Mise en Valeur de l'Architecture et du Patrimoine).`;
  }
  const hash = stringHash(city.slug);
  const variants = [
    `À ${city.name} (${city.zip}), en l'absence d'arrêté municipal spécifique, c'est l'article L 132-1 du Code de la construction qui s'applique : tout propriétaire est tenu de maintenir sa façade en bon état de propreté et de solidité. Le pouvoir de police du maire lui permet d'enjoindre les travaux si la façade présente un danger pour les passants ou un trouble à l'ordre public visuel. Un changement de couleur ou de matériau nécessite systématiquement une Déclaration Préalable de Travaux (formulaire Cerfa n°13703*09).`,
    `Dans la commune de ${city.name} (département ${city.department_name}), le ravalement de façade n'est pas soumis à un arrêté de ravalement décennal obligatoire généralisé. Cependant, le Code de la construction impose à tout propriétaire de maintenir les parements extérieurs en état de sécurité et de propreté. En cas de dégradation manifeste, la mairie peut mettre en demeure le propriétaire de réaliser les travaux sous un délai déterminé. Toute modification de l'aspect extérieur (couleur, matériau, texture) doit faire l'objet d'une Déclaration Préalable auprès du service urbanisme de ${city.name}.`,
    `Le ravalement de façade à ${city.name} (${city.zip}) n'est pas réglementé par un arrêté décennal local. Néanmoins, le Plan Local d'Urbanisme (PLU) de la commune peut imposer des contraintes en matière de teintes admissibles, de matériaux autorisés et de profil d'enduits. Avant de commencer vos travaux, consultez le règlement du PLU en vigueur (disponible en mairie ou sur le Géoportail de l'urbanisme) pour vérifier les prescriptions applicables à votre parcelle. La présence d'un site classé ou d'un Monument Historique dans un rayon de 500 m impose l'accord préalable de l'ABF.`,
  ];
  return variants[hash % variants.length];
}

// ─────────────────────────────────────────────────────────────────────────────
// ENERGY AIDS — Detailed & region-specific
// ─────────────────────────────────────────────────────────────────────────────

export function getEnergyAidsDetailed(city: City): { titre: string; montant: string; conditions: string; lien: string }[] {
  const dept = parseInt(city.department_code) || 0;
  const reg = city.region?.toLowerCase() || '';
  const hash = stringHash(city.slug);

  const aides = [
    {
      titre: 'MaPrimeRénov\' (ANAH)',
      montant: 'De 15 €/m² (revenus intermédiaires) à 75 €/m² (ménages très modestes)',
      conditions: `Applicable uniquement si votre projet d'ITE atteint un gain thermique certifié. L'artisan doit être qualifié RGE. La demande se fait obligatoirement avant le début du chantier sur maprimerenov.gouv.fr.`,
      lien: 'https://www.maprimerenov.gouv.fr/',
    },
    {
      titre: 'Certificats d\'Économies d\'Énergie (CEE)',
      montant: 'Environ 8 à 14 €/m² isolé (valeur variable selon les offres des fournisseurs d\'énergie)',
      conditions: `Ces primes sont versées directement par les fournisseurs d'énergie (EDF, Engie, TotalEnergies…) en échange de la réalisation de travaux d'économies d'énergie. Elles sont cumulables avec MaPrimeRénov'.`,
      lien: 'https://www.ecologie.gouv.fr/certificats-deconomies-denergie',
    },
    {
      titre: 'TVA réduite à 5,5 %',
      montant: 'Sur le matériel isolant et la main d\'œuvre (au lieu de 10 % pour un ravalement simple)',
      conditions: `La TVA à 5,5 % s'applique automatiquement sur la partie isolation de votre devis, dès lors que vous fournissez une attestation simplifiée au format CERFA 13948*05. Votre logement doit être achevé depuis plus de 2 ans.`,
      lien: 'https://www.impots.gouv.fr/particulier/tva-et-travaux',
    },
    {
      titre: 'Éco-Prêt à Taux Zéro (Éco-PTZ)',
      montant: 'Jusqu\'à 50 000 € sans intérêts sur 20 ans pour un bouquet de travaux incluant l\'ITE',
      conditions: `Ce prêt est accordé par les banques signataires d'une convention avec l'État. Il est cumulable avec MaPrimeRénov' depuis 2022. Aucune condition de ressources n'est requise pour les travaux sur résidence principale.`,
      lien: 'https://www.service-public.fr/particuliers/vosdroits/F19905',
    },
  ];

  // Regional bonus aide
  if (reg.includes('bretagne')) {
    aides.push({
      titre: 'Aide Région Bretagne — Réhabilitation thermique',
      montant: 'Jusqu\'à 2 000 € de subvention complémentaire pour les ménages modestes en Bretagne',
      conditions: `La Région Bretagne propose des aides complémentaires dans le cadre du programme "Habiter Mieux Bretagne" pour les travaux d'isolation des logements anciens (avant 1975). Renseignez-vous auprès d'un Point Rénovation Info Service (PRIS) local.`,
      lien: 'https://www.bretagne.bzh/aides/fiches/aide-a-la-renovation-energetique/',
    });
  } else if (reg.includes('hauts-de-france')) {
    aides.push({
      titre: 'Chèque Énergie Régional — Hauts-de-France Pass Rénovation',
      montant: 'Aide complémentaire régionale allant jusqu\'à 1 500 € selon les ressources',
      conditions: `La Région Hauts-de-France a déployé le Pass Rénovation pour accompagner les ménages à revenus modestes dans leurs travaux de rénovation énergétique. Contactez l'ADEME Hauts-de-France ou un PRIS local pour vérifier votre éligibilité.`,
      lien: 'https://www.hautsdefrance.fr/renovation-energetique',
    });
  } else if (reg.includes('île-de-france')) {
    aides.push({
      titre: 'Île-de-France Énergies — Aide régionale copropriétés',
      montant: 'Jusqu\'à 20 % du coût des travaux pour les copropriétés en Île-de-France',
      conditions: `La Région Île-de-France, via IDF Énergies, propose des subventions spécifiques pour la rénovation des façades de copropriétés. Ce dispositif vient en complément des aides nationales pour les immeubles collectifs effectuant une rénovation globale.`,
      lien: 'https://www.idf-energies.fr/',
    });
  } else if (reg.includes('nouvelle-aquitaine')) {
    aides.push({
      titre: 'Réseau PRIS Nouvelle-Aquitaine',
      montant: 'Conseil gratuit + identification des aides locales disponibles dans votre commune',
      conditions: `La Région Nouvelle-Aquitaine a déployé un réseau dense de Points Rénovation Info Service (PRIS) offrant un conseil personnalisé gratuit. Ces conseillers vous aident à monter votre dossier d'aides et à trouver des artisans RGE locaux.`,
      lien: 'https://www.renovation-info-service.gouv.fr/',
    });
  } else {
    aides.push({
      titre: 'Aides locales département — Conseil Départemental',
      montant: 'Variable selon le département (de 0 à 3 000 € de subvention complémentaire)',
      conditions: `De nombreux Conseils Départementaux proposent des aides complémentaires aux dispositifs nationaux pour les travaux d'isolation et de ravalement. Contactez le service Habitat ou Énergie de votre département pour connaître les aides disponibles à ${city.name}.`,
      lien: 'https://www.cohesion-territoires.gouv.fr/',
    });
  }

  return aides;
}

// ─────────────────────────────────────────────────────────────────────────────
// H1 title
// ─────────────────────────────────────────────────────────────────────────────

export function getCityH1(city: City): string {
  const hash = stringHash(city.slug);
  const context = getCityContext(city);
  const zone = getZoneClimatiqueDTU(city);
  const variants = [
    `Coût Ravalement de Façade à ${city.name} (${city.zip}) — Budget et Artisans en ${city.department_name}`,
    `Ravalement de Façade à ${city.name} : Prix au m², Aides et Devis Gratuit (${city.department_name})`,
    `Prix Ravalement Façade ${city.name} (${city.zip}) — ${zone.code} · Artisans RGE ${city.department_name}`,
    `Ravalement Façade à ${city.name} — Estimation 2026, Artisans Qualifiés en ${city.department_name}`,
  ];
  return variants[hash % variants.length];
}

// ─────────────────────────────────────────────────────────────────────────────
// META TITLE
// ─────────────────────────────────────────────────────────────────────────────

export function getCityMetaTitle(city: City): string {
  const prices = getCityPrices(city);
  const budgetMin = prices.enduitMonocouche.min * 100;
  const budgetMax = prices.enduitMonocouche.max * 100;
  const hash = stringHash(city.slug);
  const variants = [
    `Ravalement Façade ${city.name} : Coût ${budgetMin}€–${budgetMax}€ | Devis Gratuit 2026`,
    `Prix Ravalement Façade à ${city.name} (${city.zip}) — ${budgetMin}€ à ${budgetMax}€ | 2026`,
    `Ravalement de Façade ${city.name} — Budget ${budgetMin}€ · Artisans RGE ${city.department_name}`,
    `Coût Façade ${city.name} ${city.zip} : ${budgetMin}€–${budgetMax}€ | Estimation Gratuite`,
  ];
  return variants[hash % variants.length];
}

// ─────────────────────────────────────────────────────────────────────────────
// META DESCRIPTION
// ─────────────────────────────────────────────────────────────────────────────

export function getCityMetaDescription(city: City): string {
  const prices = getCityPrices(city);
  const budgetMin = prices.enduitMonocouche.min * 100;
  const budgetMax = prices.enduitMonocouche.max * 100;
  const zone = getZoneClimatiqueDTU(city);
  const hash = stringHash(city.slug);
  const context = getCityContext(city);
  const variants = [
    `Ravalement de façade à ${city.name} (${city.zip}) : coût de ${budgetMin}€ à ${budgetMax}€ pour 100 m². Zone ${zone.code}. Devis gratuit, artisans RGE certifiés en ${city.department_name} ✅`,
    `Combien coûte un ravalement à ${city.name} ? Budget ${budgetMin}€–${budgetMax}€ (100 m²). ${context.label} de ${context.populationStr} en zone DTU ${zone.code}. Estimation gratuite sans engagement.`,
    `Prix du ravalement de façade à ${city.name} (${city.department_name}) en 2026 : de ${budgetMin}€ à ${budgetMax}€. Guide complet des techniques, aides financières et artisans qualifiés RGE locaux.`,
    `Devis ravalement façade ${city.name} ${city.zip} : tarifs de ${prices.enduitMonocouche.min}€ à ${prices.enduitMonocouche.max}€/m². ${city.department_name}, zone climatique ${zone.code}. Comparez 3 devis gratuitement.`,
  ];
  return variants[hash % variants.length];
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIQUE INTRO (long, 250–300 words)
// ─────────────────────────────────────────────────────────────────────────────

export function getCityIntro(city: City): string {
  const hash = stringHash(city.slug);
  const prices = getCityPrices(city);
  const budgetMin = prices.enduitMonocouche.min * 100;
  const budgetMax = prices.enduitMonocouche.max * 100;
  const prixMin = prices.enduitMonocouche.min;
  const prixMax = prices.enduitMonocouche.max;
  const context = getCityContext(city);
  const zone = getZoneClimatiqueDTU(city);
  const archi = getLocalArchitectureContext(city);

  const variants = [
    `Le coût d'un ravalement de façade à <strong>${city.name}</strong> (${city.zip}) s'établit entre <strong>${budgetMin} € et ${budgetMax} €</strong> pour une façade standard de 100 m², soit <strong>${prixMin} € à ${prixMax} €/m²</strong> pose et fournitures incluses. Cette ${context.label} de ${context.populationStr} en ${city.department_name} est classée en <strong>zone climatique ${zone.code}</strong> selon les normes DTU, ce qui impose des exigences techniques précises en matière de perméabilité à la vapeur et de résistance thermique des façades. Le bâti de ${city.name} est principalement composé de <strong>${context.batiDominant}</strong> (${context.periodeConstruction}), ce qui influence directement le choix des techniques et des matériaux lors d'un chantier de ravalement. Les façadiers locaux qualifiés RGE du ${city.department_name} peuvent intervenir rapidement sur votre projet.`,

    `Vous habitez <strong>${city.name}</strong> (${city.zip}) et souhaitez rénover l'extérieur de votre logement ? Le budget moyen d'un ravalement de façade dans cette <strong>${context.label} ${context.labelAdjectif}</strong> de ${context.populationStr} varie de <strong>${budgetMin} € à ${budgetMax} €</strong> pour 100 m² de surface à traiter. Situé en <strong>zone DTU ${zone.code}</strong>, votre territoire est exposé à des contraintes climatiques spécifiques qui guident le choix des produits. L'architecture dominante à ${city.name} — <strong>${context.batiDominant}</strong> — exige une approche sur mesure pour garantir la durabilité du revêtement. Ce guide compile les tarifs actualisés 2026 des artisans façadiers du ${city.department_name}, les aides financières mobilisables et les contraintes réglementaires locales.`,

    `En <strong>${city.department_name}</strong>, le prix du ravalement de façade à <strong>${city.name}</strong> (${city.zip}) oscille entre <strong>${prixMin} et ${prixMax} €/m²</strong> selon la technique choisie. Pour une maison de 100 m² de façade, comptez un budget total de <strong>${budgetMin} € à ${budgetMax} €</strong>, installation d'échafaudage comprise. ${city.name} est une ${context.label} de ${context.populationStr} en zone climatique <strong>${zone.code}</strong> (${zone.label}), où les hivers imposent des exigences de résistance thermique minimale de ${zone.isolationReq}. Le bâti local — <strong>${context.batiDominant}</strong> (${context.periodeConstruction}) — présente des caractéristiques techniques qui nécessitent une expertise spécialisée. Demandez des devis comparatifs à plusieurs façadiers certifiés RGE en ${city.department_name} avant de vous engager.`,

    `Planifier un ravalement de façade à <strong>${city.name}</strong> (${city.zip}, ${city.department_name}) nécessite une connaissance précise des contraintes locales. Cette <strong>${context.label} de ${context.populationStr}</strong> se situe en zone climatique <strong>${zone.code}</strong>, où ${zone.hivernal} La nature du bâti — principalement <strong>${context.batiDominant}</strong> construit en <strong>${context.periodeConstruction}</strong> — impose des techniques de ravalement adaptées au support. Le budget de référence pour ce type de chantier à ${city.name} s'établit entre <strong>${budgetMin} € et ${budgetMax} €</strong> TTC pour 100 m² (enduit monocouche), avant déduction des aides à la rénovation énergétique si vous couplez le ravalement à une isolation thermique par l'extérieur (ITE).`,

    `Faire rénover la façade de son logement à <strong>${city.name}</strong> est un investissement qui valorise votre patrimoine entre 8 % et 15 % selon les études notariales locales. Dans cette <strong>${context.label} de ${context.populationStr}</strong> du département ${city.department_name}, le coût moyen d'un ravalement s'élève à <strong>${budgetMin} € – ${budgetMax} €</strong> pour une surface de 100 m². La zone climatique <strong>${zone.code}</strong> applicable à ${city.name} exige des produits de façade répondant aux critères DTU 26.2 : ${zone.exigences} Le style architectural local — <strong>${context.batiDominant}</strong> — joue un rôle déterminant dans le choix du système d'enduit ou du revêtement de finition. Consultez notre comparatif de prix par technique ci-dessous.`,

    `<strong>${city.name}</strong> (${city.zip}) compte <strong>${context.populationStr}</strong> dans le département ${city.department_name}. Cette ${context.label} ${context.labelAdjectif} en zone climatique DTU <strong>${zone.code}</strong> abrite principalement des <strong>${context.batiDominant}</strong> datant de la période <strong>${context.periodeConstruction}</strong>. Le ravalement d'une façade de 100 m² dans ce secteur coûte en moyenne <strong>${budgetMin} € à ${budgetMax} €</strong> selon la technique retenue : nettoyage simple (${prices.nettoyage.min}–${prices.nettoyage.max} €/m²), enduit monocouche (${prixMin}–${prixMax} €/m²) ou isolation thermique par l'extérieur (${prices.ite.min}–${prices.ite.max} €/m²). Les artisans RGE du ${city.department_name} certifiés Qualibat sont en mesure d'intervenir sur votre chantier et de vous accompagner dans l'obtention des aides gouvernementales disponibles.`,
  ];

  return variants[hash % variants.length];
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ — unique per city (7 questions, variable by climate & context)
// ─────────────────────────────────────────────────────────────────────────────

export function getCityFAQ(city: City): Array<{ question: string; answer: string }> {
  const prices = getCityPrices(city);
  const budgetMin = prices.enduitMonocouche.min * 100;
  const budgetMax = prices.enduitMonocouche.max * 100;
  const iteMin = prices.ite.min * 100;
  const iteMax = prices.ite.max * 100;
  const zone = getZoneClimatiqueDTU(city);
  const context = getCityContext(city);
  const climate = getClimateProfile(city);
  const hash = stringHash(city.slug);

  // Base FAQs (always included)
  const baseFAQs: Array<{ question: string; answer: string }> = [
    {
      question: `Combien coûte le ravalement d'une maison de 100 m² à ${city.name} ?`,
      answer: `Le budget moyen pour ravaler une façade de 100 m² à ${city.name} (${city.zip}) est de ${budgetMin} € à ${budgetMax} € pour un enduit monocouche, et de ${prices.enduitChaux.min * 100} € à ${prices.enduitChaux.max * 100} € pour un enduit traditionnel à la chaux. Si vous coupler ces travaux avec une isolation thermique par l'extérieur (ITE), prévoyez un budget de ${iteMin} € à ${iteMax} € avant déduction des aides en ${city.department_name}. Ces tarifs incluent la mise en place de l'échafaudage (${prices.echafaudage.min}–${prices.echafaudage.max} €/m²), le traitement du support et l'application des revêtements.`,
    },
    {
      question: `Quelles aides financières pour un ravalement de façade à ${city.name} en 2026 ?`,
      answer: `Si vous associez votre ravalement à une isolation thermique extérieure (ITE), vous êtes éligible à plusieurs aides cumulables : MaPrimeRénov' (15 à 75 €/m² selon vos revenus), les Primes CEE versées par les fournisseurs d'énergie (8 à 14 €/m²), une TVA réduite à 5,5 % sur les travaux d'isolation (au lieu de 10 %), et l'Éco-PTZ (jusqu'à 50 000 € sans intérêts). Le Conseil Départemental du ${city.department_name} peut également proposer des aides complémentaires. L'artisan doit obligatoirement être qualifié RGE (label Qualibat ou AFNOR) pour déclencher ces aides.`,
    },
    {
      question: `Quelles sont les obligations légales de ravalement à ${city.name} ?`,
      answer: getObligationRavalement(city),
    },
  ];

  // Climate-specific FAQ (1 of 3 variants based on climate zone)
  const climateFAQs = [
    {
      question: `Quel est le meilleur moment pour ravaler ma façade à ${city.name} (zone ${zone.code}) ?`,
      answer: `En zone climatique ${zone.code}, les travaux de ravalement à ${city.name} sont idéalement planifiés au ${climate.zone.includes('Méditerranée') ? 'printemps (avril–mai) et à l\'automne (septembre–octobre) pour éviter les canicules estivales et la sécheresse qui font sécher les enduits trop vite' : climate.zone.includes('Océanique') ? 'printemps (avril–juin) et début d\'automne (août–septembre) pour profiter des périodes les plus sèches de l\'année malgré l\'humidité globalement élevée' : 'printemps et en été (mai–septembre) pour éviter les risques de gel qui détériorent les enduits frais encore non secs'}. La température d'application doit être comprise entre +5°C et +30°C, et le produit doit être appliqué à l'abri du vent fort et du soleil direct pour éviter un séchage différentiel.`,
    },
    {
      question: `Faut-il un permis de construire pour ravaler ma façade à ${city.name} ?`,
      answer: `Non, le ravalement de façade ne nécessite pas de Permis de Construire. Cependant, si vous modifiez l'aspect extérieur de votre logement (changement de couleur, de matériau ou de texture), une <strong>Déclaration Préalable de Travaux</strong> (formulaire CERFA n°13703) est obligatoire et doit être déposée auprès de la mairie de ${city.name}. Le délai d'instruction est généralement d'1 mois. Si votre bien se trouve dans un Site Patrimonial Remarquable (SPR) ou dans le périmètre de protection d'un Monument Historique (500 m), l'accord préalable de l'Architecte des Bâtiments de France (ABF) est requis avant tout dépôt de dossier.`,
    },
  ];

  // Context-specific FAQs (vary by city size)
  const contextFAQs: Array<{ question: string; answer: string }> = [];

  if (context.isUrban) {
    contextFAQs.push({
      question: `Comment trouver un façadier sérieux et certifié à ${city.name} ?`,
      answer: `Pour un chantier de ravalement à ${city.name}, il est recommandé de solliciter au minimum 3 devis auprès d'entreprises locales certifiées. Vérifiez les qualifications suivantes : qualification <strong>Qualibat 7131</strong> (enduits sur maçonnerie) ou <strong>7141</strong> (ITE), label <strong>RGE</strong> (Reconnu Garant de l'Environnement) si vous souhaitez bénéficier des aides de l'État, et <strong>assurance décennale en cours de validité</strong> (vérifiez sur l'annuaire A-Qualif). Évitez les démarchages à domicile non sollicités, fréquents dans les zones urbaines. Demandez systématiquement les références de chantiers réalisés dans le département ${city.department_name}.`,
    });
  } else {
    contextFAQs.push({
      question: `Les artisans façadiers interviennent-ils dans les communes rurales comme ${city.name} ?`,
      answer: `Oui, les artisans façadiers du ${city.department_name} interviennent sur l'ensemble des communes, y compris les ${context.label}s rurales comme ${city.name}. Cependant, dans les petites communes éloignées des centres urbains, une majoration pour frais de déplacement peut être appliquée (entre 3 % et 8 % du devis global). Pour minimiser ce surcoût, regroupez vos travaux avec des voisins souhaitant également rénover leur façade (les artisans apprécient les chantiers groupés). Vous pouvez également solliciter un groupement de commandes via le CAUE (Conseil d'Architecture, Urbanisme et Environnement) du ${city.department_name}.`,
    });
  }

  // Architecture-specific FAQ
  const archiFAQ = {
    question: `Quels matériaux sont recommandés pour rénover les façades en ${context.batiDominant.split(' ').slice(0, 4).join(' ')} à ${city.name} ?`,
    answer: `L'architecture locale de ${city.name} — essentiellement des ${context.batiDominant} datant de la période ${context.periodeConstruction} — impose des matériaux compatibles avec la nature et le comportement hygrométrique du support. Le choix des produits doit respecter la perméabilité à la vapeur d'eau du support d'origine (Sd inférieur au support sous-jacent) pour éviter les phénomènes de condensation interstitielle et les décollements. En zone ${zone.code} comme ${city.name}, le matériau recommandé est : ${getLocalArchitectureContext(city).materiaux.split('.')[0]}. Demandez toujours à votre artisan le rapport de compatibilité support/produit avant signature.`,
  };

  // CEE/DTU FAQ
  const dtuFAQVariants = [
    {
      question: `Qu'est-ce que la zone DTU ${zone.code} et quel impact pour mon chantier à ${city.name} ?`,
      answer: `La zone climatique DTU ${zone.code} (${zone.label}) détermine les exigences minimales de performance thermique applicables aux travaux de rénovation à ${city.name}. ${zone.exigences} Concrètement, cela signifie que si vous réalisez une ITE, l'épaisseur minimale du matériau isolant doit garantir une résistance thermique de ${zone.isolationReq}. Votre artisan RGE est tenu de respecter ces exigences pour que les aides de l'État vous soient versées (contrôle ANAH possible sur chantier).`,
    },
    {
      question: `Combien d'épaisseur d'isolant prévoir pour une ITE à ${city.name} (zone ${zone.code}) ?`,
      answer: `En zone climatique DTU ${zone.code}, ${zone.exigences} En pratique, pour atteindre ces valeurs R requises avec du PSE graphité (polystyrène expansé), il faut compter une épaisseur de 12 à 16 cm pour les zones H1, et 8 à 12 cm pour les zones H2. Avec de la laine de roche, les épaisseurs sont légèrement supérieures mais offrent une meilleure résistance au feu et une masse thermique plus stable. Votre artisan certifié RGE du ${city.department_name} réalisera le calcul thermique précis adapté à votre façade.`,
    },
  ];

  const dtuFAQ = dtuFAQVariants[hash % dtuFAQVariants.length];

  return [
    ...baseFAQs,
    climateFAQs[hash % climateFAQs.length],
    contextFAQs[0],
    archiFAQ,
    dtuFAQ,
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// SIGNES D'ALERTE (enriched with climate context)
// ─────────────────────────────────────────────────────────────────────────────

export function getCitySignesAlerte(city: City): string[] {
  const climate = getClimateProfile(city);
  const zone = getZoneClimatiqueDTU(city);
  const hash = stringHash(city.slug);

  const list = [
    'Présence de fissures fines (faïençage) ou de lézardes structurelles sur les parois extérieures.',
    'Cloquage, effritement ou décollement localisé du crépi, de l\'enduit ou de la peinture de façade.',
    'Apparition d\'efflorescences (taches blanchâtres ou brunâtres dues à la migration de sels minéraux).',
    'Humidité persistante en pied de mur (remontées capillaires), joints de fenêtres ou linteaux poreux.',
  ];

  // Climate-specific alerts
  if (climate.zone.includes('Océanique')) {
    list.push('Prolifération de mousses, algues vertes/rouges ou lichens due à l\'humidité constante en zone ' + zone.code + '.');
    list.push('Brunissement ou noircissement des joints de façade par les champignons microscopiques.');
  } else if (climate.zone.includes('Méditerranée')) {
    list.push('Décoloration importante et cloquage des façades exposées au soleil direct en zone H3.');
    list.push('Fissures de retrait estivales sur les enduits ciment rigides (ΔT > 40°C jour/nuit).');
  } else if (climate.zone.includes('Montagnarde')) {
    list.push('Éclatement localisé de l\'enduit ou de la maçonnerie suite aux cycles gel-dégel répétés en zone ' + zone.code + '.');
    list.push('Infiltrations au niveau des acrotères, corniches ou appuis de fenêtres sous l\'effet de la neige fondue.');
  } else {
    list.push('Éclatement localisé du mortier ou de l\'enduit consécutif aux cycles gel-dégel hivernaux.');
    list.push('Encrassement atmosphérique prononcé (dépôts noirs) en milieu urbain ou à proximité d\'axes routiers.');
  }

  // Hash-based rotation of a 7th alert
  const extra = [
    'Décalage ou ouverture des joints de dilatation entre corps de bâtiment ou entre dalles de balcon.',
    'Corrosion visible des armatures béton (traces de rouille striées sur le parement).',
    'Décollement du film peint sur soubassements, seuils ou parties enterrées des fondations.',
    'Traces de suintement sur les linteaux de menuiserie extérieure (fenêtres, portes-fenêtres).',
  ];
  list.push(extra[hash % extra.length]);

  return list;
}
