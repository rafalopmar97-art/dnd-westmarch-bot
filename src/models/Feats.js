// src/models/Feat.js
import mongoose from "mongoose";

/**
 * 🎯 Requisitos de característica
 * Ejemplo lógico, NO texto de reglas:
 *  - ability: "STR", minimum: 13
 */
const abilityRequirementSchema = new mongoose.Schema(
  {
    ability: {
      type: String,
      enum: ["STR", "DEX", "CON", "INT", "WIS", "CHA"],
      required: true
    },
    minimum: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

/**
 * 🎯 Requisitos generales de la dote
 * Todo es opcional, tú decides qué usar en cada dote
 */
const prerequisiteSchema = new mongoose.Schema(
  {
    // Nivel mínimo total del personaje
    minLevel: {
      type: Number,
      default: null
    },

    // Clases requeridas por nombre ("Guerrero", "Mago"... nombres tuyos)
    classes: {
      type: [String],
      default: []
    },

    // Razas requeridas por nombre
    races: {
      type: [String],
      default: []
    },

    // Trasfondos requeridos por nombre
    backgrounds: {
      type: [String],
      default: []
    },

    // Requisitos de característica (ej: STR 13, DEX 13)
    abilities: {
      type: [abilityRequirementSchema],
      default: []
    },

    // Cualquier otra condición que quieras describir con tus palabras
    other: {
      type: String,
      default: ""
    }
  },
  { _id: false }
);

/**
 * 🧬 Aumentos de característica que da la dote (si aplica)
 * Ejemplo:
 *  - ability: "STR", amount: 1
 */
const abilityIncreaseSchema = new mongoose.Schema(
  {
    ability: {
      type: String,
      enum: ["STR", "DEX", "CON", "INT", "WIS", "CHA"],
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
      max: 3 // por seguridad, pero puedes subirlo si quieres
    }
  },
  { _id: false }
);

/**
 * 🧰 Competencias que otorga la dote (skills, tools, etc.)
 */
const proficiencyGrantSchema = new mongoose.Schema(
  {
    skills: {
      type: [String],
      default: []
    },
    tools: {
      type: [String],
      default: []
    },
    weapons: {
      type: [String],
      default: []
    },
    armor: {
      type: [String],
      default: []
    },
    languages: {
      type: [String],
      default: []
    }
  },
  { _id: false }
);

/**
 * ✨ Hechizos que otorga la dote (si aplica)
 * OJO: solo nombres y frecuencia, tú decides la mecánica en tus reglas.
 */
const grantedSpellSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: Number,
      default: null
    },
    timesPerLongRest: {
      type: Number,
      default: null
    },
    timesPerShortRest: {
      type: Number,
      default: null
    },
    // atributo para hacer tiradas de conjuro, si aplica
    castingAbility: {
      type: String,
      enum: [null, "STR", "DEX", "CON", "INT", "WIS", "CHA"],
      default: null
    },
    notes: {
      type: String,
      default: ""
    }
  },
  { _id: false }
);

/**
 * 📊 Modificadores genéricos que la dote otorga
 * Son muy abiertos para que los uses como “etiquetas mecánicas”
 */
const modifierSchema = new mongoose.Schema(
  {
    // Tipo de bono: "attack", "damage", "ac", "skill", "savingThrow", etc. (texto libre)
    type: {
      type: String,
      required: true
    },

    // A qué se aplica: "melee attacks", "ranged attacks", "Stealth", etc. (texto libre)
    target: {
      type: String,
      required: true
    },

    // Valor numérico del bono (positivo o negativo)
    value: {
      type: Number,
      required: true
    },

    // Notas adicionales (ej. “solo mientras no lleve armadura pesada”)
    notes: {
      type: String,
      default: ""
    }
  },
  { _id: false }
);

/**
 * ⭐ Esquema principal de Dote
 */
const featSchema = new mongoose.Schema({
  // Nombre de la dote (homebrew o renombrada por ti)
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  // Categoría interna para filtrar
  // Es solo para organizarte tú, no es parte de ninguna SRD:
  // ejemplos: "general", "combat", "magic", "racial", "class"
  category: {
    type: String,
    default: "general"
  },

  // Resumen corto ESCRITO POR TI
  shortDescription: {
    type: String,
    default: ""
  },

  // Texto completo con la regla y sabor ESCRITO POR TI
  description: {
    type: String,
    default: ""
  },

  // 🔒 ¿Es exclusiva de cierta raza / clase / background?
  isRacial: {
    type: Boolean,
    default: false
  },
  isClassSpecific: {
    type: Boolean,
    default: false
  },

  // 🎯 Requisitos (nivel, raza, características, etc.)
  prerequisites: {
    type: prerequisiteSchema,
    default: () => ({})
  },

  // 🧬 Aumentos de característica
  abilityIncreases: {
    type: [abilityIncreaseSchema],
    default: []
  },

  // 🧰 Competencias que concede
  proficienciesGranted: {
    type: proficiencyGrantSchema,
    default: () => ({})
  },

  // ✨ Hechizos concedidos (si aplica)
  spellsGranted: {
    type: [grantedSpellSchema],
    default: []
  },

  // 📊 Modificadores genéricos (bonos a ataque, daño, CA, habilidades, etc.)
  modifiers: {
    type: [modifierSchema],
    default: []
  },

  // Tags para buscar/filtrar (“movilidad”, “defensiva”, “magia”, etc.)
  tags: {
    type: [String],
    default: []
  },

  // Marca de homebrew
  isHomebrew: {
    type: Boolean,
    default: true
  },

  // 👉 Estado de disponibilidad en el sistema (para enable/disable)
  isEnabled: {
    type: Boolean,
    default: true
  },
  
  // Referencia interna (por ejemplo “Pack Dotes Velthera v1”)
  source: {
    type: String,
    default: ""
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Actualizar updatedAt antes de guardar
featSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const FeatModel = mongoose.model("Feat", featSchema);
export default FeatModel;
