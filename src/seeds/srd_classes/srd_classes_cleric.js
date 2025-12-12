// src/srd/classes/cleric.js

export const SRD_CLERIC = {
  key: "cleric",
  name: "Clérigo",
  source: "SRD 5.1",

  // Atributo principal y TS
  primaryAbility: ["wis"],
  savingThrows: ["wis", "cha"],

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
    weapons: ["simple"],
    tools: [],
    skills: {
      choose: 2,
      from: ["History", "Insight", "Medicine", "Persuasion", "Religion"]
    }
  },

  // Reglas de multiclase
  multiclass: {
    // Requisitos para ENTRAR a Clérigo
    prerequisites: {
      wis: 13
    },
    // Lo que ganas al multiclasear EN Clérigo
    proficienciesGained: {
      armor: ["light", "medium", "shield"],
      weapons: ["simple"],
      tools: [],
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
          { item: "mace" },
          { item: "warhammer", note: "Solo si el personaje es competente" }
        ]
      },
      {
        chooseOne: [
          { item: "scale_mail" },
          { item: "leather_armor" },
          {
            item: "chain_mail",
            note: "Solo si el personaje es competente con armadura pesada"
          }
        ]
      },
      {
        chooseOne: [
          {
            group: "light_crossbow",
            extra: { item: "crossbow_bolts", quantity: 20 }
          },
          { item: "simple_weapon_any" }
        ]
      },
      {
        chooseOne: [
          { pack: "priests_pack" },
          { pack: "explorers_pack" }
        ]
      },
      { item: "shield" },
      { item: "holy_symbol" }
    ]
  },

  // Tabla de niveles
  levels: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: ["spellcasting", "divine_domain"],
      cantripsKnown: 3,
      spellSlots: { 1: 2 }
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: ["channel_divinity", "domain_feature_2"],
      cantripsKnown: 3,
      spellSlots: { 1: 3 }
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: [],
      cantripsKnown: 3,
      spellSlots: { 1: 4, 2: 2 }
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: ["ability_score_improvement"],
      cantripsKnown: 4,
      spellSlots: { 1: 4, 2: 3 }
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: ["destroy_undead_1_2"],
      cantripsKnown: 4,
      spellSlots: { 1: 4, 2: 3, 3: 2 }
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: ["channel_divinity_2", "domain_feature_6"],
      cantripsKnown: 4,
      spellSlots: { 1: 4, 2: 3, 3: 3 }
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: [],
      cantripsKnown: 4,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 1 }
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: [
        "ability_score_improvement",
        "destroy_undead_1",
        "domain_feature_8"
      ],
      cantripsKnown: 4,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 2 }
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [],
      cantripsKnown: 4,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 }
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: ["divine_intervention"],
      cantripsKnown: 5,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 }
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: ["destroy_undead_2"],
      cantripsKnown: 5,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 }
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: ["ability_score_improvement"],
      cantripsKnown: 5,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 }
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [],
      cantripsKnown: 5,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 }
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: ["destroy_undead_3"],
      cantripsKnown: 5,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 }
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: [],
      cantripsKnown: 5,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 }
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: ["ability_score_improvement"],
      cantripsKnown: 5,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 }
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: ["destroy_undead_4", "domain_feature_17"],
      cantripsKnown: 5,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 }
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: ["channel_divinity_3"],
      cantripsKnown: 5,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 }
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: ["ability_score_improvement"],
      cantripsKnown: 5,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 }
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: ["divine_intervention_improved"],
      cantripsKnown: 5,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 }
    }
  ],

  // Rasgos de clase
  features: {
    spellcasting: {
      key: "spellcasting",
      name: "Lanzamiento de conjuros",
      level: 1,
      type: "spellcasting",
      description:
        "Actúas como canal de poder divino, capaz de invocar conjuros de la lista de clérigo. Preparas tus conjuros cada día a través de oración y meditación.",
      rules: {
        spellcastingAbility: "wis",
        spellSaveDCFormula: "8 + proficiencyBonus + WIS",
        spellAttackBonusFormula: "proficiencyBonus + WIS",
        preparationFormula: "clericLevel + WIS (mínimo 1)",
        ritualCasting: true,
        focus: "holy_symbol"
      }
    },

    divine_domain: {
      key: "divine_domain",
      name: "Dominio Divino",
      level: 1,
      description:
        "Escoges un dominio vinculado a tu deidad (como Vida). El dominio te otorga conjuros de dominio siempre preparados y rasgos especiales en varios niveles.",
      grantsSubclass: true
    },

    channel_divinity: {
      key: "channel_divinity",
      name: "Canalizar Divinidad",
      level: 2,
      description:
        "Puedes canalizar directamente la energía divina para producir efectos especiales, como Reprender a los Muertos Vivientes o los poderes de tu dominio.",
      rules: {
        usesPerRestByLevel: {
          2: 1,
          6: 2,
          18: 3
        },
        refresh: "short_or_long_rest"
      }
    },

    turn_undead: {
      key: "turn_undead",
      name: "Reprender Muertos Vivientes",
      level: 2,
      description:
        "Como acción, muestras tu símbolo sagrado y pronuncias una plegaria. Los muertos vivientes cercanos deben superar una tirada de salvación de Sabiduría o huyen de ti, incapaces de acercarse, durante un minuto o hasta que reciban daño."
    },

    ability_score_improvement: {
      key: "ability_score_improvement",
      name: "Mejora de Característica",
      levels: [4, 8, 12, 16, 19],
      description:
        "En los niveles indicados puedes aumentar una característica en 2 puntos o dos características en 1 punto cada una (máximo 20)."
    },

    destroy_undead_1_2: {
      key: "destroy_undead_1_2",
      name: "Destruir Muertos Vivientes (CR 1/2)",
      level: 5,
      description:
        "Cuando una criatura muerta viviente falle su TS contra tu Reprender Muertos Vivientes y tenga un ND de 1/2 o menor, en vez de huir queda destruida al instante."
    },

    destroy_undead_1: {
      key: "destroy_undead_1",
      name: "Destruir Muertos Vivientes (CR 1)",
      level: 8,
      description:
        "Aumenta el umbral: destruyes muertos vivientes con ND 1 o menor si fallan el TS."
    },

    destroy_undead_2: {
      key: "destroy_undead_2",
      name: "Destruir Muertos Vivientes (CR 2)",
      level: 11,
      description:
        "Aumenta el umbral: destruyes muertos vivientes con ND 2 o menor si fallan el TS."
    },

    destroy_undead_3: {
      key: "destroy_undead_3",
      name: "Destruir Muertos Vivientes (CR 3)",
      level: 14,
      description:
        "Aumenta el umbral: destruyes muertos vivientes con ND 3 o menor si fallan el TS."
    },

    destroy_undead_4: {
      key: "destroy_undead_4",
      name: "Destruir Muertos Vivientes (CR 4)",
      level: 17,
      description:
        "Aumenta el umbral: destruyes muertos vivientes con ND 4 o menor si fallan el TS."
    },

    divine_intervention: {
      key: "divine_intervention",
      name: "Intervención Divina",
      level: 10,
      description:
        "Puedes suplicar a tu deidad ayuda directa. Como acción describes la ayuda que buscas y tiras 1d100. Si el resultado es igual o inferior a tu nivel de clérigo, la deidad interviene (el efecto lo decide el DM). Si tiene éxito, no puedes volver a usar esta aptitud en 7 días; si falla, puedes intentarlo de nuevo tras un descanso largo."
    },

    divine_intervention_improved: {
      key: "divine_intervention_improved",
      name: "Intervención Divina Mejorada",
      level: 20,
      description:
        "A nivel 20, tu Intervención Divina tiene éxito automáticamente, sin necesidad de tirada."
    },

    channel_divinity_2: {
      key: "channel_divinity_2",
      name: "Canalizar Divinidad (2 usos)",
      level: 6,
      description:
        "A partir de 6.º nivel puedes usar Canalizar Divinidad dos veces entre descansos en lugar de una."
    },

    channel_divinity_3: {
      key: "channel_divinity_3",
      name: "Canalizar Divinidad (3 usos)",
      level: 18,
      description:
        "A partir de 18.º nivel puedes usar Canalizar Divinidad tres veces entre descansos."
    }
  },

  // Subclase: Dominio de la Vida
  subclasses: [
    {
      key: "life",
      name: "Dominio de la Vida",
      description:
        "El Dominio de la Vida se centra en la energía positiva que mantiene a las criaturas con vida. Estos clérigos se dedican a curar, proteger y expulsar la influencia de la muerte y la no-muerte.",
      domainSpells: [
        { level: 1, spells: ["bless", "cure_wounds"] },
        { level: 3, spells: ["lesser_restoration", "spiritual_weapon"] },
        { level: 5, spells: ["beacon_of_hope", "revivify"] },
        { level: 7, spells: ["death_ward", "guardian_of_faith"] },
        { level: 9, spells: ["mass_cure_wounds", "raise_dead"] }
      ],
      features: [
        {
          key: "life_bonus_proficiency",
          name: "Competencia adicional",
          level: 1,
          description:
            "Al elegir este dominio ganas competencia con armadura pesada."
        },
        {
          key: "disciple_of_life",
          name: "Discípulo de la Vida",
          level: 1,
          description:
            "Tus conjuros curativos son especialmente potentes. Cuando un conjuro de nivel 1 o superior que lanzas restaure puntos de golpe, el objetivo recupera PV adicionales iguales a 2 + el nivel del conjuro."
        },
        {
          key: "preserve_life",
          name: "Canalizar Divinidad: Preservar la Vida",
          level: 2,
          description:
            "Puedes usar tu Canalizar Divinidad para emanar energía curativa. Como acción, eliges criaturas a 30 pies y repartes entre ellas PV iguales a cinco veces tu nivel de clérigo. No puedes curar a ninguna criatura por encima de la mitad de sus PV máximos, ni puedes usar este efecto en no-muertos o constructos."
        },
        {
          key: "blessed_healer",
          name: "Sanador Bendito",
          level: 6,
          description:
            "Cuando un conjuro de nivel 1 o superior que lanzas cura a otra criatura que no seas tú, recuperas PV iguales a 2 + el nivel del conjuro."
        },
        {
          key: "divine_strike_life",
          name: "Golpe Divino",
          level: 8,
          description:
            "Una vez por turno, cuando impactas con un ataque de arma, puedes añadir 1d8 de daño radiante extra. Este daño aumenta a 2d8 en nivel 14.",
          rules: {
            damageType: "radiant",
            extraDiceByLevel: {
              8: "1d8",
              14: "2d8"
            }
          }
        },
        {
          key: "supreme_healing",
          name: "Curación Suprema",
          level: 17,
          description:
            "Cuando lances un conjuro que restaure puntos de golpe y normalmente tirarías uno o más dados para determinar los PV curados, en su lugar usas el valor máximo posible en cada dado (por ejemplo, 2d6 pasa a curar 12 PV)."
        }
      ]
    }
  ]
};
