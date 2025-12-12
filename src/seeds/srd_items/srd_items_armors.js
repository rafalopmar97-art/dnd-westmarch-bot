// src/srd/srdArmors.es.js
// Armaduras SRD 5e en español, listas para usar con src/models/Item.js

export const SRD_ARMORS_ES = [
  // =========
  // ARMADURA LIGERA
  // =========
  {
    name: "Padded",
    type: "armor",
    rarity: "common",
    value: 5, // 5 gp
    weight: 8,
    description:
      "Armadura acolchada: CA 11 + modificador de Destreza. Desventaja en Sigilo.",
    weaponData: null,
    armorData: {
      armorType: "light",
      baseAC: 11,
      allowsDexBonus: true,
      maxDexBonus: null,
      hasStealthDisadvantage: true,
      magicBonusAC: 0
    },
    isHomebrew: false
  },
  {
    name: "Leather",
    type: "armor",
    rarity: "common",
    value: 10, // 10 gp
    weight: 10,
    description: "Armadura de cuero: CA 11 + modificador de Destreza.",
    weaponData: null,
    armorData: {
      armorType: "light",
      baseAC: 11,
      allowsDexBonus: true,
      maxDexBonus: null,
      hasStealthDisadvantage: false,
      magicBonusAC: 0
    },
    isHomebrew: false
  },
  {
    name: "Studded leather",
    type: "armor",
    rarity: "common",
    value: 45, // 45 gp
    weight: 13,
    description:
      "Armadura de cuero tachonado: CA 12 + modificador de Destreza.",
    weaponData: null,
    armorData: {
      armorType: "light",
      baseAC: 12,
      allowsDexBonus: true,
      maxDexBonus: null,
      hasStealthDisadvantage: false,
      magicBonusAC: 0
    },
    isHomebrew: false
  },

  // =========
  // ARMADURA MEDIA
  // =========
  {
    name: "Hide",
    type: "armor",
    rarity: "common",
    value: 10, // 10 gp
    weight: 12,
    description:
      "Armadura de piel: CA 12 + modificador de Destreza (máx +2).",
    weaponData: null,
    armorData: {
      armorType: "medium",
      baseAC: 12,
      allowsDexBonus: true,
      maxDexBonus: 2,
      hasStealthDisadvantage: false,
      magicBonusAC: 0
    },
    isHomebrew: false
  },
  {
    name: "Chain shirt",
    type: "armor",
    rarity: "common",
    value: 50, // 50 gp
    weight: 20,
    description:
      "Camisote de malla: CA 13 + modificador de Destreza (máx +2).",
    weaponData: null,
    armorData: {
      armorType: "medium",
      baseAC: 13,
      allowsDexBonus: true,
      maxDexBonus: 2,
      hasStealthDisadvantage: false,
      magicBonusAC: 0
    },
    isHomebrew: false
  },
  {
    name: "Scale mail",
    type: "armor",
    rarity: "common",
    value: 50, // 50 gp
    weight: 45,
    description:
      "Cota de escamas: CA 14 + modificador de Destreza (máx +2). Desventaja en Sigilo.",
    weaponData: null,
    armorData: {
      armorType: "medium",
      baseAC: 14,
      allowsDexBonus: true,
      maxDexBonus: 2,
      hasStealthDisadvantage: true,
      magicBonusAC: 0
    },
    isHomebrew: false
  },
  {
    name: "Breastplate",
    type: "armor",
    rarity: "common",
    value: 400, // 400 gp
    weight: 20,
    description:
      "Coraza: CA 14 + modificador de Destreza (máx +2). No impone desventaja en Sigilo.",
    weaponData: null,
    armorData: {
      armorType: "medium",
      baseAC: 14,
      allowsDexBonus: true,
      maxDexBonus: 2,
      hasStealthDisadvantage: false,
      magicBonusAC: 0
    },
    isHomebrew: false
  },
  {
    name: "Half plate",
    type: "armor",
    rarity: "common",
    value: 750, // 750 gp
    weight: 40,
    description:
      "Semiplacas: CA 15 + modificador de Destreza (máx +2). Desventaja en Sigilo.",
    weaponData: null,
    armorData: {
      armorType: "medium",
      baseAC: 15,
      allowsDexBonus: true,
      maxDexBonus: 2,
      hasStealthDisadvantage: true,
      magicBonusAC: 0
    },
    isHomebrew: false
  },

  // =========
  // ARMADURA PESADA
  // =========
  {
    name: "Ring mail",
    type: "armor",
    rarity: "common",
    value: 30, // 30 gp
    weight: 40,
    description:
      "Cota de anillas: CA 14. Desventaja en Sigilo.",
    weaponData: null,
    armorData: {
      armorType: "heavy",
      baseAC: 14,
      allowsDexBonus: false,
      maxDexBonus: 0,
      hasStealthDisadvantage: true,
      magicBonusAC: 0
    },
    isHomebrew: false
  },
  {
    name: "Chain mail",
    type: "armor",
    rarity: "common",
    value: 75, // 75 gp
    weight: 55,
    description:
      "Cota de malla: CA 16. Requiere Fuerza 13. Desventaja en Sigilo.",
    weaponData: null,
    armorData: {
      armorType: "heavy",
      baseAC: 16,
      allowsDexBonus: false,
      maxDexBonus: 0,
      hasStealthDisadvantage: true,
      magicBonusAC: 0
    },
    isHomebrew: false
  },
  {
    name: "Splint",
    type: "armor",
    rarity: "common",
    value: 200, // 200 gp
    weight: 60,
    description:
      "Armadura segmentada: CA 17. Requiere Fuerza 15. Desventaja en Sigilo.",
    weaponData: null,
    armorData: {
      armorType: "heavy",
      baseAC: 17,
      allowsDexBonus: false,
      maxDexBonus: 0,
      hasStealthDisadvantage: true,
      magicBonusAC: 0
    },
    isHomebrew: false
  },
  {
    name: "Plate",
    type: "armor",
    rarity: "common",
    value: 1500, // 1500 gp
    weight: 65,
    description:
      "Armadura completa de placas: CA 18. Requiere Fuerza 15. Desventaja en Sigilo.",
    weaponData: null,
    armorData: {
      armorType: "heavy",
      baseAC: 18,
      allowsDexBonus: false,
      maxDexBonus: 0,
      hasStealthDisadvantage: true,
      magicBonusAC: 0
    },
    isHomebrew: false
  },

  // =========
  // ESCUDO
  // =========
  {
    name: "Shield",
    type: "armor",
    rarity: "common",
    value: 10, // 10 gp
    weight: 6,
    description:
      "Escudo: concede un bono de +2 a la CA mientras se empuña.",
    weaponData: null,
    armorData: {
      armorType: "shield",
      baseAC: 2, // tratado como bono plano a la CA en tu lógica
      allowsDexBonus: true,
      maxDexBonus: null,
      hasStealthDisadvantage: false,
      magicBonusAC: 0
    },
    isHomebrew: false
  }
];
