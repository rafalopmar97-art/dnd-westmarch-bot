// src/models/Race.js
import mongoose from "mongoose";

const abilityBonusSchema = new mongoose.Schema(
  {
    ability: { type: String, required: true }, // "STR", "DEX", etc.
    value: { type: Number, required: true }    // +1, +2
  },
  { _id: false }
);

const traitSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },         // "Darkvision"
    shortDescription: { type: String, default: "" } // resumen escrito por ti
  },
  { _id: false }
);

const raceSchema = new mongoose.Schema({
  // Nombre de la raza: "Human", "Elf", "Dwarf", "Harengon", etc.
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  // Bonificadores de características
  abilityBonuses: {
    type: [abilityBonusSchema],
    default: []
  },

  // Velocidad base
  speed: {
    type: Number,
    default: 30
  },

  // Tamaño: Tiny / Small / Medium / Large
  size: {
    type: String,
    default: "Medium"
  },

  // 🔗 Lenguajes conocidos por defecto (referencias a Language)
  languages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language"
    }
  ],

  // 🔗 Opcional: lenguajes adicionales que puede elegir el jugador
  extraLanguages: {
    count: { type: Number, default: 0 },          // Ej: "elige 1 lenguaje adicional"
    allowedCategories: {                          // Usa Language.category para filtrar
      type: [String],
      default: []                                 // Ej: ["standard", "exotic"]
    }
  },

  // Rasgos raciales
  traits: {
    type: [traitSchema],
    default: []
  },

  // Opcional: visión en la oscuridad (simple)
  darkvisionRange: {
    type: Number,
    default: 0 // 0 = sin darkvision, 60 = darkvision 60 ft, etc.
  },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Actualizar updatedAt antes de guardar
raceSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const RaceModel = mongoose.model("Race", raceSchema);
export default RaceModel;
