// src/models/Subclass.js
import mongoose from "mongoose";

const { Schema } = mongoose;

// Rasgos de la subclase por nivel
const subclassFeatureSchema = new Schema(
  {
    level: {
      type: Number,
      required: true, // Nivel en el que se obtiene el rasgo (ej. 3, 7, 10, etc.)
      min: 1,
      max: 20
    },
    name: {
      type: String,
      required: true,
      trim: true // Ej. "Camino del Berserker", "Golpe Divino", etc. (nombre inventado o genérico)
    },
    shortDescription: {
      type: String,
      default: "" // Resumen breve escrito por ti
    }
  },
  { _id: false }
);

const subclassSchema = new Schema({
  // Nombre de la subclase: "Camino del Guerrero Arcano", "Dominio del Sol", etc.
  name: {
    type: String,
    required: true,
    trim: true
    // Puedes dejarlo único global o permitir mismo nombre en varias clases.
    // unique: true
  },

  // Referencia a la clase base (Class)
  classRef: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    required: true
  },

  // Descripción narrativa de la subclase (texto escrito por ti)
  description: {
    type: String,
    default: ""
  },

  // Nivel mínimo al que se puede elegir esta subclase (por defecto 3, estilo 5e)
  minLevel: {
    type: Number,
    default: 3,
    min: 1,
    max: 20
  },

  // Rasgos obtenidos según el nivel
  featuresByLevel: {
    type: [subclassFeatureSchema],
    default: []
  },

  // Marca si es contenido inventado por ti / homebrew
  isHomebrew: {
    type: Boolean,
    default: true
  },

  // Control para activar/desactivar subclases en tu sistema
  isEnabled: {
    type: Boolean,
    default: true
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Índice opcional para evitar duplicar subclases con mismo nombre en la misma clase
subclassSchema.index(
  { name: 1, classRef: 1 },
  { unique: true }
);

// Actualizar updatedAt antes de guardar
subclassSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const SubclassModel = mongoose.model("Subclass", subclassSchema);
export default SubclassModel;
