// src/srd/classes/fighter.js

export const SRD_FIGHTER = {
  key: "fighter",
  name: "Guerrero",
  source: "SRD 5.1",

  // Atributo principal y TS
  primaryAbility: ["str", "dex"],
  savingThrows: ["str", "con"],

  // Golpes
  hitDice: "1d10",
  hitPoints: {
    level1: {
      formula: "10 + CON",
      average: 10
    },
    higherLevels: {
      formula: "1d10 (o 6) + CON",
      averagePerLevel: 6
    }
  },

  // Competencias base
  proficiencies: {
    armor: ["light", "medium", "heavy", "shield"],
    weapons: ["simple", "martial"],
    tools: [],
    skills: {
      choose: 2,
      from: [
        "Acrobatics",
        "Animal Handling",
        "Athletics",
        "History",
        "Insight",
        "Intimidation",
        "Perception",
        "Survival"
      ]
    }
  },

  // Reglas de multiclase
  multiclass: {
    // Requisitos para ENTRAR a Guerrero
    prerequisites: {
      // PHB: Fuerza 13 o Destreza 13
      anyOf: [{ str: 13 }, { dex: 13 }]
    },
    // Lo que ganas al multiclasear EN Guerrero
    proficienciesGained: {
      armor: ["light", "medium", "heavy", "shield"],
      weapons: ["simple", "martial"],
      tools: [],
      skills: {
        choose: 0,
        from: []
      }
    }
  },

  // Equipo inicial
  startingEquipment: {
    default: [
      {
        chooseOne: [
          { item: "chain_mail" },
          {
            items: [
              { item: "leather_armor" },
              { item: "longbow" },
              { item: "arrow", quantity: 20 }
            ]
          }
        ]
      },
      {
        chooseOne: [
          {
            items: [{ item: "martial_weapon_any" }, { item: "shield" }]
          },
          {
            items: [
              { item: "martial_weapon_any" },
              { item: "martial_weapon_any" }
            ]
          }
        ]
      },
      {
        chooseOne: [
          {
            items: [{ item: "light_crossbow" }, { item: "bolt", quantity: 20 }]
          },
          {
            items: [{ item: "handaxe" }, { item: "handaxe" }]
          }
        ]
      },
      {
        chooseOne: [
          { pack: "dungeoneers_pack" },
          { pack: "explorers_pack" }
        ]
      }
    ]
  },

  // Tabla de niveles
  levels: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: ["fighting_style", "second_wind"]
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: ["action_surge"]
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: ["martial_archetype"]
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: ["ability_score_improvement"]
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: ["extra_attack"]
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: ["ability_score_improvement"]
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: ["martial_archetype_feature_7"]
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: ["ability_score_improvement"]
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: ["indomitable"]
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: ["martial_archetype_feature_10"]
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: ["extra_attack_2"]
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: ["ability_score_improvement"]
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: ["indomitable_improvement_2"]
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: ["ability_score_improvement"]
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: ["martial_archetype_feature_15"]
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: ["ability_score_improvement"]
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: ["action_surge_improvement", "indomitable_improvement_3"]
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: ["martial_archetype_feature_18"]
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: ["ability_score_improvement"]
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: ["fighting_style_additional", "extra_attack_3"]
    }
  ],

  // Rasgos de clase
  features: {
    fighting_style: {
      key: "fighting_style",
      name: "Estilo de combate",
      level: 1,
      description:
        "Adoptas un estilo de lucha especializado. Escoge una de las opciones de estilo de combate. No puedes elegir el mismo estilo más de una vez.",
      options: [
        {
          key: "archery",
          name: "Arquería",
          description:
            "Obtienes un bono de +2 a las tiradas de ataque que hagas con armas a distancia."
        },
        {
          key: "defense",
          name: "Defensa",
          description:
            "Mientras lleves armadura, obtienes un bono de +1 a tu CA."
        },
        {
          key: "dueling",
          name: "Duelo",
          description:
            "Cuando empuñes un arma cuerpo a cuerpo en una mano y no lleves otras armas, obtienes un bono de +2 a las tiradas de daño con esa arma."
        },
        {
          key: "great_weapon_fighting",
          name: "Lucha con arma pesada",
          description:
            "Cuando saques 1 o 2 en un dado de daño de un ataque con un arma cuerpo a cuerpo que estés empuñando con dos manos, puedes repetir la tirada y debes usar el nuevo resultado, incluso si es 1 o 2. El arma debe tener la propiedad de dos manos o versátil para obtener este beneficio."
        },
        {
          key: "protection",
          name: "Protección",
          description:
            "Cuando una criatura que puedas ver realice un ataque contra un objetivo que no seas tú y que esté a 5 pies o menos de ti, puedes usar tu reacción para imponer desventaja a la tirada de ataque. Debes estar empuñando un escudo."
        },
        {
          key: "two_weapon_fighting",
          name: "Combate con dos armas",
          description:
            "Cuando combatas con dos armas, puedes añadir tu modificador de característica al daño del segundo ataque."
        }
      ]
    },

    second_wind: {
      key: "second_wind",
      name: "Segundo aire",
      level: 1,
      description:
        "Tienes una reserva limitada de resistencia que puedes usar para protegerte del daño. En tu turno, puedes usar una acción adicional para recuperar puntos de golpe iguales a 1d10 + tu nivel de guerrero. Una vez usas este rasgo, debes terminar un descanso corto o largo para volver a usarlo."
    },

    action_surge: {
      key: "action_surge",
      name: "Oleada de acción",
      level: 2,
      description:
        "Puedes sobrepasar tus límites durante un momento. En tu turno, puedes realizar una acción adicional además de tu acción normal y una posible acción adicional. Tras usar este rasgo, debes terminar un descanso corto o largo para volver a usarlo. A nivel 17 puedes usar Oleada de acción dos veces entre descansos, pero solo una vez por turno.",
      rules: {
        uses: 1,
        usesAt17: 2,
        refresh: "short_or_long_rest"
      }
    },

    martial_archetype: {
      key: "martial_archetype",
      name: "Arquetipo marcial",
      level: 3,
      description:
        "Eliges un arquetipo de combate que define tu estilo y técnica, como el Campeón. Obtienes rasgos de ese arquetipo en los niveles 3, 7, 10, 15 y 18.",
      grantsSubclass: true
    },

    ability_score_improvement: {
      key: "ability_score_improvement",
      name: "Mejora de característica",
      levels: [4, 6, 8, 12, 14, 16, 19],
      description:
        "En los niveles indicados puedes aumentar una característica en 2 puntos o dos características en 1 punto cada una (máximo 20)."
    },

    extra_attack: {
      key: "extra_attack",
      name: "Ataque extra",
      level: 5,
      description:
        "A partir de 5.º nivel, cuando realizas la acción de Ataque en tu turno, puedes atacar dos veces en lugar de una."
    },

    extra_attack_2: {
      key: "extra_attack_2",
      name: "Ataque extra (2)",
      level: 11,
      description:
        "A partir de 11.º nivel, puedes atacar tres veces en lugar de dos cuando realizas la acción de Ataque en tu turno."
    },

    extra_attack_3: {
      key: "extra_attack_3",
      name: "Ataque extra (3)",
      level: 20,
      description:
        "A partir de 20.º nivel, puedes atacar cuatro veces en lugar de tres cuando realizas la acción de Ataque en tu turno."
    },

    indomitable: {
      key: "indomitable",
      name: "Indómito",
      level: 9,
      description:
        "Puedes repetir una tirada de salvación que hayas fallado. Debes usar el nuevo resultado y no puedes volver a usar este rasgo hasta que termines un descanso largo.",
      rules: {
        usesAt9: 1,
        usesAt13: 2,
        usesAt17: 3,
        refresh: "long_rest"
      }
    },

    indomitable_improvement_2: {
      key: "indomitable_improvement_2",
      name: "Indómito mejorado (2 usos)",
      level: 13,
      description:
        "A partir de 13.º nivel, puedes usar Indómito dos veces entre descansos largos."
    },

    indomitable_improvement_3: {
      key: "indomitable_improvement_3",
      name: "Indómito mejorado (3 usos)",
      level: 17,
      description:
        "A partir de 17.º nivel, puedes usar Indómito tres veces entre descansos largos."
    },

    action_surge_improvement: {
      key: "action_surge_improvement",
      name: "Oleada de acción mejorada",
      level: 17,
      description:
        "A partir de 17.º nivel, puedes usar Oleada de acción dos veces entre descansos (corto o largo), aunque solo una vez por turno."
    },

    fighting_style_additional: {
      key: "fighting_style_additional",
      name: "Estilo de combate adicional",
      level: 20,
      description:
        "En 20.º nivel, eliges un segundo Estilo de combate. No puedes escoger un estilo que ya tengas."
    },

    martial_archetype_feature_7: {
      key: "martial_archetype_feature_7",
      name: "Rasgo de arquetipo marcial (7)",
      level: 7,
      description:
        "Obtienes un rasgo de tu arquetipo marcial a 7.º nivel (por ejemplo, Atleta extraordinario para el Campeón)."
    },

    martial_archetype_feature_10: {
      key: "martial_archetype_feature_10",
      name: "Rasgo de arquetipo marcial (10)",
      level: 10,
      description:
        "Obtienes un rasgo adicional de tu arquetipo marcial a 10.º nivel."
    },

    martial_archetype_feature_15: {
      key: "martial_archetype_feature_15",
      name: "Rasgo de arquetipo marcial (15)",
      level: 15,
      description:
        "Obtienes un nuevo rasgo de tu arquetipo marcial a 15.º nivel."
    },

    martial_archetype_feature_18: {
      key: "martial_archetype_feature_18",
      name: "Rasgo de arquetipo marcial (18)",
      level: 18,
      description:
        "Obtienes el rasgo de alto nivel de tu arquetipo marcial a 18.º nivel."
    }
  },

  // Subclase: Campeón
  subclasses: [
    {
      key: "champion",
      name: "Campeón",
      description:
        "El Campeón perfecciona la fuerza física y la técnica simple pero devastadora. Se apoya en golpes certeros, resistencia bruta y excelencia atlética para dominar el campo de batalla.",

      features: [
        {
          key: "improved_critical",
          name: "Golpe crítico mejorado",
          level: 3,
          description:
            "Tus ataques con armas obtienen un golpe crítico con una tirada de 19 o 20 en el d20."
        },
        {
          key: "remarkable_athlete",
          name: "Atleta extraordinario",
          level: 7,
          description:
            "Puedes añadir la mitad de tu bono de competencia (redondeado hacia arriba) a cualquier prueba de Fuerza, Destreza o Constitución que no use ya tu bono de competencia. Además, cuando realizas un salto de longitud con carrera, la distancia aumenta en pies igual a tu modificador de Fuerza."
        },
        {
          key: "additional_fighting_style",
          name: "Estilo de combate adicional",
          level: 10,
          description:
            "Eliges un segundo Estilo de combate del listado de guerrero. No puedes elegir un estilo que ya tengas."
        },
        {
          key: "superior_critical",
          name: "Golpe crítico superior",
          level: 15,
          description:
            "Tus ataques con armas obtienen un golpe crítico con una tirada de 18–20 en el d20."
        },
        {
          key: "survivor",
          name: "Superviviente",
          level: 18,
          description:
            "Al comienzo de cada uno de tus turnos recuperas puntos de golpe iguales a 5 + tu modificador de Constitución si tienes, como máximo, la mitad de tus puntos de golpe. No obtienes este beneficio si tienes 0 puntos de golpe."
        }
      ]
    }
  ]
};
