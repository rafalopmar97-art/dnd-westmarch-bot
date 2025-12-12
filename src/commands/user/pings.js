import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Verifica si el bot funciona."),

  async execute(interaction) {
    await interaction.reply("🏓 Pong!");
  }
};
