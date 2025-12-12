import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType
} from "discord.js";

import CharacterModel from "../../models/Character.js";
import RaceModel from "../../models/Race.js";
import ClassModel from "../../models/Class.js";
import SubclassModel from "../../models/Subclass.js";
import BackgroundModel from "../../models/Background.js";

const EPHEMERAL = true; // para errores / cosas personales

export default {
  data: new SlashCommandBuilder()
    .setName("character")
    .setDescription("Gestión de personajes de jugador.")

    // /character create
    .addSubcommand(sub =>
      sub
        .setName("create")
        .setDescription("Crea un nuevo personaje.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del personaje")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("race")
            .setDescription("Nombre de la raza registrada")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("class")
            .setDescription("Nombre de la clase registrada")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("subclass")
            .setDescription("Nombre de la subclase registrada")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("background")
            .setDescription("Nombre del trasfondo registrado")
            .setRequired(false)
        )
        .addIntegerOption(o =>
          o
            .setName("level")
            .setDescription("Nivel inicial (1–20)")
            .setMinValue(1)
            .setMaxValue(20)
            .setRequired(false)
        )
        // Stats opcionales (si no se ponen, se usan los defaults del modelo)
        .addIntegerOption(o =>
          o
            .setName("str")
            .setDescription("Fuerza")
            .setRequired(false)
        )
        .addIntegerOption(o =>
          o
            .setName("dex")
            .setDescription("Destreza")
            .setRequired(false)
        )
        .addIntegerOption(o =>
          o
            .setName("con")
            .setDescription("Constitución")
            .setRequired(false)
        )
        .addIntegerOption(o =>
          o
            .setName("int")
            .setDescription("Inteligencia")
            .setRequired(false)
        )
        .addIntegerOption(o =>
          o
            .setName("wis")
            .setDescription("Sabiduría")
            .setRequired(false)
        )
        .addIntegerOption(o =>
          o
            .setName("cha")
            .setDescription("Carisma")
            .setRequired(false)
        )
    )

    // /character view
    .addSubcommand(sub =>
      sub
        .setName("view")
        .setDescription("Muestra la ficha resumida de un personaje (con pestañas).")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del personaje")
            .setRequired(true)
        )
    )

    // /character list
    .addSubcommand(sub =>
      sub
        .setName("list")
        .setDescription("Lista los personajes del servidor.")
    )

    // /character listmychar
    .addSubcommand(sub =>
      sub
        .setName("listmychar")
        .setDescription("Lista personajes de un usuario (o tuyos).")
        .addUserOption(o =>
          o
            .setName("user")
            .setDescription("Usuario (déjalo vacío para ver tus personajes).")
            .setRequired(false)
        )
    )

    // /character active
    .addSubcommand(sub =>
      sub
        .setName("active")
        .setDescription("Establece tu personaje activo.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del personaje que quieres activar")
            .setRequired(true)
        )
    )

    // /character dead
    .addSubcommand(sub =>
      sub
        .setName("dead")
        .setDescription("Marca un personaje como muerto (solo staff).")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del personaje")
            .setRequired(true)
        )
    )

    // /character edit
    .addSubcommand(sub =>
      sub
        .setName("edit")
        .setDescription("Edita datos de un personaje (moderación).")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del personaje a editar")
            .setRequired(true)
        )
        .addIntegerOption(o =>
          o
            .setName("level")
            .setDescription("Nuevo nivel (1–20)")
            .setMinValue(1)
            .setMaxValue(20)
            .setRequired(false)
        )
        .addIntegerOption(o =>
          o
            .setName("experience")
            .setDescription("Nueva experiencia total")
            .setMinValue(0)
            .setRequired(false)
        )
        .addIntegerOption(o =>
          o
            .setName("gold")
            .setDescription("Nuevo total de oro")
            .setMinValue(0)
            .setRequired(false)
        )
        .addBooleanOption(o =>
          o
            .setName("alive")
            .setDescription("¿El personaje está vivo?")
            .setRequired(false)
        )
        .addBooleanOption(o =>
          o
            .setName("active")
            .setDescription("¿Personaje activo?")
            .setRequired(false)
        )
    )

    // /character delete
    .addSubcommand(sub =>
      sub
        .setName("delete")
        .setDescription("Elimina un personaje.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del personaje a eliminar")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    if (sub === "create") return handleCreate(interaction);
    if (sub === "view") return handleView(interaction);
    if (sub === "list") return handleList(interaction);
    if (sub === "listmychar") return handleListMyChar(interaction);
    if (sub === "active") return handleActive(interaction);
    if (sub === "dead") return handleDead(interaction);
    if (sub === "edit") return handleEdit(interaction);
    if (sub === "delete") return handleDelete(interaction);
  }
};

// =======================================================
// Helpers para nombres
// =======================================================

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildNameRegex(name) {
  const escaped = escapeRegex(name.trim());
  return new RegExp(`^${escaped}$`, "i"); // case-insensitive
}

// Solo se permiten letras, números, espacios y ()' , .
function validateCharacterName(input) {
  const name = (input || "").trim();
  if (!name) {
    return {
      ok: false,
      message: "❌ El nombre del personaje no puede estar vacío."
    };
  }

  const allowedPattern = /^[\p{L}\p{N} ()'",.]+$/u;

  if (!allowedPattern.test(name)) {
    return {
      ok: false,
      message:
        "❌ El nombre del personaje solo puede contener letras, números, espacios y estos caracteres especiales: `(` `)` `'` `,` `.`"
    };
  }

  return { ok: true, name };
}

// =======================================================
// /character create
// =======================================================
async function handleCreate(interaction) {
  if (!interaction.guild) {
    return interaction.reply({
      content: "❌ Este comando solo puede usarse dentro de un servidor.",
      ephemeral: EPHEMERAL
    });
  }

  const guildId = interaction.guild.id;
  const ownerId = interaction.user.id;

  const rawName = interaction.options.getString("name");
  const nameCheck = validateCharacterName(rawName);

  if (!nameCheck.ok) {
    return interaction.reply({
      content: nameCheck.message,
      ephemeral: EPHEMERAL
    });
  }

  const name = nameCheck.name;

  const raceName = interaction.options.getString("race");
  const className = interaction.options.getString("class");
  const subclassName = interaction.options.getString("subclass");
  const backgroundName = interaction.options.getString("background");
  const levelOpt = interaction.options.getInteger("level") ?? 1;

  if (levelOpt < 1 || levelOpt > 20) {
    return interaction.reply({
      content: "❌ El nivel debe estar entre 1 y 20.",
      ephemeral: EPHEMERAL
    });
  }

  // Comprobar duplicado por guild+name (case-insensitive)
  const existing = await CharacterModel.findOne({
    guildId,
    name: buildNameRegex(name)
  });
  if (existing) {
    return interaction.reply({
      content: `❌ Ya existe un personaje llamado **${existing.name}** en este servidor.`,
      ephemeral: EPHEMERAL
    });
  }

  // Buscar refs opcionales
  let race = null;
  let cls = null;
  let subclass = null;
  let background = null;

  if (raceName) {
    race = await RaceModel.findOne({
      name: new RegExp(`^${escapeRegex(raceName)}$`, "i")
    });
    if (!race) {
      return interaction.reply({
        content: `❌ No encontré ninguna raza llamada **${raceName}**.`,
        ephemeral: EPHEMERAL
      });
    }
  }

  if (className) {
    cls = await ClassModel.findOne({
      name: new RegExp(`^${escapeRegex(className)}$`, "i")
    });
    if (!cls) {
      return interaction.reply({
        content: `❌ No encontré ninguna clase llamada **${className}**.`,
        ephemeral: EPHEMERAL
      });
    }
  }

  if (subclassName) {
    subclass = await SubclassModel.findOne({
      name: new RegExp(`^${escapeRegex(subclassName)}$`, "i")
    });
    if (!subclass) {
      return interaction.reply({
        content: `❌ No encontré ninguna subclase llamada **${subclassName}**.`,
        ephemeral: EPHEMERAL
      });
    }
  }

  if (backgroundName) {
    background = await BackgroundModel.findOne({
      name: new RegExp(`^${escapeRegex(backgroundName)}$`, "i")
    });
    if (!background) {
      return interaction.reply({
        content: `❌ No encontré ningún trasfondo llamado **${backgroundName}**.`,
        ephemeral: EPHEMERAL
      });
    }
  }

  // Stats (opcionales)
  const abilityScores = {};
  const stats = ["str", "dex", "con", "int", "wis", "cha"];
  for (const stat of stats) {
    const val = interaction.options.getInteger(stat);
    if (val !== null) {
      abilityScores[stat] = val;
    }
  }

  // ¿primer personaje del usuario en este servidor?
  const count = await CharacterModel.countDocuments({ guildId, ownerId });
  const isFirstChar = count === 0;

  const character = await CharacterModel.create({
    ownerId,
    guildId,
    name,
    race: race?._id || null,
    classRef: cls?._id || null,
    subclassRef: subclass?._id || null,
    backgroundRef: background?._id || null,
    level: levelOpt,
    abilityScores: Object.keys(abilityScores).length ? abilityScores : undefined,
    isActive: isFirstChar // primer pj se marca activo
  });

  const embed = new EmbedBuilder()
    .setTitle(`🧙 Personaje creado: ${character.name}`)
    .setColor("Green")
    .addFields(
      { name: "Nivel", value: `${character.level}`, inline: true },
      { name: "Jugador", value: `<@${ownerId}>`, inline: true },
      { name: "Raza", value: race?.name || "—", inline: true },
      { name: "Clase", value: cls?.name || "—", inline: true },
      { name: "Subclase", value: subclass?.name || "—", inline: true },
      { name: "Trasfondo", value: background?.name || "—", inline: true },
      { name: "Activo", value: character.isActive ? "✅ Sí" : "❌ No", inline: true }
    );

  return interaction.reply({
    embeds: [embed],
    ephemeral: EPHEMERAL
  });
}

// =======================================================
// /character view (MULTI-EMBED CON BOTONES)
// =======================================================
async function handleView(interaction) {
  if (!interaction.guild) {
    return interaction.reply({
      content: "❌ Este comando solo puede usarse dentro de un servidor.",
      ephemeral: EPHEMERAL
    });
  }

  const guildId = interaction.guild.id;
  const name = interaction.options.getString("name").trim();
  const nameRegex = buildNameRegex(name);

  // 1) defer para evitar "Unknown interaction"
  await interaction.deferReply({ ephemeral: false });

  const character = await CharacterModel.findOne({ guildId, name: nameRegex })
    .populate("race")
    .populate("classRef")
    .populate("subclassRef")
    .populate("backgroundRef")
    .populate("feats")
    .populate("languages")
    .populate("inventory.item"); // asumiendo que inventory.item referencia a ItemModel

  if (!character) {
    return interaction.editReply({
      content: `❌ No encontré ningún personaje llamado **${name}** en este servidor.`,
      embeds: [],
      components: []
    });
  }

  // Preparamos los distintos "tab" embeds
  const generalEmbed = buildGeneralEmbed(character);
  const featuresEmbed = buildFeaturesEmbed(character);
  const equipmentEmbed = buildEquipmentEmbed(character);
  const spellsEmbed = buildSpellsEmbed(character);

  // Fila de botones para cambiar pestañas
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("char_view_general")
      .setLabel("General")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("char_view_features")
      .setLabel("Habilidades")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("char_view_equipment")
      .setLabel("Equipo")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("char_view_spells")
      .setLabel("Conjuros")
      .setStyle(ButtonStyle.Secondary)
  );

  const message = await interaction.editReply({
    embeds: [generalEmbed],
    components: [row]
  });

  const collector = message.createMessageComponentCollector({
    componentType: ComponentType.Button
  });

  collector.on("collect", async i => {
    // Solo el usuario que ejecutó el comando puede tocar los botones
    if (i.user.id !== interaction.user.id) {
      return i.reply({
        content: "❌ Solo quien ejecutó el comando puede usar estos botones.",
        ephemeral: true
      });
    }

    let embedToShow = generalEmbed;

    switch (i.customId) {
      case "char_view_general":
        embedToShow = generalEmbed;
        break;
      case "char_view_features":
        embedToShow = featuresEmbed;
        break;
      case "char_view_equipment":
        embedToShow = equipmentEmbed;
        break;
      case "char_view_spells":
        embedToShow = spellsEmbed;
        break;
    }

    await i.update({ embeds: [embedToShow] });
  });

  collector.on("end", async () => {
    try {
      const disabledRow = new ActionRowBuilder().addComponents(
        row.components.map(btn => ButtonBuilder.from(btn).setDisabled(true))
      );

      await message.edit({ components: [disabledRow] });
    } catch {
      // ignoramos errores de edición
    }
  });
}


// =======================================================
// /character list
// =======================================================
async function handleList(interaction) {
  if (!interaction.guild) {
    return interaction.reply({
      content: "❌ Este comando solo puede usarse dentro de un servidor.",
      ephemeral: EPHEMERAL
    });
  }

  const guildId = interaction.guild.id;

  const chars = await CharacterModel.find({ guildId }).sort({ name: 1 }).limit(50);

  if (chars.length === 0) {
    return interaction.reply({
      content: "⚠️ No hay personajes registrados en este servidor.",
      ephemeral: EPHEMERAL
    });
  }

  const lines = chars.map(c => {
    const alive = c.isAlive ? "🟢" : "⚰️";
    const active = c.isActive ? "⭐" : "・";
    return `${alive}${active} **${c.name}** (Nivel ${c.level}) — <@${c.ownerId}>`;
  });

  const embed = new EmbedBuilder()
    .setTitle("📋 Personajes del servidor")
    .setDescription(lines.join("\n"))
    .setColor("Blurple");

  return interaction.reply({
    embeds: [embed],
    ephemeral: false
  });
}

// =======================================================
// /character listmychar
// =======================================================
async function handleListMyChar(interaction) {
  if (!interaction.guild) {
    return interaction.reply({
      content: "❌ Este comando solo puede usarse dentro de un servidor.",
      ephemeral: EPHEMERAL
    });
  }

  const guildId = interaction.guild.id;
  const targetUser = interaction.options.getUser("user") || interaction.user;

  const chars = await CharacterModel.find({
    guildId,
    ownerId: targetUser.id
  }).sort({ name: 1 });

  if (chars.length === 0) {
    return interaction.reply({
      content:
        targetUser.id === interaction.user.id
          ? "⚠️ No tienes personajes en este servidor."
          : `⚠️ <@${targetUser.id}> no tiene personajes en este servidor.`,
      ephemeral: EPHEMERAL
    });
  }

  const lines = chars.map(c => {
    const alive = c.isAlive ? "🟢" : "⚰️";
    const active = c.isActive ? "⭐" : "・";
    return `${alive}${active} **${c.name}** (Nivel ${c.level})`;
  });

  const embed = new EmbedBuilder()
    .setTitle(
      targetUser.id === interaction.user.id
        ? "📋 Tus personajes"
        : `📋 Personajes de ${targetUser.username}`
    )
    .setDescription(lines.join("\n"))
    .setColor("Green");

  return interaction.reply({
    embeds: [embed],
    ephemeral: EPHEMERAL
  });
}

// =======================================================
// /character active
// =======================================================
async function handleActive(interaction) {
  if (!interaction.guild) {
    return interaction.reply({
      content: "❌ Este comando solo puede usarse dentro de un servidor.",
      ephemeral: EPHEMERAL
    });
  }

  const guildId = interaction.guild.id;
  const ownerId = interaction.user.id;
  const name = interaction.options.getString("name").trim();
  const nameRegex = buildNameRegex(name);

  const character = await CharacterModel.findOne({ guildId, ownerId, name: nameRegex });

  if (!character) {
    return interaction.reply({
      content: `❌ No encontré ningún personaje llamado **${name}** que sea tuyo en este servidor.`,
      ephemeral: EPHEMERAL
    });
  }

  // Desactivar otros del mismo dueño
  await CharacterModel.updateMany(
    { guildId, ownerId },
    { $set: { isActive: false } }
  );

  character.isActive = true;
  await character.save();

  return interaction.reply({
    content: `⭐ Tu personaje activo ahora es **${character.name}**.`,
    ephemeral: EPHEMERAL
  });
}

// =======================================================
// /character dead
// =======================================================
async function handleDead(interaction) {
  if (!interaction.guild) {
    return interaction.reply({
      content: "❌ Este comando solo puede usarse dentro de un servidor.",
      ephemeral: EPHEMERAL
    });
  }

  const member = interaction.member;
  const guildId = interaction.guild.id;
  const name = interaction.options.getString("name").trim();
  const nameRegex = buildNameRegex(name);

  // Solo staff (ManageGuild o similar)
  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo staff puede marcar personajes como muertos.",
      ephemeral: EPHEMERAL
    });
  }

  const character = await CharacterModel.findOne({ guildId, name: nameRegex });

  if (!character) {
    return interaction.reply({
      content: `❌ No encontré ningún personaje llamado **${name}**.`,
      ephemeral: EPHEMERAL
    });
  }

  character.isAlive = false;
  character.isActive = false;
  await character.save();

  return interaction.reply({
    content: `⚰️ El personaje **${character.name}** ha sido marcado como **muerto**.`,
    ephemeral: false
  });
}

// =======================================================
// /character edit
// =======================================================
async function handleEdit(interaction) {
  if (!interaction.guild) {
    return interaction.reply({
      content: "❌ Este comando solo puede usarse dentro de un servidor.",
      ephemeral: EPHEMERAL
    });
  }

  const member = interaction.member;
  const guildId = interaction.guild.id;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo moderación / staff puede editar personajes.",
      ephemeral: EPHEMERAL
    });
  }

  const name = interaction.options.getString("name").trim();
  const nameRegex = buildNameRegex(name);
  const level = interaction.options.getInteger("level");
  const experience = interaction.options.getInteger("experience");
  const gold = interaction.options.getInteger("gold");
  const alive = interaction.options.getBoolean("alive");
  const active = interaction.options.getBoolean("active");

  const character = await CharacterModel.findOne({ guildId, name: nameRegex });

  if (!character) {
    return interaction.reply({
      content: `❌ No encontré ningún personaje llamado **${name}**.`,
      ephemeral: EPHEMERAL
    });
  }

  if (level !== null) character.level = level;
  if (experience !== null) character.experience = experience;
  if (gold !== null) character.gold = gold;
  if (alive !== null) character.isAlive = alive;
  if (active !== null) character.isActive = active;

  await character.save();

  const embed = new EmbedBuilder()
    .setTitle(`🛠️ Personaje editado: ${character.name}`)
    .setColor("Orange")
    .addFields(
      { name: "Nivel", value: `${character.level}`, inline: true },
      { name: "XP", value: `${character.experience ?? 0}`, inline: true },
      { name: "Oro", value: `${character.gold ?? 0}`, inline: true },
      { name: "Vivo", value: character.isAlive ? "Sí" : "No", inline: true },
      { name: "Activo", value: character.isActive ? "Sí" : "No", inline: true }
    );

  return interaction.reply({
    embeds: [embed],
    ephemeral: false
  });
}

// =======================================================
// /character delete
// =======================================================
async function handleDelete(interaction) {
  if (!interaction.guild) {
    return interaction.reply({
      content: "❌ Este comando solo puede usarse dentro de un servidor.",
      ephemeral: EPHEMERAL
    });
  }

  const guildId = interaction.guild.id;
  const requesterId = interaction.user.id;
  const member = interaction.member;

  const name = interaction.options.getString("name").trim();
  const nameRegex = buildNameRegex(name);

  const character = await CharacterModel.findOne({ guildId, name: nameRegex });

  if (!character) {
    return interaction.reply({
      content: `❌ No encontré ningún personaje llamado **${name}**.`,
      ephemeral: EPHEMERAL
    });
  }

  const isOwner = character.ownerId === requesterId;
  const isStaff = member.permissions.has(PermissionFlagsBits.ManageGuild);

  if (!isOwner && !isStaff) {
    return interaction.reply({
      content:
        "❌ Solo el dueño del personaje o el staff pueden eliminar este personaje.",
      ephemeral: EPHEMERAL
    });
  }

  await character.deleteOne();

  return interaction.reply({
    content: `🗑️ El personaje **${character.name}** ha sido eliminado del servidor.`,
    ephemeral: false
  });
}

// =======================================================
// Helpers de formato
// =======================================================
function formatMod(mod) {
  if (mod == null || Number.isNaN(mod)) return "+0";
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

function buildStatsLine(character) {
  const mods = character.abilityModifiers || {};
  const as = character.abilityScores || {};

  const vals = [
    ["STR", as.str ?? 8, formatMod(mods.str)],
    ["DEX", as.dex ?? 8, formatMod(mods.dex)],
    ["CON", as.con ?? 8, formatMod(mods.con)],
    ["INT", as.int ?? 8, formatMod(mods.int)],
    ["WIS", as.wis ?? 8, formatMod(mods.wis)],
    ["CHA", as.cha ?? 8, formatMod(mods.cha)]
  ];

  return vals
    .map(([abbr, score, mod]) => `\`${abbr} ${String(score).padStart(2, " ")} (${mod})\``)
    .join("  ");
}

// =======================================================
// Embeds de pestañas
// =======================================================

function buildGeneralEmbed(character) {
  const statsLine = buildStatsLine(character);

  const classText = [
    character.classRef?.name || "—",
    character.subclassRef?.name ? `(${character.subclassRef.name})` : ""
  ].join(" ");

  const hpCurrent = character.currentHP ?? 0;
  const hpMax = character.maxHP ?? 0;
  const hpTemp = character.temporaryHP ?? 0;

  const ac = character.armorClass ?? "—";
  const speed = character.speed ?? "—";
  const pb = character.proficiencyBonus ?? 2;
  const xp = character.experience ?? character.xp ?? 0;
  const gold = character.gold ?? 0;

  const languagesText =
    character.languages?.length
      ? character.languages.map(l => l.name).join(", ")
      : "—";

  const embed = new EmbedBuilder()
    .setTitle(`🎭 ${character.name}`)
    .setColor(character.isAlive ? 0x3b82f6 : 0x7f1d1d)
    .setDescription(
      [
        character.isAlive ? "🟢 **Vivo**" : "⚰️ **Muerto**",
        character.isActive ? "⭐ **Activo**" : "・Inactivo"
      ].join(" · ")
    )
    .addFields(
      {
        name: "Jugador",
        value: `<@${character.ownerId}>`,
        inline: true
      },
      {
        name: "Nivel",
        value: `${character.level}`,
        inline: true
      },
      {
        name: "Clase",
        value: classText || "—",
        inline: true
      },
      {
        name: "Raza",
        value: character.race?.name || "—",
        inline: true
      },
      {
        name: "Trasfondo",
        value: character.backgroundRef?.name || "—",
        inline: true
      },
      {
        name: "XP / Oro",
        value: `🧠 ${xp} XP · 💰 ${gold}`,
        inline: true
      },
      {
        name: "HP / Defensa",
        value: `❤️ ${hpCurrent}/${hpMax} (+${hpTemp} TEMP)\n🛡️ AC ${ac} · 🚶 ${speed} ft · PB +${pb}`,
        inline: false
      },
      {
        name: "Atributos",
        value: statsLine,
        inline: false
      },
      {
        name: "Idiomas",
        value: languagesText,
        inline: false
      }
    )
    .setFooter({ text: "Usa los botones de abajo para cambiar de pestaña." });

  return embed;
}

function buildFeaturesEmbed(character) {
  const classFeatures = Array.isArray(character.classRef?.features)
    ? character.classRef.features
    : [];
  const subclassFeatures = Array.isArray(character.subclassRef?.features)
    ? character.subclassRef.features
    : [];

  if (!classFeatures.length && !subclassFeatures.length) {
    return new EmbedBuilder()
      .setTitle(`🧩 Habilidades de clase — ${character.name}`)
      .setColor(0x6366f1)
      .setDescription(
        "Este personaje no tiene habilidades de clase/subclase registradas.\n\n" +
          "_(Revisa el modelo de Class/Subclass y agrega un campo `features` si quieres que aparezcan aquí)_"
      );
  }

  // Agrupamos por nivel
  const groupByLevel = feats => {
    const map = new Map();
    for (const f of feats) {
      const lvl = f.level ?? "?";
      if (!map.has(lvl)) map.set(lvl, []);
      map.get(lvl).push(f);
    }
    return map;
  };

  const classMap = groupByLevel(classFeatures);
  const subclassMap = groupByLevel(subclassFeatures);

  const lines = [];

  const levels = new Set([...classMap.keys(), ...subclassMap.keys()]);
  const sortedLevels = [...levels].sort((a, b) => {
    if (a === "?" || b === "?") return 0;
    return a - b;
  });

  for (const lvl of sortedLevels) {
    lines.push(`__**Nivel ${lvl}**__`);

    const classList = classMap.get(lvl) || [];
    const subclassList = subclassMap.get(lvl) || [];

    for (const f of classList) {
      const desc =
        (f.shortDescription || f.description || "").toString().slice(0, 120) ||
        "";
      lines.push(
        `• 🧪 **${f.name || "Habilidad de clase"}**` +
          (desc ? ` — ${desc}${desc.length === 120 ? "..." : ""}` : "")
      );
    }

    for (const f of subclassList) {
      const desc =
        (f.shortDescription || f.description || "").toString().slice(0, 120) ||
        "";
      lines.push(
        `• 🜁 **${f.name || "Habilidad de subclase"}**` +
          (desc ? ` — ${desc}${desc.length === 120 ? "..." : ""}` : "")
      );
    }

    lines.push(""); // línea en blanco entre niveles
  }

  const description =
    lines.join("\n").slice(0, 4000) ||
    "No hay habilidades registradas a pesar de que el modelo las indica.";

  return new EmbedBuilder()
    .setTitle(`🧩 Habilidades de clase — ${character.name}`)
    .setColor(0x6366f1)
    .setDescription(description);
}

function buildEquipmentEmbed(character) {
  const inventory = Array.isArray(character.inventory)
    ? character.inventory
    : [];

  if (!inventory.length) {
    return new EmbedBuilder()
      .setTitle(`🎒 Equipo — ${character.name}`)
      .setColor(0xf59e0b)
      .setDescription("Este personaje no tiene ningún objeto registrado en su inventario.");
  }

  const lines = inventory.map(entry => {
    const qty = entry.quantity ?? 1;
    const itemName = entry.item?.name || "Objeto desconocido";
    const type = entry.item?.type || "—";
    const rarity = entry.item?.rarity || "common";

    return `• **${qty}x ${itemName}** — *${type}, ${rarity}*`;
  });

  return new EmbedBuilder()
    .setTitle(`🎒 Equipo — ${character.name}`)
    .setColor(0xf59e0b)
    .setDescription(lines.join("\n").slice(0, 4000));
}

function buildSpellsEmbed(character) {
  // Ajusta estos campos a tu modelo real:
  // ejemplos posibles: character.spells, character.knownSpells, character.preparedSpells, character.spellcasting
  const spellArray = Array.isArray(character.spells)
    ? character.spells
    : Array.isArray(character.knownSpells)
    ? character.knownSpells
    : [];

  const preparedArray = Array.isArray(character.preparedSpells)
    ? character.preparedSpells
    : [];

  const hasAnySpells =
    spellArray.length > 0 || preparedArray.length > 0 || character.spellcasting;

  if (!hasAnySpells) {
    return new EmbedBuilder()
      .setTitle(`✨ Conjuros — ${character.name}`)
      .setColor(0x22c55e)
      .setDescription(
        "Este personaje no tiene registro de conjuros o no es lanzador de conjuros.\n\n"
      );
  }

  const lines = [];

  if (spellArray.length) {
    lines.push("__**Conjuros conocidos**__");
    for (const s of spellArray) {
      const name = typeof s === "string" ? s : s.name || "Conjuro sin nombre";
      const level =
        typeof s === "object" && s.level != null ? ` (Nivel ${s.level})` : "";
      lines.push(`• ${name}${level}`);
    }
    lines.push("");
  }

  if (preparedArray.length) {
    lines.push("__**Conjuros preparados**__");
    for (const s of preparedArray) {
      const name = typeof s === "string" ? s : s.name || "Conjuro sin nombre";
      const level =
        typeof s === "object" && s.level != null ? ` (Nivel ${s.level})` : "";
      lines.push(`• ${name}${level}`);
    }
    lines.push("");
  }

  if (character.spellcasting && typeof character.spellcasting === "object") {
    lines.push("__**Slots de conjuro**__");
    const slots = character.spellcasting.slots || character.spellcasting.spellSlots;
    if (slots && typeof slots === "object") {
      const levels = Object.keys(slots).sort((a, b) => Number(a) - Number(b));
      for (const lvl of levels) {
        const info = slots[lvl];
        if (typeof info === "object") {
          const used = info.used ?? 0;
          const max = info.max ?? info.total ?? 0;
          lines.push(`• Nivel ${lvl}: ${used}/${max} usados`);
        } else {
          lines.push(`• Nivel ${lvl}: ${info}`);
        }
      }
    } else {
      lines.push("Slots no detallados en el modelo.");
    }
  }

  const description = lines.join("\n").slice(0, 4000);

  return new EmbedBuilder()
    .setTitle(`✨ Conjuros — ${character.name}`)
    .setColor(0x22c55e)
    .setDescription(description || "Hay datos de conjuro, pero no se pudieron formatear.");
}
