// src/srd/classes/druid.js

export const SRD_DRUID = {
  key: "druid",
  name: "Druida",
  source: "SRD 5.1",

  // Atributo principal y TS
  primaryAbility: ["wis"],
  savingThrows: ["int", "wis"],

  // Golpes
  hitDice: "1d8",
  hitPoints: {
    level1: {
      formula: "8 + CON",
      average: 8
    },
    higherLevels: {
      formula: "1d8 (o 5) + CON",
      averagePerLevel: 5
    }
  },

  // Competencias base
  proficiencies: {
    armor: ["light", "medium", "shield"],
    armorNotes:
      "Por tradición, los druidas no usan armaduras ni escudos hechos de metal.",
    weapons: [
      "club",
      "dagger",
      "dart",
      "javelin",
      "mace",
      "quarterstaff",
      "scimitar",
      "sickle",
      "sling",
      "spear"
    ],
    tools: ["herbalism_kit"],
    skills: {
      choose: 2,
      from: [
        "Arcana",
        "Animal Handling",
        "Insight",
        "Medicine",
        "Nature",
        "Perception",
        "Religion",
        "Survival"
      ]
    }
  },

  // Reglas de multiclase
  multiclass: {
    // Requisitos para ENTRAR a Druida
    prerequisites: {
      wis: 13
    },
    // Lo que ganas al multiclasear EN Druida
    proficienciesGained: {
      armor: ["light", "medium", "shield"],
      weapons: ["club", "dagger", "dart", "javelin", "mace", "quarterstaff", "scimitar", "sickle", "sling", "spear"],
      tools: ["herbalism_kit"],
      skills: {
        choose: 0,
        from: []
      }
    }
  },

  // Equipo inicial
  startingEquipment: {
    default: [
      {
        chooseOne: [
          { item: "wooden_shield" },
          { item: "simple_weapon_any" }
        ]
      },
      {
        chooseOne: [
          { item: "scimitar" },
          { item: "simple_melee_weapon_any" }
        ]
      },
      { item: "leather_armor" },
      { pack: "explorers_pack" },
      { item: "druidic_focus" }
    ]
  },

  // Tabla de niveles
  levels: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: ["druidic", "spellcasting"],
      cantripsKnown: 2,
      spellSlots: { 1: 2 }
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: ["wild_shape", "druid_circle"],
      cantripsKnown: 2,
      spellSlots: { 1: 3 }
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: [],
      cantripsKnown: 2,
      spellSlots: { 1: 4, 2: 2 }
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: ["wild_shape_improvement", "ability_score_improvement"],
      cantripsKnown: 3,
      spellSlots: { 1: 4, 2: 3 }
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: [],
      cantripsKnown: 3,
      spellSlots: { 1: 4, 2: 3, 3: 2 }
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: ["circle_feature_6"],
      cantripsKnown: 3,
      spellSlots: { 1: 4, 2: 3, 3: 3 }
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: [],
      cantripsKnown: 3,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 1 }
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: ["wild_shape_improvement", "ability_score_improvement"],
      cantripsKnown: 3,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 2 }
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [],
      cantripsKnown: 3,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 }
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: ["circle_feature_10"],
      cantripsKnown: 4,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 }
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: [],
      cantripsKnown: 4,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 }
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: ["ability_score_improvement"],
      cantripsKnown: 4,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 }
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [],
      cantripsKnown: 4,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 }
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: ["circle_feature_14"],
      cantripsKnown: 4,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 }
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: [],
      cantripsKnown: 4,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 }
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: ["ability_score_improvement"],
      cantripsKnown: 4,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 }
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: [],
      cantripsKnown: 4,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 }
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: ["timeless_body", "beast_spells"],
      cantripsKnown: 4,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 }
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: ["ability_score_improvement"],
      cantripsKnown: 4,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 }
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: ["archdruid"],
      cantripsKnown: 4,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 }
    }
  ],

  // Rasgos de clase
  features: {
    druidic: {
      key: "druidic",
      name: "Druídico",
      level: 1,
      description:
        "Conoces el druídico, el lenguaje secreto de los druidas. Puedes hablarlo y dejar mensajes ocultos. Cualquier criatura que conozca el idioma los reconoce automáticamente; otros solo detectan que hay un mensaje con una tirada de Sabiduría (Percepción) CD 15, pero no pueden entenderlo sin magia."
    },

    spellcasting: {
      key: "spellcasting",
      name: "Lanzamiento de conjuros",
      level: 1,
      type: "spellcasting",
      description:
        "Canalizas la esencia divina de la naturaleza para moldearla mediante conjuros de druida. Preparas una lista de conjuros cada día y usas un foco druídico para lanzarlos.",
      rules: {
        spellcastingAbility: "wis",
        spellSaveDCFormula: "8 + proficiencyBonus + WIS",
        spellAttackBonusFormula: "proficiencyBonus + WIS",
        preparationFormula: "druidLevel + WIS (mínimo 1)",
        ritualCasting: true,
        focus: "druidic_focus"
      }
    },

    wild_shape: {
      key: "wild_shape",
      name: "Forma Salvaje",
      level: 2,
      description:
        "Puedes usar tu acción para adoptar mágicamente la forma de una bestia que hayas visto. Puedes usar esta aptitud dos veces y recuperas los usos tras un descanso corto o largo. Tu nivel de druida limita los CR y tipos de bestias a las que puedes transformarte.",
      rules: {
        uses: 2,
        refresh: "short_or_long_rest",
        beastShapesTable: [
          {
            level: 2,
            maxCR: "1/4",
            limitations: ["sin_velocidad_de_vuelo", "sin_velocidad_de_nado"]
          },
          {
            level: 4,
            maxCR: "1/2",
            limitations: ["sin_velocidad_de_vuelo"]
          },
          {
            level: 8,
            maxCR: "1",
            limitations: []
          }
        ],
        durationFormula:
          "Horas en forma de bestia = la mitad del nivel de druida (redondeado hacia abajo)"
      }
    },

    wild_shape_improvement: {
      key: "wild_shape_improvement",
      name: "Mejora de Forma Salvaje",
      levels: [4, 8],
      description:
        "A 4.º nivel puedes adoptar formas de CR 1/2 sin velocidad de vuelo. A 8.º nivel puedes adoptar formas de CR 1 sin restricciones de movimiento."
    },

    druid_circle: {
      key: "druid_circle",
      name: "Círculo Druídico",
      level: 2,
      description:
        "Te unes a un círculo de druidas (como el Círculo de la Tierra). Tu círculo te otorga rasgos adicionales en los niveles 2, 6, 10 y 14.",
      grantsSubclass: true
    },

    ability_score_improvement: {
      key: "ability_score_improvement",
      name: "Mejora de Característica",
      levels: [4, 8, 12, 16, 19],
      description:
        "En los niveles indicados puedes aumentar una característica en 2 puntos o dos características en 1 punto cada una (máximo 20)."
    },

    timeless_body: {
      key: "timeless_body",
      name: "Cuerpo Atemporal",
      level: 18,
      description:
        "La magia primigenia que manejas ralentiza tu envejecimiento. Por cada 10 años que pasan, tu cuerpo solo envejece 1 año."
    },

    beast_spells: {
      key: "beast_spells",
      name: "Conjuros Bestiales",
      level: 18,
      description:
        "Puedes lanzar muchos de tus conjuros de druida incluso mientras estás transformado por Forma Salvaje. Puedes realizar los componentes verbales y somáticos, pero no puedes aportar componentes materiales."
    },

    archdruid: {
      key: "archdruid",
      name: "Archidruida",
      level: 20,
      description:
        "Puedes usar Forma Salvaje un número ilimitado de veces. Además, ignoras los componentes verbales y somáticos de tus conjuros de druida, así como los componentes materiales sin coste que no se consuman, tanto en tu forma normal como en forma de bestia."
    },

    circle_feature_6: {
      key: "circle_feature_6",
      name: "Rasgo de Círculo (nivel 6)",
      level: 6,
      description:
        "Recibes un rasgo adicional de tu Círculo Druídico en 6.º nivel (por ejemplo, Paso por la Tierra para el Círculo de la Tierra)."
    },

    circle_feature_10: {
      key: "circle_feature_10",
      name: "Rasgo de Círculo (nivel 10)",
      level: 10,
      description:
        "Recibes otro rasgo adicional de tu Círculo Druídico en 10.º nivel."
    },

    circle_feature_14: {
      key: "circle_feature_14",
      name: "Rasgo de Círculo (nivel 14)",
      level: 14,
      description:
        "Recibes un último rasgo mayor de tu Círculo Druídico en 14.º nivel."
    }
  },

  // Subclase: Círculo de la Tierra
  subclasses: [
    {
      key: "land",
      name: "Círculo de la Tierra",
      description:
        "Los druidas del Círculo de la Tierra son sabios y guardianes de antiguos secretos, vinculados espiritualmente a un tipo de entorno concreto: tundras gélidas, bosques profundos, desiertos abrasadores, montañas imponentes, etc.",

      features: [
        {
          key: "land_bonus_cantrip",
          name: "Truco Adicional",
          level: 2,
          description:
            "Cuando eliges este círculo a 2.º nivel, aprendes un truco de druida adicional a tu elección."
        },
        {
          key: "land_natural_recovery",
          name: "Recuperación Natural",
          level: 2,
          description:
            "Durante un descanso corto puedes recuperar parte de tu energía mágica. Elige espacios de conjuro gastados con nivel total igual o inferior a la mitad de tu nivel de druida (redondeando hacia arriba). Ninguno de los espacios recuperados puede ser de 6.º nivel o superior. Tras usar este rasgo, debes completar un descanso largo para volver a usarlo.",
          rules: {
            recoverFormula:
              "Hasta la mitad del nivel de druida (redondeado hacia arriba), sin espacios de nivel 6 o superior."
          }
        },
        {
          key: "land_circle_spells",
          name: "Conjuros de Círculo",
          level: 3,
          description:
            "Tu vínculo con un tipo de terreno concede conjuros adicionales siempre preparados. No cuentan contra el límite de conjuros que puedes preparar cada día.",
          circleSpells: {
            arctic: [
              { level: 3, spells: ["hold_person", "spike_growth"] },
              { level: 5, spells: ["sleet_storm", "slow"] },
              { level: 7, spells: ["freedom_of_movement", "ice_storm"] },
              { level: 9, spells: ["commune_with_nature", "cone_of_cold"] }
            ],
            coast: [
              { level: 3, spells: ["mirror_image", "misty_step"] },
              { level: 5, spells: ["water_breathing", "water_walk"] },
              { level: 7, spells: ["control_water", "freedom_of_movement"] },
              { level: 9, spells: ["conjure_elemental", "scrying"] }
            ],
            desert: [
              { level: 3, spells: ["blur", "silence"] },
              { level: 5, spells: ["create_food_and_water", "protection_from_energy"] },
              { level: 7, spells: ["blight", "hallucinatory_terrain"] },
              { level: 9, spells: ["insect_plague", "wall_of_stone"] }
            ],
            forest: [
              { level: 3, spells: ["barkskin", "spider_climb"] },
              { level: 5, spells: ["call_lightning", "plant_growth"] },
              { level: 7, spells: ["divination", "freedom_of_movement"] },
              { level: 9, spells: ["commune_with_nature", "tree_stride"] }
            ],
            grassland: [
              { level: 3, spells: ["invisibility", "pass_without_trace"] },
              { level: 5, spells: ["daylight", "haste"] },
              { level: 7, spells: ["divination", "freedom_of_movement"] },
              { level: 9, spells: ["dream", "insect_plague"] }
            ],
            mountain: [
              { level: 3, spells: ["spider_climb", "spike_growth"] },
              { level: 5, spells: ["lightning_bolt", "meld_into_stone"] },
              { level: 7, spells: ["stone_shape", "stoneskin"] },
              { level: 9, spells: ["passwall", "wall_of_stone"] }
            ],
            swamp: [
              { level: 3, spells: ["acid_arrow", "darkness"] },
              { level: 5, spells: ["water_walk", "stinking_cloud"] },
              { level: 7, spells: ["freedom_of_movement", "locate_creature"] },
              { level: 9, spells: ["insect_plague", "scrying"] }
            ]
          }
        },
        {
          key: "land_stride",
          name: "Paso por la Tierra",
          level: 6,
          description:
            "Ignoras el terreno difícil no mágico y puedes moverte a través de plantas no mágicas sin ralentizarte ni sufrir daño por espinas u otros peligros similares. Además, tienes ventaja en TS contra efectos de plantas mágicas que impidan el movimiento, como el del conjuro enredar."
        },
        {
          key: "lands_ward",
          name: "Defensa de la Naturaleza",
          level: 10,
          description:
            "No puedes ser hechizado ni asustado por elementales o feéricos, y eres inmune al veneno y a las enfermedades."
        },
        {
          key: "natures_sanctuary",
          name: "Santuario Natural",
          level: 14,
          description:
            "Las criaturas bestias y de tipo planta dudan en atacarte. Cuando una de ellas te ataque, debe hacer un TS de Sabiduría contra la CD de tus conjuros de druida. Si falla, debe elegir otro objetivo o el ataque falla automáticamente. Si tiene éxito, es inmune a este efecto durante 24 horas. La criatura sabe de este efecto antes de decidir su ataque."
        }
      ]
    }
  ]
};
