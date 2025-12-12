// src/commands/admin/feat.js
import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder
} from "discord.js";

import FeatModel from "../../models/Feats.js";

export default {
  data: new SlashCommandBuilder()
    .setName("feat")
    .setDescription("Administra los dotes del sistema.")

    // 🔹 /feat add
    .addSubcommand(sub =>
      sub
        .setName("add")
        .setDescription("Crea un nuevo dote.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del dote")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("description")
            .setDescription("Descripción corta del dote")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("prerequisites")
            .setDescription("Requisitos del dote (texto libre)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("ability_bonuses")
            .setDescription("Bonos de característica, ej: STR+1, DEX+1")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("skills")
            .setDescription("Habilidades que otorga, separadas por coma")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("tools")
            .setDescription("Herramientas que otorga, separadas por coma")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("weapons")
            .setDescription("Armas que otorga, separadas por coma")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("special_rules")
            .setDescription("Notas / reglas especiales del dote")
            .setRequired(false)
        )
    )

    // 🔹 /feat delete
    .addSubcommand(sub =>
      sub
        .setName("delete")
        .setDescription("Elimina un dote por nombre.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del dote a eliminar")
            .setRequired(true)
        )
    )

    // 🔹 /feat enable
    .addSubcommand(sub =>
      sub
        .setName("enable")
        .setDescription("Activa un dote.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del dote a activar")
            .setRequired(true)
        )
    )

    // 🔹 /feat disable
    .addSubcommand(sub =>
      sub
        .setName("disable")
        .setDescription("Desactiva un dote.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del dote a desactivar")
            .setRequired(true)
        )
    )

    // 🔹 /feat edit
    .addSubcommand(sub =>
      sub
        .setName("edit")
        .setDescription("Edita campos básicos de un dote.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del dote a editar")
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
            .setName("prerequisites")
            .setDescription("Nuevos requisitos (opcional)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("ability_bonuses")
            .setDescription("Nuevos bonos, ej: STR+1, DEX+1 (reemplaza todo)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("special_rules")
            .setDescription("Nuevas notas / reglas especiales")
            .setRequired(false)
        )
    )

    // 🔹 /feat info (solo menú seleccionable)
    .addSubcommand(sub =>
      sub
        .setName("info")
        .setDescription("Muestra información de un dote mediante un menú seleccionable.")
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    if (sub === "add") return handleAdd(interaction);
    if (sub === "delete") return handleDelete(interaction);
    if (sub === "enable") return handleEnable(interaction);
    if (sub === "disable") return handleDisable(interaction);
    if (sub === "edit") return handleEdit(interaction);
    if (sub === "info") return handleInfo(interaction);
  }
};

// ===================================================================
// Utilidad: parsear "STR+1, DEX+2" a [{ ability, value }, ...]
// ===================================================================
function parseAbilityBonuses(raw) {
  if (!raw) return [];

  return raw
    .split(",")
    .map(p => p.trim())
    .filter(Boolean)
    .map(token => {
      // Formato esperado: XXX+N o XXX-N
      const match = token.match(/^([A-Za-z]{3})\s*([+-]?\d+)$/);
      if (!match) return null;

      const ability = match[1].toUpperCase();
      const value = parseInt(match[2], 10);

      return { ability, value };
    })
    .filter(Boolean);
}

// ===================================================================
// /feat add
// ===================================================================
async function handleAdd(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden crear dotes.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();
  const description = interaction.options.getString("description") || "";
  const prerequisites = interaction.options.getString("prerequisites") || "";
  const abilityBonusesRaw = interaction.options.getString("ability_bonuses") || "";
  const skillsRaw = interaction.options.getString("skills") || "";
  const toolsRaw = interaction.options.getString("tools") || "";
  const weaponsRaw = interaction.options.getString("weapons") || "";
  const specialRules = interaction.options.getString("special_rules") || "";

  const existing = await FeatModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (existing) {
    return interaction.reply({
      content: `❌ Ya existe un dote llamado **${existing.name}**.`,
      ephemeral: true
    });
  }

  const abilityBonuses = parseAbilityBonuses(abilityBonusesRaw);

  const skillProficiencies = skillsRaw
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  const toolProficiencies = toolsRaw
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  const weaponProficiencies = weaponsRaw
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  const feat = await FeatModel.create({
    name,
    description,
    prerequisites,
    abilityBonuses,
    skillProficiencies,
    toolProficiencies,
    weaponProficiencies,
    specialRules,
    isHomebrew: true,
    isEnabled: true
  });

  const embed = buildFeatEmbed(feat);

  return interaction.reply({
    content: "✅ Dote creado correctamente.",
    embeds: [embed],
    ephemeral: true
  });
}

// ===================================================================
// /feat delete
// ===================================================================
async function handleDelete(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden eliminar dotes.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const feat = await FeatModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!feat) {
    return interaction.reply({
      content: `❌ No encontré ningún dote llamado **${name}**.`,
      ephemeral: true
    });
  }

  await feat.deleteOne();

  return interaction.reply({
    content: `🗑️ El dote **${feat.name}** ha sido eliminado.`,
    ephemeral: true
  });
}

// ===================================================================
// /feat enable
// ===================================================================
async function handleEnable(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden activar dotes.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const feat = await FeatModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!feat) {
    return interaction.reply({
      content: `❌ No encontré ningún dote llamado **${name}**.`,
      ephemeral: true
    });
  }

  feat.isEnabled = true;
  await feat.save();

  return interaction.reply({
    content: `✅ Dote **${feat.name}** activado.`,
    ephemeral: true
  });
}

// ===================================================================
// /feat disable
// ===================================================================
async function handleDisable(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden desactivar dotes.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const feat = await FeatModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!feat) {
    return interaction.reply({
      content: `❌ No encontré ningún dote llamado **${name}**.`,
      ephemeral: true
    });
  }

  feat.isEnabled = false;
  await feat.save();

  return interaction.reply({
    content: `🚫 Dote **${feat.name}** desactivado.`,
    ephemeral: true
  });
}

// ===================================================================
// /feat edit
// ===================================================================
async function handleEdit(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden editar dotes.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const feat = await FeatModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!feat) {
    return interaction.reply({
      content: `❌ No encontré ningún dote llamado **${name}**.`,
      ephemeral: true
    });
  }

  const description = interaction.options.getString("description");
  const prerequisites = interaction.options.getString("prerequisites");
  const abilityBonusesRaw = interaction.options.getString("ability_bonuses");
  const specialRules = interaction.options.getString("special_rules");

  if (description !== null) feat.description = description;
  if (prerequisites !== null) feat.prerequisites = prerequisites;
  if (specialRules !== null) feat.specialRules = specialRules;
  if (abilityBonusesRaw !== null) {
    feat.abilityBonuses = parseAbilityBonuses(abilityBonusesRaw);
  }

  await feat.save();

  const embed = buildFeatEmbed(feat);

  return interaction.reply({
    content: `✏️ Dote **${feat.name}** actualizado.`,
    embeds: [embed],
    ephemeral: true
  });
}

// ===================================================================
// /feat info → solo menú seleccionable
// ===================================================================
async function handleInfo(interaction) {
  const feats = await FeatModel.find({ isEnabled: true }).sort({ name: 1 });

  if (feats.length === 0) {
    return interaction.reply({
      content: "⚠️ No hay dotes activos para mostrar.",
      ephemeral: true
    });
  }

  const menu = new StringSelectMenuBuilder()
    .setCustomId("feat_info_select")
    .setPlaceholder("Elige un dote para ver su información")
    .addOptions(
      feats.slice(0, 25).map(f => ({
        label: f.name,
        value: f._id.toString(),
        description: (f.prerequisites || "Sin requisitos").slice(0, 90)
      }))
    );

  const row = new ActionRowBuilder().addComponents(menu);

  return interaction.reply({
    content: "Selecciona un dote del menú:",
    components: [row],
    ephemeral: true
  });
}

// ===================================================================
// Helper: construir embed de feat
// ===================================================================
function buildFeatEmbed(feat) {
  const abilityText =
    feat.abilityBonuses && feat.abilityBonuses.length > 0
      ? feat.abilityBonuses.map(b => `${b.ability}+${b.value}`).join(", ")
      : "Ninguno";

  const skillsText =
    feat.skillProficiencies && feat.skillProficiencies.length > 0
      ? feat.skillProficiencies.join(", ")
      : "Ninguna";

  const toolsText =
    feat.toolProficiencies && feat.toolProficiencies.length > 0
      ? feat.toolProficiencies.join(", ")
      : "Ninguna";

  const weaponsText =
    feat.weaponProficiencies && feat.weaponProficiencies.length > 0
      ? feat.weaponProficiencies.join(", ")
      : "Ninguna";

  return new EmbedBuilder()
    .setTitle(`🧿 Dote: ${feat.name}`)
    .setColor(feat.isEnabled ? "Green" : "Red")
    .setDescription(feat.description || "Sin descripción.")
    .addFields(
      {
        name: "Requisitos",
        value: feat.prerequisites || "Sin requisitos específicos.",
        inline: false
      },
      {
        name: "Bonos de característica",
        value: abilityText,
        inline: false
      },
      {
        name: "Competencias (habilidades)",
        value: skillsText,
        inline: false
      },
      {
        name: "Competencias (herramientas)",
        value: toolsText,
        inline: false
      },
      {
        name: "Competencias (armas)",
        value: weaponsText,
        inline: false
      },
      {
        name: "Reglas especiales",
        value: feat.specialRules || "Ninguna.",
        inline: false
      },
      {
        name: "Estado",
        value: feat.isEnabled ? "✅ Activo" : "🚫 Desactivado",
        inline: true
      },
      {
        name: "ObjectId",
        value: `\`${feat._id.toString()}\``,
        inline: false
      }
    );
}
