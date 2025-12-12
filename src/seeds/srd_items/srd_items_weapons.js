// src/srd/srdWeapons.es.js
// Armas SRD 5e en español, listas para usar con src/models/Item.js

export const SRD_WEAPONS = [
  // ==========================
  // ARMAS SENCILLAS CUERPO A CUERPO
  // ==========================
  {
    name: "Club",
    type: "weapon",
    rarity: "common",
    value: 1, // 1 sp
    weight: 2,
    description: "Garrote simple de madera. Golpea a corta distancia.",
    weaponData: {
      damageDice: "1d4",
      damageType: "bludgeoning",
      properties: ["light"],
      reach: 5,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Dagger",
    type: "weapon",
    rarity: "common",
    value: 2, // 2 gp
    weight: 1,
    description:
      "Daga corta y afilada. Puede usarse cuerpo a cuerpo o lanzarse.",
    weaponData: {
      damageDice: "1d4",
      damageType: "piercing",
      properties: ["finesse", "light", "thrown"],
      reach: 5,
      rangeNormal: 20,
      rangeMax: 60,
      abilityMode: "str_or_dex_highest",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Greatclub",
    type: "weapon",
    rarity: "common",
    value: 2, // 2 sp
    weight: 10,
    description: "Garrote grande y pesado que se maneja con dos manos.",
    weaponData: {
      damageDice: "1d8",
      damageType: "bludgeoning",
      properties: ["two-handed"],
      reach: 5,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Handaxe",
    type: "weapon",
    rarity: "common",
    value: 5, // 5 gp
    weight: 2,
    description: "Hacha ligera que puede usarse en combate o lanzarse.",
    weaponData: {
      damageDice: "1d6",
      damageType: "slashing",
      properties: ["light", "thrown"],
      reach: 5,
      rangeNormal: 20,
      rangeMax: 60,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Javelin",
    type: "weapon",
    rarity: "common",
    value: 5, // 5 sp
    weight: 2,
    description: "Jabalina equilibrada para lanzar a mayor distancia.",
    weaponData: {
      damageDice: "1d6",
      damageType: "piercing",
      properties: ["thrown"],
      reach: 5,
      rangeNormal: 30,
      rangeMax: 120,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Light hammer",
    type: "weapon",
    rarity: "common",
    value: 2, // 2 gp
    weight: 2,
    description:
      "Martillo ligero, útil tanto para golpear de cerca como para lanzar.",
    weaponData: {
      damageDice: "1d4",
      damageType: "bludgeoning",
      properties: ["light", "thrown"],
      reach: 5,
      rangeNormal: 20,
      rangeMax: 60,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Mace",
    type: "weapon",
    rarity: "common",
    value: 5, // 5 gp
    weight: 4,
    description: "Maza sencilla con cabeza pesada para aplastar armaduras.",
    weaponData: {
      damageDice: "1d6",
      damageType: "bludgeoning",
      properties: [],
      reach: 5,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Quarterstaff",
    type: "weapon",
    rarity: "common",
    value: 2, // 2 sp
    weight: 4,
    description:
      "Bastón robusto de madera. Puede usarse a una o dos manos.",
    weaponData: {
      damageDice: "1d6",
      damageType: "bludgeoning",
      properties: ["versatile"],
      reach: 5,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Sickle",
    type: "weapon",
    rarity: "common",
    value: 1, // 1 gp
    weight: 2,
    description: "Hoz pequeña de hoja curva, usada como arma ligera.",
    weaponData: {
      damageDice: "1d4",
      damageType: "slashing",
      properties: ["light"],
      reach: 5,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Spear",
    type: "weapon",
    rarity: "common",
    value: 1, // 1 gp
    weight: 3,
    description:
      "Lanza corta. Puede usarse en combate cuerpo a cuerpo o lanzarse.",
    weaponData: {
      damageDice: "1d6",
      damageType: "piercing",
      properties: ["thrown", "versatile"],
      reach: 5,
      rangeNormal: 20,
      rangeMax: 60,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },

  // ==========================
  // ARMAS SENCILLAS A DISTANCIA
  // ==========================
  {
    name: "Crossbow, light",
    type: "weapon",
    rarity: "common",
    value: 25, // 25 gp
    weight: 5,
    description:
      "Ballesta ligera, fácil de manejar pero algo lenta de recargar.",
    weaponData: {
      damageDice: "1d8",
      damageType: "piercing",
      properties: ["ammunition", "loading", "two-handed", "ranged"],
      reach: 5,
      rangeNormal: 80,
      rangeMax: 320,
      abilityMode: "dex",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Dart",
    type: "weapon",
    rarity: "common",
    value: 5, // 5 cp
    weight: 0.25,
    description: "Dardo equilibrado para lanzar, pequeño y fácil de ocultar.",
    weaponData: {
      damageDice: "1d4",
      damageType: "piercing",
      properties: ["finesse", "thrown", "ranged"],
      reach: 5,
      rangeNormal: 20,
      rangeMax: 60,
      abilityMode: "str_or_dex_highest",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Shortbow",
    type: "weapon",
    rarity: "common",
    value: 25, // 25 gp
    weight: 2,
    description: "Arco corto de caza, ligero y fácil de usar.",
    weaponData: {
      damageDice: "1d6",
      damageType: "piercing",
      properties: ["ammunition", "two-handed", "ranged"],
      reach: 5,
      rangeNormal: 80,
      rangeMax: 320,
      abilityMode: "dex",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Sling",
    type: "weapon",
    rarity: "common",
    value: 1, // 1 sp
    weight: 0,
    description: "Honda sencilla que lanza piedras u otros proyectiles.",
    weaponData: {
      damageDice: "1d4",
      damageType: "bludgeoning",
      properties: ["ammunition", "ranged"],
      reach: 5,
      rangeNormal: 30,
      rangeMax: 120,
      abilityMode: "dex",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },

  // ==========================
  // ARMAS MARCIALES CUERPO A CUERPO
  // ==========================
  {
    name: "Battleaxe",
    type: "weapon",
    rarity: "common",
    value: 10, // 10 gp
    weight: 4,
    description: "Hacha de guerra robusta que puede empuñarse a una o dos manos.",
    weaponData: {
      damageDice: "1d8",
      damageType: "slashing",
      properties: ["versatile"],
      reach: 5,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Flail",
    type: "weapon",
    rarity: "common",
    value: 10, // 10 gp
    weight: 2,
    description:
      "Mangual con cadena y bola con pinchos, difícil de bloquear con escudo.",
    weaponData: {
      damageDice: "1d8",
      damageType: "bludgeoning",
      properties: [],
      reach: 5,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Glaive",
    type: "weapon",
    rarity: "common",
    value: 20, // 20 gp
    weight: 6,
    description:
      "Pica con hoja curva. Permite mantener a los enemigos a distancia.",
    weaponData: {
      damageDice: "1d10",
      damageType: "slashing",
      properties: ["heavy", "reach", "two-handed"],
      reach: 10,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Greataxe",
    type: "weapon",
    rarity: "common",
    value: 30, // 30 gp
    weight: 7,
    description: "Gran hacha de dos manos, pensada para golpes devastadores.",
    weaponData: {
      damageDice: "1d12",
      damageType: "slashing",
      properties: ["heavy", "two-handed"],
      reach: 5,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Greatsword",
    type: "weapon",
    rarity: "common",
    value: 50, // 50 gp
    weight: 6,
    description:
      "Espadón de dos manos con gran filo, especializado en repartir tajos amplios.",
    weaponData: {
      damageDice: "2d6",
      damageType: "slashing",
      properties: ["heavy", "two-handed"],
      reach: 5,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Halberd",
    type: "weapon",
    rarity: "common",
    value: 20, // 20 gp
    weight: 6,
    description:
      "Alabarda con punta y hoja lateral, ideal para mantener una línea defensiva.",
    weaponData: {
      damageDice: "1d10",
      damageType: "slashing",
      properties: ["heavy", "reach", "two-handed"],
      reach: 10,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Lance",
    type: "weapon",
    rarity: "common",
    value: 10, // 10 gp
    weight: 6,
    description:
      "Lanza larga de caballería. Excelente a lomos de una montura, complicada a pie.",
    weaponData: {
      damageDice: "1d12",
      damageType: "piercing",
      properties: ["reach", "special"],
      reach: 10,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Longsword",
    type: "weapon",
    rarity: "common",
    value: 15, // 15 gp
    weight: 3,
    description:
      "Espada larga versátil que puede empuñarse a una o dos manos.",
    weaponData: {
      damageDice: "1d8",
      damageType: "slashing",
      properties: ["versatile"],
      reach: 5,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Maul",
    type: "weapon",
    rarity: "common",
    value: 10, // 10 gp
    weight: 10,
    description:
      "Martillo enorme de dos manos, ideal para romper armaduras y huesos.",
    weaponData: {
      damageDice: "2d6",
      damageType: "bludgeoning",
      properties: ["heavy", "two-handed"],
      reach: 5,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Morningstar",
    type: "weapon",
    rarity: "common",
    value: 15, // 15 gp
    weight: 4,
    description:
      "Maza con pinchos, combina impacto contundente con penetración.",
    weaponData: {
      damageDice: "1d8",
      damageType: "piercing",
      properties: [],
      reach: 5,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Pike",
    type: "weapon",
    rarity: "common",
    value: 5, // 5 gp
    weight: 18,
    description:
      "Pica extremadamente larga, usada para detener cargas.",
    weaponData: {
      damageDice: "1d10",
      damageType: "piercing",
      properties: ["heavy", "reach", "two-handed"],
      reach: 10,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Rapier",
    type: "weapon",
    rarity: "common",
    value: 25, // 25 gp
    weight: 2,
    description:
      "Estoque fino y balanceado, perfecto para ataques de precisión.",
    weaponData: {
      damageDice: "1d8",
      damageType: "piercing",
      properties: ["finesse"],
      reach: 5,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str_or_dex_highest",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Scimitar",
    type: "weapon",
    rarity: "common",
    value: 25, // 25 gp
    weight: 3,
    description:
      "Cimitarra de hoja curva, rápida y adecuada para el combate ágil.",
    weaponData: {
      damageDice: "1d6",
      damageType: "slashing",
      properties: ["finesse", "light"],
      reach: 5,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str_or_dex_highest",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Shortsword",
    type: "weapon",
    rarity: "common",
    value: 10, // 10 gp
    weight: 2,
    description:
      "Espada corta, ligera y fácil de ocultar. Favorita de pícaros.",
    weaponData: {
      damageDice: "1d6",
      damageType: "piercing",
      properties: ["finesse", "light"],
      reach: 5,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str_or_dex_highest",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Trident",
    type: "weapon",
    rarity: "common",
    value: 5, // 5 gp
    weight: 4,
    description:
      "Tridente de tres puntas, diseñado para atrapar y golpear.",
    weaponData: {
      damageDice: "1d6",
      damageType: "piercing",
      properties: ["thrown", "versatile"],
      reach: 5,
      rangeNormal: 20,
      rangeMax: 60,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "War pick",
    type: "weapon",
    rarity: "common",
    value: 5, // 5 gp
    weight: 2,
    description:
      "Pico de guerra, capaz de perforar armaduras con su punta concentrada.",
    weaponData: {
      damageDice: "1d8",
      damageType: "piercing",
      properties: [],
      reach: 5,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Warhammer",
    type: "weapon",
    rarity: "common",
    value: 15, // 15 gp
    weight: 2,
    description:
      "Martillo de guerra que puede empuñarse a una o dos manos.",
    weaponData: {
      damageDice: "1d8",
      damageType: "bludgeoning",
      properties: ["versatile"],
      reach: 5,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Whip",
    type: "weapon",
    rarity: "common",
    value: 2, // 2 gp
    weight: 3,
    description:
      "Látigo de cuero trenzado, permite atacar a cierta distancia.",
    weaponData: {
      damageDice: "1d4",
      damageType: "slashing",
      properties: ["finesse", "reach"],
      reach: 10,
      rangeNormal: 0,
      rangeMax: 0,
      abilityMode: "str_or_dex_highest",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },

  // ==========================
  // ARMAS MARCIALES A DISTANCIA
  // ==========================
  {
    name: "Blowgun",
    type: "weapon",
    rarity: "common",
    value: 10, // 10 gp
    weight: 1,
    description:
      "Cerbatana silenciosa para lanzar dardos pequeños, ideal para ataques discretos.",
    weaponData: {
      damageDice: "1",
      damageType: "piercing",
      properties: ["ammunition", "loading", "ranged"],
      reach: 5,
      rangeNormal: 25,
      rangeMax: 100,
      abilityMode: "dex",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Crossbow, hand",
    type: "weapon",
    rarity: "common",
    value: 75, // 75 gp
    weight: 3,
    description:
      "Ballesta de mano compacta, fácil de ocultar y disparar con una sola mano.",
    weaponData: {
      damageDice: "1d6",
      damageType: "piercing",
      properties: ["ammunition", "light", "loading", "ranged"],
      reach: 5,
      rangeNormal: 30,
      rangeMax: 120,
      abilityMode: "dex",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Crossbow, heavy",
    type: "weapon",
    rarity: "common",
    value: 50, // 50 gp
    weight: 18,
    description:
      "Ballesta pesada de gran potencia, aunque lenta y voluminosa.",
    weaponData: {
      damageDice: "1d10",
      damageType: "piercing",
      properties: ["ammunition", "heavy", "loading", "two-handed", "ranged"],
      reach: 5,
      rangeNormal: 100,
      rangeMax: 400,
      abilityMode: "dex",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Longbow",
    type: "weapon",
    rarity: "common",
    value: 50, // 50 gp
    weight: 2,
    description:
      "Arco largo de gran alcance, usado habitualmente por arqueros expertos.",
    weaponData: {
      damageDice: "1d8",
      damageType: "piercing",
      properties: ["ammunition", "heavy", "two-handed", "ranged"],
      reach: 5,
      rangeNormal: 150,
      rangeMax: 600,
      abilityMode: "dex",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Net",
    type: "weapon",
    rarity: "common",
    value: 1, // 1 gp
    weight: 3,
    description:
      "Red diseñada para atrapar criaturas en lugar de dañarlas.",
    weaponData: {
      damageDice: "0",
      damageType: "bludgeoning",
      properties: ["special", "thrown", "ranged"],
      reach: 5,
      rangeNormal: 5,
      rangeMax: 15,
      abilityMode: "dex",
      magicBonusAttack: 0,
      magicBonusDamage: 0
    },
    armorData: null,
    isHomebrew: false
  }
];
