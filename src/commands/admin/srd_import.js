// src/commands/admin/srd_import.js
import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

import ItemModel from "../../models/Item.js";
import ClassModel from "../../models/Class.js"; // Ajusta el nombre/ruta si tu modelo se llama distinto
import RaceModel from "../../models/Race.js";   // Ajusta el nombre/ruta si tu modelo se llama distinto

// Importa tus seeds SRD
// Asegúrate de que estos archivos exporten algo como:
//   export const SRD_ITEMS = [...];
//   export const SRD_CLASSES = [...];
//   export const SRD_RACES = [...];
import { SRD_ITEMS } from "../../seeds/srd_items.js";
import { SRD_CLASSES } from "../../seeds/srd_classes.js";
import { SRD_RACES } from "../../seeds/srd_races.js";

export default {
  data: new SlashCommandBuilder()
    .setName("srd_import")
    .setDescription("Importa o actualiza los datos SRD (clases, objetos y razas).")
    .addStringOption(o =>
      o
        .setName("tipo")
        .setDescription("Qué datos SRD quieres importar")
        .addChoices(
          { name: "Todo", value: "all" },
          { name: "Clases", value: "classes" },
          { name: "Objetos", value: "items" },
          { name: "Razas", value: "races" }
        )
        .setRequired(true)
    ),

  async execute(interaction) {
    const member = interaction.member;

    if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
      return interaction.reply({
        content: "❌ Solo administradores pueden usar `/srd_import`.",
        ephemeral: true
      });
    }

    const tipo = interaction.options.getString("tipo");

    await interaction.deferReply({ ephemeral: true });

    const resumen = [];

    try {
      if (tipo === "all" || tipo === "classes") {
        const resClasses = await importSRDClasses();
        resumen.push(
          `📘 **Clases** → ${resClasses.inserted} nuevas, ${resClasses.updated} actualizadas (total seeds: ${resClasses.total}).`
        );
      }

      if (tipo === "all" || tipo === "items") {
        const resItems = await importSRDItems();
        resumen.push(
          `🗡️ **Objetos** → ${resItems.inserted} nuevos, ${resItems.updated} actualizados (total seeds: ${resItems.total}).`
        );
      }

      if (tipo === "all" || tipo === "races") {
        const resRaces = await importSRDRaces();
        resumen.push(
          `🧬 **Razas** → ${resRaces.inserted} nuevas, ${resRaces.updated} actualizadas (total seeds: ${resRaces.total}).`
        );
      }

      if (resumen.length === 0) {
        return interaction.editReply({
          content: "⚠️ No se importó nada. Revisa el parámetro `tipo`.",
        });
      }

      return interaction.editReply({
        content:
          "✅ Importación de SRD completada.\n\n" +
          resumen.join("\n")
      });
    } catch (err) {
      console.error("Error en /srd_import:", err);
      return interaction.editReply({
        content:
          "❌ Ocurrió un error durante la importación de SRD. Revisa la consola del bot para más detalles."
      });
    }
  }
};

/**
 * Limpia un objeto seed para evitar conflictos con _id/fechas
 */
function cleanSeedDoc(seed) {
  if (!seed || typeof seed !== "object") return seed;
  const { _id, createdAt, updatedAt, ...rest } = seed;
  return rest;
}

/**
 * Importar / actualizar SRD de ITEMS
 * Coincidimos por `name` (case-sensitive; si quieres case-insensitive, ajusta la query).
 */
async function importSRDItems() {
  let inserted = 0;
  let updated = 0;

  for (const raw of SRD_ITEMS || []) {
    const seed = cleanSeedDoc(raw);

    if (!seed.name) continue; // saltar seeds sin nombre

    // Aseguramos algunos flags por defecto para SRD
    const baseDoc = {
      isHomebrew: false,
      isEnabled: true,
      // Si tus seeds ya traen estos flags, se sobreescribirán por el spread (...)
      ...seed
    };

    const existing = await ItemModel.findOne({ name: seed.name });

    if (existing) {
      // Actualizamos TODOS los campos del seed (menos _id/fechas)
      Object.assign(existing, baseDoc);
      await existing.save();
      updated++;
    } else {
      await ItemModel.create(baseDoc);
      inserted++;
    }
  }

  return {
    inserted,
    updated,
    total: (SRD_ITEMS || []).length
  };
}

/**
 * Importar / actualizar SRD de CLASES
 * Ajusta el modelo y el campo clave según tu esquema de clases.
 */
async function importSRDClasses() {
  let inserted = 0;
  let updated = 0;

  for (const raw of SRD_CLASSES || []) {
    const seed = cleanSeedDoc(raw);

    // Asumo que las clases tienen un campo `name` único
    if (!seed.name) continue;

    const baseDoc = {
      isHomebrew: false,
      isEnabled: true,
      ...seed
    };

    const existing = await ClassModel.findOne({ name: seed.name });

    if (existing) {
      Object.assign(existing, baseDoc);
      await existing.save();
      updated++;
    } else {
      await ClassModel.create(baseDoc);
      inserted++;
    }
  }

  return {
    inserted,
    updated,
    total: (SRD_CLASSES || []).length
  };
}

/**
 * Importar / actualizar SRD de RAZAS
 * Ajusta el modelo y campo clave según tu esquema de razas.
 */
async function importSRDRaces() {
  let inserted = 0;
  let updated = 0;

  for (const raw of SRD_RACES || []) {
    const seed = cleanSeedDoc(raw);

    // Asumo que las razas tienen un campo `name` único
    if (!seed.name) continue;

    const baseDoc = {
      isHomebrew: false,
      isEnabled: true,
      ...seed
    };

    const existing = await RaceModel.findOne({ name: seed.name });

    if (existing) {
      Object.assign(existing, baseDoc);
      await existing.save();
      updated++;
    } else {
      await RaceModel.create(baseDoc);
      inserted++;
    }
  }

  return {
    inserted,
    updated,
    total: (SRD_RACES || []).length
  };
}
