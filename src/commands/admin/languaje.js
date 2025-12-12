// src/commands/admin/language.js
import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder
} from "discord.js";
import LanguageModel from "../../models/Language.js";

export default {
  data: new SlashCommandBuilder()
    .setName("language")
    .setDescription("Administra los lenguajes del sistema.")

    // 🔹 /language add
    .addSubcommand(sub =>
      sub
        .setName("add")
        .setDescription("Crea un nuevo lenguaje.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del lenguaje (ej. Común, Élfico)")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("category")
            .setDescription("Categoría del lenguaje")
            .addChoices(
              { name: "Standard", value: "standard" },
              { name: "Exotic", value: "exotic" },
              { name: "Secret", value: "secret" },
              { name: "Otro", value: "other" }
            )
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("script")
            .setDescription("Escritura (opcional)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("speakers")
            .setDescription("Hablantes típicos (separados por comas)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("description")
            .setDescription("Descripción corta")
            .setRequired(false)
        )
    )

    // 🔹 /language delete
    .addSubcommand(sub =>
      sub
        .setName("delete")
        .setDescription("Elimina un lenguaje.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del lenguaje a eliminar")
            .setRequired(true)
        )
    )

    // 🔹 /language enable
    .addSubcommand(sub =>
      sub
        .setName("enable")
        .setDescription("Activa un lenguaje para su uso.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del lenguaje a activar")
            .setRequired(true)
        )
    )

    // 🔹 /language disable
    .addSubcommand(sub =>
      sub
        .setName("disable")
        .setDescription("Desactiva un lenguaje.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del lenguaje a desactivar")
            .setRequired(true)
        )
    )

    // 🔹 /language info
    .addSubcommand(sub =>
      sub
        .setName("info")
        .setDescription("Muestra la información de un lenguaje o lista para elegir.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre del lenguaje")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("id")
            .setDescription("ObjectId del lenguaje (para menús u otros sistemas)")
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
  }
};

// ===================================================================
// /language add
// ===================================================================
async function handleAdd(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden crear lenguajes.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();
  const category = interaction.options.getString("category") || "standard";
  const script = interaction.options.getString("script") || "";
  const speakersRaw = interaction.options.getString("speakers") || "";
  const description = interaction.options.getString("description") || "";

  const existing = await LanguageModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (existing) {
    return interaction.reply({
      content: `❌ Ya existe un lenguaje llamado **${existing.name}**.`,
      ephemeral: true
    });
  }

  const typicalSpeakers = speakersRaw
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  const lang = await LanguageModel.create({
    name,
    category,
    script,
    typicalSpeakers,
    description,
    // asegúrate de que tu modelo tenga este campo:
    // isEnabled: { type: Boolean, default: true }
    isEnabled: true
  });

  const embed = new EmbedBuilder()
    .setTitle(`🗣️ Lenguaje creado: ${lang.name}`)
    .setColor("Green")
    .addFields(
      { name: "Categoría", value: lang.category, inline: true },
      { name: "Escritura", value: lang.script || "—", inline: true },
      {
        name: "Hablantes típicos",
        value: lang.typicalSpeakers.length > 0 ? lang.typicalSpeakers.join(", ") : "No definido",
        inline: false
      },
      {
        name: "Descripción",
        value: lang.description || "Sin descripción.",
        inline: false
      },
      {
        name: "ID (ObjectId)",
        value: `\`${lang._id.toString()}\``,
        inline: false
      }
    );

  return interaction.reply({
    embeds: [embed],
    ephemeral: true
  });
}

// ===================================================================
// /language delete
// ===================================================================
async function handleDelete(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden eliminar lenguajes.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const lang = await LanguageModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!lang) {
    return interaction.reply({
      content: `❌ No encontré ningún lenguaje llamado **${name}**.`,
      ephemeral: true
    });
  }

  await lang.deleteOne();

  return interaction.reply({
    content: `🗑️ El lenguaje **${lang.name}** ha sido eliminado.`,
    ephemeral: true
  });
}

// ===================================================================
// /language enable
// ===================================================================
async function handleEnable(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden activar lenguajes.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const lang = await LanguageModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!lang) {
    return interaction.reply({
      content: `❌ No encontré ningún lenguaje llamado **${name}**.`,
      ephemeral: true
    });
  }

  lang.isEnabled = true;
  await lang.save();

  return interaction.reply({
    content: `✅ Lenguaje **${lang.name}** activado.`,
    ephemeral: true
  });
}

// ===================================================================
// /language disable
// ===================================================================
async function handleDisable(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden desactivar lenguajes.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const lang = await LanguageModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!lang) {
    return interaction.reply({
      content: `❌ No encontré ningún lenguaje llamado **${name}**.`,
      ephemeral: true
    });
  }

  lang.isEnabled = false;
  await lang.save();

  return interaction.reply({
    content: `🚫 Lenguaje **${lang.name}** desactivado.`,
    ephemeral: true
  });
}

// ===================================================================
// /language info
//  - Si pasas id → busca por ObjectId
//  - Si pasas name → busca por nombre
//  - Si no pasas nada → muestra un menú select de lenguajes activos
// ===================================================================
async function handleInfo(interaction) {
  const name = interaction.options.getString("name");

  // 2) Si viene nombre → búsqueda por nombre (case-insensitive)
  if (name) {
    const lang = await LanguageModel.findOne({
      name: new RegExp(`^${name}$`, "i")
    });

    if (!lang) {
      return interaction.reply({
        content: `❌ No encontré ningún lenguaje llamado **${name}**.`,
        ephemeral: true
      });
    }

    const embed = buildLanguageEmbed(lang);
    return interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }

  // 3) Si no hay ni ID ni nombre → mostrar menú seleccionable
  const langs = await LanguageModel.find({ isEnabled: true }).sort({ name: 1 });

  if (langs.length === 0) {
    return interaction.reply({
      content: "⚠️ No hay lenguajes activos para mostrar.",
      ephemeral: true
    });
  }

  const menu = new StringSelectMenuBuilder()
    .setPlaceholder("Elige un lenguaje para ver su información")
    .addOptions(
      langs.slice(0, 25).map(l => ({
        label: l.name,
        value: l._id.toString(), // 👈 aquí usamos el ObjectId
        description: l.category || "sin categoría"
      }))
    );

  const row = new ActionRowBuilder().addComponents(menu);

  return interaction.reply({
    content: "Selecciona un lenguaje del menú:",
    components: [row],
    ephemeral: true
  });
}

// Helper para construir el embed de info
function buildLanguageEmbed(lang) {
  return new EmbedBuilder()
    .setTitle(`🗣️ Lenguaje: ${lang.name}`)
    .setColor(lang.isEnabled ? "Green" : "Red")
    .addFields(
      { name: "Categoría", value: lang.category || "—", inline: true },
      { name: "Escritura", value: lang.script || "—", inline: true },
      {
        name: "Hablantes típicos",
        value:
          lang.typicalSpeakers && lang.typicalSpeakers.length > 0
            ? lang.typicalSpeakers.join(", ")
            : "No definido",
        inline: false
      },
      {
        name: "Descripción",
        value: lang.description || "Sin descripción.",
        inline: false
      },
      {
        name: "Estado",
        value: lang.isEnabled ? "✅ Activo" : "🚫 Desactivado",
        inline: true
      },
      {
        name: "ObjectId",
        value: `\`${lang._id.toString()}\``,
        inline: false
      }
    );
}
