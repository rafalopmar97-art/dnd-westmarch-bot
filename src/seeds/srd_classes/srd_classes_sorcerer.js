// classes/sorcerer.js
// Hechicero (Sorcerer) — SRD 5.1

const sorcerer = {
  key: "sorcerer",
  name: "Hechicero",
  source: "SRD 5.1",

  // Datos básicos
  hitDice: "1d6",
  primaryAbility: ["cha"],
  savingThrows: ["con", "cha"],

  proficiencies: {
    armor: [],
    weapons: ["dagger", "dart", "sling", "quarterstaff", "light_crossbow"],
    tools: [],
    skills: {
      choose: 2,
      from: [
        "Arcana",
        "Deception",
        "Insight",
        "Intimidation",
        "Persuasion",
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
      armor: [],
      weapons: ["dagger", "dart", "sling", "quarterstaff", "light_crossbow"],
      tools: [],
      skills: []
    }
  },

  // Lanzamiento de conjuros (hechicero de conjuración espontánea)
  spellcasting: {
    progression: "full", // lanzador completo
    spellcastingAbility: "cha",

    // Cantrips conocidos por nivel
    cantripsKnownByLevel: {
      1: 4,
      2: 4,
      3: 4,
      4: 5,
      5: 5,
      6: 5,
      7: 5,
      8: 5,
      9: 5,
      10: 6,
      11: 6,
      12: 6,
      13: 6,
      14: 6,
      15: 6,
      16: 6,
      17: 6,
      18: 6,
      19: 6,
      20: 6
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
      10: 11,
      11: 12,
      12: 12,
      13: 13,
      14: 13,
      15: 14,
      16: 14,
      17: 15,
      18: 15,
      19: 15,
      20: 15
    },

    // Puntos de hechicería por nivel
    sorceryPointsByLevel: {
      1: 0,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      11: 11,
      12: 12,
      13: 13,
      14: 14,
      15: 15,
      16: 16,
      17: 17,
      18: 18,
      19: 19,
      20: 20
    },

    // Ranuras de conjuro por nivel de clase
    spellSlotsByLevel: {
      1: { 1: 2 },
      2: { 1: 3 },
      3: { 1: 4, 2: 2 },
      4: { 1: 4, 2: 3 },
      5: { 1: 4, 2: 3, 3: 2 },
      6: { 1: 4, 2: 3, 3: 3 },
      7: { 1: 4, 2: 3, 3: 3, 4: 1 },
      8: { 1: 4, 2: 3, 3: 3, 4: 2 },
      9: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
      10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
      11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
      12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
      13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
      14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
      15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
      16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
      17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
      18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
      19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
      20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 }
    }
  },

  // Equipo inicial (texto descriptivo, para usar como referencia)
  startingEquipment: {
    default: [
      "• (a) una ballesta ligera y 20 virotes o (b) cualquier arma sencilla",
      "• (a) un saco de componentes o (b) un foco arcano",
      "• (a) un pack de mazmorrero o (b) un pack de explorador",
      "• Dos dagas"
    ]
  },

  // Tabla de niveles y características clave (resumen)
  levels: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: ["Lanzamiento de conjuros", "Origen Hechiceril"],
      sorceryPoints: 0
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: ["Fuente de Magia"],
      sorceryPoints: 2
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: ["Metamagia"],
      sorceryPoints: 3
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: ["Mejora de característica"],
      sorceryPoints: 4
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: [],
      sorceryPoints: 5
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: ["Rasgo de Origen Hechiceril"],
      sorceryPoints: 6
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: [],
      sorceryPoints: 7
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: ["Mejora de característica"],
      sorceryPoints: 8
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [],
      sorceryPoints: 9
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: ["Metamagia"],
      sorceryPoints: 10
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: [],
      sorceryPoints: 11
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: ["Mejora de característica"],
      sorceryPoints: 12
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [],
      sorceryPoints: 13
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: ["Rasgo de Origen Hechiceril"],
      sorceryPoints: 14
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: [],
      sorceryPoints: 15
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: ["Mejora de característica"],
      sorceryPoints: 16
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: ["Metamagia"],
      sorceryPoints: 17
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: ["Rasgo de Origen Hechiceril"],
      sorceryPoints: 18
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: ["Mejora de característica"],
      sorceryPoints: 19
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: ["Restauración Hechiceril"],
      sorceryPoints: 20
    }
  ],

  // Descripciones de rasgos de clase
  features: [
    {
      level: 1,
      name: "Lanzamiento de conjuros (Hechicero)",
      description:
        "Tu magia proviene de una fuente innata de poder arcano. Conoces un número de trucos y conjuros de la lista de hechicero. Tus ranuras de conjuro siguen la tabla del Hechicero y recuperas todas las ranuras gastadas al terminar un descanso largo. " +
        "Tus conjuros conocidos pueden cambiarse cuando subes de nivel, reemplazando uno de los conjuros que conoces por otro de la lista de hechicero del mismo nivel de ranura."
    },
    {
      level: 1,
      name: "Origen Hechiceril",
      description:
        "En 1er nivel eliges un origen para tu poder innato (por ejemplo, Línea Dracónica). Ese origen te otorga rasgos adicionales en los niveles 1, 6, 14 y 18."
    },
    {
      level: 2,
      name: "Fuente de Magia",
      description:
        "Ganas un pozo interno de energía mágica representado por puntos de hechicería. Puedes gastar estos puntos para crear nuevas ranuras de conjuro como acción adicional, " +
        "o convertir ranuras en puntos de hechicería. Solo puedes crear ranuras de hasta 5º nivel. Recuperas todos los puntos de hechicería gastados al finalizar un descanso largo."
    },
    {
      level: 3,
      name: "Metamagia",
      description:
        "Aprendes a retorcer tus conjuros para adaptarlos a la situación. Aprendes dos opciones de Metamagia, como Conjuro Acelerado, Conjuro Sutil, Conjuro Potenciado, etc. " +
        "Solo puedes aplicar una opción de Metamagia a cada conjuro (salvo que la opción diga lo contrario). Ganas una opción adicional en los niveles 10 y 17."
    },
    {
      level: 4,
      name: "Mejora de característica",
      description:
        "A 4º nivel, y de nuevo en 8º, 12º, 16º y 19º, puedes aumentar una puntuación de característica en 2, o dos características en 1. No puedes superar 20 en una característica con este rasgo."
    },
    {
      level: 20,
      name: "Restauración Hechiceril",
      description:
        "En 20º nivel, recuperas 4 puntos de hechicería gastados cada vez que terminas un descanso corto."
    }
  ],

  // Subclases (Origen hechiceril)
  subclasses: [
    {
      key: "draconic_bloodline",
      name: "Línea Dracónica",
      source: "SRD 5.1",
      type: "sorcerous_origin",
      description:
        "Tu magia innata proviene de la sangre de los dragones que corre por tus venas. Puede ser el resultado de un ancestro dracónico o de un pacto antiguo. " +
        "Con el tiempo, rasgos físicos dracónicos y afinidades elementales se manifiestan en tu cuerpo y tu magia.",

      // Tabla de ascendencia dracónica
      draconicAncestry: [
        { dragon: "Negro", damageType: "ácido" },
        { dragon: "Azul", damageType: "relámpago" },
        { dragon: "Latón", damageType: "fuego" },
        { dragon: "Bronce", damageType: "relámpago" },
        { dragon: "Cobre", damageType: "ácido" },
        { dragon: "Oro", damageType: "fuego" },
        { dragon: "Verde", damageType: "veneno" },
        { dragon: "Rojo", damageType: "fuego" },
        { dragon: "Plata", damageType: "frío" },
        { dragon: "Blanco", damageType: "frío" }
      ],

      features: [
        {
          level: 1,
          name: "Ancestro Dragón",
          description:
            "Eliges un tipo de dragón como tu ancestro (por ejemplo, rojo, oro, plata, etc.). Ese tipo determina el tipo de daño elemental ligado a tu magia. " +
            "Aprendes a hablar, leer y escribir Dragón. Además, cuando haces una tirada de Carisma para tratar con dragones, tu bonificador de competencia se duplica si ya se aplica."
        },
        {
          level: 1,
          name: "Resiliencia Dracónica",
          description:
            "La magia dracónica fortalece tu cuerpo. Tu máximo de puntos de golpe aumenta en 1, y aumenta en 1 adicional cada vez que subes un nivel de hechicero. " +
            "Además, cuando no llevas armadura, tu CA es igual a 13 + tu modificador de Destreza, simulando escamas dracónicas en tu piel."
        },
        {
          level: 6,
          name: "Afinidad Elemental",
          description:
            "Cuando lanzas un conjuro que inflige el tipo de daño asociado a tu ascendencia dracónica, puedes añadir tu modificador de Carisma a una tirada de daño de ese conjuro. " +
            "Al mismo tiempo, puedes gastar 1 punto de hechicería para ganar resistencia a ese mismo tipo de daño durante 1 hora."
        },
        {
          level: 14,
          name: "Alas de Dragón",
          description:
            "Puedes manifestar un par de alas dracónicas en tu espalda como acción adicional, ganando una velocidad de vuelo igual a tu velocidad de movimiento. " +
            "Las alas permanecen hasta que las deshaces como acción adicional. No puedes manifestar las alas mientras llevas una armadura que no esté adaptada para ellas."
        },
        {
          level: 18,
          name: "Presencia Dracónica",
          description:
            "Puedes canalizar la presencia temible de tu ancestro dragón. Como acción, gastas 5 puntos de hechicería para crear un aura de asombro o miedo (a tu elección) de 60 pies de radio. " +
            "Durante 1 minuto, o hasta que pierdas la concentración (como si fuera un conjuro de concentración), cada criatura hostil que empiece su turno en el área debe superar una tirada de salvación de Sabiduría " +
            "contra la CD de tus conjuros de hechicero o quedará Encantada (si elegiste asombro) o Asustada (si elegiste miedo) hasta que el aura termine. " +
            "Una criatura que supere la tirada es inmune a tu Presencia Dracónica durante 24 horas."
        }
      ]
    }
  ]
};

export default sorcerer;
