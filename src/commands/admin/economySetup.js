// src/commands/admin/economy.js
import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder
} from "discord.js";

import GuildEconomyConfigModel from "../../models/GuildEconomyConfig.js";
import { getEconomyConfig } from "../../utils/economyConfig.js";

export default {
  data: new SlashCommandBuilder()
    .setName("economy")
    .setDescription("Configura la economía del servidor (solo admins).")

    // /economy config
    .addSubcommand(sub =>
      sub
        .setName("config")
        .setDescription("Crea o edita la configuración de la moneda.")
        .addStringOption(o =>
          o
            .setName("name")
            .setDescription("Nombre de la moneda (ej. Oro, Monedas de Velthera)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("short")
            .setDescription("Abreviatura (ej. gp, MV)")
            .setRequired(false)
        )
        .addStringOption(o =>
          o
            .setName("icon")
            .setDescription("Icono o emoji de la moneda (ej. 🪙, 💰, <:moneda:1234>)")
            .setRequired(false)
        )
        .addIntegerOption(o =>
          o
            .setName("starting_gold")
            .setDescription("Oro inicial para personajes nuevos (opcional)")
            .setRequired(false)
        )
        .addBooleanOption(o =>
          o
            .setName("enabled")
            .setDescription("¿Economía activada en este servidor?")
            .setRequired(false)
        )
    )

    // /economy info
    .addSubcommand(sub =>
      sub
        .setName("info")
        .setDescription("Muestra la configuración actual de economía.")
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    if (sub === "config") return handleConfig(interaction);
    if (sub === "info") return handleInfo(interaction);
  }
};

async function handleConfig(interaction) {
  const member = interaction.member;

  if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    return interaction.reply({
      content: "❌ Solo administradores pueden configurar la economía.",
      ephemeral: true
    });
  }

  const guildId = interaction.guild.id;
  const name = interaction.options.getString("name");
  const short = interaction.options.getString("short");
  const icon = interaction.options.getString("icon");
  const startingGold = interaction.options.getInteger("starting_gold");
  const enabled = interaction.options.getBoolean("enabled");

  const current = await GuildEconomyConfigModel.findOne({ guildId });

  let doc;
  if (!current) {
    // Crear nueva config
    doc = await GuildEconomyConfigModel.create({
      guildId,
      currencyName: name ?? "oro",
      currencyShort: short ?? "gp",
      currencyIcon: icon ?? "🪙",
      startingGold: startingGold ?? 0,
      isEnabled: enabled ?? true
    });
  } else {
    // Editar la existente
    if (name !== null) current.currencyName = name;
    if (short !== null) current.currencyShort = short;
    if (icon !== null) current.currencyIcon = icon;
    if (startingGold !== null) current.startingGold = startingGold;
    if (enabled !== null) current.isEnabled = enabled;

    await current.save();
    doc = current;
  }

  const embed = new EmbedBuilder()
    .setTitle("⚙️ Configuración de economía actualizada")
    .setColor("Gold")
    .addFields(
      {
        name: "Nombre de moneda",
        value: doc.currencyName,
        inline: true
      },
      {
        name: "Abreviatura",
        value: doc.currencyShort,
        inline: true
      },
      {
        name: "Icono",
        value: doc.currencyIcon || "—",
        inline: true
      },
      {
        name: "Oro inicial",
        value: `${doc.startingGold} ${doc.currencyShort}`,
        inline: true
      },
      {
        name: "Estado",
        value: doc.isEnabled ? "✅ Activa" : "🚫 Desactivada",
        inline: true
      }
    )
    .setFooter({ text: `Guild ID: ${guildId}` });

  return interaction.reply({
    embeds: [embed],
    ephemeral: true
  });
}

async function handleInfo(interaction) {
  const guildId = interaction.guild.id;
  const eco = await getEconomyConfig(guildId);

  const embed = new EmbedBuilder()
    .setTitle("📊 Configuración de economía")
    .setColor("Gold")
    .addFields(
      {
        name: "Nombre de moneda",
        value: eco.currencyName,
        inline: true
      },
      {
        name: "Abreviatura",
        value: eco.currencyShort,
        inline: true
      },
      {
        name: "Icono",
        value: eco.currencyIcon || "—",
        inline: true
      },
      {
        name: "Oro inicial (si se usa)",
        value: `${eco.startingGold} ${eco.currencyShort}`,
        inline: true
      },
      {
        name: "Estado",
        value: eco.isEnabled ? "✅ Activa" : "🚫 Desactivada",
        inline: true
      }
    )
    .setFooter({ text: `Guild ID: ${guildId}` });

  return interaction.reply({
    embeds: [embed],
    ephemeral: true
  });
}
