// src/commands/admin/class.js
import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder
} from "discord.js";
import ClassModel from "../../models/Class.js";

export default {
  data: new SlashCommandBuilder()
    .setName("class")
    .setDescription("Administra las clases del sistema.")

    // 🔹 /class add
    .addSubcommand(sub =>
      sub
        .setName("add")
        .setDescription("Crea una nueva clase.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre de la clase (ej. Fighter)")
            .setRequired(true)
        )
        .addIntegerOption(o =>
          o
            .setName("hitdie")
            .setDescription("Dado de golpe: 6, 8, 10 o 12")
            .setRequired(true)
        )
        .addStringOption(o =>
          o
            .setName("description")
            .setDescription("Descripción breve de la clase")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("primary_ability")
            .setDescription("Atributos principales (ej. STR,DEX) separados por comas")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("saving_throws")
            .setDescription("Salvaciones competentes (ej. STR,CON) separados por comas")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("armor")
            .setDescription("Competencias de armadura, separadas por comas")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("weapons")
            .setDescription("Competencias de armas, separadas por comas")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("tools")
            .setDescription("Competencias de herramientas, separadas por comas")
            .setRequired(false)
        )
        .addIntegerOption(o =>
          o
            .setName("skills_total")
            .setDescription("Número total de habilidades a elegir")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("skills_options")
            .setDescription("Lista de habilidades posibles, separadas por comas")
            .setRequired(false)
        )
    )

    // 🔹 /class delete
    .addSubcommand(sub =>
      sub
        .setName("delete")
        .setDescription("Elimina una clase.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre de la clase a eliminar")
            .setRequired(true)
        )
    )

    // 🔹 /class enable
    .addSubcommand(sub =>
      sub
        .setName("enable")
        .setDescription("Activa una clase para su uso.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre de la clase a activar")
            .setRequired(true)
        )
    )

    // 🔹 /class disable
    .addSubcommand(sub =>
      sub
        .setName("disable")
        .setDescription("Desactiva una clase.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre de la clase a desactivar")
            .setRequired(true)
        )
    )

    // 🔹 /class info (menú si no hay nombre)
    .addSubcommand(sub =>
      sub
        .setName("info")
        .setDescription("Muestra información de una clase o abre un menú para elegir.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre de la clase (opcional, si no se usa se muestra un menú)")
            .setRequired(false)
        )
    )

    // 🔹 /class edit
    .addSubcommand(sub =>
      sub
        .setName("edit")
        .setDescription("Edita una clase existente.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre de la clase a editar")
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
            .setName("primary_ability")
            .setDescription("Nuevos atributos principales (ej. STR,DEX)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("saving_throws")
            .setDescription("Nuevas salvaciones competentes (ej. STR,CON)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("armor")
            .setDescription("Nuevas competencias de armadura")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("weapons")
            .setDescription("Nuevas competencias de armas")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("tools")
            .setDescription("Nuevas competencias de herramientas")
            .setRequired(false)
        )
        .addIntegerOption(o =>
          o
            .setName("skills_total")
            .setDescription("Nuevo número total de habilidades a elegir")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("skills_options")
            .setDescription("Nueva lista de habilidades posibles")
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

// ===============================
// Helpers
// ===============================
function parseCommaList(str) {
  if (!str) return [];
  return str
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
}

function buildClassEmbed(cls) {
  return new EmbedBuilder()
    .setTitle(`📘 Clase: ${cls.name}`)
    .setColor(cls.isEnabled ? "Green" : "Red")
    .setDescription(cls.description || "Sin descripción.")
    .addFields(
      { name: "Dado de golpe", value: `d${cls.hitDie}`, inline: true },
      {
        name: "Atributos principales",
        value: cls.primaryAbility?.length ? cls.primaryAbility.join(", ") : "—",
        inline: true
      },
      {
        name: "Salvaciones competentes",
        value: cls.savingThrows?.length ? cls.savingThrows.join(", ") : "—",
        inline: true
      },
      {
        name: "Armaduras",
        value: cls.armorProficiencies?.length
          ? cls.armorProficiencies.join(", ")
          : "—",
        inline: false
      },
      {
        name: "Armas",
        value: cls.weaponProficiencies?.length
          ? cls.weaponProficiencies.join(", ")
          : "—",
        inline: false
      },
      {
        name: "Herramientas",
        value: cls.toolProficiencies?.length
          ? cls.toolProficiencies.join(", ")
          : "—",
        inline: false
      },
      {
        name: "Habilidades a elegir",
        value:
          cls.skillChoices?.total && cls.skillChoices?.options?.length
            ? `${cls.skillChoices.total} de: ${cls.skillChoices.options.join(", ")}`
            : "—",
        inline: false
      },
      {
        name: "Estado",
        value: cls.isEnabled ? "✅ Activa" : "🚫 Desactivada",
        inline: true
      },
      {
        name: "ObjectId",
        value: `\`${cls._id.toString()}\``,
        inline: false
      }
    );
}

// ===============================
// /class add
// ===============================
async function handleAdd(interaction) {
  const member = interaction.member;
  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden crear clases.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();
  const hitDie = interaction.options.getInteger("hitdie");

  if (![6, 8, 10, 12].includes(hitDie)) {
    return interaction.reply({
      content: "❌ El dado de golpe debe ser 6, 8, 10 o 12.",
      ephemeral: true
    });
  }

  const existing = await ClassModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (existing) {
    return interaction.reply({
      content: `❌ Ya existe una clase llamada **${existing.name}**.`,
      ephemeral: true
    });
  }

  const description = interaction.options.getString("description") || "";
  const primaryAbility = parseCommaList(
    interaction.options.getString("primary_ability") || ""
  );
  const savingThrows = parseCommaList(
    interaction.options.getString("saving_throws") || ""
  );
  const armorProficiencies = parseCommaList(
    interaction.options.getString("armor") || ""
  );
  const weaponProficiencies = parseCommaList(
    interaction.options.getString("weapons") || ""
  );
  const toolProficiencies = parseCommaList(
    interaction.options.getString("tools") || ""
  );
  const skillsTotal = interaction.options.getInteger("skills_total") || 0;
  const skillsOptions = parseCommaList(
    interaction.options.getString("skills_options") || ""
  );

  const cls = await ClassModel.create({
    name,
    hitDie,
    description,
    primaryAbility,
    savingThrows,
    armorProficiencies,
    weaponProficiencies,
    toolProficiencies,
    skillChoices: {
      total: skillsTotal,
      options: skillsOptions
    },
    isEnabled: true // asegúrate de que el modelo tenga este campo
  });

  const embed = buildClassEmbed(cls);

  return interaction.reply({
    content: `✅ Clase **${cls.name}** creada correctamente.`,
    embeds: [embed],
    ephemeral: true
  });
}

// ===============================
// /class delete
// ===============================
async function handleDelete(interaction) {
  const member = interaction.member;
  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden eliminar clases.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const cls = await ClassModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!cls) {
    return interaction.reply({
      content: `❌ No encontré ninguna clase llamada **${name}**.`,
      ephemeral: true
    });
  }

  await cls.deleteOne();

  return interaction.reply({
    content: `🗑️ La clase **${cls.name}** ha sido eliminada.`,
    ephemeral: true
  });
}

// ===============================
// /class enable
// ===============================
async function handleEnable(interaction) {
  const member = interaction.member;
  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden activar clases.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const cls = await ClassModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!cls) {
    return interaction.reply({
      content: `❌ No encontré ninguna clase llamada **${name}**.`,
      ephemeral: true
    });
  }

  cls.isEnabled = true;
  await cls.save();

  return interaction.reply({
    content: `✅ Clase **${cls.name}** activada.`,
    ephemeral: true
  });
}

// ===============================
// /class disable
// ===============================
async function handleDisable(interaction) {
  const member = interaction.member;
  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden desactivar clases.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const cls = await ClassModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!cls) {
    return interaction.reply({
      content: `❌ No encontré ninguna clase llamada **${name}**.`,
      ephemeral: true
    });
  }

  cls.isEnabled = false;
  await cls.save();

  return interaction.reply({
    content: `🚫 Clase **${cls.name}** desactivada.`,
    ephemeral: true
  });
}

// ===============================
// /class info
//  - Si pasas name → muestra info de esa clase
//  - Si no pasas nada → menú con clases activas
// ===============================
async function handleInfo(interaction) {
  const name = interaction.options.getString("name");

  if (name) {
    const cls = await ClassModel.findOne({
      name: new RegExp(`^${name}$`, "i")
    });

    if (!cls) {
      return interaction.reply({
        content: `❌ No encontré ninguna clase llamada **${name}**.`,
        ephemeral: true
      });
    }

    const embed = buildClassEmbed(cls);
    return interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }

  const classes = await ClassModel.find({ isEnabled: true }).sort({ name: 1 });

  if (classes.length === 0) {
    return interaction.reply({
      content: "⚠️ No hay clases activas para mostrar.",
      ephemeral: true
    });
  }

  const menu = new StringSelectMenuBuilder()
    .setCustomId("class_info_select")
    .setPlaceholder("Elige una clase para ver su información")
    .addOptions(
      classes.slice(0, 25).map(c => ({
        label: c.name,
        value: c._id.toString(),
        description: `d${c.hitDie} | ${
          c.primaryAbility?.join("/") || "sin atributo principal"
        }`
      }))
    );

  const row = new ActionRowBuilder().addComponents(menu);

  return interaction.reply({
    content: "Selecciona una clase del menú:",
    components: [row],
    ephemeral: true
  });
}

// ===============================
// /class edit
// ===============================
async function handleEdit(interaction) {
  const member = interaction.member;
  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden editar clases.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const cls = await ClassModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!cls) {
    return interaction.reply({
      content: `❌ No encontré ninguna clase llamada **${name}**.`,
      ephemeral: true
    });
  }

  const description = interaction.options.getString("description");
  const primaryAbilityStr = interaction.options.getString("primary_ability");
  const savingThrowsStr = interaction.options.getString("saving_throws");
  const armorStr = interaction.options.getString("armor");
  const weaponsStr = interaction.options.getString("weapons");
  const toolsStr = interaction.options.getString("tools");
  const skillsTotal = interaction.options.getInteger("skills_total");
  const skillsOptionsStr = interaction.options.getString("skills_options");

  if (description !== null) cls.description = description;
  if (primaryAbilityStr !== null) cls.primaryAbility = parseCommaList(primaryAbilityStr);
  if (savingThrowsStr !== null) cls.savingThrows = parseCommaList(savingThrowsStr);
  if (armorStr !== null) cls.armorProficiencies = parseCommaList(armorStr);
  if (weaponsStr !== null) cls.weaponProficiencies = parseCommaList(weaponsStr);
  if (toolsStr !== null) cls.toolProficiencies = parseCommaList(toolsStr);
  if (skillsTotal !== null) {
    cls.skillChoices.total = skillsTotal;
  }
  if (skillsOptionsStr !== null) {
    cls.skillChoices.options = parseCommaList(skillsOptionsStr);
  }

  await cls.save();

  const embed = buildClassEmbed(cls);

  return interaction.reply({
    content: `✏️ Clase **${cls.name}** actualizada.`,
    embeds: [embed],
    ephemeral: true
  });
}
