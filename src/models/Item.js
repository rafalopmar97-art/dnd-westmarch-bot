// src/models/Item.js
import mongoose from "mongoose";

// -------------------- SUB-SCHEMAS: ARMAS Y ARMADURAS -------------------- //

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

// -------------------- SUB-SCHEMA: CONTENEDOR DE OTROS ÍTEMS -------------------- //
//
// Para cosas como "Paquete de aventurero", mochilas con contenido predefinido, cofres, etc.
//

const containedItemSchema = new mongoose.Schema(
  {
    // Referencia a otro Item del mismo modelo
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
  },
  { _id: false }
);

// -------------------- SUB-SCHEMAS: CONDICIONES Y ACCIONES -------------------- //
// La idea es que el BOT lea estos datos y ejecute la lógica, NO que Mongoose haga magia solo.

// Condiciones para poder disparar un efecto de ítem
const itemConditionSchema = new mongoose.Schema(
  {
    // Nivel mínimo y máximo del personaje (0 = sin tope máximo)
    minLevel: {
      type: Number,
      default: 0
    },
    maxLevel: {
      type: Number,
      default: 0 // 0 = sin límite superior
    },

    // Clases requeridas / prohibidas (nombres internos: "fighter", "wizard", etc.)
    requiredClasses: {
      type: [String],
      default: []
    },
    forbiddenClasses: {
      type: [String],
      default: []
    },

    // Roles requeridos (por ejemplo IDs de rol de Discord o tags internos)
    requiredRoles: {
      type: [String],
      default: []
    },

    // Ítems que el usuario debe tener para que se cumpla la condición
    requiredItems: {
      type: [
        {
          item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
          },
          quantity: {
            type: Number,
            default: 1
          }
        }
      ],
      default: []
    }
  },
  { _id: false }
);

// Acciones que el ítem puede realizar cuando se dispara un trigger:
// - Dar/quitar ítems
// - Dar/quitar roles
// - Modificar oro (u otra moneda)
// - Ejecutar macros personalizadas del bot
const itemActionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "give_item",
        "remove_item",
        "give_role",
        "remove_role",
        "modify_currency",
        "run_macro"
      ],
      required: true
    },

    // Para modify_currency: diferencia positiva o negativa
    currencyDelta: {
      type: Number,
      default: 0
    },

    // Para give_item / remove_item
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item"
    },
    quantity: {
      type: Number,
      default: 1
    },

    // Para give_role / remove_role (ej: ID de rol de Discord)
    roleId: {
      type: String,
      default: ""
    },

    // Payload genérico por si quieres pasar datos extra a tu lógica del bot
    payload: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    }
  },
  { _id: false }
);

// Un efecto es: CUÁNDO (trigger) + QUÉ CONDICIONES + QUÉ ACCIONES
const itemEffectSchema = new mongoose.Schema(
  {
    // Cuándo se dispara este conjunto de acciones
    trigger: {
      type: String,
      enum: [
        "on_buy",    // al comprar en la tienda
        "on_sell",   // al vender
        "on_use",    // al usar (poción, pergamino, etc.)
        "on_open",   // al abrir (cofre, pack, etc.)
        "on_equip",  // al equipar (arma, armadura, anillo, etc.)
        "on_unequip" // al desequipar
      ],
      default: "on_use"
    },

    // Si es true, solo puede aplicar una vez por usuario (p.ej. un paquete inicial)
    oncePerUser: {
      type: Boolean,
      default: false
    },

    // Condiciones para que este efecto se pueda aplicar
    conditions: {
      type: itemConditionSchema,
      default: () => ({})
    },

    // Acciones que se ejecutan si las condiciones se cumplen
    actions: {
      type: [itemActionSchema],
      default: []
    }
  },
  { _id: false }
);

// -------------------- SCHEMA PRINCIPAL DE ÍTEM -------------------- //

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

  // Valor base (en gp)
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

  // -------------------- NUEVO: CONTENEDOR -------------------- //
  // Si este ítem contiene otros ítems (mochila, paquete de aventurero, cofre con loot, etc.)
  isContainer: {
    type: Boolean,
    default: false
  },

  // Lista de ítems contenidos
  contents: {
    type: [containedItemSchema],
    default: []
  },

  // -------------------- NUEVO: USOS / CARGAS -------------------- //
  // Si el ítem tiene usos limitados (ej: 3 cargas, luego se rompe)
  maxUses: {
    type: Number,
    default: 0 // 0 = infinito / no se controla por este campo
  },

  // Si se destruye o desaparece al usarlo (poción, pergamino de un solo uso, etc.)
  consumeOnUse: {
    type: Boolean,
    default: false
  },

  // -------------------- NUEVO: EFECTOS / AUTOMATIZACIONES -------------------- //
  // Lista de efectos que el bot puede procesar en los distintos triggers
  effects: {
    type: [itemEffectSchema],
    default: []
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
