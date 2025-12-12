// srd_races_half_orc_es.js

export const halfOrcSrdRace = {
  key: "half_orc",
  name: "Semiorco",
  source: "SRD 5.1",
  isSrd: true,
  isHomebrew: false,
  guildId: null, // null => raza base disponible para todos los servidores

  size: "Mediano",
  speed: {
    walk: 30
  },

  // +2 Fuerza, +1 Constitución
  abilityScoreIncreases: [
    { ability: "str", value: 2 },
    { ability: "con", value: 1 }
  ],

  traits: [
    {
      key: "half_orc_darkvision",
      name: "Visión en la penumbra",
      description:
        "Gracias a tu sangre orca, estás acostumbrado a ver en la oscuridad. " +
        "Puedes ver en luz tenue a 60 pies de ti como si fuera luz brillante, y en la oscuridad " +
        "como si fuera luz tenue. No distingues colores en la oscuridad, solo distintos tonos de gris.",
      rules: {
        darkvisionRadius: 60
      }
    },
    {
      key: "half_orc_menacing",
      name: "Presencia intimidante",
      description:
        "Tu aspecto feroz y tu porte agresivo infunden miedo en los demás. " +
        "Obtienes competencia en la habilidad de Intimidación.",
      rules: {
        proficienciesGranted: [
          { type: "skill", key: "intimidation", name: "Intimidación" }
        ]
      }
    },
    {
      key: "half_orc_relentless_endurance",
      name: "Aguante incansable",
      description:
        "Cuando tus heridas deberían derribarte, tu furia y resistencia orca te mantienen en pie. " +
        "Cuando tus puntos de golpe se reducen a 0 pero no mueres de inmediato, puedes quedarte en 1 punto de golpe en su lugar. " +
        "No puedes usar este rasgo de nuevo hasta que termines un descanso largo.",
      rules: {
        oncePerLongRest: true,
        trigger: "reduced_to_0_hp_not_killed_outright",
        effect: "set_hp_to_1_instead"
      }
    },
    {
      key: "half_orc_savage_attacks",
      name: "Ataques salvajes",
      description:
        "Tu brutalidad en combate se manifiesta en golpes devastadores. " +
        "Cuando logras un impacto crítico con un ataque cuerpo a cuerpo con arma, " +
        "puedes tirar uno de los dados de daño del arma una vez adicional y añadir ese resultado " +
        "al daño extra del golpe crítico.",
      rules: {
        savageAttacks: {
          appliesTo: "melee_weapon_attacks",
          extraWeaponDamageDiceOnCrit: 1
        }
      }
    }
  ],

  languages: {
    automatic: ["Común", "Orco"],
    choice: null
  },

  subraces: [] // El semiorco del SRD no tiene subrazas por defecto
};
