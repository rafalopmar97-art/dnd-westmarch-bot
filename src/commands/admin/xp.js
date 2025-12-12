// src/commands/admin/xp.js
import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import CharacterModel from "../../models/Character.js";

// IDs de roles que pueden usar /xp give y /xp take
// Rellena estos arrays con los IDs reales de tu servidor.
const XP_GIVE_ROLES = [
  // "123456789012345678", // Ejemplo: Rol de DM
  // "987654321098765432"  // Ejemplo: Rol de GM
];

const XP_TAKE_ROLES = [
  // Si es igual que XP_GIVE_ROLES puedes reutilizar el mismo array
  // "123456789012345678",
];

const XP_SET_ROLES = [
  // Roles que pueden usar /xp set (además de admins/mods con permisos)
  // "123456789012345678",
];

// Helper: verifica si el miembro tiene alguno de los roles permitidos o permisos altos
function hasXpRoleOrPerm(member, allowedRoles) {
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
    .setName("xp")
    .setDescription("Gestiona la experiencia de los personajes.")

    // /xp give
    .addSubcommand(sub =>
      sub
        .setName("give")
        .setDescription("Otorga experiencia a uno o varios personajes.")
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
            .setDescription("Cantidad de experiencia a otorgar")
            .setRequired(true)
        )
        .addUserOption(o =>
          o
            .setName("user")
            .setDescription("Dueño de los personajes (opcional, para desambiguar)")
            .setRequired(false)
        )
    )

    // /xp take
    .addSubcommand(sub =>
      sub
        .setName("take")
        .setDescription("Resta experiencia a uno o varios personajes.")
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
            .setDescription("Cantidad de experiencia a restar")
            .setRequired(true)
        )
        .addUserOption(o =>
          o
            .setName("user")
            .setDescription("Dueño de los personajes (opcional, para desambiguar)")
            .setRequired(false)
        )
    )

    // /xp set
    .addSubcommand(sub =>
      sub
        .setName("set")
        .setDescription("Establece la experiencia de uno o varios personajes en un valor fijo.")
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
            .setDescription("Nueva cantidad total de experiencia")
            .setRequired(true)
        )
        .addUserOption(o =>
          o
            .setName("user")
            .setDescription("Dueño de los personajes (opcional, para desambiguar)")
            .setRequired(false)
        )
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    if (sub === "give") return handleGiveXp(interaction);
    if (sub === "take") return handleTakeXp(interaction);
    if (sub === "set") return handleSetXp(interaction);
  }
};

// ===================================================
// /xp give (varios personajes)
// ===================================================
async function handleGiveXp(interaction) {
  const member = interaction.member;

  if (!hasXpRoleOrPerm(member, XP_GIVE_ROLES)) {
    return interaction.reply({
      content: "❌ No tienes permisos para usar `/xp give`.",
      ephemeral: true
    });
  }

  const charRaw = interaction.options.getString("character").trim();
  const amount = interaction.options.getInteger("amount");
  const targetUser = interaction.options.getUser("user");

  if (amount <= 0) {
    return interaction.reply({
      content: "❌ La cantidad de experiencia debe ser mayor a 0.",
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

    if (typeof character.xp !== "number") {
      character.xp = 0;
    }

    character.xp += amount;
    await character.save();

    results.push(
      `✨ Se otorgaron **${amount} XP** a **${character.name}** → total **${character.xp} XP**.`
    );
  }

  return interaction.reply({
    content: results.join("\n"),
    ephemeral: true
  });
}

// ===================================================
// /xp take (varios personajes)
// ===================================================
async function handleTakeXp(interaction) {
  const member = interaction.member;

  if (!hasXpRoleOrPerm(member, XP_TAKE_ROLES)) {
    return interaction.reply({
      content: "❌ No tienes permisos para usar `/xp take`.",
      ephemeral: true
    });
  }

  const charRaw = interaction.options.getString("character").trim();
  const amount = interaction.options.getInteger("amount");
  const targetUser = interaction.options.getUser("user");

  if (amount <= 0) {
    return interaction.reply({
      content: "❌ La cantidad de experiencia a restar debe ser mayor a 0.",
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

    if (typeof character.xp !== "number") {
      character.xp = 0;
    }

    character.xp -= amount;
    if (character.xp < 0) character.xp = 0;

    await character.save();

    results.push(
      `⚠️ Se restaron **${amount} XP** a **${character.name}** → total **${character.xp} XP**.`
    );
  }

  return interaction.reply({
    content: results.join("\n"),
    ephemeral: true
  });
}

// ===================================================
// /xp set (varios personajes)
// ===================================================
async function handleSetXp(interaction) {
  const member = interaction.member;

  // Para set pedimos más poder: roles específicos o permisos de moderación altos
  if (
    !hasXpRoleOrPerm(member, XP_SET_ROLES) &&
    !member.permissions.has(PermissionFlagsBits.ManageRoles)
  ) {
    return interaction.reply({
      content:
        "❌ No tienes permisos suficientes para usar `/xp set`. Se requiere moderación o superior.",
      ephemeral: true
    });
  }

  const charRaw = interaction.options.getString("character").trim();
  const amount = interaction.options.getInteger("amount");
  const targetUser = interaction.options.getUser("user");

  if (amount < 0) {
    return interaction.reply({
      content: "❌ La experiencia no puede establecerse en un valor negativo.",
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

    character.xp = amount;
    await character.save();

    results.push(
      `📌 La experiencia de **${character.name}** se estableció en **${character.xp} XP**.`
    );
  }

  return interaction.reply({
    content: results.join("\n"),
    ephemeral: false
  });
}
