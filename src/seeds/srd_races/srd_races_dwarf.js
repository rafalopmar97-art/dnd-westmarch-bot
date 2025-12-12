// srd_races_dwarf_es.js

export const dwarfSrdRace = {
  key: "dwarf",                 // slug interno
  name: "Enano",                // nombre visible
  source: "SRD 5.1",
  isSrd: true,
  isHomebrew: false,
  guildId: null,                // null => global, disponible en todos los servidores

  size: "Mediano",
  speed: {
    walk: 25,
    armorNotReducedByHeavy: true
  },

  abilityScoreIncreases: [
    { ability: "con", value: 2 }
  ],

  darkvision: 60,               // en pies

  traits: [
    {
      key: "dwarven_resilience",
      name: "Resistencia Enana",
      description:
        "Tienes ventaja en las tiradas de salvación contra veneno y resistencia al daño por veneno.",
      rules: {
        advantageOnSavingThrowsAgainst: ["poison"],
        damageResistances: ["poison"]
      }
    },
    {
      key: "dwarven_combat_training",
      name: "Entrenamiento de Combate Enano",
      description:
        "Estás familiarizado con las armas tradicionales de tu pueblo: tienes competencia con el hacha de batalla, el hacha de mano, el martillo ligero y el martillo de guerra.",
      rules: {
        weaponProficiencies: ["battleaxe", "handaxe", "light hammer", "warhammer"]
      }
    },
    {
      key: "tool_proficiency",
      name: "Oficio Enano",
      description:
        "Dominas un conjunto de herramientas de artesano a tu elección: herramientas de herrero, suministros de cervecero o herramientas de albañil.",
      rules: {
        toolProficiencyOptions: {
          choose: 1,
          from: ["smith's tools", "brewer's supplies", "mason's tools"]
        }
      }
    },
    {
      key: "stonecunning",
      name: "Conocimiento de la Piedra",
      description:
        "Cuando haces una prueba de Inteligencia (Historia) relacionada con el origen de una obra de piedra, tu experiencia sale a relucir: se te considera competente en Historia y duplicas tu bonificador de competencia para esa tirada.",
      rules: {
        skill: "history",
        doubleProficiencyWhen: "stonework_origin"
      }
    }
  ],

  proficiencies: {
    weapons: ["battleaxe", "handaxe", "light hammer", "warhammer"],
    toolsChoices: {
      category: "artisan_tools",
      choose: 1,
      options: ["smith's tools", "brewer's supplies", "mason's tools"]
    }
  },

  languages: {
    automatic: ["Común", "Enano"],
    choice: {
      choose: 0,
      from: []
    }
  },

  subraces: [
    {
      key: "hill_dwarf",
      name: "Enano de las Colinas",
      source: "SRD 5.1",

      abilityScoreIncreases: [
        { ability: "wis", value: 1 }
      ],

      traits: [
        {
          key: "dwarven_toughness",
          name: "Robustez Enana",
          description:
            "Tu reserva de energía es sorprendente: tu máximo de puntos de golpe aumenta en 1, y vuelve a aumentar en 1 cada vez que subes de nivel.",
          rules: {
            bonusHpAtLevel1: 1,
            bonusHpPerLevel: 1
          }
        }
      ]
    }
  ]
};
