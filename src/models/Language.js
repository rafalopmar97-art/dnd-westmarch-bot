// src/models/Language.js
import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
  // Nombre del lenguaje: "Común", "Élfico", etc.
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  // Categoría general
  category: {
    type: String,
    enum: ["standard", "exotic", "secret", "other"],
    default: "standard"
  },

  // Escritura (si quieres usarlo en handouts / flavor)
  script: {
    type: String,
    default: ""
  },

  // Razas / culturas que típicamente lo hablan (texto creado por ti)
  typicalSpeakers: {
    type: [String],
    default: []  // Ej: ["Elfos del bosque", "Cortes feéricas"]
  },

  // Descripción corta escrita por ti (sin copiar del SRD/libros)
  description: {
    type: String,
    default: ""
  },

  // Marca si es algo inventado por ti (homebrew)
  isHomebrew: {
    type: Boolean,
    default: true
  },

  // 👉 Para poder enable/disable
  isActive: {
    type: Boolean,
    default: true
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Actualiza updatedAt
languageSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const LanguageModel = mongoose.model("Language", languageSchema);
export default LanguageModel;
