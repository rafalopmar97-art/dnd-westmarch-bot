// src/models/Background.js
import mongoose from "mongoose";

// Rasgo especial del trasfondo (ej: "Contacto Criminal", pero con tu propio texto)
const backgroundFeatureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    shortDescription: {
      type: String,
      default: "" // Resumen breve escrito por ti
    }
  },
  { _id: false }
);

// Esquema principal de Background
const backgroundSchema = new mongoose.Schema({
  // Nombre del trasfondo: "Forastero", "Erudito", etc. (nombre definido por ti)
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  // Descripción narrativa del trasfondo (texto propio, no copiado)
  description: {
    type: String,
    default: ""
  },

  // Habilidades en las que el personaje gana competencia
  // Ej: ["Athletics", "Survival"]
  skillProficiencies: {
    type: [String],
    default: []
  },

  // Competencias de herramientas (herramientas de artesano, instrumentos musicales, kits, etc.)
  // Ej: ["Thieves' Tools", "Disguise Kit"]
  toolProficiencies: {
    type: [String],
    default: []
  },

  // Lenguajes que el trasfondo concede automáticamente
  // Nombres que coincidan con tus documentos de Language
  languagesGranted: {
    type: [String],
    default: []
  },

  // Lenguajes extra a elección que el trasfondo permite
  extraLanguageChoices: {
    type: Number,
    default: 0
  },

  // Equipo inicial descrito por ti
  startingEquipment: {
    type: [String],
    default: []
  },

  // Rasgo especial del trasfondo
  feature: {
    type: backgroundFeatureSchema,
    default: null
  },

  // Rasgos de personalidad, ideales, vínculos y defectos
  personalityTraits: {
    type: [String],
    default: []
  },
  ideals: {
    type: [String],
    default: []
  },
  bonds: {
    type: [String],
    default: []
  },
  flaws: {
    type: [String],
    default: []
  },

  // Marca si es contenido homebrew tuyo
  isHomebrew: {
    type: Boolean,
    default: true
  },

  // 👉 Estado de disponibilidad en el sistema (para enable/disable)
  isEnabled: {
    type: Boolean,
    default: true
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware para updatedAt
backgroundSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const BackgroundModel = mongoose.model("Background", backgroundSchema);
export default BackgroundModel;
