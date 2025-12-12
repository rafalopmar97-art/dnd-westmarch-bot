// srd_races_half_elf_es.js

export const halfElfSrdRace = {
  key: "half_elf",
  name: "Semielfo",
  source: "SRD 5.1",
  isSrd: true,
  isHomebrew: false,
  guildId: null, // null => raza base disponible para todos los servidores

  size: "Mediano",
  speed: {
    walk: 30
  },

  // CHA fijo +2
  abilityScoreIncreases: [
    { ability: "cha", value: 2 }
  ],

  // Dos puntuaciones a elección +1 (STR/DEX/CON/INT/WIS, normalmente sin repetir)
  abilityScoreChoices: {
    count: 2,
    value: 1,
    abilities: ["str", "dex", "con", "int", "wis"]
  },

  traits: [
    {
      key: "half_elf_heritage",
      name: "Herencia mixta",
      description:
        "Tu sangre humana y élfica te hace adaptable y carismático. Tu Carisma aumenta en 2, "
        + "y además dos puntuaciones de característica de tu elección aumentan en 1.",
      rules: {
        // Representado por abilityScoreIncreases + abilityScoreChoices.
      }
    },
    {
      key: "half_elf_darkvision",
      name: "Visión en la penumbra",
      description:
        "Gracias a tu herencia élfica, estás acostumbrado a ver en la oscuridad. " +
        "Puedes ver en luz tenue a 60 pies de ti como si fuera luz brillante, y en la oscuridad " +
        "como si fuera luz tenue. No distingues colores en la oscuridad, solo tonos de gris.",
      rules: {
        darkvisionRadius: 60
      }
    },
    {
      key: "half_elf_fey_ancestry",
      name: "Ascendencia feérica",
      description:
        "Tienes ventaja en las tiradas de salvación para resistir ser hechizado, y la magia " +
        "no puede hacer que te duermas.",
      rules: {
        advantageOnSaves: ["charmed"],
        immuneToMagicalSleep: true
      }
    },
    {
      key: "half_elf_skill_versatility",
      name: "Versatilidad con las habilidades",
      description:
        "Tu naturaleza adaptable te permite aprender de todo un poco. Ganas competencia " +
        "en dos habilidades de tu elección.",
      rules: {
        proficiencyChoices: [
          {
            type: "skill",
            count: 2
            // skills: null => cualquier habilidad disponible
          }
        ]
      }
    }
  ],

  languages: {
    automatic: ["Común", "Élfico"],
    choice: {
      count: 1,
      any: true // un idioma adicional a elección
    }
  },

  subraces: [] // El semielfo del SRD no tiene subrazas por defecto
};
