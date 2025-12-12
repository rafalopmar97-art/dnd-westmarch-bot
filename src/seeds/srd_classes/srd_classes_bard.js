// src/srd/classes/bard.js

export const SRD_BARD = {
  key: "bard",
  name: "Bardo",
  source: "SRD 5.1",

  // Atributo principal y tiradas de salvación
  primaryAbility: ["cha"],
  savingThrows: ["dex", "cha"],

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

  // Competencias base de la clase
  proficiencies: {
    armor: ["light"],
    weapons: [
      "simple",
      "hand_crossbow",
      "longsword",
      "rapier",
      "shortsword"
    ],
    tools: [
      {
        type: "instrument",
        count: 3,
        description: "Tres instrumentos musicales a elección"
      }
    ],
    skills: {
      choose: 3,
      from: [
        "Acrobatics",
        "Animal Handling",
        "Arcana",
        "Athletics",
        "Deception",
        "History",
        "Insight",
        "Intimidation",
        "Investigation",
        "Medicine",
        "Nature",
        "Perception",
        "Performance",
        "Persuasion",
        "Religion",
        "Sleight of Hand",
        "Stealth",
        "Survival"
      ]
    }
  },

  // Reglas de multiclase
  multiclass: {
    // Requisitos para ENTRAR a bardo desde otra clase
    prerequisites: {
      cha: 13
    },
    // Lo que ganas al multiclasear EN bardo
    proficienciesGained: {
      armor: ["light"],
      weapons: [],
      tools: [
        {
          type: "instrument",
          count: 1,
          description: "Un instrumento musical a elección al multiclasear"
        }
      ],
      skills: {
        choose: 1,
        from: "any" // "una habilidad a elección"
      }
    }
  },

  // Equipo inicial de la clase
  startingEquipment: {
    default: [
      {
        chooseOne: [
          { item: "martial_rapier", note: "Esto representa un estoque (rapier)" },
          { item: "martial_longsword", note: "Representa una espada larga" },
          { item: "simple_melee_or_ranged", note: "Cualquier arma simple" }
        ]
      },
      {
        chooseOne: [
          { pack: "diplomat_pack" },
          { pack: "entertainer_pack" }
        ]
      },
      {
        chooseOne: [
          { item: "instrument_lute" },
          { item: "instrument_any", note: "Otro instrumento musical" }
        ]
      },
      { item: "leather_armor" },
      { item: "dagger" }
    ]
  },

  // Tabla de niveles
  levels: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: ["spellcasting", "bardic_inspiration"],
      bardicInspirationDie: "d6",
      songOfRestDie: null,
      cantripsKnown: 2,
      spellsKnown: 4,
      spellSlots: { 1: 2 }
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: ["jack_of_all_trades", "song_of_rest"],
      bardicInspirationDie: "d6",
      songOfRestDie: "d6",
      cantripsKnown: 2,
      spellsKnown: 5,
      spellSlots: { 1: 3 }
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: ["bard_college", "expertise"],
      bardicInspirationDie: "d6",
      songOfRestDie: "d6",
      cantripsKnown: 2,
      spellsKnown: 6,
      spellSlots: { 1: 4, 2: 2 }
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: ["ability_score_improvement"],
      bardicInspirationDie: "d6",
      songOfRestDie: "d6",
      cantripsKnown: 3,
      spellsKnown: 7,
      spellSlots: { 1: 4, 2: 3 }
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: ["bardic_inspiration_improved", "font_of_inspiration"],
      bardicInspirationDie: "d8",
      songOfRestDie: "d6",
      cantripsKnown: 3,
      spellsKnown: 8,
      spellSlots: { 1: 4, 2: 3, 3: 2 }
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: ["countercharm", "college_feature_6"],
      bardicInspirationDie: "d8",
      songOfRestDie: "d6",
      cantripsKnown: 3,
      spellsKnown: 9,
      spellSlots: { 1: 4, 2: 3, 3: 3 }
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: [],
      bardicInspirationDie: "d8",
      songOfRestDie: "d6",
      cantripsKnown: 3,
      spellsKnown: 10,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 1 }
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: ["ability_score_improvement"],
      bardicInspirationDie: "d8",
      songOfRestDie: "d6",
      cantripsKnown: 3,
      spellsKnown: 11,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 2 }
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: ["song_of_rest_improved"],
      bardicInspirationDie: "d8",
      songOfRestDie: "d8",
      cantripsKnown: 3,
      spellsKnown: 12,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 }
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: ["bardic_inspiration_improved2", "expertise_improved", "magical_secrets"],
      bardicInspirationDie: "d10",
      songOfRestDie: "d8",
      cantripsKnown: 4,
      spellsKnown: 14,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 }
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: [],
      bardicInspirationDie: "d10",
      songOfRestDie: "d8",
      cantripsKnown: 4,
      spellsKnown: 15,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 }
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: ["ability_score_improvement"],
      bardicInspirationDie: "d10",
      songOfRestDie: "d8",
      cantripsKnown: 4,
      spellsKnown: 15,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 }
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: ["song_of_rest_improved2"],
      bardicInspirationDie: "d10",
      songOfRestDie: "d10",
      cantripsKnown: 4,
      spellsKnown: 16,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 }
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: ["magical_secrets_improved", "college_feature_14"],
      bardicInspirationDie: "d10",
      songOfRestDie: "d10",
      cantripsKnown: 4,
      spellsKnown: 18,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 }
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: ["bardic_inspiration_improved3"],
      bardicInspirationDie: "d12",
      songOfRestDie: "d10",
      cantripsKnown: 4,
      spellsKnown: 19,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 }
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: ["ability_score_improvement"],
      bardicInspirationDie: "d12",
      songOfRestDie: "d10",
      cantripsKnown: 4,
      spellsKnown: 19,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 }
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: ["song_of_rest_improved3"],
      bardicInspirationDie: "d12",
      songOfRestDie: "d12",
      cantripsKnown: 4,
      spellsKnown: 20,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 }
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: ["magical_secrets_master"],
      bardicInspirationDie: "d12",
      songOfRestDie: "d12",
      cantripsKnown: 4,
      spellsKnown: 22,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 }
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: ["ability_score_improvement"],
      bardicInspirationDie: "d12",
      songOfRestDie: "d12",
      cantripsKnown: 4,
      spellsKnown: 22,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 }
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: ["superior_inspiration"],
      bardicInspirationDie: "d12",
      songOfRestDie: "d12",
      cantripsKnown: 4,
      spellsKnown: 22,
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 }
    }
  ],

  // Definición de rasgos principales de la clase
  features: {
    spellcasting: {
      key: "spellcasting",
      name: "Lanzamiento de conjuros",
      level: 1,
      type: "spellcasting",
      description:
        "Has aprendido a entrelazar la magia con tus palabras y música. Tus conjuros de bardo forman un repertorio versátil que puedes adaptar a cada situación.",
      rules: {
        spellcastingAbility: "cha",
        spellSaveDCFormula: "8 + proficiencyBonus + CHA",
        spellAttackBonusFormula: "proficiencyBonus + CHA",
        cantripsKnownAtLevel: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4],
        ritualCasting: true,
        focus: "instrument" // instrumento musical como foco
      }
    },

    bardic_inspiration: {
      key: "bardic_inspiration",
      name: "Inspiración Bárdica",
      level: 1,
      description:
        "Con palabras inspiradoras o una melodía poderosa, puedes infundir confianza en tus aliados. Como acción adicional, eliges a una criatura que pueda oírte en un radio de 60 pies; gana un dado de Inspiración Bárdica que puede añadir a pruebas de característica, tiradas de ataque o tiradas de salvación.",
      rules: {
        dieProgression: {
          1: "d6",
          5: "d8",
          10: "d10",
          15: "d12"
        },
        usesFormula: "max(1, CHA)",
        recharge: "long_rest"
      }
    },

    jack_of_all_trades: {
      key: "jack_of_all_trades",
      name: "Talento para Todo",
      level: 2,
      description:
        "A partir de 2.º nivel puedes añadir la mitad de tu bonificador por competencia, redondeado hacia abajo, a cualquier prueba de característica que no incluya ya tu bonificador por competencia."
    },

    song_of_rest: {
      key: "song_of_rest",
      name: "Canto de Descanso",
      level: 2,
      description:
        "Mientras tú o tus aliados realizáis un descanso corto, puedes usar música u oratoria para ayudar a recuperar fuerzas. Aquellos que gasten dados de golpe para curarse recuperan puntos de golpe adicionales.",
      rules: {
        extraHealingDice: {
          2: "d6",
          9: "d8",
          13: "d10",
          17: "d12"
        }
      }
    },

    bard_college: {
      key: "bard_college",
      name: "Colegio de Bardo",
      level: 3,
      description:
        "En 3.er nivel eliges un Colegio de Bardo que define tu enfoque artístico y mágico. Por ejemplo, el Colegio del Saber.",
      grantsSubclass: true
    },

    expertise: {
      key: "expertise",
      name: "Pericia",
      level: 3,
      description:
        "Elige dos competencias en habilidades que poseas. Tu bonificador por competencia se duplica en cualquier prueba que use esas habilidades. En 10.º nivel eliges dos habilidades adicionales para recibir este beneficio."
    },

    ability_score_improvement: {
      key: "ability_score_improvement",
      name: "Mejora de Característica",
      levels: [4, 8, 12, 16, 19],
      description:
        "En los niveles indicados puedes aumentar una característica en 2 puntos o dos características en 1 punto cada una (hasta un máximo de 20 en cada característica)."
    },

    font_of_inspiration: {
      key: "font_of_inspiration",
      name: "Fuente de Inspiración",
      level: 5,
      description:
        "A partir de 5.º nivel recuperas todos tus usos de Inspiración Bárdica cuando terminas un descanso corto o largo."
    },

    countercharm: {
      key: "countercharm",
      name: "Contracanto",
      level: 6,
      description:
        "En 6.º nivel puedes usar tu acción para producir un efecto musical o verbal que protege contra el miedo y el encantamiento. Durante un asalto, tú y las criaturas amistosas a 30 pies tenéis ventaja en tiradas de salvación contra ser asustado o hechizado."
    },

    magical_secrets: {
      key: "magical_secrets",
      name: "Secretos Mágicos",
      level: 10,
      description:
        "Has robado secretos arcanos de otras tradiciones. Eliges conjuros adicionales de cualquier lista de conjuros. Cuentan como conjuros de bardo para ti.",
      rules: {
        picks: [
          { level: 10, spells: 2 },
          { level: 14, spells: 2 },
          { level: 18, spells: 2 }
        ]
      }
    },

    superior_inspiration: {
      key: "superior_inspiration",
      name: "Inspiración Superior",
      level: 20,
      description:
        "En 20.º nivel, cuando tiras iniciativa y no te queda ningún uso de Inspiración Bárdica, recuperas automáticamente un uso."
    }
  },

  // Subclase ejemplo: Colegio del Saber (College of Lore)
  subclasses: [
    {
      key: "lore",
      name: "Colegio del Saber",
      description:
        "Los bardos del Colegio del Saber coleccionan conocimientos de todas partes y los usan para exponer la verdad, ridiculizar la corrupción y manipular a quienes ostentan el poder.",
      features: [
        {
          key: "bonus_proficiencies_lore",
          name: "Competencias adicionales",
          level: 3,
          description:
            "Ganas competencia en tres habilidades adicionales a tu elección."
        },
        {
          key: "cutting_words",
          name: "Palabras Cortantes",
          level: 3,
          description:
            "Puedes gastar un uso de Inspiración Bárdica como reacción para restar el resultado del dado a la tirada de ataque, prueba de característica o tirada de daño de una criatura que puedas ver y oír a 60 pies.",
          mechanics: {
            usesBardicInspiration: true
          }
        },
        {
          key: "additional_magical_secrets",
          name: "Secretos Mágicos adicionales",
          level: 6,
          description:
            "Aprendes dos conjuros adicionales de cualquier lista de conjuros. No cuentan contra el número normal de conjuros de bardo que conoces."
        },
        {
          key: "peerless_skill",
          name: "Habilidad sin igual",
          level: 14,
          description:
            "Cuando haces una prueba de característica, puedes gastar un uso de Inspiración Bárdica para añadir el resultado del dado a la tirada, incluso después de ver el resultado pero antes de saber si tiene éxito."
        }
      ]
    }
  ]
};
