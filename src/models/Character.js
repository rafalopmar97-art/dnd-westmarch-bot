// src/models/Character.js
import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * 🧠 Habilidades básicas (scores)
 * STR, DEX, CON, INT, WIS, CHA
 */
const abilityScoresSchema = new Schema(
  {
    str: { type: Number, default: 8 }, // Fuerza
    dex: { type: Number, default: 8 }, // Destreza
    con: { type: Number, default: 8 }, // Constitución
    int: { type: Number, default: 8 }, // Inteligencia
    wis: { type: Number, default: 8 }, // Sabiduría
    cha: { type: Number, default: 8 }  // Carisma
  },
  { _id: false }
);

/**
 * 🛡️ Competencias en tiradas de salvación
 * true = tiene competencia
 */
const savingThrowProficienciesSchema = new Schema(
  {
    str: { type: Boolean, default: false },
    dex: { type: Boolean, default: false },
    con: { type: Boolean, default: false },
    int: { type: Boolean, default: false },
    wis: { type: Boolean, default: false },
    cha: { type: Boolean, default: false }
  },
  { _id: false }
);

/**
 * 🎲 Competencias de habilidades
 * - proficient: competencia normal
 * - expertise: doble competencia (rogues, bards, etc.)
 */
const skillProficiencySchema = new Schema(
  {
    name: { type: String, required: true, trim: true }, // "Athletics", "Stealth", etc.
    proficient: { type: Boolean, default: false },
    expertise: { type: Boolean, default: false }
  },
  { _id: false }
);

/**
 * 🎒 Entrada de inventario de personaje
 * Cada registro conecta con un Item de tu base de datos
 */
const inventoryEntrySchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0
    },
    // por si quieres marcar si está equipado, attuned, etc.
    equipped: {
      type: Boolean,
      default: false
    },
    attuned: {
      type: Boolean,
      default: false
    }
  },
  { _id: false }
);

/**
 * ✨ Rasgos (traits) consolidados del personaje
 * - fuente: de dónde viene el rasgo (raza, clase, etc.)
 * - name + shortDescription: texto inventado por ti
 */
const traitEntrySchema = new Schema(
  {
    source: {
      type: String,
      enum: ["race", "class", "subclass", "background", "feat", "other"],
      default: "other"
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    shortDescription: {
      type: String,
      default: ""
    }
  },
  { _id: false }
);

/**
 * 🧙‍♂️ Esquema principal de Character
 */
const characterSchema = new Schema({
  // Discord user
  ownerId: {
    type: String,
    required: true
  },

  // Servidor (guild) donde existe el PJ (para Westmarch multi-servidor)
  guildId: {
    type: String,
    required: false
  },

  // Nombre del personaje (único por servidor)
  name: {
    type: String,
    required: true,
    trim: true
  },

  // 🔗 REFERENCIAS A TU BASE DE DATOS
  // (esto conecta con los modelos que ya hicimos)

  race: {
    type: Schema.Types.ObjectId,
    ref: "Race",
    default: null
  },

  classRef: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    default: null
  },

  subclassRef: {
    type: Schema.Types.ObjectId,
    ref: "Subclass",
    default: null
  },

  backgroundRef: {
    type: Schema.Types.ObjectId,
    ref: "Background",
    default: null
  },

  feats: [
    {
      type: Schema.Types.ObjectId,
      ref: "Feat"
    }
  ],

  languages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Language"
    }
  ],

  // 📈 NIVEL Y EXPERIENCIA
  level: {
    type: Number,
    default: 1,
    min: 1,
    max: 20
  },

  experience: {
    type: Number,
    default: 0,
    min: 0
  },

  // 🧠 HABILIDADES
  abilityScores: {
    type: abilityScoresSchema,
    default: () => ({})
  },

  // ❤️ VIDA
  maxHP: {
    type: Number,
    default: 1,
    min: 1
  },

  currentHP: {
    type: Number,
    default: 1,
    min: 0
  },

  temporaryHP: {
    type: Number,
    default: 0,
    min: 0
  },

  // 🛡️ ARMADURA Y DEFENSAS
  armorClass: {
    type: Number,
    default: 10,
    min: 0
  },

  // 🎓 BONO DE COMPETENCIA
  proficiencyBonus: {
    type: Number,
    default: 2
  },

  // 🦶 VELOCIDAD
  speed: {
    type: Number,
    default: 30
  },

  // 💠 SALVACIONES Y HABILIDADES
  savingThrowProficiencies: {
    type: savingThrowProficienciesSchema,
    default: () => ({})
  },

  skillProficiencies: {
    type: [skillProficiencySchema],
    default: []
  },

  // ✨ RASGOS DE RAZA/CLASE/SUBCLASE/BG/FEATS CENTRALIZADOS
  traits: {
    type: [traitEntrySchema],
    default: []
  },

  // 🎒 INVENTARIO Y ORO
  inventory: {
    type: [inventoryEntrySchema],
    default: []
  },

  gold: {
    type: Number,
    default: 0,
    min: 0
  },

  // ESTADO DEL PERSONAJE EN EL MUNDO
  isAlive: {
    type: Boolean,
    default: true
  },

  isActive: {
    type: Boolean,
    default: true
  },

  // Notas libres (para el jugador o staff)
  notes: {
    type: String,
    default: ""
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 🔐 Índice: nombre único por servidor (opcional, pero muy útil)
characterSchema.index(
  { guildId: 1, name: 1 },
  { unique: true, sparse: true }
);

// 🕒 Middleware: actualizar updatedAt y ajustar algunos valores
characterSchema.pre("save", function (next) {
  const character = this;

  character.updatedAt = Date.now();

  // Auto-ajustar bono de competencia por nivel si no coincide
  const lvl = character.level || 1;
  const pbByLevel = {
    1: 2, 2: 2, 3: 2, 4: 2,
    5: 3, 6: 3, 7: 3, 8: 3,
    9: 4, 10: 4, 11: 4, 12: 4,
    13: 5, 14: 5, 15: 5, 16: 5,
    17: 6, 18: 6, 19: 6, 20: 6
  };

  character.proficiencyBonus = pbByLevel[lvl] || 2;

  // Asegurar que currentHP esté entre 0 y maxHP
  if (character.currentHP > character.maxHP) {
    character.currentHP = character.maxHP;
  }
  if (character.currentHP < 0) {
    character.currentHP = 0;
  }

  // Evitar speed negativa
  if (character.speed < 0) {
    character.speed = 0;
  }

  next();
});

/**
 * 🔍 Virtual: modificadores de habilidad
 * No se guarda en la DB, pero lo puedes usar en código.
 */
characterSchema.virtual("abilityModifiers").get(function () {
  const scores = this.abilityScores || {};
  const result = {};

  const calcMod = v => Math.floor(((v ?? 10) - 10) / 2);

  result.str = calcMod(scores.str);
  result.dex = calcMod(scores.dex);
  result.con = calcMod(scores.con);
  result.int = calcMod(scores.int);
  result.wis = calcMod(scores.wis);
  result.cha = calcMod(scores.cha);

  return result;
});

const CharacterModel = mongoose.model("Character", characterSchema);
export default CharacterModel;
