// srd_races_elf_es.js

export const elfSrdRace = {
<<<<<<< HEAD
  key: "elf",               // slug interno
  name: "Elfo",
  source: "SRD 5.1",
  isSrd: true,
  isHomebrew: false,
  guildId: null,            // null => disponible para todos los servidores
=======
  key: "elf",                 // slug interno
  name: "Elfo",               // nombre visible
  source: "SRD 5.1",
  isSrd: true,
  isHomebrew: false,
  guildId: null,              // null => disponible en todos los servidores
>>>>>>> d05a72f9d9adadfad7b697bbe67f0237596a8290

  size: "Mediano",
  speed: {
    walk: 30
  },

  abilityScoreIncreases: [
    { ability: "dex", value: 2 }
  ],

<<<<<<< HEAD
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
=======
  darkvision: 60, // pies

  traits: [
    {
      key: "keen_senses",
      name: "Sentidos Agudizados",
      description:
        "Tus sentidos son especialmente finos. Obtienes competencia en la habilidad de Percepción.",
>>>>>>> d05a72f9d9adadfad7b697bbe67f0237596a8290
      rules: {
        skillProficiencies: ["perception"]
      }
    },
    {
      key: "fey_ancestry",
<<<<<<< HEAD
      name: "Ascendencia feérica",
      description:
        "La magia que afecta la mente tiene más dificultad para dominarte. " +
        "Tienes ventaja en las tiradas de salvación contra el estado de hechizado, " +
        "y la magia no puede hacer que te duermas.",
      rules: {
        savingThrowAdvantageAgainst: ["charmed"],
        immuneToMagicalSleep: true
=======
      name: "Ascendencia Feérica",
      description:
        "La magia que intenta manipular tu mente rara vez tiene éxito. Tienes ventaja en las tiradas de salvación contra ser hechizado y la magia no puede hacer que te duermas.",
      rules: {
        advantageOnSavingThrowsAgainst: ["charmed"],
        immuneToMagicSleep: true
>>>>>>> d05a72f9d9adadfad7b697bbe67f0237596a8290
      }
    },
    {
      key: "trance",
<<<<<<< HEAD
      name: "Trance",
      description:
        "No necesitas dormir como otras criaturas. En lugar de ello, meditas profundamente durante 4 horas al día, " +
        "permaneciendo semiconsciente. Tras este trance obtienes los mismos beneficios que un humano después de 8 horas de sueño.",
      rules: {
        restStyle: "trance",
        tranceHours: 4
=======
      name: "Trance Élfico",
      description:
        "No necesitas dormir como las demás razas. En lugar de ello, meditas profundamente durante 4 horas al día, permaneciendo semiconsciente. Tras este trance, obtienes los mismos beneficios que un humano al descansar 8 horas.",
      rules: {
        longRestDurationHours: 4,
        restType: "trance"
>>>>>>> d05a72f9d9adadfad7b697bbe67f0237596a8290
      }
    }
  ],

<<<<<<< HEAD
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
=======
  proficiencies: {
    skills: ["perception"]
  },

  languages: {
    automatic: ["Común", "Élfico"],
    choice: {
      choose: 0,
      from: []
    }
  },

  subraces: [
    {
      key: "high_elf",
      name: "Alto Elfo",
      source: "SRD 5.1",
>>>>>>> d05a72f9d9adadfad7b697bbe67f0237596a8290

      abilityScoreIncreases: [
        { ability: "int", value: 1 }
      ],

      traits: [
        {
          key: "elf_weapon_training",
<<<<<<< HEAD
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
=======
          name: "Entrenamiento Marcial Élfico",
          description:
            "Has sido instruido en las armas elegantes de tu pueblo. Tienes competencia con el estoque, la espada corta, el arco corto y el arco largo.",
          rules: {
            weaponProficiencies: ["longsword", "shortsword", "shortbow", "longbow"]
>>>>>>> d05a72f9d9adadfad7b697bbe67f0237596a8290
          }
        },
        {
          key: "high_elf_cantrip",
<<<<<<< HEAD
          name: "Truco arcano",
          description:
            "La magia fluye de forma natural en ti. Conoces un truco (cantrip) de tu elección de la lista de conjuros de mago. " +
            "La Inteligencia es tu habilidad para lanzar ese truco.",
          rules: {
            extraCantrip: {
              fromClassList: "wizard",
              ability: "int"
            }
=======
          name: "Truco Arcano",
          description:
            "Conoces un truco de mago de tu elección de la lista de conjuros de mago. La Inteligencia es tu habilidad de lanzamiento de conjuros para este truco.",
          rules: {
            grantsCantrip: true,
            spellList: "wizard",
            spellcastingAbility: "int"
>>>>>>> d05a72f9d9adadfad7b697bbe67f0237596a8290
          }
        },
        {
          key: "extra_language",
<<<<<<< HEAD
          name: "Idioma adicional",
          description:
            "Has crecido rodeado de eruditos, viajeros o embajadores. " +
            "Puedes hablar, leer y escribir un idioma adicional de tu elección.",
          rules: {
            extraLanguages: 1
          }
        }
      ]
=======
          name: "Lengua Adicional",
          description:
            "Has estudiado otras culturas y dialectos. Puedes hablar, leer y escribir un idioma adicional de tu elección.",
          rules: {
            extraLanguageChoices: 1
          }
        }
      ],

      // Extensión de idiomas: +1 a elegir
      languages: {
        automatic: [], // hereda Común + Élfico del padre
        choice: {
          choose: 1,
          from: [
            // puedes dejarlo genérico o listar opciones comunes
            // "Enano", "Gnomish", "Orco", etc.
          ]
        }
      }
>>>>>>> d05a72f9d9adadfad7b697bbe67f0237596a8290
    }
  ]
};
