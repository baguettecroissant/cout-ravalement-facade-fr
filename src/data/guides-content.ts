export interface GuideData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  readTime: string;
  summary: string;
  image: string;
  content: string; // HTML formatted text
}

export const guidesList: GuideData[] = [
  {
    slug: 'budget-ravalement-facade-2026',
    title: 'Budget Ravalement de Façade 2026 : Estimation Complète Poste par Poste',
    metaTitle: 'Budget Ravalement Façade 2026 : Estimation Poste par Poste',
    metaDescription: 'Comment budgétiser un ravalement de façade en 2026 ? Ventilation complète des coûts : échafaudage, préparation, enduits, main d\'œuvre et imprévus.',
    category: 'Finances & Devis',
    readTime: '12 min',
    summary: 'Décryptage complet des coûts d\'un chantier de ravalement. Découvrez la ventilation réelle entre la location de l\'échafaudage, la préparation du support, la main d\'œuvre et les fournitures.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    content: `
      <p>Entreprendre un ravalement de façade est l'un des investissements les plus importants pour la préservation et la valorisation d'un patrimoine immobilier. En 2026, face à la hausse des coûts des matières premières et aux exigences thermiques accrues, anticiper son budget nécessite une décomposition rigoureuse. Ce guide vous propose une analyse transparente, poste par poste, des tarifs pratiqués par les façadiers certifiés RGE en France.</p>
      
      <h2>1. Pourquoi le prix d'un ravalement ne se résume pas à l'enduit</h2>
      <p>Une erreur fréquente consiste à multiplier simplement la surface des murs par le prix du crépi au m². Un chantier complet englobe une suite d'étapes indispensables et hautement techniques, chacune ayant son propre coût logistique et humain. Négliger l'une de ces étapes pour réduire la facture finale compromet à court terme la tenue des revêtements.</p>
      
      <h2>2. Décomposition du budget type pour une façade de 100 m²</h2>
      <p>Voici l'analyse d'un budget pour une maison individuelle standard de plain-pied ou R+1 disposant de 100 m² de parois extérieures à traiter en enduit monocouche projeté.</p>
      
      <table class="data-table" style="width:100%; border-collapse:collapse; margin:1.5rem 0;">
        <thead>
          <tr style="background-color:#f1f5f9; border-bottom:2px solid #cbd5e1; text-align:left;">
            <th style="padding:0.75rem;">Poste de Dépense</th>
            <th style="padding:0.75rem;">Pourcentage du budget</th>
            <th style="padding:0.75rem;">Coût moyen HT</th>
            <th style="padding:0.75rem;">Prestations comprises</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:0.75rem; font-weight:600;">Échafaudage & logistique</td>
            <td style="padding:0.75rem;">15% à 20%</td>
            <td style="padding:0.75rem;">1 200 € à 2 500 €</td>
            <td style="padding:0.75rem;">Transport, montage/démontage par du personnel habilité, bâche micro-perforée.</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:0.75rem; font-weight:600;">Nettoyage & Préparation</td>
            <td style="padding:0.75rem;">10% à 15%</td>
            <td style="padding:0.75rem;">800 € à 1 800 €</td>
            <td style="padding:0.75rem;">Lavage haute pression, décapage de peinture, piquage des parties soufflées, traitement fongicide.</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:0.75rem; font-weight:600;">Traitement des pathologies</td>
            <td style="padding:0.75rem;">8% à 12%</td>
            <td style="padding:0.75rem;">500 € à 1 200 €</td>
            <td style="padding:0.75rem;">Ouverture des fissures, harpage métallique, rebouchage technique, injection de résine.</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:0.75rem; font-weight:600;">Matières premières (Enduits)</td>
            <td style="padding:0.75rem;">20% à 25%</td>
            <td style="padding:0.75rem;">1 500 € à 2 800 €</td>
            <td style="padding:0.75rem;">Mortiers d'imperméabilisation, chaux, profils d'angles, trame de renfort en fibre de verre.</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:0.75rem; font-weight:600;">Main d'œuvre technique</td>
            <td style="padding:0.75rem;">35% à 40%</td>
            <td style="padding:0.75rem;">2 800 € à 4 800 €</td>
            <td style="padding:0.75rem;">Projection mécanique des enduits, lissage, talochage manuel ou finitions grattées.</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Les facteurs clés influençant le devis final</h2>
      <ul>
        <li><strong>L'accessibilité et la hauteur du bâtiment :</strong> Une façade de plain-pied nécessite un échafaudage simple de faible hauteur, très rapide à monter. Une façade de maison de ville ou d'immeuble en copropriété avec étage nécessite un échafaudage complexe, parfois avec aménagement sur le domaine public (redevance de voirie).</li>
        <li><strong>La finition de l'enduit :</strong> La finition projetée brute est la moins chère car elle ne nécessite aucun traitement manuel après la projection. La finition grattée ou talochée demande des heures de travail à la main de la part de l'artisan façadier, augmentant le tarif de la main d'œuvre de 15 € à 25 € / m².</li>
        <li><strong>Le traitement thermique associé (ITE) :</strong> Si vous combinez le ravalement avec une isolation thermique extérieure, le coût de départ est plus élevé (110 € à 180 € / m²), mais cette prestation est hautement valorisée par les aides de l'État.</li>
      </ul>

      <h2>4. TVA applicable et frais annexes</h2>
      <p>Le taux de TVA varie selon l'ancienneté du bâtiment et le type de travaux :</p>
      <ul>
        <li><strong>TVA à 20% :</strong> Logements neufs ou de moins de 2 ans.</li>
        <li><strong>TVA à 10% :</strong> Logements de plus de 2 ans pour un ravalement de façade simple à but décoratif ou d'imperméabilisation.</li>
        <li><strong>TVA réduite à 5,5% :</strong> Logements de plus de 2 ans pour les travaux d'isolation thermique (ITE) et les travaux induits indissociables.</li>
      </ul>

      <blockquote>
        <p>💡 <strong>L'avis du professionnel :</strong> Exigez toujours que le devis mentionne distinctement l'épaisseur appliquée de l'enduit (au moins 12 mm après finition) ainsi que la marque des mortiers (préférer Weber, PRB ou ParexLanko).</p>
      </blockquote>
    `
  },
  {
    slug: 'dtu-59-1-normes-ravalement',
    title: 'DTU 59.1 Ravalement : Comprendre les Normes Avant de Signer un Devis',
    metaTitle: 'Normes DTU 59.1 & 26.1 Ravalement : Le Guide Technique',
    metaDescription: 'Quelles sont les normes applicables pour un ravalement ? Tout savoir sur le DTU 59.1 (peinture) et le DTU 26.1 (enduits) pour valider vos devis.',
    category: 'Réglementation & Technique',
    readTime: '13 min',
    summary: 'Le respect des Documents Techniques Uniques (DTU) garantit la pérennité de votre façade et la validité des assurances. Focus sur le DTU 59.1 et 26.1.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    content: `
      <p>Les Documents Techniques Uniques (DTU) définissent les règles de l'art pour les chantiers de construction et de rénovation en France. En matière de ravalement de façade, deux normes clés s'imposent aux professionnels : le <strong>DTU 26.1</strong> (mortiers de liants hydrauliques) et le <strong>DTU 59.1</strong> (peinture et revêtements organiques). Le non-respect de ces prescriptions annule la couverture des assureurs en cas de litige.</p>
      
      <h2>1. Le DTU 26.1 : La référence pour les crépis et enduits</h2>
      <p>Le DTU 26.1 régit la préparation des maçonneries et l'application des mortiers à base de ciment et de chaux. Il définit :</p>
      <ul>
        <li><strong>L'évaluation du support :</strong> L'artisan doit obligatoirement vérifier la cohésion, la porosité et l'humidité du mur avant toute application. Un support gelé, surchauffé (>30°C) ou saturé d'eau ne doit pas être traité.</li>
        <li><strong>L'humidification :</strong> Les murs en brique ou en parpaing doivent être humidifiés 24 heures avant l'application pour éviter que le support n'aspire l'eau de gâchage de l'enduit (le grillage de l'enduit).</li>
        <li><strong>L'épaisseur protectrice :</strong> Pour garantir l'imperméabilité aux pluies battantes, l'enduit fini doit respecter une épaisseur minimale absolue de 10 mm en tout point de la façade (12 à 15 mm conseillés).</li>
      </ul>

      <h2>2. Le DTU 59.1 : La norme pour les peintures et revêtements fins</h2>
      <p>Cette norme catégorise les revêtements extérieurs fins et semi-épais en différentes classes d'efficacité technique, permettant d'adapter le produit à la pathologie de la façade :</p>
      
      <table class="data-table" style="width:100%; border-collapse:collapse; margin:1.5rem 0;">
        <thead>
          <tr style="background-color:#f1f5f9; border-bottom:2px solid #cbd5e1; text-align:left;">
            <th style="padding:0.75rem;">Classe</th>
            <th style="padding:0.75rem;">Appellation technique</th>
            <th style="padding:0.75rem;">Épaisseur du film</th>
            <th style="padding:0.75rem;">Objectif et performances</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:0.75rem; font-weight:600;">D1</td>
            <td style="padding:0.75rem;">Imprégnation / Hydrofuge</td>
            <td style="padding:0.75rem;">Non mesurable (incolore)</td>
            <td style="padding:0.75rem;">Protège contre l'eau sans modifier l'aspect visuel de la pierre ou de la brique.</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:0.75rem; font-weight:600;">D2</td>
            <td style="padding:0.75rem;">Peinture à film mince</td>
            <td style="padding:0.75rem;">50 à 100 microns</td>
            <td style="padding:0.75rem;">Rôle purement décoratif et esthétique. Ne masque pas les microfissures.</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:0.75rem; font-weight:600;">D3</td>
            <td style="padding:0.75rem;">Revêtement semi-épais (RSE)</td>
            <td style="padding:0.75rem;">100 à 200 microns</td>
            <td style="padding:0.75rem;">Masque le faïençage et les microfissures superficielles (< 0,2 mm).</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:0.75rem; font-weight:600;">I1 à I4</td>
            <td style="padding:0.75rem;">Système d'imperméabilité</td>
            <td style="padding:0.75rem;">Jusqu'à 1000 microns</td>
            <td style="padding:0.75rem;">Revêtement armé hautement élastique capable de ponter les fissures actives (> 0,5 mm).</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Les risques en cas de non-conformité aux DTU</h2>
      <p>Si un façadier n'applique pas les directives des DTU, vous vous exposez à plusieurs risques critiques :</p>
      <ul>
        <li><strong>Fissuration précoce :</strong> Les tensions internes du mortier feront éclater le revêtement.</li>
        <li><strong>Infiltrations d'eau :</strong> Si l'épaisseur ou le séchage ne respectent pas le DTU, le mur absorbera l'eau.</li>
        <li><strong>Refus de prise en charge d'assurance :</strong> En cas de sinistre, l'expert d'assurance recherchera les fautes d'application. Si le DTU n'est pas respecté, la garantie décennale ou biennale de l'entreprise sera déclarée caduque.</li>
      </ul>

      <blockquote>
        <p>⚠️ <strong>Règle d'or :</strong> Vérifiez que votre devis comporte explicitement la mention "Travaux réalisés conformément aux prescriptions des NF DTU 26.1 et 59.1". C'est votre seule garantie juridique.</p>
      </blockquote>
    `
  },
  {
    slug: 'ravalement-copropriete-guide-complet',
    title: 'Ravalement en Copropriété : Vote en AG, Budget et Quote-Part — Le Guide',
    metaTitle: 'Ravalement en Copropriété : Vote, Budget et Lois 2026',
    metaDescription: 'Comment s\'organise un ravalement en copropriété ? Vote en assemblée générale, répartition des charges (tantièmes) et aides de la loi ALUR.',
    category: 'Copropriété',
    readTime: '15 min',
    summary: 'Un projet de ravalement d\'immeuble nécessite un cadre légal précis. Comprendre le vote en assemblée générale (AG), la quote-part et le fonds travaux ALUR.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    content: `
      <p>Le ravalement de façade d'un immeuble en copropriété est un projet complexe qui demande plusieurs mois de préparation. Entre le diagnostic de l'immeuble, la mise en concurrence des façadiers, le vote en assemblée générale (AG) et la collecte des fonds, chaque étape est strictement encadrée par la loi du 10 juillet 1965 sur la copropriété.</p>
      
      <h2>1. Comment faire voter un ravalement en Assemblée Générale</h2>
      <p>Le type de majorité requis en AG dépend de la nature des travaux programmés :</p>
      <ul>
        <li><strong>Le ravalement simple d'entretien (Article 24) :</strong> Si les travaux visent uniquement à restaurer l'état initial des façades (nettoyage, peinture à l'identique), la décision est prise à la majorité simple des voix exprimées des copropriétaires présents ou représentés.</li>
        <li><strong>L'injonction municipale de ravalement (Article 24) :</strong> Si la commune impose des travaux d'office (comme c'est le cas à Paris ou dans les centres historiques), le syndic est légalement tenu de programmer le vote, qui s'effectue également à la majorité simple.</li>
        <li><strong>Le ravalement avec isolation thermique (Article 25) :</strong> Si le ravalement inclut une Isolation Thermique par l'Extérieur (ITE), les travaux visent à améliorer les performances énergétiques de l'immeuble. La décision doit être votée à la majorité absolue de tous les copropriétaires de l'immeuble (les tantièmes totaux). Si cette majorité n'est pas atteinte mais que le projet recueille au moins un tiers des voix, un second vote à la majorité simple peut être organisé immédiatement.</li>
      </ul>

      <h2>2. Calcul des quotes-parts et appels de fonds</h2>
      <p>La répartition du coût des travaux entre les copropriétaires s'effectue au prorata des <strong>tantièmes (millièmes) de copropriété</strong> attachés à chaque lot. Ces millièmes sont définis dans le règlement de copropriété de l'immeuble. Par exemple, si le ravalement coûte 100 000 € et que vous possédez 25 millièmes des parties communes générales, votre quote-part s'élèvera à 2 500 €.</p>
      
      <p>Le syndic de copropriété émet des appels de fonds selon un calendrier voté en assemblée générale, généralement échelonné sur toute la durée du chantier (ex: 25% à la commande, 50% au montage de l'échafaudage, 25% à la réception).</p>

      <h2>3. Le rôle du fonds de travaux de la loi ALUR</h2>
      <p>Depuis le 1er janvier 2017, la loi ALUR impose aux copropriétés d'alimenter un fonds de travaux annuel obligatoire. Ce fonds, approvisionné par une cotisation annuelle qui ne peut être inférieure à 5% du budget prévisionnel de l'immeuble, permet d'anticiper le financement des gros chantiers de rénovation comme le ravalement, réduisant ainsi l'impact financier immédiat pour les copropriétaires lors du vote.</p>

      <blockquote>
        <p>💡 <strong>Bon à savoir :</strong> Les aides collectives de l'Anah (MaPrimeRénov' Copropriété) peuvent être mobilisées par le syndic si les travaux permettent un gain énergétique d'au moins 35%. L'aide est versée directement au syndicat des copropriétaires et vient déduire les quotes-parts de chacun.</p>
      </blockquote>
    `
  },
  {
    slug: 'echafaudage-ravalement-cout-reglementation',
    title: 'Échafaudage pour Ravalement : Coûts, Autorisations et Règles de Sécurité',
    metaTitle: 'Échafaudage de Ravalement : Prix, Normes et Mairie 2026',
    metaDescription: 'Quel est le coût d\'un échafaudage pour un ravalement ? Autorisations d\'occupation du domaine public, règles de sécurité et tarifs de location.',
    category: 'Finances & Devis',
    readTime: '10 min',
    summary: 'Poste logistique numéro 1 d\'un ravalement de façade, l\'échafaudage représente 15 à 20% du budget. Les obligations de voirie et les normes de sécurité.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    content: `
      <p>Pour tout chantier de ravalement en hauteur, l'installation d'un échafaudage de pied ou suspendu est la première étape technique indispensable. Au-delà du simple aspect matériel, le montage, l'ancrage et la sécurisation d'un échafaudage obéissent à des règles de sécurité drastiques fixées par le Code du travail. C'est également un poste logistique lourd qui représente en moyenne entre 15% et 25% de la facture finale de vos travaux de façade.</p>
      
      <h2>1. Estimation des coûts d'échafaudage en 2026</h2>
      <p>Les entreprises de ravalement facturent la prestation d'échafaudage sous forme de forfait global lié à la surface de façade couverte et à la durée de la location :</p>
      <ul>
        <li><strong>Transport et montage/démontage :</strong> 10 € à 20 € par m² de façade. Cette étape exige une main d'œuvre spécialisée titulaire d'une habilitation officielle au montage d'échafaudage.</li>
        <li><strong>Location hebdomadaire ou mensuelle :</strong> 5 € à 12 € par m² et par mois. Si votre chantier subit des retards météorologiques, ce coût de location se prolonge et peut alourdir la facture.</li>
        <li><strong>Filets de protection et bâches :</strong> 2 € à 5 € par m² (obligatoires pour éviter les projections de gravats sur les voies publiques ou chez les voisins).</li>
      </ul>

      <h2>2. Les autorisations de voirie indispensables en mairie</h2>
      <p>Si l'échafaudage empiète sur le domaine public (rue, trottoir, place), le façadier ou le maître d'ouvrage doit déposer des demandes d'autorisation administrative en mairie au moins 15 jours à l'avance :</p>
      <ul>
        <li><strong>L'autorisation d'occupation temporaire du domaine public (AOT) :</strong> Indispensable pour poser les pieds de la structure sur le trottoir.</li>
        <li><strong>L'arrêté de circulation ou de stationnement :</strong> Nécessaire si le chantier bloque une voie ou des places de parking public pour le déchargement du matériel.</li>
        <li><strong>Redevance municipale :</strong> De nombreuses communes appliquent des taxes d'occupation journalières qui varient selon la zone géographique et le métrage linéaire au sol occupé.</li>
      </ul>

      <h2>3. Le "droit de tour d'échelle" en cas de mitoyenneté</h2>
      <p>Si pour réaliser votre ravalement, l'artisan doit poser l'échafaudage sur le terrain de votre voisin direct, vous devez obtenir son accord écrit préalable. C'est ce qu'on appelle la servitude temporaire de tour d'échelle. Le voisin ne peut s'y opposer si les travaux sont indispensables à la sauvegarde du bâtiment et qu'aucune autre solution technique n'est possible, mais un protocole d'accord amiable définissant les horaires et les indemnités en cas de dégradations dans son jardin est fortement conseillé.</p>
    `
  },
  {
    slug: 'types-enduits-facade-comparatif-technique',
    title: 'Monocouche, Traditionnel, Chaux, RPE : Quel Enduit pour Votre Façade ?',
    metaTitle: 'Comparatif Enduits Façade : Monocouche vs Traditionnel vs Chaux',
    metaDescription: 'Comment choisir l\'enduit de votre façade ? Caractéristiques techniques, durabilité et supports compatibles pour faire le bon choix de finition.',
    category: 'Matériaux',
    readTime: '11 min',
    summary: 'Chaque support de maçonnerie nécessite un enduit compatible. Notre comparatif technique complet des enduits monocouches, traditionnels et chaux hydraulique.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    content: `
      <p>L'enduit extérieur protège les murs de votre habitation contre la pluie, le gel et le vent, tout en jouant un rôle esthétique déterminant. Choisir le mauvais type de liant ou une mauvaise méthode d'application peut empêcher le mur de respirer, provoquant des pathologies graves de l'humidité. Voici une comparaison technique exhaustive pour vous aider à faire le bon choix avec votre façadier.</p>
      
      <h2>1. L'enduit monocouche projeté : Économique et rapide</h2>
      <p>Composé de mortiers industriels pré-mélangés, l'enduit monocouche est appliqué en une ou deux passes successives au cours de la même journée, généralement à l'aide d'une machine de projection mécanique.</p>
      <ul>
        <li><strong>Avantages :</strong> Temps de mise en œuvre très court, large choix de finitions (projeté, gratté, taloché), coût abordable (30 € à 50 € / m²).</li>
        <li><strong>Supports compatibles :</strong> Maçonneries modernes en parpaings de ciment ou briques de terre cuite.</li>
        <li><strong>Inconvénients :</strong> Trop rigide pour les bâtis anciens. Sensible aux micro-mouvements de terrain.</li>
      </ul>

      <h2>2. L'enduit traditionnel en 3 couches : Le choix de la robustesse</h2>
      <p>Appliqué selon les méthodes traditionnelles, il se compose de trois passes successives espacées de plusieurs jours de séchage : le gobetis (accroche), le corps d'enduit (imperméabilisation et planéité) et la couche de finition.</p>
      <ul>
        <li><strong>Avantages :</strong> Grande durabilité, excellente résistance mécanique, idéal pour redresser des murs très déformés.</li>
        <li><strong>Supports compatibles :</strong> Toutes les maçonneries neuves ou anciennes.</li>
        <li><strong>Tarif :</strong> 55 € à 90 € / m² en raison de la main d'œuvre importante requise.</li>
      </ul>

      <h2>3. L'enduit à la chaux naturelle : Indispensable pour le bâti ancien</h2>
      <p>La chaux hydraulique naturelle (NHL) est un matériau respirant et souple qui régule l'humidité naturelle des murs extérieurs.</p>
      <ul>
        <li><strong>Avantages :</strong> Laisse s'échapper la vapeur d'eau (perspirance), évite les remontées capillaires, suit les déformations naturelles des murs sans se fissurer, propriétés fongicides et bactéricides naturelles.</li>
        <li><strong>Supports compatibles :</strong> Murs anciens en pierre calcaire, moellons, pisé, briques anciennes d'avant 1948.</li>
        <li><strong>Tarif :</strong> 60 € à 110 € / m².</li>
      </ul>

      <h2>4. Les Revêtements Plastiques Épais (RPE)</h2>
      <p>Aussi appelés crépis acryliques ou siloxanes, les RPE sont des peintures épaisses prêtes à l'emploi qui s'appliquent au rouleau ou à la taloche sur des enduits lisses.</p>
      <ul>
        <li><strong>Avantages :</strong> Imperméabilité totale, haute élasticité (masque le faïençage léger), résistance extrême aux UV et aux chocs.</li>
        <li><strong>Supports compatibles :</strong> Murs en béton, supports recouverts d'isolant (ITE).</li>
        <li><strong>Tarif :</strong> 25 € à 45 € / m².</li>
      </ul>
    `
  },
  {
    slug: 'ravalement-maison-ancienne-pierre',
    title: 'Ravalement de Maison Ancienne en Pierre : Techniques, Enduits et Coûts',
    metaTitle: 'Ravalement Façade Pierre : Enduits Chaux, NHL et Tarifs',
    metaDescription: 'Comment ravaler un mur en pierre ou en moellons ? Choix de l\'enduit à la chaux, rejointoiement, errors fatales à éviter et tarifs au m².',
    category: 'Rénovation Bâti Ancien',
    readTime: '13 min',
    summary: 'Rénover une maison ancienne en pierre requiert des compétences particulières. Zoom sur le mortier de chaux NHL et la préservation de la perspirance des murs.',
    image: 'https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?auto=format&fit=crop&w=800&q=80',
    content: `
      <p>Les maisons anciennes construites avant la seconde guerre mondiale en pierre calcaire, en moellons, en granit ou en pisé possèdent une physique du bâtiment bien spécifique. Contrairement aux maisons modernes étanches en béton, les murs anciens absorbent et rejettent l'humidité naturelle de manière constante. Ravaler ces façades exige d'employer des techniques traditionnelles respectueuses de la perspirance du bâti sous peine de causer des désordres structurels irréversibles.</p>
      
      <h2>1. Les erreurs fatales à éviter absolument</h2>
      <p>Le ciment gris classique et les peintures étanches (acryliques) sont les ennemis jurés de la pierre ancienne. Appliquer ces matériaux crée une barrière étanche qui emprisonne l'humidité dans le mur. L'eau ne pouvant plus s'évaporer vers l'extérieur, elle remonte dans l'épaisseur des maçonneries, créant :</p>
      <ul>
        <li>Des taches d'humidité persistantes et du salpêtre à l'intérieur des pièces de vie.</li>
        <li>Le décollement complet de l'enduit ciment après seulement 2 ou 3 hivers.</li>
        <li>L'éclatement et l'effritement de la pierre sous l'action du gel de l'eau piégée.</li>
      </ul>

      <h2>2. La chaux hydraulique naturelle (NHL) : Le liant obligatoire</h2>
      <p>Seuls les mortiers formulés à base de chaux naturelle (généralement NHL 2, NHL 3.5 ou chaux aérienne) doivent être utilisés. La chaux présente des propriétés irremplaçables pour la pierre :</p>
      <ul>
        <li><strong>Perméabilité à la vapeur d'eau :</strong> Elle agit comme un buvard qui capte l'humidité interne et la laisse s'évaporer librement vers l'extérieur.</li>
        <li><strong>Faible module d'élasticité :</strong> C'est un mortier souple qui accompagne les micro-mouvements de la structure ancienne sans se casser ni fissurer.</li>
        <li><strong>Compatibilité esthétique :</strong> La chaux offre un aspect mat et chaleureux, typique du patrimoine régional.</li>
      </ul>

      <h2>3. Le rejointoiement à pierres vues ou l'enduit plein</h2>
      <p>Selon l'état esthétique et la qualité de la pierre, deux finitions sont possibles :</p>
      <ul>
        <li><strong>Le rejointoiement traditionnel (à pierres vues) :</strong> Les joints dégradés sont creusés sur 2 à 3 cm de profondeur, nettoyés, puis rejointoyés au mortier de chaux coloré avec des sables locaux. Les têtes des plus belles pierres restent apparentes.</li>
        <li><strong>L'enduit traditionnel à la chaux :</strong> Appliqué en 3 passes, il recouvre entièrement les pierres pour assurer une protection maximale des maçonneries contre les intempéries.</li>
      </ul>

      <blockquote>
        <p>💡 <strong>Conseil technique :</strong> Pour un rejointoiement à pierres vues, le façadier doit brosser le mortier frais à l'aide d'une brosse en chiendent ou d'un balai de paille afin de dégager la surface de la pierre sans laisser de traces de ciment ou de chaux.</p>
      </blockquote>
    `
  },
  {
    slug: 'ite-ravalement-isolation-exterieure',
    title: 'ITE et Ravalement : Fusionner Isolation et Embellissement en Un Chantier',
    metaTitle: 'ITE & Ravalement de Façade : Le Guide Pratique de l\'Isolation',
    metaDescription: 'Pourquoi combiner isolation extérieure (ITE) et ravalement ? Avantages techniques, aides de l\'État (MaPrimeRénov\') et retour sur investissement.',
    category: 'Isolation Thermique',
    readTime: '14 min',
    summary: 'Associer ravalement esthétique et isolation thermique par l\'extérieur (ITE) permet d\'économiser jusqu\'à 30% d\'énergie tout en bénéficiant d\'aides publiques.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    content: `
      <p>L'Isolation Thermique par l'Extérieur (ITE) sous enduit est la solution la plus performante pour isoler une maison individuelle tout en réalisant son ravalement esthétique. Elle consiste à poser une enveloppe isolante tout autour du bâtiment, supprimant ainsi les ponts thermiques majeurs sans toucher aux finitions intérieures de votre habitation.</p>
      
      <h2>1. Les avantages majeurs d'associer ITE et ravalement</h2>
      <ul>
        <li><strong>Suppression des ponts thermiques :</strong> L'isolant enveloppe le bâtiment sans interruption aux liaisons de dalles et de refends, ce qui est impossible à réaliser avec une isolation par l'intérieur (ITI).</li>
        <li><strong>Économies substantielles d'énergie :</strong> Vous réduisez vos factures de chauffage et de climatisation jusqu'à 30% dès le premier mois.</li>
        <li><strong>Préservation de la surface habitable :</strong> L'isolation étant posée à l'extérieur, vous ne perdez pas un seul centimètre carré à l'intérieur de vos pièces de vie.</li>
        <li><strong>Amélioration du confort acoustique :</strong> Les panneaux isolants agissent comme un excellent bouclier contre les bruits aériens extérieurs.</li>
      </ul>

      <h2>2. Choix de l'isolant : Polystyrène vs Laine de roche vs Fibre de bois</h2>
      
      <table class="data-table" style="width:100%; border-collapse:collapse; margin:1.5rem 0;">
        <thead>
          <tr style="background-color:#f1f5f9; border-bottom:2px solid #cbd5e1; text-align:left;">
            <th style="padding:0.75rem;">Isolant</th>
            <th style="padding:0.75rem;">Conductivité thermique (λ)</th>
            <th style="padding:0.75rem;">Avantages principaux</th>
            <th style="padding:0.75rem;">Inconvénients principaux</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:0.75rem; font-weight:600;">Polystyrène expansé (PSE)</td>
            <td style="padding:0.75rem;">0.031 à 0.038 W/m.K</td>
            <td style="padding:0.75rem;">Le plus économique, léger, insensible à l'humidité.</td>
            <td style="padding:0.75rem;">Faible résistance au feu, isolation phonique moyenne.</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:0.75rem; font-weight:600;">Laine de roche</td>
            <td style="padding:0.75rem;">0.035 à 0.040 W/m.K</td>
            <td style="padding:0.75rem;">Excellente résistance au feu, très bon isolant acoustique.</td>
            <td style="padding:0.75rem;">Plus lourd à poser, coût plus élevé.</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:0.75rem; font-weight:600;">Fibre de bois</td>
            <td style="padding:0.75rem;">0.036 à 0.042 W/m.K</td>
            <td style="padding:0.75rem;">Écologique, excellent déphasage thermique (confort d'été).</td>
            <td style="padding:0.75rem;">Sensible à l'eau stagnante lors de la pose, prix le plus élevé.</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Les aides financières mobilisables en 2026</h2>
      <p>L'ITE sous enduit est fortement aidée par l'État pour encourager la rénovation globale des passoires thermiques (classes F et G au DPE) :</p>
      <ul>
        <li><strong>MaPrimeRénov' de l'Anah :</strong> Aide forfaitaire versée par m² isolé, calculée selon la tranche de revenus du foyer (Bleu, Jaune, Violet). Les ménages Roses (les plus aisés) ne sont pas éligibles en dehors des parcours de rénovation globale.</li>
        <li><strong>Les certificats d'économie d'énergie (CEE) :</strong> Primes financées par les distributeurs d'énergie (EDF, Total, etc.), cumulables avec MaPrimeRénov'.</li>
        <li><strong>L'éco-prêt à taux zéro (Éco-PTZ) :</strong> Permet de financer le reste à charge jusqu'à 30 000 € sur une durée maximale de 15 ans, sans intérêts bancaires.</li>
      </ul>
    `
  },
  {
    slug: 'diagnostic-facade-signes-degradation',
    title: 'Diagnostic de Façade : 12 Signes de Dégradation à Ne Pas Ignorer',
    metaTitle: 'Diagnostic de Façade : Fissures, Mousses, Humidité et Solutions',
    metaDescription: 'Savoir diagnostiquer l\'état de ses murs extérieurs. Analyse des fissures, de l\'efflorescence et des traitements à apporter avant le ravalement.',
    category: 'Réglementation & Technique',
    readTime: '9 min',
    summary: 'Avant de choisir un enduit, il faut soigner les pathologies du mur. Décryptage des 12 signes cliniques indicateurs d\'un désordre structurel ou esthétique.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    content: `
      <p>Avant de lancer des travaux de peinture ou de crépi neuf, réaliser un diagnostic minutieux des murs extérieurs est primordial. Masquer des dégradations actives sous un enduit frais provoquera sa ruine précoce. Voici l'analyse des pathologies de façade les plus courantes à traiter impérativement lors de la préparation du chantier.</p>
      
      <h2>1. Le faïençage superficiel</h2>
      <p>Il se manifeste par un réseau de micro-fissures très fines en forme de toile d'araignée à la surface du crépi.</p>
      <ul>
        <li><strong>Cause :</strong> Vieillissement naturel du revêtement ou séchage trop rapide de l'enduit lors de sa pose initiale (grillage).</li>
        <li><strong>Gravité :</strong> Faible. C'est un désordre purement esthétique qui n'affecte pas l'imperméabilité structurelle du mur.</li>
        <li><strong>Traitement :</strong> Nettoyage simple suivi d'une peinture décorative de classe D2 ou D3.</li>
      </ul>

      <h2>2. Les fissures actives</h2>
      <p>Ce sont des fissures dont la largeur dépasse 2 mm, souvent disposées en escalier le long des joints de maçonnerie ou en diagonale aux angles des fenêtres.</p>
      <ul>
        <li><strong>Cause :</strong> Mouvements structurels du bâtiment (tassement de fondations, sécheresse, retrait-gonflement des argiles).</li>
        <li><strong>Gravité :</strong> Élevée. Elles créent des passages directs pour l'eau de pluie dans le logement.</li>
        <li><strong>Traitement :</strong> Consolidation structurelle (pose d'agrafes métalliques ou harpage), suivi d'un pontage élastique avec trame de renfort ou rebouchage résine.</li>
      </ul>

      <h2>3. L'efflorescence (salpêtre)</h2>
      <p>Des dépôts de poudre blanche ou cristalline apparaissent sur la brique ou la pierre, décollant les enduits.</p>
      <ul>
        <li><strong>Cause :</strong> Remontées capillaires. L'humidité du sol s'infiltre dans la maçonnerie par le bas du mur et remonte. En s'évaporant, l'eau laisse les sels minéraux se cristalliser en surface.</li>
        <li><strong>Gravité :</strong> Modérée à élevée. La structure du mur s'affaiblit avec le temps.</li>
        <li><strong>Traitement :</strong> Injection de résines hydrophobes à la base des murs pour créer une barrière étanche, brossage énergique à sec et application d'un enduit respirant à la chaux.</li>
      </ul>

      <h2>4. Le décollement d'enduit (crépi soufflé)</h2>
      <p>L'enduit sonne creux lorsqu'on le tapote doucement et présente des boursouflures prêtes à se détacher.</p>
      <ul>
        <li><strong>Cause :</strong> Présence d'eau piégée derrière l'enduit (infiltrations par le haut ou remontées capillaires) qui gèle en hiver et fait éclater la liaison entre le mortier et le mur.</li>
        <li><strong>Gravité :</strong> Élevée. La maçonnerie sous-jacente n'est plus protégée.</li>
        <li><strong>Traitement :</strong> Piquage complet de toutes les zones soufflées jusqu'au support sain, application d'un gobetis d'accroche et reprise locale ou totale d'enduit.</li>
      </ul>
    `
  },
  {
    slug: 'devis-ravalement-decrypter-pieges',
    title: 'Lire et Décrypter un Devis de Ravalement : 10 Points à Vérifier',
    metaTitle: 'Devis Ravalement Façade : Comparer et Éviter les Pièges',
    metaDescription: 'Comment lire et décrypter un devis de ravalement de façade ? Clauses obligatoires, omissions courantes, garanties décennales et prix justes.',
    category: 'Finances & Devis',
    readTime: '11 min',
    summary: 'Savoir comparer plusieurs propositions tarifaires de façadiers. Les mentions techniques indispensables et les pièges des devis trop succincts.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    content: `
      <p>Comparer des devis de ravalement de façade peut s'avérer complexe en raison de la variété des termes techniques employés par les artisans. Un prix anormalement bas cache souvent l'omission de prestations pourtant indispensables (comme la location de l'échafaudage ou l'application d'un traitement anti-mousse). Ce guide liste les 10 points de contrôle essentiels à analyser avant de signer.</p>
      
      <h2>1. Les mentions administratives et assurances obligatoires</h2>
      <p>Tout devis réglementaire doit comporter les coordonnées complètes de l'entreprise, son numéro SIRET et sa mention d'inscription au répertoire des métiers. De plus, deux assurances doivent obligatoirement être jointes :</p>
      <ul>
        <li><strong>La garantie décennale :</strong> Obligatoire pour les ravalements techniques ayant une fonction d'étanchéité ou pour les travaux d'isolation (ITE). Elle couvre les malfaçons pendant 10 ans après réception du chantier.</li>
        <li><strong>La responsabilité civile professionnelle (RC Pro) :</strong> Indispensable pour couvrir les dommages matériels causés à votre maison, à votre véhicule ou à vos voisins durant les travaux (chute d'outils, bris de vitres).</li>
      </ul>

      <h2>2. Les postes techniques à vérifier un par un</h2>
      <ul>
        <li><strong>Le montage et la dépose de l'échafaudage :</strong> Le devis doit préciser si l'échafaudage est inclus, sa durée maximale de location et la prise en charge des autorisations municipales.</li>
        <li><strong>Le traitement préparatoire des murs :</strong> Méfiez-vous de la mention vague "nettoyage". Le devis doit détailler la méthode (nettoyage haute pression, sablage, gommage) et l'application d'un produit biocide (fongicide/anti-mousse) avant l'enduit.</li>
        <li><strong>La gestion des fissures :</strong> Le mode opératoire doit être décrit (ouverture à la meuleuse, harpage métallique, rebouchage au mortier souple et pontage avec trame en fibre de verre).</li>
        <li><strong>L'épaisseur et le type de revêtement :</strong> Le devis doit spécifier la marque du fabricant (ex: Weber, PRB) et l'épaisseur minimale appliquée (ex: 12 mm après grattage).</li>
      </ul>

      <h2>3. Le nettoyage final et la gestion des déchets</h2>
      <p>L'évacuation des gravats et le nettoyage du chantier représentent un coût important. Assurez-vous que le devis comprend expressément :</p>
      <ul>
        <li>Le nettoyage des vitres, seuils de fenêtres, gouttières et terrasses souillées par les projections.</li>
        <li>L'utilisation d'une bâche de protection pour le sol.</li>
        <li>Les frais de mise en décharge agréée pour les résidus de décapage ou les emballages de produits chimiques.</li>
      </ul>
    `
  },
  {
    slug: 'couleurs-facade-tendances-choix',
    title: 'Couleurs de Façade 2026 : Tendances, PLU et Harmonies pour Votre Ravalement',
    metaTitle: 'Couleur de Façade 2026 : Tendances et Règles du PLU',
    metaDescription: 'Comment choisir la couleur de votre crépi ou enduit ? Tendances esthétiques 2026, nuanciers autorisés en mairie et harmonies architecturales.',
    category: 'Esthétique & PLU',
    readTime: '10 min',
    summary: 'La couleur de vos murs extérieurs doit respecter le Plan Local d\'Urbanisme (PLU) de votre commune. Les teintes tendances de 2026.',
    image: 'https://images.unsplash.com/photo-1562975078-0a018a625b94?auto=format&fit=crop&w=800&q=80',
    content: `
      <p>Le ravalement est l'occasion parfaite de donner un coup de jeune et de modernité à votre maison individuelle. Cependant, le choix de la couleur de votre enduit ne se limite pas à vos préférences personnelles. Il s'inscrit dans un cadre réglementaire strict géré par la mairie afin de préserver l'identité architecturale locale.</p>
      
      <h2>1. Les contraintes du Plan Local d'Urbanisme (PLU)</h2>
      <p>Chaque commune dispose d'un PLU qui définit les règles d'aspect extérieur autorisées. Ce document précise généralement :</p>
      <ul>
        <li>Les nuanciers autorisés pour les crépis et enduits extérieurs (souvent restreints à des teintes minérales claires, beiges, sables ou ocres selon les régions).</li>
        <li>Les teintes imposées pour les menuiseries (volets, portes, fenêtres).</li>
        <li>L'obligation ou non de conserver des décors d'architecture traditionnels (encadrements de fenêtres en brique ou pierre, bandeaux de façade).</li>
      </ul>
      <p>Avant d'acheter le matériel ou de signer le devis, vous devez obligatoirement déposer une **Déclaration Préalable de Travaux (DP)** en mairie. Si votre maison se trouve dans un périmètre sauvegardé ou à proximité d'un monument historique, l'architecte des bâtiments de France (ABF) devra émettre un avis conforme.</p>

      <h2>2. Tendances esthétiques 2026 : Les harmonies minérales</h2>
      <p>Les teintes très vives ou saturées sont aujourd'hui délaissées au profit de finitions plus sobres et naturelles :</p>
      <ul>
        <li><strong>Les blancs cassés et les beiges chauds :</strong> Le blanc pur est évité car trop éblouissant au soleil et très salissant. On lui préfère des teintes douces comme le beige calcaire, le ton pierre ou le blanc cassé qui s'intègrent parfaitement dans tous les environnements.</li>
        <li><strong>L'harmonie bi-ton (Contrastes) :</strong> Très plébiscitée sur les maisons contemporaines. Elle consiste à associer une teinte claire majoritaire (ex: blanc perle) avec des volumes ou des soubassements contrastés en gris anthracite ou terre d'ombre.</li>
        <li><strong>Les textures d'enduit :</strong> L'enduit projeté brut est délaissé au profit de finitions plus contemporaines comme l'enduit gratté ou le taloché très fin, qui accrochent moins la pollution et les poussières.</li>
      </ul>
    `
  },
  {
    slug: 'ravalement-saison-ideale-planning',
    title: 'Quelle Saison pour Ravaler sa Façade ? Planning et Conditions Optimales',
    metaTitle: 'Quand Faire un Ravalement ? Températures et Saisons Idéales',
    metaDescription: 'Quelles sont les conditions météo requises pour poser un enduit de façade ? Température min/max, humidité et planification de chantier.',
    category: 'Réglementation & Technique',
    readTime: '9 min',
    summary: 'Les mortiers de chaux et de ciment sont sensibles aux aléas climatiques. Pourquoi le printemps et l\'automne sont à privilégier.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    content: `
      <p>La réussite d'un ravalement de façade ne dépend pas seulement de la qualité de l'enduit ou du savoir-faire de l'artisan. Les conditions climatiques lors de l'application et du séchage du mortier sont cruciales. Poser un crépi sous des températures extrêmes ou par temps trop humide empêche la bonne polymérisation des liants (ciment, chaux), provoquant fissures et décollements prématurés.</p>
      
      <h2>1. Les fenêtres de températures préconisées par les fabricants</h2>
      <p>Les fiches techniques des mortiers d'enduits (DTU 26.1) interdisent l'application hors de cette plage thermique :</p>
      <ul>
        <li><strong>Température minimale absolue (+5°C) :</strong> En dessous de 5°C, l'eau présente dans le mortier de chaux ou de ciment met trop de temps à s'évaporer ou peut geler. Le gel stoppe instantanément la réaction de prise. À la décongélation, l'enduit devient friable, perd toute cohésion et s'effrite au toucher.</li>
        <li><strong>Température maximale absolue (+30°C) :</strong> Au-dessus de 30°C, ou sous l'action directe de vents desséchants, l'eau contenue dans le mélange s'évapore de manière précoce avant d'avoir pu réagir chimiquement avec le liant. C'est le phénomène de "grillage". L'enduit se rétracte brutalement, se fissure et perd sa résistance mécanique.</li>
      </ul>

      <h2>2. L'impact du vent et de l'humidité</h2>
      <ul>
        <li><strong>L'hygrométrie élevée (pluie) :</strong> Une pluie battante durant l'application va laver le liant en surface, diluer les pigments et créer des coulures et des variations de teintes (spectres de couleurs). De plus, un support gorgé d'eau empêchera l'accroche mécanique de l'enduit neuf.</li>
        <li><strong>Le vent fort :</strong> Même si la température est idéale (20°C), un vent sec et violent accélère l'évaporation de l'eau en surface de l'enduit, provoquant un séchage hétérogène et des microfissures superficielles.</li>
      </ul>

      <h2>3. Les saisons idéales : Printemps et Automne</h2>
      <p>Le printemps (d'avril à juin) et le début de l'automne (de septembre à octobre) offrent les meilleures fenêtres climatiques en France. Les températures y sont douces, le soleil est moins agressif et l'hygrométrie est stable. L'été est envisageable à condition d'éviter les vagues de canicule et de travailler à l'ombre (les façadiers chevronnés avancent alors au rythme de l'exposition du soleil en traitant les façades ouest le matin et est l'après-midi).</p>
    `
  },
  {
    slug: 'garantie-decennale-ravalement-litiges',
    title: 'Garantie Décennale et Ravalement : Vos Droits en Cas de Malfaçon',
    metaTitle: 'Garantie Décennale Ravalement : Assurances et Droits Litiges',
    metaDescription: 'Les désordres de façade sont-ils couverts par la garantie décennale ? Conditions de mise en œuvre, assurance dommages-ouvrage et recours.',
    category: 'Réglementation & Technique',
    readTime: '11 min',
    summary: 'Comprendre la différence entre garantie biennale de bon fonctionnement et garantie décennale en cas de défaut d\'étanchéité ou de fissures.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    content: `
      <p>L'apparition de désordres (fissures, infiltrations, décollements d'enduits) sur les façades après la fin d'un chantier peut engendrer des litiges coûteux. Heureusement, la législation française protège le consommateur grâce aux assurances obligatoires souscrites par les entreprises du bâtiment. Cependant, toutes les malfaçons de façade ne bénéficient pas du même niveau de protection juridique.</p>
      
      <h2>1. La garantie décennale s'applique-t-elle à votre ravalement ?</h2>
      <p>Selon l'article 1792 du Code civil, la garantie décennale couvre les dommages qui compromettent la solidité de l'ouvrage ou qui le rendent impropre à sa destination d'usage (habitation). Pour un ravalement de façade, la jurisprudence distingue deux situations claires :</p>
      <ul>
        <li><strong>Le ravalement à fonction esthétique simple (Classe D2) :</strong> Si les travaux visaient uniquement la mise en peinture décorative pour colorer la façade sans réparer l'étanchéité, ils ne sont **pas** couverts par la garantie décennale. En cas de cloquage ou de changement de couleur de la peinture, seule la garantie biennale de bon fonctionnement (2 ans) peut être activée.</li>
        <li><strong>Le ravalement technique à fonction d'imperméabilité (Classes I1 à I4) ou d'isolation (ITE) :</strong> Si les travaux avaient pour but de stopper des infiltrations d'eau existantes, de refaire l'étanchéité des parois ou d'isoler thermiquement l'habitation, ces revêtements participent directement à la sauvegarde de la structure. Ils sont **systématiquement couverts par la garantie décennale** pendant 10 ans à compter de la réception des travaux.</li>
      </ul>

      <h2>2. Les pathologies de façade couvertes par la décennale</h2>
      <p>Voici les désordres majeurs généralement pris en charge par l'assureur décennal du façadier :</p>
      <ul>
        <li>Des infiltrations d'eau de pluie traversant les murs et créant des dégâts des eaux à l'intérieur du logement.</li>
        <li>Le décollement en plaques de l'enduit projeté neuf sur de larges surfaces, laissant la brique ou le parpaing à nu.</li>
        <li>Des fissures actives importantes traversant le nouvel enduit technique et laissant passer l'eau.</li>
      </ul>

      <h2>3. Les étapes pour faire valoir vos droits en cas de malfaçon</h2>
      <ol>
        <li><strong>Envoyer une mise en demeure :</strong> Dès le constat du désordre, adressez une lettre recommandée avec accusé de réception à l'entreprise de ravalement, lui demandant d'intervenir à ses frais au titre des garanties légales.</li>
        <li><strong>Déclarer le sinistre à votre assureur Dommages-Ouvrage (DO) :</strong> Si vous avez souscrit cette assurance facultative mais fortement recommandée avant le début des travaux, déclarez-lui le sinistre. L'assureur DO mandatera un expert et financera les travaux de réparation sous 90 jours, se chargeant ensuite de se retourner contre l'assureur de l'artisan.</li>
        <li><strong>Actionner directement l'assureur décennal :</strong> En l'absence d'assurance DO et si l'entreprise a déposé le bilan entre-temps, contactez directement sa compagnie d'assurance décennale (dont l'attestation doit être annexée au devis signé) pour lui demander l'ouverture d'un dossier de sinistre.</li>
      </ol>
    `
  }
];
