import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import {
  Client,
  Collection,
  GatewayIntentBits,
  REST,
  Routes,
  EmbedBuilder
} from "discord.js";
import { connectDB } from "./database.js";
import LanguageModel from "./models/Language.js";

console.log("🚀 Iniciando DnD Westmarch Bot...");

// Configuración ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear cliente
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// Colección de comandos
client.commands = new Collection();

// ===============================
// FUNCIÓN RECURSIVA PARA CARGAR COMANDOS
// ===============================
function getCommandFiles(dir) {
  let files = [];

  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      files = files.concat(getCommandFiles(fullPath));
    } else if (fullPath.endsWith(".js")) {
      files.push(fullPath);
    }
  }
  return files;
}

// ===============================
// Cargar comandos
// ===============================
const commandsPath = path.join(__dirname, "commands");
const commandFiles = getCommandFiles(commandsPath);

let commandJSON = [];

for (const filePath of commandFiles) {
  const commandModule = await import(pathToFileURL(filePath).href);
  const command = commandModule.default;

  if (!command?.data || !command?.execute) {
    console.warn(`⚠️ Comando inválido en: ${filePath}`);
    continue;
  }

  client.commands.set(command.data.name, command);
  commandJSON.push(command.data.toJSON());
}

console.log(`📘 Comandos cargados: ${client.commands.size}`);

// ===============================
// Registrar comandos (REST)
// ===============================
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

async function registerCommands() {
  try {
    if (!process.env.CLIENT_ID) {
      throw new Error("❌ ERROR: CLIENT_ID no está definido en .env");
    }

    if (process.env.GUILD_ID_DEV) {
      console.log("📡 Registrando comandos en servidor de desarrollo...");
      await rest.put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.GUILD_ID_DEV
        ),
        { body: commandJSON }
      );
      console.log("✅ Comandos registrados en servidor de pruebas");
    } else {
      console.log("📡 Registrando comandos globales...");
      await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commandJSON }
      );
      console.log("✅ Comandos globales registrados");
    }
  } catch (err) {
    console.error("❌ Error registrando comandos:", err);
  }
}

// ===============================
// Listener de comandos
// ===============================
client.on("interactionCreate", async interaction => {
  try {
    // 1) Slash commands
    if (interaction.isChatInputCommand()) {
      const cmd = client.commands.get(interaction.commandName);
      if (!cmd) return;

      await cmd.execute(interaction);
      return;
    }

    // 2) Menú de selección de lenguajes (/language info sin argumentos)
    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === "language_info_select") {
        const selectedId = interaction.values[0];

        let lang;
        try {
          lang = await LanguageModel.findById(selectedId);
        } catch {
          return interaction.reply({
            content: "❌ El ID seleccionado no es válido.",
            ephemeral: true
          });
        }

        if (!lang) {
          return interaction.reply({
            content: "❌ No encontré ese lenguaje en la base de datos.",
            ephemeral: true
          });
        }

        const embed = new EmbedBuilder()
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

        // Usamos update() para reemplazar el mensaje del menú
        return interaction.update({
          content: "Información del lenguaje seleccionado:",
          embeds: [embed],
          components: [] // quitar el menú después de elegir
        });
      }

      // Si es otro menú, puedes manejarlo aquí en el futuro
      return;
    }
  } catch (err) {
    console.error("❌ Error en interactionCreate:", err);

    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: "❌ Ocurrió un error procesando esta interacción.",
        ephemeral: true
      });
    }
  }
});


// ===============================
// Evento Ready  (NO LO MUEVO)
// ===============================
client.once("clientReady", () => {
  console.log(`🔥 Bot conectado como: ${client.user.tag}`);
});

// ===============================
// Iniciar bot
// ===============================
await connectDB();
await registerCommands();
client.login(process.env.TOKEN);
