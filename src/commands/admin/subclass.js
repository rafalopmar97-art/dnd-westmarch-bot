// src/commands/admin/subclass.js
import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder
} from "discord.js";
import ClassModel from "../../models/Class.js";
import SubclassModel from "../../models/Subclass.js";

export default {
  data: new SlashCommandBuilder()
    .setName("subclass")
    .setDescription("Administra las subclases del sistema.")

    // /subclass populate
    .addSubcommand(sub =>
      sub
        .setName("populate")
        .setDescription("Crea una subclase base con rasgos de plantilla.")
        .addStringOption(o =>
          o
            .setName("classname")
            .setDescription("Nombre de la clase base (ej. Guerrero)")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre de la subclase")
            .setRequired(true)
        )
        .addIntegerOption(o =>
          o
            .setName("minlevel")
            .setDescription("Nivel mínimo para elegir la subclase (1–20)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("description")
            .setDescription("Descripción breve de la subclase")
            .setRequired(false)
        )
    )

    // /subclass add
    .addSubcommand(sub =>
      sub
        .setName("add")
        .setDescription("Crea una nueva subclase vacía.")
        .addStringOption(o =>
          o
            .setName("classname")
            .setDescription("Nombre de la clase base")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre de la subclase")
            .setRequired(true)
        )
        .addIntegerOption(o =>
          o
            .setName("minlevel")
            .setDescription("Nivel mínimo (1–20)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("description")
            .setDescription("Descripción breve")
            .setRequired(false)
        )
    )

    // /subclass delete
    .addSubcommand(sub =>
      sub
        .setName("delete")
        .setDescription("Elimina una subclase.")
        .addStringOption(o =>
          o
            .setName("classname")
            .setDescription("Nombre de la clase base")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre de la subclase a eliminar")
            .setRequired(true)
        )
    )

    // /subclass enable
    .addSubcommand(sub =>
      sub
        .setName("enable")
        .setDescription("Activa una subclase.")
        .addStringOption(o =>
          o
            .setName("classname")
            .setDescription("Nombre de la clase base")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre de la subclase a activar")
            .setRequired(true)
        )
    )

    // /subclass disable
    .addSubcommand(sub =>
      sub
        .setName("disable")
        .setDescription("Desactiva una subclase.")
        .addStringOption(o =>
          o
            .setName("classname")
            .setDescription("Nombre de la clase base")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre de la subclase a desactivar")
            .setRequired(true)
        )
    )

    // /subclass info
    .addSubcommand(sub =>
      sub
        .setName("info")
        .setDescription("Muestra información de una subclase.")
        .addStringOption(o =>
          o
            .setName("classname")
            .setDescription("Nombre de la clase base")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre de la subclase")
            .setRequired(true)
        )
    )

    // /subclass edit
    .addSubcommand(sub =>
      sub
        .setName("edit")
        .setDescription("Edita una subclase.")
        .addStringOption(o =>
          o
            .setName("classname")
            .setDescription("Nombre de la clase base")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre actual de la subclase")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("new_name")
            .setDescription("Nuevo nombre (opcional)")
            .setRequired(false)
        )
        .addIntegerOption(o =>
          o
            .setName("minlevel")
            .setDescription("Nuevo nivel mínimo (1–20)")
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
            .setName("enabled")
            .setDescription("Activar o desactivar la subclase")
            .setRequired(false)
        )
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const member = interaction.member;

    // Solo admins
    if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
      return interaction.reply({
        content: "❌ Solo administradores pueden gestionar subclases.",
        ephemeral: true
      });
    }

    if (sub === "populate") return handlePopulate(interaction);
    if (sub === "add") return handleAdd(interaction);
    if (sub === "delete") return handleDelete(interaction);
    if (sub === "enable") return handleEnable(interaction);
    if (sub === "disable") return handleDisable(interaction);
    if (sub === "info") return handleInfo(interaction);
    if (sub === "edit") return handleEdit(interaction);
  }
};

// ========== HELPERS COMUNES ==========

async function findClassByNameOrReply(interaction, className) {
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

async function findSubclass(interaction, cls, subclassName) {
  const sc = await SubclassModel.findOne({
    classRef: cls._id,
    name: new RegExp(`^${subclassName}$`, "i")
  });

  if (!sc) {
    await interaction.reply({
      content: `❌ No encontré la subclase **${subclassName}** para la clase **${cls.name}**.`,
      ephemeral: true
    });
    return null;
  }

  return sc;
}

// ========== /subclass populate ==========
async function handlePopulate(interaction) {
  const className = interaction.options.getString("classname").trim();
  const name = interaction.options.getString("name").trim();
  const minLevel = interaction.options.getInteger("minlevel") ?? 3;
  const description = interaction.options.getString("description") || "";

  if (minLevel < 1 || minLevel > 20) {
    return interaction.reply({
      content: "❌ El nivel mínimo debe estar entre 1 y 20.",
      ephemeral: true
    });
  }

  const cls = await findClassByNameOrReply(interaction, className);
  if (!cls) return;

  const existing = await SubclassModel.findOne({
    classRef: cls._id,
    name: new RegExp(`^${name}$`, "i")
  });

  if (existing) {
    return interaction.reply({
      content: `❌ Ya existe la subclase **${existing.name}** para la clase **${cls.name}**.`,
      ephemeral: true
    });
  }

  // Pequeña plantilla genérica de rasgos
  const templateLevels = [minLevel, minLevel + 3, minLevel + 6, minLevel + 10].filter(
    lvl => lvl <= 20
  );

  const featuresByLevel = templateLevels.map((lvl, i) => ({
    level: lvl,
    name: `Rasgo de subclase ${i + 1}`,
    shortDescription: `Rasgo genérico de subclase desbloqueado al nivel ${lvl}.`
  }));

  const sc = await SubclassModel.create({
    name,
    classRef: cls._id,
    description,
    minLevel,
    featuresByLevel,
    isHomebrew: true,
    isEnabled: true
  });

  const embed = new EmbedBuilder()
    .setTitle(`📗 Subclase creada (plantilla)`)
    .setColor("Green")
    .setDescription(
      `Se creó la subclase **${sc.name}** para la clase **${cls.name}** con algunos rasgos de ejemplo.`
    )
    .addFields(
      { name: "Nivel mínimo", value: `${sc.minLevel}`, inline: true },
      {
        name: "Rasgos iniciales",
        value:
          sc.featuresByLevel.length > 0
            ? sc.featuresByLevel
                .map(f => `• Nivel ${f.level}: ${f.name}`)
                .join("\n")
            : "Sin rasgos (algo raro pasó)."
      }
    );

  return interaction.reply({
    embeds: [embed],
    ephemeral: true
  });
}

// ========== /subclass add ==========
async function handleAdd(interaction) {
  const className = interaction.options.getString("classname").trim();
  const name = interaction.options.getString("name").trim();
  const minLevel = interaction.options.getInteger("minlevel") ?? 3;
  const description = interaction.options.getString("description") || "";

  if (minLevel < 1 || minLevel > 20) {
    return interaction.reply({
      content: "❌ El nivel mínimo debe estar entre 1 y 20.",
      ephemeral: true
    });
  }

  const cls = await findClassByNameOrReply(interaction, className);
  if (!cls) return;

  const existing = await SubclassModel.findOne({
    classRef: cls._id,
    name: new RegExp(`^${name}$`, "i")
  });

  if (existing) {
    return interaction.reply({
      content: `❌ Ya existe la subclase **${existing.name}** para la clase **${cls.name}**.`,
      ephemeral: true
    });
  }

  const sc = await SubclassModel.create({
    name,
    classRef: cls._id,
    description,
    minLevel,
    featuresByLevel: [],
    isHomebrew: true,
    isEnabled: true
  });

  return interaction.reply({
    content: `✅ Subclase **${sc.name}** creada para la clase **${cls.name}**.`,
    ephemeral: true
  });
}

// ========== /subclass delete ==========
async function handleDelete(interaction) {
  const className = interaction.options.getString("classname").trim();
  const name = interaction.options.getString("name").trim();

  const cls = await findClassByNameOrReply(interaction, className);
  if (!cls) return;

  const sc = await findSubclass(interaction, cls, name);
  if (!sc) return;

  await sc.deleteOne();

  return interaction.reply({
    content: `🗑️ Subclase **${sc.name}** de **${cls.name}** eliminada.`,
    ephemeral: true
  });
}

// ========== /subclass enable ==========
async function handleEnable(interaction) {
  const className = interaction.options.getString("classname").trim();
  const name = interaction.options.getString("name").trim();

  const cls = await findClassByNameOrReply(interaction, className);
  if (!cls) return;

  const sc = await findSubclass(interaction, cls, name);
  if (!sc) return;

  sc.isEnabled = true;
  await sc.save();

  return interaction.reply({
    content: `✅ Subclase **${sc.name}** de **${cls.name}** activada.`,
    ephemeral: true
  });
}

// ========== /subclass disable ==========
async function handleDisable(interaction) {
  const className = interaction.options.getString("classname").trim();
  const name = interaction.options.getString("name").trim();

  const cls = await findClassByNameOrReply(interaction, className);
  if (!cls) return;

  const sc = await findSubclass(interaction, cls, name);
  if (!sc) return;

  sc.isEnabled = false;
  await sc.save();

  return interaction.reply({
    content: `🚫 Subclase **${sc.name}** de **${cls.name}** desactivada.`,
    ephemeral: true
  });
}

// ========== /subclass info ==========
async function handleInfo(interaction) {
  const className = interaction.options.getString("classname").trim();
  const name = interaction.options.getString("name").trim();

  const cls = await findClassByNameOrReply(interaction, className);
  if (!cls) return;

  const sc = await findSubclass(interaction, cls, name);
  if (!sc) return;

  const embed = new EmbedBuilder()
    .setTitle(`📗 Subclase: ${sc.name}`)
    .setColor(sc.isEnabled ? "Green" : "Red")
    .setDescription(sc.description || "Sin descripción.")
    .addFields(
      { name: "Clase base", value: cls.name, inline: true },
      { name: "Nivel mínimo", value: `${sc.minLevel}`, inline: true },
      {
        name: "Estado",
        value: sc.isEnabled ? "✅ Activa" : "🚫 Desactivada",
        inline: true
      }
    );

  if (sc.featuresByLevel?.length > 0) {
    const sorted = [...sc.featuresByLevel].sort((a, b) => a.level - b.level);
    embed.addFields({
      name: "Rasgos por nivel",
      value: sorted
        .map(f => `• **Nivel ${f.level}**: ${f.name}`)
        .join("\n")
        .slice(0, 1024),
      inline: false
    });
  } else {
    embed.addFields({
      name: "Rasgos",
      value: "Esta subclase aún no tiene rasgos configurados.",
      inline: false
    });
  }

  return interaction.reply({
    embeds: [embed],
    ephemeral: true
  });
}

// ========== /subclass edit ==========
async function handleEdit(interaction) {
  const className = interaction.options.getString("classname").trim();
  const name = interaction.options.getString("name").trim();
  const newName = interaction.options.getString("new_name");
  const minLevel = interaction.options.getInteger("minlevel");
  const description = interaction.options.getString("description");
  const enabled = interaction.options.getBoolean("enabled");

  const cls = await findClassByNameOrReply(interaction, className);
  if (!cls) return;

  const sc = await findSubclass(interaction, cls, name);
  if (!sc) return;

  if (newName) sc.name = newName.trim();
  if (typeof minLevel === "number") {
    if (minLevel < 1 || minLevel > 20) {
      return interaction.reply({
        content: "❌ El nivel mínimo debe estar entre 1 y 20.",
        ephemeral: true
      });
    }
    sc.minLevel = minLevel;
  }
  if (typeof description === "string") {
    sc.description = description;
  }
  if (typeof enabled === "boolean") {
    sc.isEnabled = enabled;
  }

  await sc.save();

  return interaction.reply({
    content: `✏️ Subclase **${name}** de **${cls.name}** actualizada correctamente.`,
    ephemeral: true
  });
}
