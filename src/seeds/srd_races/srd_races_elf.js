// srd_races_elf_es.js

export const elfSrdRace = {
  key: "elf",               // slug interno
  name: "Elfo",
  source: "SRD 5.1",
  isSrd: true,
  isHomebrew: false,
  guildId: null,            // null => disponible para todos los servidores

  size: "Mediano",
  speed: {
    walk: 30
  },

  abilityScoreIncreases: [
    { ability: "dex", value: 2 }
  ],

  // RASGOS RACIALES BASE
  traits: [
    {
      key: "darkvision",
      name: "Visión en la oscuridad",
      description:
        "Tu herencia élfica te permite ver con claridad donde otros solo ven sombras. " +
        "Puedes ver en luz tenue en un radio de 60 pies como si fuera luz brillante, " +
        "y en la oscuridad como si fuera luz tenue. En la oscuridad solo distingues tonos de gris.",
      rules: {
        darkvisionRange: 60
      }
    },
    {
      key: "keen_senses",
      name: "Sentidos agudos",
      description:
        "Tus sentidos son finos y entrenados. Tienes competencia en la habilidad de Percepción.",
      rules: {
        skillProficiencies: ["perception"]
      }
    },
    {
      key: "fey_ancestry",
      name: "Ascendencia feérica",
      description:
        "La magia que afecta la mente tiene más dificultad para dominarte. " +
        "Tienes ventaja en las tiradas de salvación contra el estado de hechizado, " +
        "y la magia no puede hacer que te duermas.",
      rules: {
        savingThrowAdvantageAgainst: ["charmed"],
        immuneToMagicalSleep: true
      }
    },
    {
      key: "trance",
      name: "Trance",
      description:
        "No necesitas dormir como otras criaturas. En lugar de ello, meditas profundamente durante 4 horas al día, " +
        "permaneciendo semiconsciente. Tras este trance obtienes los mismos beneficios que un humano después de 8 horas de sueño.",
      rules: {
        restStyle: "trance",
        tranceHours: 4
      }
    }
  ],

  // IDIOMAS
  languages: {
    automatic: ["Común", "Élfico"],
    choice: null
  },

  // SUBRAZAS
  subraces: [
    {
      key: "high_elf",
      name: "Alto elfo",

      abilityScoreIncreases: [
        { ability: "int", value: 1 }
      ],

      traits: [
        {
          key: "elf_weapon_training",
          name: "Entrenamiento marcial élfico",
          description:
            "Desde joven has practicado con las armas tradicionales de tu pueblo. " +
            "Tienes competencia con la espada larga, la espada corta, el arco corto y el arco largo.",
          rules: {
            weaponProficiencies: [
              "longsword",
              "shortsword",
              "shortbow",
              "longbow"
            ]
          }
        },
        {
          key: "high_elf_cantrip",
          name: "Truco arcano",
          description:
            "La magia fluye de forma natural en ti. Conoces un truco (cantrip) de tu elección de la lista de conjuros de mago. " +
            "La Inteligencia es tu habilidad para lanzar ese truco.",
          rules: {
            extraCantrip: {
              fromClassList: "wizard",
              ability: "int"
            }
          }
        },
        {
          key: "extra_language",
          name: "Idioma adicional",
          description:
            "Has crecido rodeado de eruditos, viajeros o embajadores. " +
            "Puedes hablar, leer y escribir un idioma adicional de tu elección.",
          rules: {
            extraLanguages: 1
          }
        }
      ]
    }
  ]
};
