import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder
} from "discord.js";
import RaceModel from "../../models/Race.js";
import LanguageModel from "../../models/Language.js";

export default {
  data: new SlashCommandBuilder()
    .setName("race")
    .setDescription("Administra las razas disponibles.")

    // /race add
    .addSubcommand(sub =>
      sub
        .setName("add")
        .setDescription("Crea una nueva raza.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre de la raza (ej. Humano, Elfo)")
            .setRequired(true)
        )
        .addIntegerOption(o =>
          o
            .setName("speed")
            .setDescription("Velocidad base (ej. 30)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("size")
            .setDescription("Tamaño de la raza")
            .addChoices(
              { name: "Tiny", value: "Tiny" },
              { name: "Small", value: "Small" },
              { name: "Medium", value: "Medium" },
              { name: "Large", value: "Large" }
            )
            .setRequired(false)
        )
        .addIntegerOption(o =>
          o
            .setName("darkvision")
            .setDescription("Rango de visión en la oscuridad (0 si no tiene)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("languages")
            .setDescription("Lenguajes por defecto, separados por coma (por nombre)")
            .setRequired(false)
        )
        .addIntegerOption(o =>
          o
            .setName("extra_languages")
            .setDescription("Cantidad de lenguajes extra que puede elegir el jugador")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("extra_categories")
            .setDescription("Categorías permitidas para lenguajes extra (standard,exotic,secret...)")
            .setRequired(false)
        )
    )

    // /race delete
    .addSubcommand(sub =>
      sub
        .setName("delete")
        .setDescription("Elimina una raza.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre de la raza a eliminar")
            .setRequired(true)
        )
    )

    // /race info
    .addSubcommand(sub =>
      sub
        .setName("info")
        .setDescription("Muestra la información de una raza.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre de la raza")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    if (sub === "add") return handleAdd(interaction);
    if (sub === "delete") return handleDelete(interaction);
    if (sub === "info") return handleInfo(interaction);
  }
};

// ======================
// /race add
// ======================
async function handleAdd(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden crear razas.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();
  const speed = interaction.options.getInteger("speed") ?? 30;
  const size = interaction.options.getString("size") || "Medium";
  const darkvision = interaction.options.getInteger("darkvision") ?? 0;

  const languagesRaw = interaction.options.getString("languages") || "";
  const extraLangCount = interaction.options.getInteger("extra_languages") ?? 0;
  const extraCategoriesRaw = interaction.options.getString("extra_categories") || "";

  // ¿Ya existe la raza?
  const existing = await RaceModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (existing) {
    return interaction.reply({
      content: `❌ Ya existe una raza llamada **${existing.name}**.`,
      ephemeral: true
    });
  }

  // Resolver lenguajes por nombre
  let languageIds = [];
  if (languagesRaw.trim().length > 0) {
    const names = languagesRaw
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const langs = await LanguageModel.find({
      name: { $in: names }
    });

    // advertencia si alguno no se encontró
    const foundNames = langs.map(l => l.name);
    const notFound = names.filter(n => !foundNames.includes(n));

    if (notFound.length > 0) {
      await interaction.reply({
        content:
          "⚠️ Algunos lenguajes no se encontraron y fueron ignorados: " +
          notFound.map(n => `**${n}**`).join(", "),
        ephemeral: true
      });
    }

    languageIds = langs.map(l => l._id);
  }

  const extraCategories = extraCategoriesRaw
    .split(",")
    .map(c => c.trim())
    .filter(Boolean);

  const race = await RaceModel.create({
    name,
    speed,
    size,
    darkvisionRange: darkvision,
    languages: languageIds,
    extraLanguages: {
      count: extraLangCount,
      allowedCategories: extraCategories
    }
  });

  const embed = new EmbedBuilder()
    .setTitle(`🧬 Raza creada: ${race.name}`)
    .setColor("Green")
    .addFields(
      { name: "Velocidad", value: `${race.speed} ft`, inline: true },
      { name: "Tamaño", value: race.size, inline: true },
      {
        name: "Darkvision",
        value: race.darkvisionRange > 0 ? `${race.darkvisionRange} ft` : "No tiene",
        inline: true
      },
      {
        name: "Lenguajes (IDs)",
        value:
          race.languages.length > 0
            ? race.languages.map(id => `\`${id.toString()}\``).join(", ")
            : "Ninguno enlazado",
        inline: false
      },
      {
        name: "Lenguajes extra",
        value:
          race.extraLanguages.count > 0
            ? `Elige **${race.extraLanguages.count}** lenguaje(s) extra de categorías: ${
                race.extraLanguages.allowedCategories.length > 0
                  ? race.extraLanguages.allowedCategories.join(", ")
                  : "cualquiera"
              }`
            : "No otorga lenguajes extra",
        inline: false
      }
    );

  return interaction.followUp
    ? interaction.followUp({ embeds: [embed], ephemeral: true })
    : interaction.reply({ embeds: [embed], ephemeral: true });
}

// ======================
// /race delete
// ======================
async function handleDelete(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden eliminar razas.",
      ephemeral: true
    });
  }

  const name = interaction.options.getString("name").trim();

  const race = await RaceModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  });

  if (!race) {
    return interaction.reply({
      content: `❌ No encontré ninguna raza llamada **${name}**.`,
      ephemeral: true
    });
  }

  await race.deleteOne();

  return interaction.reply({
    content: `🗑️ La raza **${race.name}** ha sido eliminada.`,
    ephemeral: true
  });
}

// ======================
// /race info
// ======================
async function handleInfo(interaction) {
  const name = interaction.options.getString("name").trim();

  const race = await RaceModel.findOne({
    name: new RegExp(`^${name}$`, "i")
  }).populate("languages"); // 👈 importante para ver los nombres de Language

  if (!race) {
    return interaction.reply({
      content: `❌ No encontré ninguna raza llamada **${name}**.`,
      ephemeral: true
    });
  }

  const langNames =
    race.languages && race.languages.length > 0
      ? race.languages.map(l => l.name).join(", ")
      : "Ninguno";

  const embed = new EmbedBuilder()
    .setTitle(`🧬 Raza: ${race.name}`)
    .setColor("Blue")
    .addFields(
      { name: "Velocidad", value: `${race.speed} ft`, inline: true },
      { name: "Tamaño", value: race.size, inline: true },
      {
        name: "Darkvision",
        value: race.darkvisionRange > 0 ? `${race.darkvisionRange} ft` : "No tiene",
        inline: true
      },
      {
        name: "Lenguajes por defecto",
        value: langNames,
        inline: false
      },
      {
        name: "Lenguajes extra",
        value:
          race.extraLanguages?.count > 0
            ? `Elige **${race.extraLanguages.count}** lenguaje(s) extra de categorías: ${
                race.extraLanguages.allowedCategories?.length > 0
                  ? race.extraLanguages.allowedCategories.join(", ")
                  : "cualquiera"
              }`
            : "No otorga lenguajes extra",
        inline: false
      }
    );

  return interaction.reply({
    embeds: [embed],
    ephemeral: true
  });
}
