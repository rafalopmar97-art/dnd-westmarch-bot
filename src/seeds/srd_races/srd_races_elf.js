// srd_races_elf_es.js

export const elfSrdRace = {
  key: "elf",                 // slug interno
  name: "Elfo",               // nombre visible
  source: "SRD 5.1",
  isSrd: true,
  isHomebrew: false,
  guildId: null,              // null => disponible en todos los servidores

  size: "Mediano",
  speed: {
    walk: 30
  },

  abilityScoreIncreases: [
    { ability: "dex", value: 2 }
  ],

  darkvision: 60, // pies

  traits: [
    {
      key: "keen_senses",
      name: "Sentidos Agudizados",
      description:
        "Tus sentidos son especialmente finos. Obtienes competencia en la habilidad de Percepción.",
      rules: {
        skillProficiencies: ["perception"]
      }
    },
    {
      key: "fey_ancestry",
      name: "Ascendencia Feérica",
      description:
        "La magia que intenta manipular tu mente rara vez tiene éxito. Tienes ventaja en las tiradas de salvación contra ser hechizado y la magia no puede hacer que te duermas.",
      rules: {
        advantageOnSavingThrowsAgainst: ["charmed"],
        immuneToMagicSleep: true
      }
    },
    {
      key: "trance",
      name: "Trance Élfico",
      description:
        "No necesitas dormir como las demás razas. En lugar de ello, meditas profundamente durante 4 horas al día, permaneciendo semiconsciente. Tras este trance, obtienes los mismos beneficios que un humano al descansar 8 horas.",
      rules: {
        longRestDurationHours: 4,
        restType: "trance"
      }
    }
  ],

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

      abilityScoreIncreases: [
        { ability: "int", value: 1 }
      ],

      traits: [
        {
          key: "elf_weapon_training",
          name: "Entrenamiento Marcial Élfico",
          description:
            "Has sido instruido en las armas elegantes de tu pueblo. Tienes competencia con el estoque, la espada corta, el arco corto y el arco largo.",
          rules: {
            weaponProficiencies: ["longsword", "shortsword", "shortbow", "longbow"]
          }
        },
        {
          key: "high_elf_cantrip",
          name: "Truco Arcano",
          description:
            "Conoces un truco de mago de tu elección de la lista de conjuros de mago. La Inteligencia es tu habilidad de lanzamiento de conjuros para este truco.",
          rules: {
            grantsCantrip: true,
            spellList: "wizard",
            spellcastingAbility: "int"
          }
        },
        {
          key: "extra_language",
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
    }
  ]
};
