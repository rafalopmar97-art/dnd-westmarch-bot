// src/commands/admin/background.js
import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder
} from "discord.js";
import BackgroundModel from "../../models/Background.js";

function parseCommaList(str) {
  if (!str) return [];
  return str
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
}

// Para rasgos de personalidad / ideales / lazos / defectos
// Usaremos separador por punto y coma ";" para permitir comas dentro del texto
function parseSemiColonList(str) {
  if (!str) return [];
  return str
    .split(";")
    .map(s => s.trim())
    .filter(Boolean);
}

function buildBackgroundEmbed(bg) {
  return new EmbedBuilder()
    .setTitle(`📜 Trasfondo: ${bg.name}`)
    .setColor(bg.isEnabled ? "Green" : "Red")
    .setDescription(bg.description || "Sin descripción.")
    .addFields(
      {
        name: "Competencias de habilidades",
        value: bg.skillProficiencies?.length
          ? bg.skillProficiencies.join(", ")
          : "—",
        inline: false
      },
      {
        name: "Herramientas",
        value: bg.toolProficiencies?.length
          ? bg.toolProficiencies.join(", ")
          : "—",
        inline: false
      },
      {
        name: "Idiomas",
        value: bg.languages?.length ? bg.languages.join(", ") : "—",
        inline: false
      },
      {
        name: "Equipo inicial",
        value: bg.equipment?.length ? bg.equipment.join(", ") : "—",
        inline: false
      },
      {
        name: "Rasgo de trasfondo",
        value: bg.featureName
          ? `**${bg.featureName}**\n${bg.featureDescription || ""}`
          : "—",
        inline: false
      },
      {
        name: "Rasgos de personalidad",
        value:
          bg.personalityTraits?.length
            ? bg.personalityTraits.map(t => `• ${t}`).join("\n")
            : "—",
        inline: false
      },
      {
        name: "Ideales",
        value:
          bg.ideals?.length ? bg.ideals.map(i => `• ${i}`).join("\n") : "—",
        inline: false
      },
      {
        name: "Vínculos",
        value:
          bg.bonds?.length ? bg.bonds.map(b => `• ${b}`).join("\n") : "—",
        inline: false
      },
      {
        name: "Defectos",
        value:
          bg.flaws?.length ? bg.flaws.map(f => `• ${f}`).join("\n") : "—",
        inline: false
      },
      {
        name: "Estado",
        value: bg.isEnabled ? "✅ Activo" : "🚫 Desactivado",
        inline: true
      },
      {
        name: "ObjectId",
        value: `\`${bg._id.toString()}\``,
        inline: false
      }
    );
}

export default {
  data: new SlashCommandBuilder()
    .setName("background")
    .setDescription("Administra los trasfondos del sistema.")

    // 🔹 /background add
    .addSubcommand(sub =>
      sub
        .setName("add")
        .setDescription("Crea un nuevo trasfondo.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del trasfondo (ej. Soldado, Erudito)")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("description")
            .setDescription("Descripción breve del trasfondo")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("skills")
            .setDescription("Competencias de habilidades (ej. Atletismo,Historia)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("tools")
            .setDescription("Competencias de herramientas (ej. Herramientas de ladrón)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("languages")
            .setDescription("Idiomas adicionales (ej. Élfico,Enano)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("equipment")
            .setDescription("Equipo inicial (lista separada por comas)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("feature_name")
            .setDescription("Nombre del rasgo de trasfondo")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("feature_desc")
            .setDescription("Descripción del rasgo de trasfondo")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("traits")
            .setDescription("Rasgos de personalidad (separa cada uno con ';')")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("ideals")
            .setDescription("Ideales (separa cada uno con ';')")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("bonds")
            .setDescription("Vínculos (separa cada uno con ';')")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("flaws")
            .setDescription("Defectos (separa cada uno con ';')")
            .setRequired(false)
        )
    )

    // 🔹 /background delete
    .addSubcommand(sub =>
      sub
        .setName("delete")
        .setDescription("Elimina un trasfondo.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del trasfondo a eliminar")
            .setRequired(true)
        )
    )

    // 🔹 /background enable
    .addSubcommand(sub =>
      sub
        .setName("enable")
        .setDescription("Activa un trasfondo para su uso.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del trasfondo a activar")
            .setRequired(true)
        )
    )

    // 🔹 /background disable
    .addSubcommand(sub =>
      sub
        .setName("disable")
        .setDescription("Desactiva un trasfondo.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del trasfondo a desactivar")
            .setRequired(true)
        )
    )

    // 🔹 /background info
    .addSubcommand(sub =>
      sub
        .setName("info")
        .setDescription("Muestra la información de un trasfondo o abre un menú.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del trasfondo (opcional)")
            .setRequired(false)
        )
    )

    // 🔹 /background edit
    .addSubcommand(sub =>
      sub
        .setName("edit")
        .setDescription("Edita un trasfondo existente.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del trasfondo a editar")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("description")
            .setDescription("Nueva descripción (opcional)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("skills")
            .setDescription("Nuevas competencias de habilidades (coma)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("tools")
            .setDescription("Nuevas competencias de herramientas (coma)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("languages")
            .setDescription("Nuevos idiomas (coma)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("equipment")
            .setDescription("Nuevo equipo inicial (coma)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("feature_name")
            .setDescription("Nuevo nombre del rasgo de trasfondo")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("feature_desc")
            .setDescription("Nueva descripción del rasgo de trasfondo")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("traits")
            .setDescription("Nuevos rasgos de personalidad (separa con ';')")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("ideals")
            .setDescription("Nuevos ideales (separa con ';')")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("bonds")
            .setDescription("Nuevos vínculos (separa con ';')")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("flaws")
            .setDescription("Nuevos defectos (separa con ';')")
            .setRequired(false)
        )
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    if (sub === "add") return handleAdd(interaction);
    if (sub === "delete") return handleDelete(interaction);
    if (sub === "enable") return handleEnable(interaction);
    if (sub === "disable") return handleDisable(interaction);
    if (sub === "info") return handleInfo(interaction);
    if (sub === "edit") return handleEdit(interaction);
  }
};

// ===================================================================
// /background add
// ===================================================================
async function handleAdd(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden crear trasfondos.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const existing = await BackgroundModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (existing) {
    return interaction.reply({
      content: `❌ Ya existe un trasfondo llamado **${existing.name}**.`,
      ephemeral: true
    });
  }

  const description = interaction.options.getString("description") || "";
  const skills = parseCommaList(interaction.options.getString("skills") || "");
  const tools = parseCommaList(interaction.options.getString("tools") || "");
  const languages = parseCommaList(
    interaction.options.getString("languages") || ""
  );
  const equipment = parseCommaList(
    interaction.options.getString("equipment") || ""
  );
  const featureName = interaction.options.getString("feature_name") || "";
  const featureDesc = interaction.options.getString("feature_desc") || "";

  const traits = parseSemiColonList(interaction.options.getString("traits") || "");
  const ideals = parseSemiColonList(interaction.options.getString("ideals") || "");
  const bonds = parseSemiColonList(interaction.options.getString("bonds") || "");
  const flaws = parseSemiColonList(interaction.options.getString("flaws") || "");

  const bg = await BackgroundModel.create({
    name,
    description,
    skillProficiencies: skills,
    toolProficiencies: tools,
    languages,
    equipment,
    featureName,
    featureDescription: featureDesc,
    personalityTraits: traits,
    ideals,
    bonds,
    flaws,
    isEnabled: true
  });

  const embed = buildBackgroundEmbed(bg);

  return interaction.reply({
    content: `✅ Trasfondo **${bg.name}** creado correctamente.`,
    embeds: [embed],
    ephemeral: true
  });
}

// ===================================================================
// /background delete
// ===================================================================
async function handleDelete(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden eliminar trasfondos.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const bg = await BackgroundModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!bg) {
    return interaction.reply({
      content: `❌ No encontré ningún trasfondo llamado **${name}**.`,
      ephemeral: true
    });
  }

  await bg.deleteOne();

  return interaction.reply({
    content: `🗑️ El trasfondo **${bg.name}** ha sido eliminado.`,
    ephemeral: true
  });
}

// ===================================================================
// /background enable
// ===================================================================
async function handleEnable(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden activar trasfondos.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const bg = await BackgroundModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!bg) {
    return interaction.reply({
      content: `❌ No encontré ningún trasfondo llamado **${name}**.`,
      ephemeral: true
    });
  }

  bg.isEnabled = true;
  await bg.save();

  return interaction.reply({
    content: `✅ Trasfondo **${bg.name}** activado.`,
    ephemeral: true
  });
}

// ===================================================================
// /background disable
// ===================================================================
async function handleDisable(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden desactivar trasfondos.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const bg = await BackgroundModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!bg) {
    return interaction.reply({
      content: `❌ No encontré ningún trasfondo llamado **${name}**.`,
      ephemeral: true
    });
  }

  bg.isEnabled = false;
  await bg.save();

  return interaction.reply({
    content: `🚫 Trasfondo **${bg.name}** desactivado.`,
    ephemeral: true
  });
}

// ===================================================================
// /background info
//  - Si pasas name → muestra info de ese trasfondo
//  - Si no pasas nada → muestra menú con trasfondos activos
// ===================================================================
async function handleInfo(interaction) {
  const name = interaction.options.getString("name");

  if (name) {
    const bg = await BackgroundModel.findOne({
      name: new RegExp(`^${name}$`, "i")
    });

    if (!bg) {
      return interaction.reply({
        content: `❌ No encontré ningún trasfondo llamado **${name}**.`,
        ephemeral: true
      });
    }

    const embed = buildBackgroundEmbed(bg);
    return interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }

  const backgrounds = await BackgroundModel.find({ isEnabled: true }).sort({
    name: 1
  });

  if (backgrounds.length === 0) {
    return interaction.reply({
      content: "⚠️ No hay trasfondos activos para mostrar.",
      ephemeral: true
    });
  }

  const menu = new StringSelectMenuBuilder()
    .setCustomId("background_info_select")
    .setPlaceholder("Elige un trasfondo para ver su información")
    .addOptions(
      backgrounds.slice(0, 25).map(b => ({
        label: b.name,
        value: b._id.toString(),
        description:
          b.skillProficiencies?.slice(0, 2).join("/") || "sin resumen"
      }))
    );

  const row = new ActionRowBuilder().addComponents(menu);

  return interaction.reply({
    content: "Selecciona un trasfondo del menú:",
    components: [row],
    ephemeral: true
  });
}

// ===================================================================
// /background edit
// ===================================================================
async function handleEdit(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden editar trasfondos.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const bg = await BackgroundModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!bg) {
    return interaction.reply({
      content: `❌ No encontré ningún trasfondo llamado **${name}**.`,
      ephemeral: true
    });
  }

  const description = interaction.options.getString("description");
  const skillsStr = interaction.options.getString("skills");
  const toolsStr = interaction.options.getString("tools");
  const languagesStr = interaction.options.getString("languages");
  const equipmentStr = interaction.options.getString("equipment");
  const featureName = interaction.options.getString("feature_name");
  const featureDesc = interaction.options.getString("feature_desc");
  const traitsStr = interaction.options.getString("traits");
  const idealsStr = interaction.options.getString("ideals");
  const bondsStr = interaction.options.getString("bonds");
  const flawsStr = interaction.options.getString("flaws");

  if (description !== null) bg.description = description;
  if (skillsStr !== null) bg.skillProficiencies = parseCommaList(skillsStr);
  if (toolsStr !== null) bg.toolProficiencies = parseCommaList(toolsStr);
  if (languagesStr !== null) bg.languages = parseCommaList(languagesStr);
  if (equipmentStr !== null) bg.equipment = parseCommaList(equipmentStr);
  if (featureName !== null) bg.featureName = featureName;
  if (featureDesc !== null) bg.featureDescription = featureDesc;
  if (traitsStr !== null) bg.personalityTraits = parseSemiColonList(traitsStr);
  if (idealsStr !== null) bg.ideals = parseSemiColonList(idealsStr);
  if (bondsStr !== null) bg.bonds = parseSemiColonList(bondsStr);
  if (flawsStr !== null) bg.flaws = parseSemiColonList(flawsStr);

  await bg.save();

  const embed = buildBackgroundEmbed(bg);

  return interaction.reply({
    content: `✏️ Trasfondo **${bg.name}** actualizado.`,
    embeds: [embed],
    ephemeral: true
  });
}
