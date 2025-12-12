// srd_class_barbarian_es.js

export const SRD_BARBARIAN = {
  key: "barbarian",
  name: "Bárbaro",
  source: "SRD 5.1",
  isSrd: true,
  isHomebrew: false,
  guildId: null, // null => clase base global para todos los servidores

  // -----------------------------
  // Vida
  // -----------------------------
  hitDice: "d12",
  hitPoints: {
    atLevel1: {
      formula: "12 + CON_MOD",
      average: null
    },
    higherLevels: {
      formula: "1d12 + CON_MOD",
      averagePerLevel: 7 // opción media si no tiras
    }
  },

  // -----------------------------
  // Competencias
  // -----------------------------
  proficiencies: {
    armor: ["light", "medium", "shield"],
    weapons: ["simple", "martial"],
    tools: [],
    savingThrows: ["str", "con"],
    skills: {
      numberOfChoices: 2,
      options: [
        "Manejo de animales", // Animal Handling
        "Atletismo",          // Athletics
        "Intimidación",       // Intimidation
        "Naturaleza",         // Nature
        "Percepción",         // Perception
        "Supervivencia"       // Survival
      ]
    }
  },

  // -----------------------------
  // Multiclase
  // -----------------------------
  multiclass: {
    // Requisitos para poder coger niveles de bárbaro al multiclasear
    prerequisites: [
      {
        ability: "str",
        minimum: 13,
        description:
          "Para multiclasear como bárbaro necesitas una puntuación de Fuerza de al menos 13."
      }
    ],

    // Competencias que ganas al añadir niveles de bárbaro
    proficienciesGained: {
      armor: ["light", "medium", "shield"],
      weapons: ["simple", "martial"],
      tools: [],
      skills: {
        numberOfChoices: 1,
        options: [
          "Manejo de animales",
          "Atletismo",
          "Intimidación",
          "Naturaleza",
          "Percepción",
          "Supervivencia"
        ]
      }
    },

    notes:
      "Al multiclasear como bárbaro no ganas competencias adicionales en tiradas de salvación; " +
      "solo obtienes las competencias listadas arriba si aún no las tenías."
  },

  // -----------------------------
  // Equipo inicial
  // -----------------------------
  startingEquipment: {
    choices: [
      {
        id: "main_weapon",
        choose: 1,
        options: [
          { type: "item_ref", key: "greataxe", label: "Un hacha a dos manos (greataxe)" },
          { type: "tag", tag: "martial_melee", label: "Cualquier arma marcial cuerpo a cuerpo" }
        ]
      },
      {
        id: "secondary_weapon",
        choose: 1,
        options: [
          { type: "bundle", items: [{ key: "handaxe", quantity: 2 }], label: "Dos hachas de mano" },
          { type: "tag", tag: "simple_weapon", label: "Cualquier arma simple" }
        ]
      },
      {
        id: "pack_and_javelins",
        choose: 1,
        options: [
          {
            type: "bundle",
            label: "Paquete de explorador y cuatro jabalinas",
            items: [
              { key: "explorers_pack", quantity: 1 },
              { key: "javelin", quantity: 4 }
            ]
          }
        ]
      }
    ]
  },

  // -----------------------------
  // Tabla de niveles
  // -----------------------------
  levels: [
    { level: 1,  proficiencyBonus: 2, features: ["rage", "unarmored_defense"],       rages: 2,          rageDamageBonus: 2 },
    { level: 2,  proficiencyBonus: 2, features: ["reckless_attack", "danger_sense"], rages: 2,          rageDamageBonus: 2 },
    { level: 3,  proficiencyBonus: 2, features: ["primal_path"],                     rages: 3,          rageDamageBonus: 2 },
    { level: 4,  proficiencyBonus: 2, features: ["ability_score_improvement"],       rages: 3,          rageDamageBonus: 2 },
    { level: 5,  proficiencyBonus: 3, features: ["extra_attack", "fast_movement"],   rages: 3,          rageDamageBonus: 2 },
    { level: 6,  proficiencyBonus: 3, features: ["subclass_feature_6"],              rages: 4,          rageDamageBonus: 2 },
    { level: 7,  proficiencyBonus: 3, features: ["feral_instinct"],                  rages: 4,          rageDamageBonus: 2 },
    { level: 8,  proficiencyBonus: 3, features: ["ability_score_improvement"],       rages: 4,          rageDamageBonus: 2 },
    { level: 9,  proficiencyBonus: 4, features: ["brutal_critical_1_die"],           rages: 4,          rageDamageBonus: 3 },
    { level: 10, proficiencyBonus: 4, features: ["subclass_feature_10"],             rages: 4,          rageDamageBonus: 3 },
    { level: 11, proficiencyBonus: 4, features: ["relentless_rage"],                 rages: 4,          rageDamageBonus: 3 },
    { level: 12, proficiencyBonus: 4, features: ["ability_score_improvement"],       rages: 5,          rageDamageBonus: 3 },
    { level: 13, proficiencyBonus: 5, features: ["brutal_critical_2_dice"],          rages: 5,          rageDamageBonus: 3 },
    { level: 14, proficiencyBonus: 5, features: ["subclass_feature_14"],             rages: 5,          rageDamageBonus: 3 },
    { level: 15, proficiencyBonus: 5, features: ["persistent_rage"],                 rages: 5,          rageDamageBonus: 3 },
    { level: 16, proficiencyBonus: 5, features: ["ability_score_improvement"],       rages: 5,          rageDamageBonus: 4 },
    { level: 17, proficiencyBonus: 6, features: ["brutal_critical_3_dice"],          rages: 6,          rageDamageBonus: 4 },
    { level: 18, proficiencyBonus: 6, features: ["indomitable_might"],               rages: 6,          rageDamageBonus: 4 },
    { level: 19, proficiencyBonus: 6, features: ["ability_score_improvement"],       rages: 6,          rageDamageBonus: 4 },
    { level: 20, proficiencyBonus: 6, features: ["primal_champion"],                 rages: "unlimited", rageDamageBonus: 4 }
  ],

  // -----------------------------
  // Rasgos de clase
  // -----------------------------
  features: [
    {
      key: "rage",
      name: "Furia",
      level: 1,
      description:
        "Como acción adicional puedes entrar en furia. Mientras estés en furia y no vistas armadura pesada:\n" +
        "• Tienes ventaja en tiradas de Fuerza y TS de Fuerza.\n" +
        "• Tus ataques cuerpo a cuerpo con armas que usen Fuerza infligen daño extra según la tabla de bárbaro.\n" +
        "• Obtienes resistencia al daño contundente, perforante y cortante.\n\n" +
        "La furia dura 1 minuto y termina antes si quedas inconsciente o si pasa tu turno sin que hayas " +
        "atacado a una criatura hostil ni recibido daño. Puedes finalizarla en tu turno con otra acción adicional. " +
        "Tienes un número de usos por descanso largo igual a la columna de Furia (Rages) de la tabla de bárbaro. " +
        "No puedes lanzar conjuros ni mantener concentración mientras estés en furia.",
      rules: {
        actionType: "bonus_action",
        duration: "1_minute",
        requiresNoHeavyArmor: true,
        damageBonusFromTable: true,
        grants: {
          advantageOn: ["strength_checks", "strength_saving_throws"],
          resistances: ["bludgeoning", "piercing", "slashing"]
        },
        spellcastingBlockedWhileRaging: true,
        usesPerLongRestFromTable: true
      }
    },
    {
      key: "unarmored_defense",
      name: "Defensa sin armadura",
      level: 1,
      description:
        "Mientras no lleves armadura, tu CA es igual a 10 + tu modificador de Destreza + tu modificador de Constitución. " +
        "Puedes usar un escudo y seguir beneficiándote de esta regla.",
      rules: {
        acFormula: "10 + DEX_MOD + CON_MOD",
        requiresNoArmor: true,
        allowsShield: true
      }
    },
    {
      key: "reckless_attack",
      name: "Ataque imprudente",
      level: 2,
      description:
        "Al hacer tu primer ataque en tu turno, puedes decidir atacar de forma imprudente. " +
        "Tus ataques cuerpo a cuerpo con Fuerza tienen ventaja ese turno, pero las tiradas de ataque " +
        "contra ti también tienen ventaja hasta tu siguiente turno.",
      rules: {
        trigger: "first_attack_on_turn",
        effect: {
          selfAdvantageOn: ["melee_weapon_attacks_using_strength"],
          enemiesAdvantageAgainstYou: true
        }
      }
    },
    {
      key: "danger_sense",
      name: "Sentido del peligro",
      level: 2,
      description:
        "Tienes un agudo instinto para el peligro inminente. Tienes ventaja en TS de Destreza " +
        "contra efectos que puedas ver, como trampas o conjuros. No funciona si estás cegado, ensordecido o incapacitado.",
      rules: {
        grantsAdvantageOnSavingThrows: {
          ability: "dex",
          condition: "effect_is_visible"
        },
        disabledIf: ["blinded", "deafened", "incapacitated"]
      }
    },
    {
      key: "primal_path",
      name: "Senda primigenia",
      level: 3,
      description:
        "Eliges una senda que define la naturaleza de tu furia, como la Senda del Berserker. " +
        "Tu senda te otorga rasgos adicionales en los niveles 3, 6, 10 y 14.",
      rules: {
        grantsSubclassChoice: true,
        subclassLevels: [3, 6, 10, 14]
      }
    },
    {
      key: "ability_score_improvement",
      name: "Mejora de característica",
      level: [4, 8, 12, 16, 19],
      description:
        "A estos niveles, aumentas una característica en 2 puntos o dos características en 1 punto cada una. " +
        "No puedes superar 20 en ninguna característica mediante este rasgo.",
      rules: {
        type: "asi",
        occurrences: [4, 8, 12, 16, 19],
        maxScore: 20
      }
    },
    {
      key: "extra_attack",
      name: "Ataque adicional",
      level: 5,
      description:
        "Cuando realizas la acción de Ataque en tu turno, puedes atacar dos veces en lugar de una.",
      rules: {
        extraAttacks: 1
      }
    },
    {
      key: "fast_movement",
      name: "Movimiento rápido",
      level: 5,
      description:
        "Tu velocidad de desplazamiento aumenta en 10 pies mientras no vistas armadura pesada.",
      rules: {
        speedBonus: 10,
        requiresNoHeavyArmor: true
      }
    },
    {
      key: "feral_instinct",
      name: "Instinto feroz",
      level: 7,
      description:
        "Ganas ventaja en las tiradas de iniciativa. Además, si te sorprenden al inicio del combate " +
        "y no estás incapacitado, puedes actuar con normalidad en tu primer turno siempre que entres en furia " +
        "antes de hacer nada más en ese turno.",
      rules: {
        advantageOnInitiative: true,
        surpriseInteraction: {
          canActIfRageFirst: true
        }
      }
    },
    {
      key: "brutal_critical_1_die",
      name: "Golpe brutal (1 dado)",
      level: 9,
      description:
        "Cuando consigues un golpe crítico con un ataque cuerpo a cuerpo, tiras un dado adicional " +
        "de daño del arma y lo sumas al daño extra del crítico.",
      rules: {
        extraWeaponDiceOnCrit: 1
      }
    },
    {
      key: "brutal_critical_2_dice",
      name: "Golpe brutal (2 dados)",
      level: 13,
      description:
        "Tu golpe brutal mejora: ahora tiras dos dados adicionales de daño del arma en tus golpes críticos cuerpo a cuerpo.",
      rules: {
        extraWeaponDiceOnCrit: 2
      }
    },
    {
      key: "brutal_critical_3_dice",
      name: "Golpe brutal (3 dados)",
      level: 17,
      description:
        "Tu ferocidad en los críticos aumenta aún más: tiras tres dados adicionales de daño del arma en tus golpes críticos cuerpo a cuerpo.",
      rules: {
        extraWeaponDiceOnCrit: 3
      }
    },
    {
      key: "relentless_rage",
      name: "Furia incansable",
      level: 11,
      description:
        "Mientras estés en furia, si caerías a 0 puntos de golpe sin morir al instante, " +
        "puedes hacer una tirada de salvación de Constitución (CD 10). Con éxito, quedas a 1 punto de golpe en su lugar. " +
        "Cada vez que uses este rasgo después de la primera, la CD aumenta en 5. La CD vuelve a 10 al terminar un descanso corto o largo.",
      rules: {
        triggersAtZeroHpWhileRaging: true,
        save: {
          ability: "con",
          baseDC: 10,
          dcIncreasePerUse: 5,
          resetOn: ["short_rest", "long_rest"]
        },
        setHpTo: 1
      }
    },
    {
      key: "persistent_rage",
      name: "Furia persistente",
      level: 15,
      description:
        "Tu furia es casi imposible de detener. Solo termina antes de tiempo si quedas inconsciente " +
        "o si eliges finalizarla; ya no se apaga por no atacar o no recibir daño.",
      rules: {
        rageOnlyEndsOn: ["unconscious", "voluntary_end"]
      }
    },
    {
      key: "indomitable_might",
      name: "Fuerza indomable",
      level: 18,
      description:
        "Si el resultado total de una prueba de Fuerza es menor que tu puntuación de Fuerza, " +
        "puedes usar tu puntuación de Fuerza como resultado en su lugar.",
      rules: {
        strengthCheckMinimumIsScore: true
      }
    },
    {
      key: "primal_champion",
      name: "Campeón primigenio",
      level: 20,
      description:
        "Encarnas por completo el poder salvaje. Tu Fuerza y tu Constitución aumentan en 4 " +
        "y tu máximo para ambas características pasa a ser 24.",
      rules: {
        increases: [
          { ability: "str", value: 4 },
          { ability: "con", value: 4 }
        ],
        maxOverride: {
          str: 24,
          con: 24
        }
      }
    }
  ],

  // -----------------------------
  // Subclase: Camino del Berserker
  // -----------------------------
  subclasses: [
    {
      key: "path_of_the_berserker",
      name: "Camino del Berserker",
      source: "SRD 5.1",
      isSrd: true,
      isHomebrew: false,
      features: [
        {
          key: "berserker_frenzy",
          name: "Frenesí",
          level: 3,
          description:
            "Cuando entras en furia, puedes optar por entrar en frenesí. Mientras dure esa furia, " +
            "puedes hacer un ataque cuerpo a cuerpo adicional como acción adicional en cada uno de tus turnos " +
            "después del primero. Cuando termine la furia, ganas un nivel de agotamiento.",
          rules: {
            modifiesRage: true,
            grantsBonusActionMeleeAttackEachTurn: true,
            exhaustionLevelOnRageEnd: 1
          }
        },
        {
          key: "berserker_mindless_rage",
          name: "Furia sin mente",
          level: 6,
          description:
            "Mientras estés en furia, no puedes ser hechizado ni asustado. " +
            "Si ya lo estabas cuando entras en furia, los efectos quedan suspendidos hasta que la furia termine.",
          rules: {
            whileRagingImmuneTo: ["charmed", "frightened"],
            suspendsExistingConditions: ["charmed", "frightened"]
          }
        },
        {
          key: "berserker_intimidating_presence",
          name: "Presencia intimidante",
          level: 10,
          description:
            "Puedes usar tu acción para intimidar a una criatura a 30 pies que pueda verte u oírte. " +
            "Debe hacer un TS de Sabiduría (CD 8 + tu bonificador de competencia + tu CAR). " +
            "Con fallo, queda asustada de ti hasta el final de tu siguiente turno. " +
            "Puedes usar tu acción en turnos posteriores para mantener el efecto. " +
            "Termina si la criatura no te ve o está a más de 60 pies. " +
            "Si supera la tirada, no puedes usar este rasgo sobre esa criatura durante 24 horas.",
          rules: {
            actionType: "action",
            range: 30,
            maxDistanceToMaintain: 60,
            save: {
              ability: "wis",
              dcFormula: "8 + proficiency_bonus + cha_mod"
            },
            conditionApplied: "frightened",
            canExtendWithAction: true,
            immunityOnSuccessDurationHours: 24
          }
        },
        {
          key: "berserker_retaliation",
          name: "Represalia",
          level: 14,
          description:
            "Cuando una criatura a 5 pies de ti te daña, puedes usar tu reacción " +
            "para hacer un ataque cuerpo a cuerpo con arma contra esa criatura.",
          rules: {
            reactionTrigger: "take_damage_from_creature_within_5ft",
            grantsMeleeWeaponAttackAsReaction: true
          }
        }
      ]
    }
  ]
};
