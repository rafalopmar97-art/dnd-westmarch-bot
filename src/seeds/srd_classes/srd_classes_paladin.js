// src/srd/classes/paladin.js

export const SRD_PALADIN = {
  key: "paladin",
  name: "Paladín",
  source: "SRD 5.1",

  // Atributo principal y TS
  primaryAbility: ["str", "cha"],
  savingThrows: ["wis", "cha"],

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
        "Athletics",
        "Insight",
        "Intimidation",
        "Medicine",
        "Persuasion",
        "Religion"
      ]
    }
  },

  // Reglas de multiclase
  multiclass: {
    // Requisitos para ENTRAR a Paladín
    prerequisites: {
      // PHB: Fuerza 13 y Carisma 13
      allOf: [{ str: 13 }, { cha: 13 }]
    },
    // Lo que ganas al multiclasear EN Paladín
    proficienciesGained: {
      armor: ["light", "medium", "shield"],
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
            items: [{ item: "javelin", quantity: 5 }]
          },
          {
            items: [{ item: "simple_melee_weapon_any" }]
          }
        ]
      },
      {
        chooseOne: [
          { pack: "priests_pack" },
          { pack: "explorers_pack" }
        ]
      },
      {
        items: [
          { item: "chain_mail" },
          { item: "holy_symbol" }
        ]
      }
    ]
  },

  // Configuración de conjuro (semilanzador preparado)
  spellcasting: {
    progression: "half_caster",
    ability: "cha",
    cantripsKnown: 0, // Paladín no aprende trucos por clase
    // Hechizos preparados: CAR mod + mitad del nivel de paladín (redondeado hacia abajo, mínimo 1)
    preparedFormula: "CHA_mod + floor(level/2) (mínimo 1)",
    ritualCasting: true,
    focus: "holy_symbol"
  },

  // Tabla de niveles
  levels: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: ["divine_sense", "lay_on_hands"],
      spellSlots: {}
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: ["paladin_fighting_style", "paladin_spellcasting", "divine_smite"],
      spellSlots: { 1: 2 }
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: ["divine_health", "sacred_oath"],
      spellSlots: { 1: 3 }
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: ["ability_score_improvement"],
      spellSlots: { 1: 3 }
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: ["extra_attack"],
      spellSlots: { 1: 4, 2: 2 }
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: ["aura_of_protection"],
      spellSlots: { 1: 4, 2: 2 }
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: ["sacred_oath_feature_7"],
      spellSlots: { 1: 4, 2: 3 }
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: ["ability_score_improvement"],
      spellSlots: { 1: 4, 2: 3 }
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [],
      spellSlots: { 1: 4, 2: 3, 3: 2 }
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: ["aura_of_courage"],
      spellSlots: { 1: 4, 2: 3, 3: 2 }
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: ["improved_divine_smite"],
      spellSlots: { 1: 4, 2: 3, 3: 3 }
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: ["ability_score_improvement"],
      spellSlots: { 1: 4, 2: 3, 3: 3 }
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 1 }
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: ["cleansing_touch"],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 1 }
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: ["sacred_oath_feature_15"],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 2 }
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: ["ability_score_improvement"],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 2 }
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: [],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 }
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: ["auras_improvement_30ft"],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 }
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: ["ability_score_improvement"],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 }
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: ["sacred_oath_feature_20"],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 }
    }
  ],

  // Rasgos de clase
  features: {
    divine_sense: {
      key: "divine_sense",
      name: "Sentido divino",
      level: 1,
      description:
        "Como acción, abres tus sentidos para detectar el bien y el mal. Hasta el final de tu siguiente turno, conoces la ubicación de cualquier celestial, infernal o no muerto a 60 pies que no esté tras cobertura total. Sabes su tipo (celestial, infernal o no muerto), pero no su identidad. También detectas lugares u objetos consagrados o profanados (como por el conjuro *hallow*). Puedes usar este rasgo un número de veces igual a 1 + tu modificador de Carisma (mínimo 1) y recuperas todos los usos al terminar un descanso largo."
    },

    lay_on_hands: {
      key: "lay_on_hands",
      name: "Imposición de manos",
      level: 1,
      description:
        "Tienes una reserva de energía curativa que se recarga al finalizar un descanso largo. La cantidad total de puntos de golpe que puedes restaurar es igual a 5 × tu nivel de paladín. Como acción, tocas a una criatura y gastas puntos de esa reserva para curarla, hasta el máximo restante. También puedes gastar 5 puntos para curar una enfermedad o neutralizar un veneno que la afecte. Puedes eliminar varias enfermedades o venenos en un solo uso, pagando por cada uno. No afecta a no muertos ni constructos."
    },

    paladin_fighting_style: {
      key: "paladin_fighting_style",
      name: "Estilo de combate",
      level: 2,
      description:
        "Adoptas un estilo de lucha especializado. Escoge uno de los siguientes estilos. No puedes elegir el mismo estilo más de una vez.",
      options: [
        {
          key: "defense",
          name: "Defensa",
          description:
            "Mientras lleves armadura, obtienes un bonificador de +1 a tu CA."
        },
        {
          key: "dueling",
          name: "Duelo",
          description:
            "Cuando empuñes un arma cuerpo a cuerpo en una mano y no lleves otras armas, obtienes un bonificador de +2 a las tiradas de daño con esa arma."
        },
        {
          key: "great_weapon_fighting",
          name: "Lucha con arma pesada",
          description:
            "Cuando saques un 1 o un 2 en un dado de daño de un ataque con un arma cuerpo a cuerpo que estés empuñando a dos manos, puedes repetir el dado y debes usar el nuevo resultado. El arma debe tener la propiedad de dos manos o versátil para obtener este beneficio."
        },
        {
          key: "protection",
          name: "Protección",
          description:
            "Cuando una criatura que puedas ver ataque a un objetivo distinto de ti que esté a 5 pies o menos, puedes usar tu reacción para imponer desventaja a la tirada de ataque. Debes estar empuñando un escudo."
        }
      ]
    },

    paladin_spellcasting: {
      key: "paladin_spellcasting",
      name: "Lanzamiento de conjuros",
      level: 2,
      description:
        "A partir de 2.º nivel aprendes a canalizar magia divina mediante oración y meditación. Tienes espacios de conjuro según la tabla de Paladín y preparas conjuros de la lista de paladín. Preparas una cantidad de conjuros igual a tu modificador de Carisma + la mitad de tu nivel de paladín (redondeado hacia abajo, mínimo 1). Puedes lanzar los conjuros preparados usando espacios de nivel adecuado y recuperas todos los espacios al finalizar un descanso largo. Puedes cambiar la lista de conjuros preparados después de un descanso largo, dedicando al menos 1 minuto por nivel de conjuro en oración. Carisma es tu atributo para los conjuros de paladín y puedes usar un símbolo sagrado como foco de lanzamiento."
    },

    divine_smite: {
      key: "divine_smite",
      name: "Castigo divino",
      level: 2,
      description:
        "Desde 2.º nivel, cuando golpeas a una criatura con un ataque cuerpo a cuerpo con arma, puedes gastar un espacio de conjuro para infligir daño radiante adicional al objetivo, además del daño normal. El daño extra es 2d8 por un espacio de 1.º nivel, más 1d8 adicional por cada nivel de espacio superior a 1.º, hasta un máximo de 5d8. Si el objetivo es un no muerto o un infernal, infliges 1d8 adicional."
    },

    divine_health: {
      key: "divine_health",
      name: "Salud divina",
      level: 3,
      description:
        "A partir de 3.º nivel, la energía divina que fluye a través de ti te vuelve inmune a las enfermedades."
    },

    sacred_oath: {
      key: "sacred_oath",
      name: "Juramento sagrado",
      level: 3,
      description:
        "En 3.º nivel juras un juramento sagrado que te vincula de manera permanente. Eliges un Juramento sagrado, como el Juramento de Devoción. Tu elección te otorga rasgos en los niveles 3, 7, 15 y 20, incluyendo conjuros de juramento y opciones de Canalizar divinidad.",
      grantsSubclass: true
    },

    ability_score_improvement: {
      key: "ability_score_improvement",
      name: "Mejora de característica",
      levels: [4, 8, 12, 16, 19],
      description:
        "En los niveles indicados, puedes aumentar una característica en 2 puntos o dos características en 1 punto cada una (máximo 20)."
    },

    extra_attack: {
      key: "extra_attack",
      name: "Ataque extra",
      level: 5,
      description:
        "A partir de 5.º nivel, cuando realizas la acción de Ataque en tu turno, puedes atacar dos veces en lugar de una."
    },

    aura_of_protection: {
      key: "aura_of_protection",
      name: "Aura de protección",
      level: 6,
      description:
        "Desde 6.º nivel, tú y las criaturas aliadas a 10 pies o menos de ti obtenéis un bonificador a las tiradas de salvación igual a tu modificador de Carisma (mínimo +1), siempre que estés consciente."
    },

    aura_of_courage: {
      key: "aura_of_courage",
      name: "Aura de coraje",
      level: 10,
      description:
        "Desde 10.º nivel, tú y las criaturas aliadas a 10 pies o menos de ti no podéis ser asustadas mientras estés consciente."
    },

    improved_divine_smite: {
      key: "improved_divine_smite",
      name: "Castigo divino mejorado",
      level: 11,
      description:
        "Desde 11.º nivel, tus ataques cuerpo a cuerpo con arma se imbuyen permanentemente de poder radiante. Siempre que golpeas con un ataque cuerpo a cuerpo con arma, el objetivo sufre 1d8 de daño radiante adicional. Si aplicas Castigo divino en el mismo ataque, añades este 1d8 extra al daño total."
    },

    cleansing_touch: {
      key: "cleansing_touch",
      name: "Toque purificador",
      level: 14,
      description:
        "Desde 14.º nivel, puedes usar tu acción para finalizar un conjuro que afecte a ti o a una criatura voluntaria que toques. Puedes usar este rasgo un número de veces igual a tu modificador de Carisma (mínimo 1), y recuperas todos los usos al finalizar un descanso largo."
    },

    auras_improvement_30ft: {
      key: "auras_improvement_30ft",
      name: "Auras ampliadas",
      level: 18,
      description:
        "A partir de 18.º nivel, el radio de tus auras de Protección, Coraje y las auras de tu Juramento sagrado aumenta de 10 a 30 pies."
    },

    sacred_oath_feature_7: {
      key: "sacred_oath_feature_7",
      name: "Rasgo de Juramento sagrado (7)",
      level: 7,
      description:
        "Obtienes el rasgo de tu Juramento sagrado otorgado en 7.º nivel (por ejemplo, Aura de devoción para el Juramento de Devoción)."
    },

    sacred_oath_feature_15: {
      key: "sacred_oath_feature_15",
      name: "Rasgo de Juramento sagrado (15)",
      level: 15,
      description:
        "Obtienes el rasgo de tu Juramento sagrado otorgado en 15.º nivel (como Pureza espiritual para el Juramento de Devoción)."
    },

    sacred_oath_feature_20: {
      key: "sacred_oath_feature_20",
      name: "Rasgo de Juramento sagrado (20)",
      level: 20,
      description:
        "Obtienes el rasgo definitivo de tu Juramento sagrado a 20.º nivel (como Nimbo sagrado para el Juramento de Devoción)."
    }
  },

  // Subclase: Juramento de Devoción
  subclasses: [
    {
      key: "oath_of_devotion",
      name: "Juramento de Devoción",
      description:
        "El Juramento de Devoción vincula al paladín con ideales elevados de justicia, honor, bondad y orden. Estos paladines encarnan la imagen clásica del caballero de armadura brillante que protege a los inocentes y combate la tiranía.",

      oathSpells: [
        { level: 3, spells: ["protection_from_evil_and_good", "sanctuary"] },
        { level: 5, spells: ["lesser_restoration", "zone_of_truth"] },
        { level: 9, spells: ["beacon_of_hope", "dispel_magic"] },
        { level: 13, spells: ["freedom_of_movement", "guardian_of_faith"] },
        { level: 17, spells: ["commune", "flame_strike"] }
      ],

      features: [
        {
          key: "devotion_channel_divinity",
          name: "Canalizar divinidad (Juramento de Devoción)",
          level: 3,
          description:
            "Cuando prestas este juramento en 3.º nivel, ganas dos opciones de Canalizar divinidad: Arma sagrada y Expulsar lo profano."
        },
        {
          key: "sacred_weapon",
          name: "Arma sagrada",
          level: 3,
          description:
            "Como acción, puedes imbuir un arma que sostengas con energía positiva utilizando tu Canalizar divinidad. Durante 1 minuto, añades tu modificador de Carisma a las tiradas de ataque con esa arma (mínimo +1) y el arma emite luz brillante en un radio de 20 pies y luz tenue 20 pies adicionales. Si el arma no era mágica, lo es durante la duración. Puedes finalizar el efecto como parte de cualquier acción, y termina si sueltas el arma o quedas inconsciente."
        },
        {
          key: "turn_the_unholy",
          name: "Expulsar lo profano",
          level: 3,
          description:
            "Como acción, presentas tu símbolo sagrado y pronuncias una plegaria que reprende a infernales y no muertos, usando tu Canalizar divinidad. Cada infernal o no muerto que pueda verte u oírte a 30 pies debe hacer una tirada de salvación de Sabiduría. Si la falla, queda expulsado durante 1 minuto o hasta que reciba daño. Una criatura expulsada debe usar su turno para alejarse lo más posible de ti, no puede acercarse voluntariamente a menos de 30 pies, no puede usar reacciones y solo puede usar la acción de Correr o intentar escapar de efectos que limiten su movimiento. Si no puede moverse, usa la acción de Esquivar."
        },
        {
          key: "aura_of_devotion",
          name: "Aura de devoción",
          level: 7,
          description:
            "A partir de 7.º nivel, tú y las criaturas aliadas a 10 pies o menos de ti no podéis ser hechizadas mientras estés consciente. A 18.º nivel, el radio aumenta a 30 pies."
        },
        {
          key: "purity_of_spirit",
          name: "Pureza espiritual",
          level: 15,
          description:
            "Desde 15.º nivel, estás permanentemente bajo los efectos de *protection from evil and good*, sin necesidad de concentración ni gastar espacio de conjuro."
        },
        {
          key: "holy_nimbus",
          name: "Nimbo sagrado",
          level: 20,
          description:
            "En 20.º nivel, como acción, puedes hacer que un aura de luz sagrada emane de ti durante 1 minuto. Irradias luz brillante en un radio de 30 pies y luz tenue 30 pies adicionales. Cada vez que un enemigo empiece su turno en la luz brillante, recibe 10 puntos de daño radiante. Mientras dure el efecto, tienes ventaja en las tiradas de salvación contra conjuros lanzados por infernales o no muertos. Una vez usas este rasgo, no puedes volver a usarlo hasta que termines un descanso largo."
        }
      ]
    }
  ]
};
