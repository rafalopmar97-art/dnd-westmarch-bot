// src/models/Class.js
import mongoose from "mongoose";

const featureByLevelSchema = new mongoose.Schema(
  {
    level: { type: Number, required: true },      // Nivel donde se obtiene el rasgo
    name: { type: String, required: true },       // Nombre del rasgo ("Second Wind")
    shortDescription: { type: String, default: "" } // Resumen corto escrito por ti
  },
  { _id: false }
);

const multiClassRequirementSchema = new mongoose.Schema(
  {
    ability: { type: String, required: true }, // "STR", "DEX", "INT", etc.
    minimum: { type: Number, required: true }  // mínimo requerido (ej. 13)
  },
  { _id: false }
);

const classSchema = new mongoose.Schema({
  // Nombre de la clase, p.ej. "Fighter"
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  // Dado de golpe: 6, 8, 10, 12
  hitDie: {
    type: Number,
    required: true,
    enum: [6, 8, 10, 12]
  },

  // Descripción breve (ESCRITA POR TI, no copiada de libros)
  description: {
    type: String,
    default: ""
  },

  // Atributos principales: ["STR"], ["DEX"], etc.
  primaryAbility: {
    type: [String],
    default: []
  },

  // Competencias de salvación: ["STR","CON"], etc.
  savingThrows: {
    type: [String],
    default: []
  },

  // Competencias de armadura
  armorProficiencies: {
    type: [String],
    default: []
  },

  // Competencias de armas
  weaponProficiencies: {
    type: [String],
    default: []
  },

  // Competencias de herramientas
  toolProficiencies: {
    type: [String],
    default: []
  },

  // Habilidades: cuántas elige y de qué lista
  skillChoices: {
    total: { type: Number, default: 0 },
    options: { type: [String], default: [] }
  },

  // Rasgos por nivel (solo nombres + resumen corto)
  featuresByLevel: {
    type: [featureByLevelSchema],
    default: []
  },

  // 🔹 Requisitos de multiclase
  multiClassRequirements: {
    abilities: {
      type: [multiClassRequirementSchema],
      default: []
    },
    note: {
      type: String,
      default: "" // aquí puedes poner un texto tipo "Debe cumplir todos los atributos indicados."
    }
  },

  // Timestamps manuales
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Actualizar updatedAt antes de guardar
classSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const ClassModel = mongoose.model("Class", classSchema);
export default ClassModel;
