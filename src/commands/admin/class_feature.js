// src/commands/admin/class_feature.js
import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder
} from "discord.js";
import ClassModel from "../../models/Class.js";

export default {
  data: new SlashCommandBuilder()
    .setName("class_feature")
    .setDescription("Administra los rasgos de una clase.")

    // /class_feature add
    .addSubcommand(sub =>
      sub
        .setName("add")
        .setDescription("Agrega un rasgo a una clase.")
        .addStringOption(o =>
          o
            .setName("classname")
            .setDescription("Nombre de la clase (ej. Guerrero, Mago)")
            .setRequired(true)
        )
        .addIntegerOption(o =>
          o
            .setName("level")
            .setDescription("Nivel al que se obtiene el rasgo (1–20)")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del rasgo")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("description")
            .setDescription("Descripción corta del rasgo")
            .setRequired(false)
        )
    )

    // /class_feature delete
    .addSubcommand(sub =>
      sub
        .setName("delete")
        .setDescription("Elimina rasgos de una clase.")
        .addStringOption(o =>
          o
            .setName("classname")
            .setDescription("Nombre de la clase")
            .setRequired(true)
        )
        .addIntegerOption(o =>
          o
            .setName("level")
            .setDescription("Nivel de los rasgos a eliminar")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre específico del rasgo (opcional). Si lo omites, borra todos los rasgos de ese nivel.")
            .setRequired(false)
        )
    )

    // /class_feature list
    .addSubcommand(sub =>
      sub
        .setName("list")
        .setDescription("Lista los rasgos de una clase.")
        .addStringOption(o =>
          o
            .setName("classname")
            .setDescription("Nombre de la clase")
            .setRequired(true)
        )
    )

    // /class_feature populate
    .addSubcommand(sub =>
      sub
        .setName("populate")
        .setDescription("Genera un conjunto de rasgos genéricos para una clase (plantilla).")
        .addStringOption(o =>
          o
            .setName("classname")
            .setDescription("Nombre de la clase")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const member = interaction.member;

    // Solo admins / moderación
    if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
      return interaction.reply({
        content: "❌ Solo administradores pueden gestionar rasgos de clase.",
        ephemeral: true
      });
    }

    if (sub === "add") return handleAddFeature(interaction);
    if (sub === "delete") return handleDeleteFeature(interaction);
    if (sub === "list") return handleListFeatures(interaction);
    if (sub === "populate") return handlePopulateFeatures(interaction);
  }
};

// ===============================
// Helpers comunes
// ===============================
async function findClassByName(interaction, className) {
  const cls = await ClassModel.findOne({
    name: new RegExp(`^${className}$`, "i")
  });

  if (!cls) {
    await interaction.reply({
      content: `❌ No encontré ninguna clase llamada **${className}**.`,
      ephemeral: true
    });
    return null;
  }

  return cls;
}

// ===============================
// /class_feature add
// ===============================
async function handleAddFeature(interaction) {
  const className = interaction.options.getString("classname").trim();
  const level = interaction.options.getInteger("level");
  const name = interaction.options.getString("name").trim();
  const description = interaction.options.getString("description") || "";

  if (level < 1 || level > 20) {
    return interaction.reply({
      content: "❌ El nivel debe estar entre 1 y 20.",
      ephemeral: true
    });
  }

  const cls = await findClassByName(interaction, className);
  if (!cls) return;

  // Agregamos el rasgo
  cls.featuresByLevel.push({
    level,
    name,
    shortDescription: description
  });

  // Ordenamos por nivel
  cls.featuresByLevel.sort((a, b) => a.level - b.level);

  await cls.save();

  return interaction.reply({
    content: `✅ Rasgo **${name}** agregado a la clase **${cls.name}** (nivel ${level}).`,
    ephemeral: true
  });
}

// ===============================
// /class_feature delete
// ===============================
async function handleDeleteFeature(interaction) {
  const className = interaction.options.getString("classname").trim();
  const level = interaction.options.getInteger("level");
  const featureName = interaction.options.getString("name"); // opcional

  const cls = await findClassByName(interaction, className);
  if (!cls) return;

  const before = cls.featuresByLevel.length;

  if (featureName) {
    cls.featuresByLevel = cls.featuresByLevel.filter(
      f =>
        !(
          f.level === level &&
          f.name.toLowerCase() === featureName.toLowerCase()
        )
    );
  } else {
    // Si no se especifica nombre, borramos TODOS los rasgos de ese nivel
    cls.featuresByLevel = cls.featuresByLevel.filter(f => f.level !== level);
  }

  const removed = before - cls.featuresByLevel.length;

  if (removed === 0) {
    return interaction.reply({
      content: "⚠️ No se encontró ningún rasgo que coincida con esos criterios.",
      ephemeral: true
    });
  }

  await cls.save();

  return interaction.reply({
    content: `🗑️ Se eliminaron **${removed}** rasgo(s) de nivel ${level} en la clase **${cls.name}**.`,
    ephemeral: true
  });
}

// ===============================
// /class_feature list
// ===============================
async function handleListFeatures(interaction) {
  const className = interaction.options.getString("classname").trim();

  const cls = await findClassByName(interaction, className);
  if (!cls) return;

  const embed = new EmbedBuilder()
    .setTitle(`📜 Rasgos de clase: ${cls.name}`)
    .setColor("Blue");

  if (!cls.featuresByLevel || cls.featuresByLevel.length === 0) {
    embed.setDescription("Esta clase aún no tiene rasgos configurados.");
  } else {
    const sorted = [...cls.featuresByLevel].sort((a, b) => a.level - b.level);

    embed.setDescription(
      sorted
        .map(
          f =>
            `**Nivel ${f.level}** — ${f.name}\n${f.shortDescription || "_Sin descripción._"}`
        )
        .join("\n\n")
        .slice(0, 4096)
    );
  }

  return interaction.reply({
    embeds: [embed],
    ephemeral: true
  });
}

// ===============================
// /class_feature populate
// ===============================
async function handlePopulateFeatures(interaction) {
  const className = interaction.options.getString("classname").trim();

  const cls = await findClassByName(interaction, className);
  if (!cls) return;

  // Patrón genérico de niveles donde las clases suelen ganar rasgos
  // (ajústalo como quieras)
  const patternLevels = [1, 2, 3, 5, 7, 9, 11, 15, 18];

  let added = 0;

  for (const lvl of patternLevels) {
    const exists = cls.featuresByLevel.some(f => f.level === lvl);
    if (!exists) {
      cls.featuresByLevel.push({
        level: lvl,
        name: `Rasgo de nivel ${lvl}`,
        shortDescription: `Rasgo genérico de ejemplo para el nivel ${lvl}.`
      });
      added++;
    }
  }

  if (added === 0) {
    return interaction.reply({
      content:
        "ℹ️ Todos los niveles de plantilla ya tienen rasgos. No se agregaron nuevos.",
      ephemeral: true
    });
  }

  cls.featuresByLevel.sort((a, b) => a.level - b.level);
  await cls.save();

  return interaction.reply({
    content: `✅ Se agregaron **${added}** rasgos genéricos a la clase **${cls.name}**.`,
    ephemeral: true
  });
}
