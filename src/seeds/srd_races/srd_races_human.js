// srd_races_human_es.js

export const humanSrdRace = {
  key: "human",               // slug interno
  name: "Humano",             // nombre visible
  source: "SRD 5.1",
  isSrd: true,
  isHomebrew: false,
  guildId: null,              // null => disponible en todos los servidores

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
      name: "Adaptabilidad Humana",
      description:
        "Los humanos destacan por su capacidad de adaptarse a casi cualquier entorno o estilo de vida. Todos tus puntuaciones de característica aumentan en 1, reflejando esa versatilidad innata.",
      rules: {
        // La lógica real la manejas con abilityScoreIncreases, esto es solo informativo.
      }
    }
  ],

  languages: {
    automatic: ["Común"],
    choice: {
      choose: 1,
      from: [
        // Puedes dejarlo genérico o rellenar con tu lista de idiomas disponibles
        // "Enano", "Élfico", "Gnomish", "Orco", etc.
      ]
    }
  },

  subraces: [] // Los humanos del SRD no tienen subrazas por defecto
};
