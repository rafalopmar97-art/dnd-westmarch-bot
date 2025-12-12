// src/models/Item.js
import mongoose from "mongoose";

const weaponDataSchema = new mongoose.Schema(
  {
    // ej: "1d8"
    damageDice: { type: String, default: "" },

    // ej: "slashing", "piercing", "bludgeoning", "fire", etc.
    damageType: { type: String, default: "" },

    // Propiedades: ["heavy","light","two-handed","finesse","ranged","reach", ...]
    properties: {
      type: [String],
      default: []
    },

    // Alcance para armas de alcance / reach (en pies)
    reach: {
      type: Number,
      default: 5 // cuerpo a cuerpo normal
    },

    // Rango para armas a distancia o arrojadizas: normal / máximo
    rangeNormal: {
      type: Number,
      default: 0
    },
    rangeMax: {
      type: Number,
      default: 0
    },

    // Cómo se decide la habilidad para ataque/daño
    // "str" = siempre Fuerza
    // "dex" = siempre Destreza
    // "str_or_dex_highest" = usa la más alta (finesse / distancia)
    // "other" = por si luego quieres algo raro
    abilityMode: {
      type: String,
      enum: ["str", "dex", "str_or_dex_highest", "other"],
      default: "str_or_dex_highest"
    },

    // Bonos mágicos planos (+1, +2, +3)
    magicBonusAttack: {
      type: Number,
      default: 0
    },
    magicBonusDamage: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

const armorDataSchema = new mongoose.Schema(
  {
    // "light", "medium", "heavy", "shield"
    armorType: {
      type: String,
      enum: ["light", "medium", "heavy", "shield", "other"],
      default: "light"
    },

    // CA base de la armadura (ej: 11, 12, 14, etc.)
    baseAC: {
      type: Number,
      default: 10
    },

    // ¿Aplica bonificador de Destreza?
    allowsDexBonus: {
      type: Boolean,
      default: true
    },

    // Si hay límite al bono de DEX (ej: armadura media: máx +2)
    maxDexBonus: {
      type: Number,
      default: null // null = sin límite
    },

    // Desventaja en Sigilo
    hasStealthDisadvantage: {
      type: Boolean,
      default: false
    },

    // Bono mágico a la AC (+1, +2, etc.)
    magicBonusAC: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

const itemSchema = new mongoose.Schema({
  // Nombre del objeto
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  // Tipo general
  type: {
    type: String,
    enum: ["weapon", "armor", "gear", "consumable", "tool", "other"],
    required: true
  },

  // Rareza
  rarity: {
    type: String,
    enum: [
      "none",
      "common",
      "uncommon",
      "rare",
      "very_rare",
      "legendary",
      "artifact"
    ],
    default: "common"
  },

  // Valor base
  value: {
    type: Number,
    default: 0
  },

  // Peso
  weight: {
    type: Number,
    default: 0
  },

  // Descripción corta
  description: {
    type: String,
    default: ""
  },

  // Datos específicos si es ARMA
  weaponData: {
    type: weaponDataSchema,
    default: null
  },

  // Datos específicos si es ARMADURA
  armorData: {
    type: armorDataSchema,
    default: null
  },

  // Flags de sistema / tienda
  isHomebrew: {
    type: Boolean,
    default: true
  },
  isEnabled: {
    type: Boolean,
    default: true
  },
  isInStore: {
    type: Boolean,
    default: true
  },
  isBuyable: {
    type: Boolean,
    default: true
  },
  isSellable: {
    type: Boolean,
    default: true
  },
  isTradeable: {
    type: Boolean,
    default: true
  },

  // Precio específico de tienda (si es 0, usas value)
  shopPrice: {
    type: Number,
    default: 0
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware para updatedAt
itemSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const ItemModel = mongoose.model("Item", itemSchema);
export default ItemModel;

