// src/utils/economyConfig.js
import GuildEconomyConfigModel from "../models/GuildEconomyConfig.js";

const DEFAULT_ECONOMY = {
  currencyName: "oro",
  currencyShort: "gp",
  currencyIcon: "🪙",
  startingGold: 0
};

/**
 * Devuelve la configuración de economía del servidor.
 * - Si no existe en DB, devuelve valores por defecto.
 */
export async function getEconomyConfig(guildId) {
  if (!guildId) {
    // Por si acaso se llama desde DM o algo raro
    return { ...DEFAULT_ECONOMY, guildId: null };
  }

  const doc = await GuildEconomyConfigModel.findOne({ guildId }).lean();

  if (!doc) {
    return {
      guildId,
      ...DEFAULT_ECONOMY
    };
  }

  return {
    guildId: doc.guildId,
    currencyName: doc.currencyName || DEFAULT_ECONOMY.currencyName,
    currencyShort: doc.currencyShort || DEFAULT_ECONOMY.currencyShort,
    currencyIcon: doc.currencyIcon || DEFAULT_ECONOMY.currencyIcon,
    startingGold:
      typeof doc.startingGold === "number"
        ? doc.startingGold
        : DEFAULT_ECONOMY.startingGold,
    isEnabled: typeof doc.isEnabled === "boolean" ? doc.isEnabled : true
  };
}
