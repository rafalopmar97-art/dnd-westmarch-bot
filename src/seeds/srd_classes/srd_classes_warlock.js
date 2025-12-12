// classes/warlock.js
// Brujo (Warlock) — SRD 5.1

const warlock = {
  key: "warlock",
  name: "Brujo",
  source: "SRD 5.1",

  // Datos básicos
  hitDice: "1d8",
  primaryAbility: ["cha"],
  savingThrows: ["wis", "cha"],

  proficiencies: {
    armor: ["light"],
    weapons: ["simple"],
    tools: [],
    skills: {
      choose: 2,
      from: [
        "Arcana",
        "Deception",
        "History",
        "Intimidation",
        "Investigation",
        "Nature",
        "Religion"
      ]
    }
  },

  // Multiclase
  multiclass: {
    requirements: {
      // Carisma 13
      cha: 13
    },
    proficienciesGained: {
      armor: ["light"],
      weapons: ["simple"],
      tools: [],
      skills: []
    }
  },

  // Magia de Pacto (Pact Magic)
  spellcasting: {
    type: "pact",
    spellcastingAbility: "cha",
    pactMagic: true,

    // Trucos conocidos por nivel
    cantripsKnownByLevel: {
      1: 2,
      2: 2,
      3: 2,
      4: 3,
      5: 3,
      6: 3,
      7: 3,
      8: 3,
      9: 3,
      10: 4,
      11: 4,
      12: 4,
      13: 4,
      14: 4,
      15: 4,
      16: 4,
      17: 4,
      18: 4,
      19: 4,
      20: 4
    },

    // Conjuros conocidos por nivel
    spellsKnownByLevel: {
      1: 2,
      2: 3,
      3: 4,
      4: 5,
      5: 6,
      6: 7,
      7: 8,
      8: 9,
      9: 10,
      10: 10,
      11: 11,
      12: 11,
      13: 12,
      14: 12,
      15: 13,
      16: 13,
      17: 14,
      18: 14,
      19: 15,
      20: 15
    },

    // Ranuras totales por nivel de brujo (todas del mismo nivel)
    slotsByLevel: {
      1: 1,
      2: 2,
      3: 2,
      4: 2,
      5: 2,
      6: 2,
      7: 2,
      8: 2,
      9: 2,
      10: 2,
      11: 3,
      12: 3,
      13: 3,
      14: 3,
      15: 3,
      16: 3,
      17: 4,
      18: 4,
      19: 4,
      20: 4
    },

    // Nivel de las ranuras de pacto por nivel de brujo
    slotLevelByLevel: {
      1: 1,
      2: 1,
      3: 2,
      4: 2,
      5: 3,
      6: 3,
      7: 4,
      8: 4,
      9: 5,
      10: 5,
      11: 5,
      12: 5,
      13: 5,
      14: 5,
      15: 5,
      16: 5,
      17: 5,
      18: 5,
      19: 5,
      20: 5
    },

    // Invocaciones conocidas por nivel
    invocationsKnownByLevel: {
      1: 0,
      2: 2,
      3: 2,
      4: 2,
      5: 3,
      6: 3,
      7: 4,
      8: 4,
      9: 5,
      10: 5,
      11: 5,
      12: 6,
      13: 6,
      14: 6,
      15: 7,
      16: 7,
      17: 7,
      18: 8,
      19: 8,
      20: 8
    },

    // Arcanum Místico: nivel de conjuro por nivel de clase
    mysticArcanumByLevel: {
      11: 6,
      13: 7,
      15: 8,
      17: 9
    }
  },

  // Equipo inicial (descriptivo)
  startingEquipment: {
    default: [
      "• (a) una ballesta ligera y 20 virotes o (b) cualquier arma sencilla",
      "• (a) un saco de componentes o (b) un foco arcano",
      "• (a) un pack de erudito o (b) un pack de mazmorrero",
      "• Armadura de cuero, un arma sencilla y dos dagas"
    ]
  },

  // Resumen por nivel (solo características clave; los números de magia están en spellcasting)
  levels: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: ["Patrón de Otro Mundo", "Magia de Pacto"],
      cantripsKnown: 2,
      spellsKnown: 2,
      spellSlots: 1,
      slotLevel: 1,
      invocationsKnown: 0
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: ["Invocaciones Místicas"],
      cantripsKnown: 2,
      spellsKnown: 3,
      spellSlots: 2,
      slotLevel: 1,
      invocationsKnown: 2
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: ["Don de Pacto"],
      cantripsKnown: 2,
      spellsKnown: 4,
      spellSlots: 2,
      slotLevel: 2,
      invocationsKnown: 2
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: ["Mejora de característica"],
      cantripsKnown: 3,
      spellsKnown: 5,
      spellSlots: 2,
      slotLevel: 2,
      invocationsKnown: 2
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: [],
      cantripsKnown: 3,
      spellsKnown: 6,
      spellSlots: 2,
      slotLevel: 3,
      invocationsKnown: 3
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: ["Rasgo de Patrón de Otro Mundo"],
      cantripsKnown: 3,
      spellsKnown: 7,
      spellSlots: 2,
      slotLevel: 3,
      invocationsKnown: 3
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: [],
      cantripsKnown: 3,
      spellsKnown: 8,
      spellSlots: 2,
      slotLevel: 4,
      invocationsKnown: 4
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: ["Mejora de característica"],
      cantripsKnown: 3,
      spellsKnown: 9,
      spellSlots: 2,
      slotLevel: 4,
      invocationsKnown: 4
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [],
      cantripsKnown: 3,
      spellsKnown: 10,
      spellSlots: 2,
      slotLevel: 5,
      invocationsKnown: 5
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: ["Rasgo de Patrón de Otro Mundo"],
      cantripsKnown: 4,
      spellsKnown: 10,
      spellSlots: 2,
      slotLevel: 5,
      invocationsKnown: 5
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: ["Arcanum Místico (conjuro de 6º nivel)"],
      cantripsKnown: 4,
      spellsKnown: 11,
      spellSlots: 3,
      slotLevel: 5,
      invocationsKnown: 5
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: ["Mejora de característica"],
      cantripsKnown: 4,
      spellsKnown: 11,
      spellSlots: 3,
      slotLevel: 5,
      invocationsKnown: 6
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: ["Arcanum Místico (conjuro de 7º nivel)"],
      cantripsKnown: 4,
      spellsKnown: 12,
      spellSlots: 3,
      slotLevel: 5,
      invocationsKnown: 6
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: ["Rasgo de Patrón de Otro Mundo"],
      cantripsKnown: 4,
      spellsKnown: 12,
      spellSlots: 3,
      slotLevel: 5,
      invocationsKnown: 6
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: ["Arcanum Místico (conjuro de 8º nivel)"],
      cantripsKnown: 4,
      spellsKnown: 13,
      spellSlots: 3,
      slotLevel: 5,
      invocationsKnown: 7
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: ["Mejora de característica"],
      cantripsKnown: 4,
      spellsKnown: 13,
      spellSlots: 3,
      slotLevel: 5,
      invocationsKnown: 7
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: ["Arcanum Místico (conjuro de 9º nivel)"],
      cantripsKnown: 4,
      spellsKnown: 14,
      spellSlots: 4,
      slotLevel: 5,
      invocationsKnown: 7
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: [],
      cantripsKnown: 4,
      spellsKnown: 14,
      spellSlots: 4,
      slotLevel: 5,
      invocationsKnown: 8
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: ["Mejora de característica"],
      cantripsKnown: 4,
      spellsKnown: 15,
      spellSlots: 4,
      slotLevel: 5,
      invocationsKnown: 8
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: ["Maestro Sobrenatural"],
      cantripsKnown: 4,
      spellsKnown: 15,
      spellSlots: 4,
      slotLevel: 5,
      invocationsKnown: 8
    }
  ],

  // Rasgos de clase (texto para hoja y referencia)
  features: [
    {
      level: 1,
      name: "Patrón de Otro Mundo",
      description:
        "Has sellado un pacto con un ser de otro plano (como un archifata, un demonio o una entidad primordial). Tu elección de patrón " +
        "te concede conjuros adicionales y rasgos especiales en los niveles 1, 6, 10 y 14."
    },
    {
      level: 1,
      name: "Magia de Pacto",
      description:
        "Tu magia proviene del poder concedido por tu patrón. Conoces trucos y conjuros de la lista de brujo. Todas tus ranuras de conjuro " +
        "son del mismo nivel (según tu nivel de brujo) y se recuperan al finalizar un descanso corto o largo."
    },
    {
      level: 2,
      name: "Invocaciones Místicas",
      description:
        "Estudiaste saberes prohibidos que te otorgan habilidades permanentes llamadas invocaciones místicas. Ganas dos a nivel 2 " +
        "y más según subes de nivel, pudiendo reemplazar una que conozcas cuando ganes un nivel de brujo."
    },
    {
      level: 3,
      name: "Don de Pacto",
      description:
        "Tu patrón te otorga un regalo especial: Pacto de la Cadena, del Tomo o de la Hoja. Este don define si tienes un familiar mejorado, " +
        "un arma de pacto o un Libro de las Sombras cargado de magia extra."
    },
    {
      level: 4,
      name: "Mejora de característica",
      description:
        "En los niveles 4, 8, 12, 16 y 19 puedes aumentar una característica en 2 puntos, o dos características en 1. No puedes superar 20 " +
        "en ninguna característica mediante este rasgo."
    },
    {
      level: 11,
      name: "Arcanum Místico",
      description:
        "A partir del nivel 11, tu patrón te concede conjuros de alto nivel que lanzas sin gastar ranuras, una vez por descanso largo: " +
        "uno de 6º nivel (11), uno de 7º (13), uno de 8º (15) y uno de 9º (17)."
    },
    {
      level: 20,
      name: "Maestro Sobrenatural",
      description:
        "En nivel 20, puedes dedicar 1 minuto a implorar la ayuda de tu patrón para recuperar todas tus ranuras de Magia de Pacto gastadas. " +
        "Tras usar este rasgo, debes terminar un descanso largo antes de volver a usarlo."
    }
  ],

  // Invocaciones místicas (resumen mecánico)
  invocations: [
    {
      key: "agonizing_blast",
      name: "Explosión Agónica",
      prerequisites: ["truco eldritch blast"],
      description:
        "Cuando lanzas eldritch blast, añade tu modificador de Carisma al daño que inflige cada rayo al impactar."
    },
    {
      key: "armor_of_shadows",
      name: "Armadura de Sombras",
      prerequisites: [],
      description:
        "Puedes lanzarte armadura de mago sobre ti mismo a voluntad, sin gastar ranura de conjuro ni componentes materiales."
    },
    {
      key: "ascendant_step",
      name: "Paso Ascendente",
      prerequisites: ["nivel 9"],
      description:
        "Puedes lanzarte levitar a voluntad sobre ti mismo, sin gastar ranura de conjuro ni componentes materiales."
    },
    {
      key: "beast_speech",
      name: "Habla Bestial",
      prerequisites: [],
      description:
        "Puedes lanzar hablar con los animales a voluntad sin gastar ranura de conjuro."
    },
    {
      key: "beguiling_influence",
      name: "Influencia Seductora",
      prerequisites: [],
      description:
        "Ganas competencia en las habilidades Engaño (Deception) y Persuasión (Persuasion)."
    },
    {
      key: "bewitching_whispers",
      name: "Susurros Hechizantes",
      prerequisites: ["nivel 7"],
      description:
        "Puedes lanzar compulsión una vez usando una ranura de brujo. Recuperas la capacidad de hacerlo al terminar un descanso largo."
    },
    {
      key: "book_of_ancient_secrets",
      name: "Libro de Secretos Antiguos",
      prerequisites: ["Pacto del Tomo"],
      description:
        "Tu Libro de las Sombras puede albergar conjuros de ritual de otras listas. Eliges dos conjuros de ritual de 1º nivel de cualquier lista; " +
        "aparecen escritos en el libro y puedes lanzarlos solo como rituales mientras tengas el libro. Puedes ir añadiendo más rituales que encuentres " +
        "cuya mitad de nivel de brujo supere o iguale el nivel del conjuro, pagando tiempo e ingredientes."
    },
    {
      key: "chains_of_carceri",
      name: "Cadenas de Carceri",
      prerequisites: ["nivel 15", "Pacto de la Cadena"],
      description:
        "Puedes lanzar sujetar monstruo a voluntad sin gastar ranura ni componentes, pero solo contra celestiales, infernales o elementales. " +
        "No puedes usar esta invocación sobre la misma criatura de nuevo hasta terminar un descanso largo."
    },
    {
      key: "devils_sight",
      name: "Vista del Diablo",
      prerequisites: [],
      description:
        "Ves normalmente en la oscuridad, tanto mágica como no mágica, hasta una distancia de 120 pies."
    },
    {
      key: "dreadful_word",
      name: "Palabra Pavorosa",
      prerequisites: ["nivel 7"],
      description:
        "Puedes lanzar confusión una vez usando una ranura de brujo. Recuperas el uso al terminar un descanso largo."
    },
    {
      key: "eldritch_sight",
      name: "Vista Sobrenatural",
      prerequisites: [],
      description:
        "Puedes lanzar detectar magia a voluntad sin gastar ranura de conjuro."
    },
    {
      key: "eldritch_spear",
      name: "Lanza Sobrenatural",
      prerequisites: ["truco eldritch blast"],
      description:
        "El alcance de tu eldritch blast aumenta a 300 pies."
    },
    {
      key: "eyes_of_the_rune_keeper",
      name: "Ojos del Guardián de Runas",
      prerequisites: [],
      description:
        "Puedes leer cualquier forma de escritura."
    },
    {
      key: "fiendish_vigor",
      name: "Vigor Infernal",
      prerequisites: [],
      description:
        "Puedes lanzarte vida falsa sobre ti mismo a voluntad como conjuro de 1er nivel, sin gastar ranura ni componentes materiales."
    },
    {
      key: "gaze_of_two_minds",
      name: "Mirada de Dos Mentes",
      prerequisites: [],
      description:
        "Como acción, tocas a un humanoide dispuesto y percibes a través de sus sentidos hasta el final de tu siguiente turno. " +
        "Puedes prolongar este efecto en turnos posteriores usando tu acción, mientras ambos estéis en el mismo plano; mientras tanto, " +
        "estás ciego y sordo a tu entorno."
    },
    {
      key: "lifedrinker",
      name: "Bebedor de Vida",
      prerequisites: ["nivel 12", "Pacto de la Hoja"],
      description:
        "Cuando golpeas a una criatura con tu arma de pacto, infliges daño necrótico adicional igual a tu modificador de Carisma (mínimo 1)."
    },
    {
      key: "mask_of_many_faces",
      name: "Máscara de Muchos Rostros",
      prerequisites: [],
      description:
        "Puedes lanzar disfrazarse a voluntad sin gastar ranura de conjuro."
    },
    {
      key: "master_of_myriad_forms",
      name: "Maestro de Formas Innumerables",
      prerequisites: ["nivel 15"],
      description:
        "Puedes lanzarte alterar ser a voluntad sin gastar ranura de conjuro."
    },
    {
      key: "minions_of_chaos",
      name: "Esbirros del Caos",
      prerequisites: ["nivel 9"],
      description:
        "Puedes lanzar invocar elemental una vez usando una ranura de brujo. Recuperas el uso al terminar un descanso largo."
    },
    {
      key: "mire_the_mind",
      name: "Enturbiar la Mente",
      prerequisites: ["nivel 5"],
      description:
        "Puedes lanzar lentitud una vez usando una ranura de brujo. Recuperas el uso al terminar un descanso largo."
    },
    {
      key: "misty_visions",
      name: "Visiones Brumosas",
      prerequisites: [],
      description:
        "Puedes lanzar imagen silenciosa a voluntad sin gastar ranura de conjuro ni componentes materiales."
    },
    {
      key: "one_with_shadows",
      name: "Uno con las Sombras",
      prerequisites: ["nivel 5"],
      description:
        "Mientras estés en luz tenue u oscuridad, puedes usar tu acción para volverte invisible hasta que te muevas o realices una acción o reacción."
    },
    {
      key: "otherworldly_leap",
      name: "Salto de Otro Mundo",
      prerequisites: ["nivel 9"],
      description:
        "Puedes lanzarte salto a voluntad sin gastar ranura de conjuro ni componentes materiales."
    },
    {
      key: "repelling_blast",
      name: "Explosión Repulsiva",
      prerequisites: ["truco eldritch blast"],
      description:
        "Cuando impactas a una criatura con un rayo de eldritch blast, puedes empujarla hasta 10 pies en línea recta lejos de ti."
    },
    {
      key: "sculptor_of_flesh",
      name: "Escultor de Carne",
      prerequisites: ["nivel 7"],
      description:
        "Puedes lanzar polimorfar una vez usando una ranura de brujo. Recuperas el uso al terminar un descanso largo."
    },
    {
      key: "sign_of_ill_omen",
      name: "Signo de Mal Agüero",
      prerequisites: ["nivel 5"],
      description:
        "Puedes lanzar maldición una vez usando una ranura de brujo. Recuperas el uso al terminar un descanso largo."
    },
    {
      key: "thief_of_five_fates",
      name: "Ladrón de Cinco Destinos",
      prerequisites: [],
      description:
        "Puedes lanzar anatema (bane) una vez usando una ranura de brujo. Recuperas el uso al terminar un descanso largo."
    },
    {
      key: "thirsting_blade",
      name: "Hoja Sedienta",
      prerequisites: ["nivel 5", "Pacto de la Hoja"],
      description:
        "Cuando realizas la acción de Ataque con tu arma de pacto, puedes atacar dos veces en lugar de una."
    },
    {
      key: "visions_of_distant_realms",
      name: "Visiones de Reinos Distantes",
      prerequisites: ["nivel 15"],
      description:
        "Puedes lanzar ojo arcano a voluntad sin gastar ranura de conjuro."
    },
    {
      key: "voice_of_the_chain_master",
      name: "Voz del Amo de la Cadena",
      prerequisites: ["Pacto de la Cadena"],
      description:
        "Puedes comunicarte telepáticamente con tu familiar y percibir a través de sus sentidos mientras estéis en el mismo plano. " +
        "Mientras lo haces, puedes hablar con tu propia voz a través de él."
    },
    {
      key: "whispers_of_the_grave",
      name: "Susurros de la Tumba",
      prerequisites: ["nivel 9"],
      description:
        "Puedes lanzar hablar con los muertos a voluntad sin gastar ranura de conjuro."
    },
    {
      key: "witch_sight",
      name: "Vista de Bruja",
      prerequisites: ["nivel 15"],
      description:
        "Puedes ver la verdadera forma de cambiaformas y criaturas ocultas por ilusiones o transmutación mientras estén a 30 pies y en tu línea de visión."
    }
  ],

  // Subclases (Patrones de Otro Mundo) — aquí: El Infernal (The Fiend)
  subclasses: [
    {
      key: "fiend",
      name: "El Infernal",
      type: "otherworldly_patron",
      source: "SRD 5.1",
      description:
        "Has hecho un pacto con un demonio, archidiablo u otra entidad maligna de los planos inferiores. " +
        "Sus objetivos son corruptos y destructivos, aunque tú puedas o no compartirlos. A cambio de tu servicio, te otorga poder infernal.",

      expandedSpellList: [
        { level: 1, spells: ["burning hands", "command"] },
        { level: 2, spells: ["blindness/deafness", "scorching ray"] },
        { level: 3, spells: ["fireball", "stinking cloud"] },
        { level: 4, spells: ["fire shield", "wall of fire"] },
        { level: 5, spells: ["flame strike", "hallow"] }
      ],

      features: [
        {
          level: 1,
          name: "Bendición del Oscuro",
          description:
            "Cuando reduces a 0 puntos de golpe a una criatura hostil, ganas puntos de golpe temporales iguales a tu modificador de Carisma + tu nivel de brujo (mínimo 1)."
        },
        {
          level: 6,
          name: "Suerte del Oscuro",
          description:
            "Cuando hagas una tirada de salvación o una prueba de característica, puedes añadir 1d10 a la tirada tras ver el resultado pero antes de saber si tiene éxito. " +
            "Una vez usado, no puedes volver a usar este rasgo hasta terminar un descanso corto o largo."
        },
        {
          level: 10,
          name: "Resiliencia Infernal",
          description:
            "Al finalizar un descanso corto o largo, eliges un tipo de daño (excepto psíquico normalmente). Obtienes resistencia a ese tipo de daño hasta que uses de nuevo este rasgo para elegir otro. " +
            "El daño de armas mágicas o plateadas ignora esta resistencia."
        },
        {
          level: 14,
          name: "Arrojado a los Infiernos",
          description:
            "Cuando golpeas a una criatura con un ataque, puedes enviarla brevemente a los planos inferiores. La criatura desaparece y atraviesa un paisaje infernal. " +
            "Al final de tu siguiente turno, reaparece en su espacio anterior (o el más cercano libre). Si no es un infernal, recibe 10d10 puntos de daño psíquico. " +
            "Tras usar este rasgo, debes terminar un descanso largo antes de volver a usarlo."
        }
      ]
    }
  ]
};

export default warlock;
