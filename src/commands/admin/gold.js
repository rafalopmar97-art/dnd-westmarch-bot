// src/commands/admin/gold.js
import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import CharacterModel from "../../models/Character.js";
import { getEconomyConfig } from "../../utils/economyConfig.js";

// IDs de roles que pueden usar /gold give y /gold take
// Rellena estos arrays con los IDs reales de tu servidor.
const GOLD_GIVE_ROLES = [
  // "123456789012345678", // Ejemplo: Rol de DM
  // "987654321098765432"  // Ejemplo: Rol de GM
];

const GOLD_TAKE_ROLES = [
  // "123456789012345678",
];

const GOLD_SET_ROLES = [
  // Roles que pueden usar /gold set (además de admins/mods con permisos)
  // "123456789012345678",
];

// Helper: verifica si el miembro tiene alguno de los roles permitidos o permisos altos
function hasGoldRoleOrPerm(member, allowedRoles) {
  // Administradores siempre pueden
  if (member.permissions.has(PermissionFlagsBits.Administrator)) return true;
  if (member.permissions.has(PermissionFlagsBits.ManageGuild)) return true;

  if (!member.roles || !member.roles.cache) return false;

  return member.roles.cache.some(role => allowedRoles.includes(role.id));
}

// Helper: parsea una lista de nombres separados por comas
function parseCharacterNames(raw) {
  return raw
    .split(",")
    .map(n => n.trim())
    .filter(Boolean);
}

export default {
  data: new SlashCommandBuilder()
    .setName("gold")
    .setDescription("Gestiona el oro de los personajes.")

    // /gold give
    .addSubcommand(sub =>
      sub
        .setName("give")
        .setDescription("Otorga oro a uno o varios personajes.")
        .addStringOption(o =>
          o
            .setName("character")
            .setDescription(
              "Nombre del personaje o lista separada por comas (ej: Luidit, Bull-E, Musashi)"
            )
            .setRequired(true)
        )
        .addIntegerOption(o =>
          o
            .setName("amount")
            .setDescription("Cantidad de oro a otorgar")
            .setRequired(true)
        )
        .addUserOption(o =>
          o
            .setName("user")
            .setDescription("Dueño de los personajes (opcional, para desambiguar)")
            .setRequired(false)
        )
    )

    // /gold take
    .addSubcommand(sub =>
      sub
        .setName("take")
        .setDescription("Resta oro a uno o varios personajes.")
        .addStringOption(o =>
          o
            .setName("character")
            .setDescription(
              "Nombre del personaje o lista separada por comas (ej: Luidit, Bull-E, Musashi)"
            )
            .setRequired(true)
        )
        .addIntegerOption(o =>
          o
            .setName("amount")
            .setDescription("Cantidad de oro a restar")
            .setRequired(true)
        )
        .addUserOption(o =>
          o
            .setName("user")
            .setDescription("Dueño de los personajes (opcional, para desambiguar)")
            .setRequired(false)
        )
    )

    // /gold set
    .addSubcommand(sub =>
      sub
        .setName("set")
        .setDescription("Establece el oro de uno o varios personajes en un valor fijo.")
        .addStringOption(o =>
          o
            .setName("character")
            .setDescription(
              "Nombre del personaje o lista separada por comas (ej: Luidit, Bull-E, Musashi)"
            )
            .setRequired(true)
        )
        .addIntegerOption(o =>
          o
            .setName("amount")
            .setDescription("Nueva cantidad total de oro")
            .setRequired(true)
        )
        .addUserOption(o =>
          o
            .setName("user")
            .setDescription("Dueño de los personajes (opcional, para desambiguar)")
            .setRequired(false)
        )
    )

    // /gold balance
    .addSubcommand(sub =>
      sub
        .setName("balance")
        .setDescription("Muestra el oro actual de un personaje.")
        .addStringOption(o =>
          o
            .setName("character")
            .setDescription("Nombre del personaje")
            .setRequired(true)
        )
        .addUserOption(o =>
          o
            .setName("user")
            .setDescription("Dueño del personaje (opcional, para desambiguar)")
            .setRequired(false)
        )
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    if (sub === "give") return handleGiveGold(interaction);
    if (sub === "take") return handleTakeGold(interaction);
    if (sub === "set") return handleSetGold(interaction);
    if (sub === "balance") return handleBalanceGold(interaction);
  }
};

// ===================================================
// /gold give (varios personajes)
// ===================================================
async function handleGiveGold(interaction) {
  const member = interaction.member;

  if (!hasGoldRoleOrPerm(member, GOLD_GIVE_ROLES)) {
    return interaction.reply({
      content: "❌ No tienes permisos para usar `/gold give`.",
      ephemeral: true
    });
  }

  const eco = await getEconomyConfig(interaction.guild.id);

  const charRaw = interaction.options.getString("character").trim();
  const amount = interaction.options.getInteger("amount");
  const targetUser = interaction.options.getUser("user");

  if (amount <= 0) {
    return interaction.reply({
      content: `❌ La cantidad de ${eco.currencyName} debe ser mayor a 0.`,
      ephemeral: true
    });
  }

  const names = parseCharacterNames(charRaw);

  if (names.length === 0) {
    return interaction.reply({
      content: "❌ No se proporcionó ningún nombre de personaje válido.",
      ephemeral: true
    });
  }

  const results = [];

  for (const name of names) {
    const query = {
      name: new RegExp(`^${name}$`, "i"),
      guildId: interaction.guild.id
    };

    if (targetUser) {
      query.ownerId = targetUser.id;
    }

    const character = await CharacterModel.findOne(query);

    if (!character) {
      results.push(`❌ No encontré ningún personaje llamado **${name}**.`);
      continue;
    }

    if (typeof character.gold !== "number") {
      character.gold = 0;
    }

    character.gold += amount;
    await character.save();

    results.push(
      `✨ Se otorgaron **${eco.currencyIcon} ${amount} ${eco.currencyShort}** a **${character.name}** → ` +
      `total **${eco.currencyIcon} ${character.gold} ${eco.currencyShort}**.`
    );
  }

  return interaction.reply({
    content: results.join("\n"),
    ephemeral: true
  });
}

// ===================================================
// /gold take (varios personajes)
// ===================================================
async function handleTakeGold(interaction) {
  const member = interaction.member;

  if (!hasGoldRoleOrPerm(member, GOLD_TAKE_ROLES)) {
    return interaction.reply({
      content: "❌ No tienes permisos para usar `/gold take`.",
      ephemeral: true
    });
  }

  const eco = await getEconomyConfig(interaction.guild.id);

  const charRaw = interaction.options.getString("character").trim();
  const amount = interaction.options.getInteger("amount");
  const targetUser = interaction.options.getUser("user");

  if (amount <= 0) {
    return interaction.reply({
      content: `❌ La cantidad de ${eco.currencyName} a restar debe ser mayor a 0.`,
      ephemeral: true
    });
  }

  const names = parseCharacterNames(charRaw);

  if (names.length === 0) {
    return interaction.reply({
      content: "❌ No se proporcionó ningún nombre de personaje válido.",
      ephemeral: true
    });
  }

  const results = [];

  for (const name of names) {
    const query = {
      name: new RegExp(`^${name}$`, "i"),
      guildId: interaction.guild.id
    };

    if (targetUser) {
      query.ownerId = targetUser.id;
    }

    const character = await CharacterModel.findOne(query);

    if (!character) {
      results.push(`❌ No encontré ningún personaje llamado **${name}**.`);
      continue;
    }

    if (typeof character.gold !== "number") {
      character.gold = 0;
    }

    character.gold -= amount;
    if (character.gold < 0) character.gold = 0;

    await character.save();

    results.push(
      `⚠️ Se restaron **${eco.currencyIcon} ${amount} ${eco.currencyShort}** a **${character.name}** → ` +
      `total **${eco.currencyIcon} ${character.gold} ${eco.currencyShort}**.`
    );
  }

  return interaction.reply({
    content: results.join("\n"),
    ephemeral: true
  });
}

// ===================================================
// /gold set (varios personajes)
// ===================================================
async function handleSetGold(interaction) {
  const member = interaction.member;

  // Para set pedimos más poder: roles específicos o permisos de moderación altos
  if (
    !hasGoldRoleOrPerm(member, GOLD_SET_ROLES) &&
    !member.permissions.has(PermissionFlagsBits.ManageRoles)
  ) {
    return interaction.reply({
      content:
        "❌ No tienes permisos suficientes para usar `/gold set`. Se requiere moderación o superior.",
      ephemeral: true
    });
  }

  const eco = await getEconomyConfig(interaction.guild.id);

  const charRaw = interaction.options.getString("character").trim();
  const amount = interaction.options.getInteger("amount");
  const targetUser = interaction.options.getUser("user");

  if (amount < 0) {
    return interaction.reply({
      content: `❌ El ${eco.currencyName} no puede establecerse en un valor negativo.`,
      ephemeral: true
    });
  }

  const names = parseCharacterNames(charRaw);

  if (names.length === 0) {
    return interaction.reply({
      content: "❌ No se proporcionó ningún nombre de personaje válido.",
      ephemeral: true
    });
  }

  const results = [];

  for (const name of names) {
    const query = {
      name: new RegExp(`^${name}$`, "i"),
      guildId: interaction.guild.id
    };

    if (targetUser) {
      query.ownerId = targetUser.id;
    }

    const character = await CharacterModel.findOne(query);

    if (!character) {
      results.push(`❌ No encontré ningún personaje llamado **${name}**.`);
      continue;
    }

    character.gold = amount;
    await character.save();

    results.push(
      `📌 El oro de **${character.name}** se estableció en **${eco.currencyIcon} ${character.gold} ${eco.currencyShort}**.`
    );
  }

  return interaction.reply({
    content: results.join("\n"),
    ephemeral: true
  });
}

// ===================================================
// /gold balance (un personaje, público)
// ===================================================
async function handleBalanceGold(interaction) {
  const eco = await getEconomyConfig(interaction.guild.id);

  const charName = interaction.options.getString("character").trim();
  const targetUser = interaction.options.getUser("user");

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

  const goldAmount = typeof character.gold === "number" ? character.gold : 0;

  // Comando público: no ephemeral para que se pueda presumir el oro 😎
  return interaction.reply({
    content:
      `💰 El personaje **${character.name}** tiene ` +
      `**${eco.currencyIcon} ${goldAmount} ${eco.currencyShort}** en el bolsillo.`,
  });
}
