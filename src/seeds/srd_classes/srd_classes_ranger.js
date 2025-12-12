// src/srd/classes/ranger.js

export const SRD_RANGER = {
  key: "ranger",
  name: "Explorador",
  source: "SRD 5.1",

  // Atributos clave y TS
  primaryAbility: ["dex", "wis"],
  savingThrows: ["str", "dex"],

  // Golpes
  hitDice: "1d10",
  hitPoints: {
    level1: {
      formula: "10 + CON",
      average: 10
    },
    higherLevels: {
      formula: "1d10 (o 6) + CON",
      averagePerLevel: 6
    }
  },

  // Competencias base
  proficiencies: {
    armor: ["light", "medium", "shield"],
    weapons: ["simple", "martial"],
    tools: [],
    skills: {
      choose: 3,
      from: [
        "Animal Handling",
        "Athletics",
        "Insight",
        "Investigation",
        "Nature",
        "Perception",
        "Stealth",
        "Survival"
      ]
    }
  },

  // Reglas de multiclase
  multiclass: {
    // Requisitos para ENTRAR a Explorador
    prerequisites: {
      // PHB: Destreza 13 y Sabiduría 13
      allOf: [{ dex: 13 }, { wis: 13 }]
    },
    // Lo que ganas al multiclasear EN Explorador
    proficienciesGained: {
      armor: ["light", "medium", "shield"],
      weapons: ["simple", "martial"],
      tools: [],
      skills: {
        choose: 1,
        from: [
          "Animal Handling",
          "Athletics",
          "Insight",
          "Investigation",
          "Nature",
          "Perception",
          "Stealth",
          "Survival"
        ]
      }
    }
  },

  // Equipo inicial
  startingEquipment: {
    default: [
      {
        chooseOne: [
          { items: [{ item: "scale_mail" }] },
          { items: [{ item: "leather_armor" }] }
        ]
      },
      {
        chooseOne: [
          { items: [{ item: "shortsword", quantity: 2 }] },
          {
            items: [
              { item: "simple_melee_weapon_any" },
              { item: "simple_melee_weapon_any" }
            ]
          }
        ]
      },
      {
        chooseOne: [
          { pack: "dungeoneers_pack" },
          { pack: "explorers_pack" }
        ]
      },
      {
        items: [
          { item: "longbow" },
          { item: "arrow", quantity: 20 }
        ]
      }
    ]
  },

  // Lanzamiento de conjuros (semilanzador de conjuros conocidos)
  spellcasting: {
    progression: "half_caster_known",
    ability: "wis",
    cantripsKnown: 0,
    // Hechizos conocidos por nivel de explorador (tabla SRD)
    spellsKnownByLevel: {
      1: 0,
      2: 2,
      3: 3,
      4: 3,
      5: 4,
      6: 4,
      7: 5,
      8: 5,
      9: 6,
      10: 6,
      11: 7,
      12: 7,
      13: 8,
      14: 8,
      15: 9,
      16: 9,
      17: 10,
      18: 10,
      19: 11,
      20: 11
    },
    ritualCasting: false,
    focus: null // el SRD no le da foco de conjuro específico
  },

  // Tabla de niveles
  levels: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: ["favored_enemy", "natural_explorer"],
      spellsKnown: 0,
      spellSlots: {}
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: ["ranger_fighting_style", "ranger_spellcasting"],
      spellsKnown: 2,
      spellSlots: { 1: 2 }
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: ["ranger_archetype", "primeval_awareness"],
      spellsKnown: 3,
      spellSlots: { 1: 3 }
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: ["ability_score_improvement"],
      spellsKnown: 3,
      spellSlots: { 1: 3 }
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: ["extra_attack"],
      spellsKnown: 4,
      spellSlots: { 1: 4, 2: 2 }
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: ["favored_enemy_improvement", "natural_explorer_improvement"],
      spellsKnown: 4,
      spellSlots: { 1: 4, 2: 2 }
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: ["ranger_archetype_feature_7"],
      spellsKnown: 5,
      spellSlots: { 1: 4, 2: 3 }
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: ["ability_score_improvement", "lands_stride"],
      spellsKnown: 5,
      spellSlots: { 1: 4, 2: 3 }
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [],
      spellsKnown: 6,
      spellSlots: { 1: 4, 2: 3, 3: 2 }
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: ["natural_explorer_improvement", "hide_in_plain_sight"],
      spellsKnown: 6,
      spellSlots: { 1: 4, 2: 3, 3: 2 }
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: ["ranger_archetype_feature_11"],
      spellsKnown: 7,
      spellSlots: { 1: 4, 2: 3, 3: 3 }
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: ["ability_score_improvement"],
      spellsKnown: 7,
      spellSlots: { 1: 4, 2: 3, 3: 3 }
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [],
      spellsKnown: 8,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 1 }
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: ["favored_enemy_improvement", "vanish"],
      spellsKnown: 8,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 1 }
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: ["ranger_archetype_feature_15"],
      spellsKnown: 9,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 2 }
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: ["ability_score_improvement"],
      spellsKnown: 9,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 2 }
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: [],
      spellsKnown: 10,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 }
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: ["feral_senses"],
      spellsKnown: 10,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 }
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: ["ability_score_improvement"],
      spellsKnown: 11,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 }
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: ["foe_slayer"],
      spellsKnown: 11,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 }
    }
  ],

  // Rasgos de clase
  features: {
    favored_enemy: {
      key: "favored_enemy",
      name: "Enemigo predilecto",
      level: 1,
      description:
        "Desde 1.º nivel has estudiado, rastreado y cazado a un tipo concreto de criatura. Elige un tipo de enemigo predilecto (aberraciones, bestias, celestiales, constructos, dragones, elementales, feéricos, infernales, gigantes, monstruosidades, limos, plantas o no muertos), o bien dos razas humanoides (por ejemplo gnolls y orcos). Tienes ventaja en tiradas de Sabiduría (Supervivencia) para rastrear a tus enemigos predilectos y en tiradas de Inteligencia para recordar información sobre ellos. Además, aprendes un idioma que hable alguno de tus enemigos predilectos, si tienen idioma. Obtienes enemigos e idiomas adicionales en niveles superiores."
    },

    favored_enemy_improvement: {
      key: "favored_enemy_improvement",
      name: "Mejora de enemigo predilecto",
      level: [6, 14],
      description:
        "En 6.º y 14.º nivel eliges enemigos predilectos adicionales y, si procede, nuevos idiomas asociados. Tus elecciones deberían reflejar los peligros que has enfrentado a lo largo de tus aventuras."
    },

    natural_explorer: {
      key: "natural_explorer",
      name: "Explorador nato",
      level: 1,
      description:
        "Estás especialmente familiarizado con un tipo de entorno natural. Elige un terreno predilecto (ártico, costa, desierto, bosque, pradera, montaña o pantano). Cuando realizas una prueba de Inteligencia o Sabiduría relacionada con tu terreno predilecto y usas una habilidad en la que eres competente, duplicas tu bonificador de competencia. Además, al viajar durante una hora o más en tu terreno predilecto tu grupo ignora terreno difícil para el viaje, no puede perderse excepto por medios mágicos, sigues alerta incluso cuando realizas otras tareas (forrajear, navegar, rastrear), puedes moverte sigilosamente a velocidad normal si viajas solo, encuentras el doble de comida al forrajear y, al rastrear, sabes el número exacto, tamaños y cuánto hace que pasaron las criaturas. Ganas terrenos predilectos adicionales en niveles superiores."
    },

    natural_explorer_improvement: {
      key: "natural_explorer_improvement",
      name: "Mejora de explorador nato",
      level: [6, 10],
      description:
        "En 6.º y 10.º nivel eliges terrenos predilectos adicionales, ampliando los entornos en los que tu grupo se beneficia de Explorador nato."
    },

    ranger_fighting_style: {
      key: "ranger_fighting_style",
      name: "Estilo de combate",
      level: 2,
      description:
        "En 2.º nivel adoptas un estilo de combate especializado. No puedes elegir el mismo estilo más de una vez.",
      options: [
        {
          key: "archery",
          name: "Arquería",
          description:
            "Obtienes un bonificador de +2 a las tiradas de ataque que hagas con armas a distancia."
        },
        {
          key: "defense",
          name: "Defensa",
          description:
            "Mientras lleves armadura, obtienes un bonificador de +1 a tu CA."
        },
        {
          key: "dueling",
          name: "Duelo",
          description:
            "Cuando empuñas un arma cuerpo a cuerpo en una mano y no llevas otras armas, obtienes un bonificador de +2 a las tiradas de daño con esa arma."
        },
        {
          key: "two_weapon_fighting",
          name: "Combate con dos armas",
          description:
            "Cuando realizas el estilo de combate con dos armas, puedes añadir tu modificador de característica al daño del segundo ataque."
        }
      ]
    },

    ranger_spellcasting: {
      key: "ranger_spellcasting",
      name: "Lanzamiento de conjuros",
      level: 2,
      description:
        "Desde 2.º nivel aprendes a canalizar la esencia mágica de la naturaleza para lanzar conjuros, de forma similar a un druida. Conoces dos conjuros de 1.er nivel de la lista de explorador. A niveles superiores aprendes más conjuros según la tabla de Explorador, y puedes reemplazar conjuros conocidos al subir de nivel. Usas Sabiduría como atributo de lanzamiento (CD de salvación = 8 + bonif. de competencia + mod. de Sabiduría, ataque de conjuro = bonif. de competencia + mod. de Sabiduría). Recuperas todos los espacios de conjuro al finalizar un descanso largo."
    },

    ranger_archetype: {
      key: "ranger_archetype",
      name: "Arquetipo de explorador",
      level: 3,
      description:
        "En 3.er nivel eliges un arquetipo de explorador, como el Cazador. Tu elección te concede rasgos adicionales en los niveles 3, 7, 11 y 15.",
      grantsSubclass: true
    },

    primeval_awareness: {
      key: "primeval_awareness",
      name: "Conciencia primigenia",
      level: 3,
      description:
        "Desde 3.er nivel puedes gastar un espacio de conjuro de explorador como acción para sintonizarte con las fuerzas primordiales que te rodean. Durante 1 minuto por nivel del espacio gastado percibes si hay aberraciones, celestiales, dragones, elementales, feéricos, infernales o no muertos presentes en un radio de 1 milla (6 millas en tu terreno predilecto). Este rasgo no revela su número ni localización exacta."
    },

    ability_score_improvement: {
      key: "ability_score_improvement",
      name: "Mejora de característica",
      levels: [4, 8, 12, 16, 19],
      description:
        "En los niveles indicados, puedes aumentar una característica en 2 puntos o dos características en 1 punto (máximo 20)."
    },

    extra_attack: {
      key: "extra_attack",
      name: "Ataque extra",
      level: 5,
      description:
        "A partir de 5.º nivel, cuando realizas la acción de Ataque en tu turno, puedes atacar dos veces en lugar de una."
    },

    lands_stride: {
      key: "lands_stride",
      name: "Zancada terrestre",
      level: 8,
      description:
        "Desde 8.º nivel, moverte a través de terreno difícil no mágico no te cuesta movimiento extra. Puedes atravesar plantas no mágicas sin ser ralentizado ni sufrir daño de espinas o peligros similares. Además, tienes ventaja en tiradas de salvación contra plantas creadas o manipuladas mágicamente para impedir el movimiento, como las de *entangle*."
    },

    hide_in_plain_sight: {
      key: "hide_in_plain_sight",
      name: "Ocultarse a plena vista",
      level: 10,
      description:
        "Desde 10.º nivel, puedes pasar 1 minuto aplicándote barro, hojas, hollín u otros materiales naturales para camuflarte. Mientras permanezcas pegado a una superficie sólida (como una roca o un tronco) del tamaño adecuado, obtienes un bonificador de +10 a las pruebas de Destreza (Sigilo). Pierdes el beneficio si te mueves, realizas una acción o una reacción, y deberás volver a camuflarte."
    },

    vanish: {
      key: "vanish",
      name: "Esfumarse",
      level: 14,
      description:
        "Desde 14.º nivel, puedes usar la acción de Esconderse como acción adicional en tu turno. Además, no puedes ser rastreado por medios no mágicos a menos que decidas dejar un rastro."
    },

    feral_senses: {
      key: "feral_senses",
      name: "Sentidos ferales",
      level: 18,
      description:
        "En 18.º nivel tus sentidos son tan agudos que puedes luchar casi tan bien contra enemigos que no ves. Cuando atacas a una criatura a la que no ves, no tienes desventaja en la tirada de ataque por ese motivo. Además, eres consciente de la posición de cualquier criatura invisible a 30 pies de ti, siempre que no esté escondida y tú no estés cegado ni ensordecido."
    },

    foe_slayer: {
      key: "foe_slayer",
      name: "Verdugo de enemigos",
      level: 20,
      description:
        "En 20.º nivel te conviertes en un cazador sin igual. Una vez por turno puedes añadir tu modificador de Sabiduría a la tirada de ataque o de daño de un ataque que hagas contra uno de tus enemigos predilectos. Puedes decidir usar este rasgo antes o después de tirar, pero antes de aplicar los efectos."
    },

    ranger_archetype_feature_7: {
      key: "ranger_archetype_feature_7",
      name: "Rasgo de arquetipo de explorador (7)",
      level: 7,
      description:
        "Obtienes el rasgo de tu arquetipo de explorador correspondiente a 7.º nivel (por ejemplo, Tácticas defensivas para el Cazador)."
    },

    ranger_archetype_feature_11: {
      key: "ranger_archetype_feature_11",
      name: "Rasgo de arquetipo de explorador (11)",
      level: 11,
      description:
        "Obtienes el rasgo de tu arquetipo de explorador correspondiente a 11.º nivel (por ejemplo, Ataque múltiple para el Cazador)."
    },

    ranger_archetype_feature_15: {
      key: "ranger_archetype_feature_15",
      name: "Rasgo de arquetipo de explorador (15)",
      level: 15,
      description:
        "Obtienes el rasgo de tu arquetipo de explorador correspondiente a 15.º nivel (por ejemplo, Defensa superior del cazador para el Cazador)."
    }
  },

  // Subclase: Cazador (Hunter)
  subclasses: [
    {
      key: "hunter",
      name: "Cazador",
      description:
        "El arquetipo del Cazador convierte al explorador en un muro entre la civilización y los horrores del mundo salvaje. Perfeccionas técnicas para derribar presas poderosas, enjambres de enemigos y monstruos colosales.",

      features: [
        {
          key: "hunters_prey",
          name: "Presa del cazador",
          level: 3,
          description:
            "En 3.er nivel eliges una táctica para abatir a tus enemigos. Solo puedes elegir una opción.",
          options: [
            {
              key: "colossus_slayer",
              name: "Asesino de colosos",
              description:
                "Tu tenacidad desgasta incluso a los enemigos más duros. Una vez por turno, cuando golpeas a una criatura con un ataque de arma y no está a su máximo de puntos de golpe, le infliges 1d8 de daño adicional."
            },
            {
              key: "giant_killer",
              name: "Cazador de gigantes",
              description:
                "Cuando una criatura Grande o mayor a 5 pies de ti te golpea o falla un ataque, puedes usar tu reacción para realizar inmediatamente un ataque de arma contra ella, siempre que puedas verla."
            },
            {
              key: "horde_breaker",
              name: "Rompehordas",
              description:
                "Una vez por turno, cuando realizas un ataque de arma, puedes hacer un segundo ataque contra una criatura diferente a 5 pies del objetivo original y dentro del alcance de tu arma."
            }
          ]
        },
        {
          key: "defensive_tactics",
          name: "Tácticas defensivas",
          level: 7,
          description:
            "En 7.º nivel desarrollas un estilo defensivo para sobrevivir. Elige una de las siguientes tácticas.",
          options: [
            {
              key: "escape_the_horde",
              name: "Escapar de la horda",
              description:
                "Las tiradas de ataque de oportunidad contra ti se hacen con desventaja."
            },
            {
              key: "multiattack_defense",
              name: "Defensa contra ataques múltiples",
              description:
                "Cuando una criatura te golpea con un ataque, obtienes un bonificador de +4 a la CA contra todos los ataques posteriores que haga esa criatura contra ti hasta el final de su turno."
            },
            {
              key: "steel_will",
              name: "Voluntad de acero",
              description:
                "Tienes ventaja en las tiradas de salvación contra el estado asustado."
            }
          ]
        },
        {
          key: "multiattack",
          name: "Ataque múltiple",
          level: 11,
          description:
            "En 11.º nivel aprendes una técnica para atacar a múltiples enemigos a la vez. Elige una de las siguientes opciones.",
          options: [
            {
              key: "volley",
              name: "Lluvia de proyectiles",
              description:
                "Como acción, puedes realizar un ataque a distancia con arma contra cualquier número de criaturas dentro de un área de 10 pies alrededor de un punto que puedas ver dentro del alcance de tu arma. Realizas una tirada de ataque separada para cada objetivo y debes tener munición suficiente para cada uno."
            },
            {
              key: "whirlwind_attack",
              name: "Ataque en torbellino",
              description:
                "Como acción, puedes realizar un ataque cuerpo a cuerpo con arma contra cualquier número de criaturas a 5 pies de ti, con una tirada de ataque separada para cada objetivo."
            }
          ]
        },
        {
          key: "superior_hunters_defense",
          name: "Defensa superior del cazador",
          level: 15,
          description:
            "En 15.º nivel perfeccionas tu supervivencia frente a amenazas letales. Elige una de las siguientes opciones.",
          options: [
            {
              key: "evasion",
              name: "Evasión",
              description:
                "Cuando un efecto te permita realizar una tirada de salvación de Destreza para recibir solo la mitad de daño, no recibes daño si superas la tirada y solo la mitad si la fallas."
            },
            {
              key: "stand_against_the_tide",
              name: "Contra la marea",
              description:
                "Cuando una criatura hostil falle un ataque cuerpo a cuerpo contra ti, puedes usar tu reacción para obligarla a repetir el ataque contra otra criatura (que no seas tú) de tu elección."
            },
            {
              key: "uncanny_dodge",
              name: "Esquiva asombrosa",
              description:
                "Cuando una criatura que puedas ver te golpee con un ataque, puedes usar tu reacción para reducir a la mitad el daño que recibes de ese ataque."
            }
          ]
        }
      ]
    }
  ]
};
