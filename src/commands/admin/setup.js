import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder
} from "discord.js";

import GuildConfig from "../../models/GuildConfig.js";

export default {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Configura automáticamente los canales y roles del bot.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const guild = interaction.guild;

    await interaction.deferReply({ ephemeral: false });

    // ================
    // Crear rol
    // ================
    const createOrGetRole = async (name) => {
      let role = guild.roles.cache.find(r => r.name === name);

      if (!role) {
        role = await guild.roles.create({
          name,
          color: "Blue",
          permissions: [], // No permisos extra, solo etiqueta
          reason: "Rol para revisar personajes."
        });
      }

      return role;
    };

    const reviewRole = await createOrGetRole("Revisión de Personaje");

    // ================
    // Crear canales
    // ================
    const createOrGetChannel = async (name, topic) => {
      let channel = guild.channels.cache.find(c => c.name === name);

      if (!channel) {
        channel = await guild.channels.create({
          name,
          type: 0,
          topic,
          reason: "Configuración automática del bot"
        });
      }
      return channel;
    };

    const creationChannel = await createOrGetChannel(
      "creacion-personaje",
      "Canal donde los jugadores crean personajes."
    );

    const reviewChannel = await createOrGetChannel(
      "revision-personaje",
      "Canal privado para revisar personajes."
    );

    await reviewChannel.permissionOverwrites.edit(
      reviewRole.id,
      { ViewChannel: true },
      { reason: "Permitir ver el canal de revisión" }
    );

    const approvedChannel = await createOrGetChannel(
      "personajes-aprobados",
      "Anuncios automáticos de personajes aprobados."
    );

    const auditChannel = await createOrGetChannel(
      "auditoria-comandos",
      "Registro interno de comandos ejecutados."
    );

    // ================
    // Guardar en DB
    // ================
    await GuildConfig.findOneAndUpdate(
      { guildId: guild.id },
      {
        creationChannelId: creationChannel.id,
        reviewChannelId: reviewChannel.id,
        approvedChannelId: approvedChannel.id,
        auditChannelId: auditChannel.id,
        reviewRoleId: reviewRole.id,
        setupCompleted: true,
        updatedAt: new Date()
      },
      { new: true, upsert: true }
    );

    // ================
    // Respuesta final
    // ================
    const embed = new EmbedBuilder()
      .setTitle("⚙️ Configuración completada")
      .setDescription("Los canales y el rol fueron creados exitosamente.")
      .setColor("Green")
      .addFields(
        { name: "🛠 Creación de personajes", value: `<#${creationChannel.id}>` },
        { name: "📝 Revisión de personajes", value: `<#${reviewChannel.id}>` },
        { name: "✨ Personajes aprobados", value: `<#${approvedChannel.id}>` },
        { name: "📘 Auditoría", value: `<#${auditChannel.id}>` },
        { name: "🎭 Rol de revisión", value: `<@&${reviewRole.id}>` }
      )
      .setFooter({ text: "DnD Westmarch Bot — Setup automático" });

    return interaction.editReply({ embeds: [embed] });
  }
};