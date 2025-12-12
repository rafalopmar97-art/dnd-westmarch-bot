// src/models/GuildEconomyConfig.js
import mongoose from "mongoose";

const guildEconomyConfigSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  // Nombre "bonito" de la moneda
  // ej: "Oro", "Monedas de Velthera", "Créditos arcanos"
  currencyName: {
    type: String,
    default: "oro",
    trim: true
  },

  // Abreviatura
  // ej: "gp", "MV", "cr"
  currencyShort: {
    type: String,
    default: "gp",
    trim: true
  },

  // Emoji o icono de la moneda
  // ej: "🪙", "💰", "<:moneda_velthera:1234567890>"
  currencyIcon: {
    type: String,
    default: "🪙",
    trim: true
  },

  // Oro inicial al crear personaje (si lo quieres usar)
  startingGold: {
    type: Number,
    default: 0
  },

  // ¿Está activa la economía en este servidor?
  isEnabled: {
    type: Boolean,
    default: true
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Actualizar updatedAt antes de guardar
guildEconomyConfigSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const GuildEconomyConfigModel = mongoose.model(
  "GuildEconomyConfig",
  guildEconomyConfigSchema
);

export default GuildEconomyConfigModel;
