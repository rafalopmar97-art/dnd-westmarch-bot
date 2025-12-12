// srd_races_gnome_es.js

export const gnomeSrdRace = {
  key: "gnome",              // slug interno
  name: "Gnomo",
  source: "SRD 5.1",
  isSrd: true,
  isHomebrew: false,
  guildId: null,             // null => disponible para todos los servidores

  size: "Pequeño",
  speed: {
    walk: 25
  },

  abilityScoreIncreases: [
    { ability: "int", value: 2 }
  ],

  // RASGOS RACIALES BASE
  traits: [
    {
      key: "darkvision",
      name: "Visión en la oscuridad",
      description:
        "Acostumbrado a vivir bajo tierra, ves con gran claridad en la penumbra. " +
        "Puedes ver en luz tenue en un radio de 60 pies como si fuera luz brillante, " +
        "y en la oscuridad como si fuera luz tenue. En la oscuridad sólo percibes tonos de gris.",
      rules: {
        darkvisionRange: 60
      }
    },
    {
      key: "gnome_cunning",
      name: "Astucia gnómica",
      description:
        "Tienes una mente especialmente difícil de manipular. Tienes ventaja en todas las tiradas de salvación " +
        "de Inteligencia, Sabiduría y Carisma contra efectos mágicos.",
      rules: {
        savingThrowAdvantageVsMagicOn: ["int", "wis", "cha"]
      }
    }
  ],

  // IDIOMAS
  languages: {
    automatic: ["Común", "Gnómico"],
    choice: null
  },

  // SUBRAZAS
  subraces: [
    {
      key: "rock_gnome",
      name: "Gnomo de las rocas",

      abilityScoreIncreases: [
        { ability: "con", value: 1 }
      ],

      traits: [
        {
          key: "artificers_lore",
          name: "Conocimientos de artífice",
          description:
            "Tus estudios te dan un entendimiento profundo de artefactos especiales. " +
            "Cuando haces una prueba de Inteligencia (Historia) relacionada con objetos mágicos, " +
            "sustancias alquímicas o dispositivos tecnológicos, añades el doble de tu bonificador de competencia " +
            "en lugar de tu bonificador normal.",
          rules: {
            skill: "history",
            doubleProficiencyWhen: [
              "magic_items",
              "alchemical_objects",
              "technological_devices"
            ]
          }
        },
        {
          key: "tinker",
          name: "Manitas",
          description:
            "Tienes competencia con herramientas de artesano (herramientas de hojalatero). " +
            "Usando esas herramientas, puedes gastar 1 hora y 10 po en materiales para construir " +
            "un pequeño dispositivo mecánico (CA 5, 1 pg). El aparato deja de funcionar después de 24 horas " +
            "(a menos que gastes 1 hora reparándolo), o cuando usas tu acción para desmontarlo, " +
            "recuperando entonces los materiales. Puedes tener activos hasta tres dispositivos a la vez.\n\n" +
            "Cuando creas un dispositivo, eliges uno de los siguientes efectos:\n" +
            "• **Juguete mecánico**: una pequeña figura (animal, criatura o persona) que se mueve 5 pies por asalto " +
            "en una dirección aleatoria y hace sonidos acordes.\n" +
            "• **Encendedor**: produce una pequeña llama que puedes usar para encender una vela, antorcha o fogata.\n" +
            "• **Caja de música**: al abrirse reproduce una melodía a volumen moderado hasta terminar la canción o cerrarse.",
          rules: {
            toolProficiency: ["tinkers_tools"],
            maxActiveDevices: 3,
            deviceConstruction: {
              timeMinutes: 60,
              costGold: 10
            }
          }
        }
      ]
    }
  ]
};
