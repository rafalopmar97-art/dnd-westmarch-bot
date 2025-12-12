// srd_races_human_es.js

export const humanSrdRace = {
<<<<<<< HEAD
  key: "human",
  name: "Humano",
  source: "SRD 5.1",
  isSrd: true,
  isHomebrew: false,
  guildId: null, // null => disponible para todos los servidores
=======
  key: "human",               // slug interno
  name: "Humano",             // nombre visible
  source: "SRD 5.1",
  isSrd: true,
  isHomebrew: false,
  guildId: null,              // null => disponible en todos los servidores
>>>>>>> d05a72f9d9adadfad7b697bbe67f0237596a8290

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
<<<<<<< HEAD
      name: "Adaptabilidad humana",
      description:
        "La versatilidad de los humanos se refleja en su talento natural para casi todo. " +
        "Todos tus valores de característica aumentan en 1.",
      rules: {
        // Ya reflejado arriba en abilityScoreIncreases; aquí solo queda como referencia descriptiva.
=======
      name: "Adaptabilidad Humana",
      description:
        "Los humanos destacan por su capacidad de adaptarse a casi cualquier entorno o estilo de vida. Todos tus puntuaciones de característica aumentan en 1, reflejando esa versatilidad innata.",
      rules: {
        // La lógica real la manejas con abilityScoreIncreases, esto es solo informativo.
>>>>>>> d05a72f9d9adadfad7b697bbe67f0237596a8290
      }
    }
  ],

  languages: {
<<<<<<< HEAD
    // Mecánica básica del humano
    automatic: ["Común"],
    choice: {
      count: 1,
      any: true // 1 idioma adicional a elección
    }
  },

  subraces: [] // El humano del SRD no tiene subrazas por defecto
=======
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
>>>>>>> d05a72f9d9adadfad7b697bbe67f0237596a8290
};
