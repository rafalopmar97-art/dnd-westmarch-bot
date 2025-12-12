// src/commands/admin/subclass_feature.js
import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder
} from "discord.js";
import ClassModel from "../../models/Class.js";
import SubclassModel from "../../models/Subclass.js";

export default {
  data: new SlashCommandBuilder()
    .setName("subclass_feature")
    .setDescription("Administra los rasgos de una subclase.")

    // /subclass_feature add
    .addSubcommand(sub =>
      sub
        .setName("add")
        .setDescription("Agrega un rasgo a una subclase.")
        .addStringOption(o =>
          o
            .setName("classname")
            .setDescription("Nombre de la clase base")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("subclassname")
            .setDescription("Nombre de la subclase")
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

    // /subclass_feature delete
    .addSubcommand(sub =>
      sub
        .setName("delete")
        .setDescription("Elimina rasgos de una subclase.")
        .addStringOption(o =>
          o
            .setName("classname")
            .setDescription("Nombre de la clase base")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("subclassname")
            .setDescription("Nombre de la subclase")
            .setRequired(true)
        )
        .addIntegerOption(o =>
          o
            .setName("level")
            .setDescription("Nivel del rasgo a eliminar")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre específico del rasgo (opcional). Si lo omites, borra todos los rasgos de ese nivel.")
            .setRequired(false)
        )
    )

    // /subclass_feature list
    .addSubcommand(sub =>
      sub
        .setName("list")
        .setDescription("Lista los rasgos de una subclase.")
        .addStringOption(o =>
          o
            .setName("classname")
            .setDescription("Nombre de la clase base")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("subclassname")
            .setDescription("Nombre de la subclase")
            .setRequired(true)
        )
    )

    // /subclass_feature populate
    .addSubcommand(sub =>
      sub
        .setName("populate")
        .setDescription("Genera rasgos genéricos para una subclase (plantilla).")
        .addStringOption(o =>
          o
            .setName("classname")
            .setDescription("Nombre de la clase base")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("subclassname")
            .setDescription("Nombre de la subclase")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const member = interaction.member;

    if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
      return interaction.reply({
        content: "❌ Solo administradores pueden gestionar rasgos de subclase.",
        ephemeral: true
      });
    }

    if (sub === "add") return handleAddFeature(interaction);
    if (sub === "delete") return handleDeleteFeature(interaction);
    if (sub === "list") return handleListFeatures(interaction);
    if (sub === "populate") return handlePopulateFeatures(interaction);
  }
};

// Helpers comunes
async function findClass(interaction, className) {
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

async function findSubclass(interaction, className, subclassName) {
  const cls = await findClass(interaction, className);
  if (!cls) return { cls: null, sc: null };

  const sc = await SubclassModel.findOne({
    classRef: cls._id,
    name: new RegExp(`^${subclassName}$`, "i")
  });

  if (!sc) {
    await interaction.reply({
      content: `❌ No encontré la subclase **${subclassName}** para la clase **${cls.name}**.`,
      ephemeral: true
    });
    return { cls: null, sc: null };
  }

  return { cls, sc };
}

// ========== add ==========
async function handleAddFeature(interaction) {
  const className = interaction.options.getString("classname").trim();
  const subclassName = interaction.options.getString("subclassname").trim();
  const level = interaction.options.getInteger("level");
  const name = interaction.options.getString("name").trim();
  const description = interaction.options.getString("description") || "";

  if (level < 1 || level > 20) {
    return interaction.reply({
      content: "❌ El nivel debe estar entre 1 y 20.",
      ephemeral: true
    });
  }

  const { cls, sc } = await findSubclass(interaction, className, subclassName);
  if (!cls || !sc) return;

  sc.featuresByLevel.push({
    level,
    name,
    shortDescription: description
  });

  // Ordenar por nivel
  sc.featuresByLevel.sort((a, b) => a.level - b.level);

  await sc.save();

  return interaction.reply({
    content: `✅ Rasgo **${name}** agregado a la subclase **${sc.name}** (clase **${cls.name}**) al nivel ${level}.`,
    ephemeral: true
  });
}

// ========== delete ==========
async function handleDeleteFeature(interaction) {
  const className = interaction.options.getString("classname").trim();
  const subclassName = interaction.options.getString("subclassname").trim();
  const level = interaction.options.getInteger("level");
  const featureName = interaction.options.getString("name");

  const { cls, sc } = await findSubclass(interaction, className, subclassName);
  if (!cls || !sc) return;

  const before = sc.featuresByLevel.length;

  if (featureName) {
    sc.featuresByLevel = sc.featuresByLevel.filter(
      f => !(f.level === level && f.name.toLowerCase() === featureName.toLowerCase())
    );
  } else {
    sc.featuresByLevel = sc.featuresByLevel.filter(f => f.level !== level);
  }

  const removed = before - sc.featuresByLevel.length;

  if (removed === 0) {
    return interaction.reply({
      content: "⚠️ No se encontró ningún rasgo que coincida con esos criterios.",
      ephemeral: true
    });
  }

  await sc.save();

  return interaction.reply({
    content: `🗑️ Se eliminaron **${removed}** rasgo(s) al nivel ${level} de la subclase **${sc.name}**.`,
    ephemeral: true
  });
}

// ========== list ==========
async function handleListFeatures(interaction) {
  const className = interaction.options.getString("classname").trim();
  const subclassName = interaction.options.getString("subclassname").trim();

  const { cls, sc } = await findSubclass(interaction, className, subclassName);
  if (!cls || !sc) return;

  const embed = new EmbedBuilder()
    .setTitle(`📜 Rasgos de ${sc.name} (${cls.name})`)
    .setColor("Blue");

  if (!sc.featuresByLevel || sc.featuresByLevel.length === 0) {
    embed.setDescription("Esta subclase aún no tiene rasgos configurados.");
  } else {
    const sorted = [...sc.featuresByLevel].sort((a, b) => a.level - b.level);

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

// ========== populate ==========
async function handlePopulateFeatures(interaction) {
  const className = interaction.options.getString("classname").trim();
  const subclassName = interaction.options.getString("subclassname").trim();

  const { cls, sc } = await findSubclass(interaction, className, subclassName);
  if (!cls || !sc) return;

  // Patrón típico de niveles de subclase estilo 5e: 3, 7, 10, 15, 18 (pero puedes cambiarlo)
  const patternLevels = [3, 7, 10, 15, 18];

  let added = 0;

  for (const lvl of patternLevels) {
    const exists = sc.featuresByLevel.some(f => f.level === lvl);
    if (!exists) {
      sc.featuresByLevel.push({
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

  sc.featuresByLevel.sort((a, b) => a.level - b.level);
  await sc.save();

  return interaction.reply({
      content: `✅ Se agregaron **${added}** rasgos genéricos a la subclase **${sc.name}** de **${cls.name}**.`,
          ephemeral: true
            });
}
