// srd_races_human_es.js

export const humanSrdRace = {
  key: "human",
  name: "Humano",
  source: "SRD 5.1",
  isSrd: true,
  isHomebrew: false,
  guildId: null, // null => disponible para todos los servidores

  size: "Mediano",
  speed: {
    walk: 30
  },

  // Todos los atributos +1
  abilityScoreIncreases: [
    { ability: "str", value: 1 },
    { ability: "dex", value: 1 },
    { ability: "con", value: 1 },
    { ability: "int", value: 1 },
    { ability: "wis", value: 1 },
    { ability: "cha", value: 1 }
  ],

  traits: [
    {
      key: "human_adaptability",
      name: "Adaptabilidad humana",
      description:
        "La versatilidad de los humanos se refleja en su talento natural para casi todo. " +
        "Todos tus valores de característica aumentan en 1.",
      rules: {
        // Ya reflejado arriba en abilityScoreIncreases; aquí solo queda como referencia descriptiva.
      }
    }
  ],

  languages: {
    // Mecánica básica del humano
    automatic: ["Común"],
    choice: {
      count: 1,
      any: true // 1 idioma adicional a elección
    }
  },

  subraces: [] // El humano del SRD no tiene subrazas por defecto
};
