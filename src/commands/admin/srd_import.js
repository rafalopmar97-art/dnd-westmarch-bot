// src/commands/admin/srd_import.js
import {
  SlashCommandBuilder,
  PermissionFlagsBits
} from "discord.js";

import ItemModel from "../../models/Item.js";

// AJUSTA LA RUTA SEGÚN TU PROYECTO
import {
  SRD_WEAPONS,
  SRD_ARMORS,
  SRD_GEAR
} from "../../data/srdItems.js";

/**
 * Normaliza el nombre para comparación case-insensitive
 */
function buildNameRegex(name) {
  return new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");
}

/**
 * Asegura que el valor mínimo sea 1 gp
 */
function normalizeValue(value) {
  if (typeof value !== "number" || Number.isNaN(value)) return 1;
  return Math.max(1, Math.floor(value));
}

/**
 * Aplica defaults y sanea ciertos campos comunes al SRD
 */
function buildItemPayload(raw, enableInStore) {
  const baseValue = normalizeValue(raw.value ?? 1);

  return {
    // básicos
    name: raw.name,
    type: raw.type || "gear",
    rarity: raw.rarity || "common",
    value: baseValue,
    weight: raw.weight ?? 0,
    description: raw.description || "",

    // datos de arma / armadura (si los trae el SRD)
    weaponData: raw.weaponData || null,
    armorData: raw.armorData || null,

    // flags de sistema (SRD → típicamente no homebrew)
    isHomebrew: false,
    isEnabled: true,
    isInStore: enableInStore,
    isBuyable: raw.isBuyable ?? true,
    isSellable: raw.isSellable ?? true,
    isTradeable: raw.isTradeable ?? true,

    shopPrice: normalizeValue(
      typeof raw.shopPrice === "number" ? raw.shopPrice : baseValue
    )
  };
}

/**
 * Importa un array de ítems SRD al ItemModel
 */
async function importSrdArray({
  interaction,
  srdArray,
  overwrite,
  enableInStore
}) {
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const raw of srdArray) {
    if (!raw?.name) {
      // Si por algún motivo hay un item sin nombre, lo saltamos
      skipped++;
      continue;
    }

    const existing = await ItemModel.findOne({
      name: buildNameRegex(raw.name)
    });

    const payload = buildItemPayload(raw, enableInStore);

    if (!existing) {
      // Crear nuevo
      await ItemModel.create(payload);
      created++;
    } else if (overwrite) {
      // Actualizar existente
      existing.set(payload);
      await existing.save();
      updated++;
    } else {
      // Saltar si no se debe sobreescribir
      skipped++;
    }
  }

  return { created, updated, skipped };
}

const data = new SlashCommandBuilder()
  .setName("srd_import")
  .setDescription("Admin: importa al sistema los objetos SRD (armas, armaduras, equipo).")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
  .addStringOption(o =>
    o
      .setName("categoria")
      .setDescription("Qué tipo de objetos SRD quieres importar.")
      .addChoices(
        { name: "Todo (armas, armaduras y equipo)", value: "all" },
        { name: "Solo armas", value: "weapons" },
        { name: "Solo armaduras", value: "armors" },
        { name: "Solo equipo de aventuras", value: "gear" }
      )
      .setRequired(true)
  )
  .addBooleanOption(o =>
    o
      .setName("overwrite")
      .setDescription(
        "Si ya existe un objeto con el mismo nombre, ¿sobrescribirlo? (por defecto: no)"
      )
      .setRequired(false)
  )
  .addBooleanOption(o =>
    o
      .setName("enable_in_store")
      .setDescription(
        "¿Habilitar los objetos importados en la tienda? (por defecto: true)"
      )
      .setRequired(false)
  );

export default {
  data,

  /**
   * /srd_import
   */
  async execute(interaction) {
    const member = interaction.member;

    if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
      return interaction.reply({
        content: "❌ Solo administradores pueden usar `/srd_import`.",
        ephemeral: true
      });
    }

    const categoria = interaction.options.getString("categoria");
    const overwrite = interaction.options.getBoolean("overwrite") ?? false;
    const enableInStore =
      interaction.options.getBoolean("enable_in_store") ?? true;

    await interaction.deferReply({ ephemeral: true });

    let totalCreated = 0;
    let totalUpdated = 0;
    let totalSkipped = 0;

    async function runImport(label, arr) {
      if (!arr || arr.length === 0) {
        return { created: 0, updated: 0, skipped: 0 };
      }

      const res = await importSrdArray({
        interaction,
        srdArray: arr,
        overwrite,
        enableInStore
      });

      totalCreated += res.created;
      totalUpdated += res.updated;
      totalSkipped += res.skipped;

      return res;
    }

    const results = [];

    if (categoria === "weapons" || categoria === "all") {
      const r = await runImport("Armas", SRD_WEAPONS);
      results.push(
        `⚔️ **Armas SRD** → creadas: **${r.created}**, actualizadas: **${r.updated}**, saltadas: **${r.skipped}**`
      );
    }

    if (categoria === "armors" || categoria === "all") {
      const r = await runImport("Armaduras", SRD_ARMORS);
      results.push(
        `🛡️ **Armaduras SRD** → creadas: **${r.created}**, actualizadas: **${r.updated}**, saltadas: **${r.skipped}**`
      );
    }

    if (categoria === "gear" || categoria === "all") {
      const r = await runImport("Equipo", SRD_GEAR);
      results.push(
        `🎒 **Equipo SRD** → creados: **${r.created}**, actualizados: **${r.updated}**, saltados: **${r.skipped}**`
      );
    }

    if (results.length === 0) {
      return interaction.editReply({
        content:
          "⚠️ No se ha importado nada. Revisa la categoría seleccionada o los arrays SRD."
      });
    }

    return interaction.editReply({
      content:
        `✅ Importación SRD completada.\n` +
        results.join("\n") +
        `\n\n🛒 **En tienda:** ${
          enableInStore ? "Sí, se han habilitado" : "No, se han deshabilitado"
        }\n` +
        `♻️ **Overwrite:** ${overwrite ? "Sí, se han sobrescrito existentes" : "No, se han mantenido existentes"}\n` +
        `📊 **Totales:** creados **${totalCreated}**, actualizados **${totalUpdated}**, saltados **${totalSkipped}**.`
    });
  }
};
