// srd_races_dragonborn_es.js

export const dragonbornSrdRace = {
  key: "dragonborn",          // slug interno
  name: "Dracónido",
  source: "SRD 5.1",
  isSrd: true,
  isHomebrew: false,
  guildId: null,              // null => disponible para todos los servidores

  size: "Mediano",
  speed: {
    walk: 30
  },

  abilityScoreIncreases: [
    { ability: "str", value: 2 },
    { ability: "cha", value: 1 }
  ],

  // RASGOS RACIALES
  traits: [
    {
      key: "draconic_ancestry",
      name: "Ascendencia dracónica",
      description:
        "Tu sangre está marcada por el poder de los dragones. Elige un tipo de dragón de la tabla de ascendencia dracónica. " +
        "Ese linaje determina el tipo de daño de tu arma de aliento y la resistencia al daño que posees.",
      rules: {
        requiresChoice: true,
        choiceKey: "draconicAncestry",
        from: [
          "black",
          "blue",
          "brass",
          "bronze",
          "copper",
          "gold",
          "green",
          "red",
          "silver",
          "white"
        ]
      }
    },

    {
      key: "breath_weapon",
      name: "Arma de aliento",
      description:
        "Puedes usar tu acción para exhalar energía destructiva. El área, el tipo de daño y la tirada de salvación dependen de tu ascendencia dracónica. " +
        "La CD de la tirada de salvación es **8 + tu modificador de Constitución + tu bonificador de competencia**.\n\n" +
        "Al fallar la salvación, la criatura sufre daño completo; al tener éxito, recibe la mitad. " +
        "El daño es de **2d6** al inicio, aumentando a **3d6** a nivel 6, **4d6** a nivel 11 y **5d6** a nivel 16.\n\n" +
        "Una vez que usas tu arma de aliento, no puedes volver a usarla hasta terminar un descanso corto o largo.",
      rules: {
        actionType: "action",
        recharge: "short_or_long_rest",
        damageScaling: [
          { level: 1, dice: "2d6" },
          { level: 6, dice: "3d6" },
          { level: 11, dice: "4d6" },
          { level: 16, dice: "5d6" }
        ],
        saveDcFormula: "8 + CON_mod + proficiency_bonus",
        areaFromAncestry: true,
        damageTypeFromAncestry: true
      }
    },

    {
      key: "draconic_resistance",
      name: "Resistencia dracónica",
      description:
        "Tu cuerpo está templado por la energía de tu linaje dracónico. " +
        "Tienes resistencia al tipo de daño asociado con tu ascendencia dracónica (por ejemplo, fuego, frío o ácido).",
      rules: {
        damageResistanceFrom: "draconicAncestry.damageType"
      }
    }
  ],

  languages: {
    automatic: ["Común", "Dragónico"],
    choice: null
  },

  // Tabla de ascendencias dracónicas (equivalente a sub-opciones internas)
  draconicAncestries: [
    {
      key: "black",
      name: "Dragón negro",
      damageType: "ácido",
      breathWeapon: {
        area: "línea",
        size: "5x30",          // 5 ft de ancho, 30 ft de largo
        savingThrow: "dex"     // Tirada de Salvación de Destreza
      }
    },
    {
      key: "blue",
      name: "Dragón azul",
      damageType: "relámpago",
      breathWeapon: {
        area: "línea",
        size: "5x30",
        savingThrow: "dex"
      }
    },
    {
      key: "brass",
      name: "Dragón de latón",
      damageType: "fuego",
      breathWeapon: {
        area: "línea",
        size: "5x30",
        savingThrow: "dex"
      }
    },
    {
      key: "bronze",
      name: "Dragón de bronce",
      damageType: "relámpago",
      breathWeapon: {
        area: "línea",
        size: "5x30",
        savingThrow: "dex"
      }
    },
    {
      key: "copper",
      name: "Dragón de cobre",
      damageType: "ácido",
      breathWeapon: {
        area: "línea",
        size: "5x30",
        savingThrow: "dex"
      }
    },
    {
      key: "gold",
      name: "Dragón dorado",
      damageType: "fuego",
      breathWeapon: {
        area: "cono",
        size: "15",            // 15 ft de cono
        savingThrow: "dex"
      }
    },
    {
      key: "green",
      name: "Dragón verde",
      damageType: "veneno",
      breathWeapon: {
        area: "cono",
        size: "15",
        savingThrow: "con"
      }
    },
    {
      key: "red",
      name: "Dragón rojo",
      damageType: "fuego",
      breathWeapon: {
        area: "cono",
        size: "15",
        savingThrow: "dex"
      }
    },
    {
      key: "silver",
      name: "Dragón plateado",
      damageType: "frío",
      breathWeapon: {
        area: "cono",
        size: "15",
        savingThrow: "con"
      }
    },
    {
      key: "white",
      name: "Dragón blanco",
      damageType: "frío",
      breathWeapon: {
        area: "cono",
        size: "15",
        savingThrow: "con"
      }
    }
  ]
};
