import mongoose from "mongoose";

const guildConfigSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },

  characterCreationChannelId: { type: String, default: null },
  characterReviewChannelId: { type: String, default: null },
  characterApprovedChannelId: { type: String, default: null },
  auditChannelId: { type: String, default: null },

  characterReviewRoleId: { type: String, default: null },

  setupCompleted: { type: Boolean, default: false },

  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("GuildConfig", guildConfigSchema);