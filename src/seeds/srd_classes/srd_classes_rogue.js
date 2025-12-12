// src/srd/classes/rogue.js

export const SRD_ROGUE = {
  key: "rogue",
  name: "Pícaro",
  source: "SRD 5.1",

  // Atributos clave y TS
  primaryAbility: ["dex"],
  savingThrows: ["dex", "int"],

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
    armor: ["light"],
    weapons: [
      "simple",
      "hand_crossbow",
      "longsword",
      "rapier",
      "shortsword"
    ],
    tools: ["thieves_tools"],
    skills: {
      choose: 4,
      from: [
        "Acrobatics",
        "Athletics",
        "Deception",
        "Insight",
        "Intimidation",
        "Investigation",
        "Perception",
        "Performance",
        "Persuasion",
        "Sleight of Hand",
        "Stealth"
      ]
    }
  },

  // Reglas de multiclase
  multiclass: {
    // Requisitos para ENTRAR a Pícaro
    prerequisites: {
      // PHB: Destreza 13
      allOf: [{ dex: 13 }]
    },
    // Lo que ganas al multiclasear EN Pícaro
    proficienciesGained: {
      armor: ["light"],
      weapons: [],
      tools: ["thieves_tools"],
      skills: {
        choose: 1,
        from: [
          "Acrobatics",
          "Athletics",
          "Deception",
          "Insight",
          "Intimidation",
          "Investigation",
          "Perception",
          "Performance",
          "Persuasion",
          "Sleight of Hand",
          "Stealth"
        ]
      }
    }
  },

  // Equipo inicial
  startingEquipment: {
    default: [
      {
        chooseOne: [
          { items: [{ item: "rapier" }] },
          { items: [{ item: "shortsword" }] }
        ]
      },
      {
        chooseOne: [
          {
            items: [
              { item: "shortbow" },
              { item: "arrow", quantity: 20 }
            ]
          },
          { items: [{ item: "shortsword" }] }
        ]
      },
      {
        chooseOne: [
          { pack: "burglars_pack" },
          { pack: "dungeoneers_pack" },
          { pack: "explorers_pack" }
        ]
      },
      {
        items: [
          { item: "leather_armor" },
          { item: "dagger", quantity: 2 },
          { item: "thieves_tools" }
        ]
      }
    ]
  },

  // No tiene sistema general de conjuros (subclases lo manejarán aparte)
  spellcasting: null,

  // Tabla de niveles
  levels: [
    {
      level: 1,
      proficiencyBonus: 2,
      sneakAttackDice: "1d6",
      features: ["expertise_1", "sneak_attack", "thieves_cant"]
    },
    {
      level: 2,
      proficiencyBonus: 2,
      sneakAttackDice: "1d6",
      features: ["cunning_action"]
    },
    {
      level: 3,
      proficiencyBonus: 2,
      sneakAttackDice: "2d6",
      features: ["roguish_archetype"]
    },
    {
      level: 4,
      proficiencyBonus: 2,
      sneakAttackDice: "2d6",
      features: ["ability_score_improvement"]
    },
    {
      level: 5,
      proficiencyBonus: 3,
      sneakAttackDice: "3d6",
      features: ["uncanny_dodge"]
    },
    {
      level: 6,
      proficiencyBonus: 3,
      sneakAttackDice: "3d6",
      features: ["expertise_2"]
    },
    {
      level: 7,
      proficiencyBonus: 3,
      sneakAttackDice: "4d6",
      features: ["evasion"]
    },
    {
      level: 8,
      proficiencyBonus: 3,
      sneakAttackDice: "4d6",
      features: ["ability_score_improvement"]
    },
    {
      level: 9,
      proficiencyBonus: 4,
      sneakAttackDice: "5d6",
      features: ["roguish_archetype_feature_9"]
    },
    {
      level: 10,
      proficiencyBonus: 4,
      sneakAttackDice: "5d6",
      features: ["ability_score_improvement"]
    },
    {
      level: 11,
      proficiencyBonus: 4,
      sneakAttackDice: "6d6",
      features: ["reliable_talent"]
    },
    {
      level: 12,
      proficiencyBonus: 4,
      sneakAttackDice: "6d6",
      features: ["ability_score_improvement"]
    },
    {
      level: 13,
      proficiencyBonus: 5,
      sneakAttackDice: "7d6",
      features: ["roguish_archetype_feature_13"]
    },
    {
      level: 14,
      proficiencyBonus: 5,
      sneakAttackDice: "7d6",
      features: ["blindsense"]
    },
    {
      level: 15,
      proficiencyBonus: 5,
      sneakAttackDice: "8d6",
      features: ["slippery_mind"]
    },
    {
      level: 16,
      proficiencyBonus: 5,
      sneakAttackDice: "8d6",
      features: ["ability_score_improvement"]
    },
    {
      level: 17,
      proficiencyBonus: 6,
      sneakAttackDice: "9d6",
      features: ["roguish_archetype_feature_17"]
    },
    {
      level: 18,
      proficiencyBonus: 6,
      sneakAttackDice: "9d6",
      features: ["elusive"]
    },
    {
      level: 19,
      proficiencyBonus: 6,
      sneakAttackDice: "10d6",
      features: ["ability_score_improvement"]
    },
    {
      level: 20,
      proficiencyBonus: 6,
      sneakAttackDice: "10d6",
      features: ["stroke_of_luck"]
    }
  ],

  // Rasgos de clase
  features: {
    expertise_1: {
      key: "expertise_1",
      name: "Pericia (1)",
      level: 1,
      description:
        "En 1.er nivel eliges dos de tus competencias en habilidades, o una habilidad y tus herramientas de ladrón. Tu bonificador de competencia se duplica en cualquier prueba de característica que use cualquiera de las competencias elegidas."
    },

    expertise_2: {
      key: "expertise_2",
      name: "Pericia (2)",
      level: 6,
      description:
        "En 6.º nivel eliges dos competencias adicionales (habilidades o herramientas de ladrón). Tu bonificador de competencia se duplica para las pruebas que las usen."
    },

    sneak_attack: {
      key: "sneak_attack",
      name: "Ataque furtivo",
      level: 1,
      description:
        "Desde 1.er nivel sabes cómo aprovechar una distracción para golpear donde más duele. Una vez por turno, puedes infligir daño extra a una criatura que golpees con un ataque si tienes ventaja en la tirada de ataque. El ataque debe usar un arma a distancia o un arma con la propiedad sutil. No necesitas ventaja si otro enemigo de tu objetivo está a 5 pies de él, ese enemigo no está incapacitado y tú no tienes desventaja en la tirada. El daño extra aumenta con tus niveles de pícaro, tal como muestra la columna Ataque furtivo en la tabla de Pícaro."
    },

    thieves_cant: {
      key: "thieves_cant",
      name: "Jerga de ladrón",
      level: 1,
      description:
        "Durante tu entrenamiento aprendiste la jerga de los ladrones, una mezcla secreta de dialectos, códigos y argot que te permite ocultar mensajes en una conversación aparentemente normal. Solo otra criatura que conozca la jerga puede entender esos mensajes, y comunicar una idea lleva unas cuatro veces más tiempo que decirla de forma directa. Además, reconoces símbolos y señales usados para indicar mensajes breves, como si un lugar es territorio de un gremio, peligroso, un escondite seguro o zona con botín cercano."
    },

    cunning_action: {
      key: "cunning_action",
      name: "Acción astuta",
      level: 2,
      description:
        "Desde 2.º nivel, tu rapidez mental y agilidad te permiten moverte con presteza. En cada uno de tus turnos en combate puedes usar una acción adicional para realizar Correr (Dash), Retirarse (Disengage) u Ocultarse (Hide)."
    },

    roguish_archetype: {
      key: "roguish_archetype",
      name: "Arquetipo pícaro",
      level: 3,
      description:
        "En 3.er nivel eliges un arquetipo que refleje tu estilo de pícaro, como el Ladrón. Tu elección te concede rasgos adicionales en los niveles 3, 9, 13 y 17.",
      grantsSubclass: true
    },

    ability_score_improvement: {
      key: "ability_score_improvement",
      name: "Mejora de característica",
      levels: [4, 8, 10, 12, 16, 19],
      description:
        "En los niveles indicados puedes aumentar una característica en 2 puntos o dos características en 1 punto (máximo 20)."
    },

    uncanny_dodge: {
      key: "uncanny_dodge",
      name: "Esquiva asombrosa",
      level: 5,
      description:
        "Desde 5.º nivel, cuando una criatura que puedes ver te golpea con un ataque, puedes usar tu reacción para reducir a la mitad el daño que recibes."
    },

    evasion: {
      key: "evasion",
      name: "Evasión",
      level: 7,
      description:
        "A partir de 7.º nivel puedes esquivar con agilidad ciertos efectos de área, como el aliento de fuego de un dragón o un *ice storm*. Cuando un efecto te permita hacer una tirada de salvación de Destreza para recibir solo la mitad de daño, no recibes daño si superas la tirada y solo la mitad si la fallas."
    },

    reliable_talent: {
      key: "reliable_talent",
      name: "Talento fiable",
      level: 11,
      description:
        "En 11.º nivel has perfeccionado tanto tus talentos que rara vez fallas. Siempre que hagas una prueba de característica en la que añadas tu bonificador de competencia, puedes tratar cualquier tirada de d20 de 9 o menos como si fuera un 10."
    },

    blindsense: {
      key: "blindsense",
      name: "Sentido ciego",
      level: 14,
      description:
        "Desde 14.º nivel, mientras puedas oír, eres consciente de la localización de cualquier criatura oculta o invisible a 10 pies de ti."
    },

    slippery_mind: {
      key: "slippery_mind",
      name: "Mente escurridiza",
      level: 15,
      description:
        "En 15.º nivel adquieres mayor fortaleza mental. Ganas competencia en tiradas de salvación de Sabiduría."
    },

    elusive: {
      key: "elusive",
      name: "Elusivo",
      level: 18,
      description:
        "A partir de 18.º nivel eres tan escurridizo que tus enemigos apenas pueden aprovechar una apertura. Ningún ataque contra ti tiene ventaja mientras no estés incapacitado."
    },

    stroke_of_luck: {
      key: "stroke_of_luck",
      name: "Golpe de suerte",
      level: 20,
      description:
        "En 20.º nivel, tu intuición te salva en el momento justo. Si fallas un ataque contra un objetivo dentro de alcance, puedes convertir ese fallo en un impacto. Alternativamente, si fallas una prueba de característica, puedes tratar la tirada de d20 como si fuera un 20. Una vez uses este rasgo, no puedes volver a usarlo hasta terminar un descanso corto o largo."
    },

    roguish_archetype_feature_9: {
      key: "roguish_archetype_feature_9",
      name: "Rasgo de arquetipo pícaro (9)",
      level: 9,
      description:
        "Obtienes el rasgo de tu arquetipo pícaro correspondiente a 9.º nivel."
    },

    roguish_archetype_feature_13: {
      key: "roguish_archetype_feature_13",
      name: "Rasgo de arquetipo pícaro (13)",
      level: 13,
      description:
        "Obtienes el rasgo de tu arquetipo pícaro correspondiente a 13.º nivel."
    },

    roguish_archetype_feature_17: {
      key: "roguish_archetype_feature_17",
      name: "Rasgo de arquetipo pícaro (17)",
      level: 17,
      description:
        "Obtienes el rasgo de tu arquetipo pícaro correspondiente a 17.º nivel."
    }
  },

  // Subclase: Ladrón (Thief)
  subclasses: [
    {
      key: "thief",
      name: "Ladrón",
      description:
        "Como Ladrón perfeccionas las artes del hurto, el sigilo y la exploración de lugares peligrosos. Ladrones, bandidos y saqueadores siguen este arquetipo, pero también buscadores de tesoros profesionales y exploradores de ruinas.",

      features: [
        {
          key: "fast_hands",
          name: "Manos rápidas",
          level: 3,
          description:
            "Desde 3.er nivel puedes usar la acción adicional que te concede Acción astuta para hacer una prueba de Destreza (Juego de manos), usar tus herramientas de ladrón para desarmar una trampa o abrir una cerradura, o realizar la acción de Usar un objeto."
        },
        {
          key: "second_story_work",
          name: "Trabajo de segunda planta",
          level: 3,
          description:
            "También en 3.er nivel escalas más rápido de lo normal: trepar ya no te cuesta movimiento adicional. Además, cuando haces un salto con carrera, la distancia que recorres aumenta en pies igual a tu modificador de Destreza."
        },
        {
          key: "supreme_sneak",
          name: "Sigilo supremo",
          level: 9,
          description:
            "A partir de 9.º nivel tienes ventaja en las pruebas de Destreza (Sigilo) siempre que te muevas a la mitad de tu velocidad o menos en ese mismo turno."
        },
        {
          key: "use_magic_device",
          name: "Uso de objetos mágicos",
          level: 13,
          description:
            "En 13.º nivel has aprendido lo suficiente sobre magia como para improvisar con objetos que no estaban pensados para ti. Ignoras todos los requisitos de clase, raza y nivel para usar objetos mágicos."
        },
        {
          key: "thiefs_reflexes",
          name: "Reflejos de ladrón",
          level: 17,
          description:
            "En 17.º nivel te vuelves experto en tender emboscadas y escapar del peligro. Durante la primera ronda de cualquier combate puedes actuar dos veces. Tomas tu primer turno con tu iniciativa normal y tu segundo turno con tu iniciativa menos 10. No puedes usar este rasgo si estás sorprendido."
        }
      ]
    }
  ]
};
