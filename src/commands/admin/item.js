// src/commands/admin/item.js
import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder
} from "discord.js";

import ItemModel from "../../models/Item.js";
import CharacterModel from "../../models/Character.js";
import { getEconomyConfig } from "../../utils/economyConfig.js";

// ===================================================
// Helpers comunes
// ===================================================
function formatBonus(num) {
  if (!num || num === 0) return "+0";
  return num > 0 ? `+${num}` : `${num}`;
}

function prettyAbilityMode(mode) {
  switch (mode) {
    case "str":
      return "Fuerza";
    case "dex":
      return "Destreza";
    case "str_or_dex_highest":
      return "Fuerza o Destreza (la más alta)";
    case "other":
      return "Especial / otra estadística";
    default:
      return "Fuerza";
  }
}

function buildWeaponBlock(w) {
  if (!w) return "—";

  const lines = [];

  if (w.damageDice || w.damageType) {
    lines.push(
      `• Daño: **${w.damageDice || "—"}${
        w.damageType ? ` (${w.damageType})` : ""
      }**`
    );
  }

  if (w.properties && w.properties.length > 0) {
    lines.push(`• Propiedades: ${w.properties.join(", ")}`);
  }

  if (w.rangeNormal || w.rangeMax) {
    const base = w.rangeNormal ? `${w.rangeNormal} ft` : "";
    const max = w.rangeMax ? `/${w.rangeMax} ft` : "";
    lines.push(`• Alcance: ${base}${max}`);
  } else if (w.reach) {
    lines.push(`• Alcance: ${w.reach} ft`);
  }

  lines.push(`• Habilidad de ataque: **${prettyAbilityMode(w.abilityMode)}**`);

  if (w.magicBonusAttack || w.magicBonusDamage) {
    lines.push(
      `• Bono mágico: ataque ${formatBonus(
        w.magicBonusAttack
      )}, daño ${formatBonus(w.magicBonusDamage)}`
    );
  }

  return lines.join("\n") || "—";
}

function buildArmorBlock(a) {
  if (!a) return "—";

  const lines = [];

  lines.push(
    `• Tipo de armadura: **${
      a.armorType === "light"
        ? "Ligera"
        : a.armorType === "medium"
        ? "Intermedia"
        : a.armorType === "heavy"
        ? "Pesada"
        : a.armorType === "shield"
        ? "Escudo"
        : "Otra"
    }**`
  );

  lines.push(`• CA base: **${a.baseAC ?? 10}**`);

  if (a.allowsDexBonus) {
    if (typeof a.maxDexBonus === "number") {
      lines.push(`• Bonificador de Destreza: hasta **+${a.maxDexBonus}**`);
    } else {
      lines.push("• Bonificador de Destreza completo");
    }
  } else {
    lines.push("• No añade bonificador de Destreza");
  }

  lines.push(
    `• Sigilo: ${
      a.hasStealthDisadvantage
        ? "❌ Desventaja en Sigilo"
        : "✅ Sin desventaja en Sigilo"
    }`
  );

  if (a.magicBonusAC) {
    lines.push(`• Bono mágico a la CA: **${formatBonus(a.magicBonusAC)}**`);
  }

  return lines.join("\n") || "—";
}

function buildItemEmbed(item, eco) {
  const typeText = item.type || item.category || "—";
  const rarityText = item.rarity || "common";
  const weightText =
    typeof item.weight === "number" ? `${item.weight}` : "0";

  const baseValue = typeof item.value === "number" ? item.value : 0;
  const safeBaseValue = Math.max(1, baseValue);
  const valueText = `${eco.currencyIcon} ${safeBaseValue} ${eco.currencyShort}`;

  const shopPriceRaw =
    item.shopPrice && item.shopPrice > 0 ? item.shopPrice : safeBaseValue;
  const shopPrice = Math.max(1, shopPriceRaw);
  const shopText = `${eco.currencyIcon} ${shopPrice} ${eco.currencyShort}`;

  const embed = new EmbedBuilder()
    .setTitle(`🎒 Objeto: ${item.name}`)
    .setColor(item.isEnabled ? "Green" : "Red")
    .setDescription(item.description || "Sin descripción.")
    .addFields(
      { name: "Tipo", value: typeText, inline: true },
      { name: "Rareza", value: rarityText, inline: true },
      { name: "Peso", value: weightText, inline: true },
      { name: "Valor base", value: valueText, inline: true },
      {
        name: "Precio de tienda",
        value: shopText,
        inline: true
      },
      {
        name: "Flags",
        value: [
          item.isInStore ? "🛒 En tienda" : "❌ No en tienda",
          item.isBuyable ? "✅ Buy" : "🚫 Buy",
          item.isSellable ? "✅ Sell" : "🚫 Sell",
          item.isTradeable ? "✅ Trade" : "🚫 Trade"
        ].join(" | "),
        inline: false
      },
      {
        name: "ObjectId",
        value: `\`${item._id.toString()}\``,
        inline: false
      }
    );

  if (item.type === "weapon" && item.weaponData) {
    embed.addFields({
      name: "⚔️ Detalles de arma",
      value: buildWeaponBlock(item.weaponData),
      inline: false
    });
  }

  if (item.type === "armor" && item.armorData) {
    embed.addFields({
      name: "🛡️ Detalles de armadura",
      value: buildArmorBlock(item.armorData),
      inline: false
    });
  }

  return embed;
}

// ===================================================
// COMMAND DEFINITION
// ===================================================
const data = new SlashCommandBuilder()
  .setName("item")
  .setDescription("Administra y usa los objetos del sistema.")

  // ======================
  //  ADMIN: ADD (GENÉRICO)
  // ======================
  .addSubcommand(sub =>
    sub
      .setName("add")
      .setDescription(
        "Crea un nuevo objeto genérico (sin datos de arma/armadura)."
      )
      .addStringOption(o =>
        o
          .setName("name")
          .setDescription("Nombre del objeto")
          .setRequired(true)
      )
      .addStringOption(o =>
        o
          .setName("type")
          .setDescription("Tipo de objeto")
          .addChoices(
            { name: "Arma", value: "weapon" },
            { name: "Armadura", value: "armor" },
            { name: "Equipo", value: "gear" },
            { name: "Consumible", value: "consumable" },
            { name: "Herramienta", value: "tool" },
            { name: "Otro", value: "other" }
          )
          .setRequired(true)
      )
      .addStringOption(o =>
        o
          .setName("rarity")
          .setDescription("Rareza del objeto")
          .addChoices(
            { name: "Ninguna / genérica", value: "none" },
            { name: "Común", value: "common" },
            { name: "Poco común", value: "uncommon" },
            { name: "Raro", value: "rare" },
            { name: "Muy raro", value: "very_rare" },
            { name: "Legendario", value: "legendary" },
            { name: "Artefacto", value: "artifact" }
          )
          .setRequired(false)
      )
      .addNumberOption(o =>
        o
          .setName("value")
          .setDescription("Valor base de la moneda")
          .setRequired(false)
      )
      .addNumberOption(o =>
        o
          .setName("weight")
          .setDescription("Peso")
          .setRequired(false)
      )
      .addStringOption(o =>
        o
          .setName("description")
          .setDescription("Descripción corta")
          .setRequired(false)
      )
  )

  // ======================
  //  ADMIN: ADD_WEAPON
  // ======================
  .addSubcommand(sub =>
    sub
      .setName("add_weapon")
      .setDescription("Crea un nuevo objeto de tipo arma.")
      .addStringOption(o =>
        o
          .setName("name")
          .setDescription("Nombre del arma")
          .setRequired(true)
      )
      .addStringOption(o =>
        o
          .setName("rarity")
          .setDescription("Rareza del arma")
          .addChoices(
            { name: "Ninguna / genérica", value: "none" },
            { name: "Común", value: "common" },
            { name: "Poco común", value: "uncommon" },
            { name: "Raro", value: "rare" },
            { name: "Muy raro", value: "very_rare" },
            { name: "Legendario", value: "legendary" },
            { name: "Artefacto", value: "artifact" }
          )
          .setRequired(false)
      )
      .addNumberOption(o =>
        o
          .setName("value")
          .setDescription("Valor base de la moneda")
          .setRequired(false)
      )
      .addNumberOption(o =>
        o
          .setName("weight")
          .setDescription("Peso")
          .setRequired(false)
      )
      .addStringOption(o =>
        o
          .setName("description")
          .setDescription("Descripción corta")
          .setRequired(false)
      )
      .addStringOption(o =>
        o
          .setName("weapon_damage_dice")
          .setDescription("Daño del arma (ej. 1d8, 2d6)")
          .setRequired(false)
      )
      .addStringOption(o =>
        o
          .setName("weapon_damage_type")
          .setDescription("Tipo de daño (ej. slashing, piercing, fire)")
          .setRequired(false)
      )
      .addStringOption(o =>
        o
          .setName("weapon_properties")
          .setDescription(
            "Propiedades (light, heavy, finesse...) separadas por comas"
          )
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("weapon_reach")
          .setDescription("Alcance cuerpo a cuerpo (ft), ej. 5 o 10")
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("weapon_range_normal")
          .setDescription("Rango normal (ft) si es a distancia/arrojadiza")
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("weapon_range_max")
          .setDescription("Rango máximo (ft) si es a distancia/arrojadiza")
          .setRequired(false)
      )
      .addStringOption(o =>
        o
          .setName("weapon_ability_mode")
          .setDescription("Estadística usada para ataque/daño")
          .addChoices(
            { name: "Fuerza", value: "str" },
            { name: "Destreza", value: "dex" },
            {
              name: "Fuerza o Destreza (la más alta)",
              value: "str_or_dex_highest"
            },
            { name: "Otra / especial", value: "other" }
          )
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("weapon_magic_bonus_attack")
          .setDescription("Bono mágico al ataque (+1, +2, +3)")
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("weapon_magic_bonus_damage")
          .setDescription("Bono mágico al daño (+1, +2, +3)")
          .setRequired(false)
      )
  )

  // ======================
  //  ADMIN: ADD_ARMOR
  // ======================
  .addSubcommand(sub =>
    sub
      .setName("add_armor")
      .setDescription("Crea un nuevo objeto de tipo armadura.")
      .addStringOption(o =>
        o
          .setName("name")
          .setDescription("Nombre de la armadura")
          .setRequired(true)
      )
      .addStringOption(o =>
        o
          .setName("rarity")
          .setDescription("Rareza de la armadura")
          .addChoices(
            { name: "Ninguna / genérica", value: "none" },
            { name: "Común", value: "common" },
            { name: "Poco común", value: "uncommon" },
            { name: "Raro", value: "rare" },
            { name: "Muy raro", value: "very_rare" },
            { name: "Legendario", value: "legendary" },
            { name: "Artefacto", value: "artifact" }
          )
          .setRequired(false)
      )
      .addNumberOption(o =>
        o
          .setName("value")
          .setDescription("Valor base de la moneda")
          .setRequired(false)
      )
      .addNumberOption(o =>
        o
          .setName("weight")
          .setDescription("Peso")
          .setRequired(false)
      )
      .addStringOption(o =>
        o
          .setName("description")
          .setDescription("Descripción corta")
          .setRequired(false)
      )
      .addStringOption(o =>
        o
          .setName("armor_type")
          .setDescription("Tipo de armadura")
          .addChoices(
            { name: "Ligera", value: "light" },
            { name: "Intermedia", value: "medium" },
            { name: "Pesada", value: "heavy" },
            { name: "Escudo", value: "shield" },
            { name: "Otra", value: "other" }
          )
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("armor_base_ac")
          .setDescription("CA base (ej. 11, 12, 14)")
          .setRequired(false)
      )
      .addBooleanOption(o =>
        o
          .setName("armor_allows_dex_bonus")
          .setDescription("¿Aplica bonificador de Destreza?")
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("armor_max_dex_bonus")
          .setDescription("Máximo bonificador de Destreza (ej. +2)")
          .setRequired(false)
      )
      .addBooleanOption(o =>
        o
          .setName("armor_stealth_disadvantage")
          .setDescription("¿Da desventaja en Sigilo?")
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("armor_magic_bonus_ac")
          .setDescription("Bono mágico a la CA (+1, +2, +3)")
          .setRequired(false)
      )
  )

  // ======================
  //  ADMIN: DELETE
  // ======================
  .addSubcommand(sub =>
    sub
      .setName("delete")
      .setDescription("Elimina un objeto por nombre.")
      .addStringOption(o =>
        o
          .setName("name")
          .setDescription("Nombre del objeto a eliminar")
          .setRequired(true)
          .setAutocomplete(true)
      )
  )

  // ======================
  //  ADMIN: ENABLE
  // ======================
  .addSubcommand(sub =>
    sub
      .setName("enable")
      .setDescription("Activa un objeto.")
      .addStringOption(o =>
        o
          .setName("name")
          .setDescription("Nombre del objeto a activar")
          .setRequired(true)
          .setAutocomplete(true)
      )
  )

  // ======================
  //  ADMIN: DISABLE
  // ======================
  .addSubcommand(sub =>
    sub
      .setName("disable")
      .setDescription("Desactiva un objeto.")
      .addStringOption(o =>
        o
          .setName("name")
          .setDescription("Nombre del objeto a desactivar")
          .setRequired(true)
          .setAutocomplete(true)
      )
  )

  // ======================
  //  ADMIN: EDIT (BÁSICO)
  // ======================
  .addSubcommand(sub =>
    sub
      .setName("edit")
      .setDescription("Edita los datos básicos de un objeto.")
      .addStringOption(o =>
        o
          .setName("name")
          .setDescription("Nombre del objeto a editar")
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addStringOption(o =>
        o
          .setName("type")
          .setDescription("Nuevo tipo (opcional)")
          .addChoices(
            { name: "Arma", value: "weapon" },
            { name: "Armadura", value: "armor" },
            { name: "Equipo", value: "gear" },
            { name: "Consumible", value: "consumable" },
            { name: "Herramienta", value: "tool" },
            { name: "Otro", value: "other" }
          )
          .setRequired(false)
      )
      .addStringOption(o =>
        o
          .setName("rarity")
          .setDescription("Nueva rareza")
          .addChoices(
            { name: "Ninguna / genérica", value: "none" },
            { name: "Común", value: "common" },
            { name: "Poco común", value: "uncommon" },
            { name: "Raro", value: "rare" },
            { name: "Muy raro", value: "very_rare" },
            { name: "Legendario", value: "legendary" },
            { name: "Artefacto", value: "artifact" }
          )
          .setRequired(false)
      )
      .addNumberOption(o =>
        o
          .setName("value")
          .setDescription("Nuevo valor base")
          .setRequired(false)
      )
      .addNumberOption(o =>
        o
          .setName("weight")
          .setDescription("Nuevo peso")
          .setRequired(false)
      )
      .addStringOption(o =>
        o
          .setName("description")
          .setDescription("Nueva descripción")
          .setRequired(false)
      )
      .addBooleanOption(o =>
        o
          .setName("in_store")
          .setDescription("¿Aparece en la tienda?")
          .setRequired(false)
      )
      .addBooleanOption(o =>
        o
          .setName("buyable")
          .setDescription("¿Se puede comprar?")
          .setRequired(false)
      )
      .addBooleanOption(o =>
        o
          .setName("sellable")
          .setDescription("¿Se puede vender a la tienda?")
          .setRequired(false)
      )
      .addBooleanOption(o =>
        o
          .setName("tradeable")
          .setDescription("¿Se puede intercambiar?")
          .setRequired(false)
      )
      .addNumberOption(o =>
        o
          .setName("shop_price")
          .setDescription("Precio específico de tienda (0 = usar valor base)")
          .setRequired(false)
      )
  )

  // ======================
  //  ADMIN: EDIT_WEAPON
  // ======================
  .addSubcommand(sub =>
    sub
      .setName("edit_weapon")
      .setDescription("Edita los datos de arma de un objeto.")
      .addStringOption(o =>
        o
          .setName("name")
          .setDescription("Nombre del objeto (arma) a editar")
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addStringOption(o =>
        o
          .setName("weapon_damage_dice")
          .setDescription("Nuevo daño del arma (ej. 1d8, 2d6)")
          .setRequired(false)
      )
      .addStringOption(o =>
        o
          .setName("weapon_damage_type")
          .setDescription("Nuevo tipo de daño")
          .setRequired(false)
      )
      .addStringOption(o =>
        o
          .setName("weapon_properties")
          .setDescription("Nuevas propiedades (separadas por comas)")
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("weapon_reach")
          .setDescription("Nuevo alcance cuerpo a cuerpo (ft)")
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("weapon_range_normal")
          .setDescription("Nuevo rango normal (ft)")
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("weapon_range_max")
          .setDescription("Nuevo rango máximo (ft)")
          .setRequired(false)
      )
      .addStringOption(o =>
        o
          .setName("weapon_ability_mode")
          .setDescription("Nueva estadística usada para ataque/daño")
          .addChoices(
            { name: "Fuerza", value: "str" },
            { name: "Destreza", value: "dex" },
            {
              name: "Fuerza o Destreza (la más alta)",
              value: "str_or_dex_highest"
            },
            { name: "Otra / especial", value: "other" }
          )
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("weapon_magic_bonus_attack")
          .setDescription("Nuevo bono mágico al ataque")
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("weapon_magic_bonus_damage")
          .setDescription("Nuevo bono mágico al daño")
          .setRequired(false)
      )
  )

  // ======================
  //  ADMIN: EDIT_ARMOR
  // ======================
  .addSubcommand(sub =>
    sub
      .setName("edit_armor")
      .setDescription("Edita los datos de armadura de un objeto.")
      .addStringOption(o =>
        o
          .setName("name")
          .setDescription("Nombre del objeto (armadura) a editar")
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addStringOption(o =>
        o
          .setName("armor_type")
          .setDescription("Nuevo tipo de armadura")
          .addChoices(
            { name: "Ligera", value: "light" },
            { name: "Intermedia", value: "medium" },
            { name: "Pesada", value: "heavy" },
            { name: "Escudo", value: "shield" },
            { name: "Otra", value: "other" }
          )
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("armor_base_ac")
          .setDescription("Nueva CA base")
          .setRequired(false)
      )
      .addBooleanOption(o =>
        o
          .setName("armor_allows_dex_bonus")
          .setDescription("¿Aplica bonificador de Destreza?")
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("armor_max_dex_bonus")
          .setDescription("Nuevo máximo de bonificador de Destreza")
          .setRequired(false)
      )
      .addBooleanOption(o =>
        o
          .setName("armor_stealth_disadvantage")
          .setDescription("¿Da desventaja en Sigilo?")
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("armor_magic_bonus_ac")
          .setDescription("Nuevo bono mágico a la CA")
          .setRequired(false)
      )
  )

  // ======================
  //  INFO → MENÚ
  // ======================
  .addSubcommand(sub =>
    sub.setName("info").setDescription("Muestra información de un objeto (menú).")
  )

  // ======================
  //  ECONOMÍA: STORE
  // ======================
  .addSubcommand(sub =>
    sub
      .setName("store")
      .setDescription("Muestra todos los objetos disponibles en la tienda.")
  )

  // ======================
  //  ECONOMÍA: BUY
  // ======================
  .addSubcommand(sub =>
    sub
      .setName("buy")
      .setDescription(
        "Compra un objeto de la tienda para uno de tus personajes."
      )
      .addStringOption(o =>
        o
          .setName("item")
          .setDescription("Nombre del objeto a comprar")
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addStringOption(o =>
        o
          .setName("character")
          .setDescription("Nombre de tu personaje que compra")
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addIntegerOption(o =>
        o
          .setName("quantity")
          .setDescription("Cantidad (por defecto 1)")
          .setRequired(false)
      )
  )

  // ======================
  //  ECONOMÍA: SELL
  // ======================
  .addSubcommand(sub =>
    sub
      .setName("sell")
      .setDescription("Vende un objeto de tu inventario a la tienda.")
      .addStringOption(o =>
        o
          .setName("item")
          .setDescription("Nombre del objeto a vender")
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addStringOption(o =>
        o
          .setName("character")
          .setDescription("Nombre de tu personaje que vende")
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addIntegerOption(o =>
        o
          .setName("quantity")
          .setDescription("Cantidad (por defecto 1)")
          .setRequired(false)
      )
  )

  // ======================
  //  ECONOMÍA: TRADE
  // ======================
  .addSubcommand(sub =>
    sub
      .setName("trade")
      .setDescription("Intercambia un objeto por moneda entre dos personajes.")
      .addStringOption(o =>
        o
          .setName("item")
          .setDescription("Nombre del objeto a intercambiar")
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addStringOption(o =>
        o
          .setName("from_character")
          .setDescription("Nombre del personaje que entrega el objeto")
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addUserOption(o =>
        o
          .setName("to_user")
          .setDescription("Jugador que recibe el objeto")
          .setRequired(true)
      )
      .addStringOption(o =>
        o
          .setName("to_character")
          .setDescription("Nombre del personaje que paga la moneda")
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addIntegerOption(o =>
        o
          .setName("gold")
          .setDescription("Cantidad de moneda que se paga a cambio")
          .setRequired(true)
      )
  )

  // ======================
  //  ECONOMÍA: CONFIG_SELL_RATIO
  // ======================
  .addSubcommand(sub =>
    sub
      .setName("config_sell_ratio")
      .setDescription(
        "Configura el ratio al que la tienda compra objetos (por defecto 0.5)."
      )
      .addNumberOption(o =>
        o
          .setName("ratio")
          .setDescription("Entre 0.1 y 1.0 (ej. 0.5 = 50% del valor).")
          .setRequired(true)
      )
  )

  // ======================
  //  MOD: GIVE
  // ======================
  .addSubcommand(sub =>
    sub
      .setName("give")
      .setDescription("Da un objeto a un personaje (moderación).")
      .addStringOption(o =>
        o
          .setName("item")
          .setDescription("Nombre del objeto a dar")
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addStringOption(o =>
        o
          .setName("character")
          .setDescription("Nombre del personaje que recibe el objeto")
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addUserOption(o =>
        o
          .setName("user")
          .setDescription("Dueño del personaje (opcional, para desambiguar)")
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("quantity")
          .setDescription("Cantidad (por defecto 1)")
          .setRequired(false)
      )
  )

  // ======================
  //  MOD: TAKE
  // ======================
  .addSubcommand(sub =>
    sub
      .setName("take")
      .setDescription(
        "Quita un objeto del inventario de un personaje (moderación)."
      )
      .addStringOption(o =>
        o
          .setName("item")
          .setDescription("Nombre del objeto a quitar")
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addStringOption(o =>
        o
          .setName("character")
          .setDescription(
            "Nombre del personaje al que se le quita el objeto"
          )
          .setRequired(true)
          .setAutocomplete(true)
      )
      .addUserOption(o =>
        o
          .setName("user")
          .setDescription("Dueño del personaje (opcional, para desambiguar)")
          .setRequired(false)
      )
      .addIntegerOption(o =>
        o
          .setName("quantity")
          .setDescription("Cantidad (por defecto 1)")
          .setRequired(false)
      )
  );

// ===================================================
// ADMIN HANDLERS
// ===================================================
async function handleAdd(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden crear objetos.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();
  const type = interaction.options.getString("type");
  const rarity = interaction.options.getString("rarity") || "common";
  const value = interaction.options.getNumber("value") ?? 0;
  const weight = interaction.options.getNumber("weight") ?? 0;
  const description = interaction.options.getString("description") || "";

  const existing = await ItemModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (existing) {
    return interaction.reply({
      content: `❌ Ya existe un objeto llamado **${existing.name}**.`,
      ephemeral: true
    });
  }

  const item = await ItemModel.create({
    name,
    type,
    rarity,
    value,
    weight,
    description,
    isHomebrew: true,
    isEnabled: true,
    isInStore: true,
    isBuyable: true,
    isSellable: true,
    isTradeable: true
  });

  const eco = await getEconomyConfig(interaction.guild.id);
  const embed = buildItemEmbed(item, eco);

  return interaction.reply({
    content: "✅ Objeto creado correctamente.",
    embeds: [embed],
    ephemeral: true
  });
}

async function handleAddWeapon(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden crear objetos.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();
  const rarity = interaction.options.getString("rarity") || "common";
  const value = interaction.options.getNumber("value") ?? 0;
  const weight = interaction.options.getNumber("weight") ?? 0;
  const description = interaction.options.getString("description") || "";

  const existing = await ItemModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (existing) {
    return interaction.reply({
      content: `❌ Ya existe un objeto llamado **${existing.name}**.`,
      ephemeral: true
    });
  }

  const weaponDamageDice = interaction.options.getString("weapon_damage_dice");
  const weaponDamageType = interaction.options.getString("weapon_damage_type");
  const weaponPropertiesRaw = interaction.options.getString(
    "weapon_properties"
  );
  const weaponReach = interaction.options.getInteger("weapon_reach");
  const weaponRangeNormal =
    interaction.options.getInteger("weapon_range_normal");
  const weaponRangeMax = interaction.options.getInteger("weapon_range_max");
  const weaponAbilityMode =
    interaction.options.getString("weapon_ability_mode") || "str";
  const weaponMagicBonusAttack =
    interaction.options.getInteger("weapon_magic_bonus_attack") ?? 0;
  const weaponMagicBonusDamage =
    interaction.options.getInteger("weapon_magic_bonus_damage") ?? 0;

  const weaponData = {
    abilityMode: weaponAbilityMode,
    magicBonusAttack: weaponMagicBonusAttack,
    magicBonusDamage: weaponMagicBonusDamage
  };

  if (weaponDamageDice) weaponData.damageDice = weaponDamageDice;
  if (weaponDamageType) weaponData.damageType = weaponDamageType;
  if (weaponPropertiesRaw) {
    weaponData.properties = weaponPropertiesRaw
      .split(",")
      .map(p => p.trim())
      .filter(Boolean);
  }
  if (weaponReach !== null) weaponData.reach = weaponReach;
  if (weaponRangeNormal !== null) weaponData.rangeNormal = weaponRangeNormal;
  if (weaponRangeMax !== null) weaponData.rangeMax = weaponRangeMax;

  const item = await ItemModel.create({
    name,
    type: "weapon",
    rarity,
    value,
    weight,
    description,
    weaponData,
    isHomebrew: true,
    isEnabled: true,
    isInStore: true,
    isBuyable: true,
    isSellable: true,
    isTradeable: true
  });

  const eco = await getEconomyConfig(interaction.guild.id);
  const embed = buildItemEmbed(item, eco);

  return interaction.reply({
    content: "✅ Arma creada correctamente.",
    embeds: [embed],
    ephemeral: true
  });
}

async function handleAddArmor(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden crear objetos.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();
  const rarity = interaction.options.getString("rarity") || "common";
  const value = interaction.options.getNumber("value") ?? 0;
  const weight = interaction.options.getNumber("weight") ?? 0;
  const description = interaction.options.getString("description") || "";

  const existing = await ItemModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (existing) {
    return interaction.reply({
      content: `❌ Ya existe un objeto llamado **${existing.name}**.`,
      ephemeral: true
    });
  }

  const armorType = interaction.options.getString("armor_type") || "light";
  const armorBaseAC = interaction.options.getInteger("armor_base_ac") ?? 10;
  const armorAllowsDexBonus =
    interaction.options.getBoolean("armor_allows_dex_bonus") ?? true;
  const armorMaxDexBonus =
    interaction.options.getInteger("armor_max_dex_bonus") ?? null;
  const armorStealthDisadvantage =
    interaction.options.getBoolean("armor_stealth_disadvantage") ?? false;
  const armorMagicBonusAC =
    interaction.options.getInteger("armor_magic_bonus_ac") ?? 0;

  const armorData = {
    armorType,
    baseAC: armorBaseAC,
    allowsDexBonus: armorAllowsDexBonus,
    hasStealthDisadvantage: armorStealthDisadvantage,
    magicBonusAC: armorMagicBonusAC
  };

  if (armorMaxDexBonus !== null) {
    armorData.maxDexBonus = armorMaxDexBonus;
  }

  const item = await ItemModel.create({
    name,
    type: "armor",
    rarity,
    value,
    weight,
    description,
    armorData,
    isHomebrew: true,
    isEnabled: true,
    isInStore: true,
    isBuyable: true,
    isSellable: true,
    isTradeable: true
  });

  const eco = await getEconomyConfig(interaction.guild.id);
  const embed = buildItemEmbed(item, eco);

  return interaction.reply({
    content: "✅ Armadura creada correctamente.",
    embeds: [embed],
    ephemeral: true
  });
}

async function handleDelete(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden eliminar objetos.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const item = await ItemModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!item) {
    return interaction.reply({
      content: `❌ No encontré ningún objeto llamado **${name}**.`,
      ephemeral: true
    });
  }

  await item.deleteOne();

  return interaction.reply({
    content: `🗑️ El objeto **${item.name}** ha sido eliminado.`,
    ephemeral: true
  });
}

async function handleEnable(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden activar objetos.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const item = await ItemModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!item) {
    return interaction.reply({
      content: `❌ No encontré ningún objeto llamado **${name}**.`,
      ephemeral: true
    });
  }

  item.isEnabled = true;
  await item.save();

  return interaction.reply({
    content: `✅ Objeto **${item.name}** activado.`,
    ephemeral: true
  });
}

async function handleDisable(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden desactivar objetos.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const item = await ItemModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!item) {
    return interaction.reply({
      content: `❌ No encontré ningún objeto llamado **${name}**.`,
      ephemeral: true
    });
  }

  item.isEnabled = false;
  await item.save();

  return interaction.reply({
    content: `🚫 Objeto **${item.name}** desactivado.`,
    ephemeral: true
  });
}

async function handleEdit(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden editar objetos.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const item = await ItemModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!item) {
    return interaction.reply({
      content: `❌ No encontré ningún objeto llamado **${name}**.`,
      ephemeral: true
    });
  }

  const type = interaction.options.getString("type");
  const rarity = interaction.options.getString("rarity");
  const value = interaction.options.getNumber("value");
  const weight = interaction.options.getNumber("weight");
  const description = interaction.options.getString("description");
  const inStore = interaction.options.getBoolean("in_store");
  const buyable = interaction.options.getBoolean("buyable");
  const sellable = interaction.options.getBoolean("sellable");
  const tradeable = interaction.options.getBoolean("tradeable");
  const shopPrice = interaction.options.getNumber("shop_price");

  if (type !== null) item.type = type;
  if (rarity !== null) item.rarity = rarity;
  if (value !== null) item.value = value;
  if (weight !== null) item.weight = weight;
  if (description !== null) item.description = description;
  if (inStore !== null) item.isInStore = inStore;
  if (buyable !== null) item.isBuyable = buyable;
  if (sellable !== null) item.isSellable = sellable;
  if (tradeable !== null) item.isTradeable = tradeable;
  if (shopPrice !== null) item.shopPrice = shopPrice;

  await item.save();

  const eco = await getEconomyConfig(interaction.guild.id);
  const embed = buildItemEmbed(item, eco);

  return interaction.reply({
    content: `✏️ Objeto **${item.name}** actualizado.`,
    embeds: [embed],
    ephemeral: true
  });
}

// ===================================================
// EDIT_WEAPON
// ===================================================
async function handleEditWeapon(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden editar objetos.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const item = await ItemModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!item) {
    return interaction.reply({
      content: `❌ No encontré ningún objeto llamado **${name}**.`,
      ephemeral: true
    });
  }

  if (item.type !== "weapon") {
    return interaction.reply({
      content: `❌ **${item.name}** no es un arma (type = ${
        item.type || "sin tipo"
      }).`,
      ephemeral: true
    });
  }

  const damageDice = interaction.options.getString("weapon_damage_dice");
  const damageType = interaction.options.getString("weapon_damage_type");
  const propertiesStr = interaction.options.getString("weapon_properties");
  const reach = interaction.options.getInteger("weapon_reach");
  const rangeNormal = interaction.options.getInteger("weapon_range_normal");
  const rangeMax = interaction.options.getInteger("weapon_range_max");
  const abilityMode = interaction.options.getString("weapon_ability_mode");
  const magicBonusAttack =
    interaction.options.getInteger("weapon_magic_bonus_attack");
  const magicBonusDamage =
    interaction.options.getInteger("weapon_magic_bonus_damage");

  if (!item.weaponData) item.weaponData = {};

  if (damageDice !== null) item.weaponData.damageDice = damageDice;
  if (damageType !== null) item.weaponData.damageType = damageType;
  if (propertiesStr !== null) {
    item.weaponData.properties = propertiesStr
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
  }
  if (reach !== null) item.weaponData.reach = reach;
  if (rangeNormal !== null) item.weaponData.rangeNormal = rangeNormal;
  if (rangeMax !== null) item.weaponData.rangeMax = rangeMax;
  if (abilityMode !== null) item.weaponData.abilityMode = abilityMode;
  if (magicBonusAttack !== null)
    item.weaponData.magicBonusAttack = magicBonusAttack;
  if (magicBonusDamage !== null)
    item.weaponData.magicBonusDamage = magicBonusDamage;

  await item.save();

  const eco = await getEconomyConfig(interaction.guild.id);
  const embed = buildItemEmbed(item, eco);

  return interaction.reply({
    content: `✏️ Datos de arma para **${item.name}** actualizados.`,
    embeds: [embed],
    ephemeral: true
  });
}

// ===================================================
// EDIT_ARMOR
// ===================================================
async function handleEditArmor(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden editar objetos.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const item = await ItemModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!item) {
    return interaction.reply({
      content: `❌ No encontré ningún objeto llamado **${name}**.`,
      ephemeral: true
    });
  }

  if (item.type !== "armor") {
    return interaction.reply({
      content: `❌ **${item.name}** no es una armadura (type = ${
        item.type || "sin tipo"
      }).`,
      ephemeral: true
    });
  }

  const armorType = interaction.options.getString("armor_type");
  const baseAC = interaction.options.getInteger("armor_base_ac");
  const allowsDexBonus =
    interaction.options.getBoolean("armor_allows_dex_bonus");
  const maxDexBonus = interaction.options.getInteger("armor_max_dex_bonus");
  const stealthDis = interaction.options.getBoolean(
    "armor_stealth_disadvantage"
  );
  const magicBonusAC =
    interaction.options.getInteger("armor_magic_bonus_ac");

  if (!item.armorData) item.armorData = {};

  if (armorType !== null) item.armorData.armorType = armorType;
  if (baseAC !== null) item.armorData.baseAC = baseAC;
  if (allowsDexBonus !== null)
    item.armorData.allowsDexBonus = allowsDexBonus;
  if (maxDexBonus !== null) item.armorData.maxDexBonus = maxDexBonus;
  if (stealthDis !== null)
    item.armorData.hasStealthDisadvantage = stealthDis;
  if (magicBonusAC !== null) item.armorData.magicBonusAC = magicBonusAC;

  await item.save();

  const eco = await getEconomyConfig(interaction.guild.id);
  const embed = buildItemEmbed(item, eco);

  return interaction.reply({
    content: `✏️ Datos de armadura para **${item.name}** actualizados.`,
    embeds: [embed],
    ephemeral: true
  });
}

// ===================================================
// INFO (MENÚ)
// ===================================================
async function handleInfo(interaction) {
  const items = await ItemModel.find({ isEnabled: true }).sort({ name: 1 });

  if (items.length === 0) {
    return interaction.reply({
      content: "⚠️ No hay objetos activos para mostrar.",
      ephemeral: true
    });
  }

  const menu = new StringSelectMenuBuilder()
    .setCustomId("item_info_select")
    .setPlaceholder("Elige un objeto para ver su información")
    .addOptions(
      items.slice(0, 25).map(it => ({
        label: it.name,
        value: it._id.toString(),
        description: `${(it.type || "sin tipo")} · ${
          it.rarity || "common"
        }`.slice(0, 90)
      }))
    );

  const row = new ActionRowBuilder().addComponents(menu);

  return interaction.reply({
    content: "Selecciona un objeto del menú:",
    components: [row],
    ephemeral: true
  });
}

// ===================================================
// STORE
// ===================================================
async function handleStore(interaction) {
  const eco = await getEconomyConfig(interaction.guild.id);

  const items = await ItemModel.find({
    isEnabled: true,
    isInStore: true,
    isBuyable: true
  }).sort({ name: 1 });

  if (items.length === 0) {
    return interaction.reply({
      content: "🛒 La tienda está vacía por ahora.",
      ephemeral: true
    });
  }

  const chunks = [];
  const perPage = 10;
  for (let i = 0; i < items.length; i += perPage) {
    chunks.push(items.slice(i, i + perPage));
  }

  const embeds = chunks.map((chunk, idx) => {
    const embed = new EmbedBuilder()
      .setTitle(`🛒 Tienda — Página ${idx + 1}/${chunks.length}`)
      .setColor("Gold");

    embed.setDescription(
      chunk
        .map(it => {
          const baseValue = Math.max(
            1,
            typeof it.value === "number" ? it.value : 0
          );
          const rawShopPrice =
            it.shopPrice && it.shopPrice > 0 ? it.shopPrice : baseValue;
          const shopPrice = Math.max(1, rawShopPrice);

          return `**${it.name}** (${it.type || "tipo desconocido"}) — **${
            eco.currencyIcon
          } ${shopPrice} ${eco.currencyShort}**`;
        })
        .join("\n")
    );

    return embed;
  });

  return interaction.reply({
    embeds,
    ephemeral: true
  });
}

// ===================================================
// BUY
// ===================================================
async function handleBuy(interaction) {
  const itemName = interaction.options.getString("item").trim();
  const charName = interaction.options.getString("character").trim();
  const quantity = interaction.options.getInteger("quantity") ?? 1;

  if (quantity <= 0) {
    return interaction.reply({
      content: "❌ La cantidad debe ser al menos 1.",
      ephemeral: true
    });
  }

  const eco = await getEconomyConfig(interaction.guild.id);

  const item = await ItemModel.findOne({
    name: new RegExp(`^${itemName}$`, "i"),
    isEnabled: true,
    isInStore: true,
    isBuyable: true
  });

  if (!item) {
    return interaction.reply({
      content: `❌ No encontré ningún objeto comprable en tienda llamado **${itemName}**.`,
      ephemeral: true
    });
  }

  const baseValue = Math.max(
    1,
    typeof item.value === "number" ? item.value : 0
  );
  const rawShopPrice =
    item.shopPrice && item.shopPrice > 0 ? item.shopPrice : baseValue;
  const shopPrice = Math.max(1, rawShopPrice);
  const totalCost = shopPrice * quantity;

  const character = await CharacterModel.findOne({
    ownerId: interaction.user.id,
    name: new RegExp(`^${charName}$`, "i")
  });

  if (!character) {
    return interaction.reply({
      content: `❌ No encontré ningún personaje tuyo llamado **${charName}**.`,
      ephemeral: true
    });
  }

  if (character.gold < totalCost) {
    return interaction.reply({
      content:
        `❌ ${character.name} no tiene suficiente ${eco.currencyName}.\n` +
        `Necesita **${eco.currencyIcon} ${totalCost} ${eco.currencyShort}**, ` +
        `pero solo tiene **${eco.currencyIcon} ${character.gold} ${eco.currencyShort}**.`,
      ephemeral: true
    });
  }

  // Restar moneda
  character.gold -= totalCost;

  // Agregar al inventario
  const invEntry = character.inventory.find(
    entry => entry.item.toString() === item._id.toString()
  );

  if (invEntry) {
    invEntry.quantity += quantity;
  } else {
    character.inventory.push({
      item: item._id,
      quantity
    });
  }

  await character.save();

  return interaction.reply({
    content:
      `✅ **${character.name}** compró **${quantity}x ${item.name}** por **${eco.currencyIcon} ${totalCost} ${eco.currencyShort}**.\n` +
      `💰 ${eco.currencyName} actual: **${eco.currencyIcon} ${character.gold} ${eco.currencyShort}**.`,
    ephemeral: true
  });
}

// ===================================================
// SELL
// ===================================================
async function handleSell(interaction) {
  const itemName = interaction.options.getString("item").trim();
  const charName = interaction.options.getString("character").trim();
  const quantity = interaction.options.getInteger("quantity") ?? 1;

  if (quantity <= 0) {
    return interaction.reply({
      content: "❌ La cantidad debe ser al menos 1.",
      ephemeral: true
    });
  }

  const eco = await getEconomyConfig(interaction.guild.id);

  const item = await ItemModel.findOne({
    name: new RegExp(`^${itemName}$`, "i"),
    isEnabled: true,
    isSellable: true
  });

  if (!item) {
    return interaction.reply({
      content: `❌ No encontré ningún objeto vendible llamado **${itemName}**.`,
      ephemeral: true
    });
  }

  const character = await CharacterModel.findOne({
    ownerId: interaction.user.id,
    name: new RegExp(`^${charName}$`, "i")
  });

  if (!character) {
    return interaction.reply({
      content: `❌ No encontré ningún personaje tuyo llamado **${charName}**.`,
      ephemeral: true
    });
  }

  const invEntry = character.inventory.find(
    entry => entry.item.toString() === item._id.toString()
  );

  if (!invEntry || invEntry.quantity < quantity) {
    return interaction.reply({
      content: `❌ ${character.name} no tiene suficientes **${item.name}** para vender (${invEntry?.quantity || 0}/${quantity}).`,
      ephemeral: true
    });
  }

  const baseValueRaw =
    item.shopPrice && item.shopPrice > 0 ? item.shopPrice : item.value || 0;
  const baseValue = Math.max(1, baseValueRaw);

  const sellRatio =
    typeof eco.sellRatio === "number" && eco.sellRatio > 0
      ? eco.sellRatio
      : 0.5;

  const sellPricePerUnit = Math.max(1, Math.floor(baseValue * sellRatio));
  const totalAmount = sellPricePerUnit * quantity;

  // Actualizar inventario
  invEntry.quantity -= quantity;
  if (invEntry.quantity <= 0) {
    character.inventory = character.inventory.filter(
      e => e.item.toString() !== item._id.toString()
    );
  }

  // Sumar moneda
  character.gold += totalAmount;

  await character.save();

  return interaction.reply({
    content:
      `💰 ${character.name} vendió **${quantity}x ${item.name}** por **${eco.currencyIcon} ${totalAmount} ${eco.currencyShort}**.\n` +
      `${eco.currencyName} actual: **${eco.currencyIcon} ${character.gold} ${eco.currencyShort}**.\n` +
      `📊 Ratio de compra de la tienda: **${Math.round(sellRatio * 100)}%** del valor.`,
    ephemeral: true
  });
}

// ===================================================
// TRADE
// ===================================================
async function handleTrade(interaction) {
  const itemName = interaction.options.getString("item").trim();
  const fromCharName = interaction.options
    .getString("from_character")
    .trim();
  const toUser = interaction.options.getUser("to_user");
  const toCharName = interaction.options.getString("to_character").trim();
  const goldAmount = interaction.options.getInteger("gold");

  const eco = await getEconomyConfig(interaction.guild.id);

  if (goldAmount <= 0) {
    return interaction.reply({
      content: `❌ La cantidad de ${eco.currencyName.toLowerCase()} debe ser mayor a 0.`,
      ephemeral: true
    });
  }

  const item = await ItemModel.findOne({
    name: new RegExp(`^${itemName}$`, "i"),
    isEnabled: true,
    isTradeable: true
  });

  if (!item) {
    return interaction.reply({
      content: `❌ No encontré ningún objeto intercambiable llamado **${itemName}**.`,
      ephemeral: true
    });
  }

  // Personaje que entrega el objeto (dueño del comando)
  const fromChar = await CharacterModel.findOne({
    ownerId: interaction.user.id,
    name: new RegExp(`^${fromCharName}$`, "i")
  });

  if (!fromChar) {
    return interaction.reply({
      content: `❌ No encontré tu personaje **${fromCharName}**.`,
      ephemeral: true
    });
  }

  const fromInv = fromChar.inventory.find(
    entry => entry.item.toString() === item._id.toString()
  );

  if (!fromInv || fromInv.quantity < 1) {
    return interaction.reply({
      content: `❌ ${fromChar.name} no tiene al menos 1 **${item.name}** para intercambiar.`,
      ephemeral: true
    });
  }

  // Personaje que paga moneda
  const toChar = await CharacterModel.findOne({
    ownerId: toUser.id,
    name: new RegExp(`^${toCharName}$`, "i")
  });

  if (!toChar) {
    return interaction.reply({
      content: `❌ No encontré el personaje **${toCharName}** del jugador ${toUser.tag}.`,
      ephemeral: true
    });
  }

  if (toChar.gold < goldAmount) {
    return interaction.reply({
      content:
        `❌ ${toChar.name} no tiene suficiente ${eco.currencyName}.\n` +
        `Tiene **${eco.currencyIcon} ${toChar.gold} ${eco.currencyShort}**, pero necesita **${eco.currencyIcon} ${goldAmount} ${eco.currencyShort}**.`,
      ephemeral: true
    });
  }

  // Mover el objeto: fromChar -> toChar
  fromInv.quantity -= 1;
  if (fromInv.quantity <= 0) {
    fromChar.inventory = fromChar.inventory.filter(
      e => e.item.toString() !== item._id.toString()
    );
  }

  const toInv = toChar.inventory.find(
    entry => entry.item.toString() === item._id.toString()
  );

  if (toInv) {
    toInv.quantity += 1;
  } else {
    toChar.inventory.push({
      item: item._id,
      quantity: 1
    });
  }

  // Mover la moneda: toChar -> fromChar
  toChar.gold -= goldAmount;
  fromChar.gold += goldAmount;

  await fromChar.save();
  await toChar.save();

  return interaction.reply({
    content:
      `🤝 Trade completado:\n` +
      `• **${fromChar.name}** → entrega **1x ${item.name}** a **${toChar.name}**.\n` +
      `• **${toChar.name}** → paga **${eco.currencyIcon} ${goldAmount} ${eco.currencyShort}** a **${fromChar.name}**.\n\n` +
      `💰 ${fromChar.name}: **${eco.currencyIcon} ${fromChar.gold} ${eco.currencyShort}**\n` +
      `💰 ${toChar.name}: **${eco.currencyIcon} ${toChar.gold} ${eco.currencyShort}**`,
    ephemeral: true
  });
}

// ===================================================
// CONFIG_SELL_RATIO
// ===================================================
async function handleConfigSellRatio(interaction) {
  const member = interaction.member;
  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden configurar el ratio de la tienda.",
      ephemeral: true
    });
  }

  const ratio = interaction.options.getNumber("ratio");

  if (ratio <= 0 || ratio > 1.0) {
    return interaction.reply({
      content: "❌ El ratio debe estar entre **0.1** y **1.0**.",
      ephemeral: true
    });
  }

  const eco = await getEconomyConfig(interaction.guild.id);

  eco.sellRatio = ratio;

  if (typeof eco.save === "function") {
    await eco.save();
  }

  return interaction.reply({
    content: `✅ Ratio de compra de la tienda actualizado a **${Math.round(
      ratio * 100
    )}%** del valor base.`,
    ephemeral: true
  });
}

// ===================================================
// GIVE (MOD)
// ===================================================
async function handleGive(interaction) {
  const member = interaction.member;
  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo moderadores/administradores pueden usar `/item give`.",
      ephemeral: true
    });
  }

  const itemName = interaction.options.getString("item").trim();
  const charName = interaction.options.getString("character").trim();
  const targetUser = interaction.options.getUser("user");
  const quantity = interaction.options.getInteger("quantity") ?? 1;

  if (quantity <= 0) {
    return interaction.reply({
      content: "❌ La cantidad debe ser al menos 1.",
      ephemeral: true
    });
  }

  const item = await ItemModel.findOne({
    name: new RegExp(`^${itemName}$`, "i"),
    isEnabled: true
  });

  if (!item) {
    return interaction.reply({
      content: `❌ No encontré ningún objeto activo llamado **${itemName}**.`,
      ephemeral: true
    });
  }

  const query = {
    name: new RegExp(`^${charName}$`, "i"),
    guildId: interaction.guild.id
  };

  if (targetUser) {
    query.ownerId = targetUser.id;
  }

  const character = await CharacterModel.findOne(query);

  if (!character) {
    return interaction.reply({
      content: `❌ No encontré ningún personaje llamado **${charName}**${
        targetUser ? ` del usuario ${targetUser.tag}` : ""
      }.`,
      ephemeral: true
    });
  }

  // Agregar al inventario
  const invEntry = character.inventory.find(
    entry => entry.item.toString() === item._id.toString()
  );

  if (invEntry) {
    invEntry.quantity += quantity;
  } else {
    character.inventory.push({
      item: item._id,
      quantity
    });
  }

  await character.save();

  return interaction.reply({
    content:
      `🎁 Se dieron **${quantity}x ${item.name}** al personaje **${character.name}**.\n` +
      `Acción realizada por: ${interaction.user.tag}`,
    ephemeral: true
  });
}

// ===================================================
// TAKE (MOD)
// ===================================================
async function handleTake(interaction) {
  const member = interaction.member;
  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo moderadores/administradores pueden usar `/item take`.",
      ephemeral: true
    });
  }

  const itemName = interaction.options.getString("item").trim();
  const charName = interaction.options.getString("character").trim();
  const targetUser = interaction.options.getUser("user");
  const quantity = interaction.options.getInteger("quantity") ?? 1;

  if (quantity <= 0) {
    return interaction.reply({
      content: "❌ La cantidad debe ser al menos 1.",
      ephemeral: true
    });
  }

  const item = await ItemModel.findOne({
    name: new RegExp(`^${itemName}$`, "i"),
    isEnabled: true
  });

  if (!item) {
    return interaction.reply({
      content: `❌ No encontré ningún objeto activo llamado **${itemName}**.`,
      ephemeral: true
    });
  }

  const query = {
    name: new RegExp(`^${charName}$`, "i"),
    guildId: interaction.guild.id
  };

  if (targetUser) {
    query.ownerId = targetUser.id;
  }

  const character = await CharacterModel.findOne(query);

  if (!character) {
    return interaction.reply({
      content: `❌ No encontré ningún personaje llamado **${charName}**${
        targetUser ? ` del usuario ${targetUser.tag}` : ""
      }.`,
      ephemeral: true
    });
  }

  const invEntry = character.inventory.find(
    entry => entry.item.toString() === item._id.toString()
  );

  if (!invEntry || invEntry.quantity <= 0) {
    return interaction.reply({
      content: `❌ ${character.name} no tiene **${item.name}** en su inventario.`,
      ephemeral: true
    });
  }

  if (invEntry.quantity < quantity) {
    return interaction.reply({
      content: `❌ ${character.name} solo tiene **${invEntry.quantity}x ${item.name}**, no puede quitarse **${quantity}**.`,
      ephemeral: true
    });
  }

  invEntry.quantity -= quantity;
  if (invEntry.quantity <= 0) {
    character.inventory = character.inventory.filter(
      e => e.item.toString() !== item._id.toString()
    );
  }

  await character.save();

  return interaction.reply({
    content:
      `🗑️ Se quitaron **${quantity}x ${item.name}** del inventario de **${character.name}**.\n` +
      `Acción realizada por: ${interaction.user.tag}`,
    ephemeral: true
  });
}

// ===================================================
// AUTOCOMPLETE
// ===================================================
async function handleAutocomplete(interaction) {
  const focused = interaction.options.getFocused(true); // { name, value }
  const search = focused.value || "";

  let subcommand = null;
  try {
    subcommand = interaction.options.getSubcommand(false);
  } catch {
    subcommand = null;
  }

  // ---- AUTOCOMPLETE PARA ITEMS ----
  if (["item", "name"].includes(focused.name)) {
    const query = {
      name: new RegExp(search, "i")
    };

    // Ajustes según el subcomando
    if (subcommand === "buy") {
      query.isEnabled = true;
      query.isInStore = true;
      query.isBuyable = true;
    } else if (subcommand === "sell") {
      query.isEnabled = true;
      query.isSellable = true;
    } else if (subcommand === "trade") {
      query.isEnabled = true;
      query.isTradeable = true;
    } else if (["enable", "disable", "edit", "delete"].includes(subcommand)) {
      // en estos, no filtramos por flags, solo por nombre
    }

    const items = await ItemModel.find(query)
      .sort({ name: 1 })
      .limit(25);

    const choices = items.map(it => ({
      name: `${it.name} (${it.type || "objeto"})`,
      value: it.name
    }));

    return interaction.respond(choices);
  }

  // ---- AUTOCOMPLETE PARA PERSONAJES ----
  if (
    ["character", "from_character", "to_character"].includes(focused.name)
  ) {
    const charQuery = {
      guildId: interaction.guild.id,
      name: new RegExp(search, "i")
    };

    const chars = await CharacterModel.find(charQuery)
      .sort({ name: 1 })
      .limit(25);

    const choices = chars.map(ch => ({
      name: ch.name,
      value: ch.name
    }));

    return interaction.respond(choices);
  }

  return interaction.respond([]);
}

// ===================================================
// EXPORT
// ===================================================
export default {
  data,

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    if (sub === "add") return handleAdd(interaction);
    if (sub === "add_weapon") return handleAddWeapon(interaction);
    if (sub === "add_armor") return handleAddArmor(interaction);

    if (sub === "delete") return handleDelete(interaction);
    if (sub === "enable") return handleEnable(interaction);
    if (sub === "disable") return handleDisable(interaction);

    if (sub === "edit") return handleEdit(interaction);
    if (sub === "edit_weapon") return handleEditWeapon(interaction);
    if (sub === "edit_armor") return handleEditArmor(interaction);

    if (sub === "info") return handleInfo(interaction);

    if (sub === "store") return handleStore(interaction);
    if (sub === "buy") return handleBuy(interaction);
    if (sub === "sell") return handleSell(interaction);
    if (sub === "trade") return handleTrade(interaction);
    if (sub === "config_sell_ratio") return handleConfigSellRatio(interaction);

    if (sub === "give") return handleGive(interaction);
    if (sub === "take") return handleTake(interaction);
  },

  async autocomplete(interaction) {
    return handleAutocomplete(interaction);
  }
};
